import React, { useState } from "react";
import AvatarBuilder from "./AvatarBuilder";
import "./Avatar.css";

function AvatarOnboardingModal({ onSave, onSkip, isEditing, currentAvatar }) {
  const [building, setBuilding] = useState(isEditing || false);

  if (building) {
    return (
      <div className="avatar-modal-overlay">
        <div className="avatar-modal">
          <h2 className="avatar-modal-title">
            {isEditing ? "Edit Your Avatar" : "Create Your Avatar"}
          </h2>
          <p className="avatar-modal-subtitle">Pick what makes you, you!</p>
          <AvatarBuilder
            initial={currentAvatar}
            onSave={onSave}
            onCancel={onSkip}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="avatar-modal-overlay">
      <div className="avatar-modal avatar-modal-prompt">
        <div className="avatar-modal-emoji">🧑</div>
        <h2 className="avatar-modal-title">Welcome!</h2>
        <p className="avatar-modal-subtitle">
          Would you like to create a personal avatar to use across the site?
        </p>
        <div className="avatar-prompt-actions">
          <button className="avatar-btn-save" onClick={() => setBuilding(true)}>
            Create Avatar
          </button>
          <button className="avatar-btn-skip" onClick={onSkip}>
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvatarOnboardingModal;
