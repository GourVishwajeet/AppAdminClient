import type { FC } from 'react';
import { useState } from 'react';
import editIcon from '../../assets/edit.svg';
import viewIcon from '../../assets/view.svg';
import blockIcon from '../../assets/block.svg';
import trashIcon from '../../assets/trash.svg';
import highIcon from '../../assets/high.svg';
import lowIcon from '../../assets/low.svg';
import { mockLiveUsers, type LiveUserData } from '../../constants/mockData';
import { Table, type TableColumn } from '../../components/Table';
import { TopBar } from '../../components/TopBar';
import { Pagination } from '../../components/Pagination';
import { PageWrapper } from '../../components/PageWrapper';
import { DropdownFilter } from '../../components/DropdownFilter';
import { DateRangePicker } from '../../components/DateRangePicker';
import { parse, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

export const LiveUsersList: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<LiveUserData[]>([]);

  
  const [currentCollaborationFilter, setCurrentCollaborationFilter] = useState('All');
  const [currentCountryFilter, setCurrentCountryFilter] = useState('All');
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });

  const itemsPerPage = 10;

  // Filter logic
  const filteredData = mockLiveUsers.filter(item => {
    // Search filter
    const matchesSearch = 
      item.userName.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userName.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.collaboration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.traffic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.country.toLowerCase().includes(searchTerm.toLowerCase());

    // Dropdown filters
    const matchesCollaboration = currentCollaborationFilter === 'All' || item.collaboration === currentCollaborationFilter;
    const matchesCountry = currentCountryFilter === 'All' || item.country === currentCountryFilter;

    // Date Range Filter
    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      try {
        const itemDate = parse(item.date, 'yyyy-MM-dd', new Date());
        matchesDate = isWithinInterval(itemDate, { 
          start: startOfDay(dateRange.start), 
          end: endOfDay(dateRange.end) 
        });
      } catch (error) {
        console.error("Date parsing error", error);
        matchesDate = false;
      }
    }

    return matchesSearch && matchesCollaboration && matchesCountry && matchesDate;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCheckboxChange = (checkedItems: LiveUserData[]) => {
    setSelectedItems(checkedItems);
    // Log selected items for debugging/demonstration purposes
    console.log('Selected live users:', checkedItems);
  };

  const columns: TableColumn[] = [
    {
      key: 'userName',
      label: 'User Name',
      width: 'w-[320px]',
      render: (value: LiveUserData['userName']) => (
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
    { key: 'userId', label: 'User ID', width: 'w-[130px] pl-6' },
    { 
      key: 'collaboration', 
      label: 'Collaboration', 
      className: 'pl-4',
      headerRender: (column) => {
        const uniqueCollaborations = Array.from(new Set(mockLiveUsers.map(i => i.collaboration))).sort();
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
      key: 'date', 
      label: 'Date', 
      className: 'pl-4',
      headerRender: (column) => (
        <DateRangePicker 
          label={column.label} 
          onApply={setDateRange}
        />
      )
    },
    { key: 'startTime', label: 'Start Time', className: 'pl-4' },
    { key: 'endTime', label: 'End Time', className: 'pl-4' },
    {
      key: 'traffic',
      label: 'Traffic',
      className: 'pl-4',
      render: (value: LiveUserData['traffic'], row: LiveUserData) => {
        const seedSource = row.userId || row.userName?.name || value || '';
        const seed = Array.from(seedSource).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
        const useHigh = seed % 2 === 0;
        const icon = useHigh ? highIcon : lowIcon;

        return (
          <div className="flex items-center gap-2">
            <img
              src={icon}
              alt="Traffic icon"
              className="w-4 h-4"
            />
            <span>{value}</span>
          </div>
        );
      }
    },
    { 
      key: 'country', 
      label: 'Country', 
      className: 'pl-4',
      headerRender: (column) => {
        const uniqueCountries = Array.from(new Set(mockLiveUsers.map(i => i.country))).sort();
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
            heading="Live Users List" 
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
