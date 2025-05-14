import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Mortgage Broker, Prime Lending",
    content: "The AI features in this platform have transformed how we process loan applications. What used to take days now takes hours, and our clients are thrilled with the quick turnaround times.",
    rating: 5,
    avatarBg: "bg-brand-blue"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "CEO, NextGen Mortgages",
    content: "Implementing this platform has increased our team's efficiency by 40%. The AI-powered recommendations have helped us match clients with the perfect loan products every time.",
    rating: 5,
    avatarBg: "bg-brand-coral"
  },
  {
    id: 3,
    name: "Emily Chan",
    title: "Senior Loan Officer, Heritage Bank",
    content: "The dashboard analytics and reporting features provide invaluable insights into our pipeline. We've been able to identify bottlenecks and optimize our workflow like never before.",
    rating: 5,
    avatarBg: "bg-brand-teal"
  },
  {
    id: 4,
    name: "David Thompson",
    title: "Director of Operations, Velocity Mortgage",
    content: "Customer support is outstanding. Whenever we've needed help, the team has been there with solutions. The onboarding process was smooth, and our team was up and running in days.",
    rating: 4,
    avatarBg: "bg-brand-gold"
  }
]

const Testimonial = () => {
  return (
    <section id="testimonials" className="w-full py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-blue blur-3xl"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-teal blur-3xl"></div>
      </div>
      
      <div className="container max-w-[1200px] px-6 md:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-teal rounded-full blur opacity-30"></div>
            <div className="relative rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 px-5 py-2 text-sm font-medium text-brand-blue dark:text-brand-light-blue">
              Testimonials
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl max-w-[800px]">
            Trusted by <span className="text-brand-blue dark:text-brand-light-blue">Leading Mortgage</span> Professionals
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg mt-3">
            Hear what our customers say about how our platform has transformed their mortgage businesses.
          </p>
        </div>
        
        <div className="mx-auto grid gap-8 py-4 md:grid-cols-2 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="group rounded-xl overflow-hidden bg-gradient-to-br from-white/50 to-transparent dark:from-slate-900/50 dark:to-transparent backdrop-blur-md p-0.5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="h-full rounded-[10px] border border-border/40 bg-card/80 p-6 md:p-8">
                <div className="flex items-start gap-5 mb-6 relative">
                  <div className={`shadow-lg relative h-14 w-14 rounded-full overflow-hidden flex items-center justify-center text-white text-lg font-medium ${testimonial.avatarBg}`}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{testimonial.title}</p>
                  </div>
                  <Quote className="absolute right-0 top-0 h-8 w-8 text-brand-blue/10 dark:text-brand-blue/20" />
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-brand-gold fill-brand-gold' : 'text-muted stroke-muted-foreground'}`} 
                    />
                  ))}
                </div>
                
                <blockquote className="text-base leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 rounded-xl overflow-hidden bg-gradient-to-br from-brand-blue/10 to-transparent p-0.5 shadow-xl">
          <div className="rounded-[10px] bg-card/90 p-8 md:p-10 backdrop-blur-md text-center max-w-4xl mx-auto">
            <div className="flex flex-col items-center max-w-2xl mx-auto">
              <div className="rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 p-3 mb-8">
                <Quote className="h-7 w-7 text-brand-blue dark:text-brand-light-blue" />
              </div>
              <p className="text-xl md:text-2xl font-medium italic mb-8">
                "MortgageAI has completely revolutionized how we handle mortgage applications. We've seen a 65% increase in processing speed and a 35% improvement in approval rates."
              </p>
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-brand-blue to-brand-teal h-14 w-14 rounded-full flex items-center justify-center text-white text-lg font-medium mr-4 shadow-lg">
                  J
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Jennifer Williams</h4>
                  <p className="text-sm text-muted-foreground">Chief Operating Officer, Meridian Mortgage Group</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center items-center mt-12 gap-3">
          <div className="text-sm font-medium text-brand-blue dark:text-brand-light-blue">See more testimonials</div>
          <div className="flex space-x-3">
            {[...Array(4)].map((_, i) => (
              <button 
                key={i} 
                className={`h-3 transition-all duration-300 rounded-full ${i === 0 ? 'w-10 bg-brand-blue' : 'w-3 bg-border dark:bg-muted hover:bg-brand-blue/50 dark:hover:bg-brand-blue/50'}`}
                aria-label={`Testimonial page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial