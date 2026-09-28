import React,{useEffect} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import HerizonProvider,{useHerizon} from './context/HerizonContext';
import Onboarding from './screens/Onboarding';
import Frame from './screens/Frame';
import ChooseSpace from './screens/ChooseSpace';
import Travel from './screens/Travel';
import Wellbeing from './screens/Wellbeing';
import Discover from './screens/Discover';
import Messages from './screens/Messages';
import MySpace from './screens/MySpace';
import Privacy from './screens/Privacy';
import Safety from './screens/Safety';
import Communities from './screens/Communities';
function Shell(){const {profile,page}=useHerizon();const reduced=useReducedMotion();useEffect(()=>{for(const key of Object.keys(sessionStorage))if(key.startsWith('herizon:'))sessionStorage.removeItem(key);},[]);if(!profile)return <Onboarding/>;const views={home:<ChooseSpace/>,travel:<Travel/>,wellbeing:<Wellbeing/>,discover:<Discover/>,messages:<Messages/>,space:<MySpace/>,privacy:<Privacy/>,safety:<Safety/>,community:<Communities/>};return <Frame><AnimatePresence mode="wait"><motion.div key={page} initial={{opacity:0,y:reduced?0:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced?0:.18}}>{views[page]}</motion.div></AnimatePresence></Frame>}
export default function App(){return <HerizonProvider><Shell/></HerizonProvider>}
