document.getElementById('admin-add-animal-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  let allFieldsFilled = true;

  // Validate form fields
  formData.forEach((value, key) => {
      if (!value) {
          allFieldsFilled = false;
      }
  });

  if (!allFieldsFilled) {
      document.getElementById('error-message').textContent = 'All fields are required';
      return;
  }

  const response = await fetch('/api/admin/animals', {
      method: 'POST',
      body: formData
  });

  if (response.ok) {
      window.location.href = '/admin-add-animal';
  } else {
      const errorData = await response.json();
      document.getElementById('error-message').textContent = `Failed to add animal: ${errorData.message}`;
  }
});

// Drag and drop functionality
const dragDropArea = document.getElementById('drag-drop-area');
const fileInput = document.getElementById('svg_map');
const fileNameDisplay = document.getElementById('file-name');

dragDropArea.addEventListener('click', () => fileInput.click());

dragDropArea.addEventListener('dragover', (e) => {
e.preventDefault();
e.stopPropagation();
dragDropArea.classList.add('dragover');
});

dragDropArea.addEventListener('dragleave', (e) => {
e.preventDefault();
e.stopPropagation();
dragDropArea.classList.remove('dragover');
});

dragDropArea.addEventListener('drop', (e) => {
e.preventDefault();
e.stopPropagation();
dragDropArea.classList.remove('dragover');

const files = e.dataTransfer.files;
if (files.length) {
  fileInput.files = files; // Assign dropped files to the input element
  const event = new Event('change'); // Trigger change event to ensure file input is processed
  fileInput.dispatchEvent(event);
}
});

fileInput.addEventListener('change', (e) => {
const files = e.target.files;
if (files.length) {
  fileNameDisplay.textContent = `File selected: ${files[0].name}`; // Display the selected file name
}
});
