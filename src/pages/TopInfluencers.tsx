import type { FC } from 'react';
import { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Table, type TableColumn } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { mockInfluencers, type InfluencerData } from '../constants/mockData';
import editIcon from '../assets/edit.svg';
import viewIcon from '../assets/view.svg';
import blockIcon from '../assets/block.svg';
import trashIcon from '../assets/trash.svg';
import { DateRangePicker } from '../components/DateRangePicker';
import { GenderPicker } from '../components/GenderPicker';
import { DropdownFilter } from '../components/DropdownFilter';
import { isWithinInterval, parse } from 'date-fns';
import { PageWrapper } from '../components/PageWrapper';

export const TopInfluencers: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentGenderFilter, setCurrentGenderFilter] = useState('All');
  const [currentCountryFilter, setCurrentCountryFilter] = useState('All');
  const [currentStatusFilter, setCurrentStatusFilter] = useState('All');
  const [dobRange, setDobRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  
  const [currentPage, setCurrentPage] = useState(1);
  const selectedKeys = new Set<string | number>(); // Removing unused state for now to fix lint or just ignore
  const [, setSelectedKeys] = useState<Set<string | number>>(new Set());
  
  const handleSelectionChange = (keys: Set<string | number>) => {
    setSelectedKeys(keys);
    console.log('Selected influencer IDs:', Array.from(keys));
  };
  
  const itemsPerPage = 10;

  // Filter data based on search, gender, country, status, and DOB
  const filteredData = mockInfluencers.filter(item => {
    const matchesSearch = 
      item.userName.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userName.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.aiUserId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobileNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGender = currentGenderFilter === 'All' || item.gender === currentGenderFilter;
    const matchesCountry = currentCountryFilter === 'All' || item.country === currentCountryFilter;
    const matchesStatus = currentStatusFilter === 'All' || item.status === currentStatusFilter;
    
    let matchesDob = true;
    if (dobRange.start && dobRange.end) {
      // Parse DD/MM/YYYY
      const dobDate = parse(item.dateOfBirth, 'dd/MM/yyyy', new Date());
      matchesDob = isWithinInterval(dobDate, { start: dobRange.start, end: dobRange.end });
    }

    return matchesSearch && matchesGender && matchesCountry && matchesStatus && matchesDob;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns: TableColumn[] = [
    {
      key: 'userName',
      label: 'User Name',
      width: 'w-[320px]',
      render: (value: InfluencerData['userName']) => (
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
    { key: 'aiUserId', label: 'AI User ID', width: 'w-[130px] pl-6' },
    { key: 'mobileNo', label: 'Mobile no.', className: 'pl-4' },
    { 
      key: 'gender', 
      label: 'Gender', 
      className: 'pl-4',
      headerRender: (column) => (
        <GenderPicker 
          label={column.label} 
          onSelect={(gender) => setCurrentGenderFilter(gender)}
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
          onApply={(range) => setDobRange(range)}
        />
      )
    },
    { 
      key: 'country', 
      label: 'Country', 
      className: 'pl-4',
      headerRender: (column) => {
        const uniqueCountries = Array.from(new Set(mockInfluencers.map(i => i.country))).sort();
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
      className: 'text-left pl-4',
      headerRender: (column) => {
        const uniqueStatuses = Array.from(new Set(mockInfluencers.map(i => i.status))).sort();
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
        <span className={`py-1 text-xs rounded-full text-white`}>
          {value}
        </span>
      )
    },
    { key: 'posts', label: 'Post', className: 'pl-4' },
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
            heading="Top Influencer" 
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
              rowKey="aiUserId"
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
