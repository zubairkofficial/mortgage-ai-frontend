import { ArrowRight, Check, Play } from 'lucide-react'

const Hero = () => {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-accent/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 px-4 py-1.5 text-sm font-medium text-brand-blue dark:text-brand-light-blue">
              Next-Generation Mortgage Platform
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              AI-Powered <span className="text-brand-blue dark:text-brand-light-blue">Mortgage Broker</span> Platform
            </h1>
            <p className="text-muted-foreground text-lg max-w-[85%]">
              Optimize and modernize broker-lender relationships with AI-driven automation, intelligent workflows, and seamless CRM integration.
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-brand-teal" />
                <span className="text-sm">Reduce processing time by up to 60%</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-brand-teal" />
                <span className="text-sm">Smart document processing with 98% accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-brand-teal" />
                <span className="text-sm">Seamless integration with your existing stack</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#contact" 
                className="inline-flex h-11 items-center justify-center rounded-md bg-brand-blue px-6 py-3 text-sm font-medium text-white shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90 transition-colors"
              >
                Request Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="#features" 
                className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm hover:bg-secondary/50 transition-colors"
              >
                Explore Features
              </a>
            </div>
          </div>
          
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px] aspect-video rounded-xl overflow-hidden border border-border/40 shadow-xl bg-card">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-brand-teal/10"></div>
              
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="absolute top-4 left-4 flex items-center space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-brand-coral"></div>
                  <div className="w-3 h-3 rounded-full bg-brand-gold"></div>
                  <div className="w-3 h-3 rounded-full bg-brand-teal"></div>
                </div>
                
                <div className="flex flex-col items-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-brand-blue/10 flex items-center justify-center">
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
                      <path d="M21 12c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8" />
                      <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                      <path d="M21 12h-4" />
                    </svg>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold">Interactive Dashboard Demo</h3>
                    <p className="text-muted-foreground mt-1">See how our AI transforms your workflow</p>
                  </div>
                  
                  <button 
                    className="group relative rounded-full w-14 h-14 bg-brand-blue text-primary-foreground flex items-center justify-center hover:bg-brand-blue/90 transition-all duration-300 shadow-lg shadow-brand-blue/20"
                    aria-label="Play demo video"
                  >
                    <Play className="h-6 w-6 relative left-0.5" />
                    <span className="absolute inset-0 rounded-full border border-brand-blue/30 group-hover:scale-110 transition-transform duration-300"></span>
                  </button>
                </div>
              </div>
              
              {/* Background grid pattern */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-3">
                {Array(18).fill(0).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-primary/5"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero