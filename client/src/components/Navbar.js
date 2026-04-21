import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AvatarDisplay from "./avatar/AvatarDisplay";
import "./Navbar.css";

function Navbar({ calmMode, setCalmMode, avatar, onEditAvatar }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home", emoji: "🏠" },
    { path: "/learn", label: "Learn", emoji: "📖" },
    { path: "/story", label: "Stories", emoji: "📚" },
    { path: "/empathy-game", label: "Empathy Game", emoji: "🤝" },
    { path: "/sensory-sim", label: "Sensory World", emoji: "🌊" },
    { path: "/quiz", label: "Quiz", emoji: "🏅" },
  ];

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const calmLabel = calmMode ? "Turn off calm mode" : "Turn on calm mode";

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner container">

        <Link to="/" className="navbar-logo" aria-label="Understanding Autism home">
          <span className="navbar-logo-icon">🧩</span>
          <span className="navbar-logo-text">Understanding Autism</span>
        </Link>

        <div className="navbar-right">
          {avatar && (
            <button
              className="avatar-nav-btn"
              onClick={onEditAvatar}
              aria-label="Edit your avatar"
              title="Edit avatar"
            >
              <AvatarDisplay selections={avatar} size={38} />
            </button>
          )}

          <button
            className={`calm-toggle ${calmMode ? "active" : ""}`}
            onClick={() => setCalmMode(!calmMode)}
            aria-label={calmLabel}
            title="Calm mode reduces motion and uses softer colours"
          >
            {calmMode ? "🌙" : "☀️"} {calmMode ? "Calm On" : "Calm Off"}
          </button>

          {/* mobile hamburger */}
          <button
            className="navbar-toggle"
            onClick={handleMenuToggle}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className={`hamburger ${menuOpen ? "open" : ""}`} />
          </button>
        </div>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {navLinks.map((link) => {
            const isActive = currentPath == link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${isActive ? "active" : ""}`}
                onClick={closeMenu}
              >
                <span className="navbar-link-emoji" aria-hidden="true">{link.emoji}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
