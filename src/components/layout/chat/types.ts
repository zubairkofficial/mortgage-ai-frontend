export interface Message {
  id: number;
  type: 'file' | 'audio' | 'video' | 'text';
  content: {
    fileName?: string;
    fileSize?: string;
    fileType?: string;
    duration?: string;
    totalDuration?: string;
    thumbnail?: string;
    title?: string;
    text?: string;
  };
  timestamp: string;
  isRead: boolean;
  isSender: boolean;
}

export interface User {
  id: number;
  name: string;
  avatar: string | null;
  status: 'online' | 'offline';
  unreadCount?: number;
  lastMessage?: string;
  isOnline: boolean;
  messages: Message[];
  initials?: string;
} 