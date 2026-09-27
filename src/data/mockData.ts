import { PeerGroup } from '../types';

export const PEER_GROUPS: PeerGroup[] = [
  { id: 'g1', title: 'Placement Pressure Circle', description: 'For students navigating placement season stress.', members: 4 },
  { id: 'g2', title: 'Adjusting to College Life', description: 'Peer support for first & second years settling in.', members: 6 },
  { id: 'g3', title: 'Managing Academic Stress', description: 'Share strategies, vent, and support each other.', members: 5 },
  { id: 'g4', title: 'Commute & Daily Life', description: 'Chat about balancing travel time with everything else.', members: 3 },
];

export const MATCH_NAMES = ['Aditi', 'Riya', 'Mehak', 'Kavya', 'Ishita', 'Naina', 'Simran'];
export const TRANSPORT_OPTIONS = ['Metro', 'Bus', 'Auto', 'Cab', 'E-rickshaw', 'Metro + Auto', 'Metro + Cab', 'Walking + Metro', 'Other'];
export const BRANCHES = ['CSE', 'IT', 'ECE', 'AI & DS', 'ECE-VLSI'];
export const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export const KNOWLEDGE_BASE = [
  { service: 'Counselling Centre', description: 'One-on-one and group counselling support.', availability: 'Mon-Sat, 9am-5pm', access: 'Book via StudentWell or walk in.' },
  { service: 'Financial Aid', description: 'Scholarship and fee-related assistance.', availability: 'Mon-Fri, 10am-4pm', access: 'Raise a case via Resolve an Issue.' },
  { service: 'Academic Support', description: 'Attendance, workload and academic planning help.', availability: 'Mon-Fri, 9am-5pm', access: 'Contact via department or StudentWell.' },
];
