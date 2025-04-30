
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Save, Trash2, Upload, FileImage } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type ExpansionType = {
  id: string;
  name: string;
  description: string;
  price: string;
  cardCount: string;
  releaseDate: string;
  image: string;
}

const ExpansionEditor = () => {
  const { toast } = useToast();
  const [expansions, setExpansions] = useState<ExpansionType[]>([]);
  const [currentExpansion, setCurrentExpansion] = useState<ExpansionType | null>(null);
  const [isNewExpansion, setIsNewExpansion] = useState(false);
  
  useEffect(() => {
    // Load expansions from localStorage
    const loadedExpansions = JSON.parse(localStorage.getItem('slabExpansions') || '[]');
    setExpansions(loadedExpansions);
  }, []);
  
  const handleSelectExpansion = (expansion: ExpansionType) => {
    setCurrentExpansion(expansion);
    setIsNewExpansion(false);
  };
  
  const handleAddNew = () => {
    const newExpansion: ExpansionType = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: '',
      cardCount: '',
      releaseDate: '',
      image: ''
    };
    setCurrentExpansion(newExpansion);
    setIsNewExpansion(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (currentExpansion) {
      setCurrentExpansion({
        ...currentExpansion,
        [name]: value
      });
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (currentExpansion && event.target) {
          setCurrentExpansion({
            ...currentExpansion,
            image: event.target.result as string
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleSave = () => {
    if (!currentExpansion || !currentExpansion.name) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the name field.",
        variant: "destructive"
      });
      return;
    }
    
    let updatedExpansions;
    if (isNewExpansion) {
      updatedExpansions = [...expansions, currentExpansion];
    } else {
      updatedExpansions = expansions.map(e => 
        e.id === currentExpansion.id ? currentExpansion : e
      );
    }
    
    setExpansions(updatedExpansions);
    localStorage.setItem('slabExpansions', JSON.stringify(updatedExpansions));
    
    toast({
      title: `${isNewExpansion ? 'Created' : 'Updated'} Successfully`,
      description: `${currentExpansion.name} expansion has been ${isNewExpansion ? 'created' : 'updated'}.`,
    });
    
    setIsNewExpansion(false);
  };
  
  const handleDelete = () => {
    if (!currentExpansion) return;
    
    const updatedExpansions = expansions.filter(e => e.id !== currentExpansion.id);
    setExpansions(updatedExpansions);
    localStorage.setItem('slabExpansions', JSON.stringify(updatedExpansions));
    
    toast({
      title: "Deleted Successfully",
      description: `${currentExpansion.name} expansion has been removed.`,
    });
    
    setCurrentExpansion(null);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-display text-slab-dark">EXPANSION PACKS</h3>
          <Button 
            onClick={handleAddNew} 
            variant="outline" 
            size="sm"
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" /> New
          </Button>
        </div>
        
        <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
          {expansions.length > 0 ? (
            expansions.map(expansion => (
              <Button 
                key={expansion.id}
                variant="ghost"
                className={`w-full justify-start text-left ${currentExpansion?.id === expansion.id ? 'bg-slab-rust/20' : ''}`}
                onClick={() => handleSelectExpansion(expansion)}
              >
                <FileImage className="h-4 w-4 mr-2" />
                {expansion.name}
              </Button>
            ))
          ) : (
            <p className="text-center py-4 italic text-gray-500">No expansion packs yet</p>
          )}
        </div>
      </div>
      
      <div className="md:col-span-2 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed">
        {currentExpansion ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-display text-slab-dark">
                {isNewExpansion ? 'CREATE NEW' : 'EDIT'} EXPANSION PACK
              </h3>
              <div className="space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isNewExpansion}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
                <Button
                  onClick={handleSave}
                  size="sm"
                  className="bg-slab-rust hover:bg-slab-dark text-white"
                >
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="name">Expansion Name</Label>
              <Input
                id="name"
                name="name"
                value={currentExpansion.name}
                onChange={handleInputChange}
                className="bg-white/70"
                placeholder="e.g. Desert Nomad Pack"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={currentExpansion.description}
                onChange={handleInputChange}
                className="bg-white/70 min-h-[100px]"
                placeholder="Describe what's included in this expansion pack..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  value={currentExpansion.price}
                  onChange={handleInputChange}
                  className="bg-white/70"
                  placeholder="e.g. $19.99"
                />
              </div>
              <div>
                <Label htmlFor="cardCount">Card Count</Label>
                <Input
                  id="cardCount"
                  name="cardCount"
                  value={currentExpansion.cardCount}
                  onChange={handleInputChange}
                  className="bg-white/70"
                  placeholder="e.g. 30 cards"
                />
              </div>
              <div>
                <Label htmlFor="releaseDate">Release Date</Label>
                <Input
                  id="releaseDate"
                  name="releaseDate"
                  value={currentExpansion.releaseDate}
                  onChange={handleInputChange}
                  className="bg-white/70"
                  placeholder="e.g. June 2025"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="imageUpload">
                Expansion Image {currentExpansion.image ? '(Current image shown below)' : ''}
              </Label>
              <div className="flex items-center mt-1">
                <Label
                  htmlFor="imageUpload"
                  className="cursor-pointer flex items-center px-4 py-2 bg-slab-dark text-white rounded-md hover:bg-slab-rust transition-colors"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Label>
                <Input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              
              {currentExpansion.image && (
                <div className="mt-4 border rounded-lg overflow-hidden">
                  <img
                    src={currentExpansion.image}
                    alt={currentExpansion.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <FileImage className="h-12 w-12 text-slab-dark/30 mb-4" />
            <h3 className="text-xl font-display text-slab-dark/70 mb-2">No Expansion Pack Selected</h3>
            <p className="text-slab-dark/50 text-center max-w-md">
              Select an expansion pack from the list, or create a new one to get started.
            </p>
            <Button
              onClick={handleAddNew}
              className="mt-6 bg-slab-rust hover:bg-slab-dark text-white"
            >
              <Plus className="h-4 w-4 mr-1" /> Create New Expansion
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpansionEditor;
