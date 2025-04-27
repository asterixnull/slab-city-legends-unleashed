
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export const NavBar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    toast({
      title: "Coming Soon!",
      description: "Login functionality will be available soon.",
    });
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
              <Button 
                variant="outline" 
                className="ml-4 bg-slab-copper/20 text-slab-cream border-slab-copper hover:bg-slab-copper hover:text-slab-cream"
                onClick={handleLoginClick}
              >
                Login
              </Button>
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
              <Button 
                variant="outline" 
                className="mt-4 bg-slab-copper/20 text-slab-cream border-slab-copper hover:bg-slab-copper hover:text-slab-cream"
                onClick={handleLoginClick}
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
