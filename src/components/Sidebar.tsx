import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
import notificationsIcon from '../assets/notifications.svg';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: dashboardIcon },
  { id: 'activity', label: 'Activity', icon: notificationsIcon },
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
  { id: 'user-management', label: 'All Platform Users' },
  { id: 'top-influencer', label: 'Top Influencer' },
  { id: 'audience-management', label: 'Audience Management' },
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
  | 'dashboard'
  | 'top-influencer'
  | 'user-profile'
  | 'user-management'
  | 'trending-posts'
  | 'reported-posts'
  | 'boosted-posts'
  | 'live-users'
  | 'post-management'
  | 'story-management'
  | 'audience-management'
  | 'activity';
  setCurrentPage: (
    page:
      | 'dashboard'
      | 'top-influencer'
      | 'user-profile'
      | 'user-management'
      | 'trending-posts'
      | 'reported-posts'
      | 'boosted-posts'
      | 'live-users'
      | 'post-management'
      | 'story-management'
      | 'audience-management'
      | 'activity',
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
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 96 : 212 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      className="relative z-50 h-[1024px] border-r border-[#ffffff1a] pt-[20px] px-[16px] pb-[20px] gap-[16px] bg-[#000000] text-[#dcdcdc] flex flex-col"
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
            <motion.button
              key={item.id}
              type="button"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
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
                  if (item.id === 'activity') {
                    setCurrentPage('activity');
                  } else if (item.id === 'dashboard') {
                    setCurrentPage('dashboard');
                  }
                }
              }}
              className={
                'relative flex items-center gap-3 px-4 h-11 text-sm font-medium transition-colors cursor-pointer rounded-xl ' +
                (isActive ? 'bg-[#1a1a1a]' : 'bg-transparent! hover:bg-[#ffffff05]!')
              }
            >
              {isActive && (
                <motion.span
                  layoutId="active-indicator"
                  className="absolute left-0 top-2 h-7 w-[4px] bg-[linear-gradient(117.65deg,#8000FF_35%,#FF0091_67.19%)] rounded-full"
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
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-left"
                >
                  {item.label}
                </motion.span>
              )}
              {showArrow && (
                <span className="flex items-center justify-center w-6 h-6 ml-auto">
                  <img
                    src={arrowRightIcon}
                    alt="Section navigation"
                    className={
                      'w-[20px] h-[20px] object-contain ' +
                      (isActive ? '' : 'grayscale opacity-60')
                    }
                  />
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>
      <AnimatePresence>
        {activeId === 'audience' && isAudienceOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute top-[74px] left-full h-auto w-[250px] bg-[#000000] text-[#dcdcdc] shadow-2xl rounded-r-2xl border-y border-r border-white/10 z-50"
          >
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
                <motion.button
                  key={subItem.id}
                  type="button"
                  whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
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
                    'relative flex items-center justify-between px-6 h-11 text-sm font-medium w-full text-left cursor-pointer transition-colors ' +
                    (isSubActive ? 'bg-[#1a1a1a]' : 'bg-transparent')
                  }
                >
                  <span>{subItem.label}</span>
                  <img
                    src={arrowRightIcon}
                    alt="Section navigation"
                    className={
                      'w-[20px] h-[20px] object-contain ' +
                      (isSubActive ? '' : 'grayscale opacity-60')
                    }
                  />
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
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
        onChange={(id) => {
          setActiveStoryMgmtSubId(id);
          if (id === 'all-stories') {
            setCurrentPage('story-management');
          }
        }}
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
          if (id === 'user-management') {
            setCurrentPage('user-management');
          } else if (id === 'top-influencer') {
            setCurrentPage('top-influencer');
          } else if (id === 'audience-mgmt') {
            setCurrentPage('user-profile');
          } else if (id === 'audience-management') {
            setCurrentPage('audience-management');
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
    </motion.aside>
  );
}
