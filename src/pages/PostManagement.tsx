import type { FC } from 'react';
import { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Table, type TableColumn } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { mockPostManagement, type PostManagementData } from '../constants/mockData';
import editIcon from '../assets/edit.svg';
import viewIcon from '../assets/view.svg';
import blockIcon from '../assets/block.svg';
import trashIcon from '../assets/trash.svg';
import { CommentsSideModal } from '../components/CommentsSideModal';
import { PostAnalysisPopup } from '../components/PostAnalysisPopup';

const CellWithAnalysis: FC<{ value: string | number }> = ({ value }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className="relative cursor-pointer inline-block"
      onClick={() => setIsOpen(!isOpen)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:w-full after:border-b after:border-dotted after:border-current after:bottom-[-4px] after:h-px">
        {value}
      </div>
      {isOpen && <PostAnalysisPopup />}
    </div>
  );
};

export const PostManagement: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<PostManagementData[]>([]);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const itemsPerPage = 10;

  // For now, using all data without filtering since search input was removed
  const filteredData = mockPostManagement;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCheckboxChange = (checkedItems: PostManagementData[]) => {
    setSelectedItems(checkedItems);
    // Log selected items for debugging/demonstration purposes
    console.log('Selected posts:', checkedItems);
  };

  const columns: TableColumn[] = [
    {
      key: 'userName',
      label: 'User Name',
      width: 'w-[320px]',
      render: (value: PostManagementData['userName']) => (
        <div className="flex items-center gap-3">
          <img
            src={value.avatar}
            alt={value.name}
            className="w-[40px] h-[40px] rounded-[8px] object-cover"
          />
          <div>
            <div className="font-medium text-[#FFFFFF] text-[14px]">{value.name}</div>
            <div className="font-regular text-[#BCBCBC] text-[12px]">{value.email}</div>
          </div>
        </div>
      )
    },
    { key: 'postId', label: 'Post ID', width: 'w-[130px] pl-6' },
    { key: 'collaboration', label: 'Collaboration', className: 'pl-4' },
    { key: 'uploadTime', label: 'Upload Time', className: 'pl-4' },
    { key: 'trafficRatio', label: 'Traffic Ratio', className: 'pl-4' },
    { key: 'totalComments', label: 'Total Comments', className: 'pl-4',
      render: (value) => <CellWithAnalysis value={value} /> },
    { key: 'totalLikes', label: 'Total Likes', className: 'pl-4',
      render: (value) => <CellWithAnalysis value={value} /> },
    { key: 'reply', label: 'Reply', className: 'pl-4',
      render: (value) => <CellWithAnalysis value={value} /> },
    {
      key: 'actions',
      label: 'Action',
      className: 'text-left pl-4',
      render: () => (
        <div className="flex items-center gap-[3px] min-h-[20px]">
          <button 
            className="p-1 hover:bg-gray-100 rounded inline-flex items-center justify-center min-w-[20px] min-h-[20px]"
            onClick={() => setIsCommentsModalOpen(true)}
          >
            <img src={viewIcon} alt="View" className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded inline-flex items-center justify-center min-w-[20px] min-h-[20px]">
            <img src={editIcon} alt="Edit" className="w-4 h-4"/>
          </button>
          <button className="p-1 hover:bg-gray-100 rounded inline-flex items-center justify-center min-w-[20px] min-h-[20px]">
            <img src={blockIcon} alt="Block" className="w-4 h-4"/>
          </button>
          <button className="p-1 hover:bg-gray-100 rounded inline-flex items-center justify-center min-w-[20px] min-h-[20px]">
            <img src={trashIcon} alt="Delete" className="w-4 h-4"/>
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="h-screen overflow-auto flex flex-col bg-[#4D54640D]">
      <div className="flex flex-1">
        <main className="flex-1 bg-[#4D54640D]">
          <TopBar heading="Post Management" />
          
          {/* Content Area */}
          <div className="p-6">

            {/* Table */}
            <Table 
              columns={columns} 
              data={paginatedData} 
              showCheckbox={true}
              onCheckboxChange={handleCheckboxChange}
            />

            {/* Pagination */}
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredData.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>

            <CommentsSideModal 
              isOpen={isCommentsModalOpen} 
              onClose={() => setIsCommentsModalOpen(false)} 
            />

            <div className="flex justify-center items-center">
            <PostAnalysisPopup />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
