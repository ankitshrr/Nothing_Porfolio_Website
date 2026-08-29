import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
      <motion.section className="widget about-widget" id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
>
        <div className="section-header sm-margin">
          <div>
            <span className="label">About</span>
            <h2>Who I Am</h2>
          </div>
        </div>
        <div className="about-grid">
          <div className="about-text-container">
            <p className="about-desc" style={{fontSize: 'clamp(16px, 2vw, 22px)'}}>
              I’m a QA Engineer focused on software quality, testing, and reliable user experiences. I enjoy finding issues, designing effective test scenarios, and ensuring software works as expected. I work with Manual Testing, API Testing, Python, and test automation with a strong attention to detail<span className="bug-target" data-bug="2" style={{display: 'inline-block', transform: 'translateY(2px)', cursor: 'help'}}>.</span>
            </p>

            <div className="about-links" style={{marginTop: '12px'}}>
              <a className="btn-system btn-mini" href="#contact">
                Let's Connect
                <ArrowRight size={16} strokeWidth={2} />
              </a>
            </div>

            <p className="about-foot" style={{marginTop: '12px'}}>
              Location: Kathmandu, Nepal
            </p>
          </div>

          <div className="about-photo-container" aria-label="Profile photo">
            {/*  GLYPH CORNERS  */}
            <div className="photo-glyph pg-tl">
              <div className="glyph-segment idle pg-h"></div>
              <div className="glyph-segment idle pg-v"></div>
            </div>
            <div className="photo-glyph pg-br">
              <div className="glyph-segment idle pg-h"></div>
              <div className="glyph-segment idle pg-v"></div>
            </div>
            <img src="assets/img/ankit.webp" alt="Profile" />
          </div>
        </div>
      </motion.section>
  );
}
