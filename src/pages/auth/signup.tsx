import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft, Check, ChevronRight } from 'lucide-react'

const Signup = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeTerms: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Calculate password strength if password field changes
    if (name === 'password') {
      calculatePasswordStrength(value)
    }
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
    // Handle signup logic here
    navigate('/verify-otp')
    console.log('Signup form submitted:', formData)
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
            
            <h1 className="text-4xl font-bold mt-16 leading-tight">Simplify your mortgage process with AI</h1>
            <p className="mt-6 text-lg opacity-90 max-w-md">Join thousands of borrowers and lenders who use our platform to streamline mortgage applications and approvals.</p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Smart Document Processing</h3>
                <p className="opacity-80 mt-1">Our AI analyzes mortgage documents to extract key information automatically.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Real-time Updates</h3>
                <p className="opacity-80 mt-1">Stay informed with instant notifications and status updates on your applications.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Secure Platform</h3>
                <p className="opacity-80 mt-1">Bank-level encryption and security practices to protect your sensitive data.</p>
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
      
      {/* Right side - Sign up form */}
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
                to="/" 
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to home
              </Link>
            </div>
  
            <h2 className="text-2xl font-bold mt-8">Create your account</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign up to get started with MortgageAI</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="John"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="Doe"
                />
              </div>
            </div>
  
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue/50"
                placeholder="name@example.com"
              />
            </div>
  
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
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
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="h-1 flex-grow rounded-full bg-gray-200 overflow-hidden">
                      <div 
                        className={`h-full ${getStrengthColor()}`} 
                        style={{ width: `${passwordStrength * 25}%` }}
                      ></div>
                    </div>
                    <span className="text-xs ml-2">{getStrengthText()}</span>
                  </div>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li className="flex items-center gap-1">
                      {/[A-Z]/.test(formData.password) ? 
                        <Check size={12} className="text-green-500" /> : 
                        <span className="w-3 h-3 rounded-full bg-gray-200" />
                      }
                      Uppercase letter
                    </li>
                    <li className="flex items-center gap-1">
                      {/[0-9]/.test(formData.password) ? 
                        <Check size={12} className="text-green-500" /> : 
                        <span className="w-3 h-3 rounded-full bg-gray-200" />
                      }
                      Number
                    </li>
                    <li className="flex items-center gap-1">
                      {/[^A-Za-z0-9]/.test(formData.password) ? 
                        <Check size={12} className="text-green-500" /> : 
                        <span className="w-3 h-3 rounded-full bg-gray-200" />
                      }
                      Special character
                    </li>
                    <li className="flex items-center gap-1">
                      {formData.password.length >= 8 ? 
                        <Check size={12} className="text-green-500" /> : 
                        <span className="w-3 h-3 rounded-full bg-gray-200" />
                      }
                      At least 8 characters
                    </li>
                  </ul>
                </div>
              )}
            </div>
  
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue/50"
                />
              </div>
              <div className="ml-2 text-xs">
                <label htmlFor="agreeTerms" className="text-muted-foreground">
                  I agree to the{' '}
                  <Link to="/terms" className="text-brand-blue hover:text-brand-teal dark:text-brand-light-blue">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-brand-blue hover:text-brand-teal dark:text-brand-light-blue">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
  
            <div>
              <button
                type="submit"
                disabled={!formData.agreeTerms}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand-blue to-brand-teal hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create account
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </form>
  
          <div className="text-center text-sm mt-6">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="font-medium text-brand-blue hover:text-brand-teal dark:text-brand-light-blue transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup 