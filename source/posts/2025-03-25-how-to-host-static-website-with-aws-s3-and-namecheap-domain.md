# How to host static website with AWS S3 and Namecheap domain?

#website, #hosting, #namecheap, #aws, #s3, #static, #english;

_March 25, 2025_

Recently, I've been faced with the task of using my static website on the AWS infrastructure. It's just cheaper than using different 3rd party static website generators. So I've built it myself and just need to host it on AWS S3.

I've followed this awesome tutorial from YouTube.

<iframe width="560" height="315" src="https://www.youtube.com/embed/9WPlC5RKfjs?si=h9NcSq0Wq7pZU-EX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

So below I'm going to highlight some core parts:

1. Have bought domain from Namecheap provider
2. Have AWS account
3. Request certificate in AWS for using them in Namecheap
4. Configure Advanced DNS in Namecheap using issued certificates
5. Configure Route 53
  * Genearte Hosted Zone
  * Copy-paste DNS servers from generated hosted zone to Namecheap. You need to select "Custom DNS" for it in "Nameservers" section.
  * Save changes. Now we've redirected our Namecheap domain to Amazon.
6. Time to build your website. Our assuming we already have one.
7. Create S3 Bucket

Happy deploying your static website to AWS ✌🏼
