# How to create AWS EC2 Image Builder with hosted Solr and run it on EC2 using Terraform

#aws, #ec2, #s3, #ec2-builder, #solr, #terraform, #devops, #english;

_2022-05-24_

## Intro

I've written a quite ago about [Terraform and how it works with AWS RDS cluster](/posts/how-to-create-aws-rds-cluster-with-imported-sql-dump-from-s3-using-terraform/). In this post I'd like continue to write about DevOps optimizations. 

## Task

1. EC2 image builder creates AMI with pre-installed java and solr. And run this Solr as as service on this image
2. Add ability to launch EC2 instance `t4g.micro` from created image builder definition

## Solution

Our solution will be based on following technologies:
* [AWS EC2 Image Builder](https://aws.amazon.com/image-builder)
* [Solr](https://solr.apache.org/)
* [Terraform](https://www.terraform.io)
* [Github Actions](https://github.com/features/actions)

## Step 1 (Create AWS S3 Bucket with Solr Configuration)

```
resource "aws_s3_bucket" "solr_conf_s3" {
  bucket = "solr-s3-bucket-${var.short_name}"
  acl    = "private"

  tags = {
    Name        = "S3 Bucket with solr-conf content for Solr configuration"
    Environment = var.workspace
  }
}

resource "aws_s3_bucket_object" "solr_conf_s3_object" {
  for_each = fileset("${path.module}/s3-data-upload/solr-conf/conf/", "*")
  bucket   = aws_s3_bucket.solr_conf_s3.id
  key      = each.value
  source   = "${path.module}/s3-data-upload/solr-conf/conf/${each.value}"
  etag     = filemd5("${path.module}/s3-data-upload/solr-conf/conf/${each.value}")
}
```

How to deal with Solr config files you can find here [Solr Configuration Files](https://solr.apache.org/guide/7_0/solr-configuration-files.html)

## Step 2 (Initialize AWS Image Builder with Solr pre-installed component)

I've used official post [Taking Solr to Production](https://solr.apache.org/guide/8_4/taking-solr-to-production.html) in purpose to install and deploy Solr on EC2 cluster.

```
resource "aws_imagebuilder_image_pipeline" "solr" {
  name                             = "solr_image_pipeline_${var.short_name}"
  image_recipe_arn                 = aws_imagebuilder_image_recipe.solr.arn
  infrastructure_configuration_arn = aws_imagebuilder_infrastructure_configuration.solr.arn
}

resource "aws_imagebuilder_image_recipe" "solr" {
  component {
    component_arn = aws_imagebuilder_component.solr.arn
  }

  name         = "solr_image_recipe_${var.short_name}"
  parent_image = "arn:aws:imagebuilder:${var.aws_region}:aws:image/amazon-linux-2-arm64/x.x.x"
  version      = "1.0.0"
}

resource "aws_imagebuilder_distribution_configuration" "solr" {
  name = "solr_distribution_configuration_${var.short_name}"

  distribution {
    ami_distribution_configuration {
      name = "solr-{{ imagebuilder:buildDate }}"
    }

    region = "us-east-2"
  }
}

resource "aws_imagebuilder_component" "solr" {
  data = yamlencode({
    phases = [{
      name = "build"
      steps = [{
        action = "ExecuteBash"
        inputs = {
          commands = [
            "sudo amazon-linux-extras install java-openjdk11",
            "sudo wget https://archive.apache.org/dist/lucene/solr/8.7.0/solr-8.7.0.tgz",
            "tar xvf solr-8.7.0.tgz",
            "cd solr-8.7.0/bin/",
            "sudo bash ./install_solr_service.sh ./../../solr-8.7.0.tgz",
            "mkdir -m 777 solr-conf",
            "echo 'download config from S3'",
            "aws s3 cp s3://${aws_s3_bucket.solr_conf_s3.bucket} solr-conf --recursive",
            "echo 'restart solr service'",
            "sudo service solr stop",
            "sudo service solr start",
            "echo 'create drupal core'",
            "sudo -u solr /opt/solr/bin/solr create_core -c drupal -d ./solr-conf -n drupal",
          ]
        }
        name      = "download_and_install_solr"
        onFailure = "Abort"
      }]
    }]
    schemaVersion = 1.0
  })
  name     = "deploy_solr_${var.short_name}"
  platform = "Linux"
  version  = "1.0.0"
}

resource "aws_imagebuilder_image" "solr" {
  image_recipe_arn                 = aws_imagebuilder_image_recipe.solr.arn
  infrastructure_configuration_arn = aws_imagebuilder_infrastructure_configuration.solr.arn
  enhanced_image_metadata_enabled  = false
}

resource "aws_imagebuilder_infrastructure_configuration" "solr" {
  name                          = "solr_infrastructure_configuration_${var.short_name}"
  description                   = "AWS image builder config for EC2 with Solr hosted"
  instance_profile_name         = aws_iam_instance_profile.ec2_solr.name
  instance_types                = ["t4g.micro"]
  security_group_ids            = [aws_security_group.ec2_solr_sg.id]
  subnet_id                     = element(tolist(module.vpc.public_subnets), 0)
  terminate_instance_on_failure = true
}
```

## Step 3 (EC2 instance from AMI)

```
data "aws_ami" "solr" {
  most_recent = true
  owners      = ["self"]

  filter {
    name   = "name"
    values = [aws_imagebuilder_image.solr.name, "${aws_imagebuilder_image.solr.name}*"]
  }
}

resource "aws_instance" "solr" {
  ami                  = data.aws_ami.solr.id
  instance_type        = "t4g.micro"
  key_name             = aws_key_pair.developer_access.key_name
  iam_instance_profile = aws_iam_instance_profile.ec2_solr.name
  security_groups      = [aws_security_group.ec2_solr_sg.id]
  subnet_id            = element(tolist(module.vpc.public_subnets), 0)
}
```

## Step 4 (Add security groups)

```
esource "aws_security_group" "ec2_solr_sg" {
  description = "Controls access to EC2 Image Builder with Solr"

  vpc_id = module.vpc.vpc_id
  name   = "ec2-image-builder-sg"

  ingress {
    protocol    = "tcp"
    from_port   = 8983
    to_port     = 8983
    cidr_blocks = [for index in range(var.aws_az_count) : cidrsubnet(var.vpc_cidr, var.vpc_subnet_newbits, index)] //["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"

    cidr_blocks = [
      "0.0.0.0/0",
    ]
  }
}


resource "aws_iam_role_policy" "ec2_solr" {
  name_prefix = "ec2-solr-role-policy-"
  role        = aws_iam_role.ec2_solr.name

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListAllMyBuckets",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetBucketACL",
        "s3:GetBucketLocation"
      ],
      "Resource": "arn:aws:s3:::${aws_s3_bucket.solr_conf_s3.bucket}"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:ListMultipartUploadParts",
        "s3:AbortMultipartUpload"
      ],
      "Resource": "arn:aws:s3:::${aws_s3_bucket.solr_conf_s3.bucket}/*"
    }
  ]
}
EOF
}

resource "aws_iam_role" "ec2_solr" {
  name_prefix = "ec2-solr-role-"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_instance_profile" "ec2_solr" {
  name_prefix = "ec2-solr-instance-profile-"
  role        = aws_iam_role.ec2_solr.name
}

resource "aws_iam_role_policy_attachment" "role-policy-attachment" {
  for_each = toset([
    "arn:aws:iam::aws:policy/EC2InstanceProfileForImageBuilder",
    "arn:aws:iam::aws:policy/EC2InstanceProfileForImageBuilderECRContainerBuilds",
    "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
  ])

  role       = aws_iam_role.ec2_solr.name
  policy_arn = each.value
}
```

## Result

Run 
* `terraform plan`
* `terraform apply`

if your setup is correct you should be able to see results on AWS CloudWatch.

Also you should have access to Solr Admin panel hosted on EC2 instance

_Happy creating your own AWS EC2 Image Builder with Terraform!_ :)
