import type { FC } from 'react';
import { Table } from '../../components/Table';
import { mockActivityTableData } from '../../constants/mockData';
import lapIcon from '../../assets/lap.svg';
import comIcon from '../../assets/com.svg';

export const ActivityTableView: FC = () => {
  return (
    <Table 
      data={mockActivityTableData}
      columns={[
        {
          key: 'activityName',
          label: 'Activity Name',
          width: 'w-[250px]',
          headerRender: (col) => <span className="text-[#A9A9A9] font-medium text-[12px]">{col.label}</span>,
          render: (value: string) => (
            <div className="flex items-center h-full gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#242424] flex items-center justify-center shrink-0">
                 <img src={lapIcon} alt="" className="w-5 h-5 opacity-70"/>
              </div>
              <span className="text-white font-medium text-[14px]">{value}</span>
            </div>
          )
        },
        {
          key: 'user',
          label: 'User',
          headerRender: (col) => <span className="text-[#A9A9A9] font-medium text-[12px]">{col.label}</span>,
          render: (value: { name: string; avatar: string }) => (
            <div className="flex items-center h-full gap-2">
              <img src={value.avatar} alt="" className="w-6 h-6 rounded-full shrink-0"/>
              <span className="text-[14px] text-gray-300">{value.name}</span>
            </div>
          )
        },
        {
          key: 'status',
          label: 'Status',
          headerRender: (col) => <span className="text-[#A9A9A9] font-medium text-[12px]">{col.label}</span>,
          render: (value: string) => {
            let colorClass = 'bg-gray-500/20 text-gray-300';
            if (value === 'In Progress') colorClass = 'bg-blue-500/20 text-blue-400';
            if (value === 'Completed') colorClass = 'bg-green-500/20 text-green-400';
            if (value === 'Pending') colorClass = 'bg-yellow-500/20 text-yellow-400';
            return (
              <div className="flex items-center h-full">
                <span className={`px-3 py-1 rounded-full text-[12px] ${colorClass}`}>
                  {value}
                </span>
              </div>
            )
          }
        },
        { 
          key: 'date', 
          label: 'Date',
          headerRender: (col) => <span className="text-[#A9A9A9] font-medium text-[12px]">{col.label}</span>,
          render: (value: string) => <div className="flex items-center h-full text-[14px] text-gray-300">{value}</div>
        },
        { 
          key: 'time', 
          label: 'Time',
          headerRender: (col) => <span className="text-[#A9A9A9] font-medium text-[12px]">{col.label}</span>,
          render: (value: string) => <div className="flex items-center h-full text-[14px] text-gray-300">{value}</div>
        },
        { 
          key: 'comments', 
          label: 'Comments',
          headerRender: (col) => <span className="text-[#A9A9A9] font-medium text-[12px]">{col.label}</span>,
          render: (value: number) => (
            <div className="flex items-center h-full gap-1 text-gray-400 text-[14px]">
              <img src={comIcon} alt="" className="w-3 h-3 opacity-50"/>
              {value}
            </div>
          )
        },
        { 
          key: 'likes', 
          label: 'Likes',
          headerRender: (col) => <span className="text-[#A9A9A9] font-medium text-[12px]">{col.label}</span>,
          render: (value: string) => <div className="flex items-center h-full text-[14px] text-gray-300">{value}</div>
        },
        { 
          key: 'shared', 
          label: 'Shared',
          headerRender: (col) => <span className="text-[#A9A9A9] font-medium text-[12px]">{col.label}</span>,
          render: (value: string) => <div className="flex items-center h-full text-[14px] text-gray-300">{value}</div>
        }
      ]}
      className="bg-transparent"
    />
  );
};
