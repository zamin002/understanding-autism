import React, { useState } from "react";
import { AVATAR_CATEGORIES, DEFAULT_AVATAR } from "../../data/avatarAssets";
import AvatarDisplay from "./AvatarDisplay";
import AvatarCategory from "./AvatarCategory";

function AvatarBuilder({ initial, onSave, onCancel }) {
  const [selections, setSelections] = useState(initial || DEFAULT_AVATAR);

  function pick(key, value) {
    setSelections({ ...selections, [key]: value });
  }

  return (
    <div className="avatar-builder">
      <div className="avatar-preview">
        <AvatarDisplay selections={selections} size={140} />
      </div>

      <div className="avatar-categories">
        {AVATAR_CATEGORIES.map((cat) => (
          <AvatarCategory
            key={cat.key}
            category={cat}
            selected={selections[cat.key]}
            onSelect={(val) => pick(cat.key, val)}
          />
        ))}
      </div>

      <div className="avatar-actions">
        <button className="avatar-btn-save" onClick={() => onSave(selections)}>
          Save My Avatar
        </button>
        {onCancel && (
          <button className="avatar-btn-skip" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default AvatarBuilder;
