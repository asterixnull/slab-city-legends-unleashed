
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, X, FileText, FileImage, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type SubmissionType = {
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  [key: string]: any;
};

const SubmissionsManager = () => {
  const { toast } = useToast();
  const [storySubmissions, setStorySubmissions] = useState<SubmissionType[]>([]);
  const [cardSubmissions, setCardSubmissions] = useState<SubmissionType[]>([]);
  const [companionSubmissions, setCompanionSubmissions] = useState<SubmissionType[]>([]);
  
  useEffect(() => {
    // Load submissions from localStorage
    const loadedStorySubmissions = JSON.parse(localStorage.getItem('slabStorySubmissions') || '[]');
    const loadedCardSubmissions = JSON.parse(localStorage.getItem('slabCardSubmissions') || '[]');
    const loadedCompanionSubmissions = JSON.parse(localStorage.getItem('slabCompanionSubmissions') || '[]');
    
    setStorySubmissions(loadedStorySubmissions);
    setCardSubmissions(loadedCardSubmissions);
    setCompanionSubmissions(loadedCompanionSubmissions);
  }, []);
  
  const updateSubmissionStatus = (
    type: 'story' | 'card' | 'companion',
    index: number,
    status: 'approved' | 'rejected'
  ) => {
    if (type === 'story') {
      const updatedSubmissions = [...storySubmissions];
      updatedSubmissions[index].status = status;
      setStorySubmissions(updatedSubmissions);
      localStorage.setItem('slabStorySubmissions', JSON.stringify(updatedSubmissions));
      
      if (status === 'approved') {
        // Add to published stories
        const publishedStories = JSON.parse(localStorage.getItem('slabPublishedStories') || '[]');
        publishedStories.push(storySubmissions[index]);
        localStorage.setItem('slabPublishedStories', JSON.stringify(publishedStories));
      }
    } else if (type === 'card') {
      const updatedSubmissions = [...cardSubmissions];
      updatedSubmissions[index].status = status;
      setCardSubmissions(updatedSubmissions);
      localStorage.setItem('slabCardSubmissions', JSON.stringify(updatedSubmissions));
      
      if (status === 'approved') {
        // Add to published cards based on type
        const cardType = cardSubmissions[index].cardType;
        const storageKey = `slab${cardType.charAt(0).toUpperCase() + cardType.slice(1)}s`;
        const publishedItems = JSON.parse(localStorage.getItem(storageKey) || '[]');
        publishedItems.push({
          ...cardSubmissions[index],
          id: Date.now().toString(),
          image: ''
        });
        localStorage.setItem(storageKey, JSON.stringify(publishedItems));
      }
    } else if (type === 'companion') {
      const updatedSubmissions = [...companionSubmissions];
      updatedSubmissions[index].status = status;
      setCompanionSubmissions(updatedSubmissions);
      localStorage.setItem('slabCompanionSubmissions', JSON.stringify(updatedSubmissions));
      
      if (status === 'approved') {
        // Add to published companions
        const companionType = companionSubmissions[index].type;
        const storageKey = companionType === 'companion' ? 'slabCompanions' : 'slabSpiritGuides';
        const publishedItems = JSON.parse(localStorage.getItem(storageKey) || '[]');
        publishedItems.push({
          ...companionSubmissions[index],
          id: Date.now().toString(),
          image: ''
        });
        localStorage.setItem(storageKey, JSON.stringify(publishedItems));
      }
    }
    
    toast({
      title: `Submission ${status === 'approved' ? 'Approved' : 'Rejected'}`,
      description: `The submission has been ${status === 'approved' ? 'approved and published' : 'rejected'}.`,
    });
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed">
        <h3 className="text-2xl font-display text-slab-dark mb-4">MANAGE USER SUBMISSIONS</h3>
        <p className="mb-6">
          Review and approve or reject submissions from players. Approved submissions will be added to the 
          appropriate section of the game.
        </p>
        
        <Tabs defaultValue="stories">
          <TabsList className="mb-4">
            <TabsTrigger value="stories" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Stories ({storySubmissions.filter(s => s.status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger value="cards" className="flex items-center">
              <FileImage className="mr-2 h-4 w-4" />
              Cards ({cardSubmissions.filter(c => c.status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger value="companions" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Companions ({companionSubmissions.filter(c => c.status === 'pending').length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="stories">
            {storySubmissions.filter(s => s.status === 'pending').length > 0 ? (
              <div className="space-y-6">
                {storySubmissions
                  .filter(submission => submission.status === 'pending')
                  .map((submission, index) => (
                    <div key={index} className="bg-white/60 p-4 rounded-lg border border-slab-dark/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold">{submission.title}</h4>
                          <p className="text-sm text-gray-600">By {submission.author} • {formatDate(submission.date)}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-green-100 hover:bg-green-200 border-green-300"
                            onClick={() => updateSubmissionStatus('story', index, 'approved')}
                          >
                            <Check className="h-4 w-4 mr-1" /> Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-red-100 hover:bg-red-200 border-red-300"
                            onClick={() => updateSubmissionStatus('story', index, 'rejected')}
                          >
                            <X className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 bg-white/70 p-3 rounded-md max-h-60 overflow-y-auto">
                        <p className="whitespace-pre-wrap">{submission.story}</p>
                      </div>
                      <p className="mt-2 text-sm">Contact: {submission.email}</p>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-center py-8 italic text-gray-500">No pending story submissions</p>
            )}
          </TabsContent>
          
          <TabsContent value="cards">
            {cardSubmissions.filter(c => c.status === 'pending').length > 0 ? (
              <div className="space-y-6">
                {cardSubmissions
                  .filter(submission => submission.status === 'pending')
                  .map((submission, index) => (
                    <div key={index} className="bg-white/60 p-4 rounded-lg border border-slab-dark/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold">{submission.cardName}</h4>
                          <p className="text-sm text-gray-600">
                            Type: <span className="capitalize">{submission.cardType}</span> • 
                            By {submission.creator} • 
                            {formatDate(submission.date)}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-green-100 hover:bg-green-200 border-green-300"
                            onClick={() => updateSubmissionStatus('card', index, 'approved')}
                          >
                            <Check className="h-4 w-4 mr-1" /> Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-red-100 hover:bg-red-200 border-red-300"
                            onClick={() => updateSubmissionStatus('card', index, 'rejected')}
                          >
                            <X className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h5 className="font-bold mb-1">Description:</h5>
                          <div className="bg-white/70 p-3 rounded-md h-32 overflow-y-auto">
                            <p className="whitespace-pre-wrap">{submission.description}</p>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-bold mb-1">Abilities/Effects:</h5>
                          <div className="bg-white/70 p-3 rounded-md h-32 overflow-y-auto">
                            <p className="whitespace-pre-wrap">{submission.abilities}</p>
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">Contact: {submission.email}</p>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-center py-8 italic text-gray-500">No pending card submissions</p>
            )}
          </TabsContent>
          
          <TabsContent value="companions">
            {companionSubmissions.filter(c => c.status === 'pending').length > 0 ? (
              <div className="space-y-6">
                {companionSubmissions
                  .filter(submission => submission.status === 'pending')
                  .map((submission, index) => (
                    <div key={index} className="bg-white/60 p-4 rounded-lg border border-slab-dark/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold">{submission.name}</h4>
                          <p className="text-sm text-gray-600">
                            Type: <span className="capitalize">{submission.type === 'spirit-guide' ? 'Spirit Guide' : 'Companion'}</span> • 
                            By {submission.creator} • 
                            {formatDate(submission.date)}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-green-100 hover:bg-green-200 border-green-300"
                            onClick={() => updateSubmissionStatus('companion', index, 'approved')}
                          >
                            <Check className="h-4 w-4 mr-1" /> Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-red-100 hover:bg-red-200 border-red-300"
                            onClick={() => updateSubmissionStatus('companion', index, 'rejected')}
                          >
                            <X className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h5 className="font-bold mb-1">Description:</h5>
                          <div className="bg-white/70 p-3 rounded-md h-32 overflow-y-auto">
                            <p className="whitespace-pre-wrap">{submission.description}</p>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-bold mb-1">Abilities/Powers:</h5>
                          <div className="bg-white/70 p-3 rounded-md h-32 overflow-y-auto">
                            <p className="whitespace-pre-wrap">{submission.abilities}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h5 className="font-bold mb-1">Backstory:</h5>
                        <div className="bg-white/70 p-3 rounded-md max-h-40 overflow-y-auto">
                          <p className="whitespace-pre-wrap">{submission.backstory}</p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">Contact: {submission.email}</p>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-center py-8 italic text-gray-500">No pending companion submissions</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SubmissionsManager;
