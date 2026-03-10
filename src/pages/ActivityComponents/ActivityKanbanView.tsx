import type { FC } from 'react';
import timeIcon from '../../assets/time.svg';
import { mockActivityGridData } from '../../constants/mockData';

export const ActivityKanbanView: FC = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {mockActivityGridData.map((post, index) => (
        <div key={index} className="bg-[#1A1A1A] rounded-[16px] overflow-hidden group">
          {/* Image */}
          <div className="h-[120px] relative">
            <img src={post.image} alt="Post" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            
            {/* Overlay Title (Optional styling choice to overlay or put below? Image suggests below usually, but let's put it below the image as requested "not only images") */}
          </div>
          
          {/* Content */}
          <div className="p-3">
            <h3 className="text-white text-[14px] font-semibold mb-1 truncate">{post.title}</h3>
            <p className="text-[12px] text-[#A9A9A9] mb-3 font-medium">{post.user}</p>
            
            <div className="flex items-center justify-between">
              <img src={timeIcon} alt="Time" className="w-[18px] h-[18px] opacity-70" />
              
              <div className="flex -space-x-1.5">
                {post.avatars.map((avatar: string, i: number) => (
                  <div key={i} className="w-[20px] h-[20px] rounded-full border border-[#000000] overflow-hidden bg-gray-700">
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
