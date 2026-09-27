import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Auth from './components/Auth';
import Layout from './components/Layout';
import Home from './components/Home';
import TravelBuddy from './components/TravelBuddy';
import TalkRelate from './components/TalkRelate';
import Resolve from './components/Resolve';
import MySupport from './components/MySupport';
import StaffOverview from './components/StaffOverview';
import StaffCases from './components/StaffCases';
import StaffCaseDetail from './components/StaffCaseDetail';

function Shell() {
  const { authenticated, view } = useApp();
  if (!authenticated) return <Auth />;

  const views: Record<string, JSX.Element> = {
    home: <Home />,
    travel: <TravelBuddy />,
    talk: <TalkRelate />,
    resolve: <Resolve />,
    mysupport: <MySupport />,
    staffOverview: <StaffOverview />,
    staffCases: <StaffCases />,
    staffCaseDetail: <StaffCaseDetail />,
  };

  return <Layout>{views[view] ?? <Home />}</Layout>;
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
