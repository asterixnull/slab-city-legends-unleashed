
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Save, Upload, Edit } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Define the location type
interface Location {
  id: number;
  name: string;
  image: string;
  description: string;
  gameEffect: string;
  realWorldInfo: string;
}

const LocationEditor = () => {
  const { toast } = useToast();
  
  // Sample initial locations
  const [locations, setLocations] = useState<Location[]>([
    {
      id: 1,
      name: 'Salvation Mountain',
      image: '/salvation-mountain.jpg',
      description: 'A colorful art installation created as a testament to love and faith.',
      gameEffect: 'Players who visit gain 2 Spirit points and draw an Inspiration card.',
      realWorldInfo: 'Created by Leonard Knight, Salvation Mountain is a visually stunning folk art installation made from adobe, straw, and thousands of gallons of paint.'
    },
    {
      id: 2,
      name: 'East Jesus',
      image: '/east-jesus.jpg',
      description: 'An experimental, sustainable art installation and community.',
      gameEffect: 'Players can trade any 3 Resource cards for 1 Art Installation card worth 5 points.',
      realWorldInfo: 'East Jesus is an outdoor museum containing experimental art, primarily sculptures made from recycled materials and found objects.'
    },
    {
      id: 3,
      name: 'The Range',
      image: '/the-range.jpg',
      description: "Slab City's open-air music venue and community gathering space.",
      gameEffect: 'Players can perform for 1 Community Spirit card or attend events for various bonuses.',
      realWorldInfo: 'The Range is a stage built from salvaged materials where residents gather for Saturday night talent shows and community events.'
    }
  ]);
  
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  
  const handleEditLocation = (location: Location) => {
    setEditingLocation({...location});
  };
  
  const handleUpdateField = (field: keyof Location, value: string) => {
    if (editingLocation) {
      setEditingLocation({...editingLocation, [field]: value});
    }
  };
  
  const handleSaveLocation = () => {
    if (editingLocation) {
      setLocations(locations.map(loc => 
        loc.id === editingLocation.id ? editingLocation : loc
      ));
      setEditingLocation(null);
      toast({
        title: "Location Updated",
        description: `${editingLocation.name} has been updated successfully.`,
      });
    }
  };
  
  const handleAddNewLocation = () => {
    const newId = Math.max(0, ...locations.map(l => l.id)) + 1;
    const newLocation: Location = {
      id: newId,
      name: 'New Location',
      image: '/placeholder.svg',
      description: 'Location description',
      gameEffect: 'Game effect description',
      realWorldInfo: 'Real-world information about this location'
    };
    
    setEditingLocation(newLocation);
  };
  
  const handleSaveNewLocation = () => {
    if (editingLocation && !locations.find(l => l.id === editingLocation.id)) {
      setLocations([...locations, editingLocation]);
      setEditingLocation(null);
      toast({
        title: "Location Added",
        description: `${editingLocation.name} has been added to the game.`,
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-display text-slab-dark">LOCATIONS LIST</h3>
          <Button onClick={handleAddNewLocation} className="btn-distressed">
            <Plus className="mr-2 h-4 w-4" /> ADD LOCATION
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {locations.map(location => (
            <div 
              key={location.id}
              className="bg-white/90 rounded-md p-4 cursor-pointer hover:bg-slab-rust/10 transition-colors"
              onClick={() => handleEditLocation(location)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-display text-slab-dark text-lg">{location.name}</h4>
                <Edit className="h-4 w-4 text-slab-rust" />
              </div>
              <p className="text-sm text-slab-dark/80 line-clamp-2">{location.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {editingLocation && (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed">
          <h3 className="text-2xl font-display text-slab-dark mb-6">
            {locations.find(l => l.id === editingLocation.id) 
              ? `EDIT ${editingLocation.name.toUpperCase()}` 
              : 'CREATE NEW LOCATION'}
          </h3>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="loc-name" className="block font-display text-slab-dark mb-2">LOCATION NAME</Label>
              <Input 
                id="loc-name" 
                value={editingLocation.name} 
                onChange={(e) => handleUpdateField('name', e.target.value)} 
                className="bg-white/70"
              />
            </div>
            
            <div>
              <Label htmlFor="loc-desc" className="block font-display text-slab-dark mb-2">DESCRIPTION</Label>
              <Textarea 
                id="loc-desc" 
                value={editingLocation.description} 
                onChange={(e) => handleUpdateField('description', e.target.value)} 
                className="bg-white/70"
              />
            </div>
            
            <div>
              <Label htmlFor="loc-effect" className="block font-display text-slab-dark mb-2">GAME EFFECT</Label>
              <Textarea 
                id="loc-effect" 
                value={editingLocation.gameEffect} 
                onChange={(e) => handleUpdateField('gameEffect', e.target.value)} 
                className="bg-white/70"
              />
            </div>
            
            <div>
              <Label htmlFor="loc-info" className="block font-display text-slab-dark mb-2">REAL WORLD INFORMATION</Label>
              <Textarea 
                id="loc-info" 
                value={editingLocation.realWorldInfo} 
                onChange={(e) => handleUpdateField('realWorldInfo', e.target.value)} 
                className="bg-white/70"
                rows={4}
              />
            </div>
            
            <div>
              <Label className="block font-display text-slab-dark mb-2">LOCATION IMAGE</Label>
              <div className="flex items-center gap-4">
                <div className="w-36 h-24 bg-gray-200 rounded-md overflow-hidden">
                  <img 
                    src={editingLocation.image} 
                    alt={editingLocation.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button className="bg-slab-dark text-slab-cream">
                  <Upload className="mr-2 h-4 w-4" /> UPLOAD IMAGE
                </Button>
              </div>
              <p className="text-xs text-slab-dark/60 mt-1">
                Recommended size: 1200x800px. Max file size: 2MB.
              </p>
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setEditingLocation(null)}
              >
                CANCEL
              </Button>
              <Button 
                type="button" 
                className="btn-distressed"
                onClick={locations.find(l => l.id === editingLocation.id) 
                  ? handleSaveLocation 
                  : handleSaveNewLocation}
              >
                <Save className="mr-2 h-4 w-4" />
                SAVE LOCATION
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationEditor;
