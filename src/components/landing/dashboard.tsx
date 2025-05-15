import { MessageSquare, FileText, BarChart,  RefreshCw, Sparkles, ArrowRight, Users, Search, Bell, ChevronDown, Settings, Filter, Download, PieChart, DollarSign, Home, Percent, User } from 'lucide-react'

const Dashboard = () => {
  return (
    <section id="dashboard" className="w-full py-20 md:py-28 bg-accent/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 px-4 py-1.5 text-sm font-medium text-brand-blue dark:text-brand-light-blue">
            Interactive AI-Powered Platform
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl max-w-[800px]">
            Your <span className="text-brand-blue dark:text-brand-light-blue">Complete Mortgage Management</span> Solution
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg mt-3">
            Experience a seamless mortgage process with our AI-powered dashboard that connects borrowers, lenders, and brokers in one unified platform.
          </p>
        </div>
        
        <div className="mt-8 rounded-xl border border-border/40 bg-card/50 shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Dashboard Header */}
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
                  <span className="font-semibold">MortgagePro Dashboard</span>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                  <input type="text" placeholder="Search loans, clients..." className="pl-9 pr-4 py-2 text-sm rounded-md border border-border/40 bg-background/50 w-48 focus:outline-none focus:ring-1 focus:ring-brand-blue" />
                </div>
                <button className="p-2 rounded-full hover:bg-accent/50 relative">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-brand-coral rounded-full"></span>
                </button>
                <div className="flex items-center space-x-2 border-l border-border/40 pl-4">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">John Broker</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Dashboard Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left Sidebar */}
            <div className="hidden md:block md:col-span-2 bg-background/60 border-r border-border/40 p-4">
              <nav className="space-y-1">
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-md bg-brand-blue/10 text-brand-blue font-medium">
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent/30">
                  <Users className="h-5 w-5" />
                  <span>Borrowers</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent/30">
                  <FileText className="h-5 w-5" />
                  <span>Loans</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent/30">
                  <DollarSign className="h-5 w-5" />
                  <span>Lenders</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent/30">
                  <BarChart className="h-5 w-5" />
                  <span>Analytics</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-accent/30">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </a>
              </nav>
              
              <div className="mt-6 pt-6 border-t border-border/40">
                <div className="bg-brand-blue/5 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-brand-blue" />
                    <span className="text-sm font-medium">AI Assistant</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Get instant help with loan processing and client questions</p>
                  <button className="w-full mt-3 bg-brand-blue text-white rounded-md py-1.5 text-xs font-medium">Ask AI</button>
                </div>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="md:col-span-10 p-6 bg-background/40">
              {/* Dashboard Header and Filters */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h3 className="text-xl font-semibold">Active Loans Dashboard</h3>
                <div className="flex items-center space-x-3 mt-3 md:mt-0">
                  <div className="flex items-center space-x-2 text-sm">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select className="bg-background border border-border/40 rounded-md px-2 py-1.5 text-sm focus:outline-none">
                      <option>All Statuses</option>
                      <option>In Progress</option>
                      <option>Document Review</option>
                      <option>Approved</option>
                    </select>
                  </div>
                  <button className="flex items-center space-x-1 bg-background border border-border/40 rounded-md px-3 py-1.5 text-sm">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                  <button className="flex items-center space-x-1 bg-brand-blue text-white rounded-md px-3 py-1.5 text-sm">
                    <span>New Loan</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  {
                    title: "Active Loans",
                    value: "24",
                    change: "+3 this week",
                    changeColor: "text-brand-teal",
                    icon: <FileText className="h-5 w-5 text-brand-blue" />
                  },
                  {
                    title: "Approval Rate",
                    value: "87%",
                    change: "+2.5% vs last month",
                    changeColor: "text-brand-teal",
                    icon: <PieChart className="h-5 w-5 text-brand-blue" />
                  },
                  {
                    title: "Average Rate",
                    value: "4.2%",
                    change: "-0.3% vs last month",
                    changeColor: "text-brand-teal",
                    icon: <Percent className="h-5 w-5 text-brand-blue" />
                  },
                  {
                    title: "Revenue",
                    value: "$48,750",
                    change: "This month",
                    changeColor: "text-muted-foreground",
                    icon: <DollarSign className="h-5 w-5 text-brand-blue" />
                  }
                ].map((stat, index) => (
                  <div key={index} className="bg-background/60 rounded-lg p-4 border border-border/40 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
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
              
              {/* Active Loans Table */}
              <div className="bg-background/70 rounded-lg border border-border/40 overflow-hidden mb-6">
                <div className="p-4 border-b border-border/40 flex justify-between items-center">
                  <h4 className="font-medium">Active Loan Applications</h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>Showing 5 of 24</span>
                    <button className="text-brand-blue hover:underline">View All</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/30 text-xs text-muted-foreground">
                      <tr>
                        <th className="py-3 px-4 text-left font-medium">BORROWER</th>
                        <th className="py-3 px-4 text-left font-medium">LOAN TYPE</th>
                        <th className="py-3 px-4 text-left font-medium">AMOUNT</th>
                        <th className="py-3 px-4 text-left font-medium">RATE</th>
                        <th className="py-3 px-4 text-left font-medium">STATUS</th>
                        <th className="py-3 px-4 text-left font-medium">UPDATED</th>
                        <th className="py-3 px-4 text-right font-medium">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {[
                        {
                          name: "Johnson Family",
                          type: "Refinance",
                          amount: "$425,000",
                          rate: "4.125%",
                          status: "In Progress",
                          statusColor: "bg-brand-blue/20 text-brand-blue",
                          updated: "2 hours ago"
                        },
                        {
                          name: "Martinez, A.",
                          type: "Purchase",
                          amount: "$385,000",
                          rate: "4.375%",
                          status: "Document Review",
                          statusColor: "bg-brand-gold/20 text-brand-gold",
                          updated: "Yesterday"
                        },
                        {
                          name: "Thompson, J.",
                          type: "Second Home",
                          amount: "$560,000",
                          rate: "4.625%",
                          status: "Approved",
                          statusColor: "bg-brand-teal/20 text-brand-teal",
                          updated: "3 days ago"
                        },
                        {
                          name: "Wilson, M.",
                          type: "Purchase",
                          amount: "$275,000",
                          rate: "4.250%",
                          status: "Rate Lock",
                          statusColor: "bg-brand-blue/20 text-brand-blue",
                          updated: "5 days ago"
                        },
                        {
                          name: "Patel Family",
                          type: "Refinance",
                          amount: "$510,000",
                          rate: "4.000%",
                          status: "Closing",
                          statusColor: "bg-brand-coral/20 text-brand-coral",
                          updated: "1 week ago"
                        }
                      ].map((loan, index) => (
                        <tr key={index} className="bg-background/30 hover:bg-muted/10 text-sm">
                          <td className="py-3 px-4 font-medium">{loan.name}</td>
                          <td className="py-3 px-4">{loan.type}</td>
                          <td className="py-3 px-4">{loan.amount}</td>
                          <td className="py-3 px-4">{loan.rate}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-block rounded-full ${loan.statusColor} px-2.5 py-1 text-xs font-medium`}>
                              {loan.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{loan.updated}</td>
                          <td className="py-3 px-4 text-right">
                            <button className="text-brand-blue hover:underline text-xs">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Bottom Grid - AI Assistant and Insights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* AI Assistant */}
                <div className="md:col-span-1 bg-background/70 rounded-lg border border-border/40 overflow-hidden">
                  <div className="p-4 border-b border-border/40 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-brand-blue" />
                    <h4 className="font-medium">AI Assistant</h4>
                  </div>
                  <div className="h-[300px] flex flex-col">
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                      <div className="flex justify-start">
                        <div className="flex items-start max-w-[90%]">
                          <div className="w-6 h-6 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue mr-2 mt-1 flex-shrink-0">
                            <Sparkles className="h-3.5 w-3.5" />
                          </div>
                          <div className="rounded-lg rounded-tl-none bg-muted/20 p-3 text-sm shadow-sm">
                            <p>Good morning, John. You have 3 tasks requiring attention today. Would you like me to prioritize them?</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="rounded-lg rounded-tr-none bg-brand-blue/10 p-3 text-sm text-foreground max-w-[90%]">
                          <p>Yes, please prioritize and check eligibility for the Johnson refinance</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-start">
                        <div className="flex items-start max-w-[90%]">
                          <div className="w-6 h-6 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue mr-2 mt-1 flex-shrink-0">
                            <Sparkles className="h-3.5 w-3.5" />
                          </div>
                          <div className="rounded-lg rounded-tl-none bg-muted/20 p-3 text-sm shadow-sm">
                            <p>Priority tasks:</p>
                            <ol className="list-decimal pl-4 mt-1 space-y-1">
                              <li>Johnson refinance: Meets eligibility (DTI 32%, LTV 78%). Need property appraisal.</li>
                              <li>Martinez loan: Missing income verification documents.</li>
                              <li>Thompson closing: Final disclosure needs review by 5pm.</li>
                            </ol>
                            <div className="mt-2 text-xs text-brand-blue font-medium flex flex-wrap gap-2">
                              <button className="bg-brand-blue/10 rounded-md px-2 py-1 hover:bg-brand-blue/20">Order appraisal</button>
                              <button className="bg-brand-blue/10 rounded-md px-2 py-1 hover:bg-brand-blue/20">Request documents</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-border/40 p-3 flex">
                      <input
                        className="flex-1 rounded-md border border-border/40 bg-background/80 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue"
                        placeholder="Ask the AI assistant..."
                      />
                      <button className="ml-2 rounded-md bg-brand-blue p-2 text-white hover:bg-brand-blue/90 transition-colors">
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Loan Performance */}
                <div className="md:col-span-2 bg-background/70 rounded-lg border border-border/40 overflow-hidden">
                  <div className="p-4 border-b border-border/40 flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart className="h-5 w-5 mr-2 text-brand-blue" />
                      <h4 className="font-medium">Loan Performance</h4>
                    </div>
                    <select className="bg-background/80 border border-border/40 rounded-md px-2 py-1 text-sm focus:outline-none">
                      <option>Last 30 days</option>
                      <option>Last quarter</option>
                      <option>Year to date</option>
                    </select>
                  </div>
                  <div className="p-4">
                    {/* Placeholder for chart - in real app, you'd use a charting library */}
                    <div className="h-[260px] bg-muted/10 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <BarChart className="h-10 w-10 text-brand-blue/50" />
                        </div>
                        <p className="text-sm text-muted-foreground">Interactive loan performance chart would appear here</p>
                        <p className="text-xs text-muted-foreground mt-1">Showing application success rates, funding times, and ROI metrics</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div className="bg-muted/10 rounded-md p-3 text-center">
                        <p className="text-xs text-muted-foreground">Approval Rate</p>
                        <p className="text-lg font-semibold mt-1">87%</p>
                        <p className="text-xs text-brand-teal mt-1">↑ 2.5%</p>
                      </div>
                      <div className="bg-muted/10 rounded-md p-3 text-center">
                        <p className="text-xs text-muted-foreground">Avg Processing</p>
                        <p className="text-lg font-semibold mt-1">14 days</p>
                        <p className="text-xs text-brand-teal mt-1">↓ 2 days</p>
                      </div>
                      <div className="bg-muted/10 rounded-md p-3 text-center">
                        <p className="text-xs text-muted-foreground">Client Satisfaction</p>
                        <p className="text-lg font-semibold mt-1">4.8/5</p>
                        <p className="text-xs text-brand-teal mt-1">↑ 0.2</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center rounded-md bg-brand-blue px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90 transition-colors"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Schedule Your Personalized Demo
          </a>
          <p className="text-sm text-muted-foreground mt-3">
            See how our platform can streamline your entire mortgage process
          </p>
        </div>
      </div>
    </section>
  )
}

export default Dashboard