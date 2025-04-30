
import { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Users,
  Map,
  FileText,
  Book,
  BookText,
  Save
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import CharacterEditor from '@/components/admin/CharacterEditor';
import LocationEditor from '@/components/admin/LocationEditor';
import MissionEditor from '@/components/admin/MissionEditor';

const Admin = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password protection - in a real app, use proper authentication
    if (password === import.meta.env.VITE_ADMIN_PASSWORD || password === "slab-admin") {
      setIsAuthorized(true);
      toast({
        title: "Welcome to Admin Panel",
        description: "You now have access to edit game content.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Please enter the correct admin password.",
        variant: "destructive"
      });
    }
    setPassword('');
  };
  
  if (!isAuthorized) {
    return (
      <PageContainer>
        <div className="max-w-md mx-auto mt-12">
          <h1 className="text-4xl font-display text-slab-rust mb-6">ADMIN ACCESS</h1>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed">
            <p className="mb-6">
              Please enter the admin password to access the content management system
              for Slab City Legends.
            </p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Admin Password</Label>
                <Input 
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/70"
                  required
                />
              </div>
              
              <Button type="submit" className="btn-distressed">
                ACCESS ADMIN PANEL
              </Button>
            </form>
          </div>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-display text-slab-rust mb-6">ADMIN PANEL</h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed mb-8">
          <h2 className="text-2xl font-display text-slab-dark mb-4">CONTENT MANAGEMENT</h2>
          <p>
            Welcome to the Slab City Legends admin panel. Here you can edit the real characters, 
            locations, missions, and other game elements to ensure the game accurately represents 
            the real Slab City community.
          </p>
        </div>
        
        <Tabs defaultValue="characters" className="mb-12">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="characters" className="text-lg">
              <Users className="mr-2 h-5 w-5" />
              Characters
            </TabsTrigger>
            <TabsTrigger value="locations" className="text-lg">
              <Map className="mr-2 h-5 w-5" />
              Locations
            </TabsTrigger>
            <TabsTrigger value="missions" className="text-lg">
              <BookText className="mr-2 h-5 w-5" />
              Missions
            </TabsTrigger>
            <TabsTrigger value="items" className="text-lg">
              <Book className="mr-2 h-5 w-5" />
              Items
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="characters" className="mt-0">
            <CharacterEditor />
          </TabsContent>
          
          <TabsContent value="locations" className="mt-0">
            <LocationEditor />
          </TabsContent>
          
          <TabsContent value="missions" className="mt-0">
            <MissionEditor />
          </TabsContent>
          
          <TabsContent value="items" className="mt-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed">
              <h3 className="text-2xl font-display text-slab-dark mb-4">MANAGE ITEMS</h3>
              <p className="text-slab-dark/70 italic mb-6">
                Item editor is coming soon. For now, please use the characters, locations, and missions editors.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-slab-dark/80 backdrop-blur-sm text-slab-cream rounded-lg p-6 shadow-lg mb-8">
          <h3 className="text-xl font-display text-slab-copper mb-4">ADMIN TIPS</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <FileText className="text-slab-copper mr-2 h-5 w-5 shrink-0 mt-0.5" />
              <span>All changes are saved locally. In a production environment, these would be saved to a database.</span>
            </li>
            <li className="flex items-start">
              <FileText className="text-slab-copper mr-2 h-5 w-5 shrink-0 mt-0.5" />
              <span>Upload images for characters and locations to make them more authentic.</span>
            </li>
            <li className="flex items-start">
              <FileText className="text-slab-copper mr-2 h-5 w-5 shrink-0 mt-0.5" />
              <span>Include real stories and quotes to create an immersive game experience.</span>
            </li>
          </ul>
        </div>
        
        <Button className="bg-slab-rust hover:bg-slab-dark text-slab-cream" onClick={() => setIsAuthorized(false)}>
          LOG OUT
        </Button>
      </div>
    </PageContainer>
  );
};

export default Admin;
