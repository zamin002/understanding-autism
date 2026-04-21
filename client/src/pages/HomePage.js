import React from "react";
import ModuleCard from "../components/ModuleCard";
import AvatarDisplay from "../components/avatar/AvatarDisplay";
import "./HomePage.css";

function HomePage({ avatar }) {
  // might move this to a data file later if it grows
  const modules = [
    {
      title: "What is Autism?",
      description: "Learn the basics about autism in a friendly, simple way.",
      emoji: "📖",
      color: "#1B6CB0",
      link: "/learn",
    },
    {
      title: "Walk in My Shoes",
      description: "Interactive stories where your choices matter.",
      emoji: "📚",
      color: "#7EC8A0",
      textColor: "#2D3436",
      link: "/story",
    },
    {
      title: "Be a Good Friend",
      description: "A game about picking kind and helpful responses.",
      emoji: "🤝",
      color: "#FF8C6B",
      textColor: "#2D3436",
      link: "/empathy-game",
    },
    {
      title: "Sensory World",
      description: "Experience what sensory overload can feel like.",
      emoji: "🌊",
      color: "#C5A3FF",
      textColor: "#2D3436",
      link: "/sensory-sim",
    },
    {
      title: "Autism Ally Quiz",
      description: "Test what you have learned and earn your certificate!",
      emoji: "🏅",
      color: "#FFD93D",
      textColor: "#2D3436",
      link: "/quiz",
    },
  ];

  const floatingEmojis = [
    { icon: "🧩", delay: "0s" },
    { icon: "🌈", delay: "0.5s" },
    { icon: "💛", delay: "1s" },
    { icon: "🤝", delay: "1.5s" },
    { icon: "⭐", delay: "2s" },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content animate-fade-in">
            <h1 className="hero-title">
              Understanding <span className="hero-highlight">Autism</span>
            </h1>
            <p className="hero-subtitle">
              A fun, friendly place to learn about autism through stories,
              games, and activities. Let's build a kinder world together!
            </p>
            <div className="hero-badges">
              <span className="hero-badge">Ages 6–12</span>
              <span className="hero-badge">Interactive</span>
              <span className="hero-badge">Accessible</span>
            </div>
          </div>

          <div className="hero-visual animate-fade-in" style={{ animationDelay: "200ms" }}>
            {avatar ? (
              <div className="hero-avatar-wrap">
                <AvatarDisplay selections={avatar} size={160} />
                <p className="hero-avatar-label">Welcome back! 👋</p>
              </div>
            ) : (
              <div className="hero-emoji-cluster" aria-hidden="true">
                {floatingEmojis.map((e, i) => (
                  <span key={i} className="hero-float" style={{ animationDelay: e.delay }}>
                    {e.icon}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* module cards */}
      <section className="modules-section">
        <div className="container">
          <h2 className="section-title">Choose an Activity</h2>
          <p className="section-subtitle">
            Each activity teaches you something new about autism. Try them all!
          </p>
          <div className="modules-grid">
            {modules.map((mod, i) => (
              <ModuleCard key={mod.link} {...mod} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* for parents/teachers */}
      <section className="info-section">
        <div className="container">
          <div className="info-card animate-fade-in">
            <h2 className="info-title">👩‍🏫 For Parents & Teachers</h2>
            <p className="info-text">
              This website is designed to help children aged 6–12 understand
              autism in a positive, age-appropriate way. All content is based
              on academic research and follows accessibility best practices.
              It can be used at home, in classrooms, or during PSHE lessons.
            </p>
            <div className="info-links">
              <a href="https://www.autism.org.uk/" target="_blank" rel="noopener noreferrer" className="info-link">
                National Autistic Society &rarr;
              </a>
              <a href="https://www.nhs.uk/conditions/autism/" target="_blank" rel="noopener noreferrer" className="info-link">
                NHS Autism Information &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
