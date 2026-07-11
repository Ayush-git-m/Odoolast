import { useState } from 'react'
import HomePage from './components/HomePage'
import SignInForm from './components/SignInForm'
import LoginForm from './components/LoginForm'
import OtpPage from './components/OtpPage'

export default function App() {
  const [page, setPage] = useState('home')
  const [authMode, setAuthMode] = useState('signin')
  const [userEmail, setUserEmail] = useState('')

  const goToOtp = (email, mode) => {
    setUserEmail(email)
    setAuthMode(mode)
    setPage('otp')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — dark navy brand strip */}
      <div
        className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 px-12 py-14"
        style={{ background: 'linear-gradient(160deg, #0d1f3c 0%, #1e3a5f 60%, #163050 100%)' }}
      >
        <div>
          <div className="flex items-center gap-2.5 mb-16">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#3b82f6' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L2 4.5V11.5L8 15L14 11.5V4.5L8 1Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="8" cy="8" r="2" fill="white"/>
              </svg>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">Vaultex</span>
          </div>

          <div className="mt-auto">
            <h1 className="text-white text-3xl font-light leading-snug mb-4" style={{ letterSpacing: '-0.02em' }}>
              Secure access<br />to your workspace.
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Enterprise-grade authentication with multi-factor verification to keep your data protected.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: '🔒', label: 'End-to-end encryption' },
            { icon: '✉️', label: 'OTP email verification' },
            { icon: '🛡️', label: 'Zero-trust architecture' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-base">{icon}</span>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form area */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        {page === 'home' && <HomePage onSignIn={() => setPage('signin')} onLogin={() => setPage('login')} />}
        {page === 'signin' && <SignInForm onSubmit={(email) => goToOtp(email, 'signin')} onBack={() => setPage('home')} />}
        {page === 'login' && <LoginForm onSubmit={(email) => goToOtp(email, 'login')} onBack={() => setPage('home')} />}
        {page === 'otp' && <OtpPage email={userEmail} mode={authMode} onBack={() => setPage(authMode)} />}
      </div>
    </div>
  )
}
