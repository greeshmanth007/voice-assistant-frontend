function toggleListening() {
  const button = document.getElementById('speakBtn');
  const span = document.getElementById('speakText');
  if (span.textContent === 'Speak Now') {
    span.textContent = 'I am Listening...';
    button.style.backgroundColor = '#ef4444';
  } else {
    span.textContent = 'Speak Now';
    button.style.backgroundColor = '#facc15';
  }
}
