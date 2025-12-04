import type { FC } from 'react';
import { useEffect } from 'react';
import { mockComments, type CommentData } from '../constants/mockData';

interface CommentsSideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommentItem: FC<{ comment: CommentData; isReply?: boolean }> = ({ comment, isReply = false }) => {
  return (
    <div className={`${isReply ? 'mt-6' : 'mb-8'}`}>
      <div className="flex items-start gap-3 mb-2">
        <img 
          src={comment.user.avatar} 
          alt={comment.user.name} 
          className="w-[32px] h-[32px] rounded-full object-cover shrink-0" 
        />
        
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white text-[14px] font-medium">{comment.user.name}</span>
            <span className="text-[#9CA3AF] text-[12px]">{comment.time}</span>
          </div>
        </div>
      </div>
      
      <div className="">
        <p className="text-[#D1D5DB] text-[14px] leading-[20px] mb-2 font-light">
          {comment.content}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-white text-[12px] font-medium">{comment.likes} Likes</span>
            <button className="flex items-center gap-1 text-white text-[12px] font-medium hover:text-gray-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform scale-x-[-1]">
                  <polyline points="15 10 20 15 15 20"></polyline>
                  <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
              </svg>
              Reply
            </button>
          </div>
          
          <button className="text-[#9CA3AF] hover:text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 relative ml-4">
            {/* Dashed line for replies */}
            <div className="absolute left-[-14px] top-[-10px] bottom-4 w-px h-full border-l border-dashed border-[#545454]"></div>
            
            {comment.replies.map(reply => (
              <CommentItem key={reply.id} comment={reply} isReply={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const CommentsSideModal: FC<CommentsSideModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-black w-[450px] h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-[#1F2937]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white">
          <h2 className="text-[20px] font-semibold text-[#0F0F0F]">All Comments</h2>
          <button 
            onClick={onClose}
            className="text-[#5458F7] hover:text-white transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {mockComments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};
