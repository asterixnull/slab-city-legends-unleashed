import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from "@/components/ui/button";
import { 
  Map, 
  Users, 
  FileText, 
  MessageSquare, 
  DollarSign,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/desert-landscape.jpg')" }}>
        <div className="absolute inset-0 bg-slab-dark/30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-display text-slab-cream mb-4 tracking-wider">SLAB CITY</h1>
          <h2 className="text-3xl md:text-4xl font-display text-slab-copper mb-8">SLAB CITY LEGENDS</h2>
          <p className="text-xl text-slab-cream/90 max-w-2xl mx-auto mb-8">
            Welcome to the last free place on earth. A card game of desert survival, 
            community building, and outlandish shenanigans.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="btn-distressed" asChild>
              <Link to="/decks">EXPLORE DECKS</Link>
            </Button>
            <Button className="btn-distressed" variant="outline" asChild>
              <Link to="/donate">JOIN THE CAUSE</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <PageContainer className="mt-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display text-slab-rust mb-6 text-center">WELCOME TO THE SLABS</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed">
            <p className="mb-4 text-lg">
              Nestled in the Sonoran Desert of Southern California lies Slab City - 
              a haven for artists, outsiders, freedom seekers, and desert dwellers.
            </p>
            <p className="mb-4 text-lg">
              Our card game brings this unique community to life, letting you experience 
              the beauty, challenges, and odd characters that make up this legendary place.
            </p>
            <p className="text-lg">
              Build your camp, navigate character encounters, gather resources, and rise up 
              the ranks to become a true Slab City legend. Just watch out for the scorpions!
            </p>
          </div>
        </div>
      </PageContainer>

      {/* Features Section */}
      <PageContainer className="mt-16">
        <h2 className="text-3xl font-display text-slab-rust mb-10 text-center">GAME FEATURES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg card-distressed flex flex-col items-center text-center">
            <div className="bg-slab-rust rounded-full p-3 inline-flex mb-4">
              <Users className="h-10 w-10 text-slab-cream" />
            </div>
            <h3 className="text-xl font-display text-slab-dark mb-3">CHARACTER ENCOUNTERS</h3>
            <p>Meet the colorful characters of Slab City, from artists to nomads, each with their own stories and challenges.</p>
            <Link to="/characters" className="mt-4 text-slab-rust font-bold hover:text-slab-copper inline-flex items-center">
              MEET THE CHARACTERS <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg card-distressed flex flex-col items-center text-center">
            <div className="bg-slab-rust rounded-full p-3 inline-flex mb-4">
              <Map className="h-10 w-10 text-slab-cream" />
            </div>
            <h3 className="text-xl font-display text-slab-dark mb-3">UNIQUE LOCATIONS</h3>
            <p>Explore iconic Slab City locations like Salvation Mountain, East Jesus, and The Range, each with special card effects.</p>
            <Link to="/locations" className="mt-4 text-slab-rust font-bold hover:text-slab-copper inline-flex items-center">
              EXPLORE LOCATIONS <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg card-distressed flex flex-col items-center text-center">
            <div className="bg-slab-rust rounded-full p-3 inline-flex mb-4">
              <FileText className="h-10 w-10 text-slab-cream" />
            </div>
            <h3 className="text-xl font-display text-slab-dark mb-3">PLAYER SUBMISSIONS</h3>
            <p>Submit your own card designs, share Slab City stories, and leave your mark on this community-driven game.</p>
            <Link to="/submit" className="mt-4 text-slab-rust font-bold hover:text-slab-copper inline-flex items-center">
              SUBMIT YOUR IDEAS <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </PageContainer>

      {/* Community Section */}
      <PageContainer className="mt-16">
        <div className="bg-slab-dark/80 backdrop-blur-sm rounded-lg p-8 shadow-lg text-slab-cream">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-display text-slab-copper mb-6">JOIN THE COMMUNITY</h2>
              <p className="mb-4">
                Slab City Legends isn't just a card game - it's a community of players,
                storytellers, and desert enthusiasts coming together to celebrate this unique place.
              </p>
              <p className="mb-6">
                Connect with fellow players, share strategies, and earn your "Gratitude Gangster" points
                by supporting the characters and causes that keep Slab City free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-slab-copper hover:bg-slab-rust text-slab-cream" asChild>
                  <Link to="/messages">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    MESSAGE BOARD
                  </Link>
                </Button>
                <Button variant="outline" className="border-slab-copper text-slab-copper hover:bg-slab-copper hover:text-slab-cream" asChild>
                  <Link to="/donate">
                    <DollarSign className="mr-2 h-4 w-4" />
                    DONATE
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-slab-cream/10 p-6 rounded-lg max-w-xs">
                <h3 className="text-xl font-display text-slab-copper mb-4 text-center">TOP GRATITUDE GANGSTERS</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center border-b border-slab-copper/30 pb-2">
                    <span className="font-bold">Desert Dweller</span>
                    <span className="bg-slab-copper/20 px-2 py-1 rounded">7,845 points</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-slab-copper/30 pb-2">
                    <span className="font-bold">Nomad Ninja</span>
                    <span className="bg-slab-copper/20 px-2 py-1 rounded">6,512 points</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-bold">Salvation Seeker</span>
                    <span className="bg-slab-copper/20 px-2 py-1 rounded">5,930 points</span>
                  </li>
                </ul>
                <div className="mt-4 text-center">
                  <Link to="/leaderboard" className="text-slab-copper hover:text-slab-cream inline-flex items-center text-sm">
                    VIEW FULL LEADERBOARD <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>

      {/* CTA Section */}
      <PageContainer className="mt-16 mb-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-display text-slab-rust mb-6">READY TO JOIN THE ADVENTURE?</h2>
          <p className="text-lg mb-8">
            Grab your starter pack, meet the characters, and begin your journey through 
            the dusty, bizarre, and beautiful world of Slab City.
          </p>
          <Button className="btn-distressed text-xl px-8 py-6" asChild>
            <Link to="/decks">GET STARTED</Link>
          </Button>
        </div>
      </PageContainer>
    </div>
  );
};

export default Index;
