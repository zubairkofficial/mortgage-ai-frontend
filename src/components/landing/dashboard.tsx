import { MessageSquare, FileText, BarChart, Clock, RefreshCw, Sparkles, ArrowRight, Users, CreditCard, Calendar } from 'lucide-react'

const Dashboard = () => {
  return (
    <section id="dashboard" className="w-full py-20 md:py-28 bg-accent/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 px-4 py-1.5 text-sm font-medium text-brand-blue dark:text-brand-light-blue">
            Interactive AI Dashboard
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl max-w-[800px]">
            Your <span className="text-brand-blue dark:text-brand-light-blue">Intelligent Command Center</span> for Mortgage Success
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg mt-3">
            Our intuitive dashboard puts AI-powered tools at your fingertips, enabling real-time assistance and streamlined workflow management.
          </p>
        </div>
        
        <div className="mt-8 rounded-xl border border-border/40 bg-card/50 shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="bg-background/80 border-b border-border/40 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-brand-coral"></div>
                  <div className="h-3 w-3 rounded-full bg-brand-gold"></div>
                  <div className="h-3 w-3 rounded-full bg-brand-teal"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-brand-blue" />
                  <span className="font-semibold">MortgageAI Platform</span>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  <span>24 Active Users</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-3.5 w-3.5 mr-1" />
                  <span>16 Lender Integrations</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>Last updated: Today, 2:45 PM</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-border/40">
            <div className="md:col-span-8 p-6 bg-background/50 border-r border-border/40">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-brand-blue" />
                  Active Borrower Scenarios
                </h3>
                <button className="rounded-md bg-brand-blue/10 hover:bg-brand-blue/20 px-3 py-1.5 text-sm font-medium text-brand-blue transition-colors flex items-center">
                  <span>New Scenario</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                {[
                  {
                    name: "Johnson Family Refinance",
                    updated: "2 hours ago",
                    status: "In Progress",
                    statusColor: "bg-brand-blue/20 text-brand-blue",
                    loan: "$425,000",
                    ltv: "78%",
                    fico: "720"
                  },
                  {
                    name: "Martinez First-Time Home Purchase",
                    updated: "Yesterday",
                    status: "Document Review",
                    statusColor: "bg-brand-gold/20 text-brand-gold",
                    loan: "$385,000",
                    ltv: "82%",
                    fico: "745"
                  },
                  {
                    name: "Thompson Vacation Property",
                    updated: "3 days ago",
                    status: "Approved",
                    statusColor: "bg-brand-teal/20 text-brand-teal",
                    loan: "$560,000",
                    ltv: "65%",
                    fico: "790"
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="rounded-lg border border-border/40 bg-card/80 p-4 hover:bg-card/90 transition-all duration-200 cursor-pointer hover:shadow-md"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3.5 w-3.5" />
                          <span>Updated {item.updated}</span>
                        </div>
                      </div>
                      <span className={`rounded-full ${item.statusColor} px-2.5 py-1 text-xs font-medium`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                      <div className="rounded-md bg-background/80 p-2 text-center">
                        <span className="block font-medium mb-1">Loan Amount</span>
                        <span className="text-sm">{item.loan}</span>
                      </div>
                      <div className="rounded-md bg-background/80 p-2 text-center">
                        <span className="block font-medium mb-1">LTV</span>
                        <span className="text-sm">{item.ltv}</span>
                      </div>
                      <div className="rounded-md bg-background/80 p-2 text-center">
                        <span className="block font-medium mb-1">FICO</span>
                        <span className="text-sm">{item.fico}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-4 p-6 bg-background/30">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-brand-blue" />
                AI Assistant
              </h3>
              <div className="rounded-lg border border-border/40 bg-card/50 shadow-sm h-[320px] flex flex-col">
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  <div className="flex justify-start">
                    <div className="flex items-start max-w-[80%]">
                      <div className="w-6 h-6 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue mr-2 mt-1 flex-shrink-0">
                        <Sparkles className="h-3.5 w-3.5" />
                      </div>
                      <div className="rounded-lg rounded-tl-none bg-background p-3 text-sm shadow-sm">
                        <p>How can I help with your scenarios today?</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="rounded-lg rounded-tr-none bg-brand-blue/10 p-3 text-sm text-foreground max-w-[80%]">
                      <p>Check eligibility for Johnson scenario</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="flex items-start max-w-[80%]">
                      <div className="w-6 h-6 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue mr-2 mt-1 flex-shrink-0">
                        <Sparkles className="h-3.5 w-3.5" />
                      </div>
                      <div className="rounded-lg rounded-tl-none bg-background p-3 text-sm shadow-sm">
                        <p>The Johnson scenario meets eligibility criteria for conventional refinance. Income verification is complete, but we need updated property appraisal.</p>
                        <div className="mt-2 text-xs text-brand-blue font-medium">
                          <button className="underline">Order appraisal</button> · <button className="underline">Check lender requirements</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border/40 p-3 flex">
                  <input
                    className="flex-1 rounded-md border border-border/40 bg-background/80 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent"
                    placeholder="Ask the AI assistant..."
                  />
                  <button className="ml-2 rounded-md bg-brand-blue p-2 text-white hover:bg-brand-blue/90 transition-colors">
                    <MessageSquare className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
            {[
              {
                title: "Active Borrowers",
                value: "24",
                change: "+3 this week",
                changeColor: "text-brand-teal",
                icon: <Users className="h-5 w-5 text-brand-blue" />
              },
              {
                title: "Approval Rate",
                value: "87%",
                change: "+2.5% vs last month",
                changeColor: "text-brand-teal",
                icon: <BarChart className="h-5 w-5 text-brand-blue" />
              },
              {
                title: "Avg. Processing Time",
                value: "4.2 days",
                change: "-0.8 days vs last month",
                changeColor: "text-brand-teal",
                icon: <Clock className="h-5 w-5 text-brand-blue" />
              },
              {
                title: "Lender Connections",
                value: "16",
                change: "active lenders",
                changeColor: "text-muted-foreground",
                icon: <CreditCard className="h-5 w-5 text-brand-blue" />
              }
            ].map((stat, index) => (
              <div key={index} className="space-y-2 bg-background/50 rounded-lg p-4 border border-border/40">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-medium text-muted-foreground">{stat.title}</h4>
                  {stat.icon}
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className={`text-xs ${stat.changeColor}`}>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center rounded-md bg-brand-blue px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90 transition-colors"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Request Full Dashboard Demo
          </a>
        </div>
      </div>
    </section>
  )
}

export default Dashboard