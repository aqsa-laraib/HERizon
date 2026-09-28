import React,{createContext,useContext,useState,ReactNode} from 'react';
import type {Profile,Store,Page,Peer,Connection,Message} from '../domain/models';
import {initialStore} from '../domain/models';
import {service} from '../services/api';
export const uid=()=>crypto.randomUUID();
export const stamp=()=>new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
interface Context {profile:Profile|null;login:(p:Profile)=>void;logout:()=>void;page:Page;go:(p:Page)=>void;state:Store;change:(fn:(s:Store)=>Store)=>void;notice:(text:string)=>void;request:(peer:Peer,kind:'peer'|'travel',route?:string)=>void;respond:(id:string,status:Connection['status'])=>void;send:(id:string,text:string)=>Promise<string>;block:(id:string)=>void;report:(target:string,reason:string)=>void;toast:string;}
const Ctx=createContext<Context|null>(null);
export function useHerizon(){const value=useContext(Ctx);if(!value)throw new Error('Provider missing');return value;}
export default function HerizonProvider({children}:{children:ReactNode}){
 const [profile,setProfile]=useState<Profile|null>(null),[page,setPage]=useState<Page>('home'),[state,setState]=useState<Store>(initialStore),[toast,setToast]=useState('');
 const change=(fn:(s:Store)=>Store)=>setState(fn);
 const notice=(text:string)=>{setToast(text);setState(s=>({...s,notices:s.notifications?[{id:uid(),text,read:false},...s.notices].slice(0,30):s.notices}));};
 const go=(p:Page)=>{setPage(p);setToast('');window.scrollTo({top:0,behavior:'instant'});};
 const login=(p:Profile)=>{setProfile(p);go('home');};
 const logout=()=>{setProfile(null);setState(initialStore());setPage('home');setToast('');};
 const request=(peer:Peer,kind:'peer'|'travel',route?:string)=>{
  if(state.blocked.includes(peer.id))return;
  if(state.connections.some(c=>c.peer.id===peer.id&&c.kind===kind&&['pending','accepted'].includes(c.status))){go('messages');return;}
  setState(s=>({...s,connections:[{id:uid(),peer,kind,route,status:'pending',messages:[],created:stamp()},...s.connections]}));notice('Request saved. A conversation opens only after both people agree.');
 };
 const respond=(id:string,status:Connection['status'])=>{setState(s=>({...s,connections:s.connections.map(c=>c.id===id?{...c,status}:c)}));notice(status==='accepted'?'Sample recipient accepted. Your demo conversation is open.':`Connection ${status}.`);};
 const send=async(id:string,text:string)=>{
  const result=await service.moderate(text);if(!result.allowed)return result.reason;
  const connection=state.connections.find(c=>c.id===id);if(!connection||connection.status!=='accepted'||state.blocked.includes(connection.peer.id))return 'This conversation is not open.';
  const message:Message={id:uid(),sender:profile?.nickname||'Student',text:text.trim(),time:stamp()};
  setState(s=>({...s,connections:s.connections.map(c=>c.id===id&&c.status==='accepted'?{...c,messages:[...c.messages,message]}:c)}));return '';
 };
 const block=(id:string)=>{setState(s=>({...s,blocked:[...new Set([...s.blocked,id])],connections:s.connections.map(c=>c.peer.id===id?{...c,status:'blocked'}:c)}));notice('Blocked. Their content is hidden and conversations are closed.');};
 const report=(target:string,reason:string)=>{if(!reason.trim())return;setState(s=>({...s,reports:[{id:uid(),target,reason:reason.trim(),time:stamp(),status:'Local draft'},...s.reports]}));notice('Report recorded locally. No live moderation team is connected to this prototype.');};
 return <Ctx.Provider value={{profile,login,logout,page,go,state,change,notice,request,respond,send,block,report,toast}}>{children}</Ctx.Provider>;
}
