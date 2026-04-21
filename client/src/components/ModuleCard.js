import React from "react";
import { Link } from "react-router-dom";
import "./ModuleCard.css";

// card for each module on the homepage
function ModuleCard({ title, description, emoji, color, textColor, link, delay }) {
  // I removed animDelay since I never got around to adding the logic to doing calculations on delay inside component
  return (
    <Link
      to={link}
      className="module-card animate-fade-in"
      style={{ "--card-accent": color, "--card-text": textColor, animationDelay: `${delay}ms` }}
    >
      <div className="module-card-icon" aria-hidden="true">
        {emoji}
      </div>
      <h3 className="module-card-title">{title}</h3>
      <p className="module-card-desc">{description}</p>
      <span className="module-card-cta">Start &rarr;</span>
    </Link>
  );
}

export default ModuleCard;
