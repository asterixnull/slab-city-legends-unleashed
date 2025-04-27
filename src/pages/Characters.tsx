
import { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Characters = () => {
  const { toast } = useToast();
  const [selectedCharacter, setSelectedCharacter] = useState(0);

  const handleDonate = () => {
    toast({
      title: "Thank you!",
      description: "Donation feature will be available soon.",
    });
  };

  const characters = [
    {
      id: 1,
      name: 'Builder Bob',
      image: '/builder-bob.jpg',
      role: 'Master Constructor',
      description: 'A former contractor who found freedom in the Slabs. Bob helps newcomers construct their camps using salvaged materials and desert ingenuity.',
      specialAbility: 'Can build structures using 50% fewer resource cards',
      backstory: "After 30 years in construction, Bob walked away from his life when corporate development destroyed his neighborhood. He found a new purpose in Slab City, teaching others how to build sustainable desert homes from society's leftovers.",
      quotes: [
        "Got trash? I'll make it a treasure.",
        "In the desert, your shadow is the only building inspector you'll ever meet."
      ]
    },
    {
      id: 2,
      name: 'Salvation Sara',
      image: '/salvation-sara.jpg',
      role: 'Desert Artist',
      description: 'A visionary artist who creates massive installations in the desert, inspired by spiritual revelations and desert hallucinations.',
      specialAbility: 'Can convert any 2 resource cards into an art installation that generates 1 point per round',
      backstory: "Sara came to the desert after a vivid dream told her to 'paint the earth with love.' Her colorful structures have become landmarks, drawing visitors who often leave donations that Sara shares with the community.",
      quotes: [
        "The desert doesn't care about your past, only your colors.",
        "God speaks in the emptiness. I just add some highlights."
      ]
    },
    {
      id: 3,
      name: 'Nomad Nick',
      image: '/nomad-nick.jpg',
      role: 'Desert Guide',
      description: 'A weathered traveler who knows every hidden spring, danger zone, and secret spot in the desert surrounding Slab City.',
      specialAbility: 'Can travel to any location without spending action points once per game round',
      backstory: "Nick has been wandering the American deserts for over 15 years, living out of his modified van. He arrives and departs from Slab City with the seasons, always returning with new stories and useful knowledge about desert survival.",
      quotes: [
        "The desert will kill you quick if you're stupid, and slow if you're not paying attention.",
        "Everything you need is out there. You just need to know where to look."
      ]
    },
    {
      id: 4,
      name: 'Generator Gina',
      image: '/generator-gina.jpg',
      role: 'Power Provider',
      description: 'A mechanical genius who keeps the generators, solar panels, and wind turbines running throughout Slab City.',
      specialAbility: "Can provide power to any player's camp, giving them an extra action each turn",
      backstory: "Formerly an electrical engineer for a major utility company, Gina grew disillusioned with corporate life and the waste she witnessed. She brought her skills to Slab City, where she helps maintain the fragile infrastructure that provides power to those living off the grid.",
      quotes: [
        "In a world of planned obsolescence, I plan to make everything last forever.",
        "The desert sun gives us more power than Wall Street ever could."
      ]
    },
  ];

  const character = characters[selectedCharacter];

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display text-slab-rust mb-6">CHARACTERS</h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed mb-12">
          <h2 className="text-2xl font-display text-slab-dark mb-4">MEET THE SLABBERS</h2>
          <p className="mb-4">
            Slab City is home to a colorful cast of characters - artists, nomads, veterans, 
            dreamers, and misfits who have found their place in the last free town in America.
          </p>
          <p>
            Each character in the game has their own unique abilities, backstories, and special cards 
            that can help or hinder your progress. Befriend them, complete their quests, or simply 
            donate to their causes to earn Gratitude Gangster points.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {characters.map((char, index) => (
            <button
              key={char.id}
              className={`p-4 text-center transition-all ${
                selectedCharacter === index 
                  ? 'bg-slab-rust text-slab-cream scale-105 shadow-lg' 
                  : 'bg-white/60 hover:bg-slab-rust/70 hover:text-slab-cream'
              } rounded-lg font-display tracking-wide`}
              onClick={() => setSelectedCharacter(index)}
            >
              {char.name}
            </button>
          ))}
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg card-distressed">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-1 h-80 md:h-auto relative">
              <img 
                src={character.image || `https://placehold.co/600x800/B87333/FFFFFF?text=${character.name}`} 
                alt={character.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slab-dark/70 to-transparent flex flex-col justify-end p-4 md:hidden">
                <h2 className="text-3xl font-display text-slab-cream">{character.name}</h2>
                <p className="text-slab-cream/80 text-sm">{character.role}</p>
              </div>
            </div>
            <div className="md:col-span-2 p-6">
              <div className="hidden md:block mb-4">
                <h2 className="text-3xl font-display text-slab-dark">{character.name}</h2>
                <p className="text-slab-dark/80">{character.role}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-display text-slab-rust text-lg">DESCRIPTION</h3>
                  <p>{character.description}</p>
                </div>
                
                <div>
                  <h3 className="font-display text-slab-rust text-lg">SPECIAL ABILITY</h3>
                  <p className="italic">{character.specialAbility}</p>
                </div>
                
                <div>
                  <h3 className="font-display text-slab-rust text-lg">BACKSTORY</h3>
                  <p>{character.backstory}</p>
                </div>
                
                <div>
                  <h3 className="font-display text-slab-rust text-lg">NOTABLE QUOTES</h3>
                  <ul className="space-y-2">
                    {character.quotes.map((quote, index) => (
                      <li key={index} className="italic pl-4 border-l-2 border-slab-copper">
                        "{quote}"
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className="btn-distressed mt-4" 
                  onClick={handleDonate}
                >
                  DONATE TO {character.name.toUpperCase()}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-slab-dark/80 backdrop-blur-sm text-slab-cream rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-display text-slab-copper mb-4">CREATE A CHARACTER</h2>
          <p className="mb-4">
            Have an idea for a Slab City character? Submit your character concept and it might 
            be included in a future expansion pack!
          </p>
          <Button className="bg-slab-copper hover:bg-slab-rust text-slab-cream" asChild>
            <a href="/submit">SUBMIT CHARACTER IDEA</a>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Characters;
