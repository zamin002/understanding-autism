import React, { useState, useEffect } from "react";
import quizQuestions from "../data/quizQuestions";
import { MODULE_IDS } from "../data/moduleIds";
import ProgressBar from "../components/ProgressBar";
import FeedbackBanner from "../components/FeedbackBanner";
import AvatarDisplay from "../components/avatar/AvatarDisplay";
import { updateProgress } from "../api";
import { Link, useNavigate } from "react-router-dom";
import "./QuizPage.css";

function QuizPage({ avatar, sessionId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const navigate = useNavigate();
  const question = quizQuestions[currentIndex];
  const total = quizQuestions.length;

  const handleSelect = (index) => {
    if (showFeedback) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption == null) return;
    const isCorrect = selectedOption == question.correctIndex;
    if (isCorrect) setScore((prev) => prev + 1);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setQuizComplete(false);
  };

  const passThreshold = Math.ceil(total * 0.7); // need 70% to pass
  const passed = score >= passThreshold;

  useEffect(() => {
    if (quizComplete && sessionId) {
      updateProgress(sessionId, MODULE_IDS.quiz, "completed", score).catch(() => {});
    }
  }, [quizComplete]);

  const isCorrect = selectedOption == question?.correctIndex;
  const reactionAvatar = avatar && showFeedback
    ? { ...avatar, eye_style: isCorrect ? "stars" : "sleepy", mouth: isCorrect ? "grin" : "neutral" }
    : avatar;

  // Quiz complete
  if (quizComplete) {
    return (
      <div className="quiz-page">
        <div className="container">
          <div className="quiz-complete animate-pop">
            <span className="qc-emoji" aria-hidden="true">
              {passed ? "🏅" : "💪"}
            </span>
            <h2>{passed ? "You Are an Autism Ally!" : "Great Try!"}</h2>
            <p className="qc-score">
              You got <strong>{score}</strong> out of <strong>{total}</strong> correct.
            </p>
            <p className="qc-message">
              {passed
                ? "Congratulations! You really understand autism and how to be a great friend. You have earned your Autism Ally Certificate!"
                : `You need at least ${passThreshold} correct answers to earn your certificate. Don't worry — you can try again after reviewing the learning sections!`}
            </p>
            <div className="qc-actions">
              {passed && (
                <Link to="/certificate" state={{ passed: true }} className="btn-certificate">
                  🏆 Get My Certificate
                </Link>
              )}
              <button className="btn-primary" onClick={handleRestart}>
                {passed ? "Take Again" : "Try Again"}
              </button>
              {!passed && (
                <Link to="/learn" className="btn-secondary">
                  Review the Lessons &rarr;
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="container">
        <div className="quiz-header animate-fade-in">
          <h1>🏅 Autism Ally Quiz</h1>
          <p>Answer the questions to show what you have learned. Get {passThreshold}+ correct to earn your certificate!</p>
        </div>

        <ProgressBar current={currentIndex + 1} total={total} label="Question" />

        <div className="quiz-card animate-fade-in" key={question.id}>
          {reactionAvatar && (
            <div className="quiz-avatar">
              <AvatarDisplay selections={reactionAvatar} size={64} />
            </div>
          )}
          <div className="quiz-question-area">
            <span className="question-number">Question {currentIndex + 1}</span>
            <h2 className="question-text">{question.question}</h2>
          </div>

          <div className="quiz-options">
            {question.options.map((option, i) => {
              let stateClass = "";
              if (showFeedback) {
                if (i == question.correctIndex) stateClass = "correct";
                else if (i == selectedOption) stateClass = "incorrect";
                else stateClass = "faded";
              }

              const letterLabel = String.fromCharCode(65 + i);

              return (
                <button
                  key={i}
                  className={`quiz-option ${selectedOption == i ? "selected" : ""} ${stateClass}`}
                  onClick={() => handleSelect(i)}
                  disabled={showFeedback}
                  aria-label={`Option ${i + 1}: ${option}`}
                >
                  <span className="option-letter">{letterLabel}</span>
                  <span className="option-text">{option}</span>
                  {showFeedback && i == question.correctIndex && (
                    <span className="option-check">✅</span>
                  )}
                  {showFeedback && i == selectedOption && i !== question.correctIndex && (
                    <span className="option-check">❌</span>
                  )}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="quiz-feedback-area">
              <FeedbackBanner
                message={question.explanation}
                isPositive={selectedOption == question.correctIndex}
                onContinue={handleNext}
                buttonText={currentIndex < total - 1 ? "Next Question" : "See Results"}
              />
            </div>
          )}

          {!showFeedback && (
            <div className="quiz-submit-area">
              <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={selectedOption == null}
              >
                Submit Answer
              </button>
              <button
                className="btn-skip"
                onClick={handleNext}
              >
                Skip this question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
