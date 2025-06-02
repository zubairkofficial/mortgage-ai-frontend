import { Mail, Phone, MapPin, Send, ArrowRight, MessageSquare, Building2 } from 'lucide-react'
import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock form submission
    // Reset form
    setFormData({ name: '', email: '', company: '', message: '' })
    // Here you would typically call an API to handle the form submission
  }

  return (
    <section id="contact" className="w-full py-20 md:py-28 bg-accent/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -left-20 top-0 h-[500px] w-[500px] rounded-full bg-brand-blue/5 blur-3xl"></div>
      <div className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-brand-teal/5 blur-3xl"></div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 px-4 py-1.5 text-sm font-medium text-brand-blue dark:text-brand-light-blue">
            Get in Touch
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl max-w-[800px]">
            Ready to <span className="text-brand-blue dark:text-brand-light-blue">Transform</span> Your Mortgage Business?
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg mt-3">
            Reach out to our team for a personalized demo or to learn more about our pricing plans.
          </p>
        </div>
        
        <div className="mx-auto grid gap-8 py-4 lg:grid-cols-5 lg:gap-12 items-start max-w-6xl">
          <div className="space-y-8 lg:col-span-2">
            <div className="flex flex-col space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-sm text-muted-foreground">
                    Our friendly team is here to help.
                  </p>
                  <a href="mailto:hello@mortgageai.com" className="text-sm font-medium text-brand-blue hover:underline">
                    hello@mortgageai.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Call Us</h3>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri from 8am to 5pm EST.
                  </p>
                  <a href="tel:+15555555555" className="text-sm font-medium text-brand-blue hover:underline">
                    +1 (555) 555-5555
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-coral/10 text-brand-coral">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    123 Innovation Drive
                  </p>
                  <p className="text-sm font-medium">
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl bg-card/60 border border-border/40 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="h-5 w-5 text-brand-gold" />
                <h3 className="text-lg font-semibold">Schedule a Demo</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                See how our AI-powered platform can transform your mortgage operations with a personalized walkthrough.
              </p>
              <a 
                href="#" 
                className="group inline-flex items-center text-sm font-medium text-brand-blue hover:text-brand-blue/80 transition-colors"
              >
                Book a 30-minute demo call
                <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          
          <div className="rounded-xl border border-border/40 bg-card/80 p-6 md:p-8 shadow-lg backdrop-blur-sm lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="h-5 w-5 text-brand-blue" />
              <h3 className="text-xl font-bold">Contact Us</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground/90">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-border/50 bg-background/60 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:border-brand-blue/30"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/90">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-border/50 bg-background/60 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:border-brand-blue/30"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="company" className="text-sm font-medium text-foreground/90">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-border/50 bg-background/60 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:border-brand-blue/30"
                  placeholder="Your Company"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground/90">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="flex min-h-[120px] w-full rounded-md border border-border/50 bg-background/60 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:border-brand-blue/30"
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-md bg-brand-blue px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90 transition-colors"
              >
                Send Message
                <Send className="h-4 w-4" />
              </button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                By submitting this form, you agree to our <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact