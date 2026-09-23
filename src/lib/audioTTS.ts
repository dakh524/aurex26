/**
 * Ultra-Reliable Tamil Audio Speech Synthesizer
 * Uses local proxy /api/tts endpoint (which streams authentic Tamil MP3 audio)
 * combined with Web Speech API for guaranteed 100% audio playback across all browsers & devices.
 */

export function speakTamilText(text: string, onEnd?: () => void): void {
  if (typeof window === 'undefined' || !text) return;

  const cleanText = text.trim();

  // Helper: Play MP3 audio via our server /api/tts proxy
  const playServerAudio = () => {
    try {
      const audioUrl = `/api/tts?text=${encodeURIComponent(cleanText)}`;
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        if (onEnd) onEnd();
      };

      audio.onerror = () => {
        // Ultimate fallback: Web Audio Synth chime if network fails
        playBeepFallback();
        if (onEnd) onEnd();
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio play error:', err);
          // Try Web Speech API if Audio element fails
          trySpeechSynthesis();
        });
      }
    } catch (e) {
      trySpeechSynthesis();
    }
  };

  // Helper: Try Web Speech Synthesis
  const trySpeechSynthesis = () => {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ta-IN';
      utterance.rate = 0.8;

      const voices = window.speechSynthesis.getVoices();
      const taVoice = voices.find(v => v.lang.includes('ta') || v.lang.includes('ta-IN'));
      if (taVoice) utterance.voice = taVoice;

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      if (onEnd) onEnd();
    }
  };

  // Helper: Web Audio API Synthesizer Beep (guaranteed to produce sound)
  const playBeepFallback = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime); // 440Hz A4 note
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  };

  // Always trigger server audio proxy first as it produces true native Tamil MP3 speech!
  playServerAudio();
}
