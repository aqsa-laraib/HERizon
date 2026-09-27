import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Role, ViewName, StudentProfile, TravelForm, TravelMatch, SupportCase, DeptStatus
} from '../types';
import { MATCH_NAMES } from '../data/mockData';
import { useSaved } from '../lib/storage';

interface Ctx {
  authenticated: boolean;
  profile: StudentProfile | null;
  role: Role;
  view: ViewName;
  login: (email: string) => boolean;
  logout: () => void;
  completeProfile: (p: Omit<StudentProfile, 'email'>) => void;
  setRole: (r: Role) => void;
  setView: (v: ViewName) => void;

  travelForm: TravelForm;
  setTravelForm: (f: TravelForm) => void;
  matches: TravelMatch[];
  findMatches: () => void;
  connectedWith: string | null;
  connect: (name: string) => void;

  joinedGroups: string[];
  joinGroup: (id: string) => void;

  issueText: string;
  setIssueText: (t: string) => void;
  analyzing: boolean;
  analyzed: boolean;
  detectedAreas: string[];
  analyzeIssue: () => void;

  supportCase: SupportCase | null;
  createCase: () => void;
  updateDeptStatus: (key: 'counselling' | 'academic' | 'financial', status: DeptStatus) => void;
}

const AppCtx = createContext<Ctx | null>(null);

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useSaved('authenticated', false);
  const [pendingEmail, setPendingEmail] = useState('');
  const [profile, setProfile] = useSaved<StudentProfile | null>('profile', null);
  const [role, setRole] = useState<Role>('student');
  const [view, setView] = useState<ViewName>('home');

  const [travelForm, saveTravelForm] = useSaved<TravelForm>('travel', {
    from: 'Janakpuri West', to: 'Kashmere Gate', time: '08:00', transport: 'Metro'
  });
  const [matches, setMatches] = useState<TravelMatch[]>([]);
  const [connectedWith, setConnectedWith] = useState<string | null>(null);

  function setTravelForm(form: TravelForm) {
    saveTravelForm(form);
    setMatches([]);
    setConnectedWith(null);
  }

  const [joinedGroups, setJoinedGroups] = useSaved<string[]>('groups', []);

  const [issueText, saveIssueText] = useState(
    "I've been really overwhelmed with college lately. I've missed some classes because of it, and my scholarship hasn't come through either. I don't know who I should talk to."
  );
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [detectedAreas, setDetectedAreas] = useState<string[]>([]);
  const [supportCase, setSupportCase] = useSaved<SupportCase | null>('case', null);

  function setIssueText(text: string) { saveIssueText(text); setAnalyzed(false); }

  function logout() {
    setAuthenticated(false);
    setProfile(null);
    setSupportCase(null);
    setJoinedGroups([]);
    setMatches([]);
    setConnectedWith(null);
    setRole('student');
    setView('home');
    setIssueText('');
    setAnalyzed(false);
    for (const key of Object.keys(sessionStorage)) if (key.startsWith('herizon:chat:')) sessionStorage.removeItem(key);
  }

  function login(email: string) {
    const ok = /^[^\s@]+@igdtuw\.ac\.in$/i.test(email.trim());
    if (ok) setPendingEmail(email.trim().toLowerCase());
    return ok;
  }

  function completeProfile(p: Omit<StudentProfile, 'email'>) {
    setProfile({ ...p, email: pendingEmail });
    setAuthenticated(true);
  }

  function findMatches() {
    const { from, to, time, transport } = travelForm;
    const picks = MATCH_NAMES.slice(0, 3);
    const [hours, minutes] = time.split(':').map(Number);
    const departure = Number.isFinite(hours + minutes) ? hours * 60 + minutes : 480;
    const formatTime = (offset: number) => { const m = (departure + offset + 1440) % 1440; return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`; };
    const generated: TravelMatch[] = picks.map((name, i) => ({
      name,
      route: i === 1 ? `${from.split(' ')[0]} -> ${to}` : `${from} -> ${to}`,
      transport: i === 1 ? `${transport} + Auto` : transport,
      time: formatTime(i === 0 ? 0 : i === 1 ? 15 : -5),
      routeOverlap: 'High',
      timeOverlap: i === 2 ? 'Medium' : 'High',
      transportMatch: i !== 1,
    }));
    setMatches(generated);
    setConnectedWith(null);
  }

  function connect(name: string) {
    setConnectedWith(name);
  }

  function joinGroup(id: string) {
    setJoinedGroups((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function analyzeIssue() {
    if (!issueText.trim()) return;
    setAnalyzing(true);
    setAnalyzed(false);
    setTimeout(() => {
      const text = issueText.toLowerCase();
      const areas: string[] = [];
      if (/overwhelm|stress|anxious|lonely|mental|pressure/.test(text)) areas.push('Wellbeing');
      if (/class|attendance|academic|exam|assignment|missed/.test(text)) areas.push('Academic');
      if (/scholarship|fee|financial|money|payment/.test(text)) areas.push('Financial');
      setDetectedAreas(areas.length ? areas : ['Wellbeing', 'Academic', 'Financial']);
      setAnalyzing(false);
      setAnalyzed(true);
    }, 1200);
  }

  function createCase() {
    const now = new Date();
    const t = (mins: number) => {
      const d = new Date(now.getTime() + mins * 60000);
      return d.toTimeString().slice(0, 5);
    };
    const areas = detectedAreas;
    const newCase: SupportCase = {
      id: `SW-${Date.now().toString().slice(-6)}`,
      priority: 'Medium',
      overall: 'Active',
      areas,
      summary: issueText.trim(),
      departments: [
        { key: 'counselling', label: 'Counselling', assignee: 'Counsellor', task: 'Initial support session', status: areas.includes('Wellbeing') ? 'In Progress' : 'Pending' },
        { key: 'academic', label: 'Academic Support', assignee: 'Academic Advisor', task: 'Review attendance / workload', status: areas.includes('Academic') ? 'In Progress' : 'Pending' },
        { key: 'financial', label: 'Financial Aid', assignee: 'Finance Officer', task: 'Investigate scholarship payment', status: 'Pending' },
      ],
      timeline: [
        { time: t(0), text: 'Request submitted' },
        { time: t(0), text: `Keyword matching suggested ${areas.length} support areas: ${areas.join(', ')}` },
        { time: t(0), text: 'Demo case created locally. No department has been contacted.' },
      ],
    };
    setSupportCase(newCase);
  }

  function updateDeptStatus(key: 'counselling' | 'academic' | 'financial', status: DeptStatus) {
    setSupportCase((prev) => {
      if (!prev) return prev;
      const departments = prev.departments.map((d) => (d.key === key ? { ...d, status } : d));
      const allDone = departments.every((d) => d.status === 'Completed');
      const now = new Date().toTimeString().slice(0, 5);
      const label = departments.find((d) => d.key === key)?.label ?? key;
      return {
        ...prev,
        departments,
        overall: allDone ? 'Resolved' : 'Active',
        timeline: [...prev.timeline, { time: now, text: `${label} team updated task -> ${status}` }],
      };
    });
  }

  const value: Ctx = {
    authenticated, profile, role, view,
    login, logout, completeProfile, setRole, setView,
    travelForm, setTravelForm, matches, findMatches, connectedWith, connect,
    joinedGroups, joinGroup,
    issueText, setIssueText, analyzing, analyzed, detectedAreas, analyzeIssue,
    supportCase, createCase, updateDeptStatus,
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}
