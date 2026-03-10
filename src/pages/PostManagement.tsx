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
import { PageWrapper } from '../components/PageWrapper';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { DropdownFilter } from '../components/DropdownFilter';

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

  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [currentCollaborationFilter, setCurrentCollaborationFilter] = useState('All');
  const [currentUploadTimeFilter, setCurrentUploadTimeFilter] = useState('All');
  const itemsPerPage = 10;

  // Modal State
  const [actionModal, setActionModal] = useState<{
    type: 'block' | 'delete' | null;
    data: PostManagementData | null;
  }>({ type: null, data: null });

  const handleActionConfirm = () => {
    if (!actionModal.data || !actionModal.type) return;

    if (actionModal.type === 'block') {
      console.log('Blocking post/user:', actionModal.data.postId);
      // Add logic to block here
    } else if (actionModal.type === 'delete') {
      console.log('Deleting post:', actionModal.data.postId);
      // Add logic to delete here
    }

    setActionModal({ type: null, data: null });
  };

  // Filter logic
  const filteredData = mockPostManagement.filter(item => {
    // Search filter
    const matchesSearch = 
      item.userName.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userName.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.postId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.collaboration.toLowerCase().includes(searchTerm.toLowerCase());

    // Dropdown filters
    const matchesCollaboration = currentCollaborationFilter === 'All' || item.collaboration === currentCollaborationFilter;
    const matchesUploadTime = currentUploadTimeFilter === 'All' || item.uploadTime === currentUploadTimeFilter;

    return matchesSearch && matchesCollaboration && matchesUploadTime;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(new Set());

  const handleSelectionChange = (keys: Set<string | number>) => {
    setSelectedKeys(keys);
    // Log selected items for debugging/demonstration purposes
    console.log('Selected post IDs:', Array.from(keys));
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
    { 
      key: 'collaboration', 
      label: 'Collaboration', 
      className: 'pl-4',
      headerRender: (column) => {
        const uniqueCollaborations = Array.from(new Set(mockPostManagement.map(i => i.collaboration))).sort();
        return (
          <DropdownFilter
            label={column.label}
            options={uniqueCollaborations}
            activeValue={currentCollaborationFilter}
            onSelect={setCurrentCollaborationFilter}
            searchable={true}
          />
        );
      }
    },
    { 
      key: 'uploadTime', 
      label: 'Upload Time', 
      className: 'pl-4',
      headerRender: (column) => {
        const uniqueTimes = Array.from(new Set(mockPostManagement.map(i => i.uploadTime))).sort();
        return (
          <DropdownFilter
            label={column.label}
            options={uniqueTimes}
            activeValue={currentUploadTimeFilter}
            onSelect={setCurrentUploadTimeFilter}
          />
        );
      }
    },
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
      render: (data: PostManagementData) => (
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
          <button 
            className="p-1 hover:bg-gray-100 rounded inline-flex items-center justify-center min-w-[20px] min-h-[20px]"
            onClick={() => setActionModal({ type: 'block', data })}
          >
            <img src={blockIcon} alt="Block" className="w-4 h-4"/>
          </button>
          <button 
            className="p-1 hover:bg-gray-100 rounded inline-flex items-center justify-center min-w-[20px] min-h-[20px]"
            onClick={() => setActionModal({ type: 'delete', data })}
          >
            <img src={trashIcon} alt="Delete" className="w-4 h-4"/>
          </button>
        </div>
      )
    }
  ];

  return (
    <PageWrapper>
      <div className="flex flex-1">
        <main className="flex-1 bg-[#4D54640D]">
          <TopBar 
            heading="Post Management" 
            onSearch={setSearchTerm}
            searchValue={searchTerm}
          />
          
          {/* Content Area */}
          <div className="p-6">

            {/* Table */}
            <Table 
              columns={columns} 
              data={paginatedData} 
              showCheckbox={true}
              rowKey="postId"
              selectedKeys={selectedKeys}
              onSelectionChange={handleSelectionChange}
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

            <ConfirmationModal
              isOpen={actionModal.type === 'block'}
              onClose={() => setActionModal({ type: null, data: null })}
              onConfirm={handleActionConfirm}
              title="Block User/Post"
              message={`Are you sure you want to block this post/user? This action can be undone later.`}
              confirmLabel="Block"
              confirmVariant="danger"
            />

            <ConfirmationModal
              isOpen={actionModal.type === 'delete'}
              onClose={() => setActionModal({ type: null, data: null })}
              onConfirm={handleActionConfirm}
              title="Delete Post"
              message={`Are you sure you want to delete post ${actionModal.data?.postId}? This action cannot be undone.`}
              confirmLabel="Delete"
              confirmVariant="danger"
            />
          </div>
        </main>
      </div>
    </PageWrapper>
  );
};
