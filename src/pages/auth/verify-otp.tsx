import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, RefreshCw } from 'lucide-react'
import { useTheme } from '@/components/theme/theme-provider'

const VerifyOtp = () => {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [isVerified, setIsVerified] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [resendCountdown, setResendCountdown] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null))

  // Mock email for display
  const userEmail = 'john.doe@example.com' // In a real app, this would come from context or URL params

  // Handle countdown for resend code
  useEffect(() => {
    let interval: number | undefined
    
    if (resendCountdown > 0) {
      interval = window.setInterval(() => {
        setResendCountdown(prev => prev - 1)
      }, 1000)
    }
    
    return () => clearInterval(interval)
  }, [resendCountdown])

  // Handle OTP input
  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) return
    
    // Update the OTP state
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Clear any previous error
    setErrorMessage('')
    
    // Auto-focus next input field if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
    
    // Auto-submit if all digits are filled
    if (index === 5 && value && !newOtp.includes('')) {
      verifyOtp(newOtp.join(''))
    }
  }

  // Handle backspace key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Focus previous input when backspace is pressed on an empty input
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle paste event for OTP
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    
    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const otpArray = pastedData.split('')
      setOtp(otpArray)
      
      // Focus the last input field
      inputRefs.current[5]?.focus()
      
      // Auto-verify the OTP
      verifyOtp(pastedData)
    }
  }

  // Mock verification function
  const verifyOtp = (otpValue: string) => {
    // In a real app, this would call an API endpoint
    console.log('Verifying OTP:', otpValue)
    
    // Mock successful verification (in real app, this would check against API response)
    if (otpValue === '123456') { // Example OTP for testing
      setIsVerified(true)
      setTimeout(() => {
        navigate('/dashboard') // Redirect to dashboard after verification
      }, 2000)
    } else {
      setErrorMessage('Invalid verification code. Please try again.')
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpValue = otp.join('')
    
    if (otpValue.length !== 6) {
      setErrorMessage('Please enter all 6 digits of the verification code.')
      return
    }
    
    verifyOtp(otpValue)
  }

  // Handle resend OTP
  const handleResendOtp = () => {
    // In a real app, this would call an API endpoint
    setIsResending(true)
    
    // Simulate API call
    setTimeout(() => {
      setResendCountdown(60)
      setIsResending(false)
      setErrorMessage('')
      console.log('Resending OTP to:', userEmail)
    }, 1000)
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
            
            <h1 className="text-4xl font-bold mt-16 leading-tight">Almost there!</h1>
            <p className="mt-6 text-lg opacity-90 max-w-md">Verify your email to secure your account and access all the features of our mortgage platform.</p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Account Security</h3>
                <p className="opacity-80 mt-1">Verification helps protect your account and personal information.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Unlock Features</h3>
                <p className="opacity-80 mt-1">Gain access to all MortgageAI features after verification.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">One-Time Process</h3>
                <p className="opacity-80 mt-1">You'll only need to verify your email once to access your account.</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">
              Home
            </Link>
            <span>•</span>
            <Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity">
              About
            </Link>
            <span>•</span>
            <Link to="/contact" className="opacity-80 hover:opacity-100 transition-opacity">
              Contact
            </Link>
          </div>
        </div>
      </div>
      
      {/* Right side - Verification form */}
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
                to="/signup" 
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to signup
              </Link>
            </div>

            <h2 className="text-2xl font-bold mt-8">Verify your email</h2>
            <p className="text-sm text-muted-foreground mt-1">
              We've sent a verification code to <span className="font-medium text-foreground">{userEmail}</span>
            </p>
          </div>
          
          {isVerified ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold">Email Verified!</h3>
              <p className="text-muted-foreground mt-2">Redirecting you to your dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="otp-input" className="block text-sm font-medium mb-2">
                  Enter 6-digit verification code
                </label>
                <div className="flex gap-2 justify-between">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el: HTMLInputElement | null) => {
                        if (el) inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-12 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue/50 text-lg font-semibold"
                    />
                  ))}
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  Didn't receive the code? {' '}
                  {resendCountdown > 0 ? (
                    <span>Resend in {resendCountdown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isResending}
                      className="text-brand-blue hover:text-brand-teal dark:text-brand-light-blue transition-colors inline-flex items-center"
                    >
                      {isResending ? (
                        <>
                          <RefreshCw size={14} className="mr-1 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Resend code'
                      )}
                    </button>
                  )}
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand-blue to-brand-teal hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-colors"
                >
                  Verify Email
                </button>
              </div>
            </form>
          )}

          <div className="text-center text-sm mt-6">
            <span className="text-muted-foreground">Changed your mind? </span>
            <Link to="/login" className="font-medium text-brand-blue hover:text-brand-teal dark:text-brand-light-blue transition-colors">
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtp;
