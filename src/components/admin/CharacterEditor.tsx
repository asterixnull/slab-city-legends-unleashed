
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Save, Trash, Upload, Edit } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Define the character type
interface Character {
  id: number;
  name: string;
  image: string;
  role: string;
  description: string;
  specialAbility: string;
  backstory: string;
  quotes: string[];
}

const CharacterEditor = () => {
  const { toast } = useToast();
  
  // Sample initial characters - in a real app these would come from a database
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: 1,
      name: 'Builder Bill',
      image: '/builder-bob.jpg', // Reusing existing image
      role: 'Master Constructor',
      description: 'A skilled builder who helps newcomers construct their camps using salvaged materials and desert ingenuity.',
      specialAbility: 'Can build structures using 50% fewer resource cards',
      backstory: "Bill found a new purpose in Slab City, teaching others how to build sustainable desert homes from society's leftovers.",
      quotes: [
        "Got trash? I'll make it a treasure.",
        "In the desert, your shadow is the only building inspector you'll ever meet."
      ]
    },
    {
      id: 2,
      name: 'Solar Mike',
      image: '/generator-gina.jpg', // Reusing existing image
      role: 'Power Provider',
      description: 'An expert in solar power systems who helps Slabbers harness the abundant desert sun.',
      specialAbility: "Can provide solar power to any player's camp, giving them an extra action each turn",
      backstory: "Mike brought his electrical skills to Slab City, where he helps maintain the off-grid power systems that keep the community running.",
      quotes: [
        "The desert sun gives us more power than we know what to do with.",
        "In Slab City, we don't pay electric bills - we just maintain our panels."
      ]
    },
    {
      id: 3,
      name: 'Mojo',
      image: '/nomad-nick.jpg', // Reusing existing image
      role: 'Desert Guide',
      description: 'A longtime Slab City resident who knows every hidden corner of the desert community.',
      specialAbility: 'Can travel to any location without spending action points once per game round',
      backstory: "Mojo has been living in Slab City for decades, accumulating knowledge and stories that make him an invaluable guide to newcomers.",
      quotes: [
        "The desert will tell you its secrets if you listen long enough.",
        "Every rock and cactus here has a story. I know most of them."
      ]
    }
  ]);
  
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [newQuote, setNewQuote] = useState('');
  
  const handleEditCharacter = (character: Character) => {
    setEditingCharacter({...character});
  };
  
  const handleUpdateField = (field: keyof Character, value: string) => {
    if (editingCharacter) {
      setEditingCharacter({...editingCharacter, [field]: value});
    }
  };
  
  const handleAddQuote = () => {
    if (editingCharacter && newQuote.trim()) {
      setEditingCharacter({
        ...editingCharacter,
        quotes: [...editingCharacter.quotes, newQuote.trim()]
      });
      setNewQuote('');
    }
  };
  
  const handleRemoveQuote = (index: number) => {
    if (editingCharacter) {
      const newQuotes = [...editingCharacter.quotes];
      newQuotes.splice(index, 1);
      setEditingCharacter({...editingCharacter, quotes: newQuotes});
    }
  };
  
  const handleSaveCharacter = () => {
    if (editingCharacter) {
      setCharacters(characters.map(char => 
        char.id === editingCharacter.id ? editingCharacter : char
      ));
      setEditingCharacter(null);
      toast({
        title: "Character Updated",
        description: `${editingCharacter.name} has been updated successfully.`,
      });
    }
  };
  
  const handleAddNewCharacter = () => {
    const newId = Math.max(0, ...characters.map(c => c.id)) + 1;
    const newCharacter: Character = {
      id: newId,
      name: 'New Character',
      image: '/placeholder.svg',
      role: 'Role Title',
      description: 'Character description',
      specialAbility: 'Special ability description',
      backstory: 'Character backstory',
      quotes: ['A notable quote']
    };
    
    setEditingCharacter(newCharacter);
  };
  
  const handleSaveNewCharacter = () => {
    if (editingCharacter && !characters.find(c => c.id === editingCharacter.id)) {
      setCharacters([...characters, editingCharacter]);
      setEditingCharacter(null);
      toast({
        title: "Character Added",
        description: `${editingCharacter.name} has been added to the game.`,
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-display text-slab-dark">CHARACTER LIST</h3>
          <Button onClick={handleAddNewCharacter} className="btn-distressed">
            <Plus className="mr-2 h-4 w-4" /> ADD CHARACTER
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {characters.map(character => (
            <div 
              key={character.id}
              className="bg-white/90 rounded-md p-4 cursor-pointer hover:bg-slab-rust/10 transition-colors"
              onClick={() => handleEditCharacter(character)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-display text-slab-dark text-lg">{character.name}</h4>
                <Edit className="h-4 w-4 text-slab-rust" />
              </div>
              <p className="text-sm text-slab-dark/80">{character.role}</p>
            </div>
          ))}
        </div>
      </div>
      
      {editingCharacter && (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed">
          <h3 className="text-2xl font-display text-slab-dark mb-6">
            {characters.find(c => c.id === editingCharacter.id) 
              ? `EDIT ${editingCharacter.name.toUpperCase()}` 
              : 'CREATE NEW CHARACTER'}
          </h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="char-name" className="block font-display text-slab-dark mb-2">CHARACTER NAME</Label>
                <Input 
                  id="char-name" 
                  value={editingCharacter.name} 
                  onChange={(e) => handleUpdateField('name', e.target.value)} 
                  className="bg-white/70"
                />
              </div>
              <div>
                <Label htmlFor="char-role" className="block font-display text-slab-dark mb-2">ROLE</Label>
                <Input 
                  id="char-role" 
                  value={editingCharacter.role} 
                  onChange={(e) => handleUpdateField('role', e.target.value)} 
                  className="bg-white/70"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="char-desc" className="block font-display text-slab-dark mb-2">DESCRIPTION</Label>
              <Textarea 
                id="char-desc" 
                value={editingCharacter.description} 
                onChange={(e) => handleUpdateField('description', e.target.value)} 
                className="bg-white/70"
              />
            </div>
            
            <div>
              <Label htmlFor="char-ability" className="block font-display text-slab-dark mb-2">SPECIAL ABILITY</Label>
              <Textarea 
                id="char-ability" 
                value={editingCharacter.specialAbility} 
                onChange={(e) => handleUpdateField('specialAbility', e.target.value)} 
                className="bg-white/70"
              />
            </div>
            
            <div>
              <Label htmlFor="char-backstory" className="block font-display text-slab-dark mb-2">BACKSTORY</Label>
              <Textarea 
                id="char-backstory" 
                value={editingCharacter.backstory} 
                onChange={(e) => handleUpdateField('backstory', e.target.value)} 
                className="bg-white/70"
                rows={4}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="block font-display text-slab-dark">NOTABLE QUOTES</Label>
                <div className="flex gap-2">
                  <Input
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    className="bg-white/70 w-64"
                    placeholder="Add new quote..."
                  />
                  <Button type="button" onClick={handleAddQuote} size="sm" className="bg-slab-copper text-white">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 mt-2">
                {editingCharacter.quotes.map((quote, index) => (
                  <div key={index} className="flex justify-between items-center bg-white/50 p-2 rounded-md">
                    <p className="italic">"{quote}"</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-slab-dark/70 hover:text-slab-rust"
                      onClick={() => handleRemoveQuote(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label className="block font-display text-slab-dark mb-2">CHARACTER IMAGE</Label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                  <img 
                    src={editingCharacter.image} 
                    alt={editingCharacter.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button className="bg-slab-dark text-slab-cream">
                  <Upload className="mr-2 h-4 w-4" /> UPLOAD IMAGE
                </Button>
              </div>
              <p className="text-xs text-slab-dark/60 mt-1">
                Recommended size: 600x800px. Max file size: 2MB.
              </p>
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setEditingCharacter(null)}
              >
                CANCEL
              </Button>
              <Button 
                type="button" 
                className="btn-distressed"
                onClick={characters.find(c => c.id === editingCharacter.id) 
                  ? handleSaveCharacter 
                  : handleSaveNewCharacter}
              >
                <Save className="mr-2 h-4 w-4" />
                SAVE CHARACTER
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterEditor;
