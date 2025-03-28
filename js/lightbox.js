document.addEventListener('DOMContentLoaded', () => {
  // Create the lightbox container
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  document.body.appendChild(lightbox);

  // Close the lightbox when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove('active');
  });

  // Add click event to all article images
  const articleImages = document.querySelectorAll('article img');
  console.log('Found images:', articleImages); // Log the images found
  articleImages.forEach((img) => {
    img.addEventListener('click', () => {
      lightbox.innerHTML = ''; // Clear previous content
      const fullImage = document.createElement('img');
      fullImage.src = img.src; // Use the same image source
      lightbox.appendChild(fullImage);
      lightbox.classList.add('active');
    });
  });

  // Close the lightbox with the Esc key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
    }
  });
});