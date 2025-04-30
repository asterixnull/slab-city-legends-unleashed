
import { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileImage, Download, Check } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Submit = () => {
  const { toast } = useToast();
  
  const [storyForm, setStoryForm] = useState({
    title: '',
    author: '',
    email: '',
    story: '',
  });
  
  const [cardForm, setCardForm] = useState({
    cardName: '',
    cardType: 'character',
    description: '',
    abilities: '',
    creator: '',
    email: '',
  });
  
  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Story Submitted!",
      description: "Thanks for sharing your Slab City experience.",
    });
    setStoryForm({ title: '', author: '', email: '', story: '' });
  };
  
  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Card Submitted!",
      description: "Thanks for your creative contribution to Slab City.",
    });
    setCardForm({ cardName: '', cardType: 'character', description: '', abilities: '', creator: '', email: '' });
  };
  
  const handleStoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoryForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCardForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display text-slab-rust mb-6">SUBMISSIONS</h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed mb-8">
          <h2 className="text-2xl font-display text-slab-dark mb-4">SHARE YOUR CREATIVITY</h2>
          <p>
            Slab City Legends is a community-driven game that thrives on player 
            contributions. Share your stories from the desert or submit your ideas for new 
            cards to help build the Slab City universe!
          </p>
        </div>
        
        <Tabs defaultValue="stories" className="mb-12">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="stories" className="text-lg">
              <FileText className="mr-2 h-5 w-5" />
              Slab Stories
            </TabsTrigger>
            <TabsTrigger value="cards" className="text-lg">
              <FileImage className="mr-2 h-5 w-5" />
              Card Designs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="stories" className="mt-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed">
              <h3 className="text-2xl font-display text-slab-dark mb-4">SHARE YOUR SLAB CITY STORY</h3>
              <p className="mb-6">
                Have you visited Slab City? Or do you have a fictional tale of desert adventure 
                inspired by the Slabber universe? Share your story below!
              </p>
              
              <form onSubmit={handleStorySubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block font-display text-slab-dark mb-1">STORY TITLE</label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={storyForm.title} 
                      onChange={handleStoryChange} 
                      required 
                      className="bg-white/70"
                    />
                  </div>
                  <div>
                    <label htmlFor="author" className="block font-display text-slab-dark mb-1">YOUR NAME/NICKNAME</label>
                    <Input 
                      id="author" 
                      name="author" 
                      value={storyForm.author} 
                      onChange={handleStoryChange} 
                      required 
                      className="bg-white/70"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block font-display text-slab-dark mb-1">EMAIL (FOR NOTIFICATIONS)</label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={storyForm.email} 
                    onChange={handleStoryChange} 
                    required 
                    className="bg-white/70"
                  />
                </div>
                
                <div>
                  <label htmlFor="story" className="block font-display text-slab-dark mb-1">YOUR STORY</label>
                  <Textarea 
                    id="story" 
                    name="story" 
                    value={storyForm.story} 
                    onChange={handleStoryChange} 
                    required 
                    className="bg-white/70 min-h-[200px]"
                    placeholder="Start typing your Slab City tale here..."
                  />
                </div>
                
                <div className="pt-2">
                  <Button type="submit" className="btn-distressed">
                    SUBMIT STORY
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="mt-8 bg-slab-dark/80 backdrop-blur-sm text-slab-cream rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-display text-slab-copper mb-4">STORY SUBMISSION GUIDELINES</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="text-slab-copper mr-2 h-5 w-5 shrink-0 mt-0.5" />
                  <span>All stories should be somehow related to Slab City or the game universe</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-slab-copper mr-2 h-5 w-5 shrink-0 mt-0.5" />
                  <span>Stories can be personal experiences, fictional tales, or game session recaps</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-slab-copper mr-2 h-5 w-5 shrink-0 mt-0.5" />
                  <span>Keep content appropriate for all ages</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-slab-copper mr-2 h-5 w-5 shrink-0 mt-0.5" />
                  <span>Selected stories will be featured on the website and may inspire future cards</span>
                </li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="cards" className="mt-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed">
              <h3 className="text-2xl font-display text-slab-dark mb-4">DESIGN A CARD</h3>
              <p className="mb-6">
                Got an idea for a new character, companion, spirit guide, location, or item card? Submit your concept below 
                and it might be featured in a future expansion deck!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <a href="#" className="bg-slab-dark hover:bg-slab-rust transition-colors p-4 rounded-lg text-center text-slab-cream">
                  <Download className="h-8 w-8 mx-auto mb-2" />
                  <span className="block font-display">CHARACTER TEMPLATE</span>
                </a>
                <a href="#" className="bg-slab-dark hover:bg-slab-rust transition-colors p-4 rounded-lg text-center text-slab-cream">
                  <Download className="h-8 w-8 mx-auto mb-2" />
                  <span className="block font-display">LOCATION TEMPLATE</span>
                </a>
                <a href="#" className="bg-slab-dark hover:bg-slab-rust transition-colors p-4 rounded-lg text-center text-slab-cream">
                  <Download className="h-8 w-8 mx-auto mb-2" />
                  <span className="block font-display">EVENT TEMPLATE</span>
                </a>
              </div>
              
              <form onSubmit={handleCardSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardName" className="block font-display text-slab-dark mb-1">CARD NAME</label>
                    <Input 
                      id="cardName" 
                      name="cardName" 
                      value={cardForm.cardName} 
                      onChange={handleCardChange} 
                      required 
                      className="bg-white/70"
                    />
                  </div>
                  <div>
                    <label htmlFor="cardType" className="block font-display text-slab-dark mb-1">CARD TYPE</label>
                    <select 
                      id="cardType" 
                      name="cardType" 
                      value={cardForm.cardType} 
                      onChange={handleCardChange} 
                      required 
                      className="w-full rounded-md border border-input bg-white/70 px-3 py-2"
                    >
                      <option value="character">Character</option>
                      <option value="companion">Companion</option>
                      <option value="spirit-guide">Spirit Guide</option>
                      <option value="location">Location</option>
                      <option value="item">Item</option>
                      <option value="mission">Mission</option>
                      <option value="event">Event</option>
                      <option value="resource">Resource</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block font-display text-slab-dark mb-1">DESCRIPTION</label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={cardForm.description} 
                    onChange={handleCardChange} 
                    required 
                    className="bg-white/70 min-h-[100px]"
                    placeholder="Describe the character, location, or event..."
                  />
                </div>
                
                <div>
                  <label htmlFor="abilities" className="block font-display text-slab-dark mb-1">ABILITIES/EFFECTS</label>
                  <Textarea 
                    id="abilities" 
                    name="abilities" 
                    value={cardForm.abilities} 
                    onChange={handleCardChange} 
                    required 
                    className="bg-white/70 min-h-[100px]"
                    placeholder="What does this card do in the game?"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="creator" className="block font-display text-slab-dark mb-1">YOUR NAME/NICKNAME</label>
                    <Input 
                      id="creator" 
                      name="creator" 
                      value={cardForm.creator} 
                      onChange={handleCardChange} 
                      required 
                      className="bg-white/70"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-display text-slab-dark mb-1">EMAIL</label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={cardForm.email} 
                      onChange={handleCardChange} 
                      required 
                      className="bg-white/70"
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button type="submit" className="btn-distressed">
                    SUBMIT CARD IDEA
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="mt-8 bg-slab-dark/80 backdrop-blur-sm text-slab-cream rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-display text-slab-copper mb-4">CARD DESIGN GUIDELINES</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="text-slab-copper mr-2 h-5 w-5 shrink-0 mt-0.5" />
                  <span>Card concepts should fit the Slab City theme and aesthetic</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-slab-copper mr-2 h-5 w-5 shrink-0 mt-0.5" />
                  <span>Consider game balance when proposing card abilities</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-slab-copper mr-2 h-5 w-5 shrink-0 mt-0.5" />
                  <span>You can include artwork or use the templates provided</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-slab-copper mr-2 h-5 w-5 shrink-0 mt-0.5" />
                  <span>Selected designs will earn Gratitude Gangster points and creator credit</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-slab-copper mr-2 h-5 w-5 shrink-0 mt-0.5" />
                  <span>Real characters, locations, and story elements are especially welcome!</span>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Submit;
