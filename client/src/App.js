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

function App() {
  const [calmMode, setCalmMode] = useState(false);

  // add/remove calm-mode class on body when toggle changes
  useEffect(() => {
    if (calmMode) {
      document.body.classList.add("calm-mode");
    } else {
      document.body.classList.remove("calm-mode");
    }
  }, [calmMode]);

  return (
    <Router>
      <div className="app">
        <Navbar calmMode={calmMode} setCalmMode={setCalmMode} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/empathy-game" element={<EmpathyGamePage />} />
            <Route path="/sensory-sim" element={<SensorySim />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/certificate" element={<CertificatePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
