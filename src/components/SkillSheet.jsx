import React from 'react';
import { X } from 'lucide-react';

export default function SkillSheet() {
  return (
    <>
  <div className="skill-sheet-overlay" id="skillSheetOverlay" aria-hidden="true"></div>
  <div className="skill-sheet" id="skillSheet" role="dialog" aria-modal="true" aria-label="Skill detail">
    <div className="skill-sheet-handle"></div>
    <div className="skill-sheet-header">
      <span className="skill-sheet-title" id="skillSheetTitle">SYSTEM DIAGNOSTICS</span>
      <button className="skill-sheet-close" id="skillSheetClose" aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div className="skill-sheet-body" id="skillSheetBody"></div>
  </div>
    </>
  );
}
