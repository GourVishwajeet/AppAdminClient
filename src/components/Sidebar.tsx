import { useState } from 'react';

import { ThirdLevelPanel } from './ThirdLevelPanel';

import dashboardIcon from '../assets/dashboard.svg';
import audienceIcon from '../assets/audience.svg';
import reportsIcon from '../assets/reports.svg';
import campaignsIcon from '../assets/campaigns.svg';
import templatesIcon from '../assets/templates.svg';
import automationsIcon from '../assets/automations.svg';
import configurationsIcon from '../assets/configurations.svg';
import leadsIcon from '../assets/leads.svg';
import logoutIcon from '../assets/logout.svg';
import arrowRightIcon from '../assets/arrow-right.svg';
import arrowIcon from '../assets/arrow.svg';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: dashboardIcon },
  { id: 'audience', label: 'Audience', icon: audienceIcon },
  { id: 'reports', label: 'Reports', icon: reportsIcon },
  { id: 'campaigns', label: 'Campaigns', icon: campaignsIcon },
  { id: 'templates', label: 'Templates', icon: templatesIcon },
  { id: 'automations', label: 'Automations', icon: automationsIcon },
  { id: 'configurations', label: 'Configurations', icon: configurationsIcon },
  { id: 'leads', label: 'Leads', icon: leadsIcon },
  { id: 'logout', label: 'Logout', icon: logoutIcon },
];

const audienceSubItems = [
  { id: 'users', label: 'Users Management' },
  { id: 'posts', label: 'Post Management' },
  { id: 'stories', label: 'Story Management' },
  { id: 'live', label: 'Live Management' },
];

const userManagementSubItems = [
  { id: 'top-influencer', label: 'Top Influencer' },
  { id: 'audience-mgmt', label: 'User Profile' },
];

const postManagementSubItems = [
  { id: 'all-post-list', label: 'All Post List' },
  { id: 'trending', label: 'Trending Post' },
  { id: 'boost', label: 'Boost Post List' },
  { id: 'reported', label: 'Reported Post List' },
  { id: 'blocked', label: 'Block Post List' },
];

const storyManagementSubItems = [
  { id: 'all-stories', label: 'All Story List' },
  { id: 'sponsored-stories', label: 'Sponsored Story List' },
];

const liveManagementSubItems = [
  { id: 'all-live', label: 'All Live Users' },
  { id: 'live-users', label: 'Live Users' },
];

interface SidebarProps {
  currentPage:
    | 'top-influencer'
    | 'user-profile'
    | 'trending-posts'
    | 'reported-posts'
    | 'boosted-posts'
    | 'live-users'
    | 'post-management';
  setCurrentPage: (
    page:
      | 'top-influencer'
      | 'user-profile'
      | 'trending-posts'
      | 'reported-posts'
      | 'boosted-posts'
      | 'live-users'
      | 'post-management',
  ) => void;
}

export function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const [activeId, setActiveId] = useState('audience');
  const [activeAudienceSubId, setActiveAudienceSubId] = useState('users');
  const [isAudienceOpen, setIsAudienceOpen] = useState(false);
  const [activeUserMgmtSubId, setActiveUserMgmtSubId] = useState(currentPage === 'user-profile' ? 'audience-mgmt' : 'top-influencer');
  const [isUserMgmtOpen, setIsUserMgmtOpen] = useState(false);
  const [activePostMgmtSubId, setActivePostMgmtSubId] = useState('all-posts');
  const [isPostMgmtOpen, setIsPostMgmtOpen] = useState(false);
  const [activeStoryMgmtSubId, setActiveStoryMgmtSubId] = useState('all-stories');
  const [isStoryMgmtOpen, setIsStoryMgmtOpen] = useState(false);
  const [activeLiveMgmtSubId, setActiveLiveMgmtSubId] = useState('all-live');
  const [isLiveMgmtOpen, setIsLiveMgmtOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const closeAllSubmenus = () => {
    setIsAudienceOpen(false);
    setIsUserMgmtOpen(false);
    setIsPostMgmtOpen(false);
    setIsStoryMgmtOpen(false);
    setIsLiveMgmtOpen(false);
  };

  return (
    <aside
      className={
        `relative mt-2 h-screen z-50 ${isCollapsed ? 'w-[96px]' : 'w-[250px]'} bg-[#000000] text-[#dcdcdc] flex flex-col py-4`
      }
      onMouseLeave={closeAllSubmenus}
    >
      <nav className="flex-1 flex flex-col gap-0.5 mt-3">
        {menuItems.map((item) => {
          const isActive = item.id === activeId;
          const showArrow = item.id === 'reports' || item.id === 'configurations' || item.id === 'audience';

          const openAudienceMenus = () => {
            // Open second level on hover/click of Audience (works for both collapsed and expanded)
            setActiveId('audience');
            setIsAudienceOpen(true);
          };

          return (
            <button
              key={item.id}
              type="button"
              onMouseEnter={() => {
                if (item.id === 'audience') {
                  openAudienceMenus();
                }
              }}
              onClick={() => {
                if (item.id === 'audience') {
                  // Toggle on click but ensure it's open
                  if (isAudienceOpen && activeId === 'audience') {
                    closeAllSubmenus();
                  } else {
                    openAudienceMenus();
                  }
                } else {
                  setActiveId(item.id);
                  closeAllSubmenus();
                }
              }}
              className={
                'relative flex items-center gap-3 px-4 h-11 text-sm font-medium transition-colors cursor-pointer ' +
                (isActive ? 'bg-[#1a1a1a]' : 'bg-transparent! hover:bg-transparent!')
              }
            >
              {isActive && (
                <span
                  className="absolute left-0 top-0 h-full w-[4px] bg-[linear-gradient(117.65deg,#8000FF_35%,#FF0091_67.19%)]"
                />
              )}
              <span
                className={
                  (isCollapsed ? 'w-[24px] h-[24px]' : 'w-[28px] h-[28px]') +
                  ' flex items-center justify-center'
                }
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className={
                    (isCollapsed ? 'w-[24px] h-[24px]' : 'w-[28px] h-[28px]') +
                    ' object-contain transition-transform'
                  }
                />
              </span>
              {!isCollapsed && (
                <span className="text-left">{item.label}</span>
              )}
              {showArrow && (
                <span className="flex items-center justify-center w-6 h-6">
                  <img
                    src={arrowRightIcon}
                    alt="Section navigation"
                    className={
                      'w-[24px] h-[24px] object-contain ' + 
                      (isActive ? '' : 'grayscale opacity-60')
                    }
                  />
                </span>
              )}
            </button>
          );
        })}
      </nav>
      {activeId === 'audience' && isAudienceOpen && (
        <div className="absolute top-[74px] left-full h-auto w-[250px] bg-[#000000] text-[#dcdcdc] shadow-lg z-50">
          {audienceSubItems.map((subItem) => {
            const isSubActive = subItem.id === activeAudienceSubId;

            const openThirdLevelFor = (id: string) => {
              setActiveAudienceSubId(id);
              setIsUserMgmtOpen(id === 'users');
              setIsPostMgmtOpen(id === 'posts');
              setIsStoryMgmtOpen(id === 'stories');
              setIsLiveMgmtOpen(id === 'live');
            };

            return (
              <button
                key={subItem.id}
                type="button"
                onMouseEnter={() => {
                  openThirdLevelFor(subItem.id);
                }}
                onClick={() => {
                  // Toggle behavior on click: if already open, close; otherwise open
                  if (activeAudienceSubId === subItem.id) {
                    setIsUserMgmtOpen(false);
                    setIsPostMgmtOpen(false);
                    setIsStoryMgmtOpen(false);
                    setIsLiveMgmtOpen(false);
                  } else {
                    openThirdLevelFor(subItem.id);
                  }
                }}
                className={
                  'relative flex items-center justify-between px-6 h-11 text-sm font-medium w-full text-left cursor-pointer ' +
                  (isSubActive ? 'bg-[#1a1a1a]' : 'bg-transparent hover:bg-[#1a1a1a]/60')
                }
              >
                <span>{subItem.label}</span>
                <img
                  src={arrowRightIcon}
                  alt="Section navigation"
                  className={
                    'w-[24px] h-[24px] object-contain ' +
                    (isSubActive ? '' : 'grayscale opacity-60')
                  }
                />
              </button>
            );
          })}
        </div>
      )}
      <ThirdLevelPanel
        visible={
          activeId === 'audience' &&
          isAudienceOpen &&
          activeAudienceSubId === 'posts' &&
          isPostMgmtOpen
        }
        topClass="top-[118px]"
        items={postManagementSubItems}
        activeId={activePostMgmtSubId}
        onChange={(id) => {
          setActivePostMgmtSubId(id);
          if (id === 'trending') {
            setCurrentPage('trending-posts');
          } else if (id === 'reported') {
            setCurrentPage('reported-posts');
          } else if (id === 'boost') {
            setCurrentPage('boosted-posts');
          } else if (id === 'all-post-list') {
            setCurrentPage('post-management');
          }
        }}
        isSidebarCollapsed={isCollapsed}
      />
      <ThirdLevelPanel
        visible={
          activeId === 'audience' &&
          isAudienceOpen &&
          activeAudienceSubId === 'stories' &&
          isStoryMgmtOpen
        }
        topClass="top-[162px]"
        items={storyManagementSubItems}
        activeId={activeStoryMgmtSubId}
        onChange={setActiveStoryMgmtSubId}
        isSidebarCollapsed={isCollapsed}
      />
      <ThirdLevelPanel
        visible={
          activeId === 'audience' &&
          isAudienceOpen &&
          activeAudienceSubId === 'live' &&
          isLiveMgmtOpen
        }
        topClass="top-[206px]"
        items={liveManagementSubItems}
        activeId={activeLiveMgmtSubId}
        onChange={(id) => {
          setActiveLiveMgmtSubId(id);
          if (id === 'live-users') {
            setCurrentPage('live-users');
          }
        }}
        isSidebarCollapsed={isCollapsed}
      />
      <ThirdLevelPanel
        visible={
          activeId === 'audience' &&
        isAudienceOpen &&
          activeAudienceSubId === 'users' &&
          isUserMgmtOpen
        }
        topClass="top-[74px]"
        items={userManagementSubItems}
        activeId={activeUserMgmtSubId}
        onChange={(id) => {
          setActiveUserMgmtSubId(id);
          if (id === 'top-influencer') {
            setCurrentPage('top-influencer');
          } else if (id === 'audience-mgmt') {
            setCurrentPage('user-profile');
          }
        }}
        isSidebarCollapsed={isCollapsed}
      />
      <div className="mt-auto flex justify-center mb-28">
        <button
          type="button"
          onClick={() => {
            const next = !isCollapsed;
            setIsCollapsed(next);
            if (next) {
              closeAllSubmenus();
            }
          }}
          className="w-[18px] h-[18px] flex items-center justify-center cursor-pointer"
        >
          <img
            src={arrowIcon}
            alt={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`w-[18px] h-[18px] object-contain ${isCollapsed ? '' : 'rotate-180'}`}
          />
        </button>
      </div>
    </aside>
  );
}
