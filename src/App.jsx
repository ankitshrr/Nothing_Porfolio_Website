import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contributions from './components/Contributions';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SkillSheet from './components/SkillSheet';
import useScrollSpy from './hooks/useScrollSpy';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const sectionIds = ['home', 'about', 'experience', 'skills', 'contributions', 'work', 'contact'];
  const { activeSection, scrollProgress } = useScrollSpy(sectionIds);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  useEffect(() => {
    // Add page-loaded class to body to trigger initial animations (e.g. Navbar fade-in)
    setTimeout(() => {
      document.body.classList.add('page-loaded');
    }, 100);

    // Reset scroll to top on page reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Initialize Lenis
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true
    });

    // Handle anchor links for Lenis
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          lenis.scrollTo(target);
        }
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    // Handle back to top button specifically
    const backToTop = document.querySelector('.mf-back-top');
    const handleBackToTop = () => {
      lenis.scrollTo(0);
    };
    if (backToTop) {
      backToTop.addEventListener('click', handleBackToTop);
    }

    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
      if (backToTop) {
        backToTop.removeEventListener('click', handleBackToTop);
      }
      lenis.destroy();
    };
  }, []);

  return (
    <>


      <div id="scrollProgress" style={{ width: `${scrollProgress}%` }}></div>
      
      <Navbar toggleTheme={toggleTheme} theme={theme} activeSection={activeSection} />

      <main className="container">
        <div className="grid-interface">
          <Hero containerVariants={containerVariants} itemVariants={itemVariants} />
          <About />
          <Experience />
          <Skills />
          <Contributions />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </main>

      <div id="bugToast" className="bug-toast"></div>
    </>
  );
}

export default App;
