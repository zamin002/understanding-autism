import React from "react";

const skinColours = {
  light:  "#FDDBB4",
  medium: "#E8AC72",
  tan:    "#C68642",
  dark:   "#8D5524",
  deep:   "#4A2912",
};

const hairColours = {
  brown:  "#6B3D2E",
  blonde: "#E8C468",
  black:  "#1A1A1A",
  red:    "#C0392B",
  gray:   "#9E9E9E",
};

const outfitColours = {
  casual: "#1B6CB0",
  sporty: "#7EC8A0",
  fancy:  "#C5A3FF",
  sunny:  "#FFD93D",
  cozy:   "#FF8C6B",
};

function AvatarDisplay({ selections, size = 120 }) {
  const skin   = skinColours[selections?.skin_tone]  || skinColours.medium;
  const hair   = hairColours[selections?.hair_color] || hairColours.brown;
  const outfit = outfitColours[selections?.outfit]   || outfitColours.casual;

  const renderHair = () => {
    if (selections?.hair_style == "long") {
      return (
        <>
          <rect x="11" y="68" width="13" height="52" rx="6" fill={hair} />
          <rect x="96" y="68" width="13" height="52" rx="6" fill={hair} />
          <path d="M 16,72 Q 16,22 60,20 Q 104,22 104,72 Z" fill={hair} />
        </>
        // Q = quadratic bezier: control point pulls the curve upward to form the hair cap
      );
    }
    if (selections?.hair_style =="curly") {
      return (
        <path
          d="M 16,72 Q 18,50 26,40 Q 32,26 44,20 Q 52,14 60,14 Q 68,14 76,20 Q 88,26 94,40 Q 102,50 104,72 Z"
          fill={hair}
        />
      );
    }
    if (selections?.hair_style =="bun") {
      return (
        <>
          <path d="M 16,72 Q 16,30 60,28 Q 104,30 104,72 Z" fill={hair} />
          <circle cx="60" cy="19" r="13" fill={hair} />
        </>
      );
    }
    // default: short
    return <path d="M 16,72 Q 16,26 60,24 Q 104,26 104,72 Z" fill={hair} />;
  };

  const renderEyes = () => {
    if (selections?.eye_style =="wide") {
      return (
        <>
          <circle cx="46" cy="72" r="7" fill="white" />
          <circle cx="74" cy="72" r="7" fill="white" />
          <circle cx="46" cy="72" r="3.5" fill="#3D2B1F" />
          <circle cx="74" cy="72" r="3.5" fill="#3D2B1F" />
          <circle cx="47.5" cy="70.5" r="1.5" fill="white" />
          <circle cx="75.5" cy="70.5" r="1.5" fill="white" />
        </>
      );
    }
    if (selections?.eye_style =="sleepy") {
      return (
        <>
          <path d="M 38,72 Q 46,78 54,72" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 66,72 Q 74,78 82,72" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 38,72 L 54,72" stroke="#2D2D2D" strokeWidth="2" opacity="0.35" strokeLinecap="round" />
          <path d="M 66,72 L 82,72" stroke="#2D2D2D" strokeWidth="2" opacity="0.35" strokeLinecap="round" />
        </>
      );
    }
    if (selections?.eye_style =="stars") {
      return (
        <>
          <text x="46" y="78" fontSize="13" textAnchor="middle">⭐</text>
          <text x="74" y="78" fontSize="13" textAnchor="middle">⭐</text>
        </>
      );
    }
    // default: happy
    return (
      <>
        <path d="M 38,74 Q 46,68 54,74" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 66,74 Q 74,68 82,74" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="46" cy="76" r="2" fill="#2D2D2D" />
        <circle cx="74" cy="76" r="2" fill="#2D2D2D" />
      </>
    );
  };

  const renderMouth = () => {
    if (selections?.mouth =="grin") {
      return (
        <>
          <path d="M 42,90 Q 60,104 78,90" fill="#FF9999" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
          <path d="M 42,90 Q 60,104 78,90" fill="none" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    }
    if (selections?.mouth =="neutral") {
      return <path d="M 46,90 L 74,90" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" />;
    }
    if (selections?.mouth =="open") {
      return <ellipse cx="60" cy="92" rx="11" ry="8" fill="white" stroke="#2D2D2D" strokeWidth="2" />;
    }
    // default: smile
    return <path d="M 44,89 Q 60,102 76,89" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
  };

  const renderAccessory = () => {
    if (selections?.accessory =="glasses") {
      return (
        <>
          <rect x="33" y="65" width="22" height="14" rx="7" fill="none" stroke="#444" strokeWidth="2" />
          <rect x="65" y="65" width="22" height="14" rx="7" fill="none" stroke="#444" strokeWidth="2" />
          <line x1="55" y1="72" x2="65" y2="72" stroke="#444" strokeWidth="2" />
          <line x1="18" y1="69" x2="33" y2="70" stroke="#444" strokeWidth="1.5" />
          <line x1="87" y1="70" x2="102" y2="69" stroke="#444" strokeWidth="1.5" />
        </>
      );
    }
    if (selections?.accessory =="bow") {
      return (
        <>
          <path d="M 60,25 Q 50,18 40,25 Q 50,32 60,25 Z" fill={hair} />
          <path d="M 60,25 Q 70,18 80,25 Q 70,32 60,25 Z" fill={hair} />
          <circle cx="60" cy="25" r="3.5" fill={hair} />
        </>
      );
    }
    if (selections?.accessory =="hat") {
      return (
        <>
          <rect x="26" y="23" width="68" height="7" rx="3" fill={hair} />
          <rect x="36" y="7" width="48" height="18" rx="6" fill={hair} />
        </>
      );
    }
    return null;
  };

  return (
    <svg
      width={size}
      height={Math.round(size * 1.25)}
      viewBox="0 0 120 150"
      aria-label="Avatar"
      style={{ display: "block" }}
    >
      <rect x="22" y="110" width="76" height="40" rx="12" fill={outfit} />
      <rect x="50" y="107" width="20" height="13" rx="4" fill={skin} />
      {renderHair()}
      <circle cx="60" cy="72" r="43" fill={skin} />
      {renderEyes()}
      {renderMouth()}
      {renderAccessory()}
    </svg>
  );
}

export default AvatarDisplay;
