import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Star, 
  Video, 
  Phone, 
  MessageCircle, 
  Calendar,
  Search,
  Filter,
  Crown,
  Languages,
  Award,
  Clock
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface ConnectGuruProps {
  onBack: () => void;
}

interface Guru {
  id: number;
  name: string;
  title: string;
  expertise: string[];
  rating: number;
  reviews: number;
  experience: number;
  languages: string[];
  availability: string;
  price: {
    video: number;
    voice: number;
    chat: number;
  };
  image: string;
  isPremium: boolean;
  description: string;
}

export function ConnectGuru({ onBack }: ConnectGuruProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuru, setSelectedGuru] = useState<Guru | null>(null);
  const [bookingType, setBookingType] = useState<'video' | 'voice' | 'chat' | null>(null);

  const gurus: Guru[] = [
    {
      id: 1,
      name: "Pandit Rajesh Sharma",
      title: "Vedic Astrology Master",
      expertise: ["Vedic Astrology", "Birth Chart Analysis", "Gemstone Consultation", "Vastu Shastra"],
      rating: 4.9,
      reviews: 2847,
      experience: 25,
      languages: ["Hindi", "English", "Sanskrit"],
      availability: "Available Now",
      price: {
        video: 999,
        voice: 799,
        chat: 499
      },
      image: "https://images.unsplash.com/photo-1718423116866-43ac4d6813aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzcGlyaXR1YWwlMjBndXJ1fGVufDF8fHx8MTc2MjAxNTQ3MHww&ixlib=rb-4.1.0&q=80&w=1080",
      isPremium: true,
      description: "Master of Vedic Astrology with 25+ years of experience in helping thousands of people navigate their life's journey through cosmic wisdom."
    },
    {
      id: 2,
      name: "Dr. Priya Menon",
      title: "KP Astrology Specialist",
      expertise: ["KP System", "Career Guidance", "Marriage Compatibility", "Muhurat"],
      rating: 4.8,
      reviews: 1923,
      experience: 18,
      languages: ["English", "Hindi", "Tamil", "Malayalam"],
      availability: "Available in 2h",
      price: {
        video: 1299,
        voice: 999,
        chat: 599
      },
      image: "https://images.unsplash.com/photo-1603203349869-02a3f4f1add3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWwlMjB0ZWFjaGVyJTIwbWVkaXRhdGlvbnxlbnwxfHx8fDE3NjIwMTU0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      isPremium: true,
      description: "PhD in Astrology specializing in KP System. Known for accurate predictions and practical remedies for life's challenges."
    },
    {
      id: 3,
      name: "Guruji Anand Patel",
      title: "Nadi Astrology Expert",
      expertise: ["Nadi Astrology", "Palmistry", "Numerology", "Spiritual Healing"],
      rating: 4.9,
      reviews: 3142,
      experience: 30,
      languages: ["Hindi", "Gujarati", "English"],
      availability: "Offline",
      price: {
        video: 1499,
        voice: 1199,
        chat: 699
      },
      image: "https://images.unsplash.com/photo-1760638261420-ad9acd4e0c1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXNlJTIwZWxkZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjIwMTU0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      isPremium: true,
      description: "Renowned Nadi Astrology expert with three decades of experience. Provides deep spiritual guidance and accurate life predictions."
    },
    {
      id: 4,
      name: "Swami Vikas Bharti",
      title: "Spiritual Counselor",
      expertise: ["Life Coaching", "Meditation", "Karma Analysis", "Spiritual Guidance"],
      rating: 4.7,
      reviews: 1456,
      experience: 15,
      languages: ["Hindi", "English"],
      availability: "Available Now",
      price: {
        video: 799,
        voice: 599,
        chat: 399
      },
      image: "https://images.unsplash.com/photo-1718423116866-43ac4d6813aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzcGlyaXR1YWwlMjBndXJ1fGVufDF8fHx8MTc2MjAxNTQ3MHww&ixlib=rb-4.1.0&q=80&w=1080",
      isPremium: false,
      description: "Combines ancient wisdom with modern psychology to provide holistic spiritual guidance and life counseling."
    },
    {
      id: 5,
      name: "Acharya Deepak Kumar",
      title: "Lal Kitab Specialist",
      expertise: ["Lal Kitab", "Remedies", "Horary Astrology", "Financial Astrology"],
      rating: 4.8,
      reviews: 2134,
      experience: 20,
      languages: ["Hindi", "Punjabi", "English"],
      availability: "Available in 1h",
      price: {
        video: 899,
        voice: 699,
        chat: 449
      },
      image: "https://images.unsplash.com/photo-1603203349869-02a3f4f1add3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWwlMjB0ZWFjaGVyJTIwbWVkaXRhdGlvbnxlbnwxfHx8fDE3NjIwMTU0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      isPremium: false,
      description: "Expert in Lal Kitab remedies with proven track record of helping clients overcome obstacles with simple yet effective solutions."
    },
    {
      id: 6,
      name: "Mata Saraswati Devi",
      title: "Jyotish Acharya",
      expertise: ["Prasna Shastra", "Women Issues", "Child Astrology", "Health Astrology"],
      rating: 4.9,
      reviews: 2678,
      experience: 22,
      languages: ["Hindi", "Bengali", "English", "Marathi"],
      availability: "Available Now",
      price: {
        video: 1099,
        voice: 899,
        chat: 549
      },
      image: "https://images.unsplash.com/photo-1760638261420-ad9acd4e0c1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXNlJTIwZWxkZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjIwMTU0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      isPremium: true,
      description: "Specialized in addressing women's concerns and child astrology. Known for her compassionate approach and accurate predictions."
    }
  ];

  const filteredGurus = gurus.filter(guru =>
    guru.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guru.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleBooking = (guru: Guru, type: 'video' | 'voice' | 'chat') => {
    setSelectedGuru(guru);
    setBookingType(type);
  };

  const confirmBooking = () => {
    // In real app, this would integrate with payment and scheduling
    alert(`Booking confirmed with ${selectedGuru?.name} for ${bookingType} consultation!`);
    setSelectedGuru(null);
    setBookingType(null);
  };

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

      <div className="relative z-10 max-w-6xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8 pt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-white/10 rounded-full lg:hidden"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">Connect with Gurus</h1>
              <p className="text-gray-400">Find your spiritual guide</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 py-6 rounded-xl focus:border-[#6366F1] focus:bg-white/10"
            />
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{gurus.length}+</div>
            <div className="text-sm text-gray-400">Expert Gurus</div>
          </Card>
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">50k+</div>
            <div className="text-sm text-gray-400">Consultations</div>
          </Card>
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">4.8</div>
            <div className="text-sm text-gray-400">Avg Rating</div>
          </Card>
        </motion.div>

        {/* Guru List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
          {filteredGurus.map((guru, index) => (
            <motion.div
              key={guru.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 rounded-2xl p-5 hover:border-[#6366F1]/50 transition-all duration-300 relative overflow-hidden">
                {guru.isPremium && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  {/* Guru Image */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-[#6366F1]/50">
                      <ImageWithFallback
                        src={guru.image}
                        alt={guru.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-[#0A0B1F] ${
                      guru.availability === 'Available Now' 
                        ? 'bg-green-500' 
                        : guru.availability.includes('Available') 
                        ? 'bg-yellow-500' 
                        : 'bg-gray-500'
                    }`} />
                  </div>

                  {/* Guru Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">{guru.name}</h3>
                    <p className="text-sm text-[#06B6D4] mb-2">{guru.title}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                        <span className="text-white font-semibold">{guru.rating}</span>
                      </div>
                      <span className="text-gray-400 text-sm">({guru.reviews} reviews)</span>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="bg-white/10 text-gray-300 border-0">
                        <Award className="w-3 h-3 mr-1" />
                        {guru.experience}y exp
                      </Badge>
                      <Badge variant="secondary" className="bg-white/10 text-gray-300 border-0">
                        <Languages className="w-3 h-3 mr-1" />
                        {guru.languages.length} langs
                      </Badge>
                      <Badge 
                        variant="secondary" 
                        className={`border-0 ${
                          guru.availability === 'Available Now' 
                            ? 'bg-green-500/20 text-green-400' 
                            : guru.availability.includes('Available')
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {guru.availability}
                      </Badge>
                    </div>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {guru.expertise.slice(0, 3).map((exp) => (
                        <span 
                          key={exp}
                          className="px-2 py-1 bg-[#6366F1]/20 text-[#C7D2FE] text-xs rounded-full"
                        >
                          {exp}
                        </span>
                      ))}
                      {guru.expertise.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 text-gray-400 text-xs rounded-full">
                          +{guru.expertise.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleBooking(guru, 'video')}
                        className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5B5EE6] hover:to-[#7C3AED] text-white"
                        disabled={guru.availability === 'Offline'}
                      >
                        <Video className="w-3 h-3 mr-1" />
                        ₹{guru.price.video}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBooking(guru, 'voice')}
                        className="border-white/20 text-white hover:bg-white/10"
                        disabled={guru.availability === 'Offline'}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        ₹{guru.price.voice}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBooking(guru, 'chat')}
                        className="border-white/20 text-white hover:bg-white/10"
                        disabled={guru.availability === 'Offline'}
                      >
                        <MessageCircle className="w-3 h-3 mr-1" />
                        ₹{guru.price.chat}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking Confirmation Dialog */}
      <Dialog open={selectedGuru !== null} onOpenChange={() => setSelectedGuru(null)}>
        <DialogContent className="bg-[#1E1B4B] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Consultation</DialogTitle>
            <DialogDescription className="text-gray-400">
              Book a {bookingType} consultation with {selectedGuru?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedGuru && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-[#6366F1]/50">
                  <ImageWithFallback
                    src={selectedGuru.image}
                    alt={selectedGuru.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedGuru.name}</h3>
                  <p className="text-sm text-gray-400">{selectedGuru.title}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                    <span className="text-sm">{selectedGuru.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400">Consultation Type</span>
                  <span className="font-semibold capitalize">{bookingType}</span>
                </div>
                <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400">Duration</span>
                  <span className="font-semibold">30 minutes</span>
                </div>
                <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400">Amount</span>
                  <span className="font-semibold text-[#06B6D4]">
                    ₹{bookingType && selectedGuru.price[bookingType]}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedGuru(null)}
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmBooking}
                  className="flex-1 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5B5EE6] hover:to-[#7C3AED] text-white"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
