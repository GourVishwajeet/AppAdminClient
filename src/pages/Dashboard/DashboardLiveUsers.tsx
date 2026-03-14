import { Eye, Edit2, Ban, Trash2 } from 'lucide-react';

const liveUsersData = Array(8).fill({
    user: 'Orlando Diggs',
    avatar: 'https://i.pravatar.cc/150?img=15',
    userId: '#2345633424',
    traffic: '11.43k',
    callMinutes: '10.35 min',
    startTime: '09:00:00 AM',
    endTime: '09:10:35 AM',
    date: '02/02/26',
    rewards: '54',
    status: 'up' // or 'down'
}).map((item, index) => ({
    ...item,
    status: index % 3 === 0 ? 'down' : 'up' // Make some traffic red going down based on screenshot
}));

export function DashboardLiveUsers() {
    return (
        <div className="flex flex-col gap-[28px] w-[1168px] h-[816px] mx-auto mt-[12px]">
            <div className="bg-[#FFFFFF]/5 rounded-2xl p-6 w-full flex-1 overflow-auto flex flex-col">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-white text-sm font-semibold tracking-tight">Live Users</h2>
                    <div className="flex items-center gap-6 text-[11px] text-gray-500">
                        <span className="text-white font-medium cursor-pointer border-b border-white pb-1">Month</span>
                        <span className="hover:text-white cursor-pointer transition-colors pb-1">Year</span>
                        <span className="hover:text-white cursor-pointer transition-colors pb-1">All Time</span>
                    </div>
                </div>

                <table className="w-full text-left whitespace-nowrap">
                    <thead>
                        <tr className="text-gray-500 border-b border-white/5">
                            <th className="font-medium text-[11px] pb-4 pl-1 opacity-60 uppercase tracking-wider">Live user</th>
                            <th className="font-medium text-[11px] pb-4 opacity-60 uppercase tracking-wider">User ID</th>
                            <th className="font-medium text-[11px] pb-4 opacity-60 uppercase tracking-wider">Traffic</th>
                            <th className="font-medium text-[11px] pb-4 opacity-60 uppercase tracking-wider">Call minutes</th>
                            <th className="font-medium text-[11px] pb-4 opacity-60 uppercase tracking-wider">Start time</th>
                            <th className="font-medium text-[11px] pb-4 opacity-60 uppercase tracking-wider">End time</th>
                            <th className="font-medium text-[11px] pb-4 opacity-60 uppercase tracking-wider">Date</th>
                            <th className="font-medium text-[11px] pb-4 opacity-60 uppercase tracking-wider">Rewards</th>
                            <th className="font-medium text-[11px] pb-4 text-center opacity-60 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                        {liveUsersData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="py-3.5 pl-1">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-white/10">
                                            <img src={row.avatar} alt={row.user} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-white text-[13px] font-medium tracking-tight">{row.user}</span>
                                    </div>
                                </td>
                                <td className="py-3.5 text-gray-500 text-[12px] tabular-nums opacity-80">{row.userId}</td>
                                <td className="py-3.5">
                                    <div className="flex items-center gap-3">
                                        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="opacity-80">
                                            {row.status === 'up' ? (
                                                <path d="M1 9L6 4L11 8L20 1" stroke="#BAEDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            ) : (
                                                <path d="M1 3L6 8L11 4L20 11" stroke="#F1EEFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            )}
                                        </svg>
                                        <span className="text-white text-[12px] font-medium">{row.traffic}</span>
                                    </div>
                                </td>
                                <td className="py-3.5 text-gray-500 text-[12px] tabular-nums opacity-80">{row.callMinutes}</td>
                                <td className="py-3.5 text-gray-400 text-[12px] tabular-nums">{row.startTime}</td>
                                <td className="py-3.5 text-gray-400 text-[12px] tabular-nums">{row.endTime}</td>
                                <td className="py-3.5 text-gray-500 text-[12px] tabular-nums opacity-80">{row.date}</td>
                                <td className="py-3.5">
                                    <span className="text-gray-400 text-[12px] border-b border-dashed border-gray-700/50 pb-0.5">{row.rewards}</span>
                                </td>
                                <td className="py-3.5">
                                    <div className="flex items-center justify-center gap-4 text-gray-600">
                                        <Eye className="w-3.5 h-3.5 cursor-pointer hover:text-white transition-colors" />
                                        <Edit2 className="w-3.5 h-3.5 cursor-pointer hover:text-white transition-colors" />
                                        <Ban className="w-3.5 h-3.5 cursor-pointer hover:text-white transition-colors" />
                                        <Trash2 className="w-3.5 h-3.5 cursor-pointer hover:text-red-400 transition-colors" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-1.5 mt-2 mb-6">
                <button className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-all">
                    <span className="text-sm">‹</span>
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                    <button
                        key={page}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] transition-all ${page === 1
                            ? 'bg-white/10 text-white font-semibold border border-white/10 shadow-sm'
                            : 'text-gray-500 hover:text-white border border-transparent hover:bg-white/5'
                            }`}
                    >
                        {page}
                    </button>
                ))}
                <button className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-all">
                    <span className="text-sm">›</span>
                </button>
            </div>
        </div>
    );
}
