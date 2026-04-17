import React, { useState } from "react";
import educationPages from "../data/educationPages";
import ProgressBar from "../components/ProgressBar";
import { Link } from "react-router-dom";
import "./LearnPage.css";

function LearnPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [completed, setCompleted] = useState(false);

  const total = educationPages.length;
  const page = educationPages[currentPage];

  const handleNext = () => {
    if (currentPage < total - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRestart = () => {
    setCurrentPage(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="learn-page">
        <div className="container">
          <div className="learn-complete animate-pop">
            <span className="learn-complete-emoji" aria-hidden="true">🎉</span>
            <h2>Well Done!</h2>
            <p>
              You have finished the "What is Autism?" section. You now know
              the basics about how autistic people experience the world.
            </p>
            <div className="learn-complete-actions">
              <button className="btn-primary" onClick={handleRestart}>
                Read Again
              </button>
              <Link to="/story" className="btn-secondary">
                Try a Story Next &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isFirst = currentPage == 0;
  const isLast = currentPage == total - 1;

  return (
    <div className="learn-page">
      <div className="container">
        <ProgressBar current={currentPage + 1} total={total} label="Learning progress" />

        <div className="learn-card animate-fade-in" key={page.id} style={{ "--page-color": page.color }}>
          <div className="learn-card-header">
            <span className="learn-card-emoji" aria-hidden="true">{page.emoji}</span>
            <h2 className="learn-card-title">{page.title}</h2>
            <span className="learn-card-step">Page {currentPage + 1} of {total}</span>
          </div>

          <div className="learn-card-body">
            <p className="learn-card-content">{page.content}</p>

            <div className="learn-funfact">
              <span className="funfact-icon" aria-hidden="true">💡</span>
              <div>
                <strong className="funfact-label">Fun Fact</strong>
                <p className="funfact-text">{page.funFact}</p>
              </div>
            </div>
          </div>

          <div className="learn-card-nav">
            <button
              className="btn-nav btn-back"
              onClick={handleBack}
              disabled={isFirst}
              aria-label="Go to previous page"
            >
              &larr; Back
            </button>
            <button
              className="btn-nav btn-next"
              onClick={handleNext}
              aria-label={isLast ? "Finish section" : "Go to next page"}
            >
              {isLast ? "Finish!" : "Next"} &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnPage;
