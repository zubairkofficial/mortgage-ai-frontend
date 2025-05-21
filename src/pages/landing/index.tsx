import Navbar from '@/components/landing/navbar'
import Hero from '@/components/landing/hero'
import Features from '@/components/landing/features'
import AIAgents from '@/components/landing/ai-agents'
import Dashboard from '@/components/landing/dashboard'
import Integration from '@/components/landing/integration'
import Pricing from '@/components/landing/pricing'
import Testimonials from '@/components/landing/testimonial'
import Contact from '@/components/landing/contact'
import Footer from '@/components/landing/footer'
import ScrollToTop from '@/components/common/scroll-to-top'
import ChatWidget from '@/components/common/chat-widget'

function Landing() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none z-0">
        <div className="absolute top-[10%] -left-[30%] w-[70%] h-[70%] rounded-full bg-brand-blue blur-3xl"></div>
        <div className="absolute -bottom-[10%] -right-[30%] w-[70%] h-[70%] rounded-full bg-brand-teal blur-3xl"></div>
      </div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <Navbar />
        
        {/* Hero - Default background */}
        <section className="relative">
          <Hero />
        </section>
        
        {/* Features - Light blue background */}
        <section className="relative py-16 bg-gradient-to-b from-background to-accent/30 rounded-t-3xl mt-12">
          <Features />
        </section>
        
        {/* AI Agents - Teal accent */}
        <section className="relative py-16 bg-accent/50">
          <AIAgents />
        </section>
        
        {/* Dashboard - White background */}
        <section className="relative py-16 bg-background">
          <Dashboard />
        </section>
        
        {/* Integration - Primary color light background */}
        <section className="relative py-16 bg-gradient-to-b from-accent/50 to-background rounded-t-3xl">
          <Integration />
        </section>
        
        {/* Pricing - Clean background */}
        <section className="relative py-16 bg-secondary/50">
          <Pricing />
        </section>
        
        {/* Testimonials - Brand blue light background */}
        <section className="relative py-16 bg-gradient-to-b from-background to-accent/30 rounded-t-3xl">
          <Testimonials />
        </section>
        
        {/* Contact - Clean background */}
        <section className="relative py-16 bg-background">
          <Contact />
        </section>
        
        {/* Footer - Dark background */}
        <section className="relative mt-12 bg-secondary rounded-t-3xl">
          <Footer />
        </section>
      </div>
      
      <ScrollToTop />
      <ChatWidget />
    </div>
  )
}

export default Landing