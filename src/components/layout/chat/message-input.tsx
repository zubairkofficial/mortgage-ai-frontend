import {  Smile, Mic, Send, Paperclip, Image } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface MessageInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSend: () => void;
}

export function MessageInput({ message, onMessageChange, onSend }: MessageInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="border-t border-border p-3 bg-background">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Paperclip className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Attach files</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Image className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send image</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className={`flex-1 flex items-center rounded-full border ${isFocused ? 'border-primary' : 'border-input'} px-3 py-1`}>
          <Input
            type="text"
            placeholder="Type your message..."
            className="w-full border-0 p-1 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
          />
      
        </div>
        
    
        
        <Button 
          size="icon"
          className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={onSend}
          disabled={!message.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
} 