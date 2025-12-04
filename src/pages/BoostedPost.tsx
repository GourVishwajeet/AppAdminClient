import type { FC } from 'react';
import { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Table, type TableColumn } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { BoostPostInvoiceModal } from '../components/BoostPostInvoiceModal';
import { mockBoostedPosts, type BoostedPostData } from '../constants/mockData';
import editIcon from '../assets/edit.svg';
import viewIcon from '../assets/view.svg';
import blockIcon from '../assets/block.svg';
import trashIcon from '../assets/trash.svg';

export const BoostedPost: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<BoostedPostData[]>([]);
  const [selectedPostForModal, setSelectedPostForModal] = useState<BoostedPostData | null>(null);
  const itemsPerPage = 10;

  // For now, using all data without filtering since search input was removed
  const filteredData = mockBoostedPosts;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCheckboxChange = (checkedItems: BoostedPostData[]) => {
    setSelectedItems(checkedItems);
    // Log selected items for debugging/demonstration purposes
    console.log('Selected boosted posts:', checkedItems);
  };

  const columns: TableColumn[] = [
    {
      key: 'userName',
      label: 'User Name',
      width: 'w-[320px]',
      render: (value: BoostedPostData['userName']) => (
        <div className="flex items-center gap-3">
          <img
            src={value.avatar}
            alt={value.name}
            className="w-[40px] h-[40px] rounded-[8px] object-cover"
          />
          <div>
            <div className="font-medium text-[#0C0D0F] text-[14px]">{value.name}</div>
            <div className="font-regular text-[#FFFFFF] text-[12px]">{value.email}</div>
          </div>
        </div>
      )
    },
    { key: 'postId', label: 'Post ID', width: 'w-[130px] pl-6' },
    { key: 'collaboration', label: 'Collaboration', className: 'pl-4' },
    { key: 'uploadTime', label: 'Upload Time', className: 'pl-4' },
    { key: "boostPrice", label: "Boost Price", className: 'pl-4' },
    { key: "boostTime", label: "Boost Time", className: 'pl-4' },
    { key: 'trafficRatio', label: 'Traffic Ratio', className: 'pl-4' },
    { key: 'userTraffic', label: 'User Traffic', className: 'pl-4' },
    {
      key: 'actions',
      label: 'Action',
      className: 'text-left pl-4',
      render: (_, rowData: BoostedPostData) => (
        <div className="flex items-center gap-[3px] min-h-[20px]">
          <button 
            className="p-1 hover:bg-gray-100 rounded inline-flex items-center justify-center min-w-[20px] min-h-[20px]"
            onClick={() => setSelectedPostForModal(rowData)}
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
          <TopBar heading="Boosted Post" />
          
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
      
      {/* Boost Post Invoice Modal */}
      {selectedPostForModal && (
        <BoostPostInvoiceModal
          isOpen={!!selectedPostForModal}
          onClose={() => setSelectedPostForModal(null)}
          postData={selectedPostForModal}
        />
      )}
    </div>
  );
};
