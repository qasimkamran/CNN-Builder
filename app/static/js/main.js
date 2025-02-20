// app/static/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    const trainButton = document.getElementById('train-btn');
    const configInput = document.getElementById('config-input');
    const statusDiv = document.getElementById('status');
    
    trainButton.addEventListener('click', function() {
        // Parse the JSON configuration from the text area.
        let config;
        try {
            config = JSON.parse(configInput.value);
        } catch (e) {
            statusDiv.textContent = "Invalid JSON configuration.";
            return;
        }
        
        // Send a POST request with the layer configuration.
        fetch('/train', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ layer_config: config })
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === 'success'){
                statusDiv.textContent = "Training completed successfully!";
                statusDiv.style.color = "green";
            } else {
                statusDiv.textContent = "Error: " + data.message;
                statusDiv.style.color = "red";
            }
        })
        .catch(error => {
            statusDiv.textContent = "Error: " + error;
            statusDiv.style.color = "red";
        });
    });
});
