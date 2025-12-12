import type { FC } from 'react';
import { useState } from 'react';
import editIcon from '../../assets/edit.svg';
import viewIcon from '../../assets/view.svg';
import blockIcon from '../../assets/block.svg';
import trashIcon from '../../assets/trash.svg';
import { mockAudienceManagement, type AudienceManagementData } from '../../constants/mockData';
import { Table, type TableColumn } from '../../components/Table';
import { TopBar } from '../../components/TopBar';
import { Pagination } from '../../components/Pagination';

export const AudienceManagement: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<AudienceManagementData[]>([]);
  const itemsPerPage = 10;

  // For now, using all data without filtering since search input was removed
  const filteredData = mockAudienceManagement;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCheckboxChange = (checkedItems: AudienceManagementData[]) => {
    setSelectedItems(checkedItems);
    // Log selected items for debugging/demonstration purposes
    console.log('Selected audience:', checkedItems);
  };

  const columns: TableColumn[] = [
    {
      key: 'userName',
      label: 'User Name',
      width: 'w-[320px]',
      render: (value: AudienceManagementData['userName']) => (
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
    { key: 'aiUserId', label: 'AI User ID', width: 'w-[130px] pl-6' },
    {
      key: 'nameOnly',
      label: 'User Name',
      className: 'pl-4',
      render: (_: any, row: AudienceManagementData) => row.userName.name
    },
    { key: 'mobileNo', label: 'Mobile No', className: 'pl-4' },
    { key: 'gender', label: 'Gender', className: 'pl-4' },
    { key: 'dateOfBirth', label: 'Date of Birth', className: 'pl-4' },
    { key: 'country', label: 'Country', className: 'pl-4' },
    { key: 'status', label: 'Status', className: 'pl-4' },
    { key: 'post', label: 'Post', className: 'pl-4' },
    { key: 'dailyActiveTime', label: 'Daily Active Time', className: 'pl-4' },
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
    <div className="h-screen overflow-auto flex flex-col bg-[#4D54640D]">
      <div className="flex flex-1">
        <main className="flex-1 bg-[#4D54640D]">
          <TopBar heading="Audience Management" />
          
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
    </div>
  );
};
