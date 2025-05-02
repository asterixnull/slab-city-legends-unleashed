
import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Characters from '@/pages/Characters';
import Locations from '@/pages/Locations';
import Decks from '@/pages/Decks';
import Submit from '@/pages/Submit';
import Donate from '@/pages/Donate';
import Messages from '@/pages/Messages';
import Leaderboard from '@/pages/Leaderboard';
import NotFound from '@/pages/NotFound';
import { Toaster } from "@/components/ui/toaster"
import Admin from '@/pages/Admin';

function App() {
  const location = useLocation();

  useEffect(() => {
    console.log('Current location:', location.pathname);
  }, [location]);

  return (
    <AuthProvider>
      <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/desert-texture.jpg')" }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/decks" element={<Decks />} />
          <Route path="/submit" element={
            <ProtectedRoute>
              <Submit />
            </ProtectedRoute>
          } />
          <Route path="/donate" element={<Donate />} />
          <Route path="/messages" element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          } />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
