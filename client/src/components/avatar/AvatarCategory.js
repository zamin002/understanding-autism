import React from "react";

function AvatarCategory({ category, selected, onSelect }) {
  return (
    <div className="avatar-category">
      <p className="avatar-category-label">{category.label}</p>
      <div className="avatar-options">
        {category.options.map((option) => (
          <button
            key={option.id}
            className={`avatar-option ${selected == option.id ? "selected" : ""}`}
            onClick={() => onSelect(option.id)}
            aria-label={option.label}
            title={option.label}
          >
            {category.type == "colour" ? (
              <span className="avatar-option-colour" style={{ background: option.value }} />
            ) : (
              <span className="avatar-option-icon">{option.emoji}</span>
            )}
            <span className="avatar-option-text">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AvatarCategory;
