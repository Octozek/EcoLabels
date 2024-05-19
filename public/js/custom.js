document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.querySelector('#logout');
  const isLoggedIn = document.body.dataset.loggedIn === 'true';

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
            document.getElementById('saveLabelButton').style.display = 'block'; // Show save button
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

  const saveLabelButton = document.getElementById('saveLabelButton');
  if (saveLabelButton && !saveLabelButton.classList.contains('listener-added')) {
    saveLabelButton.addEventListener('click', () => {
      $('#saveLabelModal').modal('show');
    });
    saveLabelButton.classList.add('listener-added');
  }

  const saveAsSvgButton = document.getElementById('saveAsSvg');
  if (saveAsSvgButton && !saveAsSvgButton.classList.contains('listener-added')) {
    saveAsSvgButton.addEventListener('click', () => {
      saveLabel('svg');
    });
    saveAsSvgButton.classList.add('listener-added');
  }

  const saveAsPngButton = document.getElementById('saveAsPng');
  if (saveAsPngButton && !saveAsPngButton.classList.contains('listener-added')) {
    saveAsPngButton.addEventListener('click', () => {
      saveLabel('png');
    });
    saveAsPngButton.classList.add('listener-added');
  }

  function saveLabel(format) {
    const svg = document.querySelector('#svgContainer svg');
    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svg)], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    if (format === 'svg') {
      const a = document.createElement('a');
      a.href = url;
      a.download = 'label.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format === 'png') {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'label.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        });
      };
    }

    $('#saveLabelModal').modal('hide');
  }
});
