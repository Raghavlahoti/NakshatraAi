import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from './components/ui/sonner';
import { SplashScreen } from './components/SplashScreen';
import { UserInputScreen } from './components/UserInputScreen';
import { Dashboard } from './components/Dashboard';
import { BirthChart } from './components/BirthChart';
import { DailyInsights } from './components/DailyInsights';
import { Profile } from './components/Profile';
import { AIChat } from './components/AIChat';
import { ConnectGuru } from './components/ConnectGuru';
import { Sidebar } from './components/Sidebar';

type Screen = 'splash' | 'input' | 'dashboard' | 'chart' | 'insights' | 'profile' | 'chat' | 'guru';

interface UserData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSplashComplete = () => {
    setCurrentScreen('input');
  };

  const handleUserInputComplete = (data: UserData) => {
    setUserData(data);
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen('dashboard');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isDesktopLayout = currentScreen !== 'splash' && currentScreen !== 'input' && userData;

  return (
    <div className="min-h-screen bg-[#0A0B1F] dark overflow-hidden">
      <Toaster 
        position="top-center"
        richColors
        theme="dark"
      />
      
      {/* Sidebar for desktop layout */}
      {isDesktopLayout && (
        <Sidebar
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          userData={userData}
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />
      )}

      {/* Main content */}
      <div className={`${isDesktopLayout ? 'lg:ml-80' : ''} min-h-screen`}>
        <AnimatePresence mode="wait">
          {currentScreen === 'splash' && (
            <motion.div
              key="splash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SplashScreen onComplete={handleSplashComplete} />
            </motion.div>
          )}

          {currentScreen === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <UserInputScreen onComplete={handleUserInputComplete} />
            </motion.div>
          )}

          {currentScreen === 'dashboard' && userData && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Dashboard 
                userData={userData} 
                onNavigate={handleNavigate}
                onToggleSidebar={toggleSidebar}
              />
            </motion.div>
          )}

          {currentScreen === 'chart' && (
            <motion.div
              key="chart"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <BirthChart onBack={handleBack} />
            </motion.div>
          )}

          {currentScreen === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <DailyInsights onBack={handleBack} />
            </motion.div>
          )}

          {currentScreen === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-screen">
                <AIChat userData={userData} />
              </div>
            </motion.div>
          )}

          {currentScreen === 'profile' && userData && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <Profile 
                userData={userData} 
                onBack={handleBack}
              />
            </motion.div>
          )}

          {currentScreen === 'guru' && (
            <motion.div
              key="guru"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <ConnectGuru onBack={handleBack} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}