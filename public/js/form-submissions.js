document.getElementById('addAnimalForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
        animal_species: this.animal_species.value,
        scientificName: this.scientificName.value,
        country: this.country.value,
        information_link: this.information_link.value
    };

    fetch('/api/animals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log('Success:', data);
        window.location.href = '/api/animals'; // Redirect to animals list
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
