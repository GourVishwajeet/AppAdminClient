import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const subscriptionData = Array(10).fill(null).map((_, idx) => ({
    userName: 'Orlando Diggs',
    avatar: 'https://i.pravatar.cc/150?img=12',
    lastPayment: '09:00:00 AM',
    paymentId: '#2345633424',
    paymentMode: idx % 2 === 0 ? 'Auto Pay' : 'Bank Transfer',
    subscription: idx % 2 === 0 ? 'True' : 'False',
    dailyActivity: '3 Hours',
    amount: '1,430',
}));

export function DashboardSubscription() {
    return (
        <div className="max-w-[1168px] mx-auto w-full page-animate flex flex-col gap-6 pb-10 font-sans">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-[20px] font-bold text-white tracking-tight">All User Transaction History</h1>
                <div className="flex items-center gap-6 text-[12px] text-[#9CA3AF]">
                    <span className="text-white font-medium cursor-pointer border-b border-white pb-1">Month</span>
                    <span className="cursor-pointer hover:text-white transition-colors">Year</span>
                    <span className="cursor-pointer hover:text-white transition-colors">All Time</span>
                </div>
            </div>

            <div className="bg-[#1C1F26] rounded-xl border border-[#23262D] overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#23262D]">
                                <th className="px-6 py-4 text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wider">Users List</th>
                                <th className="px-6 py-4 text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wider">Last Payment on</th>
                                <th className="px-6 py-4 text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wider">Payment ID</th>
                                <th className="px-6 py-4 text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wider">Payment Mode</th>
                                <th className="px-6 py-4 text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wider">Subscription</th>
                                <th className="px-6 py-4 text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wider">Daily Activity</th>
                                <th className="px-6 py-4 text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wider">Total Amount</th>
                                <th className="px-6 py-4 text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wider">Rewards</th>
                                <th className="px-6 py-4 text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wider text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#23262D]">
                            {subscriptionData.map((item, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0">
                                                <img src={item.avatar} alt={item.userName} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-[#FFFFFF] text-[13px] font-medium">{item.userName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#9CA3AF] text-[13px]">{item.lastPayment}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#9CA3AF] text-[13px]">{item.paymentId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#9CA3AF] text-[13px]">{item.paymentMode}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#9CA3AF] text-[13px]">{item.subscription}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#9CA3AF] text-[13px]">{item.dailyActivity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#FFFFFF] text-[13px] font-semibold">{item.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="flex items-center gap-2 bg-[#23262D] hover:bg-[#2D3039] text-white text-[12px] px-3 py-1.5 rounded-lg transition-all border border-white/5 group-hover:border-white/20 whitespace-nowrap">
                                            Download
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-3 text-[#9CA3AF]">
                                            <Eye size={18} className="cursor-pointer hover:text-white transition-colors" />
                                            <Pencil size={18} className="cursor-pointer hover:text-white transition-colors" />
                                            <Trash2 size={18} className="cursor-pointer hover:text-red-400 transition-colors" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                <div className="border-t border-[#23262D] px-6 py-4 flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((page) => (
                        <div
                            key={page}
                            className={`w-10 h-10 flex items-center justify-center text-[13px] border border-[#23262D] group cursor-pointer hover:bg-white/5 transition-all
                            ${page === 1 ? 'bg-white/5 text-white' : 'text-[#9CA3AF]'}`}
                        >
                            {page}
                        </div>
                    ))}
                    <div className="w-10 h-10 flex items-center justify-center border border-[#23262D] cursor-pointer hover:bg-white/5 transition-all text-[#9CA3AF]">
                        <ChevronLeft size={16} />
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center border border-[#23262D] cursor-pointer hover:bg-white/5 transition-all text-[#9CA3AF]">
                        <ChevronRight size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
}
