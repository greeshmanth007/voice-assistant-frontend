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


function toggleListening2() {
  const button = document.getElementById('speakBtn-2');
  const span = document.getElementById('speakText-2');
  if (span.textContent === 'Speak Now') {
    span.textContent = 'I am Listening...';
    button.style.backgroundColor = '#ef4444';
  } else {
    span.textContent = 'Speak Now';
    button.style.backgroundColor = '#facc15';
  }
}