document.getElementById('contactForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  try {
    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      // Clear the form inputs on successful email send
      document.getElementById('contactForm').reset();
    } else {
      alert('Failed to send email: ' + (result.message || 'Please try again.'));
    }
  } catch (error) {
    console.error('Error sending email:', error);
    alert('An error occurred while sending your message. Please try again later.');
  }
});