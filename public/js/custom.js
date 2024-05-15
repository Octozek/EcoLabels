document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('createCardBtn').addEventListener('click', function() {
        document.getElementById('formCardContainer').style.display = 'block';
    });

    fetch('/api/animals')
        .then(response => response.json())
        .then(data => {
            const speciesSelect = document.getElementById('petSpecies');
            data.forEach(animal => {
                const option = document.createElement('option');
                option.value = animal.id;
                option.textContent = animal.animal_species;
                speciesSelect.appendChild(option);
            });
        });

    document.getElementById('petForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const petData = {
            petName: document.getElementById('petName').value,
            petSpecies: document.getElementById('petSpecies').value,
            petDate: document.getElementById('petDate').value,
            petGender: document.getElementById('petGender').value
        };

        fetch('/api/generate-svg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(petData)
        })
        .then(response => response.text())
        .then(svg => {
            document.getElementById('petCard').innerHTML = svg;
            document.getElementById('petCard').style.display = 'block';
            document.getElementById('formCardContainer').style.display = 'none';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
