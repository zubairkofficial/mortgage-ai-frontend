import { Facebook, Twitter, Instagram, Linkedin, Github, ExternalLink, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border/30 bg-background/95 pt-16 pb-8">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-12 lg:grid-cols-5 md:grid-cols-2">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
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
              <span className="font-bold text-xl tracking-tight">MortgageAI</span>
            </div>
            <p className="text-base text-muted-foreground max-w-md">
              Transforming mortgage brokerage with next-generation AI technology. Our platform streamlines workflows and enhances decision-making for mortgage professionals.
            </p>
            <div className="flex space-x-5 pt-2">
              {[
                { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
                { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="text-muted-foreground hover:text-brand-blue transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Product</h3>
            <ul className="space-y-3">
              {[
                { name: "Features", href: "#features" },
                { name: "AI Agents", href: "#ai-agents" },
                { name: "Dashboard", href: "#dashboard" },
                { name: "Integration", href: "#integration" },
                { name: "Pricing", href: "#pricing" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-brand-blue transition-colors flex items-center"
                  >
                    <ChevronRight className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/50" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "#" },
                { name: "Blog", href: "#" },
                { name: "Careers", href: "#" },
                { name: "Contact", href: "#contact" },
                { name: "Press", href: "#" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-brand-blue transition-colors flex items-center"
                  >
                    <ChevronRight className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/50" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Legal</h3>
            <ul className="space-y-3">
              {[
                { name: "Terms of Service", href: "#" },
                { name: "Privacy Policy", href: "#" },
                { name: "Cookie Policy", href: "#" },
                { name: "Data Processing", href: "#" },
                { name: "Compliance", href: "#" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-brand-blue transition-colors flex items-center group"
                  >
                    <ChevronRight className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/50 group-hover:text-brand-blue/70 transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-6 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} MortgageAI, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="#" className="text-xs text-muted-foreground hover:text-brand-blue transition-colors">
                Terms
              </Link>
              <Link to="#" className="text-xs text-muted-foreground hover:text-brand-blue transition-colors">
                Privacy
              </Link>
              <Link to="#" className="text-xs text-muted-foreground hover:text-brand-blue transition-colors">
                Cookies
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              className="rounded-md border border-border/50 bg-background/60 px-3 py-1.5 text-xs text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:border-brand-blue/30"
              defaultValue="en"
            >
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
            
            <a 
              href="https://github.com/mortgageai/platform" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-brand-blue transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
