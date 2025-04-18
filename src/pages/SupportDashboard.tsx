
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Users, Bell, Clock } from "lucide-react";
import { useState } from "react";
import { Message } from "@/components/LiveChat/ChatMessage";

interface Chat {
  id: string;
  customer: string;
  lastMessage: string;
  unread: boolean;
  status: 'active' | 'pending' | 'resolved';
  timestamp: Date;
  messages: Message[];
}

const SupportDashboard = () => {
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [chats] = useState<Chat[]>([
    {
      id: '1',
      customer: 'John Doe',
      lastMessage: 'Hello, I need help with my order',
      unread: true,
      status: 'active',
      timestamp: new Date(),
      messages: [
        {
          id: '1',
          content: 'Hello, I need help with my order',
          sender: 'user',
          timestamp: new Date(),
        },
      ],
    },
    {
      id: '2',
      customer: 'Jane Smith',
      lastMessage: 'Thanks for your help!',
      unread: false,
      status: 'resolved',
      timestamp: new Date(Date.now() - 3600000),
      messages: [
        {
          id: '2',
          content: 'Thanks for your help!',
          sender: 'user',
          timestamp: new Date(Date.now() - 3600000),
        },
      ],
    },
  ]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <MessageCircle className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">Support Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Conversations</CardTitle>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {chats.length} Active
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="w-full">
                  <TabsTrigger value="active" className="flex-1">Active</TabsTrigger>
                  <TabsTrigger value="pending" className="flex-1">Pending</TabsTrigger>
                  <TabsTrigger value="resolved" className="flex-1">Resolved</TabsTrigger>
                </TabsList>
                <ScrollArea className="h-[calc(100vh-300px)] mt-4">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-4 border-b cursor-pointer hover:bg-accent ${
                        activeChat?.id === chat.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => setActiveChat(chat)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium">{chat.customer}</span>
                        <div className="flex items-center gap-2">
                          {chat.unread && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                          )}
                          <span className="text-xs text-muted-foreground">
                            {chat.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-8">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {activeChat ? (
                    <div className="flex items-center gap-2">
                      <span>{activeChat.customer}</span>
                      <span className="text-sm text-muted-foreground">
                        ({activeChat.status})
                      </span>
                    </div>
                  ) : (
                    "Select a conversation"
                  )}
                </CardTitle>
                {activeChat && (
                  <div className="flex items-center gap-4">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {activeChat ? (
                <ScrollArea className="h-[calc(100vh-300px)]">
                  {activeChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === 'user' ? 'justify-start' : 'justify-end'
                      } mb-4`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-secondary'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              ) : (
                <div className="h-[calc(100vh-300px)] flex items-center justify-center text-muted-foreground">
                  Select a conversation to view messages
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;
