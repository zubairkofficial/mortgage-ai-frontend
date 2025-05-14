import { CheckCircle2, Brain, ArrowRight, Bot, Lightbulb, FileSearch, BarChart3 } from 'lucide-react'

const AIAgents = () => {
  const aiAgents = [
    {
      icon: <Bot className="h-8 w-8 text-brand-blue" />,
      title: "Loan Eligibility AI",
      description: "Assesses borrower information against lender requirements to determine eligibility and highlight potential issues.",
      capabilities: [
        "Real-time qualification assessment",
        "Exception identification",
        "Alternative program suggestions",
        "Income and debt analysis"
      ],
      color: "bg-brand-blue/10 border-brand-blue/20"
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-brand-teal" />,
      title: "Scenario Structuring AI",
      description: "Helps brokers optimize loan structures based on borrower circumstances and available lender programs.",
      capabilities: [
        "Optimal loan product matching",
        "Rate/term/structure optimization",
        "Debt consolidation analysis",
        "Future refinance opportunity assessment"
      ],
      color: "bg-brand-teal/10 border-brand-teal/20"
    },
    {
      icon: <FileSearch className="h-8 w-8 text-brand-coral" />,
      title: "Lender Guideline AI",
      description: "Maintains up-to-date knowledge of lender guidelines and programs to provide accurate recommendations.",
      capabilities: [
        "Program-specific requirements analysis",
        "Lender guideline comparison",
        "Documentation requirement alerts",
        "Condition satisfaction guidance"
      ],
      color: "bg-brand-coral/10 border-brand-coral/20"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-brand-gold" />,
      title: "Risk Assessment AI",
      description: "Evaluates potential risks in loan applications and suggests mitigating strategies to improve approval chances.",
      capabilities: [
        "Credit profile analysis",
        "Risk factor identification",
        "Mitigation strategy recommendations",
        "Approval probability scoring"
      ],
      color: "bg-brand-gold/10 border-brand-gold/20"
    }
  ]

  return (
    <section id="ai-agents" className="w-full py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-blue/20 blur-3xl"></div>
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-teal/20 blur-3xl"></div>
      </div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 px-4 py-1.5 text-sm font-medium text-brand-blue dark:text-brand-light-blue">
            AI Subject Matter Experts
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl max-w-[800px]">
            Advanced <span className="text-brand-blue dark:text-brand-light-blue">AI Agents</span> Working For You
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg mt-3">
            Our platform deploys specialized AI agents that serve as subject matter experts, streamlining complex processes and improving efficiency.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {aiAgents.map((agent, index) => (
            <div 
              key={index} 
              className={`flex flex-col rounded-xl border p-6 ${agent.color} backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
            >
              <div className="mb-4">
                {agent.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{agent.title}</h3>
              <p className="text-muted-foreground mb-5 text-sm">{agent.description}</p>
              
              <h4 className="text-sm font-medium mb-3">Key Capabilities:</h4>
              <ul className="space-y-2.5">
                {agent.capabilities.map((capability, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="mr-2 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 mx-auto max-w-4xl rounded-xl overflow-hidden border border-border/40 bg-card/80 shadow-lg backdrop-blur-sm">
          <div className="p-8 md:p-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="h-7 w-7 text-brand-blue dark:text-brand-light-blue" />
              <h3 className="text-2xl font-bold">How AI Agents Transform the Mortgage Process</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue dark:text-brand-light-blue mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Initial Assessment</h4>
                <p className="text-sm text-muted-foreground">AI agents review borrower details and identify the optimal path forward</p>
              </div>
              
              <div className="flex flex-col items-center text-center relative">
                <div className="hidden md:block absolute left-0 top-7 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"></div>
                <div className="w-14 h-14 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal mb-4 z-10">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Scenario Optimization</h4>
                <p className="text-sm text-muted-foreground">Structure loan scenarios for maximum approval chances</p>
              </div>
              
              <div className="flex flex-col items-center text-center relative">
                <div className="hidden md:block absolute left-0 top-7 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"></div>
                <div className="w-14 h-14 rounded-full bg-brand-coral/10 flex items-center justify-center text-brand-coral mb-4 z-10">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Lender Matching</h4>
                <p className="text-sm text-muted-foreground">Match optimized scenarios to specific lender programs</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <a 
                href="#dashboard" 
                className="group inline-flex items-center gap-2 text-brand-blue dark:text-brand-light-blue font-medium hover:underline"
              >
                See AI in action in our dashboard
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIAgents