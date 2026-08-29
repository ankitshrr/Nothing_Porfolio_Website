import React from 'react';
import { motion } from 'framer-motion';

export default function Experience() {
  return (
      <motion.section className="widget experience-widget" id="experience"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
>
        <div className="section-header sm-margin">
          <div>
            <span className="label">Journey</span>
            <h2>Experience</h2>
          </div>
        </div>

        <div className="commit-timeline">
          <div className="commit-line"></div>

          <div className="commit-node">
            <div className="commit-dot"></div>
            <div className="commit-content">
              <div className="commit-meta">
                <span className="commit-hash">2a9f4c1</span>
                <span className="commit-date">Present</span>
              </div>
              <h3 className="commit-title">QA Engineer</h3>
              <span className="commit-subtitle">Current Focus</span>
              <p className="commit-desc">Working on Manual QA, creating effective test cases, improving software quality, and transitioning into Automation Testing.</p>
            </div>
          </div>

          <div className="commit-node">
            <div className="commit-dot"></div>
            <div className="commit-content">
              <div className="commit-meta">
                <span className="commit-hash">8b3e2d9</span>
                <span className="commit-date">2024</span>
              </div>
              <h3 className="commit-title">DevOps Basics</h3>
              <span className="commit-subtitle">Self-Directed Learning</span>
              <p className="commit-desc">Learned the fundamentals of DevOps, Docker containerization, and Linux environments to understand deployment lifecycles.</p>
            </div>
          </div>

          <div className="commit-node">
            <div className="commit-dot"></div>
            <div className="commit-content">
              <div className="commit-meta">
                <span className="commit-hash">1f8c7e2</span>
                <span className="commit-date">2023</span>
              </div>
              <h3 className="commit-title">Web Development</h3>
              <span className="commit-subtitle">The Beginning</span>
              <p className="commit-desc">Started my technical journey by learning core web technologies including HTML, CSS, and JavaScript.</p>
            </div>
          </div>
        </div>
      </motion.section>
  );
}
