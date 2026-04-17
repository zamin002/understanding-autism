import React from "react";
import "./FeedbackBanner.css";

// shown after answering a question in quiz/empathy game/stories
function FeedbackBanner({ message, isPositive, onContinue, buttonText }) {
  const icon = isPositive ? "🌟" : "💡";
  const bannerClass = isPositive ? "positive" : "neutral";
  const btnLabel = buttonText || "Continue";

  return (
    <div
      className={`feedback-banner animate-pop ${bannerClass}`}
      role="alert"
      aria-live="polite"
    >
      <span className="feedback-icon" aria-hidden="true">{icon}</span>
      <p className="feedback-message">{message}</p>
      {onContinue && (
        <button className="feedback-btn" onClick={onContinue}>
          {btnLabel} &rarr;
        </button>
      )}
    </div>
  );
}

export default FeedbackBanner;
