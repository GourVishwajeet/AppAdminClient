import user from '../assets/user-icon.svg';

export interface InfluencerData {
  userName: {
    name: string;
    email: string;
    avatar: string;
  };
  aiUserId: string;
  mobileNo: string;
  gender: string;
  dateOfBirth: string;
  country: string;
  status: string;
  posts: number;
  userTraffic: string;
  totalLikes: string;
}

export interface TrendingPostData {
  userName: {
    name: string;
    email: string;
    avatar: string;
  };
  postId: string;
  collaboration: string;
  uploadTime: string;
  trafficRatio: string;
  likeRatio: string;
  userTraffic: string;
  totalLikes: string;
}

export interface ReportedPostData {
  userName: {
    name: string;
    email: string;
    avatar: string;
  };
  postId: string;
  uploadTime: string;
  trafficRatio: string;
  likeRatio: string;
  userTraffic: string;
  reports: number;
  totalLikes: string;
}

export interface BoostedPostData {
  userName: {
    name: string;
    email: string;
    avatar: string;
  };
  postId: string;
  collaboration: string;
  uploadTime: string;
  boostPrice: string;
  boostTime: string;
  trafficRatio: string;
  userTraffic: string;
}

export interface PostManagementData {
  userName: {
    name: string;
    email: string;
    avatar: string;
  };
  postId: string;
  collaboration: string;
  uploadTime: string;
  trafficRatio: string;
  totalComments: number;
  totalLikes: string;
  reply: number;
}

export interface LiveUserData {
  userName: {
    name: string;
    email: string;
    avatar: string;
  };
  userId: string;
  collaboration: string;
  date: string;
  startTime: string;
  endTime: string;
  traffic: string;
  country: string;
}

export interface StoryManagementData {
  userName: {
    name: string;
    email: string;
    avatar: string;
  };
  storyId: string;
  collaboration: string;
  uploadTime: string;
  nonFollowers: string;
  followers: string;
  storyViewer: string;
  storyViewerChange: string;
  totalLikes: string;
}

export interface AudienceManagementData {
  userName: {
    name: string;
    email: string;
    avatar: string;
  };
  aiUserId: string;
  mobileNo: string;
  gender: string;
  dateOfBirth: string;
  country: string;
  status: string;
  post: number;
  dailyActiveTime: string;
}

export const mockInfluencers: InfluencerData[] = [
  {
    userName: { name: 'John Doe', email: 'johnsot2@gmail.com', avatar: user },
    aiUserId: 'A110030',
    mobileNo: '+91 93097 86776',
    gender: 'Male',
    dateOfBirth: '04/12/1990',
    country: 'India',
    status: 'Blacklisted',
    posts: 30,
    userTraffic: '30.5k',
    totalLikes: '10M'
  },
  {
    userName: { name: 'Jane Smith', email: 'jane.smith@gmail.com', avatar: user },
    aiUserId: 'A110031',
    mobileNo: '+1 555-0123',
    gender: 'Female',
    dateOfBirth: '08/15/1992',
    country: 'USA',
    status: 'Active',
    posts: 50,
    userTraffic: '45.2k',
    totalLikes: '8.5M'
  },
  {
    userName: { name: 'Mike Johnson', email: 'mike.j@gmail.com', avatar: user },
    aiUserId: 'A110032',
    mobileNo: '+86 138-0000-0001',
    gender: 'Male',
    dateOfBirth: '03/22/1988',
    country: 'China',
    status: 'Active',
    posts: 96,
    userTraffic: '120k',
    totalLikes: '25M'
  },
  {
    userName: { name: 'Sarah Wilson', email: 'sarah.w@gmail.com', avatar: user },
    aiUserId: 'A110033',
    mobileNo: '+7 916-123-45-67',
    gender: 'Female',
    dateOfBirth: '11/30/1991',
    country: 'Russia',
    status: 'Active',
    posts: 120,
    userTraffic: '89.7k',
    totalLikes: '15M'
  },
  {
    userName: { name: 'David Lee', email: 'david.lee@gmail.com', avatar: user },
    aiUserId: 'A110034',
    mobileNo: '+1 416-555-0198',
    gender: 'Male',
    dateOfBirth: '06/18/1989',
    country: 'Canada',
    status: 'Active',
    posts: 560,
    userTraffic: '200k',
    totalLikes: '50M'
  },
  {
    userName: { name: 'Emma Brown', email: 'emma.b@gmail.com', avatar: user },
    aiUserId: 'A110035',
    mobileNo: '+1 212-555-0143',
    gender: 'Female',
    dateOfBirth: '09/25/1993',
    country: 'US',
    status: 'Active',
    posts: 39,
    userTraffic: '28.4k',
    totalLikes: '7.2M'
  },
  {
    userName: { name: 'Alex Chen', email: 'alex.chen@gmail.com', avatar: user },
    aiUserId: 'A110036',
    mobileNo: '+81 90-1234-5678',
    gender: 'Male',
    dateOfBirth: '02/14/1990',
    country: 'Japan',
    status: 'Active',
    posts: 32,
    userTraffic: '18.9k',
    totalLikes: '4.5M'
  },
  {
    userName: { name: 'Lisa Taylor', email: 'lisa.t@gmail.com', avatar: user },
    aiUserId: 'A110037',
    mobileNo: '+61 2-9876-5432',
    gender: 'Female',
    dateOfBirth: '07/08/1991',
    country: 'Australia',
    status: 'Active',
    posts: 0,
    userTraffic: '12.3k',
    totalLikes: '2.1M'
  },
  {
    userName: { name: 'Tom Anderson', email: 'tom.a@gmail.com', avatar: user },
    aiUserId: 'A110038',
    mobileNo: '+44 20-7946-0958',
    gender: 'Male',
    dateOfBirth: '12/01/1987',
    country: 'UK',
    status: 'Active',
    posts: 78,
    userTraffic: '56.8k',
    totalLikes: '12M'
  },
  {
    userName: { name: 'Nina Patel', email: 'nina.p@gmail.com', avatar: user },
    aiUserId: 'A110039',
    mobileNo: '+91 98765-43210',
    gender: 'Female',
    dateOfBirth: '05/19/1992',
    country: 'India',
    status: 'Active',
    posts: 145,
    userTraffic: '95.4k',
    totalLikes: '22M'
  },
  {
    userName: { name: 'Carlos Rodriguez', email: 'carlos.r@gmail.com', avatar: user },
    aiUserId: 'A110040',
    mobileNo: '+34 91-123-45-67',
    gender: 'Male',
    dateOfBirth: '10/10/1988',
    country: 'Spain',
    status: 'Active',
    posts: 67,
    userTraffic: '41.2k',
    totalLikes: '9.8M'
  },
  {
    userName: { name: 'Sophie Martin', email: 'sophie.m@gmail.com', avatar: user },
    aiUserId: 'A110041',
    mobileNo: '+33 1-42-86-83-26',
    gender: 'Female',
    dateOfBirth: '04/03/1991',
    country: 'France',
    status: 'Active',
    posts: 89,
    userTraffic: '62.7k',
    totalLikes: '14.5M'
  },
  {
    userName: { name: 'Ryan Kim', email: 'ryan.k@gmail.com', avatar: user },
    aiUserId: 'A110042',
    mobileNo: '+82 2-1234-5678',
    gender: 'Male',
    dateOfBirth: '08/28/1989',
    country: 'South Korea',
    status: 'Active',
    posts: 234,
    userTraffic: '156k',
    totalLikes: '35M'
  },
  {
    userName: { name: 'Olivia Garcia', email: 'olivia.g@gmail.com', avatar: user },
    aiUserId: 'A110043',
    mobileNo: '+52 55-1234-5678',
    gender: 'Female',
    dateOfBirth: '01/15/1990',
    country: 'Mexico',
    status: 'Active',
    posts: 112,
    userTraffic: '78.9k',
    totalLikes: '18M'
  },
  {
    userName: { name: 'James Wilson', email: 'james.w@gmail.com', avatar: user },
    aiUserId: 'A110044',
    mobileNo: '+27 11-234-5678',
    gender: 'Male',
    dateOfBirth: '06/22/1987',
    country: 'South Africa',
    status: 'Active',
    posts: 45,
    userTraffic: '33.1k',
    totalLikes: '7.8M'
  }
];

export const mockTrendingPosts: TrendingPostData[] = mockInfluencers.map((influencer, index) => ({
  userName: influencer.userName,
  postId: `P${String(index + 1).padStart(3, '0')}`,
  collaboration: ['Brand X', 'Fashion Hub', 'Tech Corp', 'Beauty Plus', 'Sports Gear', 'Food Network', 'Music Studio', 'Travel Agency', 'Fitness Pro', 'Art Gallery', 'Auto World', 'Lifestyle Co'][index % 12],
  uploadTime: ['2 hours ago', '4 hours ago', '6 hours ago', '8 hours ago', '12 hours ago', '1 day ago', '1 day ago', '2 days ago', '2 days ago', '3 days ago', '3 days ago', '4 days ago'][index % 12],
  trafficRatio: ['85%', '78%', '92%', '73%', '88%', '81%', '76%', '84%', '79%', '87%', '72%', '83%'][index % 12],
  likeRatio: ['92%', '88%', '95%', '81%', '90%', '87%', '83%', '89%', '85%', '91%', '78%', '86%'][index % 12],
  userTraffic: influencer.userTraffic,
  totalLikes: influencer.totalLikes,
  reports: [5, 12, 3, 8, 15, 2, 9, 6, 11, 4, 7, 14][index % 12]
}));

export const mockReportedPosts: ReportedPostData[] = mockInfluencers.slice(0, 8).map((influencer, index) => ({
  userName: influencer.userName,
  postId: `P${String(index + 1).padStart(3, '0')}`,
  uploadTime: ['2 days ago', '1 week ago', '3 days ago', '5 days ago', '2 weeks ago', '4 days ago', '1 day ago', '6 days ago'][index],
  trafficRatio: ['85%', '78%', '92%', '73%', '88%', '81%', '76%', '84%'][index],
  likeRatio: ['92%', '88%', '95%', '81%', '90%', '87%', '83%', '89%'][index],
  userTraffic: influencer.userTraffic,
  reports: [15, 8, 23, 5, 12, 19, 7, 11][index],
  totalLikes: influencer.totalLikes
}));

export const mockBoostedPosts: BoostedPostData[] = mockInfluencers.slice(0, 10).map((influencer, index) => ({
  userName: influencer.userName,
  postId: `P${String(index + 1).padStart(3, '0')}`,
  collaboration: ['Brand X', 'Fashion Hub', 'Tech Corp', 'Beauty Plus', 'Sports Gear', 'Food Network', 'Music Studio', 'Travel Agency', 'Fitness Pro', 'Art Gallery'][index],
  uploadTime: ['2 hours ago', '4 hours ago', '6 hours ago', '8 hours ago', '12 hours ago', '1 day ago', '1 day ago', '2 days ago', '2 days ago', '3 days ago'][index],
  boostPrice: ['$50', '$75', '$100', '$125', '$150', '$200', '$175', '$90', '$110', '$85'][index],
  boostTime: ['2 hours', '4 hours', '6 hours', '8 hours ago', '12 hours', '24 hours', '18 hours', '3 hours', '5 hours', '7 hours'][index],
  trafficRatio: ['85%', '78%', '92%', '73%', '88%', '81%', '76%', '84%', '79%', '87%'][index],
  userTraffic: influencer.userTraffic
}));

export const mockPostManagement: PostManagementData[] = mockInfluencers.map((influencer, index) => ({
  userName: influencer.userName,
  postId: `P${String(index + 1).padStart(3, '0')}`,
  collaboration: [
    'Brand X', 'Fashion Hub', 'Tech Corp', 'Beauty Plus', 'Sports Gear',
    'Food Network', 'Music Studio', 'Travel Agency', 'Fitness Pro', 'Art Gallery',
    'Auto World', 'Lifestyle Co', 'Gaming Zone', 'Photo Lab', 'Video Hub'
  ][index % 15],
  uploadTime: [
    '2 hours ago', '4 hours ago', '6 hours ago', '8 hours ago', '12 hours ago',
    '1 day ago', '1 day ago', '2 days ago', '2 days ago', '3 days ago',
    '3 days ago', '4 days ago', '5 days ago', '6 days ago', '1 week ago'
  ][index % 15],
  trafficRatio: [
    '85%', '78%', '92%', '73%', '88%', '81%', '76%', '84%', '79%', '87%',
    '72%', '83%', '90%', '77%', '82%'
  ][index % 15],
  totalComments: [120, 85, 234, 67, 198, 143, 89, 256, 112, 178, 95, 203, 134, 167, 121][index % 15],
  totalLikes: influencer.totalLikes,
  reply: [12, 8, 15, 3, 21, 9, 6, 18, 11, 14, 7, 20, 10, 13, 5][index % 15]
}));

export const mockLiveUsers: LiveUserData[] = mockInfluencers.slice(0, 15).map((influencer, index) => ({
  userName: influencer.userName,
  userId: `U${String(index + 1).padStart(5, '0')}`,
  collaboration: ['Brand X', 'Fashion Hub', 'Tech Corp', 'Beauty Plus', 'Sports Gear', 'Food Network', 'Music Studio', 'Travel Agency', 'Fitness Pro', 'Art Gallery', 'Gaming Zone', 'Photo Lab', 'Video Hub', 'Social Media', 'News Portal'][index],
  date: ['2024-12-01', '2024-12-01', '2024-11-30', '2024-11-30', '2024-11-29', '2024-11-29', '2024-11-28', '2024-11-28', '2024-11-27', '2024-11-27', '2024-11-26', '2024-11-26', '2024-11-25', '2024-11-25', '2024-11-24'][index],
  startTime: ['09:00 AM', '10:30 AM', '11:45 AM', '01:00 PM', '02:15 PM', '03:30 PM', '04:45 PM', '06:00 PM', '07:15 PM', '08:30 PM', '09:45 PM', '11:00 PM', '12:15 AM', '01:30 AM', '02:45 AM'][index],
  endTime: ['10:30 AM', '12:00 PM', '01:15 PM', '02:30 PM', '03:45 PM', '05:00 PM', '06:15 PM', '07:30 PM', '08:45 PM', '10:00 PM', '11:15 PM', '12:30 AM', '01:45 AM', '03:00 AM', '04:15 AM'][index],
  traffic: ['2.5k', '3.8k', '1.2k', '4.5k', '2.9k', '5.1k', '1.8k', '3.3k', '2.1k', '4.2k', '1.5k', '2.7k', '3.6k', '1.9k', '2.4k'][index],
  country: ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'India', 'Japan', 'Brazil', 'Mexico', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway'][index]
}));

export interface CommentData {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  time: string;
  content: string;
  likes: number;
  replies?: CommentData[];
}

export const mockComments: CommentData[] = [
  {
    id: '1',
    user: { name: 'Maude Hall', avatar: user },
    time: '14 min',
    content: "That's a fantastic new app feature. You and your team did an excellent job of incorporating user testing feedback.",
    likes: 2,
    replies: [
      {
        id: '1-1',
        user: { name: 'Dianne Russell', avatar: user },
        time: '24 min',
        content: "But don't you think the timing is off because many other apps have done this even earlier, causing people to switch apps?",
        likes: 1
      },
      {
        id: '1-2',
        user: { name: 'Esther Howard', avatar: user },
        time: '26 min',
        content: "This could be due to them taking their time to release a stable version.",
        likes: 12
      }
    ]
  },
];

export const mockStoryManagement: StoryManagementData[] = mockInfluencers.map((influencer, index) => ({
  userName: influencer.userName,
  storyId: `S${String(index + 1).padStart(3, '0')}`,
  collaboration: ['Brand X', 'Fashion Hub', 'Tech Corp', 'Beauty Plus', 'Sports Gear', 'Food Network', 'Music Studio', 'Travel Agency', 'Fitness Pro', 'Art Gallery', 'Auto World', 'Lifestyle Co'][index % 12],
  uploadTime: ['2 hours ago', '4 hours ago', '6 hours ago', '8 hours ago', '12 hours ago', '1 day ago', '1 day ago', '2 days ago', '2 days ago', '3 days ago', '3 days ago', '4 days ago'][index % 12],
  nonFollowers: ['12k', '15k', '8k', '20k', '10k', '18k', '14k', '22k', '9k', '16k', '11k', '19k'][index % 12],
  followers: ['45k', '50k', '35k', '60k', '40k', '55k', '48k', '65k', '38k', '52k', '42k', '58k'][index % 12],
  storyViewer: ['57k', '65k', '43k', '80k', '50k', '73k', '62k', '87k', '47k', '68k', '53k', '77k'][index % 12],
  storyViewerChange: ['+3.5k', '-2.1k', '+1.8k', '-0.5k', '+5.2k', '-1.2k', '+2.9k', '-3.4k', '+0.9k', '-1.5k', '+4.1k', '-2.8k'][index % 12],
  totalLikes: influencer.totalLikes
}));

export const mockAudienceManagement: AudienceManagementData[] = mockInfluencers.map((influencer, index) => ({
  userName: influencer.userName,
  aiUserId: influencer.aiUserId,
  mobileNo: influencer.mobileNo,
  gender: influencer.gender,
  dateOfBirth: influencer.dateOfBirth,
  country: influencer.country,
  status: influencer.status,
  post: influencer.posts,
  dailyActiveTime: ['2h 30m', '1h 45m', '3h 15m', '4h 00m', '0h 50m', '5h 20m', '2h 10m', '1h 30m', '3h 45m', '2h 55m', '4h 30m', '1h 15m', '3h 00m', '2h 45m', '0h 30m'][index % 15]
}));
