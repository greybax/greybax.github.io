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
7. Create S3 Bucket. See video for setup.
8. Drag'n'Drop website files to that bucket
9. Setup CDN. Go to Cloudfront and click "Create new distrubution". See for details in video.
10. Make sure that your website opens via domain name in your Distributions `xxxxx.cloudfront.net`.
11. Now we want to make our website available via its real domain name. so we need to go to Route 53 and create an "A New Record" for routing. And add alias for "Route traffic to" our CloudFront distribution. Make sure that alternative domain name (CNAMEs record) has `www.` prefix in cloudfront distribution. So after it you should be able to open your website via `www.yourwebsite.com`
12. Now let's make it work without `www.` prefix as well. So for this we need to setup a redirect S3 bucket. And setup CloudFront and Route 53 accordingly.
  * Create new S3 bucket with `www.yourwebsitename.com`
  * Upload your website to that S3 Bucket
  * In CloudFront we should keep only 1 CNAME for `www.yourwebsite.com` and remove `yourwebsite.com` if we have it, since we are going to redirect from it to `www.`
  * Edit Origin section of Distribution and point it to `www.*` S3 Bucket.
  * Delete all content from `yourwebsite.com` bucket, since its a redirect bucket.
  * Go to `Properties` -> `Static website hosting`. Edit `Hosting Type` to `Redirect requests for an object`. Select `https` Protocol. Save Changes.
  * Copy Endpoint URL it should looks like this: `http://your___website.s3-website-us-east-1.amazonaws.com/`. And we need to create new CloudFront distribution for it. 
  * Create CloudFront Distribution. Paste link which wi've copied into Origin Domain field. Select `Viewer protocol policy` -> `Redirect HTTP to HTTPS`. Disable caching `Cache policy` -> `CachingDisabled`. CNAME -> `yourdomainname.com` without `www.` prefix Select Custom SSL certificat which we've created before. Click `Save Changes`. P.S. We should leave `default root object` blank here and disable `Compress objects automatically`.
  * Go to Route 53 and create new record. Enable `Alias` -> `Route traffic to` -> `Alias to CloudFront Distrubution` and select just created distribution. Save Changes.
13. Once all these steps are done you should be able to open your website on `yourwebsitename.com` and `www.yourwebsitename.com` without any issues. Morethover `yourwebsitename.com` will redirect be to `wwww.yourwebsitename.com` automatically


Happy deploying your static website to AWS ✌🏼
