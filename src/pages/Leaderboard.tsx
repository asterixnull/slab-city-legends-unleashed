
import { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Star, Filter, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

const Leaderboard = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for the leaderboard
  const leaderboardData = [
    { id: 1, player: 'DesertDweller', points: 8742, rank: 1, level: 'Legend', badges: ['Collector', 'Philanthropist', 'Artist'] },
    { id: 2, player: 'NomadNinja', points: 7621, rank: 2, level: 'Veteran', badges: ['Explorer', 'Survivalist'] },
    { id: 3, player: 'SalvationSeeker', points: 6934, rank: 3, level: 'Veteran', badges: ['Artisan', 'Philanthropist'] },
    { id: 4, player: 'RustyRenegade', points: 5827, rank: 4, level: 'Regular', badges: ['Builder', 'Collector'] },
    { id: 5, player: 'DustDevil', points: 5341, rank: 5, level: 'Regular', badges: ['Explorer', 'Survivalist'] },
    { id: 6, player: 'SolarScavenger', points: 4982, rank: 6, level: 'Regular', badges: ['Builder', 'Resourceful'] },
    { id: 7, player: 'CactusQueen', points: 4756, rank: 7, level: 'Regular', badges: ['Artisan', 'Collector'] },
    { id: 8, player: 'WastelandWanderer', points: 4210, rank: 8, level: 'Regular', badges: ['Explorer', 'Survivalist'] },
    { id: 9, player: 'DuneRover', points: 3875, rank: 9, level: 'Newcomer', badges: ['Explorer'] },
    { id: 10, player: 'TumbleweedTim', points: 3564, rank: 10, level: 'Newcomer', badges: ['Collector'] },
    { id: 11, player: 'SandStorm', points: 3120, rank: 11, level: 'Newcomer', badges: ['Survivalist'] },
    { id: 12, player: 'GratefulGypsy', points: 2985, rank: 12, level: 'Newcomer', badges: ['Philanthropist'] },
  ];

  // Filter and search functionality
  const filteredLeaderboard = leaderboardData
    .filter(player => {
      if (filter === 'all') return true;
      return player.level.toLowerCase() === filter.toLowerCase();
    })
    .filter(player => {
      if (searchTerm === '') return true;
      return player.player.toLowerCase().includes(searchTerm.toLowerCase());
    });

  // Get badge color based on badge name
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Collector': return 'bg-blue-600';
      case 'Philanthropist': return 'bg-purple-600';
      case 'Artist': return 'bg-pink-600';
      case 'Explorer': return 'bg-green-600';
      case 'Survivalist': return 'bg-yellow-600';
      case 'Builder': return 'bg-orange-600';
      case 'Artisan': return 'bg-red-600';
      case 'Resourceful': return 'bg-teal-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display text-slab-rust mb-6">GRATITUDE GANGSTERS LEADERBOARD</h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg card-distressed mb-8">
          <h2 className="text-2xl font-display text-slab-dark mb-4">TOP CONTRIBUTORS</h2>
          <p>
            The Gratitude Gangsters are players who contribute to the Slab City community through 
            donations to characters, causes, or by purchasing starter packs. Climb the ranks and 
            earn special badges and rewards for your generosity!
          </p>
        </div>
        
        {/* Top 3 Players Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {leaderboardData.slice(0, 3).map((player, index) => (
            <div key={player.id} className={`
              relative text-center p-6 pb-8 rounded-lg shadow-lg overflow-hidden
              ${index === 0 ? 'bg-gradient-to-b from-amber-300 to-yellow-600 text-slab-dark transform md:scale-110 z-10' : 
                index === 1 ? 'bg-gradient-to-b from-slate-300 to-slate-500 text-slab-dark' : 
                'bg-gradient-to-b from-amber-700 to-amber-900 text-slab-cream'}
            `}>
              <div className="absolute top-2 right-2 flex">
                {player.badges.map((badge, badgeIndex) => (
                  <span 
                    key={badgeIndex} 
                    className={`${getBadgeColor(badge)} text-white text-xs px-2 py-1 rounded-full mr-1`}
                    title={badge}
                  >
                    {badge.charAt(0)}
                  </span>
                ))}
              </div>
              
              <div className={`
                inline-flex items-center justify-center rounded-full mb-3 p-3
                ${index === 0 ? 'bg-yellow-100' : index === 1 ? 'bg-slate-200' : 'bg-amber-800'}
              `}>
                {index === 0 ? <Trophy size={40} className="text-yellow-600" /> : 
                 index === 1 ? <Medal size={40} className="text-slate-500" /> : 
                 <Star size={40} className="text-amber-500" />}
              </div>
              
              <h3 className="text-2xl font-display mb-1">#{player.rank} {player.player}</h3>
              <p className="text-sm mb-3">{player.level}</p>
              <div className={`
                font-display text-3xl 
                ${index === 0 ? 'text-yellow-900' : index === 1 ? 'text-slate-700' : 'text-amber-300'}
              `}>
                {player.points.toLocaleString()} pts
              </div>
              
              <div className="mt-4">
                {player.badges.map((badge, badgeIndex) => (
                  <span key={badgeIndex} className="text-xs inline-block mr-2 mb-2">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Filter and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10 bg-white/80"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slab-dark" />
            <select 
              className="bg-white/80 border border-slab-copper/30 rounded-md px-3 py-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="legend">Legend</option>
              <option value="veteran">Veteran</option>
              <option value="regular">Regular</option>
              <option value="newcomer">Newcomer</option>
            </select>
          </div>
        </div>
        
        {/* Full Leaderboard Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg card-distressed mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slab-dark text-slab-cream">
                  <th className="px-4 py-3 text-left">Rank</th>
                  <th className="px-4 py-3 text-left">Player</th>
                  <th className="px-4 py-3 text-left">Level</th>
                  <th className="px-4 py-3 text-left">Badges</th>
                  <th className="px-4 py-3 text-right">Points</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaderboard.map((player) => (
                  <tr key={player.id} className="border-b border-slab-copper/20 hover:bg-slab-copper/10">
                    <td className="px-4 py-3">#{player.rank}</td>
                    <td className="px-4 py-3 font-bold">{player.player}</td>
                    <td className="px-4 py-3">{player.level}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {player.badges.map((badge, index) => (
                          <span 
                            key={index} 
                            className={`${getBadgeColor(badge)} text-white text-xs px-2 py-0.5 rounded-full`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">{player.points.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* How to Earn Points */}
        <div className="bg-slab-dark/80 backdrop-blur-sm text-slab-cream rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-display text-slab-copper mb-4">HOW TO EARN GRATITUDE POINTS</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-slab-copper mr-2">•</span>
              <span><strong>Character Donations:</strong> Support specific characters and their causes (100-500 points)</span>
            </li>
            <li className="flex items-start">
              <span className="text-slab-copper mr-2">•</span>
              <span><strong>Purchase Decks:</strong> Buy starter packs or expansions (200-1000 points)</span>
            </li>
            <li className="flex items-start">
              <span className="text-slab-copper mr-2">•</span>
              <span><strong>Community Cause:</strong> Donate to the Slab City preservation fund (points based on donation)</span>
            </li>
            <li className="flex items-start">
              <span className="text-slab-copper mr-2">•</span>
              <span><strong>Card Submissions:</strong> Submit card designs that get approved (500 points)</span>
            </li>
            <li className="flex items-start">
              <span className="text-slab-copper mr-2">•</span>
              <span><strong>Story Contributions:</strong> Share your Slab City experiences (250 points)</span>
            </li>
          </ul>
          
          <Button className="bg-slab-copper hover:bg-slab-rust text-slab-cream mt-6" asChild>
            <a href="/donate">DONATE & EARN POINTS</a>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Leaderboard;
