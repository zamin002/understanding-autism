import { useState, useEffect } from "react";
import { DEFAULT_AVATAR } from "../data/avatarAssets";

const AVATAR_KEY    = "autism_app_avatar";
const ONBOARDED_KEY = "autism_app_onboarded";

function useAvatar() {
  const [avatar, setAvatar] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const onboarded = localStorage.getItem(ONBOARDED_KEY);
    const stored    = localStorage.getItem(AVATAR_KEY);

    if (!onboarded) {
      setShowOnboarding(true);
    } else {
      setAvatar(stored ? JSON.parse(stored) : DEFAULT_AVATAR);
    }
  }, []);

  function saveAvatar(selections) {
    localStorage.setItem(AVATAR_KEY, JSON.stringify(selections));
    localStorage.setItem(ONBOARDED_KEY, "true");
    setAvatar(selections);
    setShowOnboarding(false);
  }

  function skipAvatar() {
    localStorage.setItem(AVATAR_KEY, JSON.stringify(DEFAULT_AVATAR));
    localStorage.setItem(ONBOARDED_KEY, "skipped");
    setAvatar(DEFAULT_AVATAR);
    setShowOnboarding(false);
  }

  return { avatar, showOnboarding, saveAvatar, skipAvatar };
}

export default useAvatar;
