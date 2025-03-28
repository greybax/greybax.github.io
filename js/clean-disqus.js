document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with IDs matching the pattern "dsq-appXXXX"
    const elements = document.querySelectorAll('[id^="dsq-app"]');
  
    elements.forEach((element) => {
      // Check if the element has a `src` attribute and if it does not contain "https://disqus.com"
      if (element.src && !element.src.includes('https://disqus.com')) {
        element.remove(); // Remove the element
        console.log(`Removed element with ID: ${element.id} and src: ${element.src}`);
      }
    });
  
    console.log(`Processed ${elements.length} elements.`);
  });