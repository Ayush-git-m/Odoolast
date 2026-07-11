import { useState } from 'react'

export default function SignInForm({ onSubmit, onBack }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!username.trim()) e.username = 'Username is required'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Valid email is required'
    if (password.length < 8) e.password = 'Password must be at least 8 characters'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSubmit(email)
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

      <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: '#94a3b8' }}>New here?</p>
      <h2 className="text-2xl font-semibold mb-2" style={{ color: '#0d1f3c', letterSpacing: '-0.02em' }}>
        Create account
      </h2>
      <p className="text-sm mb-8" style={{ color: '#64748b' }}>
        Fill in your details to get started.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Field label="Username" error={errors.username}>
          <input
            type="text"
            value={username}
            onChange={e => { setUsername(e.target.value); setErrors(p => ({ ...p, username: '' })) }}
            placeholder="johndoe"
            className="w-full px-3.5 py-3 text-sm rounded-lg transition-all duration-150"
            style={inputStyle(!!errors.username)}
          />
        </Field>

        <Field label="Email address" error={errors.email}>
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }}
            placeholder="john@company.com"
            className="w-full px-3.5 py-3 text-sm rounded-lg transition-all duration-150"
            style={inputStyle(!!errors.email)}
          />
        </Field>

        <Field label="Password" error={errors.password}>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })) }}
              placeholder="Min. 8 characters"
              className="w-full px-3.5 py-3 pr-10 text-sm rounded-lg transition-all duration-150"
              style={inputStyle(!!errors.password)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:text-slate-600"
              style={{ color: '#94a3b8' }}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </Field>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 px-5 rounded-lg text-sm font-medium text-white transition-all duration-150 hover:opacity-90 active:scale-[0.99]"
            style={{ background: '#1e3a5f' }}
          >
            Sign in &amp; send OTP
          </button>
        </div>
      </form>

      <p className="text-xs text-center mt-8" style={{ color: '#94a3b8' }}>
        Already have an account?{' '}
        <button onClick={onBack} className="underline hover:text-slate-600 transition-colors" style={{ color: '#1e3a5f' }}>
          Log in
        </button>
      </p>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: '#374151' }}>{label}</label>
      {children}
      {error && <p className="text-xs mt-1.5" style={{ color: '#ef4444' }}>{error}</p>}
    </div>
  )
}

function inputStyle(hasError) {
  return {
    border: `1.5px solid ${hasError ? '#fca5a5' : '#e2e8f0'}`,
    background: hasError ? '#fff7f7' : '#f8fafc',
    color: '#0f172a',
  }
}

function Eye() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 8C1 8 3.5 3 8 3s7 5 7 5-2.5 5-7 5S1 8 1 8Z" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  )
}

function EyeOff() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 2l12 12M6.5 6.6A2 2 0 0 0 9.4 9.5M4.2 4.3C2.8 5.3 1.8 6.7 1 8c.9 1.8 3.4 5 7 5a6.8 6.8 0 0 0 3.8-1.2M6 3.2A6.8 6.8 0 0 1 8 3c3.6 0 6.1 3.2 7 5a9.5 9.5 0 0 1-1.5 2.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}
