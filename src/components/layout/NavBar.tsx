
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const NavBar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const { user, profile, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    }
    if (profile?.username) {
      return profile.username.substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Decks', path: '/decks' },
    { name: 'Characters', path: '/characters' },
    { name: 'Locations', path: '/locations' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Submit', path: '/submit' },
    { name: 'Message Board', path: '/messages' },
    { name: 'Donate', path: '/donate' },
  ];

  return (
    <nav className="bg-slab-dark/90 text-slab-cream sticky top-0 z-50 border-b border-slab-copper/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <span className="text-2xl md:text-3xl font-display text-slab-copper tracking-wider">SLAB CITY</span>
          </Link>

          {isMobile ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="text-slab-cream hover:text-slab-copper"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          ) : (
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <div className="flex items-center ml-4 space-x-2">
                  <Avatar className="h-8 w-8 border border-slab-copper">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback className="bg-slab-copper/30 text-slab-cream text-xs">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-slab-copper/20 text-slab-cream border-slab-copper hover:bg-slab-copper hover:text-slab-cream"
                    onClick={handleSignOut}
                  >
                    <LogOut size={16} className="mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button 
                    variant="outline" 
                    className="ml-4 bg-slab-copper/20 text-slab-cream border-slab-copper hover:bg-slab-copper hover:text-slab-cream"
                  >
                    <User size={16} className="mr-1" /> 
                    Login
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`navbar-link ${location.pathname === link.path ? 'active' : ''} py-2 px-4 rounded hover:bg-slab-copper/20`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <div className="flex flex-col space-y-2 mt-4">
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <Avatar className="h-8 w-8 border border-slab-copper">
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback className="bg-slab-copper/30 text-slab-cream text-xs">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-slab-cream">
                      <div className="font-medium">{profile?.username || profile?.full_name || user.email}</div>
                      {profile?.username && profile?.full_name && (
                        <div className="text-xs text-slab-cream/70">{profile.full_name}</div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="bg-slab-copper/20 text-slab-cream border-slab-copper hover:bg-slab-copper hover:text-slab-cream"
                    onClick={handleSignOut}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/auth" onClick={closeMenu}>
                  <Button 
                    variant="outline" 
                    className="mt-4 w-full bg-slab-copper/20 text-slab-cream border-slab-copper hover:bg-slab-copper hover:text-slab-cream"
                  >
                    <User size={16} className="mr-2" /> 
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
