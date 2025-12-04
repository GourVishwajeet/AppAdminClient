import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { TopInfluencers } from './pages/TopInfluencers'
import { UserProfile } from './pages/Users/UserProfile'
import { TrendingPosts } from './pages/TrendingPosts'
import { ReportPostList } from './pages/Users/ReportPostList'
import { BoostedPost } from './pages/BoostedPost'
import { LiveUsersList } from './pages/Users/LiveUsersList'
import { PostManagement } from './pages/PostManagement'
import { useState } from 'react'

function App() {
  const [currentPage, setCurrentPage] = useState<
    | 'top-influencer'
    | 'user-profile'
    | 'trending-posts'
    | 'reported-posts'
    | 'boosted-posts'
    | 'live-users'
    | 'post-management'
  >('top-influencer')

  const renderPage = () => {
    switch (currentPage) {
      case 'user-profile':
        return <UserProfile />
      
      case 'trending-posts':
        return <TrendingPosts />
      
      case 'reported-posts':
        return <ReportPostList />

      case 'boosted-posts':
        return <BoostedPost />

      case 'live-users':
        return <LiveUsersList />

      case 'post-management':
        return <PostManagement />
      
      case 'top-influencer':
      default:
        return <TopInfluencers />
    }
  }

  return (
    <div className="h-screen overflow-auto flex flex-col bg-black text-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 bg-neutral-950">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App
