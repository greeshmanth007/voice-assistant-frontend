const BASE_URL = "https://voice-backend-972711305334.us-central1.run.app";
let ttsAudio = new Audio();
let mediaRecorder;
let recordedChunks = [];

// ---------------------------
// 1) TEXT TO SPEECH
// ---------------------------
document.querySelector(".first-block button").addEventListener("click", async () => {
  const text = document.querySelector(".first-block input").value.trim();
  if (!text) return alert("Please enter some text!");

  const res = await fetch(`${BASE_URL}/text-to-speech`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  ttsAudio.src = url;
  ttsAudio.play();
});

// ---------------------------
// 2) SPEECH TO TEXT (with your UI toggle)
// ---------------------------
async function toggleListening() {
  const button = document.getElementById('speakBtn');
  const span = document.getElementById('speakText');

  if (!mediaRecorder || mediaRecorder.state !== "recording") {
    // Start recording
    span.textContent = 'I am Listening...';
    button.style.backgroundColor = '#ef4444';

    recordedChunks = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = e => recordedChunks.push(e.data);

    mediaRecorder.onstop = async () => {
      const blob = new Blob(recordedChunks, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");

      const res = await fetch(`${BASE_URL}/speech-to-text`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      document.querySelector("textarea").value = data.text || "No speech detected.";
    };

    mediaRecorder.start();
    setTimeout(() => {
      if (mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        span.textContent = 'Speak Now';
        button.style.backgroundColor = '#facc15';
      }
    }, 5000);
  } else {
    // Stop manually
    mediaRecorder.stop();
    span.textContent = 'Speak Now';
    button.style.backgroundColor = '#facc15';
  }
}

// ---------------------------
// 3) SPEECH TO SPEECH CHATBOT (with your UI toggle)
// ---------------------------
async function toggleListening2() {
  const button = document.getElementById('speakBtn-2');
  const span = document.getElementById('speakText-2');

  if (!mediaRecorder || mediaRecorder.state !== "recording") {
    span.textContent = 'I am Listening...';
    button.style.backgroundColor = '#ef4444';

    recordedChunks = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = e => recordedChunks.push(e.data);

    mediaRecorder.onstop = async () => {
      const blob = new Blob(recordedChunks, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("audio", blob, "chat_audio.webm");

      const res = await fetch(`${BASE_URL}/chatbot`, {
        method: "POST",
        body: formData
      });

      const replyBlob = await res.blob();
      const replyUrl = URL.createObjectURL(replyBlob);
      const replyAudio = new Audio(replyUrl);
      replyAudio.play();
    };

    mediaRecorder.start();
    setTimeout(() => {
      if (mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        span.textContent = 'Speak Now';
        button.style.backgroundColor = '#facc15';
      }
    }, 5000);
  } else {
    mediaRecorder.stop();
    span.textContent = 'Speak Now';
    button.style.backgroundColor = '#facc15';
  }
}

