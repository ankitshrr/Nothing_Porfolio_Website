import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function SkillSheet({ isOpen, node, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <div 
        className={`skill-sheet-overlay ${isOpen ? 'open' : ''}`} 
        aria-hidden={!isOpen}
        onClick={onClose}
      ></div>
      <div 
        className={`skill-sheet ${isOpen ? 'open' : ''}`} 
        role="dialog" 
        aria-modal="true" 
        aria-label="Skill detail"
      >
        <div className="skill-sheet-handle"></div>
        <div className="skill-sheet-header">
          <span className="skill-sheet-title">
            {node ? `NODE: ${node.skill}` : 'SYSTEM DIAGNOSTICS'}
          </span>
          <button className="skill-sheet-close" onClick={onClose} aria-label="Close">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
        <div className="skill-sheet-body">
          {node && (
            <div className="rp-data-view active">
              <h3 className="rp-large-title">{node.icon} {node.skill}</h3>
              <div className="rp-stats-grid">
                <div className="rp-stat-box">
                  <span className="rp-stat-label">SYS.LVL</span>
                  <span className="rp-stat-val">{node.level}</span>
                </div>
                <div className="rp-stat-box">
                  <span className="rp-stat-label">SUBSYSTEM</span>
                  <span className="rp-stat-val">{node.subsystem}</span>
                </div>
              </div>
              <p className="rp-desc">{node.desc}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
