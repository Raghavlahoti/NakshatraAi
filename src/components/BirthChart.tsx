import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Sun, Moon, Star, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';

interface BirthChartProps {
  onBack: () => void;
}

export function BirthChart({ onBack }: BirthChartProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  const planets = [
    { name: 'Sun', symbol: '☉', angle: 45, color: '#F59E0B', house: 1, sign: 'Leo' },
    { name: 'Moon', symbol: '☽', angle: 120, color: '#06B6D4', house: 4, sign: 'Cancer' },
    { name: 'Mercury', symbol: '☿', angle: 60, color: '#8B5CF6', house: 2, sign: 'Gemini' },
    { name: 'Venus', symbol: '♀', angle: 180, color: '#EC4899', house: 6, sign: 'Libra' },
    { name: 'Mars', symbol: '♂', angle: 240, color: '#EF4444', house: 8, sign: 'Aries' },
    { name: 'Jupiter', symbol: '♃', angle: 300, color: '#10B981', house: 10, sign: 'Sagittarius' },
    { name: 'Saturn', symbol: '♄', angle: 15, color: '#6B7280', house: 12, sign: 'Capricorn' },
    { name: 'Uranus', symbol: '♅', angle: 210, color: '#06B6D4', house: 7, sign: 'Aquarius' },
    { name: 'Neptune', symbol: '♆', angle: 90, color: '#8B5CF6', house: 3, sign: 'Pisces' },
    { name: 'Pluto', symbol: '♇', angle: 270, color: '#374151', house: 9, sign: 'Scorpio' }
  ];

  const houses = Array.from({ length: 12 }, (_, i) => ({
    number: i + 1,
    angle: (i * 30) + 15,
    name: ['Self', 'Values', 'Communication', 'Home', 'Creativity', 'Health', 'Relationships', 'Transformation', 'Philosophy', 'Career', 'Community', 'Spirituality'][i]
  }));

  const nakshatras = [
    { name: 'Ashwini', ruling: 'Ketu', element: 'Earth' },
    { name: 'Bharani', ruling: 'Venus', element: 'Earth' },
    { name: 'Krittika', ruling: 'Sun', element: 'Fire' },
    { name: 'Rohini', ruling: 'Moon', element: 'Earth' },
    { name: 'Mrigashira', ruling: 'Mars', element: 'Earth' }
  ];

  const planetData = {
    'Sun': {
      description: "Your core identity and life purpose. The Sun represents your essential self and creative power.",
      influence: "Leadership, vitality, self-expression",
      keywords: ["Identity", "Purpose", "Leadership", "Vitality"]
    },
    'Moon': {
      description: "Your emotional nature and instinctive responses. The Moon governs your inner world and intuition.",
      influence: "Emotions, intuition, nurturing",
      keywords: ["Emotions", "Intuition", "Memory", "Nurturing"]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B1F] via-[#1E1B4B] to-[#0A0B1F] p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-md mx-auto">
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
          <h1 className="text-xl font-bold text-white">Birth Chart</h1>
          <div className="w-10" />
        </motion.div>

        {/* Interactive Chart */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 rounded-3xl p-6 relative overflow-hidden">
            <div className="relative w-80 h-80 mx-auto">
              {/* Outer circle - zodiac wheel */}
              <div className="absolute inset-0 rounded-full border-2 border-white/20">
                {/* House divisions */}
                {houses.map((house) => (
                  <div
                    key={house.number}
                    className="absolute w-full h-full"
                    style={{
                      transform: `rotate(${house.angle}deg)`
                    }}
                  >
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                      {house.number}
                    </div>
                  </div>
                ))}
              </div>

              {/* Inner circle */}
              <div className="absolute inset-8 rounded-full border border-white/10">
                {/* Center gradient */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#6366F1]/20 via-[#8B5CF6]/10 to-[#06B6D4]/20" />
              </div>

              {/* Planets */}
              {planets.map((planet, index) => {
                const radius = 120;
                const x = Math.cos((planet.angle - 90) * Math.PI / 180) * radius;
                const y = Math.sin((planet.angle - 90) * Math.PI / 180) * radius;
                
                return (
                  <motion.div
                    key={planet.name}
                    className="absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      backgroundColor: planet.color,
                      boxShadow: selectedPlanet === planet.name ? `0 0 20px ${planet.color}` : `0 0 10px ${planet.color}50`
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedPlanet(selectedPlanet === planet.name ? null : planet.name)}
                  >
                    <span className="text-white text-sm font-bold">{planet.symbol}</span>
                  </motion.div>
                );
              })}

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full">
                {planets.slice(0, 5).map((planet, index) => {
                  if (index === planets.length - 1) return null;
                  const nextPlanet = planets[index + 1];
                  const radius = 120;
                  
                  const x1 = Math.cos((planet.angle - 90) * Math.PI / 180) * radius + 160;
                  const y1 = Math.sin((planet.angle - 90) * Math.PI / 180) * radius + 160;
                  const x2 = Math.cos((nextPlanet.angle - 90) * Math.PI / 180) * radius + 160;
                  const y2 = Math.sin((nextPlanet.angle - 90) * Math.PI / 180) * radius + 160;
                  
                  return (
                    <motion.line
                      key={`line-${index}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="url(#gradient)"
                      strokeWidth="1"
                      opacity="0.3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                    />
                  );
                })}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Selected planet info */}
            {selectedPlanet && planetData[selectedPlanet] && (
              <motion.div
                className="mt-6 p-4 rounded-xl bg-white/10 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-white font-semibold mb-2">{selectedPlanet}</h3>
                <p className="text-gray-300 text-sm mb-3">{planetData[selectedPlanet].description}</p>
                <div className="flex flex-wrap gap-2">
                  {planetData[selectedPlanet].keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-2 py-1 bg-[#6366F1]/20 text-[#C7D2FE] text-xs rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Tabs for detailed view */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Tabs defaultValue="planets" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10 rounded-xl">
              <TabsTrigger value="planets" className="text-white data-[state=active]:bg-[#6366F1] data-[state=active]:text-white">
                Planets
              </TabsTrigger>
              <TabsTrigger value="houses" className="text-white data-[state=active]:bg-[#6366F1] data-[state=active]:text-white">
                Houses
              </TabsTrigger>
              <TabsTrigger value="nakshatras" className="text-white data-[state=active]:bg-[#6366F1] data-[state=active]:text-white">
                Nakshatras
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="planets" className="mt-4">
              <div className="space-y-3">
                {planets.slice(0, 6).map((planet) => (
                  <motion.div
                    key={planet.name}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: planet.color }}
                        >
                          <span className="text-white text-sm font-bold">{planet.symbol}</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{planet.name}</h3>
                          <p className="text-gray-400 text-sm">in {planet.sign}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">House {planet.house}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="houses" className="mt-4">
              <div className="space-y-3">
                {houses.slice(0, 6).map((house) => (
                  <motion.div
                    key={house.number}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{house.number}</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">House {house.number}</h3>
                          <p className="text-gray-400 text-sm">{house.name}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="nakshatras" className="mt-4">
              <div className="space-y-3">
                {nakshatras.map((nakshatra) => (
                  <motion.div
                    key={nakshatra.name}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6] flex items-center justify-center">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{nakshatra.name}</h3>
                          <p className="text-gray-400 text-sm">Ruled by {nakshatra.ruling}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">{nakshatra.element}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}