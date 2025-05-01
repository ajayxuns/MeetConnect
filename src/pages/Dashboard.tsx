import { useState, useEffect } from 'react';
import { PlusCircle, CalendarPlus, Video } from 'lucide-react';
import Button from '../components/ui/Button';
import MeetingCard, { Meeting } from '../components/meetings/MeetingCard';
import CreateMeetingModal from '../components/meetings/CreateMeetingModal';
import { generateMeetingId, formatDate } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  // Fetch meetings data
  useEffect(() => {
    // Simulate API call
    const fetchMeetings = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockMeetings: Meeting[] = [
        {
          id: 'meet-12345',
          title: 'Weekly Team Sync',
          description: 'Review last week\'s progress and discuss upcoming tasks.',
          startTime: new Date(Date.now() + 3600000), // 1 hour from now
          duration: 60,
          participants: 8,
          status: 'upcoming'
        },
        {
          id: 'meet-67890',
          title: 'Product Demo',
          description: 'Presenting the new features to the client.',
          startTime: new Date(Date.now() + 7200000), // 2 hours from now
          duration: 45,
          participants: 5,
          status: 'upcoming'
        },
        {
          id: 'meet-24680',
          title: 'Design Review',
          startTime: new Date(Date.now() - 3600000), // 1 hour ago
          duration: 30,
          participants: 4,
          status: 'completed'
        }
      ];
      
      setMeetings(mockMeetings);
      setIsLoading(false);
    };
    
    fetchMeetings();
  }, []);
  
  const handleCreateMeeting = (meetingData: Meeting) => {
    setMeetings(prev => [meetingData, ...prev]);
  };
  
  const handleJoinMeeting = (id: string) => {
    navigate(`/meeting/${id}`);
  };
  
  const handleQuickMeeting = () => {
    const newMeetingId = generateMeetingId();
    navigate(`/meeting/${newMeetingId}`);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your meetings and schedule</p>
        </div>
        
        <div className="mt-4 sm:mt-0 w-full sm:w-auto flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleQuickMeeting}
            leftIcon={<Video size={18} />}
            fullWidth
            className="sm:w-auto"
          >
            Start Instant Meeting
          </Button>
          
          <Button
            variant="primary"
            onClick={() => setShowCreateModal(true)}
            leftIcon={<CalendarPlus size={18} />}
            fullWidth
            className="sm:w-auto"
          >
            Schedule Meeting
          </Button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Today's Schedule</h2>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : meetings.filter(m => m.status === 'upcoming').length > 0 ? (
          <div className="space-y-4">
            {meetings
              .filter(meeting => meeting.status === 'upcoming')
              .map(meeting => (
                <div key={meeting.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-700 dark:text-primary-300">
                    <Video size={24} />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">{meeting.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(meeting.startTime)} · {meeting.duration} min</p>
                  </div>
                  
                  <Button
                    variant="primary"
                    onClick={() => handleJoinMeeting(meeting.id)}
                    size="sm"
                  >
                    Join
                  </Button>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 mb-4">
              <CalendarPlus size={28} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No upcoming meetings</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Schedule a meeting to get started</p>
            <Button
              variant="outline"
              onClick={() => setShowCreateModal(true)}
              leftIcon={<PlusCircle size={18} />}
            >
              Create New Meeting
            </Button>
          </div>
        )}
      </div>
      
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Meetings</h2>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 h-64">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mt-auto"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meetings.map(meeting => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              onJoin={handleJoinMeeting}
            />
          ))}
        </div>
      )}
      
      <CreateMeetingModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateMeeting={handleCreateMeeting}
      />
    </div>
  );
};

export default Dashboard;