import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";
import StoryPage from "./pages/StoryPage";
import EmpathyGamePage from "./pages/EmpathyGamePage";
import SensorySim from "./pages/SensorySim";
import QuizPage from "./pages/QuizPage";
import CertificatePage from "./pages/CertificatePage";
import PlatformerPage from "./pages/PlatformerPage";
import AvatarOnboardingModal from "./components/avatar/AvatarOnboardingModal";
import useAvatar from "./hooks/useAvatar";
import useSession from "./hooks/useSession";

function App() {
  const [calmMode, setCalmMode] = useState(false);
  const [narrationEnabled, setNarrationEnabled] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState(false);
  const { avatar, showOnboarding, saveAvatar, skipAvatar } = useAvatar();
  const { sessionId } = useSession();

  useEffect(() => {
    if (calmMode) {
      document.body.classList.add("calm-mode");
    } else {
      document.body.classList.remove("calm-mode");
    }
  }, [calmMode]);

  function handleSave(selections) {
    saveAvatar(selections);
    setEditingAvatar(false);
  }

  function handleClose() {
    // if the user opened the editor manually from the navbar, just close it
    // if it is the first-visit onboarding prompt, treat closing as skipping
    if (editingAvatar && !showOnboarding) {
      setEditingAvatar(false);
    } else {
      skipAvatar();
    }
  }

  return (
    <Router>
      <div className="app">
        {(showOnboarding || editingAvatar) && (
          <AvatarOnboardingModal
            onSave={handleSave}
            onSkip={handleClose}
            isEditing={editingAvatar && !showOnboarding}
            currentAvatar={avatar}
          />
        )}
        <Navbar
          calmMode={calmMode}
          setCalmMode={setCalmMode}
          narrationEnabled={narrationEnabled}
          setNarrationEnabled={setNarrationEnabled}
          avatar={avatar}
          onEditAvatar={() => setEditingAvatar(true)}
        />
        <main>
          <Routes>
            <Route path="/" element={<HomePage avatar={avatar} sessionId={sessionId} />} />
            <Route path="/learn" element={<LearnPage sessionId={sessionId} />} />
            <Route path="/story" element={<StoryPage avatar={avatar} sessionId={sessionId} narrationEnabled={narrationEnabled} />} />
            <Route path="/empathy-game" element={<EmpathyGamePage avatar={avatar} sessionId={sessionId} />} />
            <Route path="/sensory-sim" element={<SensorySim />} />
            <Route path="/quiz" element={<QuizPage avatar={avatar} sessionId={sessionId} narrationEnabled={narrationEnabled} />} />
            <Route path="/platformer" element={<PlatformerPage avatar={avatar} sessionId={sessionId} />} />
            <Route path="/certificate" element={<CertificatePage avatar={avatar} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
