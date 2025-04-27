
import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, SendHorizontal, User, ThumbsUp, Calendar, Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    author: 'Desert Dweller',
    date: '2025-04-20',
    content: 'Just arrived at Slab City for the first time and was blown away by Salvation Mountain! Has anyone used the Salvation Sara character card effectively?',
    replies: [
      {
        id: 101,
        author: 'Nomad Ninja',
        date: '2025-04-20',
        content: 'Welcome to the Slabs! Salvation Sara is most effective when paired with art resource cards. I once generated 12 points in a single round by combining her with the "Paint Donation" and "East Jesus Exhibition" cards.',
      },
      {
        id: 102,
        author: 'TumbleweedTim',
        date: '2025-04-21',
        content: 'Make sure to visit the real Salvation Mountain if you get a chance. It helps understand the character\'s abilities better!',
      }
    ],
    likes: 8
  },
  {
    id: 2,
    author: 'CactusQueen',
    date: '2025-04-19',
    content: 'Just received my Nomad Expansion deck and the art is incredible! The vehicle cards add a whole new dimension to gameplay. Anyone want to trade for some Artist Colony cards?',
    replies: [],
    likes: 5
  },
  {
    id: 3,
    author: 'SolarScavenger',
    date: '2025-04-17',
    content: 'Hosting a Slab City card tournament next month at The Range. All levels welcome! We\'ll have some starter decks available for newcomers. Comment if you\'re interested!',
    replies: [
      {
        id: 103,
        author: 'DustDevil',
        date: '2025-04-18',
        content: 'Count me in! I\'ll bring my custom Location deck.',
      }
    ],
    likes: 12
  },
  {
    id: 4,
    author: 'RustyRenegade',
    date: '2025-04-16',
    content: 'Found a great strategy using Builder Bob with the Library location card. The knowledge bonus doubles his construction speed! Has anyone else tried this combo?',
    replies: [],
    likes: 3
  },
  {
    id: 5,
    author: 'WastelandWanderer',
    date: '2025-04-15',
    content: 'Looking for tips on surviving the "Dust Storm" event card. It wiped out my entire resource collection last game!',
    replies: [
      {
        id: 104,
        author: 'SalvationSeeker',
        date: '2025-04-15',
        content: 'The "Reinforced Shelter" card provides protection against environmental events. You can get it by completing the Builder Bob side quest.',
      },
      {
        id: 105,
        author: 'GratefulGypsy',
        date: '2025-04-16',
        content: 'Also, try spreading your resources across multiple locations. The Dust Storm only affects one location at a time.',
      }
    ],
    likes: 7
  }
];

const Messages = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handlePostMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      author: 'You',
      date: new Date().toISOString().split('T')[0],
      content: newMessage,
      replies: [],
      likes: 0
    };
    
    setMessages([newMsg, ...messages]);
    setNewMessage('');
    
    toast({
      title: "Message Posted!",
      description: "Your message has been shared with the Slabbers community."
    });
  };

  const handlePostReply = (messageId: number) => {
    if (replyText.trim() === '') return;
    
    const updatedMessages = messages.map(message => {
      if (message.id === messageId) {
        return {
          ...message,
          replies: [
            ...message.replies,
            {
              id: Date.now(),
              author: 'You',
              date: new Date().toISOString().split('T')[0],
              content: replyText
            }
          ]
        };
      }
      return message;
    });
    
    setMessages(updatedMessages);
    setReplyText('');
    setReplyingTo(null);
    
    toast({
      title: "Reply Posted!",
      description: "Your reply has been added to the conversation."
    });
  };

  const handleLike = (messageId: number) => {
    const updatedMessages = messages.map(message => {
      if (message.id === messageId) {
        return {
          ...message,
          likes: message.likes + 1
        };
      }
      return message;
    });
    
    setMessages(updatedMessages);
  };

  const filteredMessages = messages.filter(message => 
    message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      <div className={`max-w-4xl mx-auto transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-4xl font-display text-slab-rust mb-6">MESSAGE BOARD</h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed mb-8">
          <h2 className="text-2xl font-display text-slab-dark mb-4">CONNECT WITH SLABBERS</h2>
          <p>
            Share your game experiences, strategy tips, card trading offers, and Slab City 
            stories with fellow players. This is a community space for all things related to 
            Slab City Slabbers & Shenanigans.
          </p>
        </div>
        
        {/* Post new message */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed mb-8">
          <h3 className="text-xl font-display text-slab-dark mb-4 flex items-center">
            <MessageCircle className="mr-2 h-5 w-5 text-slab-copper" />
            POST A MESSAGE
          </h3>
          
          <Textarea 
            placeholder="Share your thoughts, questions, or stories..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="bg-white/70 min-h-[120px] mb-4"
          />
          
          <Button 
            className="btn-distressed"
            onClick={handlePostMessage}
            disabled={newMessage.trim() === ''}
          >
            <SendHorizontal className="mr-2 h-4 w-4" />
            POST MESSAGE
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-10 bg-white/80 border-slab-copper/30"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Messages */}
        <div className="space-y-6">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-8 bg-white/60 rounded-lg">
              <p className="text-slab-dark/70 text-lg">No messages found matching your search.</p>
            </div>
          ) : (
            filteredMessages.map(message => (
              <div key={message.id} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg card-distressed overflow-hidden">
                {/* Message header */}
                <div className="bg-slab-dark p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-slab-copper/30 rounded-full p-2 mr-3">
                      <User className="h-5 w-5 text-slab-cream" />
                    </div>
                    <div>
                      <h3 className="text-slab-cream font-display">{message.author}</h3>
                      <div className="flex items-center text-slab-cream/60 text-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        {message.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-slab-cream hover:text-slab-copper hover:bg-transparent"
                      onClick={() => handleLike(message.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {message.likes}
                    </Button>
                  </div>
                </div>
                
                {/* Message content */}
                <div className="p-5">
                  <p className="text-slab-dark whitespace-pre-line">{message.content}</p>
                </div>
                
                {/* Reply button */}
                <div className="px-5 pb-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-slab-dark border-slab-copper/30 hover:bg-slab-copper/10 hover:text-slab-dark"
                    onClick={() => setReplyingTo(replyingTo === message.id ? null : message.id)}
                  >
                    {replyingTo === message.id ? 'Cancel Reply' : 'Reply'}
                  </Button>
                </div>
                
                {/* Reply form */}
                {replyingTo === message.id && (
                  <div className="px-5 pb-5 pt-2">
                    <Textarea 
                      placeholder="Write your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="bg-white/70 min-h-[80px] mb-3"
                    />
                    
                    <Button 
                      className="bg-slab-copper hover:bg-slab-rust text-slab-cream"
                      onClick={() => handlePostReply(message.id)}
                      disabled={replyText.trim() === ''}
                      size="sm"
                    >
                      <SendHorizontal className="mr-2 h-3 w-3" />
                      POST REPLY
                    </Button>
                  </div>
                )}
                
                {/* Replies */}
                {message.replies.length > 0 && (
                  <div className="bg-slab-dark/5 border-t border-slab-copper/20">
                    <div className="px-5 py-3 border-b border-slab-copper/20">
                      <h4 className="font-display text-slab-dark/80 text-sm">
                        {message.replies.length} {message.replies.length === 1 ? 'REPLY' : 'REPLIES'}
                      </h4>
                    </div>
                    
                    <div className="divide-y divide-slab-copper/10">
                      {message.replies.map(reply => (
                        <div key={reply.id} className="p-4">
                          <div className="flex items-center mb-2">
                            <div className="bg-slab-copper/20 rounded-full p-1.5 mr-2">
                              <User className="h-3.5 w-3.5 text-slab-dark/70" />
                            </div>
                            <span className="font-bold text-slab-dark">{reply.author}</span>
                            <span className="text-slab-dark/60 text-xs ml-2">
                              • {reply.date}
                            </span>
                          </div>
                          <p className="text-slab-dark ml-7">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
        {/* Community guidelines */}
        <div className="mt-12 bg-slab-dark/80 backdrop-blur-sm text-slab-cream rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-display text-slab-copper mb-4">COMMUNITY GUIDELINES</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-slab-copper mr-2">•</span>
              <span>Stay on topic and keep discussions related to Slab City and the card game</span>
            </li>
            <li className="flex items-start">
              <span className="text-slab-copper mr-2">•</span>
              <span>Be respectful of other players and their experiences</span>
            </li>
            <li className="flex items-start">
              <span className="text-slab-copper mr-2">•</span>
              <span>Keep content appropriate for all ages</span>
            </li>
            <li className="flex items-start">
              <span className="text-slab-copper mr-2">•</span>
              <span>Do not spam or post commercial advertisements</span>
            </li>
            <li className="flex items-start">
              <span className="text-slab-copper mr-2">•</span>
              <span>Have fun and share your passion for the game!</span>
            </li>
          </ul>
        </div>
      </div>
    </PageContainer>
  );
};

export default Messages;
