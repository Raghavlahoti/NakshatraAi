import { motion } from 'motion/react';
import { Stars, TrendingUp, Heart, Briefcase, Zap, ChevronRight, Settings, MessageSquare, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface DashboardProps {
  userData: {
    name: string;
    dateOfBirth: string;
    timeOfBirth: string;
    placeOfBirth: string;
  };
  onNavigate: (screen: string) => void;
  onToggleSidebar?: () => void;
}

export function Dashboard({ userData, onNavigate, onToggleSidebar }: DashboardProps) {
  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const userZodiac = zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];

  const todaysInsight = {
    main: "The universe whispers of transformation today. Mercury's alignment brings clarity to your path forward.",
    energy: 85,
    luckyNumber: 7,
    color: "#6366F1"
  };

  const quickInsights = [
    {
      icon: Briefcase,
      title: "Career",
      message: "New opportunities await",
      color: "#8B5CF6",
      score: 90
    },
    {
      icon: Heart,
      title: "Love",
      message: "Deep connections strengthen",
      color: "#06B6D4",
      score: 75
    },
    {
      icon: Zap,
      title: "Energy",
      message: "Vibrant cosmic flow",
      color: "#F59E0B",
      score: 88
    },
    {
      icon: TrendingUp,
      title: "Luck",
      message: "Fortune favors the bold",
      color: "#10B981",
      score: 82
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B1F] via-[#1E1B4B] to-[#0A0B1F] p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-8 pt-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-3">
            {onToggleSidebar && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleSidebar}
                className="text-white hover:bg-white/10 rounded-full lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome back,</h1>
              <p className="text-[#06B6D4] text-lg">{userData.name.split(' ')[0]}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('profile')}
            className="text-white hover:bg-white/10 rounded-full"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </motion.div>

        {/* Today's Main Insight Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Card className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border-white/20 rounded-3xl p-6 mb-6 relative overflow-hidden">
            {/* Floating zodiac symbol */}
            <motion.div
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center opacity-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Stars className="w-6 h-6 text-white" />
            </motion.div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white mb-2">Today's Cosmic Energy</h2>
              <p className="text-gray-300 leading-relaxed">{todaysInsight.main}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-sm text-gray-400">Your Sign</p>
                  <p className="text-[#06B6D4] font-semibold">{userZodiac}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Lucky #</p>
                  <p className="text-[#F59E0B] font-semibold">{todaysInsight.luckyNumber}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-400">Energy Level</p>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${todaysInsight.energy}%` }}
                      transition={{ delay: 0.5, duration: 1 }}
                    />
                  </div>
                  <span className="text-white font-semibold">{todaysInsight.energy}%</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Action Buttons */}
        <motion.div
          className="grid grid-cols-1 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Button
            onClick={() => onNavigate('chart')}
            className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5B5EE6] hover:to-[#7C3AED] text-white py-4 rounded-2xl text-lg transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              <Stars className="w-5 h-5" />
              View My Birth Chart
              <ChevronRight className="w-5 h-5" />
            </span>
          </Button>
          
          <Button
            onClick={() => onNavigate('chat')}
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10 py-4 rounded-2xl text-lg transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Ask AI Astrologer
              <ChevronRight className="w-5 h-5" />
            </span>
          </Button>

          <Button
            onClick={() => onNavigate('guru')}
            variant="outline"
            className="w-full border-[#F59E0B]/30 text-white hover:bg-[#F59E0B]/10 py-4 rounded-2xl text-lg transition-all duration-300 relative overflow-hidden"
          >
            <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#F59E0B] text-white text-xs rounded-full">
              New
            </span>
            <span className="flex items-center justify-center gap-2">
              <Stars className="w-5 h-5 text-[#F59E0B]" />
              Connect with Guru
              <ChevronRight className="w-5 h-5" />
            </span>
          </Button>
        </motion.div>

        {/* Quick Insights Grid */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {quickInsights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 rounded-2xl p-4 cursor-pointer hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${insight.color}20` }}
                  >
                    <insight.icon 
                      className="w-5 h-5" 
                      style={{ color: insight.color }}
                    />
                  </div>
                  <div className="text-right">
                    <div 
                      className="text-xs font-semibold"
                      style={{ color: insight.color }}
                    >
                      {insight.score}%
                    </div>
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-1">{insight.title}</h3>
                <p className="text-gray-400 text-sm">{insight.message}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Daily Insights Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Button
            onClick={() => onNavigate('insights')}
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10 py-4 rounded-2xl text-lg transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              View Detailed Insights
              <ChevronRight className="w-5 h-5" />
            </span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}