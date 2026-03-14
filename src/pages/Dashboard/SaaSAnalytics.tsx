import { ArrowUpRight, ArrowDownRight, Activity, User, CreditCard, MoreHorizontal, MessageSquare, Heart, Share2, Eye } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// SaaS Statistics Cards
const saasCardData = [
    { title: 'Profile visit', value: '721K', change: '+11.01%', isPositive: true, bgColor: 'bg-[#E3F5FF]' },
    { title: 'Followers', value: '367K', change: '-0.03%', isPositive: false, bgColor: 'bg-[#E5ECF6]' },
    { title: 'Posts', value: '1,156', change: '+15.03%', isPositive: true, bgColor: 'bg-[#E3F5FF]' },
    { title: 'Live streaming', value: '239K', change: '+6.08%', isPositive: true, bgColor: 'bg-[#F7F9FB]' },
];

export function SaaSTopCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 font-sans">
            {saasCardData.map((card, index) => (
                <div
                    key={index}
                    className={`${card.bgColor} text-gray-900 rounded-xl p-5 flex flex-col justify-between min-h-[110px] transition-all duration-300 hover:scale-[1.02] shadow-sm`}
                >
                    <div className="text-[13px] font-medium text-gray-600 tracking-tight">{card.title}</div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="text-[22px] font-bold tracking-tight text-[#000000]">{card.value}</div>
                        <div className="flex items-center text-[11px] gap-0.5 font-medium">
                            <span className="text-gray-700">
                                {card.change}
                            </span>
                            {card.isPositive ? (
                                <ArrowUpRight size={14} className="text-gray-800" />
                            ) : (
                                <ArrowDownRight size={14} className="text-gray-800" />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Heatmap Data for Traffic by Creators
const heatmapData = [
    { day: 'Mon', hours: [30, 20, 10, 40, 50, 40, 30] },
    { day: 'Tue', hours: [20, 40, 50, 30, 20, 10, 20] },
    { day: 'Wed', hours: [10, 20, 30, 50, 40, 20, 10] },
    { day: 'Thu', hours: [40, 30, 20, 10, 20, 50, 40] },
    { day: 'Fri', hours: [50, 40, 30, 20, 10, 20, 30] },
    { day: 'Sat', hours: [20, 10, 20, 30, 40, 30, 20] },
    { day: 'Sun', hours: [10, 20, 10, 20, 30, 40, 10] },
];

const getHeatmapColor = (val: number) => {
    if (val >= 50) return '#BAEDBD';
    if (val >= 30) return '#C1E2F4';
    return '#1C1F26';
};

export function SaasHeatmap() {
    return (
        <div className="bg-[#1C1F26] rounded-xl p-6 border border-[#23262D] flex-1">
            <h3 className="text-[#FFFFFF] text-[15px] font-semibold mb-6 flex items-center justify-between">
                Traffic by Creators
                <div className="flex items-center gap-4 text-[11px] font-normal text-[#9CA3AF]">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#1C1F26] border border-[#23262D]"></div> 0-10k</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#C1E2F4]"></div> 10k-100k</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#BAEDBD]"></div> 100k+</span>
                </div>
            </h3>
            <div className="flex flex-col gap-2">
                {heatmapData.map((row) => (
                    <div key={row.day} className="flex items-center gap-3">
                        <span className="text-[11px] text-[#9CA3AF] w-8">{row.day}</span>
                        <div className="flex-1 flex gap-1.5">
                            {row.hours.map((val, i) => (
                                <div
                                    key={i}
                                    style={{ backgroundColor: getHeatmapColor(val) }}
                                    className="h-6 flex-1 rounded-[4px] border border-white/5"
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Age & Gender Demographic
const demographicData = [
    { range: '18 - 25 years', male: 25, female: 35 },
    { range: '25 - 35 years', male: 45, female: 55 },
    { range: '35 - 45 years', male: 30, female: 25 },
    { range: '45+ years', male: 15, female: 10 },
];

export function SaasDemographics() {
    return (
        <div className="bg-[#1C1F26] rounded-xl p-6 border border-[#23262D] w-[320px] shrink-0">
            <h3 className="text-[#FFFFFF] text-[15px] font-semibold mb-6 flex items-center justify-between">
                Age & Gender Demographic
                <div className="flex items-center gap-3 text-[11px] font-normal text-[#9CA3AF]">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#FFFFFF]"></div> Male</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#A8C5DA]"></div> Female</span>
                </div>
            </h3>
            <div className="space-y-6">
                {demographicData.map((item) => (
                    <div key={item.range} className="space-y-2">
                        <div className="text-[12px] text-[#9CA3AF]">{item.range}</div>
                        <div className="h-1.5 w-full bg-[#23262D] rounded-full flex overflow-hidden">
                            <div style={{ width: `${item.male}%` }} className="h-full bg-white opacity-40"></div>
                            <div style={{ width: `${item.female}%` }} className="h-full bg-[#A8C5DA]"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Recent Content Insights
const contentInsights = [
    { title: 'Golden Hour in Bali', type: 'Travel', date: 'April 24, 2024 • 6:30 PM', views: '12,434', comments: '2,210', likes: '143', shares: '287', hearts: '309' },
    { title: 'Golden Hour in Bali', type: 'Travel', date: 'April 24, 2024 • 6:30 PM', views: '12,434', comments: '2,210', likes: '143', shares: '287', hearts: '309' },
    { title: 'Golden Hour in Bali', type: 'Travel', date: 'April 24, 2024 • 6:30 PM', views: '12,434', comments: '2,210', likes: '143', shares: '287', hearts: '309' },
    { title: 'Golden Hour in Bali', type: 'Travel', date: 'April 24, 2024 • 6:30 PM', views: '12,434', comments: '2,210', likes: '143', shares: '287', hearts: '309' },
    { title: 'Golden Hour in Bali', type: 'Travel', date: 'April 24, 2024 • 6:30 PM', views: '12,434', comments: '2,210', likes: '143', shares: '287', hearts: '309' },
];

export function SaasContentInsights() {
    return (
        <div className="bg-[#1C1F26] rounded-xl p-6 border border-[#23262D] mt-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#FFFFFF] text-[15px] font-semibold">Recent Content Insights</h3>
                <div className="flex items-center gap-3">
                    <button className="text-[12px] text-[#9CA3AF] hover:text-white transition-colors">Follow</button>
                    <button className="text-[12px] text-[#9CA3AF] hover:text-white transition-colors">Hire Me</button>
                    <MoreHorizontal className="w-5 h-5 text-[#9CA3AF] cursor-pointer" />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {contentInsights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 py-3 border-b border-[#23262D] last:border-0 group cursor-pointer hover:bg-white/5 rounded-lg px-2 -mx-2 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-[#23262D] flex-shrink-0 overflow-hidden">
                            <img src={`https://picsum.photos/seed/${idx+100}/100/100`} alt="thumb" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[#FFFFFF] text-[14px] font-medium truncate">{item.title}</h4>
                            <p className="text-[#9CA3AF] text-[12px]"><span className="text-[#C1E2F4]">{item.type}</span> • {item.date}</p>
                        </div>
                        <div className="flex items-center gap-6 text-[#9CA3AF]">
                            <div className="flex items-center gap-1.5"><Eye size={14} /> <span className="text-[12px]">{item.views}</span></div>
                            <div className="flex items-center gap-1.5"><MessageSquare size={14} /> <span className="text-[12px]">{item.comments}</span></div>
                            <div className="flex items-center gap-1.5"><Heart size={14} /> <span className="text-[12px]">{item.likes}</span></div>
                            <div className="flex items-center gap-1.5"><Share2 size={14} /> <span className="text-[12px]">{item.shares}</span></div>
                            <div className="flex items-center gap-1.5"><Activity size={14} /> <span className="text-[12px]">{item.hearts}</span></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Marketing & SEO Bar Chart
const marketingData = [
    { name: 'Jan', value: 30 }, { name: 'Feb', value: 45 }, { name: 'Mar', value: 35 },
    { name: 'Apr', value: 50 }, { name: 'May', value: 40 }, { name: 'Jun', value: 60 },
    { name: 'Jul', box: 70 }, { name: 'Aug', value: 55 }, { name: 'Sep', value: 48 },
    { name: 'Oct', value: 65 }, { name: 'Nov', value: 58 }, { name: 'Dec', value: 45 },
];

export function SaasMarketingChart() {
    return (
        <div className="bg-[#1C1F26] rounded-xl p-6 border border-[#23262D] mt-6">
            <h3 className="text-[#FFFFFF] text-[15px] font-semibold mb-8">Marketing & SEO</h3>
            <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketingData}>
                        <CartesianGrid vertical={false} stroke="#ffffff" strokeOpacity={0.03} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} ticks={[0, 10, 20]} tickFormatter={(v) => `${v}M`} />
                        <Bar dataKey="value" fill="#A8C5DA" radius={[4, 4, 0, 0]} barSize={32} />
                        <Bar dataKey="box" fill="#FFFFFF" radius={[4, 4, 0, 0]} barSize={32} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

// Main SaaS Analytics Component
export function SaaSAnalytics() {
    return (
        <div className="max-w-[1168px] mx-auto w-full page-animate flex flex-col gap-0 pb-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-[20px] font-bold text-white tracking-tight">Today</h1>
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1C1C1C] overflow-hidden">
                                <img src={`https://i.pravatar.cc/150?img=${i + 20}`} alt="User" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <SaaSTopCards />

            <div className="flex gap-6">
                <SaasHeatmap />
                <SaasDemographics />
            </div>

            <SaasContentInsights />
            <SaasMarketingChart />
        </div>
    );
}

// SaaS Right Panel (Already defined but refined)
export function SaaSRightPanel() {
    return (
        <div className="w-full flex flex-col gap-8 text-[14px] font-sans">
            <div>
                <h3 className="text-[#FFFFFF] text-[15px] font-semibold mb-6 tracking-tight">Notifications</h3>
                <div className="space-y-6">
                    {notifications.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="flex gap-4 group cursor-pointer">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.iconBg} ${item.iconColor} transition-transform group-hover:scale-110`}>
                                    <Icon size={16} strokeWidth={2.5} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[#FFFFFF] text-[13px] leading-snug group-hover:text-blue-400">
                                        {item.user} <span className="text-[#9CA3AF]">{item.action}</span>
                                    </p>
                                    <p className="text-[#9CA3AF] text-[11px] mt-1 opacity-60 font-medium">{item.time}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                <h3 className="text-[#FFFFFF] text-[15px] font-semibold mb-6 tracking-tight mt-2">Activities</h3>
                <div className="space-y-6">
                    {activityList.map((item, index) => (
                        <div key={index} className="flex gap-4 group cursor-pointer">
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/10 group-hover:scale-110 transition-transform">
                                <img src={item.avatar} alt="avatar" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <p className="text-[#FFFFFF] text-[13px] leading-snug group-hover:text-blue-400">
                                    {item.user} <span className="text-[#9CA3AF]">{item.action}</span>
                                </p>
                                <p className="text-[#9CA3AF] text-[11px] mt-1 opacity-60 font-medium">{item.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-[#FFFFFF] text-[15px] font-semibold mb-6 tracking-tight mt-2">Top creators</h3>
                <div className="space-y-4">
                    {[
                        { name: 'Natali Craig', avatar: 'https://i.pravatar.cc/150?img=10' },
                        { name: 'Drew Cano', avatar: 'https://i.pravatar.cc/150?img=11' },
                        { name: 'Orlando Diggs', avatar: 'https://i.pravatar.cc/150?img=12' },
                        { name: 'Andi Lane', avatar: 'https://i.pravatar.cc/150?img=13' },
                    ].map((creator, index) => (
                        <div key={index} className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg -mx-2 transition-all group">
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/10 group-hover:border-blue-500">
                                <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[#FFFFFF] text-[13px] font-medium group-hover:text-blue-400">{creator.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const notifications = [
    { user: 'You', action: 'fixed a bug that needs...', time: 'Just now', icon: Activity, iconBg: 'bg-[#E3F5FF]', iconColor: 'text-blue-500' },
    { user: 'New user registered', action: '', time: '59 minutes ago', icon: User, iconBg: 'bg-[#E5ECF6]', iconColor: 'text-gray-600' },
    { user: 'You have a bug that needs...', action: '', time: '12 hours ago', icon: Activity, iconBg: 'bg-[#E3F5FF]', iconColor: 'text-blue-500' },
    { user: 'Andi Lane subscribed to you', action: '', time: 'Today, 11:59 AM', icon: CreditCard, iconBg: 'bg-[#E5ECF6]', iconColor: 'text-gray-600' },
];

const activityList = [
    { user: 'You fixed a bug that needs...', action: '', time: 'Just now', avatar: 'https://i.pravatar.cc/150?img=1' },
    { user: 'Released a new version', action: '', time: '59 minutes ago', avatar: 'https://i.pravatar.cc/150?img=2' },
    { user: 'Submitted a bug', action: '', time: '12 hours ago', avatar: 'https://i.pravatar.cc/150?img=3' },
    { user: 'Modified a data in Page X', action: '', time: 'Today, 11:59 AM', avatar: 'https://i.pravatar.cc/150?img=4' },
    { user: 'Deleted a page in Project X', action: '', time: 'Feb 2, 2023', avatar: 'https://i.pravatar.cc/150?img=5' },
];
