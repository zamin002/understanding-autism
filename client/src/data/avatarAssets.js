export const AVATAR_CATEGORIES = [
  {
    key: "skin_tone",
    label: "Skin Tone",
    type: "colour",
    options: [
      { id: "light",  label: "Light",  value: "#FDDBB4" },
      { id: "medium", label: "Medium", value: "#E8AC72" },
      { id: "tan",    label: "Tan",    value: "#C68642" },
      { id: "dark",   label: "Dark",   value: "#8D5524" },
      { id: "deep",   label: "Deep",   value: "#4A2912" },
    ],
  },
  {
    key: "hair_style",
    label: "Hair Style",
    type: "icon",
    options: [
      { id: "short", label: "Short", emoji: "✂️" },
      { id: "long",  label: "Long",  emoji: "🌊" },
      { id: "curly", label: "Curly", emoji: "🌀" },
      { id: "bun",   label: "Bun",   emoji: "🎀" },
    ],
  },
  {
    key: "hair_color",
    label: "Hair Color",
    type: "colour",
    options: [
      { id: "brown",  label: "Brown",  value: "#6B3D2E" },
      { id: "blonde", label: "Blonde", value: "#E8C468" },
      { id: "black",  label: "Black",  value: "#1A1A1A" },
      { id: "red",    label: "Red",    value: "#C0392B" },
      { id: "gray",   label: "Gray",   value: "#9E9E9E" },
    ],
  },
  {
    key: "eye_style",
    label: "Eyes",
    type: "icon",
    options: [
      { id: "happy",  label: "Happy",  emoji: "😊" },
      { id: "wide",   label: "Wide",   emoji: "👀" },
      { id: "sleepy", label: "Sleepy", emoji: "😴" },
      { id: "stars",  label: "Stars",  emoji: "🤩" },
    ],
  },
  {
    key: "mouth",
    label: "Mouth",
    type: "icon",
    options: [
      { id: "smile",   label: "Smile",   emoji: "😁" },
      { id: "grin",    label: "Grin",    emoji: "😄" },
      { id: "neutral", label: "Calm",    emoji: "😐" },
      { id: "open",    label: "Excited", emoji: "😮" },
    ],
  },
  {
    key: "outfit",
    label: "Outfit Colour",
    type: "colour",
    options: [
      { id: "casual", label: "Blue",   value: "#1B6CB0" },
      { id: "sporty", label: "Green",  value: "#7EC8A0" },
      { id: "fancy",  label: "Purple", value: "#C5A3FF" },
      { id: "sunny",  label: "Yellow", value: "#FFD93D" },
      { id: "cozy",   label: "Coral",  value: "#FF8C6B" },
    ],
  },
  {
    key: "accessory",
    label: "Extras",
    type: "icon",
    options: [
      { id: "none",    label: "None",    emoji: "⬜" },
      { id: "glasses", label: "Glasses", emoji: "🤓" },
      { id: "bow",     label: "Bow",     emoji: "🎀" },
      { id: "hat",     label: "Hat",     emoji: "🎩" },
    ],
  },
];

export const DEFAULT_AVATAR = {
  skin_tone:  "medium",
  hair_style: "short",
  hair_color: "brown",
  eye_style:  "happy",
  mouth:      "smile",
  outfit:     "casual",
  accessory:  "none",
};
