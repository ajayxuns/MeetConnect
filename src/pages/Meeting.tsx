import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoControls from '../components/meetings/VideoControls';
import ParticipantVideo from '../components/meetings/ParticipantVideo';
import { MessageCircle, Users, X, Send, Copy, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { getInitials } from '../lib/utils';

const Meeting = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{
    id: string;
    sender: { id: string; name: string; avatar?: string };
    text: string;
    timestamp: Date;
  }>>([]);
  const [participants, setParticipants] = useState<Array<{
    id: string;
    name: string;
    avatar?: string;
    isMuted?: boolean;
    isVideoEnabled?: boolean;
    isScreenSharing?: boolean;
    isSpeaking?: boolean;
  }>>([]);
  const [pinnedParticipantId, setPinnedParticipantId] = useState<string | null>(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  
  // Generate mock participants
  useEffect(() => {
    const mockParticipants = [
      {
        id: 'user-1',
        name: user?.name || 'You',
        avatar: user?.avatar,
        isMuted: false,
        isVideoEnabled: true,
        isScreenSharing: false,
        isSpeaking: false
      },
      {
        id: 'user-2',
        name: 'Sarah Johnson',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
        isMuted: false,
        isVideoEnabled: true,
        isScreenSharing: false,
        isSpeaking: true
      },
      {
        id: 'user-3',
        name: 'Michael Chen',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
        isMuted: true,
        isVideoEnabled: true,
        isScreenSharing: false,
        isSpeaking: false
      },
      {
        id: 'user-4',
        name: 'Emma Rodriguez',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
        isMuted: false,
        isVideoEnabled: false,
        isScreenSharing: false,
        isSpeaking: false
      }
    ];
    
    setParticipants(mockParticipants);
    
    // Generate mock messages
    const mockMessages = [
      {
        id: 'msg-1',
        sender: mockParticipants[1],
        text: 'Hi everyone! Can you hear me?',
        timestamp: new Date(Date.now() - 600000) // 10 minutes ago
      },
      {
        id: 'msg-2',
        sender: mockParticipants[2],
        text: 'Yes, loud and clear.',
        timestamp: new Date(Date.now() - 540000) // 9 minutes ago
      },
      {
        id: 'msg-3',
        sender: mockParticipants[3],
        text: 'When will we cover the new product features?',
        timestamp: new Date(Date.now() - 300000) // 5 minutes ago
      }
    ];
    
    setMessages(mockMessages);
  }, [user]);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: {
        id: 'user-1',
        name: user?.name || 'You',
        avatar: user?.avatar
      },
      text: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };
  
  const handleLeave = () => {
    navigate('/dashboard');
  };
  
  const handlePinParticipant = (id: string) => {
    setPinnedParticipantId(prevId => prevId === id ? null : id);
  };
  
  const copyMeetingLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 2000);
  };
  
  // Layout participants with pinned one first
  const orderedParticipants = [...participants].sort((a, b) => {
    if (a.id === pinnedParticipantId) return -1;
    if (b.id === pinnedParticipantId) return 1;
    return 0;
  });
  
  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Meeting header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-white font-medium">Meeting: {id}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={copyMeetingLink}
            className="flex items-center text-sm text-gray-300 hover:text-white px-3 py-1 rounded-md hover:bg-gray-700"
          >
            <Copy size={16} className="mr-1" />
            Copy Link
            {showCopiedMessage && (
              <span className="ml-2 text-xs bg-gray-700 px-2 py-0.5 rounded">Copied!</span>
            )}
          </button>
          
          <button 
            className="flex items-center text-sm text-gray-300 hover:text-white px-3 py-1 rounded-md hover:bg-gray-700"
          >
            <Share2 size={16} className="mr-1" />
            Invite
          </button>
        </div>
      </header>
      
      {/* Main meeting area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Video grid */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className={`grid gap-4 h-full ${pinnedParticipantId ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
            {pinnedParticipantId && (
              <div className="col-span-full mb-4">
                <ParticipantVideo
                  participant={participants.find(p => p.id === pinnedParticipantId)!}
                  isPinned={true}
                  isActive={true}
                  onPin={() => handlePinParticipant(pinnedParticipantId)}
                />
              </div>
            )}
            
            <div className={`grid gap-4 ${pinnedParticipantId ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : ''}`}>
              {orderedParticipants
                .filter(p => p.id !== pinnedParticipantId)
                .map(participant => (
                  <ParticipantVideo
                    key={participant.id}
                    participant={participant}
                    isPinned={participant.id === pinnedParticipantId}
                    onPin={() => handlePinParticipant(participant.id)}
                  />
                ))}
            </div>
          </div>
        </div>
        
        {/* Chat sidebar */}
        {showChat && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col animate-slide-up">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h2 className="font-medium text-white">Chat</h2>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className="flex flex-col">
                  <div className="flex items-center mb-1">
                    {msg.sender.avatar ? (
                      <img
                        src={msg.sender.avatar}
                        alt={msg.sender.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    ) : (
                      <div className="w-6 h-6 bg-primary-600 rounded-full mr-2 flex items-center justify-center text-white text-xs">
                        {getInitials(msg.sender.name)}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-300">{msg.sender.name}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-white ml-8">{msg.text}</p>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700 border-none rounded-l-md py-2 px-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-primary-600 text-white p-2 rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Participants sidebar */}
        {showParticipants && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col animate-slide-up">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h2 className="font-medium text-white">Participants ({participants.length})</h2>
              <button
                onClick={() => setShowParticipants(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <ul className="divide-y divide-gray-700">
                {participants.map(participant => (
                  <li key={participant.id} className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      {participant.avatar ? (
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-primary-600 rounded-full mr-3 flex items-center justify-center text-white">
                          {getInitials(participant.name)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-white">{participant.name}</p>
                        <p className="text-xs text-gray-400">
                          {participant.id === 'user-1' ? 'You' : 'Guest'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {participant.isMuted && (
                        <span className="text-error-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                            <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                            <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                            <line x1="12" y1="19" x2="12" y2="23"></line>
                            <line x1="8" y1="23" x2="16" y2="23"></line>
                          </svg>
                        </span>
                      )}
                      
                      {!participant.isVideoEnabled && (
                        <span className="text-error-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        </span>
                      )}
                      
                      {participant.isSpeaking && (
                        <span className="text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" y1="19" x2="12" y2="23"></line>
                            <line x1="8" y1="23" x2="16" y2="23"></line>
                          </svg>
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <Button
                variant="outline"
                className="text-white border-gray-600 w-full"
                leftIcon={<Users size={18} />}
              >
                Invite More People
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Meeting controls */}
      <div className="bg-gray-900 p-4 flex justify-center">
        <VideoControls 
          onLeave={handleLeave}
          onToggleChat={() => {
            setShowChat(!showChat);
            if (showParticipants) setShowParticipants(false);
          }}
          onToggleParticipants={() => {
            setShowParticipants(!showParticipants);
            if (showChat) setShowChat(false);
          }}
        />
      </div>
      
      {/* Mobile action buttons */}
      <div className="fixed bottom-24 right-4 flex flex-col space-y-3 md:hidden">
        <button
          onClick={() => {
            setShowChat(!showChat);
            if (showParticipants) setShowParticipants(false);
          }}
          className={`p-3 rounded-full ${showChat ? 'bg-primary-600' : 'bg-gray-700'} text-white shadow-lg`}
        >
          <MessageCircle size={24} />
        </button>
        <button
          onClick={() => {
            setShowParticipants(!showParticipants);
            if (showChat) setShowChat(false);
          }}
          className={`p-3 rounded-full ${showParticipants ? 'bg-primary-600' : 'bg-gray-700'} text-white shadow-lg`}
        >
          <Users size={24} />
        </button>
      </div>
    </div>
  );
};

export default Meeting;