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
import { motion, AnimatePresence } from 'framer-motion'
import { StoryManagement } from './pages/StoryManagment'
import { AudienceManagement } from './pages/Users/AudienceManagment'
import { Activity } from './pages/Activity'
import { PageWrapper } from './components/PageWrapper'
import { UserManagement } from './pages/Users/UserManagement'

import { ForgotPassword } from './pages/ForgotPassword'
import { Login } from './pages/Login'
import { OtpVerification } from './pages/OtpVerification'
import { ResetPassword } from './pages/ResetPassword'
import { EmailSentSuccess } from './pages/EmailSentSuccess'
import { Dashboard } from './pages/Dashboard'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authView, setAuthView] = useState<'login' | 'forgot-password' | 'otp-verification' | 'reset-password' | 'email-sent'>('login')
  const [resetEmail, setResetEmail] = useState('')

  const [currentPage, setCurrentPage] = useState<
    | 'dashboard'
    | 'top-influencer'
    | 'user-profile'
    | 'trending-posts'
    | 'reported-posts'
    | 'boosted-posts'
    | 'live-users'
    | 'post-management'
    | 'story-management'
    | 'audience-management'
    | 'user-management'
    | 'activity'
  >('top-influencer')

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'user-profile':
        return <UserProfile />

      case 'user-management':
        return <UserManagement />

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

      case 'story-management':
        return <StoryManagement />

      case 'audience-management':
        return <AudienceManagement />

      case 'activity':
        return <Activity />

      case 'dashboard':
        return <Dashboard />

      case 'top-influencer':
      default:
        return <TopInfluencers />
    }
  }

  if (!isAuthenticated) {
    if (authView === 'email-sent') {
      return (
        <EmailSentSuccess
          email={resetEmail}
          onResend={() => setAuthView('otp-verification')}
          onBackToLogin={() => setAuthView('login')}
        />
      )
    }

    if (authView === 'otp-verification') {
      return (
        <OtpVerification
          email={resetEmail}
          onVerify={(otp) => {
            console.log('Verifying OTP:', otp);
            // Verify OTP success
            setAuthView('reset-password');
          }}
        />
      )
    }

    if (authView === 'reset-password') {
      return (
        <ResetPassword
          onSubmit={(password) => {
            console.log('Password reset to:', password);
            alert('Password reset successful! Please login with new password.');
            setAuthView('login');
          }}
        />
      )
    }

    if (authView === 'forgot-password') {
      return (
        <ForgotPassword
          onBackToLogin={() => setAuthView('login')}
          onOtpSent={(email) => {
            setResetEmail(email)
            setAuthView('email-sent')
          }}
        />
      )
    }
    return (
      <Login
        onLogin={handleLogin}
        onForgotPassword={() => setAuthView('forgot-password')}
      />
    )
  }

  return (
    <PageWrapper>
      <div className="h-screen overflow-hidden overflow-x-auto flex flex-col bg-black text-white">
        {currentPage !== 'dashboard' && <Header />}
        <div className="flex flex-1 overflow-auto h-full w-full">
          {currentPage !== 'dashboard' && (
            <Sidebar currentPage={currentPage as any} setCurrentPage={setCurrentPage as any} />
          )}
          <main className="flex-1 relative h-full flex flex-col w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col w-full"
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </PageWrapper>
  )
}

export default App
