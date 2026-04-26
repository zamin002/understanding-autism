import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./SensorySim.css";

function SensorySim() {
  const [intensity, setIntensity] = useState(0);
  const [started, setStarted] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const simRef = useRef(null);

  // Descriptive labels for intensity ranges
  const getLabel = () => {
    if (intensity == 0) return { text: "Calm and comfortable", emoji: "😊" };
    if (intensity <= 25) return { text: "A little bit noisy", emoji: "🙂" };
    if (intensity <= 50) return { text: "Getting quite overwhelming", emoji: "😟" };
    if (intensity <= 75) return { text: "Too much! Hard to concentrate", emoji: "😣" };
    return { text: "Sensory overload! Need to get out!", emoji: "🤯" };
  };

  const label = getLabel();

  // Apply visual effects based on intensity
  const simStyle = {
    filter: `blur(${intensity * 0.03}px) brightness(${1 + intensity * 0.008}) saturate(${1 + intensity * 0.02})`,
    transform: intensity > 60 ? `scale(${1 + intensity * 0.001})` : "none",
  };

  // shaking starts at intensity 50 and scales up to a max of 5px displacement
  // the value is passed as a CSS custom property so the keyframe animation in CSS can read it
  const shakeClass = intensity > 50 ? "sim-shake" : "";
  const shakeIntensity = intensity > 50 ? Math.min((intensity - 50) * 0.1, 5) : 0;

  const handleReset = () => {
    setIntensity(0);
  };

  // Intro screen
  if (!started) {
    return (
      <div className="sensory-page">
        <div className="container">
          <div className="sensory-intro animate-fade-in">
            <span className="intro-emoji" aria-hidden="true">🌊</span>
            <h1>Sensory World Simulator</h1>
            <p>
              Have you ever wondered what it feels like when sounds are too
              loud, lights are too bright, and everything around you feels
              overwhelming? Many autistic people experience this every day.
            </p>
            <p>
              Use the slider to slowly increase the intensity and see how
              the world changes. You can stop at any time.
            </p>
            <button className="btn-primary" onClick={() => setStarted(true)}>
              Start the Experience
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Reflection screen
  if (showReflection) {
    return (
      <div className="sensory-page">
        <div className="container">
          <div className="sensory-reflection animate-pop">
            <span className="reflection-emoji" aria-hidden="true">💭</span>
            <h2>How Did That Feel?</h2>
            <p>
              Even through a screen, increasing the intensity can feel uncomfortable.
              Now imagine feeling like that in real life, in a busy classroom,
              a noisy canteen, or a crowded shopping centre.
            </p>
            <p>
              This is what sensory overload can feel like for some autistic people.
              It is not something they choose since their brain processes sounds, lights,
              and textures more intensely.
            </p>
            <div className="reflection-tips">
              <h3>How you can help:</h3>
              <ul>
                <li>Be understanding if someone needs a quiet space</li>
                <li>Speak calmly and don't make sudden loud noises</li>
                <li>Ask if there's anything you can do to help</li>
                <li>Never say "just get used to it" as it's not that simple</li>
              </ul>
            </div>
            <div className="reflection-actions">
              <button className="btn-primary" onClick={() => { setShowReflection(false); setIntensity(0); }}>
                Try Again
              </button>
              <Link to="/quiz" className="btn-secondary">
                Take the Quiz &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sensory-page">
      <div className="container">
        <div
          ref={simRef}
          className={`sensory-sim-area ${shakeClass}`}
          style={{ "--shake-px": `${shakeIntensity}px` }}
          role="region"
          aria-label="Sensory simulation area"
        >
          {/* Visual elements that get distorted */}
          <div className="sim-scene" style={simStyle}>
            <div className="sim-classroom">
              <div className="sim-row">
                <span className="sim-item">📚</span>
                <span className="sim-item">✏️</span>
                <span className="sim-item">🎒</span>
                <span className="sim-item">📐</span>
              </div>
              <div className="sim-row">
                <span className="sim-item">👧</span>
                <span className="sim-item">👦</span>
                <span className="sim-item">👧</span>
                <span className="sim-item">👦</span>
              </div>
              <div className="sim-row">
                <span className="sim-item">🗣️</span>
                <span className="sim-item">🔔</span>
                <span className="sim-item">💡</span>
                <span className="sim-item">📢</span>
              </div>
            </div>

            {/* Noise overlay that intensifies */}
            <div className="sim-noise-overlay" style={{ opacity: intensity * 0.008 }} />

            {/* Flashing overlay at high intensity */}
            {intensity > 70 && (
              <div className="sim-flash-overlay" />
            )}
          </div>

          {/* Current state label */}
          <div className="sim-status">
            <span className="sim-status-emoji" aria-hidden="true">{label.emoji}</span>
            <span className="sim-status-text">{label.text}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="sensory-controls">
          <label htmlFor="intensity-slider" className="slider-label">
            Sensory Intensity: <strong>{intensity}%</strong>
          </label>
          <input
            id="intensity-slider"
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="intensity-slider"
            aria-label="Adjust sensory intensity from 0 to 100"
          />
          <div className="slider-endpoints">
            <span>😊 Calm</span>
            <span>🤯 Overload</span>
          </div>
        </div>

        <div className="sensory-actions">
          <button className="btn-primary" onClick={() => setShowReflection(true)}>
            Stop &amp; Reflect
          </button>
          <button className="btn-reset" onClick={handleReset}>
            Reset to Calm
          </button>
        </div>
      </div>
    </div>
  );
}

export default SensorySim;
