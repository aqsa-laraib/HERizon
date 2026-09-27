import React, {useEffect, useRef} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
export const STATIONS: Record<string,[number,number]> = {'Janakpuri West':[28.6295,77.0778],'Kashmere Gate':[28.6675,77.2282],'Rajiv Chowk':[28.6328,77.2197],'Dwarka Sector 21':[28.5523,77.0583],'Hauz Khas':[28.5433,77.2066],'Noida Sector 62':[28.627,77.373],'Rohini West':[28.7149,77.1155],'Vishwavidyalaya':[28.695,77.2146],'Chandni Chowk':[28.6589,77.2305]};
export default function CommuteMap({from='Janakpuri West',to='Kashmere Gate',compact=false}:{from?:string;to?:string;compact?:boolean}) {
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!ref.current)return;
  const map=L.map(ref.current,{scrollWheelZoom:false}).setView([28.63,77.19],11);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',maxZoom:19}).addTo(map);
  const points: L.LatLngTuple[]=[];
  Object.entries(STATIONS).forEach(([name,point])=>{
   const chosen=name===from||name===to;
   const marker=L.circleMarker(point,{radius:chosen?9:5,color:chosen?'#7052b8':'#8e9691',fillColor:chosen?'#7052b8':'#fff',fillOpacity:1,weight:2}).addTo(map);
   marker.bindTooltip(name,{direction:'top'});
   const content=document.createElement('div');content.textContent=`${name}${name===from?' · Your start':name===to?' · Your destination':''}`;marker.bindPopup(content);
   if(chosen)points.push(point);
  });
  if(points.length===2){L.polyline(points,{color:'#8166b5',weight:3,dashArray:'7 8'}).addTo(map);map.fitBounds(L.latLngBounds(points),{padding:[45,40],maxZoom:12});}
  const observer=new ResizeObserver(()=>map.invalidateSize());observer.observe(ref.current);
  return ()=>{observer.disconnect();map.remove();};
 },[from,to]);
 return <div className={`commute-map ${compact?'compact':''}`} ref={ref} aria-label={`Map showing ${from} and ${to}`}/>;
}
