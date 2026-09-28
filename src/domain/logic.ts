// Approximate commute corridors for prototype matching, not an official transit routing graph.
export const corridors: Record<string,string[]> = {
 'Janakpuri West':['janakpuri','rajouri','rajiv','chandni','kashmere'],
 'Janakpuri':['janakpuri','rajouri','rajiv','chandni','kashmere'],
 'Uttam Nagar':['uttam','janakpuri','rajouri','rajiv','chandni','kashmere'],
 'Dwarka':['dwarka','uttam','janakpuri','rajouri','rajiv','chandni','kashmere'],
 'Rajouri Garden':['rajouri','rajiv','chandni','kashmere'],
 'Rohini':['rohini','pitampura','inderlok','kashmere'],
 'Pitampura':['pitampura','inderlok','kashmere'],
 'Noida':['noida','yamuna','rajiv','chandni','kashmere'],
 'Kashmere Gate':['kashmere'], 'IGDTUW':['campus'], 'Chandni Chowk':['chandni','kashmere'],
 'Rajiv Chowk':['rajiv','chandni','kashmere']
};
export const areas=Object.keys(corridors);
export function routePath(from:string,to:string):string[]{
 const start=corridors[from],end=corridors[to];if(!start||!end)return [];
 if(from===to)return start.slice(0,1);
 const meeting=start.find(x=>end.includes(x));
 if(meeting)return [...start.slice(0,start.indexOf(meeting)+1),...end.slice(0,end.indexOf(meeting)).reverse()];
 return [...start,...end.slice().reverse()];
}
const minutes=(t:string)=>{const [h,m]=t.split(':').map(Number);return h*60+m;};
export function matchRoute(a:{from:string;to:string;date:string;time:string;transport:string},b:{from:string;to:string;date:string;time:string;transport:string}){
 const pa=routePath(a.from,a.to),pb=routePath(b.from,b.to);
 const ea=pa.slice(1).map((v,i)=>pa[i]+'>'+v),eb=new Set(pb.slice(1).map((v,i)=>pb[i]+'>'+v));
 const overlap=ea.length?Math.round(ea.filter(e=>eb.has(e)).length/ea.length*100):0;
 const timeGap=Math.abs(minutes(a.time)-minutes(b.time));
 const sameDay=a.date===b.date;
 const compatibleTransport=a.transport.split(' + ').some(t=>b.transport.includes(t));
 return {overlap,timeGap,sameDay,compatibleTransport,compatible:sameDay&&overlap>=25&&timeGap<=45&&compatibleTransport,score:Math.round(overlap*.7+Math.max(0,30-timeGap))};
}
export const themes=['Academic pressure','Feeling overwhelmed','Homesickness','Loneliness','Social pressure','Placement stress','College adjustment'];
export function localAnalysis(text:string){
 const t=text.toLowerCase();const found:string[]=[];
 if(/exam|assignment|class|academic|grade|study|studies/.test(t))found.push(themes[0]);
 if(/overwhelm|stress|anxious|anxiety|pressure|too much/.test(t))found.push(themes[1]);
 if(/homesick|miss home|family|parents/.test(t))found.push(themes[2]);
 if(/lonely|alone|isolated|no friends/.test(t))found.push(themes[3]);
 if(/friend|relationship|breakup|social/.test(t))found.push(themes[4]);
 if(/placement|interview|job|internship/.test(t))found.push(themes[5]);
 if(/first year|new college|adjust|fresh/.test(t))found.push(themes[6]);
 const highRisk=/suicid|self.harm|kill myself|end my life|hurt myself|don't want to live|do not want to live/.test(t);
 return {themes:found,feeling:found.length?'You may be looking for support with '+found[0].toLowerCase()+'.':'There is room here for what you are feeling.',reflection:'This is a local keyword suggestion, not an AI assessment or medical diagnosis. You can choose or change the themes yourself.',source:'local' as const,highRisk};
}
export function moderate(text:string){
 if(!text.trim()||text.length>2000)return {allowed:false,reason:'Please write between 1 and 2,000 characters.'};
 if(/[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:\+?\d[\s().-]*){10,}|\b(?:house|flat|apartment)\s*(?:no\.?\s*)?\d/i.test(text))return {allowed:false,reason:'Keep contact details and exact addresses out of shared messages.'};
 if(/kill you|rape|doxx?|nudes|go die|hate you|send money|free crypto|\b(?:idiot|slut|bitch)\b/i.test(text))return {allowed:false,reason:'This message needs human review. It has not been shared. Please keep the conversation safe and respectful.'};
 if(/https?:\/\//i.test(text))return {allowed:false,reason:'Links are disabled in prototype conversations to reduce spam and scams.'};
 return {allowed:true,reason:''};
}
export function canCreateCircle(optedInIds:string[],selfOptedIn:boolean){return selfOptedIn&&new Set(optedInIds).size>=10;}
