import React, { useState, useCallback } from 'react';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import JoinAthleticsScreen from './screens/JoinAthleticsScreen';
import MessagesScreen from './screens/MessagesScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomNav from './components/BottomNav';
import { Page, User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login');
  const [currentPage, setCurrentPage] = useState<Page>('Home');

  // This function now receives real user data from the server
  const handleAuthSuccess = useCallback((userData: User) => {
    setUser(userData);
    setCurrentPage('Home');
  }, []);
  
  const handleLogout = useCallback(() => {
    setUser(null);
    setAuthPage('login');
    // In a real app with tokens, you'd also clear the token from localStorage
  }, []);

  const renderCurrentPage = () => {
    if (!user) return null; // Should not happen due to the check below, but good for type safety

    switch (currentPage) {
      case 'Home':
        return <HomeScreen user={user} />;
      case 'Join Athletics':
        return <JoinAthleticsScreen />;
      case 'Messages':
        return <MessagesScreen user={user} />;
      case 'Leaderboard':
        return <LeaderboardScreen user={user} />;
      case 'Profile':
        return <ProfileScreen user={user} onUpdateUser={setUser} onLogout={handleLogout} />;
      default:
        return <HomeScreen user={user} />;
    }
  };

  if (!user) {
    if (authPage === 'login') {
      // The onLogin prop is now passed to LoginScreen to handle successful authentication
      return <LoginScreen onLogin={handleAuthSuccess} onNavigateToRegister={() => setAuthPage('register')} />;
    }
    // The onRegister prop now expects real user data after registration
    return <RegisterScreen onRegister={handleAuthSuccess} onNavigateToLogin={() => setAuthPage('login')} />;
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 font-sans shadow-lg h-screen flex flex-col">
       <main className="flex-1 overflow-y-auto pb-16">
        {renderCurrentPage()}
      </main>
      <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;