export type Role = 'student' | 'staff';

export type ViewName =
  | 'home' | 'travel' | 'talk' | 'resolve' | 'mysupport'
  | 'staffOverview' | 'staffCases' | 'staffCaseDetail';

export interface StudentProfile {
  name: string;
  email: string;
  branch: string;
  year: string;
}

export interface TravelForm {
  from: string;
  to: string;
  time: string;
  transport: string;
}

export interface TravelMatch {
  name: string;
  route: string;
  transport: string;
  time: string;
  routeOverlap: 'High' | 'Medium';
  timeOverlap: 'High' | 'Medium';
  transportMatch: boolean;
}

export interface PeerGroup {
  id: string;
  title: string;
  description: string;
  members: number;
}

export type DeptStatus = 'Pending' | 'In Progress' | 'Completed';

export interface DepartmentTask {
  key: 'counselling' | 'academic' | 'financial';
  label: string;
  assignee: string;
  task: string;
  status: DeptStatus;
}

export interface TimelineEvent {
  time: string;
  text: string;
}

export interface SupportCase {
  id: string;
  priority: 'Low' | 'Medium' | 'High';
  overall: 'Active' | 'Resolved';
  areas: string[];
  summary: string;
  departments: DepartmentTask[];
  timeline: TimelineEvent[];
}
