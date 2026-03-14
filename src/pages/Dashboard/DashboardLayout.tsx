import {
    Search,
    Sun,
    Clock as History,
    Bell,
    LayoutGrid as LayoutPanelLeft,
    LayoutDashboard,
    Activity,
    Users,
    CreditCard,
    BarChart3,
    User,
    FileText,
    Settings,
    Heart,
    Share2,
    ChevronRight,
    Star
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { NotificationPopup } from '../../components/ui/NotificationPopup';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'New Post Reported',
    message: 'A post by @Sanaya_007 has been reported for community guidelines.',
    time: '2 min ago',
    type: 'warning' as const,
    read: false
  },
  {
    id: '2',
    title: 'Post Analysis Ready',
    message: 'The performance report for your latest campaign is now available.',
    time: '45 min ago',
    type: 'success' as const,
    read: false
  },
  {
    id: '3',
    title: 'System Update',
    message: 'Server maintenance completed successfully.',
    time: '2 hours ago',
    type: 'info' as const,
    read: true
  }
];

export function DashboardSidebar({
    activeMenu,
    setActiveMenu,
    onBackToMain
}: {
    activeMenu: string;
    setActiveMenu: (menu: string) => void;
    onBackToMain: () => void
}) {
    const isSaaS = activeMenu === 'User Profile';

    return (
        <div className={`w-[212px] h-[1024px] ${isSaaS ? 'bg-[#1C1C1C]' : 'bg-[#0F1115]'} border-r border-[#23262D] flex flex-col pt-[20px] pb-[20px] px-[16px] overflow-y-auto shrink-0 transition-all duration-300 font-sans gap-[16px]`}>
            <div className="flex flex-col">
                {/* Profile Header */}
                <div className="flex items-center gap-3 px-2 mb-6 cursor-pointer hover:opacity-80 transition-opacity" onClick={onBackToMain}>
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-[#23262D] shrink-0">
                        <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[#FFFFFF] font-medium text-[14px] flex-1 tracking-tight">ByeWind</span>
                </div>

                {/* Creators Section */}
                <div className="mb-6">
                    <div className="flex px-2 gap-4 text-[14px] font-medium mb-3">
                        <span className="text-[#9CA3AF] tracking-tight">Creators</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        {[
                            { name: 'Overview', icon: <LayoutDashboard size={20} /> },
                            { name: 'Activity\'s', icon: <Activity size={20} /> }
                        ].map((item) => (
                            <motion.div
                                key={item.name}
                                whileHover={{ x: 4, backgroundColor: isSaaS ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setActiveMenu(item.name)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] cursor-pointer transition-colors duration-200 relative ${
                                    activeMenu === item.name
                                        ? `${isSaaS ? 'bg-white/10 text-white' : 'bg-[#1C1F26] text-white'} font-medium`
                                        : 'text-[#9CA3AF]'
                                }`}
                            >
                                {activeMenu === item.name && (
                                    <motion.div 
                                        layoutId="active-pill-creators"
                                        className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                                        initial={false}
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="flex items-center justify-center shrink-0">
                                    {item.icon}
                                </span>
                                <span className="tracking-tight">{item.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Dashboards Section */}
                <div className="mb-6">
                    <h3 className="px-2 text-[14px] text-[#9CA3AF] mb-2 font-medium tracking-tight">Dashboards</h3>
                    <div className="flex flex-col gap-0.5">
                        {[
                            { name: 'Default', icon: <LayoutDashboard size={20} />, hasRightArrow: false },
                            { name: 'Live Users', icon: <Users size={20} />, hasRightArrow: true },
                            { name: 'Subscription', icon: <CreditCard size={20} />, hasRightArrow: true },
                            { name: 'Traffic', icon: <BarChart3 size={20} />, hasRightArrow: true },
                        ].map((item) => (
                            <motion.div
                                key={item.name}
                                whileHover={{ x: 4, backgroundColor: isSaaS ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setActiveMenu(item.name)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] cursor-pointer relative transition-all duration-200 ${
                                    activeMenu === item.name
                                        ? `${isSaaS ? 'bg-white/10 text-white' : 'bg-[#1C1F26] text-white'} font-medium`
                                        : 'text-[#9CA3AF]'
                                }`}
                            >
                                {activeMenu === item.name && (
                                    <motion.div 
                                        layoutId="active-pill-dashboards"
                                        className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                                        initial={false}
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="flex items-center justify-center shrink-0">
                                    {item.icon}
                                </span>
                                <span className="tracking-tight flex-1">{item.name}</span>
                                {item.hasRightArrow && (
                                    <ChevronRight size={16} className="text-[#9CA3AF] shrink-0" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Pages Section */}
                <div className="mb-6">
                    <h3 className="px-2 text-[14px] text-[#9CA3AF] mb-2 font-medium tracking-tight">Pages</h3>
                    
                    <div className="flex flex-col gap-0.5">
                        <div
                            onClick={() => setActiveMenu('User Profile')}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] cursor-pointer relative transition-all duration-200 ${
                                activeMenu === 'User Profile' || ['Overview', 'Subscription', 'Campaigns', 'Content'].includes(activeMenu)
                                    ? `${isSaaS ? 'bg-white/10' : 'bg-[#1C1F26]'} text-[#FFFFFF] font-medium`
                                    : 'text-[#9CA3AF] hover:text-[#FFFFFF] hover:bg-[#1C1F26]/50'
                            }`}
                        >
                            <span className="flex items-center justify-center shrink-0">
                                <User size={20} />
                            </span>
                            <span className="tracking-tight flex-1">User Profile</span>
                            <ChevronRight size={16} className={`text-[#9CA3AF] shrink-0 transition-transform ${isSaaS ? 'rotate-90' : ''}`} />
                        </div>

                        {isSaaS && (
                            <div className="flex flex-col gap-0.5 ml-9 mt-1">
                                {['Overview', 'Subscription', 'Campaigns', 'Content'].map((subItem) => (
                                    <div
                                        key={subItem}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveMenu(subItem);
                                        }}
                                        className={`px-3 py-1.5 rounded-lg text-[13px] cursor-pointer transition-colors ${
                                            activeMenu === subItem
                                                ? 'text-[#FFFFFF] font-medium'
                                                : 'text-[#9CA3AF] hover:text-[#FFFFFF]'
                                        }`}
                                    >
                                        {subItem}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Other Links Section */}
                <div className="mb-2">
                     <div className="flex flex-col gap-0.5">
                        {[
                            { name: 'Account', icon: <Settings size={20} /> },
                            { name: 'Followers', icon: <Heart size={20} /> },
                            { name: 'Blog', icon: <FileText size={20} /> },
                            { name: 'Social', icon: <Share2 size={20} /> },
                        ].map((item) => (
                            <div key={item.name} className={`flex items-center gap-3 px-3 py-2 text-[14px] text-[#9CA3AF] hover:text-[#FFFFFF] cursor-pointer rounded-lg hover:bg-[#1C1F26] transition-colors`}>
                                <span className="flex items-center justify-center shrink-0">{item.icon}</span>
                                <span className="tracking-tight">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export function DashboardHeader({ activeMenu }: { activeMenu: string }) {
    const isSaaS = activeMenu === 'User Profile' || ['Overview', 'Subscription', 'Campaigns', 'Content'].includes(activeMenu);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const handleNotificationsClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsNotificationsOpen(!isNotificationsOpen);
    };

    return (
        <div className={`h-[64px] w-full border-b border-[#23262D] ${isSaaS ? 'bg-[#1C1C1C]' : 'bg-[#0E0F12]'} flex items-center justify-between px-7 shrink-0 z-10 transition-colors duration-300 font-sans`}>
            <div className={`flex items-center gap-4 text-[13px] text-[#FFFFFF] ${isSaaS ? 'w-1/3' : ''}`}>
                <LayoutPanelLeft className="w-[20px] h-[20px] text-[#9CA3AF] hover:text-[#FFFFFF] cursor-pointer transition-colors" />
                <Star className="w-[20px] h-[20px] text-[#9CA3AF] hover:text-[#FFFFFF] cursor-pointer transition-colors" />
                <span className="hover:text-white cursor-pointer transition-colors text-[#9CA3AF] tracking-tight">Dashboards</span>
                <span className="text-[#9CA3AF] mx-1">/</span>
                <span className="text-[#FFFFFF] font-medium tracking-tight mb-[1px]">{activeMenu}</span>
            </div>

            {isSaaS ? (
                <div className="flex-1 flex justify-center">
                    <div className="flex items-center bg-[#1C1F26]/50 border border-[#23262D] rounded-lg px-3 py-1.5 focus-within:bg-[#1C1F26] transition-all duration-200 group h-[28px] w-full max-w-[320px]">
                        <Search className="w-4 h-4 text-[#9CA3AF] mr-2 group-focus-within:text-[#FFFFFF]" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent border-none outline-none text-[13px] text-[#FFFFFF] w-full placeholder:text-[#9CA3AF]"
                        />
                        <span className="text-[#9CA3AF] text-[9px] font-mono bg-[#23262D]/50 px-1.5 py-0.5 rounded ml-2 border border-[#23262D] shrink-0">⌘ /</span>
                    </div>
                </div>
            ) : null}

            <div className={`flex items-center gap-6 ${isSaaS ? 'w-1/3 justify-end' : ''}`}>
                {!isSaaS && (
                    <div className="flex items-center bg-[#1C1F26]/50 border border-[#23262D] rounded-lg px-3 py-1.5 focus-within:bg-[#1C1F26] transition-all duration-200 group h-[28px]">
                        <Search className="w-4 h-4 text-[#9CA3AF] mr-2 group-focus-within:text-[#FFFFFF]" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent border-none outline-none text-[13px] text-[#FFFFFF] w-[130px] placeholder:text-[#9CA3AF]"
                        />
                        <span className="text-[#9CA3AF] text-[9px] font-mono bg-[#23262D]/50 px-1.5 py-0.5 rounded ml-2 border border-[#23262D]">⌘ /</span>
                    </div>
                )}

                <div className="flex items-center gap-5 text-[#9CA3AF]">
                    <Sun className="w-[20px] h-[20px] hover:text-[#FFFFFF] cursor-pointer transition-colors" />
                    <History className="w-[20px] h-[20px] hover:text-[#FFFFFF] cursor-pointer transition-colors" />
                    <div className="relative">
                        <Bell 
                            className={`w-[20px] h-[20px] cursor-pointer transition-all hover:scale-110 active:scale-95 ${isNotificationsOpen ? 'text-[#FFFFFF]' : 'hover:text-[#FFFFFF]'}`} 
                            onClick={handleNotificationsClick}
                        />
                        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 border border-[#1C1C1C]" />
                        <NotificationPopup 
                            isOpen={isNotificationsOpen} 
                            onClose={() => setIsNotificationsOpen(false)} 
                            notifications={MOCK_NOTIFICATIONS} 
                        />
                    </div>
                    <LayoutPanelLeft className="w-[20px] h-[20px] hover:text-[#FFFFFF] cursor-pointer transition-colors" />
                </div>
            </div>
        </div>
    );
}
