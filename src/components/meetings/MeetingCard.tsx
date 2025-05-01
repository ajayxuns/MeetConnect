import { CalendarClock, Clock, Users, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/utils';

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  startTime: string | Date;
  duration: number; // minutes
  participants: number;
  isRecurring?: boolean;
  status?: 'upcoming' | 'active' | 'completed';
}

interface MeetingCardProps {
  meeting: Meeting;
  onJoin: (id: string) => void;
}

const MeetingCard = ({ meeting, onJoin }: MeetingCardProps) => {
  const { id, title, description, startTime, duration, participants, status = 'upcoming' } = meeting;
  
  const statusClass = {
    upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    completed: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        )}
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <CalendarClock size={16} className="mr-2" />
            <span>{formatDate(startTime)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock size={16} className="mr-2" />
            <span>{duration} minutes</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Users size={16} className="mr-2" />
            <span>{participants} participants</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="primary" 
            onClick={() => onJoin(id)}
            className="flex-1"
            leftIcon={<ExternalLink size={16} />}
          >
            Join Meeting
          </Button>
          <Link 
            to={`/meeting/${id}/details`}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;