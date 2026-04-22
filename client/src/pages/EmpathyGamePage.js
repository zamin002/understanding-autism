import React, { useState, useEffect } from "react";
import empathyScenarios from "../data/empathyScenarios";
import { MODULE_IDS } from "../data/moduleIds";
import FeedbackBanner from "../components/FeedbackBanner";
import ProgressBar from "../components/ProgressBar";
import AvatarDisplay from "../components/avatar/AvatarDisplay";
import { updateProgress } from "../api";
import { Link } from "react-router-dom";
import "./EmpathyGamePage.css";

function EmpathyGamePage({ avatar, sessionId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedResponses, setSelectedResponses] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(null);

  const scenario = empathyScenarios[currentIndex];
  const total = empathyScenarios.length;

  // Toggle a response selection
  const handleToggleResponse = (responseId) => {
    if (showFeedback) return; // prevent changes after submitting
    setSelectedResponses((prev) =>
      prev.includes(responseId)
        ? prev.filter((id) => id !== responseId)
        : [...prev, responseId]
    );
  };

  // Submit answers for this scenario
  const handleSubmit = () => {
    if (selectedResponses.length == 0) return;

    // Check if all selected are kind and all kind ones are selected
    const kindIds = scenario.responses.filter((r) => r.isKind).map((r) => r.id);
    const allCorrect =
      selectedResponses.length == kindIds.length &&
      selectedResponses.every((id) => kindIds.includes(id));

    if (allCorrect) {
      setScore((prev) => prev + 1);
    }

    setLastCorrect(allCorrect);
    setShowFeedback(true);
  };

  // Move to next scenario
  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedResponses([]);
      setShowFeedback(false);
      setLastCorrect(null);
    } else {
      setGameComplete(true);
    }
  };

  useEffect(() => {
    if (gameComplete && sessionId) {
      updateProgress(sessionId, MODULE_IDS["empathy-game"], "completed", score).catch(() => {});
    }
  }, [gameComplete]);

  const reactionAvatar = avatar && showFeedback
    ? { ...avatar, eye_style: lastCorrect ? "stars" : "sleepy", mouth: lastCorrect ? "grin" : "neutral" }
    : avatar;

  // Restart game
  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedResponses([]);
    setShowFeedback(false);
    setScore(0);
    setGameComplete(false);
  };

  // Game complete
  if (gameComplete) {
    const perfect = score == total;
    return (
      <div className="empathy-page">
        <div className="container">
          <div className="empathy-complete animate-pop">
            <span className="complete-emoji" aria-hidden="true">
              {perfect ? "🏆" : "🌟"}
            </span>
            <h2>{perfect ? "Perfect Score!" : "Great Effort!"}</h2>
            <p className="complete-score">
              You got <strong>{score}</strong> out of <strong>{total}</strong> scenarios fully correct.
            </p>
            <p className="complete-message">
              {perfect
                ? "You really know how to be an amazing friend. You understand that kindness and patience make a huge difference!"
                : "You are learning to be a great friend! Keep practising being kind and patient. It makes the world a better place."}
            </p>
            <div className="complete-actions">
              <button className="btn-primary" onClick={handleRestart}>
                Play Again
              </button>
              <Link to="/quiz" className="btn-secondary">
                Take the Quiz &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="empathy-page">
      <div className="container">
        <div className="empathy-header animate-fade-in">
          <h1>🤝 Be a Good Friend</h1>
          <p>Read each situation, then tap the responses that show <strong>kindness</strong>. Watch out! Some responses are not helpful!</p>
        </div>

        <ProgressBar current={currentIndex + 1} total={total} label="Scenario" />

        <div className="empathy-card animate-fade-in" key={scenario.id}>
          {reactionAvatar && (
            <div className="empathy-avatar">
              <AvatarDisplay selections={reactionAvatar} size={64} />
              <span className="empathy-avatar-label">You</span>
            </div>
          )}
          <div className="empathy-situation">
            <span className="situation-label">The Situation:</span>
            <p className="situation-text">{scenario.situation}</p>
          </div>

          <div className="empathy-responses">
            <p className="responses-prompt">
              Tap the <strong>kind</strong> responses (there may be more than one):
            </p>

            {scenario.responses.map((response) => {
              const isSelected = selectedResponses.includes(response.id);
              let stateClass = "";

              if (showFeedback) {
                if (response.isKind) stateClass = "correct";
                else if (isSelected && !response.isKind) stateClass = "incorrect";
                else stateClass = "faded";
              }

              return (
                <button
                  key={response.id}
                  className={`response-btn ${isSelected ? "selected" : ""} ${stateClass}`}
                  onClick={() => handleToggleResponse(response.id)}
                  disabled={showFeedback}
                  aria-pressed={isSelected}
                >
                  <span className="response-indicator">
                    {showFeedback
                      ? response.isKind
                        ? "✅"
                        : "❌"
                      : isSelected
                      ? "●"
                      : "○"}
                  </span>
                  <span className="response-text">{response.text}</span>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <FeedbackBanner
              message={scenario.explanation}
              isPositive={true}
              onContinue={handleNext}
              buttonText={currentIndex < total - 1 ? "Next Scenario" : "See Results"}
            />
          )}

          {!showFeedback && (
            <div className="empathy-submit-area">
              <button
                className="btn-primary empathy-submit"
                onClick={handleSubmit}
                disabled={selectedResponses.length == 0}
              >
                Check My Answers
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmpathyGamePage;
