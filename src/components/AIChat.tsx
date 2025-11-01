import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Mic, MicOff, Volume2, Star, Bot, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';

interface AIChatProps {
  userData?: {
    name: string;
    dateOfBirth: string;
    timeOfBirth: string;
    placeOfBirth: string;
  } | null;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  language?: string;
}

export function AIChat({ userData }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello ${userData?.name || 'there'}! I'm your AI astrology guide. Ask me anything about your birth chart, planetary influences, or astrology in general. I can answer in multiple languages!`,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What does my birth chart say about my career?",
    "How will Mercury retrograde affect me?",
    "What are my lucky numbers today?",
    "Tell me about my moon sign traits",
    "When is the best time for new beginnings?",
    "What does my 7th house reveal about relationships?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userQuestion: string): string => {
    // Mock AI responses based on common astrology questions
    const responses = {
      career: "Based on your birth chart, your 10th house shows strong potential for leadership roles. With your current planetary transits, this is an excellent time to pursue professional growth and take calculated risks in your career path.",
      mercury: "Mercury retrograde affects communication and technology. For your sign, this period is actually favorable for reviewing past projects and reconnecting with old contacts. Avoid signing major contracts until Mercury goes direct.",
      lucky: "Your lucky numbers today are 7, 14, and 23. These are influenced by your ruling planet and today's lunar position. Consider using these in important decisions or opportunities that arise.",
      moon: "Your moon sign reveals your emotional nature and instinctive responses. It governs how you process feelings and what brings you comfort. Understanding this helps you navigate relationships and personal growth more effectively.",
      timing: "The current planetary alignment suggests that new beginnings are most favorable during the waxing moon phase. For you specifically, the period around the 15th of this month shows particularly promising energy for fresh starts.",
      relationships: "Your 7th house reveals important insights about partnerships. The placement of Venus and Mars in your chart indicates you value deep emotional connections and are drawn to partners who share your intellectual interests."
    };

    const question = userQuestion.toLowerCase();
    if (question.includes('career') || question.includes('job') || question.includes('work')) {
      return responses.career;
    } else if (question.includes('mercury') || question.includes('retrograde')) {
      return responses.mercury;
    } else if (question.includes('lucky') || question.includes('number')) {
      return responses.lucky;
    } else if (question.includes('moon') || question.includes('emotion')) {
      return responses.moon;
    } else if (question.includes('timing') || question.includes('when') || question.includes('new')) {
      return responses.timing;
    } else if (question.includes('relationship') || question.includes('love') || question.includes('7th house')) {
      return responses.relationships;
    } else {
      return "That's a fascinating question! Based on your birth chart and current planetary positions, I can see several important factors at play. The cosmic energies are aligning in ways that suggest significant opportunities for growth and positive change in your life. Would you like me to elaborate on any specific aspect?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Mock voice recording - in real implementation, this would use Web Speech API
    if (!isRecording) {
      setTimeout(() => {
        setInputValue("What does my birth chart say about my love life?");
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleSpeakMessage = (content: string) => {
    // Mock text-to-speech - in real implementation, this would use Web Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#0A0B1F] via-[#1E1B4B] to-[#0A0B1F]">
      {/* Header */}
      <motion.div
        className="p-6 border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Astrology Guide</h1>
            <p className="text-sm text-gray-400">Ask me anything about your cosmic journey</p>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <Card className={`p-4 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white ml-4'
                    : 'bg-white/5 border-white/10 text-white mr-4'
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user'
                        ? 'bg-white/20'
                        : 'bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6]'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Star className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="leading-relaxed">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {message.type === 'ai' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSpeakMessage(message.content)}
                            className="p-1 h-auto text-white/70 hover:text-white hover:bg-white/10"
                          >
                            <Volume2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-4 bg-white/5 border-white/10 text-white mr-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6] flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <motion.div
          className="p-4 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-sm text-gray-400 mb-3">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.slice(0, 3).map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestedQuestion(question)}
                className="border-white/20 text-white hover:bg-white/10 text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input Area */}
      <motion.div
        className="p-6 border-t border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about your birth chart, compatibility, or any astrology question..."
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pr-12 py-3 rounded-xl focus:border-[#6366F1] focus:bg-white/10"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleVoiceRecord}
            className={`rounded-xl ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>
          
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5B5EE6] hover:to-[#7C3AED] text-white rounded-xl px-6"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          🌟 AI responds in your language automatically • Voice input supported
        </p>
      </motion.div>
    </div>
  );
}