import { Bug, User, Radio } from 'lucide-react';

const notifications = [
    { icon: Bug, iconBg: 'bg-[#E3F5FF]', iconColor: 'text-[#1C1C1C]', user: 'You', action: 'have a bug that needs...', time: 'Just now' },
    { icon: User, iconBg: 'bg-[#E5ECF6]', iconColor: 'text-[#1C1C1C]', user: 'New user registered', action: '', time: '59 minutes ago' },
    { icon: Bug, iconBg: 'bg-[#E3F5FF]', iconColor: 'text-[#1C1C1C]', user: 'You', action: 'have a bug that needs...', time: '12 hours ago' },
    { icon: Radio, iconBg: 'bg-[#E5ECF6]', iconColor: 'text-[#1C1C1C]', user: 'Andi Lane', action: 'subscribed to you', time: 'Today, 11:59 AM' },
];

const activityList = [
    { user: 'You', action: 'have a bug that needs...', time: 'Just now', avatar: 'https://i.pravatar.cc/150?img=68' },
    { user: 'Released a new version', action: '', time: '59 minutes ago', avatar: 'https://i.pravatar.cc/150?img=33' },
    { user: 'Submitted a bug', action: '', time: '12 hours ago', avatar: 'https://i.pravatar.cc/150?img=47' },
    { user: 'Modified A data in Page X', action: '', time: 'Today, 11:59 AM', avatar: 'https://i.pravatar.cc/150?img=11' },
    { user: 'Deleted a page in Project X', action: '', time: 'Feb 2, 2023', avatar: 'https://i.pravatar.cc/150?img=12' },
];

const topCreators = [
    { name: 'Natali Craig', avatar: 'https://i.pravatar.cc/150?img=5' },
    { name: 'Drew Cano', avatar: 'https://i.pravatar.cc/150?img=8' },
    { name: 'Orlando Diggs', avatar: 'https://i.pravatar.cc/150?img=15' },
    { name: 'Andi Lane', avatar: 'https://i.pravatar.cc/150?img=20' },
];

export function RightPanel() {
    return (
        <div className="w-full flex flex-col gap-6 text-[14px] font-sans">
            {/* Notifications Section */}
            <div>
                <h3 className="text-[#FFFFFF] text-[14px] font-semibold mb-6 tracking-tight">Notifications</h3>
                <div className="flex flex-col gap-6">
                    {notifications.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="flex gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.iconBg} ${item.iconColor}`}>
                                    <Icon size={16} strokeWidth={2} />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[#FFFFFF] text-[13px] leading-tight">
                                        {item.user} <span className="text-[#9CA3AF] opacity-80">{item.action}</span>
                                    </p>
                                    <p className="text-[#9CA3AF] text-[11px] mt-1 font-medium">{item.time}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Activities Section */}
            <div>
                <h3 className="text-[#FFFFFF] text-[14px] font-semibold mb-6 tracking-tight mt-4">Activities</h3>
                <div className="flex flex-col gap-6">
                    {activityList.map((item, index) => (
                        <div key={index} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[#23262D]">
                                <img src={item.avatar} alt="avatar" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[#FFFFFF] text-[13px] leading-tight">
                                    {item.user} <span className="text-[#9CA3AF] opacity-80">{item.action}</span>
                                </p>
                                <p className="text-[#9CA3AF] text-[11px] mt-1 font-medium">{item.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contacts Section */}
            <div>
                <h3 className="text-[#FFFFFF] text-[14px] font-semibold mb-6 tracking-tight mt-4">Top creators</h3>
                <div className="flex flex-col gap-4">
                    {topCreators.map((creator, index) => (
                        <div key={index} className="flex items-center gap-3 cursor-pointer hover:bg-[#1C1F26] p-2 rounded-lg -mx-2 transition-colors">
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[#23262D]">
                                <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[#FFFFFF] text-[13px] font-medium">{creator.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
