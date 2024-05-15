document.addEventListener('DOMContentLoaded', () => {
    const petForm = document.getElementById('petForm');
  
    petForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const petName = document.getElementById('petName').value.trim();
      const petSpecies = document.getElementById('petSpecies').value.trim();
      const petDate = document.getElementById('petDate').value.trim();
      const petGender = document.getElementById('petGender').value.trim();
  
      if (petName && petSpecies && petDate && petGender) {
        try {
          const response = await fetch('/api/generate-svg', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              petName,
              petSpecies,
              petDate,
              petGender,
            }),
          });
  
          if (response.ok) {
            const svg = await response.text();
            document.getElementById('svgContainer').innerHTML = svg;
          } else {
            alert('Failed to generate label');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Failed to generate label');
        }
      }
    });
  
    // Populate the species dropdown
    fetch('/api/animals/species')
      .then(response => response.json())
      .then(data => {
        const petSpeciesSelect = document.getElementById('petSpecies');
        data.forEach(animal => {
          const option = document.createElement('option');
          option.value = animal.id;
          option.textContent = animal.animal_species;
          petSpeciesSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error:', error));
  });
  