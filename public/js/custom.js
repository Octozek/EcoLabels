document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const logoutButton = document.querySelector('#logout');
  const isLoggedIn = document.body.dataset.loggedIn === 'true'; // Check login status from a data attribute

  if (toggleButton) {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', currentTheme === 'dark');

    toggleButton.addEventListener('click', () => {
      const isDarkMode = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
  }

  const labelForm = document.getElementById('labelForm');
  if (labelForm) {
    labelForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const animalName = document.getElementById('petName').value.trim();
      const animal_species = document.getElementById('petSpecies').value;
      const animalDate = document.getElementById('petDate').value.trim();
      const animalGender = document.getElementById('petGender').value;

      if (animalName && animal_species && animalDate && animalGender) {
        try {
          const response = await fetch('/api/generate-svg', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              animalName,
              animal_species,
              animalDate,
              animalGender,
            }),
          });

          if (response.ok) {
            const svgText = await response.text();
            document.getElementById('svgContainer').innerHTML = svgText;

            // Show modal to register or sign in if not logged in
            if (!isLoggedIn) {
              setTimeout(() => {
                showMessageModal("To save this label, please register or sign in.");
                document.getElementById('messageModal').addEventListener('hidden.bs.modal', () => {
                  window.location.href = '/login';
                });
              }, 1000);
            }
          } else {
            showMessageModal('Failed to generate label');
          }
        } catch (error) {
          console.error('Error:', error);
          showMessageModal('Failed to generate label');
        }
      }
    });

    // Populate the species dropdown
    fetch('/api/animals/species')
      .then(response => response.json())
      .then(species => {
        const petSpeciesSelect = document.getElementById('petSpecies');
        // Clear existing options
        petSpeciesSelect.innerHTML = '<option value="" disabled selected>Select Species</option>';
        species.forEach(animal => {
          const option = document.createElement('option');
          option.value = animal.animal_species;
          option.textContent = animal.animal_species;
          petSpeciesSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error:', error));
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        showMessageModal('Failed to log out.');
      }
    });
  }

  function showMessageModal(message) {
    document.getElementById('messageModalBody').innerText = message;
    $('#messageModal').modal('show');
  }

  // Fetch saved SVGs for profile
  if (document.getElementById('savedSvgsContainer')) {
    fetch('/api/users/saved-svgs')
      .then(response => response.json())
      .then(svgs => {
        const container = document.getElementById('savedSvgsContainer');
        svgs.forEach(svg => {
          const div = document.createElement('div');
          div.innerHTML = svg;
          container.appendChild(div);
        });
      })
      .catch(error => console.error('Error fetching saved SVGs:', error));
  }
  
  // Drag and drop functionality for SVG map
  const dropZone = document.getElementById('drop-zone');
  const svgMapInput = document.getElementById('svgMap');

  if (dropZone) {
    dropZone.addEventListener('dragover', (event) => {
      event.preventDefault();
      dropZone.classList.add('dragging');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragging');
    });

    dropZone.addEventListener('drop', (event) => {
      event.preventDefault();
      dropZone.classList.remove('dragging');
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        svgMapInput.files = files;
        dropZone.textContent = files[0].name;
      }
    });

    dropZone.addEventListener('click', () => {
      svgMapInput.click();
    });

    svgMapInput.addEventListener('change', () => {
      if (svgMapInput.files.length > 0) {
        dropZone.textContent = svgMapInput.files[0].name;
      } else {
        dropZone.textContent = 'Drag and drop your SVG file here or click to upload';
      }
    });
  }
});
