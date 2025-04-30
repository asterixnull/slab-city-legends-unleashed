
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Save, Trash2, Upload, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type CompanionType = {
  id: string;
  name: string;
  type: 'companion' | 'spirit-guide';
  description: string;
  abilities: string;
  backstory: string;
  image: string;
}

const CompanionEditor = () => {
  const { toast } = useToast();
  const [companions, setCompanions] = useState<CompanionType[]>([]);
  const [spiritGuides, setSpiritGuides] = useState<CompanionType[]>([]);
  const [currentCompanion, setCurrentCompanion] = useState<CompanionType | null>(null);
  const [isNewCompanion, setIsNewCompanion] = useState(false);
  const [activeTab, setActiveTab] = useState<'companion' | 'spirit-guide'>('companion');
  
  useEffect(() => {
    // Load data from localStorage
    const loadedCompanions = JSON.parse(localStorage.getItem('slabCompanions') || '[]');
    const loadedSpiritGuides = JSON.parse(localStorage.getItem('slabSpiritGuides') || '[]');
    
    setCompanions(loadedCompanions);
    setSpiritGuides(loadedSpiritGuides);
  }, []);
  
  const handleSelectCompanion = (companion: CompanionType) => {
    setCurrentCompanion(companion);
    setIsNewCompanion(false);
  };
  
  const handleAddNew = () => {
    const newCompanion: CompanionType = {
      id: Date.now().toString(),
      name: '',
      type: activeTab,
      description: '',
      abilities: '',
      backstory: '',
      image: ''
    };
    setCurrentCompanion(newCompanion);
    setIsNewCompanion(true);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (currentCompanion) {
      setCurrentCompanion({
        ...currentCompanion,
        [name]: value
      });
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (currentCompanion && event.target) {
          setCurrentCompanion({
            ...currentCompanion,
            image: event.target.result as string
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleSave = () => {
    if (!currentCompanion || !currentCompanion.name) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the name field.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentCompanion.type === 'companion') {
      let updatedCompanions;
      if (isNewCompanion) {
        updatedCompanions = [...companions, currentCompanion];
      } else {
        updatedCompanions = companions.map(c => 
          c.id === currentCompanion.id ? currentCompanion : c
        );
      }
      setCompanions(updatedCompanions);
      localStorage.setItem('slabCompanions', JSON.stringify(updatedCompanions));
    } else {
      let updatedSpiritGuides;
      if (isNewCompanion) {
        updatedSpiritGuides = [...spiritGuides, currentCompanion];
      } else {
        updatedSpiritGuides = spiritGuides.map(s => 
          s.id === currentCompanion.id ? currentCompanion : s
        );
      }
      setSpiritGuides(updatedSpiritGuides);
      localStorage.setItem('slabSpiritGuides', JSON.stringify(updatedSpiritGuides));
    }
    
    toast({
      title: `${isNewCompanion ? 'Created' : 'Updated'} Successfully`,
      description: `${currentCompanion.name} has been ${isNewCompanion ? 'created' : 'updated'}.`,
    });
    
    setIsNewCompanion(false);
  };
  
  const handleDelete = () => {
    if (!currentCompanion) return;
    
    if (currentCompanion.type === 'companion') {
      const updatedCompanions = companions.filter(c => c.id !== currentCompanion.id);
      setCompanions(updatedCompanions);
      localStorage.setItem('slabCompanions', JSON.stringify(updatedCompanions));
    } else {
      const updatedSpiritGuides = spiritGuides.filter(s => s.id !== currentCompanion.id);
      setSpiritGuides(updatedSpiritGuides);
      localStorage.setItem('slabSpiritGuides', JSON.stringify(updatedSpiritGuides));
    }
    
    toast({
      title: "Deleted Successfully",
      description: `${currentCompanion.name} has been removed.`,
    });
    
    setCurrentCompanion(null);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-display text-slab-dark">COMPANIONS & GUIDES</h3>
          <Button 
            onClick={handleAddNew} 
            variant="outline" 
            size="sm"
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" /> New
          </Button>
        </div>
        
        <Tabs 
          defaultValue="companion" 
          onValueChange={(value) => setActiveTab(value as 'companion' | 'spirit-guide')}
        >
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="companion">
              Companions
            </TabsTrigger>
            <TabsTrigger value="spirit-guide">
              Spirit Guides
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="companion" className="mt-0">
            <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
              {companions.length > 0 ? (
                companions.map(companion => (
                  <Button 
                    key={companion.id}
                    variant="ghost"
                    className={`w-full justify-start text-left ${currentCompanion?.id === companion.id ? 'bg-slab-rust/20' : ''}`}
                    onClick={() => handleSelectCompanion(companion)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {companion.name}
                  </Button>
                ))
              ) : (
                <p className="text-center py-4 italic text-gray-500">No companions yet</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="spirit-guide" className="mt-0">
            <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
              {spiritGuides.length > 0 ? (
                spiritGuides.map(guide => (
                  <Button 
                    key={guide.id}
                    variant="ghost"
                    className={`w-full justify-start text-left ${currentCompanion?.id === guide.id ? 'bg-slab-rust/20' : ''}`}
                    onClick={() => handleSelectCompanion(guide)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {guide.name}
                  </Button>
                ))
              ) : (
                <p className="text-center py-4 italic text-gray-500">No spirit guides yet</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="md:col-span-2 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed">
        {currentCompanion ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-display text-slab-dark">
                {isNewCompanion ? 'CREATE NEW' : 'EDIT'} {currentCompanion.type === 'companion' ? 'COMPANION' : 'SPIRIT GUIDE'}
              </h3>
              <div className="space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isNewCompanion}
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={currentCompanion.name}
                  onChange={handleInputChange}
                  className="bg-white/70"
                />
              </div>
              
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  name="type"
                  value={currentCompanion.type}
                  onChange={(e) => handleInputChange({
                    ...e,
                    target: {
                      ...e.target,
                      name: 'type',
                      value: e.target.value as 'companion' | 'spirit-guide'
                    }
                  })}
                  className="w-full rounded-md border border-input bg-white/70 px-3 py-2"
                >
                  <option value="companion">Companion</option>
                  <option value="spirit-guide">Spirit Guide</option>
                </select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={currentCompanion.description}
                onChange={handleInputChange}
                className="bg-white/70 min-h-[100px]"
              />
            </div>
            
            <div>
              <Label htmlFor="abilities">Abilities/Powers</Label>
              <Textarea
                id="abilities"
                name="abilities"
                value={currentCompanion.abilities}
                onChange={handleInputChange}
                className="bg-white/70 min-h-[100px]"
              />
            </div>
            
            <div>
              <Label htmlFor="backstory">Backstory</Label>
              <Textarea
                id="backstory"
                name="backstory"
                value={currentCompanion.backstory}
                onChange={handleInputChange}
                className="bg-white/70 min-h-[100px]"
              />
            </div>
            
            <div>
              <Label htmlFor="imageUpload">
                Image {currentCompanion.image ? '(Current image shown below)' : ''}
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
              
              {currentCompanion.image && (
                <div className="mt-4 border rounded-lg overflow-hidden max-w-xs">
                  <img
                    src={currentCompanion.image}
                    alt={currentCompanion.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <Users className="h-12 w-12 text-slab-dark/30 mb-4" />
            <h3 className="text-xl font-display text-slab-dark/70 mb-2">No Companion Selected</h3>
            <p className="text-slab-dark/50 text-center max-w-md">
              Select a companion or spirit guide from the list, or create a new one to get started.
            </p>
            <Button
              onClick={handleAddNew}
              className="mt-6 bg-slab-rust hover:bg-slab-dark text-white"
            >
              <Plus className="h-4 w-4 mr-1" /> Create New
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanionEditor;
