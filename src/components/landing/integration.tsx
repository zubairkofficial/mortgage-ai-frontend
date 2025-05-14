import { ArrowRight, RotateCw, Database, Lock, UserCheck, GitBranch, LayoutGrid, Workflow, RefreshCw, Activity, User } from 'lucide-react'

const Integration = () => {
  return (
    <section id="integration" className="w-full py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 rounded-full bg-brand-blue/5 blur-3xl"></div>
      <div className="absolute -left-1/4 bottom-0 w-1/2 h-1/2 rounded-full bg-brand-teal/5 blur-3xl"></div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 px-4 py-1.5 text-sm font-medium text-brand-blue dark:text-brand-light-blue">
              Seamless CRM Integration
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Full <span className="text-brand-blue dark:text-brand-light-blue">HighLevel CRM</span> Synchronization
            </h2>
            <p className="text-muted-foreground text-lg max-w-[90%]">
              Our platform integrates deeply with HighLevel CRM, providing a unified workflow experience that eliminates redundant communication and improves borrower conversion rates.
            </p>
            
            <div className="space-y-5 pt-2">
              {[
                {
                  icon: <RotateCw className="h-5 w-5 text-brand-blue" />,
                  title: "Bi-directional Sync",
                  description: "Contact and pipeline data automatically synchronized between platforms"
                },
                {
                  icon: <Database className="h-5 w-5 text-brand-teal" />,
                  title: "AI Agent Data Access",
                  description: "AI agents can push and pull data from HighLevel CRM to automate workflows"
                },
                {
                  icon: <Lock className="h-5 w-5 text-brand-coral" />,
                  title: "Secure Data Transfer",
                  description: "End-to-end encryption ensures sensitive borrower data remains protected"
                },
                {
                  icon: <Workflow className="h-5 w-5 text-brand-gold" />,
                  title: "Automated Workflow Triggers",
                  description: "Create custom triggers that initiate actions between systems automatically"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background shadow-sm border border-border/50">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center pt-4">
              <a 
                href="#contact" 
                className="group inline-flex items-center text-sm font-medium text-brand-blue hover:text-brand-blue/80 transition-colors"
              >
                Request integration details
                <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          
          <div className="relative mx-auto max-w-[600px]">
            <div className="rounded-xl border border-border/40 bg-card/80 shadow-xl overflow-hidden backdrop-blur-sm">
              <div className="bg-background/80 p-4 border-b border-border/40 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-md bg-brand-blue flex items-center justify-center text-white font-bold">H</div>
                  <span className="ml-3 font-medium">HighLevel Integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="px-2 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-medium flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal mr-1.5"></span>
                    Connected
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      icon: <User className="h-5 w-5 text-brand-blue" />,
                      title: "Contact Sync",
                      description: "Borrower data synced",
                      status: "Active",
                      statusColor: "bg-brand-teal/20 text-brand-teal"
                    },
                    {
                      icon: <GitBranch className="h-5 w-5 text-brand-coral" />,
                      title: "Pipeline Updates",
                      description: "Loan status tracking",
                      status: "Active",
                      statusColor: "bg-brand-teal/20 text-brand-teal"
                    },
                    {
                      icon: <LayoutGrid className="h-5 w-5 text-brand-gold" />,
                      title: "Form Integration",
                      description: "Automated data capture",
                      status: "Active",
                      statusColor: "bg-brand-teal/20 text-brand-teal"
                    }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/60 p-4 hover:border-brand-blue/30 hover:bg-background/80 transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center border border-border/50 group-hover:border-brand-blue/30 transition-colors">
                          {item.icon}
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium">{item.title}</h4>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      <span className={`text-xs ${item.statusColor} px-2.5 py-1 rounded-full`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 rounded-lg border border-dashed border-border/60 bg-background/40 p-5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center text-sm font-medium">
                      <Activity className="h-4 w-4 mr-1.5 text-brand-blue" />
                      AI Workflow Status
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">Last sync: 2 minutes ago</div>
                  </div>
                  <button className="rounded-md bg-brand-blue/10 hover:bg-brand-blue/20 px-3 py-1.5 text-xs font-medium text-brand-blue transition-colors flex items-center">
                    <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                    Force Sync
                  </button>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "Contacts", value: "1,245" },
                    { label: "Active Loans", value: "32" },
                    { label: "Actions Today", value: "78" }
                  ].map((stat, index) => (
                    <div key={index} className="rounded-md bg-background/60 p-2 text-center border border-border/40">
                      <span className="block text-xs text-muted-foreground mb-1">{stat.label}</span>
                      <span className="text-sm font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-12 -right-12 w-40 h-40 bg-brand-blue/5 rounded-full blur-2xl"></div>
            <div className="absolute -z-10 -top-8 -left-8 w-28 h-28 bg-brand-teal/5 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Integration