import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, User, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface UserInputScreenProps {
  onComplete: (data: UserData) => void;
}

interface UserData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

export function UserInputScreen({ onComplete }: UserInputScreenProps) {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: ''
  });

  const [errors, setErrors] = useState<Partial<UserData>>({});

  const fields = [
    {
      key: 'name' as keyof UserData,
      label: "What's your name?",
      placeholder: 'Enter your full name',
      icon: User,
      type: 'text'
    },
    {
      key: 'dateOfBirth' as keyof UserData,
      label: 'When were you born?',
      placeholder: 'Select date',
      icon: Calendar,
      type: 'date'
    },
    {
      key: 'timeOfBirth' as keyof UserData,
      label: 'What time were you born?',
      placeholder: 'Select time',
      icon: Clock,
      type: 'time'
    },
    {
      key: 'placeOfBirth' as keyof UserData,
      label: 'Where were you born?',
      placeholder: 'City, Country',
      icon: MapPin,
      type: 'text'
    }
  ];

  const handleInputChange = (key: keyof UserData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Clear error for this field
    if (errors[key]) {
      setErrors(prev => ({
        ...prev,
        [key]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserData> = {};
    let isValid = true;

    fields.forEach(field => {
      if (!formData[field.key].trim()) {
        newErrors[field.key] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B1F] via-[#1E1B4B] to-[#0A0B1F] flex items-center justify-center p-4 lg:p-6">
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Create Your Cosmic Profile
          </h1>
          <p className="text-gray-400 text-lg">
            Help us map your astrological journey
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {fields.map((field, index) => (
                <motion.div
                  key={field.key}
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                >
                  <Label 
                    htmlFor={field.key}
                    className="text-white text-lg flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 flex items-center justify-center border border-[#6366F1]/30">
                      <field.icon className="w-5 h-5 text-[#6366F1]" />
                    </div>
                    {field.label}
                  </Label>
                  
                  <div className="relative">
                    <Input
                      id={field.key}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.key]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className={`bg-white/5 border-white/20 text-white placeholder:text-gray-500 text-lg py-6 px-5 rounded-xl focus:border-[#6366F1] focus:bg-white/10 transition-all duration-300 ${
                        errors[field.key] ? 'border-red-500/50' : ''
                      }`}
                    />
                    
                    {errors[field.key] && (
                      <motion.p
                        className="text-red-400 text-sm mt-2 ml-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors[field.key]}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  disabled={!allFieldsFilled}
                  className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5B5EE6] hover:to-[#7C3AED] text-white py-7 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-lg font-semibold shadow-lg shadow-[#6366F1]/25"
                >
                  <span className="flex items-center justify-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    Generate My Cosmic Chart
                    <Sparkles className="w-5 h-5" />
                  </span>
                </Button>
              </motion.div>

              {/* Helper Text */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <p className="text-gray-400 text-sm">
                  Your data is encrypted and used only for generating your personalized insights
                </p>
              </motion.div>
            </form>
          </Card>
        </motion.div>

        {/* Bottom decorative text */}
        <motion.div
          className="text-center mt-8 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-2 text-[#06B6D4]">
            <div className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
            <p className="text-sm">AI-powered • Real-time ephemeris • Explainable insights</p>
            <div className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
