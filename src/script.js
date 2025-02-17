document.addEventListener('DOMContentLoaded', () => {
    const clueElement = document.getElementById('clue');
    const locationInput = document.getElementById('locationInput');
    const submitBtn = document.getElementById('submitBtn');
    const gallery = document.getElementById('gallery');
    let currentClueIndex = 0;
    let clues = [];
    let map;
    let markers = [];

    fetch('clues.json')
        .then(response => response.json())
        .then(data => {
            clues = data;
            displayClue();
            initMap();
        })
        .catch(error => console.error('Error fetching clues:', error));

    function displayClue() {
        if (currentClueIndex < clues.length) {
            clueElement.textContent = clues[currentClueIndex].clue;
        } else {
            clueElement.textContent = 'Congratulations! You have found the best Karak!';
        }
    }

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 25.276987, lng: 51.520008 },
            zoom: 10
        });
    }

    function updateMapLocation(lat, lng) {
        const location = { lat: lat, lng: lng };
        const marker = new google.maps.Marker({
            position: location,
            map: map
        });
        markers.push(marker);
        map.setCenter(location);
    }

    function updateGallery(imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Location Image';
        img.classList.add('gallery-image');
        gallery.appendChild(img);
    }

    submitBtn.addEventListener('click', () => {
        const userAnswer = locationInput.value.trim();
        if (userAnswer.toLowerCase() === clues[currentClueIndex].location.toLowerCase()) {
            const { lat, lng, image } = clues[currentClueIndex];
            updateMapLocation(lat, lng);
            updateGallery(image);
            currentClueIndex++;
            displayClue();
            locationInput.value = '';
        } else {
            alert('Incorrect! Try again.');
        }
    });
});
