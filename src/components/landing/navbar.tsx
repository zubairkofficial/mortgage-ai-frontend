import  { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from '@/components/theme/theme-provider'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'border-b' 
        : 'bg-transparent'
    }`}>
      <div className="container  flex h-20 items-center justify-between px-6 md:px-8 mx-auto">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300 bg-gradient-to-r from-brand-blue to-brand-teal"></div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="relative h-9 w-9 text-brand-blue dark:text-brand-light-blue"
              >
                <path d="M2 22h20" />
                <path d="M6.87 2h10.26L22 22H2L6.87 2Z" />
                <path d="M15.66 10 17 22" />
                <path d="M7 10l1.34 12" />
                <path d="M2 10h20" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">MortgageAI</span>
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-1">
          {[
            { name: 'Features', href: '#features' },
            { name: 'AI Agents', href: '#ai-agents' },
            { name: 'Dashboard', href: '#dashboard' },
            { name: 'Integration', href: '#integration' },
            { name: 'Pricing', href: '#pricing' },
            { name: 'Contact', href: '#contact' }
          ].map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-secondary/80 hover:text-brand-blue dark:hover:text-brand-light-blue transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="rounded-full w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <div className="hidden md:flex gap-3">
            <Link 
              to="/login" 
              className="inline-flex items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-secondary/50 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-brand-blue to-brand-teal px-4 py-2 text-sm font-medium text-white shadow-md hover:opacity-90 transition-colors"
            >
              Sign up
            </Link>
          </div>
          
          <button
            onClick={toggleMobileMenu}
            className="md:hidden rounded-md w-10 h-10 flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border/30 shadow-lg">
          <nav className="container max-w-[1200px] flex flex-col p-6 space-y-4 mx-auto">
            {[
              { name: 'Features', href: '#features' },
              { name: 'AI Agents', href: '#ai-agents' },
              { name: 'Dashboard', href: '#dashboard' },
              { name: 'Integration', href: '#integration' },
              { name: 'Pricing', href: '#pricing' },
              { name: 'Contact', href: '#contact' }
            ].map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className="px-4 py-3 text-sm font-medium rounded-md hover:bg-secondary/80 hover:text-brand-blue dark:hover:text-brand-light-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-2 space-y-3">
              <Link 
                to="/login" 
                className="block w-full px-4 py-3 text-sm font-medium text-center rounded-md border border-input hover:bg-secondary/50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="block w-full px-4 py-3 text-sm font-medium text-center rounded-md bg-gradient-to-r from-brand-blue to-brand-teal text-white shadow-md hover:opacity-90 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar