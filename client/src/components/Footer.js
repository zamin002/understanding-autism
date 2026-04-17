import React from "react";
import "./Footer.css";

function Footer() {
  const nhsUrl = "https://www.nhs.uk/conditions/autism/";
  const nasUrl = "https://www.autism.org.uk/";

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <p className="footer-text">
          <span className="footer-emoji" aria-hidden="true">🧩</span>{" "}
          Understanding Autism: Made to help children learn about autism with kindness.
        </p>
        <p className="footer-sub">
          Created by Zahir Amin &middot; Goldsmiths, University of London &middot; Final Year Project 2026
        </p>
        <p className="footer-note">
          This website is for educational purposes. For professional advice about autism, please visit the{" "}
          <a href={nhsUrl} target="_blank" rel="noopener noreferrer">NHS Autism page</a>{" "}
          or the{" "}
          <a href={nasUrl} target="_blank" rel="noopener noreferrer">National Autistic Society</a>.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
