import React from "react";
import "./ProgressBar.css";

function ProgressBar({ current, total, label }) {
  // calculate how full the bar should be
  const pct = Math.round((current / total) * 100);

  return (
    <div
      className="progress-bar-container"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
    >
      {label && <span className="progress-label">{label}</span>}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-text">{current} / {total}</span>
    </div>
  );
}

export default ProgressBar;
