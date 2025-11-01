import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, User, Moon, Sun, Star, Crown, Settings, LogOut, Share2, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback } from './ui/avatar';
import { authService } from '../services/authService';
import { toast } from 'sonner@2.0.3';

interface ProfileProps {
  userData: {
    name: string;
    dateOfBirth: string;
    timeOfBirth: string;
    placeOfBirth: string;
  };
  onBack: () => void;
}

export function Profile({ userData, onBack }: ProfileProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [premiumSubscription] = useState(false);

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      toast.success('Signed out successfully');
      
      // Reload the page to go back to splash screen
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error('Failed to sign out', {
        description: 'Please try again',
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Nakshatra AI',
        text: 'Check out my astrological insights on Nakshatra AI!',
        url: window.location.origin,
      }).catch(() => {
        // User cancelled share
      });
    } else {
      // Fallback for browsers that don't support share
      navigator.clipboard.writeText(window.location.origin);
      toast.success('Link copied to clipboard');
    }
  };

  const handleExport = () => {
    toast.info('Export feature coming soon!', {
      description: 'We\'re working on PDF export functionality',
    });
  };

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    toast.success(checked ? 'Dark mode enabled' : 'Light mode enabled');
  };

  const handleNotificationsToggle = (checked: boolean) => {
    setNotifications(checked);
    toast.success(checked ? 'Notifications enabled' : 'Notifications disabled');
  };

  const subscriptionPlans = [
    {
      name: "Cosmic Explorer",
      price: "₹799",
      period: "month",
      features: [
        "Daily personalized insights",
        "Basic birth chart analysis",
        "Weekly horoscopes",
        "Moon phase notifications"
      ],
      current: !premiumSubscription,
      color: "from-[#6366F1] to-[#8B5CF6]"
    },
    {
      name: "Astral Master",
      price: "₹1,599",
      period: "month",
      features: [
        "All Cosmic Explorer features",
        "Advanced transit predictions",
        "Compatibility readings",
        "Premium AI insights",
        "Export detailed reports"
      ],
      current: premiumSubscription,
      color: "from-[#F59E0B] to-[#EF4444]",
      popular: true
    }
  ];

  const savedCharts = [
    {
      name: "Birth Chart",
      date: "Primary Chart",
      type: "Natal"
    },
    {
      name: "Solar Return 2024",
      date: "Dec 15, 2024",
      type: "Transit"
    },
    {
      name: "Relationship Chart",
      date: "Nov 28, 2024",
      type: "Synastry"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B1F] via-[#1E1B4B] to-[#0A0B1F]">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-md mx-auto p-4">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8 pt-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/10 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-white">Profile & Settings</h1>
          <div className="w-10" />
        </motion.div>

        <div className="space-y-6">
          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 rounded-2xl p-6 relative overflow-hidden">
              {premiumSubscription && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16 border-2 border-[#6366F1]">
                  <AvatarFallback className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white text-xl">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold text-white">{userData.name}</h2>
                  <p className="text-gray-400">Born {userData.dateOfBirth}</p>
                  <p className="text-sm text-[#06B6D4]">{userData.placeOfBirth}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  onClick={handleExport}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Saved Charts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Saved Charts</h3>
            <div className="space-y-3">
              {savedCharts.map((chart, index) => (
                <Card key={chart.name} className="backdrop-blur-xl bg-white/5 border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{chart.name}</h4>
                        <p className="text-gray-400 text-sm">{chart.date}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-[#6366F1]/20 text-[#C7D2FE] text-xs rounded-full">
                      {chart.type}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 rounded-xl p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Sun className="w-5 h-5 text-[#F59E0B]" />
                    <div>
                      <p className="text-white font-semibold">Dark Mode</p>
                      <p className="text-gray-400 text-sm">Embrace the cosmic darkness</p>
                    </div>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={handleDarkModeToggle}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Moon className="w-5 h-5 text-[#06B6D4]" />
                    <div>
                      <p className="text-white font-semibold">Notifications</p>
                      <p className="text-gray-400 text-sm">Daily insights & moon phases</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={handleNotificationsToggle}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Subscription Plans */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Upgrade Your Journey</h3>
            <div className="space-y-4">
              {subscriptionPlans.map((plan) => (
                <Card 
                  key={plan.name} 
                  className={`backdrop-blur-xl bg-white/5 border-white/10 rounded-xl p-5 relative overflow-hidden ${
                    plan.popular ? 'ring-2 ring-[#F59E0B]/50' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-[#F59E0B] text-white text-xs rounded-full">
                        Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h4 className="text-white font-semibold text-lg">{plan.name}</h4>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2 text-sm text-gray-300">
                        <Star className="w-3 h-3 text-[#6366F1]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={() => {
                      if (!plan.current) {
                        toast.info('Upgrade Plan', {
                          description: `Upgrading to ${plan.name} - Payment integration coming soon!`,
                        });
                      }
                    }}
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white ${
                      plan.current ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current Plan' : 'Upgrade Now'}
                  </Button>
                </Card>
              ))}
            </div>!
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="space-y-3 pb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Button
              variant="outline"
              onClick={() => toast.info('Settings', { description: 'Advanced settings coming soon!' })}
              className="w-full border-white/20 text-white hover:bg-white/10 justify-start"
            >
              <Settings className="w-5 h-5 mr-3" />
              Advanced Settings
            </Button>
            
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10 justify-start"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}