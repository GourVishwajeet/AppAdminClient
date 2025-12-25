import { useState, type FC } from 'react';
import editIcon from '../../assets/edit.svg';
import viewIcon from '../../assets/view.svg';
import blockIcon from '../../assets/block.svg';
import trashIcon from '../../assets/trash.svg';
import { mockAudienceManagement, type AudienceManagementData } from '../../constants/mockData';
import { Table, type TableColumn } from '../../components/Table';
import { TopBar } from '../../components/TopBar';
import { Pagination } from '../../components/Pagination';
import { PageWrapper } from '../../components/PageWrapper';
import { DateRangePicker } from '../../components/DateRangePicker';
import { GenderPicker } from '../../components/GenderPicker';
import { DropdownFilter } from '../../components/DropdownFilter';
import { isWithinInterval, parse } from 'date-fns';

export const AudienceManagement: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<AudienceManagementData[]>([]);
  const [currentGenderFilter, setCurrentGenderFilter] = useState('All');
  const [currentCountryFilter, setCurrentCountryFilter] = useState('All');
  const [currentStatusFilter, setCurrentStatusFilter] = useState('All');
  const [dobRange, setDobRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  
  const itemsPerPage = 10;

  // Filter logic
  const filteredData = mockAudienceManagement.filter(item => {
    // Search filter
    const matchesSearch = 
      item.userName.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userName.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.aiUserId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobileNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase());

    // Dropdown filters
    const matchesGender = currentGenderFilter === 'All' || item.gender === currentGenderFilter;
    const matchesCountry = currentCountryFilter === 'All' || item.country === currentCountryFilter;
    const matchesStatus = currentStatusFilter === 'All' || item.status === currentStatusFilter;
    
    // Date range filter
    let matchesDob = true;
    if (dobRange.start && dobRange.end) {
      try {
        const dobDate = parse(item.dateOfBirth, 'dd/MM/yyyy', new Date());
        matchesDob = isWithinInterval(dobDate, { start: dobRange.start, end: dobRange.end });
      } catch (error) {
        console.error("Invalid date format:", item.dateOfBirth);
      }
    }

    return matchesSearch && matchesGender && matchesCountry && matchesStatus && matchesDob;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCheckboxChange = (checkedItems: AudienceManagementData[]) => {
    setSelectedItems(checkedItems);
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
    { 
      key: 'gender', 
      label: 'Gender', 
      className: 'pl-4',
      headerRender: (column) => (
        <GenderPicker 
          label={column.label} 
          onSelect={setCurrentGenderFilter}
        />
      )
    },
    { 
      key: 'dateOfBirth', 
      label: 'Date of Birth', 
      className: 'pl-4',
      headerRender: (column) => (
        <DateRangePicker 
          label={column.label} 
          onApply={setDobRange}
        />
      )
    },
    { 
      key: 'country', 
      label: 'Country', 
      className: 'pl-4',
      headerRender: (column) => {
        const uniqueCountries = Array.from(new Set(mockAudienceManagement.map(i => i.country))).sort();
        return (
          <DropdownFilter
            label={column.label}
            options={uniqueCountries}
            activeValue={currentCountryFilter}
            onSelect={setCurrentCountryFilter}
            searchable={true}
          />
        );
      }
    },
    { 
      key: 'status', 
      label: 'Status', 
      className: 'pl-4',
      headerRender: (column) => {
        const uniqueStatuses = Array.from(new Set(mockAudienceManagement.map(i => i.status))).sort();
        return (
          <DropdownFilter
            label={column.label}
            options={uniqueStatuses}
            activeValue={currentStatusFilter}
            onSelect={setCurrentStatusFilter}
            width="w-[140px]"
          />
        );
      },
      render: (value: string) => (
        <span className="text-white">
          {value}
        </span>
      )
    },
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
    <PageWrapper>
      <div className="flex flex-1">
        <main className="flex-1 bg-[#4D54640D]">
          <TopBar 
            heading="Audience Management" 
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
