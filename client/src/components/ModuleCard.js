import React from "react";
import { Link } from "react-router-dom";
import "./ModuleCard.css";

// card for each module on the homepage
function ModuleCard({ title, description, emoji, color, link, delay }) {
  const animDelay = delay || 0;

  return (
    <Link
      to={link}
      className="module-card animate-fade-in"
      style={{ "--card-accent": color, animationDelay: `${animDelay}ms` }}
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
