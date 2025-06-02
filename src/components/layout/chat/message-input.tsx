import { Send, Paperclip } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MessageInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSend: (file?: File) => void;
  file?: boolean;
}

export function MessageInput({
  message,
  onMessageChange,
  onSend,
  file = false,
}: MessageInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSend = () => {
    if (selectedFile) {
      onSend(selectedFile);
      setSelectedFile(null);
    } else {
      onSend();
    }
  };

  return (
    <div className="border-t absolute w-full bottom-0 border-border p-3 bg-background">
      <div className="flex items-center gap-2">
        {file && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.onchange = (e) => {
                      const files = (e.target as HTMLInputElement).files;
                      if (files && files.length > 0) {
                        setSelectedFile(files[0]);
                        onMessageChange(`Selected file: ${files[0].name}`);
                      }
                    };
                    input.click();
                  }}
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Attach files</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <div
          className={`flex-1 flex items-center rounded-full border ${
            isFocused ? "border-primary" : "border-input"
          } px-3 py-1`}
        >
          <Input
            type="text"
            placeholder="Type your message..."
            className="w-full border-0 p-1 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
        </div>

        <Button
          size="icon"
          className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={handleSend}
          disabled={!message.trim() && !selectedFile}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
