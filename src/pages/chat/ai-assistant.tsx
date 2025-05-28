import { useState } from 'react';
import { Sparkles, } from 'lucide-react';
import { Message, User } from '@/components/layout/chat/types';
import { MessageInput } from '@/components/layout/chat/message-input';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/stores/userStore';
import { UserRole } from '@/lib/users';
import ChatBox from './components/chat-message-box';

// Dummy AI responses
const dummyResponses = [
  "I understand your question. Let me help you with that.",
  "Based on the information provided, I would recommend...",
  "That's an interesting point. Here's what I think...",
  "I can help you analyze this situation. Here's my perspective...",
  "Let me break this down for you...",
  "I've processed your request and here's what I found...",
];

// Mock AI user for the chat interface
const aiUser: User = {
  id: 0,
  name: 'AI Assistant',
  avatar: null,
  status: 'online' as const,
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
  const navigate = useNavigate();
  const user = useUser((state) => state.user);

  // Function to navigate to the appropriate dashboard based on user role
  const navigateToDashboard = () => {
    if (!user) navigate("/login");
    
    switch (user.role) {
      case UserRole.BROKER:
        navigate("/broker");
        break;
      case UserRole.ACCOUNT_EXECUTIVE:
        navigate("/account-executive");
        break;
      case UserRole.UNDERWRITING_MANAGER:
        navigate("/underwriting-manager");
        break;
      case UserRole.BRANCH_MANAGER:
        navigate("/branch-manager");
        break;
      case UserRole.LENDER:
        navigate("/lender");
        break;
      case UserRole.ADMIN:
        navigate("/admin");
        break;
      default:
        navigate("/");
        break;
    }
  };

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
    setIsTyping(true);

    // Simulate AI typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Add AI response
    const aiMessage: Message = {
      id: Date.now() + 1,
      type: 'text' as const,
      content: {
        text: dummyResponses[Math.floor(Math.random() * dummyResponses.length)]
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
      isSender: false
    };

    setAiMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

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
                    {isTyping ? 'Thinking...' : 'Online • Ready to help'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-sm font-medium">
                AI Powered
              </div>
            </div>
          </div>
        </div>
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
