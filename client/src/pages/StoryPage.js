import React, { useState } from "react";
import stories from "../data/stories";
import FeedbackBanner from "../components/FeedbackBanner";
import ProgressBar from "../components/ProgressBar";
import AvatarDisplay from "../components/avatar/AvatarDisplay";
import { Link } from "react-router-dom";
import "./StoryPage.css";

function StoryPage({ avatar }) {
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentSceneId, setCurrentSceneId] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [scenesVisited, setScenesVisited] = useState(1);
  const [storyFinished, setStoryFinished] = useState(false);

  // Select a story from the list
  const handleSelectStory = (story) => {
    setSelectedStory(story);
    setCurrentSceneId(0);
    setFeedback(null);
    setTotalPoints(0);
    setScenesVisited(1);
    setStoryFinished(false);
  };

  // Handle choice selection
  const handleChoice = (choice) => {
    const points = choice.points || 0;
    setTotalPoints((prev) => prev + points);

    const nextScene = selectedStory.scenes.find((s) => s.id == choice.nextScene);

    if (nextScene && nextScene.isEnding) {
      // Show ending scene feedback
      setFeedback({
        message: nextScene.feedback || nextScene.text,
        isPositive: nextScene.endType == "best",
      });
      setCurrentSceneId(choice.nextScene);
      setScenesVisited((prev) => prev + 1);
      setStoryFinished(true);
    } else {
      // Move to next scene, show scene feedback if available
      setCurrentSceneId(choice.nextScene);
      setScenesVisited((prev) => prev + 1);

      if (nextScene && nextScene.feedback) {
        setFeedback({
          message: nextScene.feedback,
          isPositive: points > 0,
        });
      } else {
        setFeedback(null);
      }
    }
  };

  const handleContinue = () => {
    setFeedback(null);
  };

  const handleBackToList = () => {
    setSelectedStory(null);
    setFeedback(null);
    setStoryFinished(false);
  };

  // Story selection screen
  if (!selectedStory) {
    return (
      <div className="story-page">
        <div className="container">
          <div className="story-header animate-fade-in">
            <h1>📚 Walk in My Shoes</h1>
            <p>
              Choose a story below. Read what happens, then pick what YOU
              would do. Your choices change the ending!
            </p>
          </div>

          <div className="story-list">
            {stories.map((story, i) => (
              <button
                key={story.id}
                className="story-select-card animate-fade-in"
                style={{ animationDelay: `${i * 120}ms`, "--story-color": story.color }}
                onClick={() => handleSelectStory(story)}
              >
                <span className="story-select-emoji" aria-hidden="true">{story.emoji}</span>
                <h3 className="story-select-title">{story.title}</h3>
                <p className="story-select-desc">{story.description}</p>
                <span className="story-select-cta">Play Story &rarr;</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  //Active story scene
  const scene = selectedStory.scenes.find((s) => s.id == currentSceneId);
  const totalScenes = selectedStory.scenes.filter((s) => !s.isEnding).length;

  // Story ending screen
  if (storyFinished && scene) {
    const maxPoints = selectedStory.scenes.reduce((sum, s) => {
      if (s.choices) {
        return sum + Math.max(...s.choices.map((c) => c.points || 0));
      }
      return sum + (s.points || 0);
    }, 0);

    const isBestEnding = scene.endType == "best";

    return (
      <div className="story-page">
        <div className="container">
          <div className="story-ending animate-pop">
            <span className="ending-emoji" aria-hidden="true">
              {isBestEnding ? "🌟" : "💭"}
            </span>
            <h2>{isBestEnding ? "Amazing Ending!" : "Story Complete"}</h2>
            <p className="ending-scene-text">{scene.text}</p>
            {scene.feedback && (
              <div className="ending-lesson">
                <strong>What we learned:</strong> {scene.feedback}
              </div>
            )}
            <div className="ending-score">
              You scored <strong>{totalPoints}</strong> out of <strong>{maxPoints}</strong> empathy points
            </div>
            <div className="ending-actions">
              <button className="btn-primary" onClick={() => handleSelectStory(selectedStory)}>
                Try Again
              </button>
              <button className="btn-secondary" onClick={handleBackToList}>
                Choose Another Story
              </button>
              <Link to="/empathy-game" className="btn-secondary">
                Play Empathy Game &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="story-page">
      <div className="container">
        <button className="story-back-btn" onClick={handleBackToList} aria-label="Back to story list">
          &larr; All Stories
        </button>

        <ProgressBar
          current={Math.min(scenesVisited, totalScenes)}
          total={totalScenes}
          label={selectedStory.title}
        />

        <div className="story-scene-card animate-fade-in" key={currentSceneId}>
          <div className="scene-header" style={{ background: selectedStory.color }}>
            <span className="scene-emoji" aria-hidden="true">{selectedStory.emoji}</span>
            <h2 className="scene-title">{selectedStory.title}</h2>
          </div>

          <div className="scene-body">
            <p className="scene-text">{scene.text}</p>

            {feedback && (
              <FeedbackBanner
                message={feedback.message}
                isPositive={feedback.isPositive}
                onContinue={handleContinue}
                buttonText="Continue reading"
              />
            )}

            {!feedback && scene.choices && (
              <div className="scene-choices">
                {avatar && (
                  <div className="scene-player">
                    <AvatarDisplay selections={avatar} size={56} />
                    <p className="scene-player-label">What do you do?</p>
                  </div>
                )}
                {!avatar && <p className="choices-prompt">What do you do?</p>}
                {scene.choices.map((choice, i) => (
                  <button
                    key={i}
                    className="choice-btn animate-fade-in"
                    style={{ animationDelay: `${i * 100}ms` }}
                    onClick={() => handleChoice(choice)}
                  >
                    <span className="choice-number">{i + 1}</span>
                    <span className="choice-text">{choice.text}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryPage;
