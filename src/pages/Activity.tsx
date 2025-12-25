import { useState } from 'react';
import { PageWrapper } from '../components/PageWrapper';
import kanbanIcon from '../assets/kanban.svg';
import tableIcon from '../assets/table.svg';
import listIcon from '../assets/list.svg';
import plusIcon from '../assets/plus.svg';
import filtersIcon from '../assets/filters.svg';

import { ActivitySidebar } from './ActivityComponents/ActivitySidebar';
import { ActivityHeader } from './ActivityComponents/ActivityHeader';
import { ActivityTableView } from './ActivityComponents/ActivityTableView';
import { ActivityListView } from './ActivityComponents/ActivityListView';
import { ActivityKanbanView } from './ActivityComponents/ActivityKanbanView';

export const Activity = () => {
  const [activeTab, setActiveTab] = useState('Posts');
  const [viewMode, setViewMode] = useState('Kanban');
  const [timeFilter, setTimeFilter] = useState('1 Hours (07)');
  const [activeActivityId, setActiveActivityId] = useState(2); // Default to CreativeSync Hub

  return (
    <PageWrapper className="!flex-row h-full bg-black text-white">
      {/* Left Sidebar */}
      <ActivitySidebar 
        timeFilter={timeFilter} 
        setTimeFilter={setTimeFilter} 
        activeActivityId={activeActivityId} 
        setActiveActivityId={setActiveActivityId} 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header & Tabs */}
        <ActivityHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Toolbar */}
        <div className="bg-[#9E9E9E]/18 border-t border-white">
          <div className="px-6 mb-6">
            <div className="py-4 flex items-center justify-between border-b border-[#333]">
              <div className="rounded-[8px] p-1 flex gap-1">
                {['Kanban', 'Table', 'List View'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-1.5 text-xs font-medium flex items-center gap-2 transition-colors ${
                      viewMode === mode 
                        ? 'bg-[linear-gradient(142.65deg,#8000FF_13.26%,#FF0091_67.19%)] text-[#000000] rounded-[43px] w-[98px] h-[32px] flex items-center justify-center whitespace-nowrap' 
                        : 'text-[#FFFFFF] hover:text-[#D026AC]'
                    }`}
                  >
                    {/* Icons using imported SVGs */}
                    {mode === 'Kanban' && <img src={kanbanIcon} alt="Kanban" className={`w-[14px] h-[14px] ${viewMode === mode ? '' : ''}`} />}
                    {mode === 'Table' && <img src={tableIcon} alt="Table" className={`w-[14px] h-[14px] ${viewMode === mode ? '' : ''}`} />}
                    {mode === 'List View' && <img src={listIcon} alt="List" className={`w-[14px] h-[14px] ${viewMode === mode ? '' : ''}`} />}
                    {mode}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button className="w-[150px] h-[32px] bg-[linear-gradient(142.65deg,#8000FF_13.26%,#FF0091_67.19%)] hover:bg-[#b02090] text-[#000000] text-[14px] font-italic rounded-full flex items-center justify-center gap-2 whitespace-nowrap">
                  <img src={plusIcon} alt="Plus" className="w-[14px] h-[14px]" />
                   New Comments
                </button>
                <button className="w-[77px] h-[32px] px-4 py-2 bg-[#1A1A1A] border border-[#333] hover:bg-[#222] text-white text-[14px] font-regular rounded-full flex items-center justify-center gap-2">
                  <img src={filtersIcon} alt="Filter" className="w-3 h-3" />
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Grid/Table Content */}
          <div className="p-6 pt-0">
            {viewMode === 'Table' ? (
              <ActivityTableView />
            ) : viewMode === 'List View' ? (
              <ActivityListView />
            ) : (
              <ActivityKanbanView />
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
