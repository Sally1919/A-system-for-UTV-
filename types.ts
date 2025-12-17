export enum ContentCategory {
  NEWS = 'News',
  ENTERTAINMENT = 'Entertainment',
  DRAMA = 'Drama',
  SPORTS = 'Sports',
  RELIGIOUS = 'Religious',
  DOCUMENTARY = 'Documentary'
}

export enum ContentStatus {
  IN_PRODUCTION = 'In Production',
  SCHEDULED = 'Scheduled',
  AIRED = 'Aired',
  ARCHIVED = 'Archived'
}

export interface ContentItem {
  id: string;
  title: string;
  category: ContentCategory;
  duration: number; // minutes
  status: ContentStatus;
  producer: string;
  rating: number; // 1-5
  views: number;
  lastAired: string;
  thumbnail: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Shift';
  avatar: string;
}

export interface Metric {
  label: string;
  value: string | number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
}

export interface ScheduleSlot {
  id: string;
  day: string;
  time: string;
  programId: string;
  programTitle?: string;
  type: 'Live' | 'Recorded';
}

export interface RevenueData {
  month: string;
  tvAds: number;
  digitalAds: number;
  sponsorships: number;
}

export interface DigitalMetric {
  platform: 'Facebook' | 'Twitter' | 'Instagram' | 'YouTube' | 'TikTok';
  followers: number;
  engagement: string;
  growth: number;
}

export interface TrainingCourse {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  category: string;
  progress: number; // 0-100
  thumbnail: string;
}