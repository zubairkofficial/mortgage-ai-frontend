import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check, ChevronRight, Mail } from 'lucide-react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add validation
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.')
      return
    }
    setIsSubmitted(true)
    setErrorMessage('')
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Platform info */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-brand-blue to-brand-teal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-white blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-between h-full w-full p-12">
          <div>
            <div className="flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-10 w-10"
              >
                <path d="M2 22h20" />
                <path d="M6.87 2h10.26L22 22H2L6.87 2Z" />
                <path d="M15.66 10 17 22" />
                <path d="M7 10l1.34 12" />
                <path d="M2 10h20" />
              </svg>
              <span className="font-bold text-2xl">MortgageAI</span>
            </div>
            
            <h1 className="text-4xl font-bold mt-16 leading-tight">Reset your password</h1>
            <p className="mt-6 text-lg opacity-90 max-w-md">We'll send you instructions to reset your password and get you back into your account.</p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Quick Process</h3>
                <p className="opacity-80 mt-1">Recover your account in a few simple steps.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Secure Reset</h3>
                <p className="opacity-80 mt-1">Our secure process ensures only you can reset your password.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">24/7 Support</h3>
                <p className="opacity-80 mt-1">Need additional help? Our support team is always available.</p>
              </div>
            </div>
          </div>
          
        
        </div>
      </div>
      
      {/* Right side - Forgot password form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <Link to="/" className="lg:hidden flex items-center gap-2 group">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-8 w-8 text-brand-blue dark:text-brand-light-blue"
                >
                  <path d="M2 22h20" />
                  <path d="M6.87 2h10.26L22 22H2L6.87 2Z" />
                  <path d="M15.66 10 17 22" />
                  <path d="M7 10l1.34 12" />
                  <path d="M2 10h20" />
                </svg>
                <span className="font-bold text-lg tracking-tight">MortgageAI</span>
              </Link>
              <Link 
                to="/login" 
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to login
              </Link>
            </div>
  
            <h2 className="text-2xl font-bold mt-8">Forgot your password?</h2>
            <p className="text-sm text-muted-foreground mt-1">Enter your email and we'll send you reset instructions</p>
          </div>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrorMessage('')
                  }}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="name@example.com"
                />
                {errorMessage && (
                  <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand-blue to-brand-teal hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-colors"
                >
                  Send reset instructions
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Remember your password? </span>
                <Link to="/login" className="font-medium text-brand-blue hover:text-brand-teal dark:text-brand-light-blue transition-colors">
                  Back to login
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-medium">Check your email</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                We've sent instructions to reset your password to <span className="font-medium text-foreground">{email}</span>
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-foreground bg-background hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-colors"
                >
                  Resend email
                </button>
                <Link 
                  to="/login"
                  className="block w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand-blue to-brand-teal hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-colors"
                >
                  Back to login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
