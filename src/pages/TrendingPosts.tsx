import type { FC } from 'react';
import { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Table, type TableColumn } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { mockTrendingPosts, type TrendingPostData } from '../constants/mockData';
import editIcon from '../assets/edit.svg';
import viewIcon from '../assets/view.svg';
import blockIcon from '../assets/block.svg';
import trashIcon from '../assets/trash.svg';
import { PageWrapper } from '../components/PageWrapper';
import { DropdownFilter } from '../components/DropdownFilter';
import { DateRangePicker } from '../components/DateRangePicker';
import { subHours, subDays, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

export const TrendingPosts: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [currentCollaborationFilter, setCurrentCollaborationFilter] = useState('All');
  const [uploadTimeRange, setUploadTimeRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const itemsPerPage = 10;

  // Helper to parse relative time strings from mock data
  const parseRelativeTime = (timeStr: string): Date => {
    const now = new Date();
    if (timeStr.includes('hour')) {
      const hours = parseInt(timeStr.split(' ')[0]);
      return subHours(now, hours);
    }
    if (timeStr.includes('day')) {
      const days = parseInt(timeStr.split(' ')[0]);
      return subDays(now, days);
    }
    if (timeStr.includes('week')) {
      const weeks = parseInt(timeStr.split(' ')[0]);
      return subDays(now, weeks * 7);
    }
    return now;
  };

  // Filter logic
  const filteredData = mockTrendingPosts.filter(item => {
    // Search filter
    const matchesSearch = 
      item.userName.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userName.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.postId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.collaboration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userTraffic.toLowerCase().includes(searchTerm.toLowerCase());

    // Dropdown filters
    const matchesCollaboration = currentCollaborationFilter === 'All' || item.collaboration === currentCollaborationFilter;
    
    // Date Range Filter
    let matchesUploadTime = true;
    if (uploadTimeRange.start && uploadTimeRange.end) {
      const postDate = parseRelativeTime(item.uploadTime);
      // Ensure we compare against the full day range of the selection
      matchesUploadTime = isWithinInterval(postDate, { 
        start: startOfDay(uploadTimeRange.start), 
        end: endOfDay(uploadTimeRange.end) 
      });
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
    console.log('Selected trending post IDs:', Array.from(keys));
  };

  const columns: TableColumn[] = [
    {
      key: 'userName',
      label: 'User Name',
      width: 'w-[320px]',
      render: (value: TrendingPostData['userName']) => (
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
        const uniqueCollaborations = Array.from(new Set(mockTrendingPosts.map(i => i.collaboration))).sort();
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
    { key: 'trafficRatio', label: 'Traffic Ratio', className: 'pl-4' },
    { key: 'likeRatio', label: 'Like Ratio', className: 'pl-4' },
    { key: 'userTraffic', label: 'User Traffic', className: 'pl-4' },
    { key: 'totalLikes', label: 'Total Likes', className: 'pl-4' },
    {
      key: 'actions',
      label: 'Action',
      className: 'text-left pl-4',
      render: () => (
        <div className="flex items-center gap-[3px] min-h-[20px]">
          <button className="p-1 hover:bg-gray-100 rounded inline-flex items-center justify-center min-w-[20px] min-h-[20px]">
            <img src={viewIcon} alt="View" className="w-4 h-4" />
            {/* Hello UYuvanth */}
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
            heading="Trending Posts" 
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
          </div>
        </main>
      </div>
    </PageWrapper>
  );
};
