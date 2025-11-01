import { motion } from 'motion/react';
import { ChevronLeft, Heart, Briefcase, Shield, TrendingUp, Star, Moon, Sun, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

interface DailyInsightsProps {
  onBack: () => void;
}

export function DailyInsights({ onBack }: DailyInsightsProps) {
  const handleReadAloud = (text: string) => {
    // Mock text-to-speech - in real implementation, this would use Web Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };
  const insights = [
    {
      category: "Love & Relationships",
      icon: Heart,
      color: "#EC4899",
      gradient: "from-pink-500 to-rose-500",
      cards: [
        {
          title: "Cosmic Connection",
          message: "Venus whispers sweet promises today. Open your heart to unexpected encounters that could reshape your romantic landscape.",
          time: "Morning",
          intensity: "High"
        },
        {
          title: "Emotional Harmony",
          message: "The Moon's gentle embrace brings clarity to matters of the heart. Trust your intuition in love.",
          time: "Evening",
          intensity: "Medium"
        }
      ]
    },
    {
      category: "Career & Finance",
      icon: Briefcase,
      color: "#6366F1",
      gradient: "from-indigo-500 to-purple-500",
      cards: [
        {
          title: "Professional Growth",
          message: "Mercury aligns with your ambitions. Today brings opportunities for meaningful conversations that could advance your career.",
          time: "Afternoon",
          intensity: "High"
        },
        {
          title: "Financial Wisdom",
          message: "Saturn's influence guides wise investments. Consider long-term strategies over quick gains.",
          time: "All Day",
          intensity: "Medium"
        }
      ]
    },
    {
      category: "Health & Wellness",
      icon: Shield,
      color: "#10B981",
      gradient: "from-emerald-500 to-teal-500",
      cards: [
        {
          title: "Vital Energy",
          message: "Mars energizes your physical form. Channel this power through movement and conscious breathing.",
          time: "Morning",
          intensity: "High"
        },
        {
          title: "Mental Clarity",
          message: "Jupiter's wisdom flows through meditation. Seek moments of stillness to restore inner balance.",
          time: "Evening",
          intensity: "Low"
        }
      ]
    },
    {
      category: "Fortune & Luck",
      icon: TrendingUp,
      color: "#F59E0B",
      gradient: "from-amber-500 to-orange-500",
      cards: [
        {
          title: "Golden Opportunities",
          message: "The stars align to bring unexpected blessings. Stay alert to signs and synchronicities around you.",
          time: "Midday",
          intensity: "High"
        },
        {
          title: "Manifestation Power",
          message: "Your thoughts carry extra weight today. Focus on positive intentions and watch them bloom into reality.",
          time: "All Day",
          intensity: "Medium"
        }
      ]
    }
  ];

  const cosmicEvents = [
    {
      event: "Moon in Pisces",
      description: "Heightened intuition and emotional sensitivity",
      icon: Moon,
      time: "6:30 AM"
    },
    {
      event: "Mercury Trine Jupiter",
      description: "Excellent day for communication and learning",
      icon: Star,
      time: "2:15 PM"
    },
    {
      event: "Venus Sextile Mars",
      description: "Harmony between passion and love energies",
      icon: Sun,
      time: "8:45 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B1F] via-[#1E1B4B] to-[#0A0B1F]">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
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

      <div className="relative z-10 max-w-md mx-auto p-4">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-6 pt-12"
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
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">Daily Insights</h1>
            <p className="text-sm text-gray-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="w-10" />
        </motion.div>

        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="space-y-6">
            {/* Cosmic Events */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h2 className="text-lg font-semibold text-white mb-4">Today's Cosmic Events</h2>
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 rounded-2xl p-4">
                <div className="space-y-3">
                  {cosmicEvents.map((event, index) => (
                    <motion.div
                      key={event.event}
                      className="flex items-center space-x-3 p-3 rounded-xl bg-white/5"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                        <event.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-sm">{event.event}</h3>
                        <p className="text-gray-400 text-xs">{event.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#06B6D4] text-xs font-semibold">{event.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Insights by Category */}
            {insights.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + categoryIndex * 0.2, duration: 0.8 }}
              >
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <category.icon 
                      className="w-5 h-5" 
                      style={{ color: category.color }}
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-white">{category.category}</h2>
                </div>

                {/* Insight Cards */}
                <div className="space-y-4">
                  {category.cards.map((card, cardIndex) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.8 + categoryIndex * 0.2 + cardIndex * 0.1, 
                        duration: 0.5 
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card className="backdrop-blur-xl bg-white/5 border-white/10 rounded-2xl p-5 relative overflow-hidden">
                        {/* Gradient accent */}
                        <div 
                          className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.gradient}`}
                        />
                        
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-white font-semibold">{card.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReadAloud(card.message)}
                              className="p-1 h-auto text-white/70 hover:text-white hover:bg-white/10"
                            >
                              <Volume2 className="w-4 h-4" />
                            </Button>
                            <div className="flex flex-col items-end space-y-1">
                              <span className="text-xs text-gray-400">{card.time}</span>
                              <span 
                                className={`text-xs px-2 py-1 rounded-full ${
                                  card.intensity === 'High' 
                                    ? 'bg-red-500/20 text-red-300' 
                                    : card.intensity === 'Medium'
                                    ? 'bg-yellow-500/20 text-yellow-300'
                                    : 'bg-green-500/20 text-green-300'
                                }`}
                              >
                                {card.intensity}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 leading-relaxed text-sm">{card.message}</p>
                        
                        {/* Decorative elements */}
                        <div className="absolute -bottom-2 -right-2 w-16 h-16 opacity-10">
                          <div 
                            className={`w-full h-full rounded-full bg-gradient-to-br ${category.gradient}`}
                          />
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Bottom spacing */}
            <div className="h-8" />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}