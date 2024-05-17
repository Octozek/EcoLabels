document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';

  document.body.classList.toggle('dark-mode', currentTheme === 'dark');

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const isDarkMode = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
  }

  const labelForm = document.getElementById('labelForm');
  if (labelForm) {
    labelForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const petName = document.getElementById('petName').value.trim();
      const petSpecies = document.getElementById('petSpecies').value;
      const petDate = document.getElementById('petDate').value.trim();
      const petGender = document.getElementById('petGender').value;

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

            // Prompt user to register or sign in
            setTimeout(() => {
              const proceed = confirm("To save this label, please register or sign in.");
              if (proceed) {
                window.location.href = '/login';
              }
            }, 1000);
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
      .then(species => {
        const petSpeciesSelect = document.getElementById('petSpecies');
        species.forEach(animal => {
          const option = document.createElement('option');
          option.value = animal.animal_species;
          option.textContent = animal.animal_species;
          petSpeciesSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error:', error));
  }
});