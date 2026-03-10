import type { FC } from 'react';
import { useMemo } from 'react';
import { Table } from './Table';
import { 
  mockInfluencers, 
  mockTrendingPosts, 
  mockReportedPosts, 
  mockBoostedPosts, 
  mockPostManagement, 
  mockLiveUsers, 
  mockStoryManagement, 
  mockAudienceManagement 
} from '../constants/mockData';

interface SearchResultsProps {
  query: string;
  onClose?: () => void;
}

export const SearchResults: FC<SearchResultsProps> = ({ query, onClose }) => {
  if (!query) return null;

  const lowerQuery = query.toLowerCase();

  // Filter Logic
  const results = useMemo(() => ({
    influencers: mockInfluencers.filter(i => 
      i.userName.name.toLowerCase().includes(lowerQuery) || 
      i.userName.email.toLowerCase().includes(lowerQuery)
    ),
    trending: mockTrendingPosts.filter(p => 
      p.userName.name.toLowerCase().includes(lowerQuery) || 
      p.postId.toLowerCase().includes(lowerQuery) ||
      p.collaboration.toLowerCase().includes(lowerQuery)
    ),
    reported: mockReportedPosts.filter(p => 
      p.userName.name.toLowerCase().includes(lowerQuery) || 
      p.postId.toLowerCase().includes(lowerQuery)
    ),
    boosted: mockBoostedPosts.filter(p => 
      p.userName.name.toLowerCase().includes(lowerQuery) || 
      p.postId.toLowerCase().includes(lowerQuery) ||
      p.collaboration.toLowerCase().includes(lowerQuery)
    ),
    posts: mockPostManagement.filter(p => 
      p.userName.name.toLowerCase().includes(lowerQuery) || 
      p.postId.toLowerCase().includes(lowerQuery) ||
      p.collaboration.toLowerCase().includes(lowerQuery)
    ),
    live: mockLiveUsers.filter(u => 
      u.userName.name.toLowerCase().includes(lowerQuery) || 
      u.userId.toLowerCase().includes(lowerQuery) ||
      u.collaboration.toLowerCase().includes(lowerQuery)
    ),
    stories: mockStoryManagement.filter(s => 
      s.userName.name.toLowerCase().includes(lowerQuery) || 
      s.storyId.toLowerCase().includes(lowerQuery) ||
      s.collaboration.toLowerCase().includes(lowerQuery)
    ),
    audience: mockAudienceManagement.filter(a => 
      a.userName.name.toLowerCase().includes(lowerQuery) || 
      a.aiUserId.toLowerCase().includes(lowerQuery)
    )
  }), [lowerQuery]);

  const hasResults = Object.values(results).some(arr => arr.length > 0);

  if (!hasResults) {
    return (
      <div className="absolute top-[60px] left-[320px] w-[800px] max-h-[80vh] overflow-y-auto bg-[#1A1A1A] border border-[#333] rounded-xl shadow-2xl z-50 p-6 text-center text-gray-400 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-white">✕</button>
        No results found for "{query}"
      </div>
    );
  }

  return (
    <div className="absolute top-[60px] left-[320px] w-[800px] max-h-[80vh] overflow-y-auto bg-[#1A1A1A] border border-[#333] rounded-xl shadow-2xl z-50 p-6 flex flex-col gap-8 custom-scrollbar relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white z-10">✕</button>
      
      {/* Influencers */}
      {results.influencers.length > 0 && (
        <Section title="Top Influencers" count={results.influencers.length}>
          <Table 
            data={results.influencers}
            columns={[
              { key: 'userName', label: 'Name', render: (v: any) => <UserCell user={v} /> },
              { key: 'status', label: 'Status', render: (v: string) => <StatusBadge status={v} /> },
              { key: 'userTraffic', label: 'Traffic' },
              { key: 'totalLikes', label: 'Likes' },
            ]}
          />
        </Section>
      )}

      {/* Reported Posts */}
      {results.reported.length > 0 && (
        <Section title="Reported Posts" count={results.reported.length}>
           <Table 
            data={results.reported}
            columns={[
              { key: 'userName', label: 'User', render: (v: any) => <UserCell user={v} /> },
              { key: 'postId', label: 'Post ID' },
              { key: 'reports', label: 'Reports', render: (v: number) => <span className="text-red-400">{v}</span> },
              { key: 'uploadTime', label: 'Uploaded' },
            ]}
          />
        </Section>
      )}

      {/* Trending Posts */}
      {results.trending.length > 0 && (
        <Section title="Trending Posts" count={results.trending.length}>
           <Table 
            data={results.trending}
            columns={[
              { key: 'userName', label: 'User', render: (v: any) => <UserCell user={v} /> },
              { key: 'postId', label: 'Post ID' },
              { key: 'collaboration', label: 'Collab' },
              { key: 'trafficRatio', label: 'Traffic Ratio' },
            ]}
          />
        </Section>
      )}

      {/* Boosted Posts */}
      {results.boosted.length > 0 && (
        <Section title="Boosted Posts" count={results.boosted.length}>
           <Table 
            data={results.boosted}
            columns={[
              { key: 'userName', label: 'User', render: (v: any) => <UserCell user={v} /> },
              { key: 'boostPrice', label: 'Price' },
              { key: 'boostTime', label: 'Duration' },
              { key: 'trafficRatio', label: 'Traffic' },
            ]}
          />
        </Section>
      )}

      {/* Post Management */}
      {results.posts.length > 0 && (
        <Section title="Post Management" count={results.posts.length}>
           <Table 
            data={results.posts}
            columns={[
              { key: 'userName', label: 'User', render: (v: any) => <UserCell user={v} /> },
              { key: 'postId', label: 'Post ID' },
              { key: 'totalComments', label: 'Comments' },
              { key: 'totalLikes', label: 'Likes' },
            ]}
          />
        </Section>
      )}

       {/* Live Users */}
       {results.live.length > 0 && (
        <Section title="Live Users" count={results.live.length}>
           <Table 
            data={results.live}
            columns={[
              { key: 'userName', label: 'User', render: (v: any) => <UserCell user={v} /> },
              { key: 'userId', label: 'User ID' },
              { key: 'traffic', label: 'Traffic' },
              { key: 'country', label: 'Country' },
            ]}
          />
        </Section>
      )}

      {/* Story Management */}
      {results.stories.length > 0 && (
        <Section title="Story Management" count={results.stories.length}>
           <Table 
            data={results.stories}
            columns={[
              { key: 'userName', label: 'User', render: (v: any) => <UserCell user={v} /> },
              { key: 'storyId', label: 'Story ID' },
              { key: 'storyViewer', label: 'Viewers' },
              { key: 'followers', label: 'Followers' },
            ]}
          />
        </Section>
      )}

      {/* Audience Management */}
      {results.audience.length > 0 && (
        <Section title="Audience Management" count={results.audience.length}>
           <Table 
            data={results.audience}
            columns={[
              { key: 'userName', label: 'Name', render: (v: any) => <UserCell user={v} /> },
              { key: 'aiUserId', label: 'AI ID' },
              { key: 'country', label: 'Country' },
              { key: 'dailyActiveTime', label: 'Active Time' },
            ]}
          />
        </Section>
      )}

    </div>
  );
};

// Helper Components
const Section: FC<{ title: string; count: number; children: React.ReactNode }> = ({ title, count, children }) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-white text-lg font-semibold flex items-center gap-2">
      {title}
      <span className="text-sm bg-[#333] px-2 py-0.5 rounded-full text-gray-400">{count}</span>
    </h3>
    <div className="border border-[#333] rounded-lg overflow-hidden">
      {children}
    </div>
  </div>
);

const UserCell: FC<{ user: { name: string; avatar: string; email?: string } }> = ({ user }) => (
  <div className="flex items-center gap-2">
    <img src={user.avatar} alt="" className="w-6 h-6 rounded-full" />
    <span className="text-sm text-gray-200">{user.name}</span>
  </div>
);

const StatusBadge: FC<{ status: string }> = ({ status }) => {
  const colors = {
    Active: 'text-green-400 bg-green-400/10',
    Blacklisted: 'text-red-400 bg-red-400/10',
    Inactive: 'text-gray-400 bg-gray-400/10'
  } as any;
  
  return (
    <span className={`px-2 py-0.5 rounded-full text-[12px] ${colors[status] || colors.Inactive}`}>
      {status}
    </span>
  );
};
