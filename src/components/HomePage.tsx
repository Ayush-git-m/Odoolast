export default function HomePage({ onSignIn, onLogin }) {
  return (
    <div className="w-full max-w-sm">
      {/* Mobile logo */}
      <div className="flex items-center gap-2.5 mb-12 lg:hidden">
        <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: '#1e3a5f' }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L2 4.5V11.5L8 15L14 11.5V4.5L8 1Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="8" cy="8" r="2" fill="white"/>
          </svg>
        </div>
        <span className="font-semibold text-base tracking-tight" style={{ color: '#0d1f3c' }}>Vaultex</span>
      </div>

      <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: '#94a3b8' }}>Welcome</p>
      <h2 className="text-2xl font-semibold mb-2" style={{ color: '#0d1f3c', letterSpacing: '-0.02em' }}>
        Get started
      </h2>
      <p className="text-sm mb-10" style={{ color: '#64748b' }}>
        Choose how you'd like to access your account.
      </p>

      <div className="space-y-3">
        <button
          onClick={onSignIn}
          className="w-full py-3.5 px-5 rounded-lg text-sm font-medium text-white transition-all duration-150 hover:opacity-90 active:scale-[0.99]"
          style={{ background: '#1e3a5f' }}
        >
          Create an account
        </button>

        <button
          onClick={onLogin}
          className="w-full py-3.5 px-5 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-slate-50 active:scale-[0.99]"
          style={{ border: '1.5px solid #e2e8f0', color: '#1e3a5f', background: 'white' }}
        >
          Log in to existing account
        </button>
      </div>

      <p className="text-xs text-center mt-10" style={{ color: '#94a3b8' }}>
        By continuing, you agree to our{' '}
        <span className="underline cursor-pointer hover:text-slate-600 transition-colors">Terms of Service</span>
        {' '}and{' '}
        <span className="underline cursor-pointer hover:text-slate-600 transition-colors">Privacy Policy</span>.
      </p>
    </div>
  )
}
