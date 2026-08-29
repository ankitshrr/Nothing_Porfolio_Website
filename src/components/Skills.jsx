import React from 'react';
import { motion } from 'framer-motion';

export default function Skills() {
  return (
      <section className="widget skills-widget" id="skills">
        <div className="section-header">
          <div>
            <span className="label">Technical Skills</span>
            <h2>Tools & Technologies</h2>
          </div>
        </div>

        <div className="radar-skills-container">
          <div className="radar-grid" id="radarGrid">
            <button className="radar-node" data-skill="PYTHON" data-level="INTERMEDIATE" data-subsystem="AUTOMATION" data-desc="Primary backend & scripting language. Used for automation, data processing, and APIs.">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
              <span>PYTHON</span>
            </button>
            <button className="radar-node" data-skill="JAVASCRIPT" data-level="FUNDAMENTAL" data-subsystem="WEB AUTOMATION" data-desc="Basic understanding of DOM manipulation and logic, learned primarily for web automation and QA.">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
              <span>JS</span>
            </button>
            <button className="radar-node" data-skill="HTML/CSS" data-level="FUNDAMENTAL" data-subsystem="QA LOCATING" data-desc="Basic understanding of document structure and selectors for locating elements in QA testing.">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              <span>HTML/CSS</span>
            </button>
            <button className="radar-node" data-skill="LINUX" data-level="FUNDAMENTAL" data-subsystem="OS/SERVER" data-desc="Server administration, bash scripting, file permissions, and environment setup.">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" />
              <span>LINUX</span>
            </button>
            <button className="radar-node" data-skill="DOCKER" data-level="FUNDAMENTAL" data-subsystem="INFRASTRUCTURE" data-desc="Containerization for isolated environments. Building images and docker-compose workflows.">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" />
              <span>DOCKER</span>
            </button>
            <button className="radar-node" data-skill="GIT/GITHUB" data-level="INTERMEDIATE" data-subsystem="VCS" data-desc="Version control, branching strategies, collaboration, and continuous integration.">
               <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path></svg>
              <span>VCS</span>
            </button>
            <button className="radar-node" data-skill="VS CODE" data-level="PRIMARY IDE" data-subsystem="ENVIRONMENT" data-desc="Main development environment. Extensions, debugging, integrated terminal, and Git workflow.">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" />
              <span>VSCODE</span>
            </button>
            <button className="radar-node" data-skill="SELENIUM" data-level="FUNDAMENTAL" data-subsystem="AUTOMATION" data-desc="Browser automation and web testing. Writing test scripts, locating elements, and headless execution.">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" alt="Selenium" />
              <span>SELENIUM</span>
            </button>
          </div>

          <div className="radar-panel">
            <div className="rp-header">
              <span className="rp-title">SYSTEM DIAGNOSTICS</span>
              <span className="rp-status blinking" id="rpStatus">AWAITING NODE</span>
            </div>
            
            <div className="rp-body" id="radarData">
              <div className="rp-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <p style={{marginTop: "16px", opacity: 0.6}}>HOVER OVER A NODE ON THE RADAR TO EXTRACT DATA.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
