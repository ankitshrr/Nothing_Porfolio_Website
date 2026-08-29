import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Globe, Shield, Zap, MoreHorizontal, ArrowRight, Terminal, Inbox } from 'lucide-react';

export default function Projects() {
  return (
      <motion.section className="widget projects-widget" id="work"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
>
        <div className="section-header projects-header">
          <div>
            <span className="label">Projects</span>
            <h2>My Work</h2>
          </div>
          
          <div className="project-filters" id="projectFilters">
            <button className="filter-btn active" data-filter="all">
              <LayoutGrid size={14} strokeWidth={2} /><span>All</span>
            </button>
            <button className="filter-btn" data-filter="web">
              <Globe size={14} strokeWidth={2} /><span>Web</span>
            </button>
            <button className="filter-btn" data-filter="qa">
              <Shield size={14} strokeWidth={2} /><span>QA</span>
            </button>
            <button className="filter-btn" data-filter="automation">
              <Zap size={14} strokeWidth={2} /><span>Automation</span>
            </button>
            <button className="filter-btn" data-filter="other">
              <MoreHorizontal size={14} strokeWidth={2} /><span>Other</span>
            </button>
          </div>
        </div>

        <div className="projects-container">
          <div id="featuredProjects" className="projects-grid">
            
            {/*  Hero Card  */}
            <div className="bento-card" data-category="web">
              <div className="bento-img">
                <img src="assets/img/projects/portfolio.webp" alt="Portfolio" loading="lazy" onError={(e) => e.target.src='https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'} />
              </div>
              <div className="bento-content">
                <div className="bento-header">
                  <div>
                    <span style={{fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', padding: '4px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '8px', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-main)'}}>Featured</span>
                    <h3 className="bento-title">Portfolio Website</h3>
                  </div>
                </div>
                
                <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px'}}>
                  <span className="qa-metric-badge" style={{display: 'inline-flex', alignItems: 'center', padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: '#E5E7EB', fontFamily: '"JetBrains Mono",monospace', fontSize: '9.5px', border: '1px solid rgba(255,255,255,0.1)'}}>Lighthouse 100</span>
                  <span className="qa-metric-badge" style={{display: 'inline-flex', alignItems: 'center', padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: '#E5E7EB', fontFamily: '"JetBrains Mono",monospace', fontSize: '9.5px', border: '1px solid rgba(255,255,255,0.1)'}}>60 FPS</span>
                </div>
                
                <p className="bento-desc">A high-performance personal portfolio built with vanilla web technologies.</p>
                
                <div style={{fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px'}}>HTML · CSS · JavaScript</div>
                
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)'}}>
                  <a href="https://ankitshrr.github.io/nothing-portfolio" target="_blank" rel="noopener" style={{display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--text-main)', textDecoration: 'none', transition: 'opacity 0.2s'}} onMouseOver={(e) => e.currentTarget.style.opacity='0.8'} onMouseOut={(e) => e.currentTarget.style.opacity='1'}>
                    Live Demo
                    <ArrowRight size={14} strokeWidth={2} />
                  </a>
                  <a href="https://github.com/ankitshrr/nothing-portfolio" target="_blank" rel="noopener" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: 'var(--text-main)', textDecoration: 'none', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background='rgba(255,255,255,0.1)'} onMouseOut={(e) => e.currentTarget.style.background='rgba(255,255,255,0.05)'} aria-label="GitHub Repository">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/*  Card 2  */}
            <div className="bento-card" data-category="web">
              <div className="bento-img">
                <img src="assets/img/projects/altitude.webp" alt="Altitude 3D Parallax" loading="lazy" onError={(e) => e.target.src='https://images.unsplash.com/photo-1506744626753-140285396243?auto=format&fit=crop&w=600&q=80'} />
              </div>
              <div className="bento-content">
                <div className="bento-header">
                  <h3 className="bento-title">Altitude 3D Parallax</h3>
                </div>
                <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px'}}>
                  <span className="qa-metric-badge" style={{display: 'inline-flex', alignItems: 'center', padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: '#E5E7EB', fontFamily: '"JetBrains Mono",monospace', fontSize: '9.5px', border: '1px solid rgba(255,255,255,0.1)'}}>60 FPS</span>
                </div>
                <p className="bento-desc">An immersive 3D scrolling experience inspired by Zhangjiajie.</p>
                
                <div style={{fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px'}}>HTML · CSS</div>
                
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)'}}>
                  <a href="https://ankitshrr.github.io/zhangjiajie-3d-parallax" target="_blank" rel="noopener" style={{display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--text-main)', textDecoration: 'none', transition: 'opacity 0.2s'}} onMouseOver={(e) => e.currentTarget.style.opacity='0.8'} onMouseOut={(e) => e.currentTarget.style.opacity='1'}>
                    Live Demo
                    <ArrowRight size={14} strokeWidth={2} />
                  </a>
                  <a href="https://github.com/ankitshrr/zhangjiajie-3d-parallax" target="_blank" rel="noopener" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: 'var(--text-main)', textDecoration: 'none', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background='rgba(255,255,255,0.1)'} onMouseOut={(e) => e.currentTarget.style.background='rgba(255,255,255,0.05)'} aria-label="GitHub Repository">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/*  Card 3  */}
            <div className="bento-card" data-category="other">
              <div className="bento-img">
                <img src="assets/img/projects/terminal.webp" alt="Terminal Lyric Sync" loading="lazy" onError={(e) => e.target.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'} />
              </div>
              <div className="bento-content">
                <div className="bento-header">
                  <h3 className="bento-title">Terminal Lyric Sync</h3>
                </div>
                <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px'}}>
                  <span className="qa-metric-badge" style={{display: 'inline-flex', alignItems: 'center', padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: '#E5E7EB', fontFamily: '"JetBrains Mono",monospace', fontSize: '9.5px', border: '1px solid rgba(255,255,255,0.1)'}}>Python 3.10+</span>
                </div>
                <p className="bento-desc">A lightweight CLI tool that fetches and synchronizes song lyrics to audio playback in real-time.</p>
                
                <div style={{fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px'}}>Python · CLI</div>
                
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)'}}>
                  <span style={{fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px'}}>
                    CLI Tool
                    <Terminal size={14} strokeWidth={2} />
                  </span>
                  <a href="https://github.com/ankitshrr/python-lyric-sync" target="_blank" rel="noopener" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: 'var(--text-main)', textDecoration: 'none', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background='rgba(255,255,255,0.1)'} onMouseOut={(e) => e.currentTarget.style.background='rgba(255,255,255,0.05)'} aria-label="GitHub Repository">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/*  Empty State  */}
          <div id="emptyState" className="empty-state" style={{display: 'none'}}>
            <Inbox className="empty-state-icon" size={48} strokeWidth={1.5} />
            <h3>Data Not Found</h3>
            <p>Projects in this category are currently in development or under NDA. New case studies will be deployed here soon.</p>
          </div>
        </div>
      </motion.section>
  );
}
