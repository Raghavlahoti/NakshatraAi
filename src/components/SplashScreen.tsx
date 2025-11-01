import { useState } from 'react';
import { motion } from 'motion/react';
import { Stars, Sparkles, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { authService } from '../services/authService';
import { toast } from 'sonner@2.0.3';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'apple' | 'guest' | null>(null);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setLoadingProvider('google');
    
    try {
      const user = await authService.signInWithGoogle();
      toast.success(`Welcome ${user.name}!`, {
        description: 'Successfully signed in with Google',
      });
      
      // Wait a bit to show success message
      setTimeout(() => {
        onComplete();
      }, 500);
    } catch (error) {
      toast.error('Sign In Failed', {
        description: 'Could not sign in with Google. Please try again.',
      });
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const handleAppleSignIn = async () => {
    setIsLoading(true);
    setLoadingProvider('apple');
    
    try {
      const user = await authService.signInWithApple();
      toast.success(`Welcome ${user.name}!`, {
        description: 'Successfully signed in with Apple',
      });
      
      // Wait a bit to show success message
      setTimeout(() => {
        onComplete();
      }, 500);
    } catch (error) {
      toast.error('Sign In Failed', {
        description: 'Could not sign in with Apple. Please try again.',
      });
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const handleGuestSignIn = async () => {
    setIsLoading(true);
    setLoadingProvider('guest');
    
    try {
      await authService.signInAsGuest();
      toast.success('Welcome!', {
        description: 'Continuing as guest',
      });
      
      // Wait a bit to show success message
      setTimeout(() => {
        onComplete();
      }, 500);
    } catch (error) {
      toast.error('Error', {
        description: 'Could not continue. Please try again.',
      });
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-[#0A0B1F] via-[#1E1B4B] to-[#0A0B1F] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main logo and content */}
      <div className="relative z-10 text-center px-8 max-w-md w-full">
        {/* Logo container */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1.2,
            type: "spring",
            stiffness: 120,
            damping: 12
          }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 w-24 h-24 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #06B6D4)',
              filter: 'blur(20px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
          
          {/* Main logo circle */}
          <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] p-0.5">
            <div className="w-full h-full rounded-full bg-[#0A0B1F] flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Stars className="w-10 h-10 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* App name */}
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-white via-[#C7D2FE] to-[#06B6D4] bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Nakshatra AI
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-lg text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Decode your destiny with AI
        </motion.p>

        {/* Login Buttons */}
        <motion.div
          className="space-y-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-white text-black hover:bg-gray-100 py-4 rounded-xl text-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && loadingProvider === 'google' ? (
              <>
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </>
            )}
          </Button>

          <Button
            onClick={handleAppleSignIn}
            disabled={isLoading}
            className="w-full bg-black text-white hover:bg-gray-900 border border-white/20 py-4 rounded-xl text-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && loadingProvider === 'apple' ? (
              <>
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Continue with Apple
              </>
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0A0B1F] text-gray-400">or</span>
            </div>
          </div>

          <Button
            onClick={handleGuestSignIn}
            disabled={isLoading}
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10 py-4 rounded-xl text-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && loadingProvider === 'guest' ? (
              <>
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                Loading...
              </>
            ) : (
              'Continue as Guest'
            )}
          </Button>
        </motion.div>

        <motion.p
          className="text-xs text-gray-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          By continuing, you agree to our Terms & Privacy Policy
        </motion.p>

        {/* Sparkle effects */}
        <motion.div
          className="absolute -top-4 -right-4"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <Sparkles className="w-6 h-6 text-[#F59E0B]" />
        </motion.div>

        <motion.div
          className="absolute -bottom-4 -left-4"
          animate={{
            rotate: [360, 180, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        >
          <Sparkles className="w-4 h-4 text-[#06B6D4]" />
        </motion.div>
      </div>
    </motion.div>
  );
}