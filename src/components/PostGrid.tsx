import type { FC } from 'react';
import profile1 from '../assets/profile-1.svg';
import profile2 from '../assets/profile-2.svg';
import profile3 from '../assets/profile-3.svg';
import profile4 from '../assets/profile-4.svg';
import profile5 from '../assets/profile-5.svg';
import profile6 from '../assets/profile-6.svg';
import profile7 from '../assets/profile-7.svg';
import profile8 from '../assets/profile-8.svg';
import Loading from '../assets/loading.svg';

interface Post {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  date: string;
}

// Mock data for demonstration
const mockPosts: Post[] = [
  { id: '1', imageUrl: profile1, likes: 245, comments: 32, date: '2024-01-15' },
  { id: '2', imageUrl: profile2, likes: 189, comments: 28, date: '2024-01-14' },
  { id: '3', imageUrl: profile3, likes: 567, comments: 89, date: '2024-01-13' },
  { id: '4', imageUrl: profile4, likes: 123, comments: 15, date: '2024-01-12' },
  { id: '5', imageUrl: profile5, likes: 445, comments: 67, date: '2024-01-11' },
  { id: '6', imageUrl: profile6, likes: 298, comments: 41, date: '2024-01-10' },
  { id: '7', imageUrl: profile7, likes: 789, comments: 102, date: '2024-01-09' },
  { id: '8', imageUrl: profile8, likes: 156, comments: 22, date: '2024-01-08' },
];

export const PostGrid: FC = () => {
  return (
    <div className="p-2">
      {/* Grid Header */}
      <div className="flex items-center justify-between mb-6">
        {/* <h3 className="text-lg font-semibold text-white">Recent Posts</h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">{mockPosts.length} posts</span>
          <button className="text-sm text-white hover:text-gray-300 font-medium">
            View All
          </button>
        </div> */}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-4 gap-0.5">
        {mockPosts.map((post) => (
          <div key={post.id} className="relative group cursor-pointer">
            {/* Post Image */}
            <div className="overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={`Post ${post.id}`} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlay on Hover */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                  <span className="text-sm font-medium">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{post.comments}</span>
                </div>
              </div>
            </div> */}
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-12 flex justify-center items-center">
        {/* <button className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm">
          Load More Posts
        </button> */}
        <img src={Loading} alt="Loading" />
      </div>
    </div>
  );
};