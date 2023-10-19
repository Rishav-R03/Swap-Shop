// public/script.js
const form = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (data.success) {
            messageDiv.innerHTML = 'Image uploaded successfully.';
            form.reset();
        } else {
            messageDiv.innerHTML = 'Error: ' + data.message;
        }
    } catch (error) {
        console.error(error);
    }
});