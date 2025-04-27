
import { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from "@/components/ui/button";
import { MapPin } from 'lucide-react';

const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState(0);

  const locations = [
    {
      id: 1,
      name: 'Salvation Mountain',
      image: '/salvation-mountain.jpg',
      description: 'A vibrant art installation created from adobe, straw, and thousands of gallons of paint, dedicated to spreading the message of love.',
      gameEffect: 'Players who visit Salvation Mountain gain 2 "Inspiration" tokens that can be used to enhance any action.',
      history: 'Created by Leonard Knight over several decades, Salvation Mountain stands as a testament to outsider art and one man\'s dedication to spreading a message of universal love.',
      visitorTips: [
        'Respectful donations of paint are always welcome',
        'Climbing on the mountain can damage the art',
        'Best visited in the morning when the desert is cooler'
      ]
    },
    {
      id: 2,
      name: 'East Jesus',
      image: '/east-jesus.jpg',
      description: 'An experimental, sustainable art installation and community focusing on creative reuse of materials that would otherwise be part of the waste stream.',
      gameEffect: 'At East Jesus, players can trade any 3 "Junk" cards for 1 "Art" card worth 5 points.',
      history: 'Founded by Charles Russell (aka Container Charlie), East Jesus grew from a personal art site into a collective space for creative experimentation and desert living.',
      visitorTips: [
        'Artists-in-residence may offer guided tours',
        'Photography is encouraged, but respect the art',
        'Donations of useful materials are appreciated'
      ]
    },
    {
      id: 3,
      name: 'The Range',
      image: '/the-range.jpg',
      description: 'Slab City\'s open-air nightclub and performance venue, featuring an eclectic mix of music, poetry, and storytelling every Saturday night.',
      gameEffect: 'Playing a "Performance" card at The Range doubles its point value and can earn bonus "Connection" cards.',
      history: 'Built by Builder Bill, The Range has become the social hub of Slab City, showcasing the remarkable talent found in this desert community and providing a gathering space for travelers and residents alike.',
      visitorTips: [
        'Saturday night shows start around sunset',
        'Bring your own chair and beverages',
        'Performers are welcome to sign up on arrival'
      ]
    },
    {
      id: 4,
      name: 'The Library',
      image: '/the-library.jpg',
      description: 'A community-run library offering books, shade, and a place to connect with other Slabbers and travelers.',
      gameEffect: 'Players who visit The Library can draw an extra card once per round, representing new knowledge gained.',
      history: 'Founded to promote literacy and provide resources to the community, the Slab City Library operates on a "take a book, leave a book" honor system and serves as an important information hub.',
      visitorTips: [
        'Book donations are always welcome',
        'Check the bulletin board for community events',
        'Internet access may be available during certain hours'
      ]
    },
    {
      id: 5,
      name: 'The Hot Springs',
      image: '/hot-springs.jpg',
      description: 'Natural hot springs that have been tapped and channeled into makeshift tubs and pools, providing a unique bathing experience in the desert.',
      gameEffect: 'Visiting The Hot Springs removes all "Fatigue" tokens and heals 1 damage card.',
      history: 'The geothermal activity beneath Slab City creates these natural hot springs, which residents have developed into communal bathing areas that operate on donation and community maintenance.',
      visitorTips: [
        'Best enjoyed at sunset or sunrise',
        'Bring your own towel and water for drinking',
        'Clothing optional, but respect is mandatory'
      ]
    }
  ];

  const location = locations[selectedLocation];

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display text-slab-rust mb-6">LOCATIONS</h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed mb-12">
          <h2 className="text-2xl font-display text-slab-dark mb-4">EXPLORE SLAB CITY</h2>
          <p className="mb-4">
            Slab City features numerous iconic locations, each with their own unique history, 
            residents, and significance. In the game, visiting these locations provides special 
            bonuses and opportunities for your character.
          </p>
          <p>
            From the colorful art installations to communal gathering spots, each location 
            offers strategic advantages and new cards to enhance your Slab City experience.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {locations.map((loc, index) => (
            <button
              key={loc.id}
              className={`p-3 text-center transition-all ${
                selectedLocation === index 
                  ? 'bg-slab-rust text-slab-cream scale-105 shadow-lg' 
                  : 'bg-white/60 hover:bg-slab-rust/70 hover:text-slab-cream'
              } rounded-lg font-display tracking-wide text-sm md:text-base`}
              onClick={() => setSelectedLocation(index)}
            >
              {loc.name}
            </button>
          ))}
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg card-distressed">
          <div className="relative h-64 md:h-96">
            <img 
              src={location.image || `https://placehold.co/1200x600/B87333/FFFFFF?text=${location.name}`} 
              alt={location.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slab-dark/90 via-slab-dark/30 to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center mb-2">
                <MapPin className="text-slab-copper mr-2" />
                <h2 className="text-3xl md:text-4xl font-display text-slab-cream">{location.name}</h2>
              </div>
              <p className="text-slab-cream/90 max-w-2xl">{location.description}</p>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-display text-slab-rust text-lg mb-2">HISTORY</h3>
                <p className="mb-4">{location.history}</p>
                
                <h3 className="font-display text-slab-rust text-lg mb-2">GAME EFFECT</h3>
                <p className="italic border-l-2 border-slab-copper pl-4 py-1">{location.gameEffect}</p>
              </div>
              
              <div>
                <h3 className="font-display text-slab-rust text-lg mb-2">VISITOR TIPS</h3>
                <ul className="space-y-2">
                  {location.visitorTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-slab-copper mr-2">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-4 bg-slab-dark/10 rounded-lg">
                  <h4 className="font-display text-slab-rust mb-2">STRATEGY NOTE</h4>
                  <p className="text-sm">
                    {location.name} cards can be particularly valuable when combined with Character abilities. 
                    Consider timing your visit to maximize resource collection and point generation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button className="bg-slab-copper hover:bg-slab-rust text-slab-cream">
                VIEW LOCATION CARD
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-slab-dark/80 backdrop-blur-sm text-slab-cream rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-display text-slab-copper mb-4">SUGGEST A LOCATION</h2>
          <p className="mb-4">
            Know about a special spot in Slab City that should be featured in the game? 
            Submit your location idea and it might be included in future expansions!
          </p>
          <Button className="bg-slab-copper hover:bg-slab-rust text-slab-cream" asChild>
            <a href="/submit">SUGGEST LOCATION</a>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Locations;
