import { Link, Download, Check, Mic, MoreVertical, Play } from 'lucide-react';
import { Message, User } from './types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserAvatar } from './user-avatar';
import { cn } from '@/lib/utils';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  typingUser?: User;
}

export function MessageList({ messages, isTyping, typingUser }: MessageListProps) {
  const renderMessage = (message: Message) => {
    switch (message.type) {
      case 'file':
        return (
          <div className={cn(
            "mb-4", 
            message.isSender ? "flex justify-end" : "flex justify-start"
          )}>
            <div className="max-w-md">
              <div className={cn(
                "rounded-lg p-3",
                message.isSender ? "bg-primary/10" : "bg-muted"
              )}>
                <Card className="bg-background p-3 border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        <Link className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-foreground">{message.content.fileName}</p>
                        <p className="text-xs text-muted-foreground">{message.content.fileSize}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </Card>
              </div>
              <div className={cn(
                "flex items-center mt-1",
                message.isSender ? "justify-end" : "justify-start"
              )}>
                <span className="text-xs text-muted-foreground mr-1">{message.timestamp}</span>
                {message.isRead && message.isSender && <Check className="h-4 w-4 text-brand-teal" />}
              </div>
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className={cn(
            "mb-4", 
            message.isSender ? "flex justify-end" : "flex justify-start"
          )}>
            <div className="max-w-md">
              <div className={cn(
                "rounded-lg p-3",
                message.isSender ? "bg-primary/10" : "bg-muted"
              )}>
                <Card className="bg-background p-3">
                  <div className="flex items-center">
                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                      <Play className="h-4 w-4 ml-0.5" />
                    </Button>
                    <div className="mx-3 text-muted-foreground text-sm">
                      {message.content.duration} / {message.content.totalDuration}
                    </div>
                    <div className="w-32 h-1 bg-muted rounded-full">
                      <div className="h-full w-1/4 bg-primary rounded-full"></div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-3">
                      <Mic className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </Card>
              </div>
              <div className={cn(
                "flex items-center mt-1",
                message.isSender ? "justify-end" : "justify-start"
              )}>
                <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                {message.isRead && message.isSender && <Check className="h-4 w-4 ml-1 text-brand-teal" />}
              </div>
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="flex justify-start mb-4">
            <div className="max-w-md">
              <div className="bg-background rounded-lg shadow-sm">
                <div className="relative">
                  <img src={message.content.thumbnail} alt="Video Thumbnail" className="rounded-lg w-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-destructive bg-opacity-80 flex items-center justify-center">
                      <div className="ml-1 w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-background"></div>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <img src="/api/placeholder/32/32" alt="Channel" className="w-full h-full object-cover" />
                    </div>
                    <span className="ml-2 text-background font-medium text-sm">{message.content.title}</span>
                  </div>
                </div>
              </div>
              <div className="mt-1">
                <span className="text-xs text-muted-foreground">{message.timestamp}</span>
              </div>
            </div>
          </div>
        );
      case 'text':
        return (
          <div className={cn(
            "mb-4", 
            message.isSender ? "flex justify-end" : "flex justify-start"
          )}>
            <div className="max-w-md">
              <div className={cn(
                "rounded-lg p-3",
                message.isSender ? "bg-primary/10" : "bg-muted"
              )}>
                <p className="text-sm">{message.content.text}</p>
              </div>
              <div className={cn(
                "flex items-center mt-1",
                message.isSender ? "justify-end" : "justify-start"
              )}>
                <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                {message.isRead && message.isSender && <Check className="h-4 w-4 ml-1 text-brand-teal" />}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollArea className="h-full flex-1 p-6 bg-muted/30">
      <div>
        {/* Time Header */}
        <div className="text-center mb-6">
          <span className="bg-background text-muted-foreground text-xs px-3 py-1 rounded-full">Today</span>
        </div>

        {/* Messages */}
        {messages.map((message) => (
          <div key={message.id}>
            {renderMessage(message)}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && typingUser && (
          <div className="flex items-center text-muted-foreground text-sm mt-2">
            <UserAvatar user={typingUser} size="sm" />
            <div className="ml-2">
              <p className="text-xs font-medium">{typingUser.name}</p>
              <div className="flex items-center">
                <span>typing</span>
                <span className="flex ml-1">
                  <span className="animate-bounce mx-0.5 opacity-60">.</span>
                  <span className="animate-bounce mx-0.5 opacity-60" style={{ animationDelay: '0.2s' }}>.</span>
                  <span className="animate-bounce mx-0.5 opacity-60" style={{ animationDelay: '0.4s' }}>.</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
} 