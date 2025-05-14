import React from 'react'
import { Check, Star, Shield, Zap, Building } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$249",
      description: "Perfect for small mortgage brokers",
      icon: <Shield className="h-5 w-5 text-brand-blue" />,
      features: [
        "AI loan eligibility agent",
        "Standard borrower intake forms",
        "Basic HighLevel CRM integration",
        "5 active loan scenarios",
        "Email support"
      ],
      popular: false,
      buttonText: "Get Started",
      buttonClass: "bg-background text-foreground border border-border hover:bg-secondary/50",
      cardClass: "bg-card/70 border-border/50"
    },
    {
      name: "Professional",
      price: "$499",
      description: "Comprehensive solution for growing teams",
      icon: <Star className="h-5 w-5 text-brand-gold" />,
      features: [
        "All Starter features",
        "Full AI agent suite access",
        "Advanced borrower qualification",
        "Complete HighLevel integration",
        "20 active loan scenarios",
        "Custom document management",
        "Priority support"
      ],
      popular: true,
      buttonText: "Get Started",
      buttonClass: "bg-brand-blue text-white shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90",
      cardClass: "bg-card border-brand-blue/30 relative z-10"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored for large mortgage brokerages",
      icon: <Building className="h-5 w-5 text-brand-teal" />,
      features: [
        "All Professional features",
        "Unlimited active scenarios",
        "Custom AI agent training",
        "Multi-branch support",
        "Advanced compliance automation",
        "White-labeled solution",
        "Dedicated account manager",
        "24/7 priority support"
      ],
      popular: false,
      buttonText: "Contact Sales",
      buttonClass: "bg-background text-foreground border border-border hover:bg-secondary/50",
      cardClass: "bg-card/70 border-border/50"
    }
  ]

  return (
    <section id="pricing" className="w-full py-20 md:py-28 bg-accent/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 px-4 py-1.5 text-sm font-medium text-brand-blue dark:text-brand-light-blue">
            Pricing Plans
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl max-w-[800px]">
            Choose the <span className="text-brand-blue dark:text-brand-light-blue">Right Plan</span> for Your Business
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg mt-3">
            Flexible pricing options to support mortgage brokers at every stage of growth with no hidden fees.
          </p>
        </div>
        
        <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`flex flex-col rounded-xl ${plan.cardClass} border shadow-lg overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${plan.popular ? 'md:scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="bg-brand-blue py-1.5 text-center text-sm font-medium text-white">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 md:p-8 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  {plan.icon}
                </div>
                
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="ml-1.5 text-sm text-muted-foreground">/month</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                
                <div className="mt-6 border-t border-border/40 pt-6">
                  <p className="text-sm font-medium mb-4">What's included:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="mr-2 mt-1">
                          <Check className="h-4 w-4 text-brand-teal" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="p-6 pt-0 md:px-8 md:pb-8">
                <button 
                  className={`w-full rounded-md ${plan.buttonClass} py-2.5 text-sm font-medium transition-colors duration-200`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto rounded-xl bg-card/80 border border-border/30 p-8 shadow-lg backdrop-blur-sm">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6 flex-1">
              <h3 className="text-xl font-bold flex items-center">
                <Zap className="h-5 w-5 text-brand-gold mr-2" />
                Need a custom solution?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Contact our sales team for tailored pricing and features that meet your specific requirements. We'll work with you to build the perfect plan.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a 
                href="#contact" 
                className="inline-flex rounded-md bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue px-5 py-2.5 text-sm font-medium transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default Pricing