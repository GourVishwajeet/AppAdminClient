import { useState, type FC } from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { TopBar } from '../../components/TopBar';
import { Table, type TableColumn } from '../../components/Table';
import { platformUserMockData } from '../../constants/mockData';
import { Pagination } from '../../components/Pagination';
import plusIcon from '../../assets/pluscolor.svg';

export const UserManagement: FC = () => {
    const [activeTab, setActiveTab] = useState<'All Users' | 'Streamers' | 'Viewers' | 'Banned'>('All Users');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const stats = [
        { label: 'Total Users', value: '128,540', trend: '+12%', trendColor: 'text-[#00FF00]' },
        { label: 'Active Subs', value: '38,920', trend: '+5.4%', trendColor: 'text-[#00FF00]' },
        { label: 'Premium Users', value: '12,450', trend: '0%', trendColor: 'text-[#888888]' },
        { label: 'Banned Users', value: '324', trend: '+2', trendColor: 'text-[#FF0000]' },
        { label: 'Reported Users', value: '1,284', trend: '-8%', trendColor: 'text-[#00FF00]' },
    ];

    const columns: TableColumn[] = [
        {
            key: 'user',
            label: 'User Info',
            render: (value: any) => (
                <div className="flex items-center gap-3">
                    <img src={value.avatar} alt={value.name} className="w-10 h-10 rounded-full border border-[#2A2A2A]" />
                    <div className="min-w-[120px]">
                        <div className="text-[14px] font-medium text-white">{value.name}</div>
                        <div className="text-[11px] text-[#888888]">ID: {value.id}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'role',
            label: 'Role',
            render: (value: string) => (
                <span className={`px-4 py-1.5 rounded-full text-[12px] font-medium inline-block min-w-[80px] text-center ${value === 'Streamer' ? 'bg-[#8000FF1A] text-[#8000FF]' :
                    value === 'Viewer' ? 'bg-[#FF00911A] text-[#FF0091]' :
                        'bg-[#00D1FF1A] text-[#00D1FF]'
                    }`}>
                    {value}
                </span>
            )
        },
        {
            key: 'subscription',
            label: 'Subscription',
            render: (value: string) => (
                <span className={`px-3 py-1 rounded-md text-[11px] font-bold border inline-block min-w-[60px] text-center ${value === 'VIP' ? 'border-[#FFD700] text-[#FFD700] bg-[#FFD7000D]' :
                    value === 'PREM' ? 'border-[#8000FF] text-[#8000FF] bg-[#8000FF0D]' :
                        'border-[#888888] text-[#888888] bg-[#8888880D]'
                    }`}>
                    {value}
                </span>
            )
        },
        {
            key: 'revenue',
            label: 'Revenue',
            render: (value: string) => <span className="text-white font-medium">{value}</span>
        },
        { key: 'watchTime', label: 'Watch Time' },
        { key: 'rewards', label: 'Rewards' },
        {
            key: 'status',
            label: 'Status',
            render: (value: string) => (
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${value === 'Active' ? 'bg-[#00FF00]' :
                        value === 'Offline' ? 'bg-[#888888]' :
                            value === 'Suspended' ? 'bg-[#FFA500]' :
                                'bg-[#FF0000]'
                        }`} />
                    <span className="text-[13px] text-white">{value}</span>
                </div>
            )
        }
    ];

    const filteredData = platformUserMockData.filter(item => {
        if (activeTab === 'All Users') return true;
        if (activeTab === 'Streamers') return item.role === 'Streamer';
        if (activeTab === 'Viewers') return item.role === 'Viewer';
        if (activeTab === 'Banned') return item.status === 'Banned';
        return true;
    });

    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <PageWrapper>
            <TopBar heading="All Platform Users" />

            <div className="px-6 space-y-6 pb-10">
                {/* Stats Row */}
                <div className="grid grid-cols-5 gap-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[16px] p-5">
                            <div className="text-[13px] text-[#888888] font-medium mb-1">{stat.label}</div>
                            <div className="flex items-end justify-between">
                                <div className="text-[20px] font-bold text-white leading-none">{stat.value}</div>
                                <div className={`text-[11px] font-bold ${stat.trendColor}`}>{stat.trend}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-[#111111] border border-[#2A2A2A] rounded-[20px] overflow-hidden">
                    {/* Table Header */}
                    <div className="flex items-center justify-between px-6 pt-6 pb-0 border-b border-[#2A2A2A]">
                        <div className="flex items-center gap-8">
                            {(['All Users', 'Streamers', 'Viewers', 'Banned'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => {
                                        setActiveTab(tab);
                                        setCurrentPage(1);
                                    }}
                                    className={`text-[14px] font-medium pb-4 border-b-2 transition-colors ${activeTab === tab ? 'text-white border-[#8000FF]' : 'text-[#888888] border-transparent hover:text-white'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <button className="flex items-center gap-2 px-6 py-2 bg-[linear-gradient(117.65deg,#8000FF_13.26%,#FF0091_67.19%)] rounded-[10px] text-white text-[13px] font-bold hover:opacity-90 transition-opacity mb-4">
                            <img src={plusIcon} alt="Add" className="w-4 h-4 brightness-200" />
                            Add New
                        </button>
                    </div>

                    {/* Table */}
                    <div className="p-0">
                        <Table
                            columns={columns}
                            data={paginatedData}
                            showCheckbox
                            rowKey="user.id"
                            className="bg-transparent border-none shadow-none"
                        />
                    </div>

                    {/* Pagination */}
                    <div className="border-t border-[#2A2A2A] p-6 bg-[#0A0A0A]">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
                            totalItems={filteredData.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};
