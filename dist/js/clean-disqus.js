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