document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('leadForm');
    const formMessage = document.getElementById('form-message');
    const submitButton = document.getElementById('submitButton');

    // Make sure to replace this with your actual Google Apps Script Web App URL
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbz703Cz0zUC_DeqeNOft8AGrh1TL9BJ-5QhKgtoweHXz-oN701ZBgOej-gIxiUG4jkyqQ/exec';

    if (!form) {
        console.error("Form element #leadForm not found.");
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        // Create a FormData object from the form
        const formData = new FormData(form);

        // Submit the data using fetch. 
        // We use 'no-cors' mode which is a "fire and forget" method.
        // It's simple and avoids CORS issues, but we can't read the server's response.
        // So, we'll assume success if the request doesn't fail due to a network error.
        fetch(webAppUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' 
        })
        .then(() => {
            // Because we can't read the response, we assume it was successful.
            // Hide the form and show the success message.
            form.style.display = 'none'; 
            formMessage.textContent = 'Thank you! Your information has been submitted successfully. We will be in touch shortly.';
            formMessage.className = 'success';
        })
        .catch(error => {
            // This catch block will typically only be triggered by a network failure.
            console.error('Fetch Error:', error);
            formMessage.textContent = 'An error occurred while submitting the form. Please check your network connection and try again.';
            formMessage.className = 'error';

            // Re-enable the button so the user can try again
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Information';
        });
    });
});
