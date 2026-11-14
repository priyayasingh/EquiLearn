import React from 'react'
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  GraduationCap,
  HelpCircle,
  Wifi,
  WifiOff
} from 'lucide-react'
import { EquiLearnLogo } from '../assets/illustrations'

export default function Navbar({ activeTab, setActiveTab, apiOnline, currentDoc }) {
  return (
    <header className="navbar" role="banner">
      <div
        className="nav-brand"
        onClick={() => setActiveTab('dashboard')}
        role="button"
        tabIndex={0}
        aria-label="EquiLearn Home Dashboard"
      >
        <EquiLearnLogo size={42} />
        <div className="brand-text">
          <h1>
            Equi<span>Learn</span>
            <span className="brand-badge">EDTECH</span>
          </h1>
          <p>INCLUSIVE LEARNING FOR EVERY MIND</p>
        </div>
      </div>

      <nav className="nav-links" aria-label="Main Navigation">
        <button
          type="button"
          className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
          aria-current={activeTab === 'dashboard' ? 'page' : undefined}
        >
          <LayoutDashboard size={18} strokeWidth={2.2} />
          <span>Dashboard</span>
        </button>

        <button
          type="button"
          className={`nav-tab-btn ${activeTab === 'workspace' ? 'active' : ''}`}
          onClick={() => setActiveTab('workspace')}
          aria-current={activeTab === 'workspace' ? 'page' : undefined}
        >
          <BookOpen size={18} strokeWidth={2.2} />
          <span>{currentDoc ? 'Reading Room' : 'Upload & Adapt'}</span>
        </button>

        <button
          type="button"
          className={`nav-tab-btn ${activeTab === 'keywords' ? 'active' : ''}`}
          onClick={() => setActiveTab('keywords')}
          aria-current={activeTab === 'keywords' ? 'page' : undefined}
        >
          <Sparkles size={18} strokeWidth={2.2} />
          <span>Keywords</span>
        </button>

        <button
          type="button"
          className={`nav-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
          aria-current={activeTab === 'quiz' ? 'page' : undefined}
        >
          <GraduationCap size={18} strokeWidth={2.2} />
          <span>Quiz & Feedback</span>
        </button>

        <button
          type="button"
          className={`nav-tab-btn ${activeTab === 'guide' ? 'active' : ''}`}
          onClick={() => setActiveTab('guide')}
          aria-current={activeTab === 'guide' ? 'page' : undefined}
        >
          <HelpCircle size={18} strokeWidth={2.2} />
          <span>Guide</span>
        </button>
      </nav>

      <div className="nav-status">
        <span
          className={`api-pill ${apiOnline ? 'connected' : 'disconnected'}`}
          title={apiOnline ? 'Local Python Flask Engine Connected' : 'Backend is not responding on port 5000'}
          role="status"
          aria-live="polite"
        >
          {apiOnline ? <Wifi size={14} strokeWidth={2.5} /> : <WifiOff size={14} strokeWidth={2.5} />}
          <span className="pulse-dot" />
          {apiOnline ? 'Engine Online' : 'Engine Offline'}
        </span>
      </div>
    </header>
  )
}
