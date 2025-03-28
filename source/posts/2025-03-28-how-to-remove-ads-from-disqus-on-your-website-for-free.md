# How to remove Ads from Disqus on your website for free?

#disqus, #snippet, #js, #no-ads, #free-to-use, #english;

_2025-03-28_

I use Disqus currently in this blog. And I was too lazy to migrate somewhere when they introduced ads for free plan. So I created small snippet which fixes my problem:

```js
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    // Select all elements with IDs matching the pattern "dsq-appXXXX"
    const elements = document.querySelectorAll('[id^="dsq-app"]');

    elements.forEach((element) => {
      // Check if the element has a `src` attribute and if it does not contain "https://disqus.com"
      if (element.src && !element.src.includes('https://disqus.com')) {
        element.remove(); // Remove the element
        //console.log(`Removed element with ID: ${element.id} and src: ${element.src}`);
      }
    });

    // Remove the element with id="disqus_recommendations"
    const recommendations = document.getElementById('disqus_recommendations');
    if (recommendations) {
      recommendations.remove();
      //console.log('Removed element with ID: disqus_recommendations');
    }

    //console.log(`Processed ${elements.length} elements.`);
  }, 2000); // Delay execution by 2000 milliseconds (2 seconds)
});
```

Keep in mind that using this script may cause a ban from Disqus for your website where your are using it.

Happy using Disqus! ✌🏼
