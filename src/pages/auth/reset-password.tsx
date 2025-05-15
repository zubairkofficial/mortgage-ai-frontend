import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft, Check, ChevronRight, LockKeyhole } from 'lucide-react'

const ResetPassword = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })

  // Mock token validation - in a real app, this would validate the token from the URL
  // const { token } = useParams()
  const token = 'mock-token' // This would come from URL params in a real app
  
  const isValidToken = true // In a real app, we would validate this token

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (name === 'password') {
      calculatePasswordStrength(value)
    }
    
    setErrorMessage('')
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    
    setPasswordStrength(strength)
  }

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200'
    if (passwordStrength === 1) return 'bg-red-500'
    if (passwordStrength === 2) return 'bg-yellow-500'
    if (passwordStrength === 3) return 'bg-blue-500'
    if (passwordStrength === 4) return 'bg-green-500'
    return 'bg-gray-200'
  }

  const getStrengthText = () => {
    if (passwordStrength === 0) return ''
    if (passwordStrength === 1) return 'Weak'
    if (passwordStrength === 2) return 'Fair'
    if (passwordStrength === 3) return 'Good'
    if (passwordStrength === 4) return 'Strong'
    return ''
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate passwords
    if (formData.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }
    
    if (passwordStrength < 3) {
      setErrorMessage('Please use a stronger password with uppercase letters, numbers, and special characters.')
      return
    }
    
    // In a real app, this would call an API endpoint with the token and new password
    console.log('Resetting password with token:', token)
    setIsSubmitted(true)
    
    // Redirect to login after a delay
    setTimeout(() => {
      navigate('/login')
    }, 3000)
  }

  // If the token is invalid, show an error message
  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <LockKeyhole className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold">Invalid or Expired Link</h2>
          <p className="text-muted-foreground mt-2 mb-6">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <Link 
            to="/forgot-password"
            className="inline-block py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand-blue to-brand-teal hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-colors"
          >
            Request New Link
          </Link>
        </div>
      </div>
    )
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
            
            <h1 className="text-4xl font-bold mt-16 leading-tight">Create a new password</h1>
            <p className="mt-6 text-lg opacity-90 max-w-md">Set a strong, secure password for your account to keep your mortgage data protected.</p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Strong Password</h3>
                <p className="opacity-80 mt-1">Create a secure password with letters, numbers, and special characters.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Enhanced Security</h3>
                <p className="opacity-80 mt-1">Your data is protected with end-to-end encryption and secure authentication.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Account Recovery</h3>
                <p className="opacity-80 mt-1">Easy, secure ways to recover your account if you forget your password.</p>
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
      
      {/* Right side - Reset password form */}
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
  
            <h2 className="text-2xl font-bold mt-8">Reset your password</h2>
            <p className="text-sm text-muted-foreground mt-1">Create a new password for your account</p>
          </div>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="password" className="text-sm font-medium">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                
                {/* Password strength meter */}
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${getStrengthColor()}`}
                        style={{ width: `${passwordStrength * 25}%` }}
                      ></div>
                    </div>
                    <span className="text-xs ml-2 min-w-[50px] text-muted-foreground">
                      {getStrengthText()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use 8+ characters with a mix of uppercase, numbers & symbols
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="text-sm text-red-600">
                  {errorMessage}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand-blue to-brand-teal hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-colors"
                >
                  Reset Password
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <LockKeyhole className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-medium">Password Reset Successfully</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                Your password has been reset successfully. You'll be redirected to the login page shortly.
              </p>
              <Link 
                to="/login"
                className="inline-block w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand-blue to-brand-teal hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-colors"
              >
                Back to login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPassword 