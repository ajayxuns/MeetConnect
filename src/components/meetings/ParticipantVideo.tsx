import { useState, useEffect } from 'react';
import { Mic, MicOff, PinIcon } from 'lucide-react';
import { cn, getInitials } from '../../lib/utils';

interface ParticipantVideoProps {
  participant: {
    id: string;
    name: string;
    avatar?: string;
    isMuted?: boolean;
    isVideoEnabled?: boolean;
    isScreenSharing?: boolean;
    isSpeaking?: boolean;
  };
  isActive?: boolean;
  isPinned?: boolean;
  onPin?: () => void;
}

const ParticipantVideo = ({ 
  participant, 
  isActive = false,
  isPinned = false,
  onPin,
}: ParticipantVideoProps) => {
  const { name, avatar, isMuted = false, isVideoEnabled = true, isSpeaking = false } = participant;
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Simulate video loading
  useEffect(() => {
    if (isVideoEnabled) {
      const timer = setTimeout(() => {
        setVideoLoaded(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    return () => setVideoLoaded(false);
  }, [isVideoEnabled]);
  
  return (
    <div 
      className={cn(
        "relative rounded-lg overflow-hidden bg-gray-800 transition-all group",
        isActive && "ring-2 ring-primary-500",
        isSpeaking && !isActive && "ring-2 ring-green-500"
      )}
    >
      {/* Video or avatar placeholder */}
      {isVideoEnabled ? (
        <>
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <div className={cn(
            "w-full h-full bg-cover bg-center",
            !videoLoaded && "opacity-0"
          )}
            style={{ 
              backgroundImage: videoLoaded ? `url(https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&dpr=1)` : undefined,
              aspectRatio: '16 / 9'
            }}
          ></div>
        </>
      ) : (
        <div 
          className="w-full h-full flex items-center justify-center bg-gray-700"
          style={{ aspectRatio: '16 / 9' }}
        >
          {avatar ? (
            <img 
              src={avatar} 
              alt={name} 
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-xl font-medium">
              {getInitials(name)}
            </div>
          )}
        </div>
      )}
      
      {/* Participant info bar */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-black/60 backdrop-blur-sm flex items-center justify-between">
        <span className="text-white text-sm font-medium truncate">{name}</span>
        {isMuted ? (
          <MicOff size={16} className="text-error-500" />
        ) : (
          <Mic size={16} className="text-white" />
        )}
      </div>
      
      {/* Pin toggle */}
      <button
        onClick={onPin}
        className={cn(
          "absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity",
          isPinned && "opacity-100 bg-primary-600"
        )}
        title={isPinned ? "Unpin" : "Pin"}
      >
        <PinIcon size={16} />
      </button>
    </div>
  );
};

export default ParticipantVideo;