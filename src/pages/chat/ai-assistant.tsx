import { useState, useRef, useEffect } from 'react';
import { Sparkles, } from 'lucide-react';
import { Message } from '@/components/layout/chat/types';
import { MessageInput } from '@/components/layout/chat/message-input';
import { motion } from 'framer-motion';
import { User, useUser } from '@/stores/userStore';
import { UserRole } from '@/lib/users';
import ChatBox from './components/chat-message-box';

// OpenAI Configuration
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

// Role-based system prompts
const getSystemPrompt = (role: UserRole): string => {
  const basePrompt = "You are an AI assistant for a loan application platform. Be professional, helpful, and empathetic. Generate fictional and dummy responses according to the user's message.";
  
  switch (role) {
    case UserRole.BROKER:
      return `${basePrompt} You are specifically assisting a broker. Help them with:
      - Managing client loan applications
      - Understanding loan products and rates
      - Compliance and documentation requirements
      - Client communication strategies
      - Application status tracking
      - Best practices for loan submission`;
      
    case UserRole.ACCOUNT_EXECUTIVE:
      return `${basePrompt} You are specifically assisting an account executive. Help them with:
      - Client relationship management
      - Sales pipeline optimization
      - Lead generation and conversion
      - Product knowledge and positioning
      - Performance metrics and reporting
      - Territory management strategies`;
      
    case UserRole.UNDERWRITING_MANAGER:
      return `${basePrompt} You are specifically assisting an underwriting manager. Help them with:
      - Risk assessment and analysis
      - Underwriting guidelines and policies
      - Application review processes
      - Team management and workflow optimization
      - Compliance and regulatory requirements
      - Decision-making support for complex cases`;
      
    case UserRole.BRANCH_MANAGER:
      return `${basePrompt} You are specifically assisting a branch manager. Help them with:
      - Branch operations and performance
      - Staff management and training
      - Business development strategies
      - Regulatory compliance oversight
      - Customer service excellence
      - Financial targets and KPI tracking`;
      
    case UserRole.LENDER:
      return `${basePrompt} You are specifically assisting a lender. Help them with:
      - Loan portfolio management
      - Risk evaluation and mitigation
      - Funding decisions and strategies
      - Market analysis and trends
      - Regulatory compliance
      - Partnership and broker relationships`;
      
    case UserRole.BORROWER:
      return `${basePrompt} You are specifically assisting a borrower. Help them with:
      - Understanding loan application processes and requirements
      - Explaining different loan products and their benefits
      - Guidance on improving credit scores and financial standing
      - Documentation preparation and submission
      - Application status updates and next steps
      - Interest rates, terms, and payment calculations
      - Pre-approval and qualification requirements
      - Answering questions about loan terms and conditions
      - Tips for a successful loan application
      - Understanding closing processes and procedures`;
      
    case UserRole.ADMIN:
      return `${basePrompt} You are specifically assisting an admin user. Help them with:
      - System administration and configuration
      - User management and permissions
      - Platform maintenance and optimization
      - Data analytics and reporting
      - Security and compliance monitoring
      - Technical support and troubleshooting`;
      
    default:
      return basePrompt;
  }
};

// Mock AI user for the chat interface
const aiUser: any = {
  id: '0',
  name: 'AI Assistant',
  avatar: '',
  status: 'online',
  isOnline: true,
  messages: [
    {
      id: 1,
      type: 'text' as const,
      content: {
        text: "Hello! I'm your AI assistant. How can I help you today?"
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
      isSender: false
    }
  ],
  initials: 'AI'
};

export default function AIAssistant() {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiMessages, setAiMessages] = useState<Message[]>(aiUser.messages);
  const [error, setError] = useState<string | null>(null);
  const [streamingMessage, setStreamingMessage] = useState<string>('');
  const abortControllerRef = useRef<AbortController | null>(null);
  const { user } = useUser();

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

      // Get role-based system prompt
      const systemPrompt = user?.role ? getSystemPrompt(user.role) : getSystemPrompt(UserRole.BROKER);

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
              content: systemPrompt
            },
            ...aiMessages.map(msg => ({
              role: msg.isSender ? "user" : "assistant",
              content: msg.content.text || ''
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
      const streamingMessageId = Date.now()
      const initialStreamingMessage: Message = {
        id: streamingMessageId,
        type: 'text' as const,
        content: { text: '' },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true,
        isSender: false,
        isStreaming: true
      };

      setAiMessages(prev => [...prev, initialStreamingMessage]);

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
                setAiMessages(prev => prev.map(msg => 
                  msg.id === streamingMessageId 
                    ? { ...msg, content: { text: accumulatedMessage } }
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
      setAiMessages(prev => prev.map(msg => 
        msg.id === streamingMessageId 
          ? { ...msg, content: { text: accumulatedMessage }, isStreaming: false }
          : msg
      ))

    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Stream aborted')
        return
      }
      setError('Sorry, I encountered an error. Please try again or contact customer support.')
      console.error('AI Response Error:', err)
      
      // Remove the streaming message if there was an error
      setAiMessages(prev => prev.filter(msg => !msg.isStreaming))
    } finally {
      setIsTyping(false)
      setStreamingMessage('')
      abortControllerRef.current = null
    }
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: 'text' as const,
      content: {
        text: message
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
      isSender: true
    };

    setAiMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Get AI response using OpenAI
    await getAIResponse(message);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-[85vh] lg:min-h-[80vh]  bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
            
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="bg-gradient-to-r from-brand-blue to-brand-teal p-2 rounded-full"
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-xl font-semibold">AI Assistant</h1>
                  <p className="text-sm text-muted-foreground">
                    {isTyping ? 'Thinking...' : 'Online'}
                    {user?.role && ` • Optimized for ${user.role.replace('_', ' ').toLowerCase()}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
        
              {user?.role && (
                <div className="px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-medium capitalize">
                  {user.role.replace('_', ' ')}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="container mx-auto px-4 pb-4">
            <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-lg">
              {error}
            </div>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="@container/main flex flex-1 flex-col relative" >
          <ChatBox 
            messages={aiMessages}
            isTyping={isTyping}
            typingUser={aiUser}
          />
          <MessageInput 
            message={message}
            onMessageChange={setMessage}
            onSend={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}

