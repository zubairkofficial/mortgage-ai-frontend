import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft, Check, ChevronRight } from 'lucide-react'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login form submitted:', formData)
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
            
            <h1 className="text-4xl font-bold mt-16 leading-tight">Welcome back to your mortgage platform</h1>
            <p className="mt-6 text-lg opacity-90 max-w-md">Access your dashboard to track applications, review documents, and stay updated on your mortgage process.</p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Personalized Dashboard</h3>
                <p className="opacity-80 mt-1">Access all your mortgage applications and documents in one place.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Instant Notifications</h3>
                <p className="opacity-80 mt-1">Get real-time updates on application status changes and approvals.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xl">Direct Communication</h3>
                <p className="opacity-80 mt-1">Seamlessly connect with lenders and brokers through our secure messaging system.</p>
              </div>
            </div>
          </div>
          
   
        </div>
      </div>
      
      {/* Right side - Login form */}
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

            <h2 className="text-2xl font-bold mt-8">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign in to access your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs text-brand-blue hover:text-brand-teal dark:text-brand-light-blue transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
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
            </div>

            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue/50"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-muted-foreground">
                Remember me
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand-blue to-brand-teal hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-colors"
              >
                Sign in
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </form>

          <div className="text-center text-sm mt-6">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/signup" className="font-medium text-brand-blue hover:text-brand-teal dark:text-brand-light-blue transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
