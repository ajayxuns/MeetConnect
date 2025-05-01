import { useState } from 'react';
import { Mic, MicOff, Video as VideoIcon, VideoOff, ScreenShare, Phone, MessageSquare, Users as UsersIcon, MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';

interface VideoControlsProps {
  onLeave: () => void;
  onToggleChat: () => void;
  onToggleParticipants: () => void;
  className?: string;
}

const VideoControls = ({ onLeave, onToggleChat, onToggleParticipants, className }: VideoControlsProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showMore, setShowMore] = useState(false);
  
  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOff(!isVideoOff);
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing);
  
  return (
    <div className={cn(
      "flex items-center justify-center space-x-1 md:space-x-2 p-3 bg-gray-800/90 rounded-lg backdrop-blur-sm",
      className
    )}>
      <button
        onClick={toggleMute}
        className={cn(
          "p-3 md:p-4 rounded-full flex items-center justify-center transition-colors",
          isMuted 
            ? "bg-error-600 text-white hover:bg-error-700" 
            : "bg-gray-700 text-white hover:bg-gray-600"
        )}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
      </button>
      
      <button
        onClick={toggleVideo}
        className={cn(
          "p-3 md:p-4 rounded-full flex items-center justify-center transition-colors",
          isVideoOff 
            ? "bg-error-600 text-white hover:bg-error-700" 
            : "bg-gray-700 text-white hover:bg-gray-600"
        )}
        title={isVideoOff ? "Turn on camera" : "Turn off camera"}
      >
        {isVideoOff ? <VideoOff size={24} /> : <VideoIcon size={24} />}
      </button>
      
      <button
        onClick={toggleScreenShare}
        className={cn(
          "p-3 md:p-4 rounded-full flex items-center justify-center transition-colors",
          isScreenSharing
            ? "bg-primary-600 text-white hover:bg-primary-700"
            : "bg-gray-700 text-white hover:bg-gray-600"
        )}
        title={isScreenSharing ? "Stop sharing" : "Share screen"}
      >
        <ScreenShare size={24} />
      </button>
      
      <button
        onClick={onLeave}
        className="p-3 md:p-4 rounded-full bg-error-600 text-white hover:bg-error-700 flex items-center justify-center transition-colors"
        title="Leave meeting"
      >
        <Phone size={24} className="rotate-[135deg]" />
      </button>
      
      <div className="hidden md:flex items-center space-x-2">
        <button
          onClick={onToggleChat}
          className="p-3 md:p-4 rounded-full bg-gray-700 text-white hover:bg-gray-600 flex items-center justify-center transition-colors"
          title="Chat"
        >
          <MessageSquare size={24} />
        </button>
        
        <button
          onClick={onToggleParticipants}
          className="p-3 md:p-4 rounded-full bg-gray-700 text-white hover:bg-gray-600 flex items-center justify-center transition-colors"
          title="Participants"
        >
          <UsersIcon size={24} />
        </button>
      </div>
      
      {/* Mobile more menu */}
      <div className="relative md:hidden">
        <button
          onClick={() => setShowMore(!showMore)}
          className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 flex items-center justify-center transition-colors"
          title="More options"
        >
          <MoreHorizontal size={24} />
        </button>
        
        {showMore && (
          <div className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg shadow-lg p-2 w-48">
            <button
              onClick={() => {
                onToggleChat();
                setShowMore(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-700 rounded flex items-center"
            >
              <MessageSquare size={18} className="mr-2" />
              Chat
            </button>
            <button
              onClick={() => {
                onToggleParticipants();
                setShowMore(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-700 rounded flex items-center"
            >
              <UsersIcon size={18} className="mr-2" />
              Participants
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoControls;