document.getElementById('admin-add-animal-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
  
    const response = await fetch('/api/animals', {
      method: 'POST',
      body: formData
    });
  
    if (response.ok) {
      window.location.href = '/animals';
    } else {
      alert('Failed to add animal');
    }
  });
  