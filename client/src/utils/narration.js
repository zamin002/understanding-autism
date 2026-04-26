export function speak(text) {
  if (!window.speechSynthesis) return;
  // cancel any in-progress speech before starting a new utterance to prevent overlapping audio
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9; // slightly slower than default for younger readers
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}
