import { useState } from 'react'
import { MessageSquare, X, Send, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  content: string
  isAI: boolean
  timestamp: Date
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      isAI: true,
      timestamp: new Date()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)

  const simulateAIResponse = async (userMessage: string) => {
    setIsTyping(true)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simple response logic - you can make this more sophisticated
    let response = "I'm not sure how to help with that. Could you please provide more details?"
    
    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
      response = "Hello! How can I assist you today?"
    } else if (userMessage.toLowerCase().includes('help')) {
      response = "I'm here to help! What specific information are you looking for?"
    } else if (userMessage.toLowerCase().includes('thank')) {
      response = "You're welcome! Is there anything else I can help you with?"
    }

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: response,
      isAI: true,
      timestamp: new Date()
    }])
    setIsTyping(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: message,
      isAI: false,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setMessage('')
    
    // Simulate AI response
    await simulateAIResponse(message)
  }

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="flex cursor-pointer items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-brand-blue to-brand-teal text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:opacity-90"
          >
            <MessageSquare className="h-6 w-6" />
            <span className="font-semibold text-base">Chat with us</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-[420px] h-[600px] bg-background rounded-2xl shadow-2xl border border-border/40 flex flex-col overflow-hidden backdrop-blur-sm"
          >
            {/* Header */}
            <div className="p-5 border-b border-border/40 flex items-center justify-between bg-gradient-to-r from-brand-blue/10 to-brand-teal/10">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="bg-gradient-to-r from-brand-blue to-brand-teal p-2 rounded-full"
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-lg">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">
                    {isTyping ? 'Typing...' : 'Online • Ready to help'}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-accent/50 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.isAI ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`flex ${msg.isAI ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start max-w-[85%] ${msg.isAI ? '' : 'flex-row-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-brand-blue to-brand-teal flex items-center justify-center text-white ${msg.isAI ? 'mr-3' : 'ml-3'} mt-1 flex-shrink-0`}>
                      {msg.isAI ? <Sparkles className="h-4 w-4" /> : '👤'}
                    </div>
                    <div className={`rounded-2xl ${msg.isAI ? 'rounded-tl-none bg-muted/20' : 'rounded-tr-none bg-brand-blue/10'} p-4 text-sm shadow-sm`}>
                      <p className="leading-relaxed">{msg.content}</p>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-blue to-brand-teal flex items-center justify-center text-white mr-3 mt-1 flex-shrink-0">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="rounded-2xl rounded-tl-none bg-muted/20 p-4 text-sm shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-brand-blue/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-brand-blue/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-brand-blue/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-5 border-t border-border/40 bg-background/95 backdrop-blur-sm">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-xl border border-border/40 bg-background/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isTyping}
                  className="rounded-xl bg-gradient-to-r from-brand-blue to-brand-teal p-3 text-white hover:opacity-90 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ChatWidget 