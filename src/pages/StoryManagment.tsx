import type { FC } from 'react';
import { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Table, type TableColumn } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { TrafficAnalysisModal } from '../components/TrafficAnalysisModal';
import { StoryViewPanel } from '../components/StoryViewPanel';
import { DateRangePicker } from '../components/DateRangePicker';
import { mockStoryManagement, type StoryManagementData } from '../constants/mockData';
import editIcon from '../assets/edit.svg';
import viewIcon from '../assets/view.svg';
import blockIcon from '../assets/block.svg';
import trashIcon from '../assets/trash.svg';
import { PageWrapper } from '../components/PageWrapper';
import { DropdownFilter } from '../components/DropdownFilter';
import { parse, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

const FollowersCell: FC<{ value: string }> = ({ value }) => {
  const [isHovered, setIsHovered] = useState(false);
  // Extract number from string (e.g. "45k" -> 45) for demo purposes
  const numValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span 
        className={`cursor-pointer transition-colors ${
          isHovered 
            ? 'text-[#0085FF] border-b border-dotted border-[#0085FF]' 
            : 'text-[#dcdcdc]'
        }`}
      >
        {value}
      </span>
      {isHovered && (
        <TrafficAnalysisModal value={numValue} total={100} />
      )}
    </div>
  );
};

export const StoryManagement: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewPanelOpen, setIsViewPanelOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<StoryManagementData | null>(null);
  
  const [currentCollaborationFilter, setCurrentCollaborationFilter] = useState('All');
  const [uploadTimeRange, setUploadTimeRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });

  const itemsPerPage = 10;

  // Helper to parse 'dd-MM-yyyy' date strings
  const parseCustomDate = (dateStr: string): Date => {
    return parse(dateStr, 'dd-MM-yyyy', new Date());
  };

  // Filter logic
  const filteredData = mockStoryManagement.filter(item => {
    // Search filter
    const matchesSearch = 
      item.userName.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userName.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.storyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.collaboration.toLowerCase().includes(searchTerm.toLowerCase());

    // Dropdown filters
    const matchesCollaboration = currentCollaborationFilter === 'All' || item.collaboration === currentCollaborationFilter;

    // Date Range Filter
    let matchesUploadTime = true;
    if (uploadTimeRange.start && uploadTimeRange.end) {
      try {
        const postDate = parseCustomDate(item.uploadTime);
        matchesUploadTime = isWithinInterval(postDate, { 
          start: startOfDay(uploadTimeRange.start), 
          end: endOfDay(uploadTimeRange.end) 
        });
      } catch (error) {
        console.error("Date parsing error", error);
        matchesUploadTime = false;
      }
    }

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
    console.log('Selected story IDs:', Array.from(keys));
  };

  const handleViewClick = (story: StoryManagementData) => {
    setSelectedStory(story);
    setIsViewPanelOpen(true);
  };

  const columns: TableColumn[] = [
    {
      key: 'userName',
      label: 'User Name',
      width: 'w-[320px]',
      render: (value: StoryManagementData['userName']) => (
        <div className="flex items-center gap-3">
          <img
            src={value.avatar}
            alt={value.name}
            className="w-[40px] h-[40px] rounded-[8px] object-cover"
          />
          <div>
            <div className="font-medium text-[#0C0D0F] text-[14px]">{value.name}</div>
            <div className="font-regular text-[#F8FAFF] text-[12px]">{value.email}</div>
          </div>
        </div>
      )
    },
    { key: 'storyId', label: 'Story ID', width: 'w-[130px] pl-6' },
    { 
      key: 'collaboration', 
      label: 'Collaboration', 
      className: 'pl-4',
      headerRender: (column) => {
        const uniqueCollaborations = Array.from(new Set(mockStoryManagement.map(i => i.collaboration))).sort();
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
      headerRender: (column) => (
        <DateRangePicker 
          label={column.label} 
          onApply={setUploadTimeRange}
        />
      )
    },
    { key: 'nonFollowers', label: 'Non Followers', className: 'pl-4' },
    {
      key: 'followers',
      label: 'Followers',
      className: 'pl-4 overflow-visible',
      render: (value: string) => <FollowersCell value={value} />
    },
    {
      key: 'storyViewer',
      label: 'Story Viewer',
      className: 'pl-4',
      render: (value: string, row: StoryManagementData) => {
        const isPositive = row.storyViewerChange.startsWith('+');
        return (
          <div className="flex items-center gap-2">
            <span>{value}</span>
            <span className={isPositive ? 'text-[#00B70C]' : 'text-[#F30000]'}>
              {row.storyViewerChange}
            </span>
          </div>
        );
      }
    },
    { key: 'totalLikes', label: 'Total Likes', className: 'pl-4' },
    {
      key: 'actions',
      label: 'Action',
      className: 'text-left pl-4',
      render: (_: any, row: StoryManagementData) => (
        <div className="flex items-center gap-[3px] min-h-[20px]">
          <button 
            className="p-1 hover:bg-gray-100 rounded inline-flex items-center justify-center min-w-[20px] min-h-[20px]"
            onClick={() => handleViewClick(row)}
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
    <PageWrapper>
      <div className="flex flex-1">
        <main className="flex-1 bg-[#4D54640D]">
          <TopBar 
            heading="Story Management" 
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
              rowKey="storyId"
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
          </div>

          <StoryViewPanel
            isOpen={isViewPanelOpen}
            onClose={() => setIsViewPanelOpen(false)}
            data={selectedStory}
          />
        </main>
      </div>
    </PageWrapper>
  );
};
