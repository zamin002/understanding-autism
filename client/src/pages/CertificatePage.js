import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./CertificatePage.css";

function CertificatePage() {
  const [name, setName] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const certRef = useRef(null);

  // format the date nicely for the certificate
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleGenerate = () => {
    if (name.trim()) {
      setShowCertificate(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleGenerate();
    }
  };

  if (!showCertificate) {
    return (
      <div className="certificate-page">
        <div className="container">
          <div className="cert-intro animate-fade-in">
            <span className="cert-intro-emoji" aria-hidden="true">🏆</span>
            <h1>Your Autism Ally Certificate</h1>
            <p>
              Well done for completing the quiz! Enter your name below to
              generate your personal certificate.
            </p>
            <div className="cert-name-input">
              <label htmlFor="cert-name">Your first name:</label>
              <input
                id="cert-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your name here..."
                maxLength={30}
                autoFocus
              />
              <button
                className="btn-primary"
                onClick={handleGenerate}
                disabled={!name.trim()}
              >
                Create My Certificate!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const trimmedName = name.trim();

  return (
    <div className="certificate-page">
      <div className="container">
        {/* Printable certificate */}
        <div className="certificate animate-pop" ref={certRef} id="certificate">
          <div className="cert-border">
            <div className="cert-inner">
              <div className="cert-ribbon" aria-hidden="true">🏅</div>
              <h2 className="cert-heading">Certificate of Achievement</h2>
              <p className="cert-subtitle">This certifies that</p>
              <h1 className="cert-name">{trimmedName}</h1>
              <p className="cert-body">
                has successfully completed the <strong>Understanding Autism</strong> learning
                programme and demonstrated knowledge, empathy, and kindness.
              </p>
              <div className="cert-badge">
                <span className="cert-badge-emoji" aria-hidden="true">⭐</span>
                <span className="cert-badge-text">Autism Ally</span>
              </div>
              <p className="cert-date">Awarded on {today}</p>
              <div className="cert-footer">
                <span>Understanding Autism Project</span>
                <span>🧩</span>
                <span>Goldsmiths, University of London</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions (hidden when printing) */}
        <div className="cert-actions no-print">
          <button className="btn-primary" onClick={handlePrint}>
            🖨️ Print Certificate
          </button>
          <button className="btn-secondary" onClick={() => setShowCertificate(false)}>
            Change Name
          </button>
          <Link to="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CertificatePage;
