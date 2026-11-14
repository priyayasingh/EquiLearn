import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import UploadSection from './components/UploadSection'
import ReadingWorkspace from './components/ReadingWorkspace'
import KeywordsGlossary from './components/KeywordsGlossary'
import QuizSection from './components/QuizSection'
import AccessibilityGuide from './components/AccessibilityGuide'
import { EquiLearnLogo } from './assets/illustrations'

// API Base URL - works directly with Flask on 5000 or via Vite proxy
const API_BASE = 'http://127.0.0.1:5000'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [docData, setDocData] = useState(null)
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [apiOnline, setApiOnline] = useState(false)

  // Fetch dashboard stats and check health on mount
  useEffect(() => {
    checkHealth()
    fetchDashboard()
  }, [])

  const checkHealth = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/health`)
      if (res.ok) {
        setApiOnline(true)
      } else {
        setApiOnline(false)
      }
    } catch {
      setApiOnline(false)
    }
  }

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/dashboard`)
      if (res.ok) {
        const data = await res.json()
        setDashboardData(data)
      }
    } catch (err) {
      console.warn('Could not load dashboard data from backend:', err)
    }
  }

  // Upload a user document (.pdf, .docx, .txt)
  const handleUpload = async (file) => {
    if (!file) return
    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: formData
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to process document.')
      }

      setDocData(data)
      setActiveTab('workspace')
      fetchDashboard()
    } catch (err) {
      setError(`${err.message} Please ensure the backend is running at http://127.0.0.1:5000.`)
    } finally {
      setLoading(false)
    }
  }

  // Load a pre-built sample lesson
  const handleLoadSample = async (sampleKey) => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_BASE}/api/sample`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sample: sampleKey })
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to load sample lesson.')
      }

      setDocData(data)
      setActiveTab('workspace')
      fetchDashboard()
    } catch (err) {
      setError(`${err.message} Please check that the Python backend is running.`)
    } finally {
      setLoading(false)
    }
  }

  // Open a past document from the dashboard
  const handleOpenDoc = async (sessionId, targetTab = 'reading') => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/session/${sessionId}`)
      if (!res.ok) throw new Error('Could not retrieve session.')
      const data = await res.json()
      setDocData(data)
      setActiveTab(targetTab === 'quiz' ? 'quiz' : 'workspace')
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Delete a document from history
  const handleDeleteDoc = async (sessionId) => {
    if (!window.confirm('Are you sure you want to delete this document from history?')) {
      return
    }
    try {
      await fetch(`${API_BASE}/api/session/${sessionId}`, { method: 'DELETE' })
      if (docData?.session_id === sessionId) {
        setDocData(null)
      }
      fetchDashboard()
    } catch (err) {
      alert('Failed to delete document: ' + err.message)
    }
  }

  // Reset all dashboard history
  const handleResetDashboard = async () => {
    if (!window.confirm('Reset all saved documents and quiz history?')) {
      return
    }
    try {
      await fetch(`${API_BASE}/api/dashboard/reset`, { method: 'POST' })
      setDocData(null)
      fetchDashboard()
    } catch (err) {
      alert('Failed to reset dashboard: ' + err.message)
    }
  }

  // Submit quiz answers to backend
  const handleSubmitQuiz = async (sessionId, answers) => {
    const res = await fetch(`${API_BASE}/api/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, answers })
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || 'Failed to grade quiz.')
    }
    fetchDashboard()
    return data
  }

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        apiOnline={apiOnline}
        currentDoc={docData}
      />

      {/* Main Content Area */}
      <main className="main-content" id="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard
            dashboardData={dashboardData}
            onOpenDoc={handleOpenDoc}
            onDeleteDoc={handleDeleteDoc}
            onResetDashboard={handleResetDashboard}
            onLoadSample={handleLoadSample}
            onStartUpload={() => setActiveTab('workspace')}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'workspace' && (
          <>
            {!docData ? (
              <UploadSection
                onUpload={handleUpload}
                onLoadSample={handleLoadSample}
                loading={loading}
                error={error}
              />
            ) : (
              <ReadingWorkspace
                docData={docData}
                onOpenQuiz={() => setActiveTab('quiz')}
                onOpenKeywords={() => setActiveTab('keywords')}
                onNewUpload={() => setDocData(null)}
              />
            )}
          </>
        )}

        {activeTab === 'keywords' && (
          <KeywordsGlossary
            keywords={docData?.keywords || []}
            docTitle={docData?.filename || ''}
            onSelectKeyword={(k) => console.log('Selected keyword:', k)}
            onGoToReading={() => setActiveTab('workspace')}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizSection
            quiz={docData?.quiz || []}
            sessionId={docData?.session_id}
            docTitle={docData?.filename || ''}
            onSubmitQuiz={handleSubmitQuiz}
            onGoToReading={() => setActiveTab('workspace')}
          />
        )}

        {activeTab === 'guide' && <AccessibilityGuide />}
      </main>

      {/* Startup-Grade Footer */}
      <footer className="footer-redesigned" role="contentinfo">
        <div className="footer-left-brand">
          <EquiLearnLogo size={28} />
          <span>EquiLearn · Inclusive Learning Content Tool</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.825rem' }}>
          <span>Empowering Dyslexic, ADHD, Low-Vision & Diverse Learners</span>
          <span style={{ color: '#DABCCB' }}>•</span>
          <span>100% Offline-First Architecture</span>
        </div>
      </footer>
    </div>
  )
}
