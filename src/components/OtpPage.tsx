import { useState, useRef, useEffect } from 'react'

export default function OtpPage({ email, mode, onBack }) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')
  const [resent, setResent] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const refs = useRef([])

  useEffect(() => {
    refs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[i] = val
    setOtp(next)
    setError('')
    if (val && i < 5) refs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs.current[i - 1]?.focus()
  }

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (text.length === 6) {
      setOtp(text.split(''))
      refs.current[5]?.focus()
    }
  }

  const handleVerify = () => {
    const code = otp.join('')
    if (code.length < 6) { setError('Please enter all 6 digits'); return }
    setVerified(true)
  }

  const handleResend = () => {
    if (countdown > 0) return
    setResent(true)
    setCountdown(30)
    setOtp(['', '', '', '', '', ''])
    setTimeout(() => setResent(false), 3000)
    refs.current[0]?.focus()
  }

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + '*'.repeat(Math.max(2, b.length)) + c)

  if (verified) {
    return (
      <div className="w-full max-w-sm text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0' }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M6 14l6 6 10-10" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-2" style={{ color: '#0d1f3c', letterSpacing: '-0.02em' }}>
          Verified
        </h2>
        <p className="text-sm" style={{ color: '#64748b' }}>
          {mode === 'signin' ? 'Your account has been created.' : 'You are now logged in.'} Welcome to Vaultex.
        </p>
        <button
          onClick={onBack}
          className="mt-8 text-xs underline transition-colors hover:text-slate-700"
          style={{ color: '#94a3b8' }}
        >
          Return to {mode === 'signin' ? 'sign in' : 'log in'}
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs mb-10 transition-colors hover:text-slate-700"
        style={{ color: '#94a3b8' }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </button>

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-8"
        style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe' }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="5" width="18" height="13" rx="2" stroke="#1e40af" strokeWidth="1.4"/>
          <path d="M2 8l9 6 9-6" stroke="#1e40af" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </div>

      <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: '#94a3b8' }}>2-Step Verification</p>
      <h2 className="text-2xl font-semibold mb-2" style={{ color: '#0d1f3c', letterSpacing: '-0.02em' }}>
        Check your email
      </h2>
      <p className="text-sm mb-8" style={{ color: '#64748b' }}>
        We sent a 6-digit code to{' '}
        <span className="font-medium" style={{ color: '#0d1f3c' }}>{maskedEmail}</span>
      </p>

      <div className="flex gap-2.5 mb-2" onPaste={handlePaste}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={el => { refs.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            className="otp-input"
          />
        ))}
      </div>

      {error && <p className="text-xs mt-2 mb-4" style={{ color: '#ef4444' }}>{error}</p>}

      <div className="pt-4">
        <button
          onClick={handleVerify}
          className="w-full py-3.5 px-5 rounded-lg text-sm font-medium text-white transition-all duration-150 hover:opacity-90 active:scale-[0.99]"
          style={{ background: '#1e3a5f' }}
        >
          Verify code
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-6">
        <p className="text-xs" style={{ color: '#94a3b8' }}>Didn't receive it?</p>
        <button
          onClick={handleResend}
          disabled={countdown > 0}
          className="text-xs font-medium transition-colors"
          style={{ color: countdown > 0 ? '#94a3b8' : '#1e3a5f', cursor: countdown > 0 ? 'default' : 'pointer' }}
        >
          {countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
        </button>
      </div>

      {resent && (
        <div
          className="mt-4 px-3 py-2.5 rounded-lg text-xs text-center"
          style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534' }}
        >
          A new code has been sent to your email.
        </div>
      )}
    </div>
  )
}
