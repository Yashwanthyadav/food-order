
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatButtonProps {
  onClick: () => void;
  unreadCount?: number;
}

const ChatButton = ({ onClick, unreadCount }: ChatButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
      aria-label="Open chat"
    >
      <MessageCircle className="h-6 w-6 text-white" />
      {unreadCount && unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-xs text-white flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </Button>
  );
};

export default ChatButton;
