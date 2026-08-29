import { useState, useEffect } from 'react';

export default function useScrollSpy(sectionIds, offset = 140) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || 'home');

  useEffect(() => {
    const handleScroll = () => {
      // Scroll Progress Calculation (Direct DOM mutation to prevent re-renders)
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollVal = windowHeight > 0 ? totalScroll / windowHeight : 0;
      
      const progressBar = document.getElementById('scrollProgress');
      if (progressBar) {
        progressBar.style.transform = `scaleX(${scrollVal})`;
      }

      // Scroll Spy Calculation (Optimized active section detection)
      const y = window.scrollY + offset;
      let currentId = sectionIds[0] || 'home';

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= y) {
          currentId = id;
        }
      }
      
      if (currentId !== activeSection) {
        setActiveSection(currentId);
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset, activeSection]);

  return { activeSection };
}
