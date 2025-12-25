import type { FC } from 'react';
import timeIcon from '../../assets/time.svg';
import { mockActivityGridData } from '../../constants/mockData';

export const ActivityListView: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      {mockActivityGridData.map((post, index) => (
        <div key={index} className="bg-[#1A1A1A] rounded-[16px] overflow-hidden group flex items-center p-3 gap-4 border border-transparent hover:border-[#333] transition-colors">
          {/* Image - Left Side */}
          <div className="w-[160px] h-[90px] shrink-0 rounded-[12px] overflow-hidden relative">
            <img src={post.image} alt="Post" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          
          {/* Content - Right Side */}
          <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-white text-[16px] font-semibold truncate pr-4">{post.title}</h3>
              <p className="text-[12px] text-[#A9A9A9] whitespace-nowrap">{post.user}</p>
            </div>
            
            <p className="text-[13px] text-[#7B7B7B] line-clamp-2 mb-2 w-[80%]">
              Collaborative workspace for creative projects ensuring seamless communication and efficient workflow management.
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                 <img src={timeIcon} alt="Time" className="w-[16px] h-[16px] opacity-70" />
                 <span className="text-[12px] text-[#5A5A5A]">2 hours ago</span>
              </div>
              
              <div className="flex -space-x-1.5">
                {post.avatars.map((avatar: string, i: number) => (
                  <div key={i} className="w-[24px] h-[24px] rounded-full border-2 border-[#1A1A1A] overflow-hidden bg-gray-700">
                    <img src={avatar} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
