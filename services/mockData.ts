import { ContentItem, ContentCategory, ContentStatus, StaffMember, ScheduleSlot, RevenueData, DigitalMetric, TrainingCourse } from '../types.ts';

// Realistic Ghanaian Names
const firstNames = ['Kwame', 'Nana', 'Kofi', 'Ama', 'Yaw', 'Akosua', 'Kojo', 'Abena', 'Kwabena', 'Afia', 'Kweku', 'Yaa', 'Kwesi', 'Akua', 'Emmanuel', 'Samuel', 'Joseph', 'Mary', 'John', 'Grace', 'Michael', 'Esther'];
const lastNames = ['Mensah', 'Osei', 'Appiah', 'Boateng', 'Asamoah', 'Owusu', 'Antwi', 'Sarpong', 'Acheampong', 'Boakye', 'Fosu', 'Ansah', 'Darko', 'Nyarko', 'Opoku', 'Kyei', 'Baffour', 'Dankwa', 'Sowah', 'Addo', 'Tetteh', 'Quaye'];

const generateName = () => {
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

const programTitles = [
    "Adekye Nsroma (Morning Show)", 
    "United Showbiz", 
    "Real News with Akrobeto", 
    "UTV News Bulletin (Midday)", 
    "UTV News Bulletin (Prime)",
    "Heritage Ghana", 
    "Mpu Ne Mpu", 
    "Dawuro", 
    "Premotobre Kasee", 
    "Decision 2024", 
    "Ghana's Most Beautiful (Rerun)", 
    "Sports Highlights", 
    "Telenovela: Wild Flower", 
    "Telenovela: Blood Sisters", 
    "Gospel Hour", 
    "Friday Night Live",
    "Showbiz Ultimate",
    "Health Matters",
    "Agro Ne Fom",
    "My Health My Life"
];

export const mockContent: ContentItem[] = Array.from({ length: 50 }, (_, i) => {
  const categories = Object.values(ContentCategory);
  const statuses = Object.values(ContentStatus);
  const category = categories[Math.floor(Math.random() * categories.length)];
  const titleBase = programTitles[Math.floor(Math.random() * programTitles.length)];
  
  return {
    id: `C-${1000 + i}`,
    title: `${titleBase}`,
    category: category,
    duration: Math.floor(Math.random() * 90) + 30,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    producer: generateName(),
    rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
    views: Math.floor(Math.random() * 800000) + 50000,
    lastAired: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toLocaleDateString(),
    thumbnail: `https://picsum.photos/seed/${1000+i}/300/200`
  };
});

const roles = ['Senior Producer', 'Anchor', 'Reporter', 'Camera Operator', 'Sound Engineer', 'Video Editor', 'Content Strategist', 'Technical Director', 'Broadcast Technician', 'Makeup Artist', 'Floor Manager'];
const depts = ['News', 'Production', 'Operations', 'Engineering', 'Digital Media', 'Creative Arts'];

export const mockStaff: StaffMember[] = Array.from({ length: 40 }, (_, i) => ({
  id: `S-${200 + i}`,
  name: generateName(),
  role: roles[Math.floor(Math.random() * roles.length)],
  department: depts[Math.floor(Math.random() * depts.length)],
  status: Math.random() > 0.85 ? 'On Leave' : Math.random() > 0.75 ? 'Shift' : 'Active',
  avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i % 50}.jpg`
}));

// Generate a full weekly schedule
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const startHour = 6;
const endHour = 20; // 8pm
export const mockSchedule: ScheduleSlot[] = [];
let slotIdCounter = 1;

days.forEach(day => {
    for (let h = startHour; h <= endHour; h++) {
        // Leave some gaps for realism (15% chance of empty slot)
        if (Math.random() > 0.15) { 
             const program = mockContent[Math.floor(Math.random() * mockContent.length)];
             mockSchedule.push({
                 id: `${slotIdCounter++}`,
                 day: day,
                 time: `${h}:00`,
                 programId: program.id,
                 programTitle: program.title,
                 type: Math.random() > 0.3 ? 'Live' : 'Recorded'
             });
        }
    }
});

export const revenueData: RevenueData[] = [
  { month: 'Jan', tvAds: 45000, digitalAds: 12000, sponsorships: 25000 },
  { month: 'Feb', tvAds: 52000, digitalAds: 14000, sponsorships: 22000 },
  { month: 'Mar', tvAds: 48000, digitalAds: 16000, sponsorships: 30000 },
  { month: 'Apr', tvAds: 61000, digitalAds: 18000, sponsorships: 35000 },
  { month: 'May', tvAds: 55000, digitalAds: 20000, sponsorships: 28000 },
  { month: 'Jun', tvAds: 67000, digitalAds: 24000, sponsorships: 40000 },
  { month: 'Jul', tvAds: 72000, digitalAds: 28000, sponsorships: 45000 },
  { month: 'Aug', tvAds: 68000, digitalAds: 26000, sponsorships: 42000 },
];

export const viewershipData = [
  { time: '06:00', viewers: 120000 },
  { time: '07:00', viewers: 180000 },
  { time: '08:00', viewers: 250000 },
  { time: '09:00', viewers: 300000 },
  { time: '10:00', viewers: 220000 },
  { time: '11:00', viewers: 190000 },
  { time: '12:00', viewers: 350000 },
  { time: '13:00', viewers: 280000 },
  { time: '14:00', viewers: 240000 },
  { time: '15:00', viewers: 260000 },
  { time: '16:00', viewers: 320000 },
  { time: '17:00', viewers: 400000 },
  { time: '18:00', viewers: 550000 },
  { time: '19:00', viewers: 750000 },
  { time: '20:00', viewers: 900000 },
  { time: '21:00', viewers: 800000 },
  { time: '22:00', viewers: 500000 },
  { time: '23:00', viewers: 200000 },
];

export const digitalMetrics: DigitalMetric[] = [
    { platform: 'Facebook', followers: 4500000, engagement: '1.2M', growth: 2.5 },
    { platform: 'YouTube', followers: 1200000, engagement: '5.8M', growth: 5.1 },
    { platform: 'Instagram', followers: 2100000, engagement: '850k', growth: 3.2 },
    { platform: 'Twitter', followers: 980000, engagement: '2.1M', growth: 1.8 },
    { platform: 'TikTok', followers: 3500000, engagement: '12M', growth: 12.5 },
];

export const trainingCourses: TrainingCourse[] = [
    { id: 'T-101', title: 'Broadcast Ethics in Digital Age', instructor: 'Kwame S.', duration: '4h 30m', category: 'Journalism', progress: 100, thumbnail: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 'T-102', title: 'Advanced Video Editing with Premiere', instructor: 'Sarah J.', duration: '12h 15m', category: 'Technical', progress: 45, thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44c?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 'T-103', title: 'Crisis Communication', instructor: 'Dr. Mensah', duration: '2h 45m', category: 'Management', progress: 10, thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 'T-104', title: 'Lighting Techniques for Studio', instructor: 'Tech Team', duration: '6h 00m', category: 'Production', progress: 0, thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=300&h=200' },
];