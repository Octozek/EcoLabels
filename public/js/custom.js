document.addEventListener('DOMContentLoaded', () => {
  let saveMode = false;
  let saveTimeout;

  // Function to make labels wiggle
  function startWiggling() {
    document.querySelectorAll('.generated-label').forEach(label => {
      label.classList.add('wiggle');
    });
  }

  // Function to stop labels from wiggling
  function stopWiggling() {
    document.querySelectorAll('.generated-label').forEach(label => {
      label.classList.remove('wiggle');
    });
    saveMode = false;
  }

  // When Save Label button is clicked, make labels wiggle
  document.getElementById('downloadLabelButton').addEventListener('click', () => {
    saveMode = true;
    startWiggling();

    // Set a timeout for 10 seconds to stop wiggling
    saveTimeout = setTimeout(() => {
      stopWiggling();
    }, 10000); // 10 seconds
  });

  // When a label is clicked, if in save mode, show save options and stop wiggling
  document.getElementById('svgContainer').addEventListener('click', (event) => {
    if (saveMode && event.target.closest('.generated-label')) {
      clearTimeout(saveTimeout);
      const label = event.target.closest('.generated-label');
      stopWiggling();
      $('#saveLabelModal').modal('show');

      document.getElementById('saveAsSvg').onclick = () => saveSvg(label);
      document.getElementById('saveAsPng').onclick = () => savePng(label);
    }
  });

  // Function to save label as SVG
  function saveSvg(label) {
    const svgContent = label.innerHTML;
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'label.svg';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  // Function to save label as PNG
  function savePng(label) {
    const svgElement = label.querySelector('svg');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const svgString = new XMLSerializer().serializeToString(svgElement);
    const DOMURL = self.URL || self.webkitURL || self;
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = DOMURL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);

      canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'label.png';
        link.click();
        URL.revokeObjectURL(link.href);
      }, 'image/png');
    };
    img.src = url;
  }

  // Existing code for generating labels, logout, etc.
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
            const svgContainer = document.getElementById('svgContainer');
            const div = document.createElement('div');
            div.classList.add('generated-label');
            div.innerHTML = svgText;
            svgContainer.appendChild(div);

            // Show the Download Label button if user is logged in
            if (document.body.getAttribute('data-logged-in') === 'true') {
              document.getElementById('downloadLabelButton').style.display = 'block';
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

  // Logout functionality
  const logoutButton = document.querySelector('#logout');
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
});
