
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Save, Edit } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Define the mission type
interface Mission {
  id: number;
  title: string;
  description: string;
  requirements: string;
  reward: string;
  difficulty: string;
}

const MissionEditor = () => {
  const { toast } = useToast();
  
  // Sample initial missions
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      title: 'Solar Power Setup',
      description: 'Help Solar Mike install a new solar array for the community kitchen.',
      requirements: 'Collect 3 Tech Resource cards and visit the Kitchen location',
      reward: '10 Community Points and 1 Energy Generator card',
      difficulty: 'Medium'
    },
    {
      id: 2,
      title: 'Desert Art Installation',
      description: 'Create a collaborative art piece with residents at East Jesus.',
      requirements: 'Collect 2 Art Resource cards and 1 Salvage Resource card',
      reward: '5 Community Points and 1 Inspiration Card',
      difficulty: 'Easy'
    },
    {
      id: 3,
      title: 'Water Run',
      description: 'Transport precious water from town back to the Slabs.',
      requirements: 'Spend 5 Action Points and have a Vehicle card',
      reward: '3 Water Resource cards and 8 Community Points',
      difficulty: 'Hard'
    }
  ]);
  
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  
  const handleEditMission = (mission: Mission) => {
    setEditingMission({...mission});
  };
  
  const handleUpdateField = (field: keyof Mission, value: string) => {
    if (editingMission) {
      setEditingMission({...editingMission, [field]: value});
    }
  };
  
  const handleSaveMission = () => {
    if (editingMission) {
      setMissions(missions.map(mission => 
        mission.id === editingMission.id ? editingMission : mission
      ));
      setEditingMission(null);
      toast({
        title: "Mission Updated",
        description: `${editingMission.title} has been updated successfully.`,
      });
    }
  };
  
  const handleAddNewMission = () => {
    const newId = Math.max(0, ...missions.map(m => m.id)) + 1;
    const newMission: Mission = {
      id: newId,
      title: 'New Mission',
      description: 'Mission description',
      requirements: 'Requirements to complete this mission',
      reward: 'Reward for completing this mission',
      difficulty: 'Medium'
    };
    
    setEditingMission(newMission);
  };
  
  const handleSaveNewMission = () => {
    if (editingMission && !missions.find(m => m.id === editingMission.id)) {
      setMissions([...missions, editingMission]);
      setEditingMission(null);
      toast({
        title: "Mission Added",
        description: `${editingMission.title} has been added to the game.`,
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-display text-slab-dark">MISSIONS LIST</h3>
          <Button onClick={handleAddNewMission} className="btn-distressed">
            <Plus className="mr-2 h-4 w-4" /> ADD MISSION
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {missions.map(mission => (
            <div 
              key={mission.id}
              className="bg-white/90 rounded-md p-4 cursor-pointer hover:bg-slab-rust/10 transition-colors"
              onClick={() => handleEditMission(mission)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-display text-slab-dark text-lg">{mission.title}</h4>
                <span className={`text-xs px-2 py-1 rounded ${
                  mission.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                  mission.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {mission.difficulty}
                </span>
              </div>
              <p className="text-sm text-slab-dark/80 line-clamp-2">{mission.description}</p>
              <div className="flex justify-end mt-2">
                <Edit className="h-4 w-4 text-slab-rust" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {editingMission && (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed">
          <h3 className="text-2xl font-display text-slab-dark mb-6">
            {missions.find(m => m.id === editingMission.id) 
              ? `EDIT ${editingMission.title.toUpperCase()}` 
              : 'CREATE NEW MISSION'}
          </h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="mission-title" className="block font-display text-slab-dark mb-2">MISSION TITLE</Label>
                <Input 
                  id="mission-title" 
                  value={editingMission.title} 
                  onChange={(e) => handleUpdateField('title', e.target.value)} 
                  className="bg-white/70"
                />
              </div>
              <div>
                <Label htmlFor="mission-difficulty" className="block font-display text-slab-dark mb-2">DIFFICULTY</Label>
                <select 
                  id="mission-difficulty"
                  value={editingMission.difficulty}
                  onChange={(e) => handleUpdateField('difficulty', e.target.value)}
                  className="w-full rounded-md border border-input bg-white/70 px-3 py-2"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="mission-desc" className="block font-display text-slab-dark mb-2">DESCRIPTION</Label>
              <Textarea 
                id="mission-desc" 
                value={editingMission.description} 
                onChange={(e) => handleUpdateField('description', e.target.value)} 
                className="bg-white/70"
              />
            </div>
            
            <div>
              <Label htmlFor="mission-req" className="block font-display text-slab-dark mb-2">REQUIREMENTS</Label>
              <Textarea 
                id="mission-req" 
                value={editingMission.requirements} 
                onChange={(e) => handleUpdateField('requirements', e.target.value)} 
                className="bg-white/70"
              />
            </div>
            
            <div>
              <Label htmlFor="mission-reward" className="block font-display text-slab-dark mb-2">REWARD</Label>
              <Textarea 
                id="mission-reward" 
                value={editingMission.reward} 
                onChange={(e) => handleUpdateField('reward', e.target.value)} 
                className="bg-white/70"
              />
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setEditingMission(null)}
              >
                CANCEL
              </Button>
              <Button 
                type="button" 
                className="btn-distressed"
                onClick={missions.find(m => m.id === editingMission.id) 
                  ? handleSaveMission 
                  : handleSaveNewMission}
              >
                <Save className="mr-2 h-4 w-4" />
                SAVE MISSION
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionEditor;
