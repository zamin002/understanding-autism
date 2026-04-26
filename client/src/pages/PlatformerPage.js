import React, { useState } from "react";
import PlatformerGame from "../components/PlatformerGame";
import { LEVELS } from "../data/platformerLevels";
import { MODULE_IDS } from "../data/moduleIds";
import { updateProgress } from "../api";
import { Link } from "react-router-dom";
import "./PlatformerPage.css";

function PlatformerPage({ avatar, sessionId }) {
  const [gameState, setGameState]         = useState("select");
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [totalScore, setTotalScore]       = useState(0);
  const [lastHearts, setLastHearts]       = useState(0);

  const level = LEVELS[currentLevelIdx];
  const isLastLevel = currentLevelIdx == LEVELS.length - 1;

  const handleStartLevel = (idx) => {
    setCurrentLevelIdx(idx);
    setGameState("playing");
  };

  const handleLevelComplete = (hearts) => {
    const newTotal = totalScore + hearts;
    setLastHearts(hearts);
    setTotalScore(newTotal);
    if (isLastLevel) {
      setGameState("finished");
      if (sessionId) {
        updateProgress(sessionId, MODULE_IDS.platformer, "completed", newTotal).catch(() => {});
      }
    } else {
      setGameState("levelComplete");
    }
  };

  const handleGameOver = () => {
    setGameState("gameOver");
  };

  const handleNextLevel = () => {
    setCurrentLevelIdx(i => i + 1);
    setGameState("playing");
  };

  const handleRetry = () => {
    setGameState("playing");
  };

  const handleRestart = () => {
    setCurrentLevelIdx(0);
    setTotalScore(0);
    setLastHearts(0);
    setGameState("select");
  };

  const totalCollectibles = LEVELS.reduce((sum, l) => sum + l.collectibles.length, 0);

  // Level select 
  if (gameState == "select") {
    return (
      <div className="platformer-page">
        <div className="container">
          <div className="platformer-header animate-fade-in">
            <h1>🎮 Help Sam's Journey</h1>
            <p>Help Sam navigate sensory and social challenges at school. Collect kindness hearts, avoid the overwhelm clouds, and reach the safe spot!</p>
            <p className="platformer-controls-note">Use <strong>arrow keys</strong> to move and <strong>Space</strong> to jump or tap the on-screen buttons.</p>
          </div>
          <div className="level-select-grid">
            {LEVELS.map((lvl, i) => (
              <button
                key={lvl.id}
                className="level-card animate-fade-in"
                style={{ animationDelay: `${i * 120}ms`, "--level-bg": lvl.bgColor }}
                onClick={() => handleStartLevel(i)}
              >
                <span className="level-card-emoji" aria-hidden="true">{lvl.emoji}</span>
                <h3 className="level-card-title">Level {lvl.id}</h3>
                <p className="level-card-name">{lvl.title}</p>
                <p className="level-card-desc">{lvl.description}</p>
                <span className="level-card-cta">Play Level {lvl.id} →</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Playing 
  if (gameState == "playing") {
    return (
      <div className="platformer-page">
        <div className="container">
          <div className="platformer-level-header animate-fade-in">
            <button className="story-back-btn" onClick={handleRestart} aria-label="Back to level select">
              &larr; Levels
            </button>
            <h2>{level.emoji} Level {level.id}: {level.title}</h2>
          </div>
          {/* key includes gameState so retrying the same level forces a full remount and resets the game loop */}
          <PlatformerGame
            key={`${currentLevelIdx}-${gameState}`}
            level={level}
            avatar={avatar}
            onComplete={handleLevelComplete}
            onDie={handleGameOver}
          />
        </div>
      </div>
    );
  }

  // Level complete (not the last level) 
  if (gameState == "levelComplete") {
    return (
      <div className="platformer-page">
        <div className="container">
          <div className="edu-message-card animate-pop">
            <span className="edu-top-emoji" aria-hidden="true">🌟</span>
            <h2 className="edu-level-complete">Level {level.id} Complete!</h2>
            <p className="edu-hearts-collected">
              You collected <strong>{lastHearts}</strong> out of <strong>{level.collectibles.length}</strong> items!
            </p>
            <div className="edu-divider" />
            <h3 className="edu-heading">{level.educationalMessage.heading}</h3>
            <p className="edu-body">{level.educationalMessage.body}</p>
            <button className="btn-primary edu-continue-btn" onClick={handleNextLevel}>
              Continue to Level {currentLevelIdx + 2} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Game over 
  if (gameState == "gameOver") {
    return (
      <div className="platformer-page">
        <div className="container">
          <div className="platformer-complete animate-pop">
            <span className="complete-emoji" aria-hidden="true">💭</span>
            <h2>Don't Give Up!</h2>
            <p className="complete-message">It is tricky, but so are the challenges Sam faces every day. Try again!</p>
            <div className="complete-actions">
              <button className="btn-primary" onClick={handleRetry}>Try Again</button>
              <button className="btn-secondary" onClick={handleRestart}>Choose Level</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // All levels finished 
  if (gameState == "finished") {
    return (
      <div className="platformer-page">
        <div className="container">
          <div className="platformer-complete animate-pop">
            <span className="complete-emoji" aria-hidden="true">
              {totalScore >= totalCollectibles ? "🏆" : "🌟"}
            </span>
            <h2>{totalScore >= totalCollectibles ? "Amazing! All Hearts Collected!" : "Journey Complete!"}</h2>
            <p className="complete-score">
              You collected <strong>{totalScore}</strong> out of <strong>{totalCollectibles}</strong> kindness items across all 3 levels!
            </p>
            <p className="complete-message">
              {totalScore >= totalCollectibles
                ? "You helped Sam through every challenge with kindness and patience. You are a true autism ally!"
                : "You helped Sam navigate real challenges that autistic people face every day. Keep learning and spreading kindness!"}
            </p>

            {/* Educational recap */}
            <div className="edu-recap">
              {LEVELS.map(lvl => (
                <div key={lvl.id} className="edu-recap-item">
                  <span>{lvl.emoji}</span>
                  <span><strong>{lvl.educationalMessage.heading}</strong></span>
                </div>
              ))}
            </div>

            <div className="complete-actions">
              <button className="btn-primary" onClick={handleRestart}>Play Again</button>
              <Link to="/quiz" className="btn-secondary">Take the Quiz →</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default PlatformerPage;
