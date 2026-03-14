import { useState } from 'react';
import { TopCards } from './TopCards';
import { Charts } from './Charts';
import { DashboardSidebar, DashboardHeader } from './DashboardLayout';
import { DashboardLiveUsers } from './DashboardLiveUsers';
import { RightPanel } from './RightPanel';
import { SaaSAnalytics, SaaSRightPanel } from './SaaSAnalytics';
import { DashboardSubscription } from './DashboardSubscription';

export function Dashboard() {
    const [activeMenu, setActiveMenu] = useState('Default');

    const handleBackToMain = () => {
        window.location.reload();
    };

    const isSaaS = activeMenu === 'User Profile' || ['Overview', 'Subscription', 'Campaigns', 'Content'].includes(activeMenu);

    return (
        <div className={`flex h-screen w-full ${isSaaS ? 'bg-[#1C1C1C]' : 'bg-[#0E0F12]'} text-white overflow-hidden font-sans transition-colors duration-300`}>
            <DashboardSidebar
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                onBackToMain={handleBackToMain}
            />
            <div className={`flex-1 flex flex-col h-full overflow-hidden relative min-w-0 ${isSaaS ? 'bg-[#1C1C1C]' : 'bg-[#0E0F12]'}`}>
                <DashboardHeader activeMenu={activeMenu} />

                <div className="flex flex-1 overflow-hidden">
                    <div className="flex-1 h-full px-8 py-8 overflow-y-auto">
                        {activeMenu === 'Live Users' ? (
                            <div className="page-animate">
                                <DashboardLiveUsers />
                            </div>
                        ) : activeMenu === 'Subscription' ? (
                            <div className="page-animate">
                                <DashboardSubscription />
                            </div>
                        ) : activeMenu === 'User Profile' || activeMenu === 'Overview' ? (
                            <div className="page-animate">
                                <SaaSAnalytics />
                            </div>
                        ) : (
                            <div className="max-w-[1228px] mx-auto w-full page-animate flex flex-col gap-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h1 className="text-[20px] font-semibold flex items-center gap-3 cursor-pointer hover:text-gray-300 transition-colors tracking-tight">
                                        Today <span className="text-gray-600 text-[10px]">▼</span>
                                    </h1>
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#000] overflow-hidden">
                                                    <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-[12px] text-gray-500 ml-2">4+</span>
                                    </div>
                                </div>

                                <TopCards />
                                <Charts />
                            </div>
                        )}
                    </div>
                    {activeMenu !== 'Live Users' && activeMenu !== 'Subscription' && (
                        <div className={`w-[300px] ${isSaaS ? 'bg-[#1C1C1C]' : 'bg-[#0E0F12]'} border-l border-[#23262D] p-5 overflow-y-auto shrink-0 transition-all duration-300 xl:block hidden font-sans`}>
                            {isSaaS ? <SaaSRightPanel /> : <RightPanel />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
