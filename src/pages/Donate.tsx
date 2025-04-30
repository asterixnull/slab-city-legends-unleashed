
import { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  DollarSign, 
  Heart, 
  Users, 
  Map, 
  Send,
  Check
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Donate = () => {
  const { toast } = useToast();
  const [donationType, setDonationType] = useState('character');
  const [characterSelection, setCharacterSelection] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Donation Processed!",
      description: "Thank you for contributing to the Slab City community.",
    });
    
    // Reset form
    setDonationAmount('');
    setDonorName('');
    setDonorEmail('');
    setMessage('');
  };
  
  // Sample characters for donation selection
  const characters = [
    { id: 'builder-bob', name: 'Builder Bob', cause: 'Sustainable Housing Initiative' },
    { id: 'salvation-sara', name: 'Salvation Sara', cause: 'Desert Art Preservation' },
    { id: 'nomad-nick', name: 'Nomad Nick', cause: 'Traveler Safety Network' },
    { id: 'generator-gina', name: 'Generator Gina', cause: 'Off-Grid Power Solutions' }
  ];
  
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display text-slab-rust mb-6">DONATE</h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed mb-8">
          <div className="flex items-center mb-4">
            <Heart className="h-6 w-6 text-slab-rust mr-3" />
            <h2 className="text-2xl font-display text-slab-dark">SUPPORT SLAB CITY</h2>
          </div>
          <p className="mb-4">
            Your donations help keep Slab City Legends growing with new cards, 
            expansions, and community events. Choose to support specific in-game characters 
            and their causes, or contribute to the overall development of the game.
          </p>
          <p>
            All donors become "Gratitude Gangsters" and earn points that appear on the 
            leaderboard, plus special badges and in-game bonuses!
          </p>
        </div>
        
        {/* Donation options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            className={`p-6 text-center rounded-lg shadow-lg transition-all
              ${donationType === 'character' 
                ? 'bg-slab-rust text-slab-cream scale-105' 
                : 'bg-white/60 hover:bg-slab-rust/70 hover:text-slab-cream text-slab-dark'}`}
            onClick={() => setDonationType('character')}
          >
            <Users className="h-12 w-12 mx-auto mb-3" />
            <h3 className="text-xl font-display mb-2">CHARACTER CAUSES</h3>
            <p className="text-sm">
              Support the real-world causes represented by game characters
            </p>
          </button>
          
          <button
            className={`p-6 text-center rounded-lg shadow-lg transition-all
              ${donationType === 'locations' 
                ? 'bg-slab-rust text-slab-cream scale-105' 
                : 'bg-white/60 hover:bg-slab-rust/70 hover:text-slab-cream text-slab-dark'}`}
            onClick={() => setDonationType('locations')}
          >
            <Map className="h-12 w-12 mx-auto mb-3" />
            <h3 className="text-xl font-display mb-2">PRESERVATION FUND</h3>
            <p className="text-sm">
              Help preserve the cultural heritage of Slab City locations
            </p>
          </button>
          
          <button
            className={`p-6 text-center rounded-lg shadow-lg transition-all
              ${donationType === 'game' 
                ? 'bg-slab-rust text-slab-cream scale-105' 
                : 'bg-white/60 hover:bg-slab-rust/70 hover:text-slab-cream text-slab-dark'}`}
            onClick={() => setDonationType('game')}
          >
            <DollarSign className="h-12 w-12 mx-auto mb-3" />
            <h3 className="text-xl font-display mb-2">GAME DEVELOPMENT</h3>
            <p className="text-sm">
              Support creation of new cards, expansions, and community events
            </p>
          </button>
        </div>
        
        {/* Donation form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed mb-12">
          <h3 className="text-2xl font-display text-slab-dark mb-6">
            {donationType === 'character' ? 'DONATE TO CHARACTER CAUSES' : 
             donationType === 'locations' ? 'DONATE TO PRESERVATION FUND' : 
             'SUPPORT GAME DEVELOPMENT'}
          </h3>
          
          <form onSubmit={handleDonationSubmit} className="space-y-5">
            {/* Character selection (only shown for character donations) */}
            {donationType === 'character' && (
              <div>
                <label className="block font-display text-slab-dark mb-2">SELECT A CHARACTER TO SUPPORT</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {characters.map(character => (
                    <button
                      key={character.id}
                      type="button"
                      className={`flex items-center p-3 rounded-md border-2 transition
                        ${characterSelection === character.id 
                          ? 'border-slab-copper bg-slab-copper/10 text-slab-dark' 
                          : 'border-slab-copper/30 hover:border-slab-copper/60 text-slab-dark'}`}
                      onClick={() => setCharacterSelection(character.id)}
                    >
                      <div className={`flex items-center justify-center rounded-full w-6 h-6 mr-2
                        ${characterSelection === character.id ? 'bg-slab-copper text-white' : 'bg-gray-200'}`}
                      >
                        {characterSelection === character.id && <Check className="h-4 w-4" />}
                      </div>
                      <div className="text-left">
                        <div className="font-bold">{character.name}</div>
                        <div className="text-xs">{character.cause}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Donation amount */}
            <div>
              <label htmlFor="amount" className="block font-display text-slab-dark mb-2">DONATION AMOUNT</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slab-dark/60" />
                <Input
                  id="amount"
                  type="text"
                  placeholder="50.00"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="pl-10 bg-white/70"
                  required
                />
              </div>
            </div>
            
            {/* Donor information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block font-display text-slab-dark mb-2">YOUR NAME/NICKNAME</label>
                <Input
                  id="name"
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="bg-white/70"
                  placeholder="How you'll appear on the leaderboard"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-display text-slab-dark mb-2">EMAIL</label>
                <Input
                  id="email"
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="bg-white/70"
                  placeholder="For donation receipt"
                  required
                />
              </div>
            </div>
            
            {/* Message */}
            <div>
              <label htmlFor="message" className="block font-display text-slab-dark mb-2">MESSAGE (OPTIONAL)</label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-white/70"
                placeholder="Share why you're supporting this cause..."
              />
            </div>
            
            {/* Submit button */}
            <div className="pt-2">
              <Button type="submit" className="btn-distressed">
                <Send className="mr-2 h-4 w-4" />
                SEND DONATION
              </Button>
              <p className="text-sm text-slab-dark/70 mt-2">
                Secure payment processing. You'll receive a confirmation email after donation.
              </p>
            </div>
          </form>
        </div>
        
        {/* Gratitude points info */}
        <div className="bg-slab-dark/80 backdrop-blur-sm text-slab-cream rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-display text-slab-copper mb-4">GRATITUDE GANGSTER REWARDS</h3>
          <p className="mb-4">
            All donors become Gratitude Gangsters and earn points based on their contributions. 
            Here's what you can earn:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-display text-slab-copper mb-2">BADGES</h4>
              <p className="text-sm">
                Earn special badges like "Philanthropist," "Collector," and "Supporter" 
                that appear next to your name on the leaderboard.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-display text-slab-copper mb-2">EXCLUSIVE CARDS</h4>
              <p className="text-sm">
                Donors get access to exclusive character and event cards that 
                aren't available in standard decks.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="font-display text-slab-copper mb-2">COMMUNITY RECOGNITION</h4>
              <p className="text-sm">
                Top donors are featured in our community spotlights and may have 
                future cards named after them!
              </p>
            </div>
          </div>
          
          <p className="text-center text-slab-cream/90 italic">
            "In Slab City, gratitude is the real currency." — Builder Bob
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default Donate;
