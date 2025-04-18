
import { useState } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <ChatButton onClick={() => setIsOpen(true)} />
    </>
  );
};

export default LiveChatWidget;
