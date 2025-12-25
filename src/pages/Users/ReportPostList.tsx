import type { FC } from 'react';
import { useState } from 'react';
import editIcon from '../../assets/edit.svg';
import viewIcon from '../../assets/view.svg';
import blockIcon from '../../assets/block.svg';
import trashIcon from '../../assets/trash.svg';
import { mockReportedPosts, type ReportedPostData } from '../../constants/mockData';
import { Table, type TableColumn } from '../../components/Table';
import { TopBar } from '../../components/TopBar';
import { Pagination } from '../../components/Pagination';
import { DateRangePicker } from '../../components/DateRangePicker';
import { PageWrapper } from '../../components/PageWrapper';

export const ReportPostList: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<ReportedPostData[]>([]);
  const itemsPerPage = 10;

  // Filter data based on search
  const filteredData = mockReportedPosts.filter(item => {
    return (
      item.userName.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userName.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.postId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userTraffic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reports.toString().includes(searchTerm)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCheckboxChange = (checkedItems: ReportedPostData[]) => {
    setSelectedItems(checkedItems);
    // Log selected items for debugging/demonstration purposes
    console.log('Selected trending posts:', checkedItems);
  };

  const columns: TableColumn[] = [
    {
      key: 'userName',
      label: 'User Name',
      width: 'w-[320px]',
      render: (value: ReportedPostData['userName']) => (
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
      key: 'uploadTime', 
      label: 'Upload Time', 
      className: 'pl-4',
      headerRender: (column) => <DateRangePicker label={column.label} />
    },
    { key: 'trafficRatio', label: 'Traffic Ratio', className: 'pl-4' },
    { key: 'likeRatio', label: 'Like Ratio', className: 'pl-4' },
    { key: 'userTraffic', label: 'User Traffic', className: 'pl-4' },
    { key: 'reports', label: 'Report', className: 'pl-4' },
    { key: 'totalLikes', label: 'Total Likes', className: 'pl-4' },
    {
      key: 'actions',
      label: 'Action',
      className: 'text-left pl-4',
      render: () => (
        <div className="flex items-center gap-[3px] min-h-[20px]">
          <button className="p-1 hover:bg-gray-100 rounded inline-flex items-center justify-center min-w-[20px] min-h-[20px]">
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
            heading="Report Post List" 
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
          </div>
        </main>
      </div>
    </PageWrapper>
  );
};
