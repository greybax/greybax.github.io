document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with IDs matching the pattern "dsq-appXXXX"
    const elements = document.querySelectorAll('[id^="dsq-app"]');

    if (elements.length > 0) {
        // Remove the first element
        elements[0].remove();
        console.log(`Removed first element with ID: ${elements[0].id}`);
    }

    if (elements.length > 1) {
        // Remove the last element
        elements[elements.length - 1].remove();
        console.log(`Removed last element with ID: ${elements[elements.length - 1].id}`);
    }

    console.log(`Total elements processed: ${elements.length}`);
});