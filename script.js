function shortenUrl() {
    const longUrl = document.getElementById('longUrl').value;
    const apiUrl = 'https://your-api-endpoint-url.com/shorten'; // Replace with the actual API endpoint URL

    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ longUrl }),
        })
        .then(response => response.json())
        .then(data => {
            const shortUrl = data.shortUrl;
            document.getElementById('shortUrl').innerHTML = `Short URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}