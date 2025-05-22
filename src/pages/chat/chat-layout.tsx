import { useState } from 'react';
import { User, Message } from '@/components/layout/chat/types';
import { ChatSidebar } from '@/components/layout/chat/chat-sidebar';
import { ChatHeader } from '@/components/layout/chat/chat-header';
import { MessageList } from '@/components/layout/chat/message-list';
import { MessageInput } from '@/components/layout/chat/message-input';

// Mock data for users
const mockUsers: User[] = [
  {
    id: 1,
    name: 'Victoria Lane',
    avatar: '/api/placeholder/40/40',
    status: 'online',
    unreadCount: 18,
    lastMessage: "Hey, I'm going to meet a friend of",
    isOnline: true,
    messages: [
      {
        id: 1,
        type: 'file',
        content: {
          fileName: 'design-phase-1-approved.pdf',
          fileSize: '12.5 MB',
          fileType: 'pdf'
        },
        timestamp: '10:16 am',
        isRead: true,
        isSender: true
      },
      {
        id: 2,
        type: 'audio',
        content: {
          duration: '0:00',
          totalDuration: '0:00'
        },
        timestamp: '10:20 am',
        isRead: true,
        isSender: false
      },
  
    ]
  },
  {
    id: 2,
    name: 'Etta McDaniel',
    avatar: '/api/placeholder/40/40',
    status: 'online',
    lastMessage: "Yeah everything is fine. Our next me...",
    isOnline: true,
    messages: []
  },
  {
    id: 3,
    name: 'James Pinard',
    avatar: null,
    initials: 'JP',
    status: 'offline',
    lastMessage: "Wow that's great!",
    isOnline: false,
    messages: []
  },
  {
    id: 4,
    name: 'Ronald Downey',
    avatar: '/api/placeholder/40/40',
    status: 'offline',
    lastMessage: "Why I try the to get demo data follo...",
    isOnline: false,
    messages: []
  },
  {
    id: 5,
    name: 'Nicholas Staten',
    avatar: '/api/placeholder/40/40',
    status: 'offline',
    lastMessage: "Pleased to meet you again!",
    isOnline: false,
    messages: []
  },
  {
    id: 6,
    name: 'Kathryn Swarey',
    avatar: '/api/placeholder/40/40',
    status: 'offline',
    isOnline: false,
    messages: []
  }
];

export default function ChatLayout() {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>(mockUsers[0]);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsTyping(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add new message to selected user
      const newMessage: Message = {
        id: Date.now(),
        type: 'text',
        content: {
          text: message
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true,
        isSender: true
      };
      
      // Update the user's messages
      const updatedUsers = users.map(user => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            messages: [...user.messages, newMessage],
            lastMessage: message
          };
        }
        return user;
      });
      
      // Update state
      setUsers(updatedUsers);
      setSelectedUser({
        ...selectedUser,
        messages: [...selectedUser.messages, newMessage]
      });
      
      setMessage('');
    }
  };

  return (
      <div className="flex flex-col h-screen bg-background text-foreground">
        <div className="flex flex-1 overflow-hidden">
          <ChatSidebar 
            users={users}
            selectedUser={selectedUser}
            onUserSelect={handleUserSelect}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <ChatHeader user={selectedUser} />
            <div className="@container/main flex flex-1 flex-col">
              <MessageList 
                messages={selectedUser.messages}
                isTyping={isTyping}
                typingUser={selectedUser}
              />
              <MessageInput 
                message={message}
                onMessageChange={setMessage}
                onSend={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>
  );
}