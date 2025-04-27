
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Decks = () => {
  const { toast } = useToast();

  const handlePurchase = () => {
    toast({
      title: "Coming Soon!",
      description: "Purchasing feature will be available soon.",
    });
  };

  const decks = [
    {
      id: 'starter',
      name: 'Slabber Starter Pack',
      price: '$19.99',
      description: 'Everything you need to begin your Slab City adventure. Contains 60 cards including characters, locations, resources, and event cards.',
      image: '/starter-deck.jpg',
      features: [
        '15 Character Cards',
        '10 Location Cards',
        '20 Resource Cards',
        '15 Event Cards',
        'Game Rule Book'
      ]
    },
    {
      id: 'nomad',
      name: 'Nomad Expansion',
      price: '$14.99',
      description: 'Add more mobile elements to your game with the Nomad expansion. New vehicles, travelers, and roadside encounters.',
      image: '/nomad-deck.jpg',
      features: [
        '10 Traveler Character Cards',
        '8 Vehicle Cards',
        '12 Roadside Encounter Cards',
        '10 Resource Cards'
      ]
    },
    {
      id: 'artist',
      name: 'Artist Colony',
      price: '$14.99',
      description: 'Explore the creative side of Slab City with the Artist Colony expansion. New artist characters, art installations, and creative events.',
      image: '/artist-deck.jpg',
      features: [
        '12 Artist Character Cards',
        '8 Art Installation Location Cards',
        '15 Creative Event Cards',
        '5 Special Resource Cards'
      ]
    }
  ];

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display text-slab-rust mb-6">CARD DECKS</h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed mb-12">
          <h2 className="text-2xl font-display text-slab-dark mb-4">ABOUT THE CARDS</h2>
          <p className="mb-4">
            Slab City Slabbers & Shenanigans features beautifully illustrated cards that bring the unique 
            world of Slab City to life. Each card is designed with the dusty, creative, and rebellious 
            aesthetic that defines the last free place on earth.
          </p>
          <p>
            Our cards are printed on premium stock with a weathered, distressed finish that feels authentic 
            to the Slab City experience. Build your collection, trade with other players, and create your 
            own Slab City story.
          </p>
        </div>
        
        <div className="space-y-12">
          {decks.map((deck) => (
            <div key={deck.id} className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg card-distressed">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-1 h-64 md:h-auto">
                  <img 
                    src={deck.image || "https://placehold.co/600x400/D2B48C/333333?text=Deck+Image"} 
                    alt={deck.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-2 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-display text-slab-dark">{deck.name}</h3>
                    <span className="bg-slab-rust text-slab-cream px-3 py-1 rounded font-display">{deck.price}</span>
                  </div>
                  <p className="text-slab-dark mb-4">{deck.description}</p>
                  
                  <h4 className="font-display text-slab-rust mb-2">INCLUDES:</h4>
                  <ul className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {deck.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-slab-copper mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="btn-distressed" 
                      onClick={handlePurchase}
                    >
                      PURCHASE DECK
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-slab-rust text-slab-rust hover:bg-slab-rust hover:text-slab-cream"
                    >
                      PREVIEW CARDS
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-slab-dark/80 backdrop-blur-sm text-slab-cream rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-display text-slab-copper mb-4">CREATE YOUR OWN CARDS</h2>
          <p className="mb-4">
            Have an idea for a Slab City character, location, or event? We welcome community submissions! 
            The best card designs may be featured in future expansions.
          </p>
          <Button className="bg-slab-copper hover:bg-slab-rust text-slab-cream" asChild>
            <Link to="/submit">SUBMIT CARD DESIGN</Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Decks;
