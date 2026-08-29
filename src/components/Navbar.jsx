import React from 'react';

export default function Navbar({ toggleTheme, theme }) {
  return (
    <>
  <header className="site-header">
  <nav id="mainNav" aria-label="Primary navigation">
    <div className="ng-segment ng-top-bar"></div>
    <div className="ng-segment ng-right-arc"></div>
    <div className="ng-segment ng-bottom-dash"></div>

    <a href="#home" className="nav-brand" id="brandBtn" aria-label="Home" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
      <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 12 48 L 20 16 L 28 48 M 15 38 H 25" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 52 16 H 40 A 4 4 0 0 0 36 20 V 28 A 4 4 0 0 0 40 32 H 48 A 4 4 0 0 1 52 36 V 44 A 4 4 0 0 1 48 48 H 36" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="56" cy="12" r="4" fill="#3b82f6" />
      </svg>
    </a>

    <div className="nav-menu" id="navMenu">
      <a href="#about" className="nav-link active">About</a>
      <a href="#skills" className="nav-link">Skills</a>
      <a href="#work" className="nav-link">My Work</a>
      <a href="#contact" className="nav-link">Contact</a>
    </div>

    <div className="nav-actions">
      <button className="theme-toggle" id="themeBtn" aria-label="Toggle theme" title="Toggle theme" onClick={toggleTheme}>
        {theme === 'dark' ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>

      <button className="nav-hamburger" id="navToggle" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  </header>
  {/*  MOBILE SIDE PANEL  */}
  <div className="mobile-side-panel" id="mobileSidePanel">
    <div className="side-panel-links">
      <a href="#about" className="side-link">About</a>
      <a href="#skills" className="side-link">Skills</a>
      <a href="#work" className="side-link">My Work</a>
      <a href="#contact" className="side-link">Contact</a>
    </div>
  </div>
    </>
  );
}
