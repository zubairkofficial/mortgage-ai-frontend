import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatGPTFormatter from './chatgpt-formatter'

interface Message {
  id: string
  content: string
  isAI: boolean
  timestamp: Date
  isStreaming?: boolean
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI loan application assistant. I can help you check your application status, answer questions about the loan process, and provide guidance. How can I assist you today?",
      isAI: true,
      timestamp: new Date()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [streamingMessage, setStreamingMessage] = useState<string>('')
  const abortControllerRef = useRef<AbortController | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = async (userMessage: string) => {
    try {
      setIsTyping(true)
      setError(null)
      setStreamingMessage('')

      // Cancel any ongoing stream
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController()

      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are an AI assistant for a loan application platform. Your role is to help borrowers with their loan applications, check application status, and provide guidance about the loan process. Be professional, helpful, and empathetic. If you don't know specific details about a borrower's application, ask them to provide their application ID or contact customer support. Generate fictional and dummy responses according to the user's message."
            },
            ...messages.map(msg => ({
              role: msg.isAI ? "assistant" : "user",
              content: msg.content
            })),
            {
              role: "user",
              content: userMessage
            }
          ],
        
      
          stream: true
        }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      if (!response.body) {
        throw new Error('No response body')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulatedMessage = ''

      // Add initial streaming message
      const streamingMessageId = Date.now().toString()
      setMessages(prev => [...prev, {
        id: streamingMessageId,
        content: '',
        isAI: true,
        timestamp: new Date(),
        isStreaming: true
      }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(line => line.trim() !== '')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices[0]?.delta?.content || ''
              if (content) {
                accumulatedMessage += content
                setStreamingMessage(accumulatedMessage)
                
                // Update the streaming message in the messages array
                setMessages(prev => prev.map(msg => 
                  msg.id === streamingMessageId 
                    ? { ...msg, content: accumulatedMessage }
                    : msg
                ))
              }
            } catch (e) {
              console.error('Error parsing streaming response:', e)
            }
          }
        }
      }

      // Final update to remove streaming state
      setMessages(prev => prev.map(msg => 
        msg.id === streamingMessageId 
          ? { ...msg, content: accumulatedMessage, isStreaming: false }
          : msg
      ))

    } catch (err: any) {
      if (err.name === 'AbortError') {
        return
      }
      setError('Sorry, I encountered an error. Please try again or contact customer support.')
      console.error('AI Response Error:', err)
      
      // Remove the streaming message if there was an error
      setMessages(prev => prev.filter(msg => !msg.isStreaming))
    } finally {
      setIsTyping(false)
      setStreamingMessage('')
      abortControllerRef.current = null
    }
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
    
    // Get AI response
    await getAIResponse(message)
  }

  // Update the message rendering to handle streaming and formatting
 

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
                    {isTyping ? 'Typing...' : 'Online'}
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
                      {<ChatGPTFormatter response={msg.content} />}
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-lg"
                >
                  {error}
                </motion.div>
              )}
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
              <div ref={messagesEndRef} />
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