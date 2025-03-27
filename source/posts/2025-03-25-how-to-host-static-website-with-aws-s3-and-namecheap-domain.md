# How to host static website with AWS S3 and Namecheap domain?

#website, #hosting, #static, #namecheap, #aws, #s3, #route53, #cloudfront, #english;

_2025-03-25_

Recently, I've been faced with the task of using my static website on the AWS infrastructure. It's just cheaper than using different 3rd party static website generators. So I've built it myself and just need to host it on AWS S3.

I've followed this good tutorial from YouTube.

<iframe width="560" height="315" src="https://www.youtube.com/embed/9WPlC5RKfjs?si=h9NcSq0Wq7pZU-EX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Below, I'm going to highlight some core parts from it in case you don't want to see all 30 minutes of video:

* Have bought domain from Namecheap provider
* Have AWS account
* Request certificate in AWS for using them in Namecheap
* Configure Advanced DNS in Namecheap using issued certificates
* Configure Route 53
  * Genearte Hosted Zone
  * Copy-paste DNS servers from generated hosted zone to Namecheap. You need to select "Custom DNS" for it in "Nameservers" section.
  * Save changes. Now we've redirected our Namecheap domain to Amazon.
* Time to build your website. Our assuming we already have one.
* Create S3 Bucket. See video for setup.
* Drag'n'Drop website files to that bucket
* Setup CDN. Go to Cloudfront and click "Create new distrubution". See for details in video.
* Make sure that your website opens via domain name in your Distributions `xxxxx.cloudfront.net`.
* Now we want to make our website available via its real domain name. so we need to go to Route 53 and create an "A New Record" for routing. And add alias for "Route traffic to" our CloudFront distribution. Make sure that alternative domain name (CNAMEs record) has `www.` prefix in cloudfront distribution. So after it you should be able to open your website via `www.yourwebsite.com`
* Now let's make it work without `www.` prefix as well. So for this we need to setup a redirect S3 bucket. And setup CloudFront and Route 53 accordingly.
  * Create new S3 bucket with `www.yourwebsitename.com`
  * Upload your website to that S3 Bucket
  * In CloudFront we should keep only 1 CNAME for `www.yourwebsite.com` and remove `yourwebsite.com` if we have it, since we are going to redirect from it to `www.`
  * Edit Origin section of Distribution and point it to `www.*` S3 Bucket.
  * Delete all content from `yourwebsite.com` bucket, since its a redirect bucket.
  * Go to `Properties` -> `Static website hosting`. Edit `Hosting Type` to `Redirect requests for an object`. Select `https` Protocol. Save Changes.
  * Copy Endpoint URL it should looks like this: `http://your___website.s3-website-us-east-1.amazonaws.com/`. And we need to create new CloudFront distribution for it. 
  * Create CloudFront Distribution. Paste link which wi've copied into Origin Domain field. Select `Viewer protocol policy` -> `Redirect HTTP to HTTPS`. Disable caching `Cache policy` -> `CachingDisabled`. CNAME -> `yourdomainname.com` without `www.` prefix Select Custom SSL certificat which we've created before. Click `Save Changes`. P.S. We should leave `default root object` blank here and disable `Compress objects automatically`.
  * Go to Route 53 and create new record. Enable `Alias` -> `Route traffic to` -> `Alias to CloudFront Distrubution` and select just created distribution. Save Changes.
* Once all these steps are done, you can open your website on `yourwebsitename.com` and `www.yourwebsitename.com` without issues. Moreover `yourwebsitename.com` will redirect to `wwww.yourwebsitename.com` automatically.
* In case you see an old website version, just create a new caching policy or disable and re-enable it from the CloudFront Distributions console in the behavior tab of your primary domain.

Happy deploying your static website to AWS ✌🏼
