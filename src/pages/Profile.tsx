import { useState } from 'react';
import { User, Mail, Camera, Settings, KeyRound, Bell, Shield, Save } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { getInitials } from '../lib/utils';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSaveProfile = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
    }, 1000);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar navigation */}
          <div className="md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
            <nav className="flex md:flex-col p-1 md:p-4 md:space-y-1 overflow-x-auto md:overflow-x-hidden">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <User size={18} className="mr-2" />
                Profile Information
              </button>
              
              <button
                onClick={() => setActiveTab('account')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'account'
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <Settings size={18} className="mr-2" />
                Account Settings
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'security'
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <Shield size={18} className="mr-2" />
                Security
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'notifications'
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <Bell size={18} className="mr-2" />
                Notifications
              </button>
            </nav>
          </div>
          
          {/* Main content area */}
          <div className="flex-1 p-4 md:p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6">Profile Information</h2>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8">
                  <div className="relative">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl font-medium">
                        {getInitials(user?.name || 'User')}
                      </div>
                    )}
                    
                    <button
                      className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      title="Change profile picture"
                    >
                      <Camera size={18} />
                    </button>
                  </div>
                  
                  <div className="mt-4 sm:mt-0 sm:ml-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{user?.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                    
                    <div className="mt-2 flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                      </Button>
                      
                      {/* Add more profile actions here if needed */}
                    </div>
                  </div>
                </div>
                
                {isEditing ? (
                  <form className="space-y-4">
                    <Input
                      label="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      leftIcon={<User size={18} />}
                      fullWidth
                    />
                    
                    <Input
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      leftIcon={<Mail size={18} />}
                      fullWidth
                      helperText="Your email is used for notifications and sign-in"
                    />
                    
                    <div className="pt-2">
                      <Button
                        variant="primary"
                        onClick={handleSaveProfile}
                        isLoading={isLoading}
                        leftIcon={<Save size={18} />}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Full Name</h3>
                      <p className="text-base text-gray-900 dark:text-gray-100">{user?.name}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email Address</h3>
                      <p className="text-base text-gray-900 dark:text-gray-100">{user?.email}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Member Since</h3>
                      <p className="text-base text-gray-900 dark:text-gray-100">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'account' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-3">Account Plan</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                          Free Plan
                        </span>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Basic features with limited meeting duration</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Upgrade Plan
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-3">Language Preferences</h3>
                    <div className="max-w-xs">
                      <select
                        className="block w-full mt-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        defaultValue="en"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="zh">Chinese</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-3">Danger Zone</h3>
                    <Button variant="danger" size="sm">
                      Delete Account
                    </Button>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-3">Change Password</h3>
                    <form className="space-y-4 max-w-lg">
                      <Input
                        label="Current Password"
                        type="password"
                        leftIcon={<KeyRound size={18} />}
                        fullWidth
                      />
                      
                      <Input
                        label="New Password"
                        type="password"
                        leftIcon={<KeyRound size={18} />}
                        fullWidth
                        helperText="Password must be at least 8 characters"
                      />
                      
                      <Input
                        label="Confirm New Password"
                        type="password"
                        leftIcon={<KeyRound size={18} />}
                        fullWidth
                      />
                      
                      <div className="pt-2">
                        <Button variant="primary">
                          Update Password
                        </Button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">Two-Factor Authentication</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        Not Enabled
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Add an extra layer of security to your account by requiring a verification code in addition to your password.
                    </p>
                    <Button variant="outline">
                      Enable 2FA
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-3">Login Sessions</h3>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Current Session</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {navigator.userAgent}
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          Active Now
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3">
                      Log Out All Devices
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-3">Email Notifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="meeting-reminder"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="meeting-reminder" className="font-medium text-gray-700 dark:text-gray-300">Meeting reminders</label>
                          <p className="text-gray-500 dark:text-gray-400">Receive email reminders 10 minutes before your scheduled meetings</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="meeting-invites"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="meeting-invites" className="font-medium text-gray-700 dark:text-gray-300">Meeting invitations</label>
                          <p className="text-gray-500 dark:text-gray-400">Receive emails when you're invited to a meeting</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="product-updates"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="product-updates" className="font-medium text-gray-700 dark:text-gray-300">Product updates</label>
                          <p className="text-gray-500 dark:text-gray-400">Receive emails about new features and improvements</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-3">Browser Notifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="meeting-alerts"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="meeting-alerts" className="font-medium text-gray-700 dark:text-gray-300">Meeting alerts</label>
                          <p className="text-gray-500 dark:text-gray-400">Show browser notifications 5 minutes before meetings start</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="chat-notifications"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="chat-notifications" className="font-medium text-gray-700 dark:text-gray-300">Chat notifications</label>
                          <p className="text-gray-500 dark:text-gray-400">Show browser notifications for new chat messages</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="mt-4">
                      Test Notifications
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;