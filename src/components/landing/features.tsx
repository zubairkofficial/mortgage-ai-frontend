import React from 'react'
import { ShieldCheck, Users, FileText, Lock, Sparkles, Database, Clock, Zap } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-brand-teal" />,
      title: "Compliance Automation",
      description: "Automated disclosure timeline notifications and state-specific compliance checks, reducing risk and ensuring regulatory adherence."
    },
    {
      icon: <Users className="h-8 w-8 text-brand-blue" />,
      title: "Role-Based Access",
      description: "Secure, role-specific permissions for Account Executives, Underwriting Managers, Branch Managers, and Brokers."
    },
    {
      icon: <FileText className="h-8 w-8 text-brand-gold" />,
      title: "Document Management",
      description: "Secure document management system for borrower intake with automated processing and organization."
    },
    {
      icon: <Lock className="h-8 w-8 text-brand-coral" />,
      title: "Comprehensive Audit Trail",
      description: "Detailed logs of all user actions and workflow triggers for complete accountability and transparency."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-brand-teal" />,
      title: "AI-Powered Analysis",
      description: "Advanced AI tools to analyze borrower data, detect patterns, and provide intelligent recommendations."
    },
    {
      icon: <Database className="h-8 w-8 text-brand-blue" />,
      title: "Centralized Database",
      description: "Single source of truth for all mortgage data, eliminating silos and redundancy across your organization."
    },
    {
      icon: <Clock className="h-8 w-8 text-brand-gold" />,
      title: "Real-Time Updates",
      description: "Instant notifications and status updates across the entire mortgage lifecycle to keep all parties informed."
    },
    {
      icon: <Zap className="h-8 w-8 text-brand-coral" />,
      title: "Process Acceleration",
      description: "Streamlined workflows that reduce processing time by up to 60% compared to traditional methods."
    }
  ]

  return (
    <section id="features" className="w-full py-20 md:py-28 bg-accent/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 px-4 py-1.5 text-sm font-medium text-brand-blue dark:text-brand-light-blue">
            Core Platform Features
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl max-w-[800px]">
            Transform Your <span className="text-brand-blue dark:text-brand-light-blue">Mortgage Business</span> With Powerful Tools
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg mt-3">
            Our platform provides comprehensive solutions to streamline operations and enhance the broker-lender relationship.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col p-6 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
            >
              <div className="rounded-lg p-2 w-fit bg-background mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 mx-auto max-w-3xl">
          <div className="flex flex-col md:flex-row items-center gap-5 rounded-xl bg-brand-blue/5 border border-brand-blue/20 p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue dark:text-brand-light-blue">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-6 w-6"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-1">Enterprise-Ready Architecture</h4>
              <p className="text-muted-foreground">Multi-tenant, scalable backend infrastructure designed for high-volume mortgage processing with 99.9% uptime guarantee.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features