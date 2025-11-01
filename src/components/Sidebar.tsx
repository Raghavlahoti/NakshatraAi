import { motion } from 'motion/react';
import { Home, FileText, MessageSquare, Settings, Star, User, LogOut, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

interface SidebarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  userData?: {
    name: string;
    dateOfBirth: string;
    timeOfBirth: string;
    placeOfBirth: string;
  } | null;
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ currentScreen, onNavigate, userData, isOpen, onToggle }: SidebarProps) {
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      description: 'Your cosmic overview'
    },
    {
      id: 'chart',
      label: 'Birth Chart',
      icon: Star,
      description: 'Interactive natal chart'
    },
    {
      id: 'insights',
      label: 'Daily Insights',
      icon: FileText,
      description: 'Personalized predictions'
    },
    {
      id: 'chat',
      label: 'AI Q&A',
      icon: MessageSquare,
      description: 'Ask anything about astrology'
    },
    {
      id: 'guru',
      label: 'Connect Guru',
      icon: Users,
      description: 'Consult expert astrologers'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      description: 'Account & settings'
    }
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-[#0A0B1F] via-[#1E1B4B] to-[#0A0B1F] border-r border-white/10 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        initial={false}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <motion.div
            className="flex items-center space-x-3 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Nakshatra AI</h1>
              <p className="text-sm text-gray-400">Decode your destiny</p>
            </div>
          </motion.div>

          {/* User Profile */}
          {userData && (
            <motion.div
              className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Avatar className="w-10 h-10 border-2 border-[#6366F1]">
                <AvatarFallback className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white text-sm">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{userData.name}</p>
                <p className="text-xs text-gray-400 truncate">{userData.placeOfBirth}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 p-6">
          <nav className="space-y-2">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <Button
                  variant={currentScreen === item.id ? "default" : "ghost"}
                  className={`w-full justify-start p-4 h-auto rounded-xl transition-all duration-300 ${
                    currentScreen === item.id
                      ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white shadow-lg shadow-[#6366F1]/25'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => {
                    onNavigate(item.id);
                    if (window.innerWidth < 1024) onToggle();
                  }}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-80">{item.description}</div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/10 p-4 rounded-xl"
              onClick={() => {
                onNavigate('profile');
                if (window.innerWidth < 1024) onToggle();
              }}
            >
              <Settings className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Settings</div>
                <div className="text-xs opacity-80">Preferences & more</div>
              </div>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}