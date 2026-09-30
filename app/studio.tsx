'use client';
import {useEffect,useRef,useState,useSyncExternalStore} from 'react';
import {BookOpen,CalendarDays,Check,CheckCircle2,ChevronRight,Download,Eye,EyeOff,Flame,FlaskConical,Gauge,GraduationCap,Keyboard,LayoutDashboard,MessageCircle,Mic,Pause,PenLine,PencilRuler,Play,Plus,RotateCcw,Search,ShieldCheck,Square,Target,Timer,TrendingUp,Volume2,Wrench,Accessibility,Sparkles,KeyRound,LogOut,Lock,X,ShieldAlert,ArrowLeft,ArrowUp,Crosshair,ScanEye,Zap,Layers,Quote,Microscope,Upload,Trash2,Lightbulb,ListChecks,TriangleAlert,FileText,Split,Image as ImageIcon} from 'lucide-react';
import {pilot,phases,roadmap,interruptions,behaviors,challenges,critiques,mockLoops,lessons,resources,uxDomains,uxEncyclopedia,wisdomMirrors,drillCycle} from './content';
import type {DrillTrack} from './content';
import {sharpActions,sharpRubric,rubricLevels,sharpModes,critiqueSprints,critiqueQuestions,constraintCards,metricsReps,metricsKindMeta,synthesisDrills,summaryLevels,summaryFaults,crossExamQuestions,a11yCases,a11yCategories,autopsyCases,riskLenses,weeklyRhythm,rhythmForDate,modeById,sundayRevision} from './sharpness';
import type {SharpModeId,RubricLevel,RiskLens} from './sharpness';
import {putShot,getShot,delShot,downscaleImage} from '../lib/shots';
import {getSahayakPrompts,evaluateSahayakReflection,getTopicSuggestions,getInitialSahayakMessage} from './sahayak';
import type {SahayakDialecticMode,SahayakMessage} from './sahayak';
type Entries=Record<string,any>;
// Critique Library — metadata travels through the normal entries store;
// the screenshot itself never leaves this device (see lib/shots.ts).
type LibAnswer={q:string,a:string};
type LibItem={id:string,kind:'sprint'|'wild',date:string,title:string,principle:string,note:string,surface:string,answers:LibAnswer[],hasShot:boolean};
const navigation=[['today',"Today's practice",LayoutDashboard],['speak','Speaking studio',Mic],['lab','Challenge lab',FlaskConical],['sharp','Sharpness Lab',Crosshair],['stories','My stories',BookOpen],['learn','Study & updates',BookOpen],['roadmap','60-day roadmap',CalendarDays],['review','Progress & review',TrendingUp]] as const;
const storyFields=['Product and user','Problem and why it mattered','My exact role','Evidence and assumptions','Alternatives I considered','My decision and why','Trade-off I accepted','Collaboration and disagreement','What shipped or was tested','Outcome and supporting evidence','What I cannot claim','What I would change today'];
function download(name:string,body:Blob){const u=URL.createObjectURL(body);const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),5000);}
function time(n:number){return `${Math.floor(n/60).toString().padStart(2,'0')}:${(n%60).toString().padStart(2,'0')}`;}
// On-device persisted stores (localStorage + subscription), SSR-safe via
// useSyncExternalStore. Each store also mirrors into the private practice
// entries when signed in (see load()).
function makeStore<T>(key:string,fallback:T,parse:(raw:string|null)=>T){
 const listeners=new Set<()=>void>();let cache:T|null=null;
 function read():T{if(cache===null){cache=parse(typeof localStorage!=='undefined'?localStorage.getItem(key):null);}return cache as T;}
 function write(next:T){cache=next;try{localStorage.setItem(key,JSON.stringify(next));}catch{/* storage unavailable: keep in-memory */}listeners.forEach(l=>l());}
 function subscribe(l:()=>void){listeners.add(l);return()=>{listeners.delete(l);};}
 return {read,write,subscribe};
}
type RevStatus='reviewing'|'mastered';
type StatusMap=Record<string,RevStatus>;
const emptyStatus:StatusMap={};
const emptyMap:Record<string,string>={};
function parseStatusMap(raw:string|null):StatusMap{const out:StatusMap={};if(!raw)return out;try{const o=JSON.parse(raw);if(o&&typeof o==='object'){for(const k of Object.keys(o)){if(o[k]==='reviewing'||o[k]==='mastered')out[k]=o[k];}}}catch{/* malformed storage: start fresh */}return out;}
function parseStringMap(raw:string|null):Record<string,string>{const out:Record<string,string>={};if(!raw)return out;try{const o=JSON.parse(raw);if(o&&typeof o==='object'){for(const k of Object.keys(o)){if(typeof o[k]==='string')out[k]=o[k];}}}catch{/* malformed storage: start fresh */}return out;}

function parseAnyMap(raw:string|null):Record<string,any>{const out:Record<string,any>={};if(!raw)return out;try{const o=JSON.parse(raw);if(o&&typeof o==='object')return o;}catch{}return out;}
const localEntriesStore=makeStore<Record<string,any>>('uxStudioEntries',{},parseAnyMap);
const statusStore=makeStore<StatusMap>('uxEncyStatus',emptyStatus,parseStatusMap);
const timesStore=makeStore<Record<string,string>>('uxEncyTimes',{},parseStringMap);
const doseStore=makeStore<Record<string,string>>('uxDoseLog',{},parseStringMap);
const drillStore=makeStore<Record<string,string>>('uxDrillLog',{},parseStringMap);
const sharpStore=makeStore<Record<string,string>>('uxSharpLog',{},parseStringMap);
// Sharpness Lab — one icon per practice mode, used by the mode chips and the
// Today card. Kept beside the nav so both surfaces stay in step.
const sharpIcons:Record<SharpModeId,typeof Mic>={critique:ScanEye,constraint:Zap,metrics:Gauge,synthesis:Layers,summary:Quote,crossexam:MessageCircle,a11yrepair:Accessibility,autopsy:Microscope};
const trackMeta:Record<DrillTrack,{label:string,Icon:typeof Mic}>={
 sketch:{label:'Sketch',Icon:PencilRuler},
 read:{label:'Read',Icon:BookOpen},
 observe:{label:'Observe',Icon:Eye},
 write:{label:'Write',Icon:PenLine},
 audit:{label:'Audit',Icon:Keyboard},
 measure:{label:'Measure',Icon:Gauge},
 systems:{label:'Systems',Icon:Wrench},
};
const REFRESH_MS=90*24*60*60*1000; // mastered topics decay to "Refresh" after 90 days
const anchorNow=new Date(); // page-load anchor for daily rotation & decay; reload for the next day
// Visible accessibility display controls — persisted on-device, applied as
// classes on <html> (see globals.css). Independent of OS settings.
type A11yPrefs={size:number,contrast:boolean,calm:boolean,read:boolean};
const defaultA11y:A11yPrefs={size:0,contrast:false,calm:false,read:false};
function parseA11y(raw:string|null):A11yPrefs{if(!raw)return defaultA11y;try{const o=JSON.parse(raw);return {size:o&&(o.size===1||o.size===2)?o.size:0,contrast:!!(o&&o.contrast),calm:!!(o&&o.calm),read:!!(o&&o.read)}}catch{/* malformed storage: defaults */}return defaultA11y;}
const a11yStore=makeStore<A11yPrefs>('uxA11yPrefs',defaultA11y,parseA11y);
const A11Y_SIZES=['100%','110%','125%'] as const;
function localDate(d:Date):string{return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export default function Studio(){
 const [view,setView]=useState('today'),[day,setDay]=useState(1),[short,setShort]=useState(false),[entries,setEntries]=useState<Entries>({}),[drafts,setDrafts]=useState<Entries>({}),[loaded,setLoaded]=useState(false),[error,setError]=useState(''),[signedOut,setSignedOut]=useState(false),[busy,setBusy]=useState<string[]>([]),[notice,setNotice]=useState(''),[selected,setSelected]=useState(0),[filter,setFilter]=useState('All'),[level,setLevel]=useState('All'),[story,setStory]=useState('story_first'),[activity,setActivity]=useState<any>(null),[speakPrompt,setSpeakPrompt]=useState(''),[challengeReveal,setChallengeReveal]=useState(false),[interruption,setInterruption]=useState(''),[lesson,setLesson]=useState(0),[company,setCompany]=useState('All'),[critiqueIdx,setCritiqueIdx]=useState(0),[critiqueTab,setCritiqueTab]=useState<'encyc'|'lessons'|'critiques'>('encyc'),[mockLoopId,setMockLoopId]=useState('');
 const [domain,setDomain]=useState('All'),[query,setQuery]=useState(''),[topicSel,setTopicSel]=useState(''),[saySel,setSaySel]=useState<'thirty'|'two'>('thirty'),[flashMode,setFlashMode]=useState(false),[revealed,setRevealed]=useState<Record<string,boolean>>({});
 const [drillShift,setDrillShift]=useState(0),[drillTimerLeft,setDrillTimerLeft]=useState(0),[drillTimerOn,setDrillTimerOn]=useState(false);
 // ── Sharpness Lab state ───────────────────────────────────────────────────
 const [sharpMode,setSharpMode]=useState<SharpModeId>(()=>{const r=rhythmForDate(anchorNow);return r.mode==='review'?'autopsy':r.mode;}),[sharpShift,setSharpShift]=useState(0),[sharpStage,setSharpStage]=useState(0),[frameOpen,setFrameOpen]=useState(false);
 const [sharpLeft,setSharpLeft]=useState(0),[sharpOn,setSharpOn]=useState(false);
 const [review,setReview]=useState<Record<string,RubricLevel>>({});
 const [synthPicks,setSynthPicks]=useState<Record<string,'observation'|'interpretation'>>({}),[synthChecked,setSynthChecked]=useState(false);
 const [lensPick,setLensPick]=useState<RiskLens|''>('');
 const [foundDefects,setFoundDefects]=useState<Record<string,boolean>>({}),[firstRepair,setFirstRepair]=useState('');
 const [cxStory,setCxStory]=useState('story_first'),[cxIdx,setCxIdx]=useState(0);
 const [libTitle,setLibTitle]=useState(''),[libPrinciple,setLibPrinciple]=useState(''),[libNote,setLibNote]=useState(''),[libFile,setLibFile]=useState<File|null>(null),[libBusy,setLibBusy]=useState(false),[shotUrls,setShotUrls]=useState<Record<string,string>>({});
 const [libQuery,setLibQuery]=useState(''),[libTag,setLibTag]=useState(''),[libKind,setLibKind]=useState<'all'|'sprint'|'wild'>('all'),[libOpen,setLibOpen]=useState(false);
 const sharpEnd=useRef(0);
 const shotInput=useRef<HTMLInputElement|null>(null);
 const shotUrlsRef=useRef<Record<string,string>>({});
 
  const detailRef=useRef<HTMLElement|null>(null);
  const topicGridRef=useRef<HTMLDivElement|null>(null);
  const workspaceRef=useRef<HTMLElement|null>(null);
  const lessonRef=useRef<HTMLElement|null>(null);
  const critiqueRef=useRef<HTMLElement|null>(null);
  const activityRef=useRef<HTMLDivElement|null>(null);
  const [showScrollTop,setShowScrollTop]=useState(false);

 const drillTimerEnd=useRef(0);
 const [limit,setLimit]=useState(120),[elapsed,setElapsed]=useState(0),[running,setRunning]=useState(false),[recording,setRecording]=useState(false),[audio,setAudio]=useState<Blob|null>(null),[audioUrl,setAudioUrl]=useState(''),[audioSaved,setAudioSaved]=useState(false),[recordError,setRecordError]=useState(''),[micPending,setMicPending]=useState(false);
 const recorder=useRef<MediaRecorder|null>(null),stream=useRef<MediaStream|null>(null),chunks=useRef<Blob[]>([]),started=useRef(0),recordTimeout=useRef<ReturnType<typeof setTimeout>|null>(null);
  const [user,setUser]=useState<{email:string,name:string,role:string}|null>(null);
  const [authModalOpen,setAuthModalOpen]=useState(false);
  // Studio Sahayak Socratic Sparring State
  const [sahayakOpen,setSahayakOpen]=useState(false);
  const [sahayakTopicId,setSahayakTopicId]=useState<string>('findability');
  const [sahayakMode,setSahayakMode]=useState<SahayakDialecticMode>('bridge');
  const [sahayakChat,setSahayakChat]=useState<SahayakMessage[]>([]);
  const [sahayakInput,setSahayakInput]=useState('');
  const sahayakChatRef=useRef<HTMLDivElement>(null);

  function openSahayak(topicId:string,initialMode:SahayakDialecticMode='bridge'){
    setSahayakTopicId(topicId);
    setSahayakMode(initialMode);
    setSahayakOpen(true);
    try{
      const saved=localStorage.getItem(`sahayak_chat_${topicId}`);
      if(saved){
        setSahayakChat(JSON.parse(saved));
      }else{
        const welcomeMsg=getInitialSahayakMessage(topicId,initialMode);
        setSahayakChat([welcomeMsg]);
      }
    }catch{
      setSahayakChat([getInitialSahayakMessage(topicId,initialMode)]);
    }
  }

  function handleStarterClick(starterText:string){
    const userMsg:SahayakMessage={
      id:`user_${Date.now()}`,
      role:'user',
      content:starterText,
      mode:sahayakMode,
      timestamp:Date.now()
    };
    const evalMsg=evaluateSahayakReflection(sahayakTopicId,starterText,sahayakMode);
    const nextChat=[...sahayakChat,userMsg,evalMsg];
    setSahayakChat(nextChat);
    setSahayakInput('');
    try{
      localStorage.setItem(`sahayak_chat_${sahayakTopicId}`,JSON.stringify(nextChat));
    }catch{}
    setTimeout(()=>{
      sahayakChatRef.current?.scrollTo({top:sahayakChatRef.current.scrollHeight,behavior:'smooth'});
    },50);
  }

  function switchSahayakMode(newMode:SahayakDialecticMode){
    setSahayakMode(newMode);
    const prompts=getSahayakPrompts(sahayakTopicId);
    const question=newMode==='bridge'?prompts.bridge:newMode==='counter'?prompts.counter:prompts.defense;
    const newMsg:SahayakMessage={
      id:`sahayak_mode_${Date.now()}`,
      role:'sahayak',
      content:question,
      mode:newMode,
      timestamp:Date.now(),
      pramanaTag:newMode==='bridge'?'उपमान (Upamana)':newMode==='counter'?'अनुमान (Anumana)':'प्रत्यक्ष (Pratyaksha)'
    };
    setSahayakChat(prev=>{
      const next=[...prev,newMsg];
      try{localStorage.setItem(`sahayak_chat_${sahayakTopicId}`,JSON.stringify(next));}catch{}
      return next;
    });
    setTimeout(()=>{
      sahayakChatRef.current?.scrollTo({top:sahayakChatRef.current.scrollHeight,behavior:'smooth'});
    },50);
  }

  function sendSahayakMessage(){
    if(!sahayakInput.trim())return;
    const userMsg:SahayakMessage={
      id:`user_${Date.now()}`,
      role:'user',
      content:sahayakInput.trim(),
      mode:sahayakMode,
      timestamp:Date.now()
    };
    const evalMsg=evaluateSahayakReflection(sahayakTopicId,sahayakInput.trim(),sahayakMode);
    const nextChat=[...sahayakChat,userMsg,evalMsg];
    setSahayakChat(nextChat);
    setSahayakInput('');
    try{
      localStorage.setItem(`sahayak_chat_${sahayakTopicId}`,JSON.stringify(nextChat));
    }catch{}
    setTimeout(()=>{
      sahayakChatRef.current?.scrollTo({top:sahayakChatRef.current.scrollHeight,behavior:'smooth'});
    },50);
  }

  function clearSahayakChat(){
    const welcomeMsg=getInitialSahayakMessage(sahayakTopicId,sahayakMode);
    setSahayakChat([welcomeMsg]);
    try{localStorage.removeItem(`sahayak_chat_${sahayakTopicId}`);}catch{}
  }

  useEffect(()=>{
    function onKey(e:KeyboardEvent){
      if(e.key==='Escape'&&sahayakOpen){
        setSahayakOpen(false);
      }
    }
    window.addEventListener('keydown',onKey);
    return()=>window.removeEventListener('keydown',onKey);
  },[sahayakOpen]);

  const [authTab,setAuthTab]=useState<'passcode'|'google'>('passcode');
  const [passcodeInput,setPasscodeInput]=useState('prabhakar2026');
  const [passcodeError,setPasscodeError]=useState('');
  const [passcodeLoading,setPasscodeLoading]=useState(false);
  const [googleConfigured,setGoogleConfigured]=useState(false);
  const [authNotice,setAuthNotice]=useState('');
 
  async function checkAuthSession(){
    try{
      const r=await fetch('/api/auth/session');
      if(r.ok){
        const d:any=await r.json();
        setGoogleConfigured(!!d.googleConfigured);
        if(d.authenticated&&d.user){
          setUser(d.user);
          return d.user;
        }
      }
    }catch{}
    setUser(null);
    return null;
  }

  async function loginPasscode(e?:React.FormEvent){
    if(e)e.preventDefault();
    setPasscodeError('');
    setPasscodeLoading(true);
    try{
      const r=await fetch('/api/auth/passcode',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({passcode:passcodeInput})
      });
      const d:any=await r.json();
      if(!r.ok||!d.ok){
        throw new Error(d.error||'Incorrect passcode');
      }
      setUser(d.user);
      setAuthModalOpen(false);
      setNotice('Welcome back, Prabhakar! Studio unlocked with admin access.');
      // Sync local entries to cloud
      const local=localEntriesStore.read();
      for(const k of Object.keys(local)){
        fetch('/api/entries',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({key:k,value:local[k]})}).catch(()=>{});
      }
      load();
    }catch(err:any){
      setPasscodeError(err.message||'Authentication failed');
    }finally{
      setPasscodeLoading(false);
    }
  }

  async function signOutUser(){
    try{
      await fetch('/api/auth/session',{method:'DELETE'});
    }catch{}
    setUser(null);
    setNotice('Signed out. Your practice notes remain saved locally on this device.');
  }

  async function load(){
    setError('');
    // Initialise from local persistent storage so content is never blank
    const local=localEntriesStore.read();
    setEntries(local);
    setLoaded(true);

    const currentUser=await checkAuthSession();

    // Check for auth errors in URL (e.g. unauthorized Google account)
    if(typeof window!=='undefined'){
      const params=new URLSearchParams(window.location.search);
      const authErr=params.get('auth_error');
      if(authErr==='unauthorized'){
        const att=params.get('attempted');
        setAuthNotice(`Access restricted: ${att||'This account'} is not authorized. Only prabhakarmdes12@gmail.com has admin access.`);
      } else if(window.location.hash==='#signed_in'){
        setNotice('Successfully signed in with Google as Admin!');
      }
    }

    try{
      const r=await fetch('/api/entries');
      if(r.ok){
        const serverData:any=await r.json();
        const merged={...local,...serverData};
        setEntries(merged);
        localEntriesStore.write(merged);

        const remote=serverData.encyc_topics as StatusMap|undefined;
        if(remote&&typeof remote==='object'){
          const mStatus={...statusStore.read()};
          for(const k of Object.keys(remote)){
            if(remote[k]==='reviewing'||remote[k]==='mastered')mStatus[k]=remote[k];
          }
          statusStore.write(mStatus);
        }
        const remoteTimes=serverData.encyc_times as Record<string,string>|undefined;
        if(remoteTimes&&typeof remoteTimes==='object'){
          timesStore.write({...timesStore.read(),...remoteTimes});
        }
        const dlog={...doseStore.read()};
        for(const k of Object.keys(serverData)){
          if(k.startsWith('dose_')&&serverData[k]&&typeof serverData[k].topic==='string')dlog[k.slice(5)]=serverData[k].topic;
        }
        doseStore.write(dlog);
        const rlog={...drillStore.read()};
        for(const k of Object.keys(serverData)){
          if(k.startsWith('drill_')&&serverData[k]&&typeof serverData[k].drill==='string')rlog[k.slice(6)]=serverData[k].drill;
        }
        drillStore.write(rlog);
        const slog={...sharpStore.read()};
        for(const k of Object.keys(serverData)){
          if(k.startsWith('sharp_')&&serverData[k]&&typeof serverData[k].mode==='string')slog[k.slice(6)]=serverData[k].mode;
        }
        sharpStore.write(slog);
      }
    }catch(e:any){
      // Cloud sync unavailable; local mode active
    }
  }

 useEffect(()=>{load();},[]);
  useEffect(()=>{
    const handleScroll=()=>{
      if(typeof window!=='undefined'){
        setShowScrollTop(window.scrollY>350);
      }
    };
    window.addEventListener('scroll',handleScroll,{passive:true});
    return ()=>window.removeEventListener('scroll',handleScroll);
  },[]);

 useEffect(()=>{const key=window.location.hash.slice(1);if(navigation.some(x=>x[0]===key))setView(key);},[]);
 useEffect(()=>{if(!running)return;const t=setInterval(()=>setElapsed(v=>Math.min(v+1,limit)),1000);return()=>clearInterval(t)},[running,limit]);
 // Drill focus timer — wall-clock countdown so pause/resume stays honest
 useEffect(()=>{if(!drillTimerOn)return;const t=setInterval(()=>{const left=Math.round((drillTimerEnd.current-Date.now())/1000);if(left<=0){setDrillTimerLeft(0);setDrillTimerOn(false);setNotice('Focus time is up — log your drill when you are ready.');}else{setDrillTimerLeft(left);}},500);return()=>clearInterval(t);},[drillTimerOn]);
 // Sharpness Lab rep timer — same wall-clock approach, so pausing stays honest
 useEffect(()=>{if(!sharpOn)return;const t=setInterval(()=>{const left=Math.round((sharpEnd.current-Date.now())/1000);if(left<=0){setSharpLeft(0);setSharpOn(false);setNotice('Time. Stop writing, then mark the self-review honestly.');}else{setSharpLeft(left);}},500);return()=>clearInterval(t);},[sharpOn]);
 useEffect(()=>{if(elapsed>=limit&&running){setRunning(false);setNotice('Time is up. Finish your thought, then review.');if(recorder.current?.state==='recording')recorder.current.stop();}},[elapsed,limit,running]);
 useEffect(()=>()=>{if(recordTimeout.current)clearTimeout(recordTimeout.current);if(recorder.current?.state==='recording')recorder.current.stop();stream.current?.getTracks().forEach(t=>t.stop());},[]);
 useEffect(()=>()=>{if(audioUrl)URL.revokeObjectURL(audioUrl)},[audioUrl]);
 useEffect(()=>{if(!notice)return;const t=setTimeout(()=>setNotice(''),4500);return()=>clearTimeout(t)},[notice]);
 useEffect(()=>{const warn=(e:BeforeUnloadEvent)=>{if(Object.keys(drafts).length||(audio&&!audioSaved)||recording){e.preventDefault();e.returnValue='';}};window.addEventListener('beforeunload',warn);return()=>window.removeEventListener('beforeunload',warn)},[drafts,audio,audioSaved,recording]);
 
  async function save(key:string,value:any){
    // 1. Immediately persist locally (never blocked)
    const nextLocal={...localEntriesStore.read(),[key]:value};
    localEntriesStore.write(nextLocal);
    setEntries(p=>({...p,[key]:value}));
    setDrafts(d=>{const n={...d};if(JSON.stringify(n[key])===JSON.stringify(value))delete n[key];return n;});

    // 2. If signed in, sync to cloud
    if(user){
      setBusy(b=>[...b,key]);
      try{
        const r=await fetch('/api/entries',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({key,value})});
        if(!r.ok)throw new Error('Cloud sync failed');
        setNotice('Saved to your private practice space.');
      }catch{
        setNotice('Saved on this device. Will sync to cloud next time you connect.');
      }finally{
        setBusy(b=>b.filter(k=>k!==key));
      }
    } else {
      setNotice('Saved on this device. Sign in anytime to sync to the cloud.');
    }
    return true;
  }

 function nav(v:string){if(recording&&v!=='speak'){setNotice('Stop your recording before switching sections.');return;}setView(v);window.location.hash=v;window.scrollTo({top:0,behavior:'smooth'});}
 const current=roadmap[day-1],p=day<=7?pilot[day-1]:{title:current.topic,focus:current.phase,speak:`Explain ${current.topic.toLowerCase()} through one verified project decision. Include evidence, an alternative, a trade-off, and a learning.`,recall:`Explain the key decision involved in ${current.topic.toLowerCase()} without notes. Give one example and one limitation.`,challenge:challenges[(day-8)%challenges.length].prompt,craft:`Apply ${current.topic.toLowerCase()} to a screen or flow you know. Sketch two alternatives, include an edge state, and defend the choice.`,story:`Connect ${current.topic.toLowerCase()} to a real project. Explain your role, a hard decision, its evidence, and what you cannot claim.`,social:pilot[(day-1)%7].social,review:'Review one recording or sketch. Identify one specific improvement, then retry. Ask a peer for feedback at least once this week.'};
 const tasks=[{key:'recall',name:'Recall without notes',desc:'Explain one idea in plain language.',minutes:5,icon:BookOpen,prompt:p.recall},{key:'challenge',name:'Think through a design problem',desc:'Frame it. Explore options. Choose.',minutes:10,icon:FlaskConical,prompt:p.challenge},{key:'craft',name:'Make one interaction better',desc:'Sketch the detail and defend it.',minutes:10,icon:Target,prompt:p.craft},{key:'story',name:'Defend a portfolio decision',desc:'Make your own contribution clear.',minutes:10,icon:MessageCircle,prompt:p.story},{key:'review',name:'Listen and reflect',desc:'Find one thing to explain better.',minutes:5,icon:Volume2,prompt:p.review},{key:'retry',name:'Say it again',desc:'Repeat your weakest answer.',minutes:5,icon:RotateCcw,prompt:p.speak}];
 const todayDone=tasks.filter(t=>entries[`done_${day}_${t.key}`]?.done).length,completeDays=roadmap.filter(d=>tasks.every(t=>entries[`done_${d.day}_${t.key}`]?.done)).length;
 const recordings=Object.entries(entries).filter(([k,v])=>k.startsWith('audio_')&&v?.id).map(([,v])=>v).sort((a,b)=>b.date.localeCompare(a.date));
 const selectedChallenge=challenges[selected]||challenges[0];
 const value=(key:string,fallback:any='')=>drafts[key]??entries[key]??fallback;
 // `seed` recovers text written under an older key: it is shown, never saved for you.
 function note(key:string,label:string,placeholder:string,rows=5,seed=''){const v=String(value(key)||'')||seed;const recovered=!value(key)&&!!seed;return <div className="note"><label htmlFor={key}>{label}</label><textarea id={key} rows={rows} placeholder={placeholder} maxLength={30000} value={v} onChange={e=>setDrafts(d=>({...d,[key]:e.target.value}))}/><div className="notebottom"><span>{recovered?'Recovered from an earlier version — press Save notes to keep it':drafts[key]!==undefined?'Unsaved draft':entries[key]?'Saved':'Your notes stay private'}</span><button className="small" disabled={busy.includes(key)||!loaded} onClick={()=>save(key,v)}>{busy.includes(key)?'Saving…':'Save notes'}</button></div></div>}
 function openSpeak(prompt:string,seconds?:number){setSpeakPrompt(prompt);if(seconds){setLimit(seconds);setElapsed(0);setRunning(false)}nav('speak');}
 // UX Encyclopedia state
 const topicStatus=useSyncExternalStore(statusStore.subscribe,statusStore.read,()=>emptyStatus);
 const reviewTimes=useSyncExternalStore(timesStore.subscribe,timesStore.read,()=>emptyMap);
 const doseLog=useSyncExternalStore(doseStore.subscribe,doseStore.read,()=>emptyMap);
 const a11y=useSyncExternalStore(a11yStore.subscribe,a11yStore.read,()=>defaultA11y);
 const nowMs=anchorNow.getTime();
 function effStatus(id:string):RevStatus|'refresh'|'new'{const s=topicStatus[id];if(s==='mastered'){const t=reviewTimes[id];if(!t||nowMs-Date.parse(t)>REFRESH_MS)return 'refresh';return 'mastered';}return s||'new';}
 function setTopicStat(id:string,s:'new'|RevStatus){const n:StatusMap={...statusStore.read()};if(s==='new')delete n[id];else n[id]=s;statusStore.write(n);const t={...timesStore.read(),[id]:new Date().toISOString()};timesStore.write(t);if(loaded){save('encyc_topics',n);save('encyc_times',t);}}
 function selectTopic(id:string,shouldScroll=true){
  setTopicSel(id);
  setSaySel('thirty');
  if(shouldScroll){
    setTimeout(()=>{
      if(detailRef.current){
        detailRef.current.scrollTop=0;
        detailRef.current.scrollIntoView({behavior:'smooth',block:'start'});
        // focus removed to prevent mobile Chrome touch-focus lock
      }
    },50);
  }
}
 const masCount=uxEncyclopedia.filter(t=>effStatus(t.id)==='mastered').length,refreshCount=uxEncyclopedia.filter(t=>effStatus(t.id)==='refresh').length,revCount=uxEncyclopedia.filter(t=>effStatus(t.id)==='reviewing').length;
 const reviewList=uxEncyclopedia.filter(t=>{const e=effStatus(t.id);return e==='refresh'||e==='reviewing';}).sort((a,b)=>{const ea=effStatus(a.id)==='refresh'?0:1,eb=effStatus(b.id)==='refresh'?0:1;if(ea!==eb)return ea-eb;return (reviewTimes[a.id]||'').localeCompare(reviewTimes[b.id]||'');});
 // Principle of the Day — refresh-due topics first (oldest served first), then the
 // weakest domain by mastery share, rotated deterministically by day of year.
 const doy=Math.floor((nowMs-new Date(anchorNow.getFullYear(),0,0).getTime())/86400000);
 const refreshDue=uxEncyclopedia.filter(t=>effStatus(t.id)==='refresh').sort((a,b)=>(reviewTimes[a.id]||'').localeCompare(reviewTimes[b.id]||''));
 const doseTopic=(()=>{if(refreshDue.length)return refreshDue[doy%refreshDue.length];let weakest=uxDomains[0] as string,frac=1.1;for(const d of uxDomains){const ts=uxEncyclopedia.filter(t=>t.category===d);const f=ts.filter(t=>effStatus(t.id)==='mastered').length/ts.length;if(f<frac){frac=f;weakest=d;}}const pool=uxEncyclopedia.filter(t=>t.category===weakest);return pool[doy%pool.length];})();
 const doseWisdom=wisdomMirrors[doseTopic.id];
 const todayStr=localDate(anchorNow);
 const streak=(()=>{let s=0;const d=new Date(anchorNow.getTime());if(!doseLog[localDate(d)])d.setDate(d.getDate()-1);while(doseLog[localDate(d)]){s++;d.setDate(d.getDate()-1);}return s;})();
 function markDose(id:string){const log={...doseStore.read(),[todayStr]:id};doseStore.write(log);if(loaded)save(`dose_${todayStr}`,{topic:id,date:new Date().toISOString()});setTopicStat(id,effStatus(id)==='mastered'?'mastered':'reviewing');setNotice('Daily principle reviewed. See you tomorrow.');}
 function openDose(){selectTopic(doseTopic.id);setCritiqueTab('encyc');nav('learn');}
 // Skill drills — 15–20 min hands-on practice beside the daily principle
 const drillLog=useSyncExternalStore(drillStore.subscribe,drillStore.read,()=>emptyMap);
 const dailyDrill=drillCycle[(doy+drillShift)%drillCycle.length];
 const drillTrack=trackMeta[dailyDrill.track];
 const weekDots=(()=>{const monday=new Date(anchorNow.getTime());monday.setDate(monday.getDate()-((monday.getDay()+6)%7));return [0,1,2,3,4,5,6].map(i=>{const d=new Date(monday.getTime());d.setDate(d.getDate()+i);const ds=localDate(d);return {ds,logged:!!drillLog[ds],isToday:ds===todayStr};});})();
 function logDrill(id:string){const log={...drillStore.read(),[todayStr]:id};drillStore.write(log);if(loaded)save(`drill_${todayStr}`,{drill:id,date:new Date().toISOString()});setNotice('Drill logged. Craft compounds.');}
 function openDrillTopic(id:string){selectTopic(id);setCritiqueTab('encyc');nav('learn');}
 function drillStart(){const base=drillTimerLeft||dailyDrill.minutes*60;drillTimerEnd.current=Date.now()+base*1000;setDrillTimerLeft(base);setDrillTimerOn(true);}
 function drillPause(){setDrillTimerLeft(Math.max(0,Math.round((drillTimerEnd.current-Date.now())/1000)));setDrillTimerOn(false);}
 function drillReset(){setDrillTimerOn(false);setDrillTimerLeft(0);}
 function drillNext(){setDrillShift(s=>s+1);setDrillTimerOn(false);setDrillTimerLeft(0);}
 // ── Sharpness Lab — rotation, timer, self-review, critique library ────────
 // Every mode draws its item from the same day-of-year rotation, so the lab is
 // different each morning without anyone choosing. Nothing is scored; a session
 // ends with a named weakest dimension and the drill that repairs it.
 const sharpLog=useSyncExternalStore(sharpStore.subscribe,sharpStore.read,()=>emptyMap);
 const todayRhythm=rhythmForDate(anchorNow);
 const rhythmMode:SharpModeId=todayRhythm.mode==='review'?'autopsy':todayRhythm.mode;
 const mode=modeById(sharpMode);
 const rot=doy+sharpShift;
 const pick=<T,>(list:T[]):T=>list[((rot%list.length)+list.length)%list.length];
 const sprint=pick(critiqueSprints),constraintCard=pick(constraintCards),rep=pick(metricsReps),synth=pick(synthesisDrills),a11yCase=pick(a11yCases),autopsy=pick(autopsyCases),baseChallenge=pick(challenges);
 const cxQ=crossExamQuestions[(((rot+cxIdx)%crossExamQuestions.length)+crossExamQuestions.length)%crossExamQuestions.length];
 const sharpItemId=sharpMode==='critique'?sprint.id:sharpMode==='constraint'?`${baseChallenge.id}_${constraintCard.id}`:sharpMode==='metrics'?rep.id:sharpMode==='synthesis'?synth.id:sharpMode==='a11yrepair'?a11yCase.id:sharpMode==='autopsy'?autopsy.id:sharpMode==='crossexam'?cxQ.id:'summary';
 const sharpWeek=(()=>{const monday=new Date(anchorNow.getTime());monday.setDate(monday.getDate()-((monday.getDay()+6)%7));return [0,1,2,3,4,5,6].map(i=>{const d=new Date(monday.getTime());d.setDate(d.getDate()+i);const ds=localDate(d);return {ds,logged:!!sharpLog[ds],isToday:ds===todayStr,plan:weeklyRhythm[i]};});})();
 const sharpStreak=(()=>{let s=0;const d=new Date(anchorNow.getTime());if(!sharpLog[localDate(d)])d.setDate(d.getDate()-1);while(sharpLog[localDate(d)]){s++;d.setDate(d.getDate()-1);}return s;})();
 const markedDims=sharpRubric.filter(x=>review[x.id]).length;
 const weakest=sharpRubric.find(x=>review[x.id]==='developing')||sharpRubric.find(x=>review[x.id]==='solid')||null;
 function resetRep(){setSharpStage(0);setSynthChecked(false);setSynthPicks({});setLensPick('');setFoundDefects({});setFirstRepair('');setSharpOn(false);setSharpLeft(0);}
 function pickMode(id:SharpModeId){setSharpMode(id);resetRep();}
 function sharpStart(){const base=sharpLeft||mode.minutes*60;sharpEnd.current=Date.now()+base*1000;setSharpLeft(base);setSharpOn(true);}
 function sharpPause(){setSharpLeft(Math.max(0,Math.round((sharpEnd.current-Date.now())/1000)));setSharpOn(false);}
 function sharpResetTimer(){setSharpOn(false);setSharpLeft(0);}
 function sharpNext(){setSharpShift(s=>s+1);resetRep();}
 function openSharp(id:SharpModeId){pickMode(id);nav('sharp');}
 function logSharp(){const log={...sharpStore.read(),[todayStr]:sharpMode};sharpStore.write(log);if(loaded)save(`sharp_${todayStr}`,{mode:sharpMode,item:sharpItemId,review,weakest:weakest?weakest.id:'',date:new Date().toISOString()});setNotice(weakest?`Session logged. Weakest today: ${weakest.label}.`:'Session logged. Nothing marked weak — check that you were honest.');}
 // Cross-examination answers are scoped per story, so the same question asked
 // of two projects keeps two separate rehearsals.
 function cxKey(storyKey:string,qid:string){return `sharp_cx_${storyKey}_${qid}`;}
 function cxAnswered(storyKey:string,qid:string){return String(value(cxKey(storyKey,qid),'')||'').trim().length>0;}
 function goToQuestion(i:number){setCxIdx(i-rot);setSharpStage(0);}
 // Promotion is deliberate, never automatic: a 90-second spoken answer must not
 // silently overwrite evidence you verified. Append is the default; replace asks.
 async function promoteAnswer(storyKey:string,field:string,answer:string,replace:boolean){
  const st=value(storyKey,{title:'My first project',status:'Needs evidence',fields:{}});
  const cur=String(st.fields?.[field]||'').trim();
  if(replace&&cur&&!confirm(`Replace what you have recorded in “${field}”? The current text will be lost.`))return;
  const merged=(replace||!cur)?answer.trim():`${cur}\n\n${answer.trim()}`;
  await save(storyKey,{...st,fields:{...(st.fields||{}),[field]:merged.slice(0,8000)}});
  setNotice(`Saved into “${field}”. Re-read it in My stories before you claim it anywhere.`);
 }
 // Critique Library: metadata syncs like any other entry; screenshots stay in
 // this device's IndexedDB and are never uploaded.
 const library:LibItem[]=(()=>{const v:unknown=value('critique_library',[]);return Array.isArray(v)?v as LibItem[]:[];})();
 const shotKeys=library.filter(x=>x.hasShot).map(x=>x.id).join(',');
 const topicByName=(name:string)=>{const n=name.trim().toLowerCase();return n?uxEncyclopedia.find(t=>t.title.toLowerCase()===n||t.id===n):undefined;};
 const libTags=(()=>{const m=new Map<string,{key:string,label:string,count:number}>();for(const x of library){const raw=(x.principle||'').trim();if(!raw)continue;const key=raw.toLowerCase();const cur=m.get(key);if(cur)cur.count++;else m.set(key,{key,label:raw,count:1});}return [...m.values()].sort((a,b)=>b.count-a.count||a.label.localeCompare(b.label));})();
 const libQ=libQuery.trim().toLowerCase();
 const libFiltered=library.filter(x=>(libKind==='all'||x.kind===libKind)&&(!libTag||(x.principle||'').trim().toLowerCase()===libTag)&&(!libQ||[x.title,x.note,x.principle,x.surface,...(x.answers||[]).map(a=>a.a)].join(' ').toLowerCase().includes(libQ)));
 const libFilterOn=!!(libTag||libQ||libKind!=='all');
 async function saveLibrary(kind:'sprint'|'wild',id:string){
  const title=(libTitle||(kind==='sprint'?sprint.surface:'')).trim();
  if(!title){setNotice('Give this capture a title before saving it.');return;}
  setLibBusy(true);
  let hasShot=false;
  if(libFile){try{const blob=await downscaleImage(libFile);await putShot(id,blob);hasShot=true;}catch{setNotice('The screenshot could not be stored on this device — your notes were kept.');}}
  const answers=kind==='sprint'?critiqueQuestions.map((cq,i)=>({q:cq,a:String(value(`sharp_cs_${sprint.id}_q${i}`,'')||'').trim()})).filter(x=>x.a):[];
  const item={id,kind,date:new Date().toISOString(),title,principle:libPrinciple.trim().replace(/\s+/g,' '),note:libNote.trim(),surface:kind==='sprint'?sprint.surface:'',answers,hasShot};
  await save('critique_library',[item,...library].slice(0,150));
  setLibTitle('');setLibPrinciple('');setLibNote('');setLibFile(null);if(shotInput.current)shotInput.current.value='';
  setLibBusy(false);
 }
 async function removeLibrary(id:string){await save('critique_library',library.filter(x=>x.id!==id));try{await delShot(id);}catch{/* image already gone */}setShotUrls(u=>{const n={...u};if(n[id])URL.revokeObjectURL(n[id]);delete n[id];return n;});}
 function exportLibrary(){
  const rows=libFiltered;
  const md=['# Critique Library','',`Exported ${new Date().toLocaleDateString()} · ${rows.length} ${rows.length===1?'entry':'entries'}${libFilterOn?` (filtered from ${library.length})`:''}`,'',
   ...rows.map(x=>[`## ${x.title}`,`*${new Date(x.date).toLocaleDateString()} · ${x.kind==='sprint'?'Critique sprint':'Craft in the wild'}${x.principle?` · ${x.principle}`:''}*`,'',x.surface?`**Surface:** ${x.surface}`:'',x.note||'',...(x.answers||[]).map((a:LibAnswer)=>`- **${a.q}** ${a.a}`),x.hasShot?'_Screenshot stored privately on the original device._':'',''].filter(Boolean).join('\n'))].join('\n');
  download('critique-library.md',new Blob([md],{type:'text/markdown'}));
 }
 // Pull stored screenshots out of IndexedDB and mint object URLs for the grid.
 useEffect(()=>{let stop=false;(async()=>{for(const id of shotKeys.split(',').filter(Boolean)){if(shotUrlsRef.current[id])continue;try{const b=await getShot(id);if(b&&!stop){const url=URL.createObjectURL(b);shotUrlsRef.current[id]=url;setShotUrls(u=>({...u,[id]:url}));}}catch{/* image unreadable on this device */}}})();return()=>{stop=true;};},[shotKeys]);
 useEffect(()=>()=>{Object.values(shotUrlsRef.current).forEach(u=>URL.revokeObjectURL(u));},[]);
 const q=query.trim().toLowerCase();
 const baseTopics=domain==='__review'?reviewList:uxEncyclopedia.filter(t=>domain==='All'||t.category===domain);
 const filteredTopics=baseTopics.filter(t=>!q||[t.title,t.summary,t.mentalModel,t.category,t.eyebrow,t.keyPrinciples.join(' ')].join(' ').toLowerCase().includes(q));
 const selTopic=uxEncyclopedia.find(t=>t.id===topicSel)||null;
 const selIdx=selTopic?uxEncyclopedia.indexOf(selTopic):-1;
 function badgeFor(id:string):{cls:string,label:string}{const es=effStatus(id);return es==='mastered'?{cls:'s-mas',label:'Mastered'}:es==='refresh'?{cls:'s-ref',label:'Refresh due'}:es==='reviewing'?{cls:'s-rev',label:'Reviewing'}:{cls:'s-new',label:'Not started'};}
 const trapParts=selTopic?selTopic.commonTraps.split(' ~ '):['',''];
 const selBadge=selTopic?badgeFor(selTopic.id):{cls:'s-new',label:'Not started'};
 const selWisdom=selTopic?wisdomMirrors[selTopic.id]:undefined;
 // END encyclopedia state
 // Accessibility display controls
 function setA11y(patch:Partial<A11yPrefs>){a11yStore.write({...a11yStore.read(),...patch});}
 useEffect(()=>{const r=document.documentElement;r.classList.toggle('a11y-lg',a11y.size===1);r.classList.toggle('a11y-xl',a11y.size===2);r.classList.toggle('a11y-contrast',a11y.contrast);r.classList.toggle('a11y-calm',a11y.calm);r.classList.toggle('a11y-read',a11y.read);},[a11y]);
 async function startRecording(){if(micPending||recording)return;setRecordError('');if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){setRecordError('Recording is not supported here. Open this page in a current browser, or use the timer and your device recorder.');return;}if(audio&&!audioSaved&&!confirm('This take has not been saved. Replace it with a new recording?'))return;setMicPending(true);try{const s=await navigator.mediaDevices.getUserMedia({audio:true});stream.current=s;const type=['audio/webm','audio/mp4','audio/ogg'].find(t=>MediaRecorder.isTypeSupported(t));const r=new MediaRecorder(s,type?{mimeType:type}:undefined);recorder.current=r;chunks.current=[];r.ondataavailable=e=>{if(e.data.size)chunks.current.push(e.data)};r.onstop=()=>{const blob=new Blob(chunks.current,{type:r.mimeType||'audio/webm'});setAudio(blob);setAudioUrl(URL.createObjectURL(blob));setAudioSaved(false);s.getTracks().forEach(t=>t.stop());if(recordTimeout.current)clearTimeout(recordTimeout.current);setRecording(false);setRunning(false)};r.onerror=()=>{setRecordError('Recording was interrupted. Check the playback before saving.');s.getTracks().forEach(t=>t.stop());setRecording(false);setRunning(false)};r.start(1000);started.current=Date.now();setAudio(null);setAudioUrl('');setElapsed(0);setRecording(true);setRunning(true);recordTimeout.current=setTimeout(()=>{if(r.state==='recording')r.stop();},limit*1000);}catch{setRecordError('Microphone access was unavailable. Allow microphone access in your browser, or practise with the timer instead.');}finally{setMicPending(false)}}
 async function saveAudio(){if(!audio||!loaded)return;setBusy(b=>[...b,'audio']);setRecordError('');try{const r=await fetch('/api/audio',{method:'POST',headers:{'content-type':audio.type,'x-practice-label':`Day ${day} - ${limit}s practice`},body:audio});if(!r.ok)throw new Error('Could not save this recording. Download it below or retry.');const v:any=await r.json();setEntries(e=>({...e,[`audio_${v.id}`]:v}));setAudioSaved(true);setNotice('Recording saved privately.');}catch(e:any){setRecordError(e.message)}finally{setBusy(b=>b.filter(k=>k!=='audio'))}}
 function challengeSelect(i:number){
  setSelected(i);
  setChallengeReveal(false);
  setInterruption('');
  setTimeout(()=>{
    if(workspaceRef.current){
      workspaceRef.current.scrollIntoView({behavior:'smooth',block:'start'});
      workspaceRef.current.focus?.({preventScroll:true});
    }
  },50);
}
 const titleMap:Record<string,[string,string,string]>={today:['DAILY PRACTICE','Make your thinking visible.','A little speaking. A little making. One better decision.'],speak:['SPEAKING STUDIO','Find your design voice.','Practise a clear answer, listen back, and try one improvement.'],lab:['CHALLENGE LAB','Think beyond the first idea.','95 problems across Apple, Google, Atlassian, and general product design.'],sharp:['SHARPNESS LAB','Decide fast. Defend it.','Ten to fifteen minutes of judgment practice: observe, diagnose, decide, defend, measure.'],stories:['YOUR EXPERIENCE','Build stories you can defend.','Keep the evidence close and your contribution clear.'],learn:['STUDY & UPDATES','The encyclopedia of your craft.','41 visual study topics across 10 design domains, plus lessons, critiques, and primary sources.'],roadmap:['YOUR CURRICULUM','Sixty days. One practice at a time.','Move at your own pace. Speaking runs through every phase.'],review:['PROGRESS & REVIEW','Notice what is getting clearer.','Compare your attempts and choose the next skill to work on.']};
 return <div className="shell"><aside className="sidebar" aria-label="Sidebar navigation"><div className="brand"><span className="brandmark">d.</span><div>design practice<small>PRABHAKAR'S STUDIO</small></div></div><p className="navlabel">YOUR WORKSPACE</p><nav aria-label="Main navigation">{navigation.map(([id,label,Icon])=><button key={id} className={view===id?'active':''} aria-current={view===id?'page':undefined} onClick={()=>nav(id)}><Icon size={18}/>{label}</button>)}</nav>
<div className="sidefoot">
  <div className="avatar" aria-hidden="true">PK</div>
  <strong>Prabhakar Kumar</strong>
  <span className="emailtext">prabhakarmdes12@gmail.com</span>
  <span className="roletext">Senior product design · Admin</span>
  <div className="private"><ShieldCheck size={14} aria-hidden="true"/> Private practice space</div>
</div>
</aside><main id="main-content" tabIndex={-1}><header role="banner"><span className="headercrumb">DESIGN PRACTICE / {titleMap[view][0]}</span><div className="a11ycontrols" role="group" aria-label="Accessibility display controls"><span className="a11ylabel"><Accessibility size={16} aria-hidden="true"/> <span>DISPLAY</span></span><button type="button" aria-label={`Decrease text size (currently ${A11Y_SIZES[a11y.size]})`} disabled={a11y.size===0} onClick={()=>setA11y({size:Math.max(0,a11y.size-1)})}>A−</button><span className="a11ysize" aria-hidden="true">{A11Y_SIZES[a11y.size]}</span><button type="button" aria-label={`Increase text size (currently ${A11Y_SIZES[a11y.size]})`} disabled={a11y.size===2} onClick={()=>setA11y({size:Math.min(2,a11y.size+1)})}>A+</button><button type="button" className={a11y.contrast?'on':''} aria-pressed={a11y.contrast} aria-label="Toggle high contrast" onClick={()=>setA11y({contrast:!a11y.contrast})}><span className="a11ytxt">Contrast</span></button><button type="button" className={a11y.calm?'on':''} aria-pressed={a11y.calm} aria-label="Toggle reduced motion" onClick={()=>setA11y({calm:!a11y.calm})}><span className="a11ytxt">Calm motion</span></button><button type="button" className={a11y.read?'on':''} aria-pressed={a11y.read} aria-label="Toggle comfortable reading mode" onClick={()=>setA11y({read:!a11y.read})}><span className="a11ytxt">Comfort</span></button></div>
<button type="button" className="headersahayakbtn" onClick={()=>openSahayak(selTopic?.id||doseTopic.id,'bridge')} title="Open Studio Sahayak (Socratic Mentor)" aria-label="Open Studio Sahayak Socratic Mentor"><Sparkles size={14} aria-hidden="true"/><span>Sahayak (सहायक)</span></button>
<div className="headerauth">
  {user?(
    <div className="authuserchip" role="status" aria-label={`Signed in as Admin: ${user.name}`}>
      <span className="useravatar" aria-hidden="true">PK</span>
      <div className="userinfo">
        <span className="username">{user.name}</span>
        <span className="adminbadge">ADMIN</span>
      </div>
      <button type="button" className="ghostsignout" aria-label="Sign out" onClick={signOutUser} title="Sign out">
        <LogOut size={15} aria-hidden="true"/>
      </button>
    </div>
  ):(
    <button type="button" className="signinbtn" onClick={()=>setAuthModalOpen(true)} aria-haspopup="dialog">
      <KeyRound size={15} aria-hidden="true"/>
      <span>Sign in (Admin)</span>
    </button>
  )}
</div>
<span className="headerstatus" aria-label={user?'Status: Admin cloud sync active':'Status: Saved on this device'}>
  <span className={user?'statusdot':'statusdot pending'} aria-hidden="true"/>
  {user?'Cloud sync active':'Saved locally'}
</span>
</header>
{authNotice&&<div className="alert" role="alert" style={{background:'#fee2e2',color:'#991b1b',borderColor:'#fca5a5'}}><ShieldAlert size={16} aria-hidden="true"/> {authNotice} <button type="button" className="textbutton" onClick={()=>setAuthNotice('')} style={{marginLeft:10}}>Dismiss</button></div>}
{error&&<div className="alert" role="alert">{error} {signedOut?<a href="/signin-with-chatgpt?return_to=/" target="_top">Sign in</a>:<button className="textbutton" onClick={load}>Retry loading</button>}</div>}<div className="pagetitle"><div><p className="eyebrow">{titleMap[view][0]}</p><h1>{titleMap[view][1]}</h1><p className="muted">{titleMap[view][2]}</p></div>{view==='today'&&<label className="dayselect" htmlFor="practice-day-select">Practice day<select id="practice-day-select" aria-label="Select practice day" value={day} onChange={e=>{setDay(+e.target.value);setActivity(null)}}>{roadmap.map(d=><option key={d.day} value={d.day}>Day {d.day} · {d.topic}</option>)}</select></label>}</div>
 {view==='today'&&<><section className="panel dailycard" aria-label="Principle of the day">
  <div className="dosehead">
   <p className="eyebrow" style={{margin:0}}>PRINCIPLE OF THE DAY · {doseTopic.category.toUpperCase()}</p>
   <span className="streakchip" role="status" aria-label={streak>0?`Current streak: ${streak} days`:'No streak yet — review today\u2019s principle to begin'}><Flame size={14} aria-hidden="true"/> {streak>0?`${streak}-day streak`:'Start your streak'}</span>
  </div>
  <h2>{doseTopic.title}</h2>
  <p className="dosemodel">{doseTopic.mentalModel}</p>
  {doseWisdom&&<p className="dosewisdom"><Sparkles size={14} aria-hidden="true"/> {doseWisdom.source}</p>}
  <div className="actions">
   <button onClick={openDose}><BookOpen size={15}/> Open deep dive</button>
   <button className="secondary" onClick={()=>openSpeak(`Daily recall — “${doseTopic.title}”. Recite the principle from memory, then check yourself against the notes.`,30)}><Mic size={15}/> Recall aloud · 30s</button>
   <button type="button" className="secondary sahayak-btn" onClick={()=>openSahayak(doseTopic.id,'bridge')}><Sparkles size={15} aria-hidden="true"/> विचार विमर्श · Sahayak</button>
   <button className="secondary" disabled={doseLog[todayStr]===doseTopic.id} onClick={()=>markDose(doseTopic.id)}><Check size={15}/> {doseLog[todayStr]===doseTopic.id?'Reviewed today':'Mark reviewed'}</button>
  </div>
  <p className="sayhint">10-minute loop: recall aloud → read the deep dive → reflect with the wisdom mirror → apply it to one live decision → mark reviewed.{reviewList.length>0?` ${reviewList.length} topic${reviewList.length===1?'':'s'} due for review in the encyclopedia.`:''}</p>
 </section><section className="panel drillcard" aria-label={`Skill drill of the day: ${dailyDrill.title}`}>
  <div className="dosehead">
   <p className="eyebrow" style={{margin:0}}>SKILL DRILL · {drillTrack.label.toUpperCase()}</p>
   <span className="minutabadge"><Timer size={13} aria-hidden="true"/> {dailyDrill.minutes} min focus</span>
  </div>
  <h2>{dailyDrill.title}</h2>
  <p className="drillbrief">{dailyDrill.brief}</p>
  <ol className="drillsteps">{dailyDrill.steps.map(s=><li key={s}>{s}</li>)}</ol>
  <p className="drilldeliver"><strong>Deliverable:</strong> {dailyDrill.deliverable}</p>
  <div className="actions">
   {drillTimerOn||drillTimerLeft>0?(
    <span className="drilltimer" aria-live="off" aria-label={`Focus time remaining: ${time(drillTimerLeft)}`}>{time(drillTimerLeft)}
     {drillTimerOn?<button className="ghostbtn" aria-label="Pause drill timer" onClick={drillPause}><Pause size={14}/></button>:<button className="ghostbtn" aria-label="Resume drill timer" onClick={drillStart}><Play size={14}/></button>}
     <button className="ghostbtn" aria-label="Reset drill timer" onClick={drillReset}><RotateCcw size={14}/></button>
    </span>
   ):<button onClick={drillStart}><Play size={15}/> Start {dailyDrill.minutes}-min focus timer</button>}
   <button className="secondary" onClick={()=>openDrillTopic(dailyDrill.topicId)}>Related topic <ChevronRight size={15}/></button>
   <button className="secondary" disabled={drillLog[todayStr]===dailyDrill.id} onClick={()=>logDrill(dailyDrill.id)}><Check size={15}/> {drillLog[todayStr]===dailyDrill.id?'Drill logged':'Log drill'}</button>
   <button className="textbutton" onClick={drillNext}>Try another drill <ChevronRight size={14}/></button>
  </div>
  {dailyDrill.link&&<p className="sayhint"><a href={dailyDrill.link} target="_blank" rel="noreferrer">Open the source reading in a new tab</a> — distill it aloud before you write anything down.</p>}
  <div className="weekdots" role="group" aria-label="This week’s drill log">
   {weekDots.map((d,i)=><span key={d.ds} role="img" aria-label={`${'Monday Tuesday Wednesday Thursday Friday Saturday Sunday'.split(' ')[i]} ${d.ds}: ${d.logged?'drill logged':'no drill logged yet'}${d.isToday?' (today)':''}`} className={`weekdot${d.logged?' done':''}${d.isToday?' today':''}`}>{['M','T','W','T','F','S','S'][i]}</span>)}
  </div>
 </section><section className="panel sharptoday" aria-label={`Sharpness Lab: ${modeById(rhythmMode).name}`}>
  <div className="dosehead">
   <p className="eyebrow" style={{margin:0}}>SHARPNESS LAB · {todayRhythm.day.toUpperCase()}</p>
   <span className="minutabadge"><Crosshair size={13} aria-hidden="true"/> {modeById(rhythmMode).minutes} min rep</span>
  </div>
  <h2>{modeById(rhythmMode).name}</h2>
  <p className="drillbrief">{modeById(rhythmMode).tagline} {todayRhythm.note}</p>
  <div className="actionmini" aria-hidden="true">{sharpActions.map(a=><span key={a.id}>{a.label}</span>)}</div>
  <div className="actions">
   <button onClick={()=>openSharp(rhythmMode)}><Crosshair size={15}/> Start today’s rep</button>
   <button className="secondary" onClick={()=>nav('sharp')}>All eight modes <ChevronRight size={15}/></button>
   {sharpLog[todayStr]&&<span className="muted smalltext"><Check size={14}/> Logged today: {modeById(sharpLog[todayStr] as SharpModeId).name}</span>}
  </div>
 </section><section className="hero"><div><span className="pill">DAY {String(day).padStart(2,'0')} · {p.focus.toUpperCase()}</span><h2>{p.title}</h2><p>{p.speak}</p><button onClick={()=>openSpeak(p.speak)}><Mic size={16}/> Start speaking practice</button><span className="herometa">2-minute answer · no script needed</span></div><div className="heroaside"><span className="big">{String(day).padStart(2,'0')}<span>/60</span></span><div className="herobar" role="progressbar" aria-valuenow={completeDays} aria-valuemin={0} aria-valuemax={60} aria-label={`Curriculum progress: ${completeDays} of 60 full practice days completed`}><i style={{width:`${completeDays/60*100}%`}}/></div><p>{completeDays} full practice days completed<br/>Keep your pace. Keep showing up.</p></div></section><div className="dashboardgrid"><section className="panel routine"><div className="sectionhead"><div><h2>Your practice session</h2><p className="muted smalltext">{todayDone} of 6 activities completed</p></div><div className="segmented"><button className={!short?'chosen':''} onClick={()=>setShort(false)}>45 min</button><button className={short?'chosen':''} onClick={()=>setShort(true)}>15 min</button></div></div><div className="progressline" role="progressbar" aria-valuenow={todayDone} aria-valuemin={0} aria-valuemax={6} aria-label={`Daily session progress: ${todayDone} of 6 activities completed`}><i style={{width:`${todayDone/6*100}%`}}/></div>{tasks.map((t,i)=><div className="task" key={t.key}><button className={`checkbutton ${entries[`done_${day}_${t.key}`]?.done?'checked':''}`} aria-label={`${entries[`done_${day}_${t.key}`]?.done?'Mark incomplete':'Complete'}: ${t.name}`} aria-pressed={!!entries[`done_${day}_${t.key}`]?.done} disabled={!loaded||busy.includes(`done_${day}_${t.key}`)} onClick={()=>save(`done_${day}_${t.key}`,{done:!entries[`done_${day}_${t.key}`]?.done,date:new Date().toISOString()})}>{entries[`done_${day}_${t.key}`]?.done&&<Check size={14}/>}</button><button className="taskopen" aria-label={`Open ${t.name} activity: ${t.desc}`} onClick={()=>{setActivity(t);setTimeout(()=>{activityRef.current?.scrollIntoView({behavior:'smooth',block:'nearest'});},50);}}><span className={`taskicon icon${i}`}><t.icon size={18}/></span><span><strong>{t.name}</strong><small>{t.desc}</small></span><span className="duration">{short?[2,4,3,3,2,1][i]:t.minutes} min</span><ChevronRight size={16}/></button></div>)}{activity&&<div className="activity" ref={activityRef} tabIndex={-1}><div className="sectionhead"><h3>{activity.name}</h3><button className="textbutton" onClick={()=>setActivity(null)}>Close</button></div><p>{activity.prompt}</p><button className="secondary small" onClick={()=>openSpeak(activity.prompt)}>Practise aloud</button>{note(`practice_${day}_${activity.key}`,'Working notes','Capture your reasoning, sketch reference, or one thing to try again.',4)}</div>}</section><aside><section className="panel socialcard"><span className="iconlabel"><MessageCircle size={18}/> OUTSIDE THE STUDIO</span><h2>One real conversation.</h2><p>{p.social}</p><div className="conversationhint">Ask → listen → follow up → contribute.</div><button className="secondary full" disabled={!loaded||busy.includes(`social_${day}`)} onClick={()=>save(`social_${day}`,{done:!entries[`social_${day}`]?.done,date:new Date().toISOString()})}>{entries[`social_${day}`]?.done?'Conversation completed':'Mark as practised'}</button></section><section className="panel reminder"><p className="eyebrow">A THOUGHT TO KEEP</p><p className="quote">“Make one difficult decision easy to understand.”</p><p className="muted smalltext">Pause when you need to. Clarity matters more than talking continuously.</p><button className="textbutton" onClick={()=>nav('stories')}>Build your story bank</button></section></aside></div></>}
 {view==='speak'&&<><div className="speakinggrid"><section className="panel"><div className="sectionhead"><span className="tag">ANSWER PRACTICE</span><div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}><select aria-label="Choose a mock interview round" value={mockLoopId} disabled={recording} onChange={e=>{const val=e.target.value;setMockLoopId(val);if(val){const [lId,rIdx]=val.split(':');const loop=mockLoops.find(l=>l.id===lId);if(loop&&loop.rounds[+rIdx]){const r=loop.rounds[+rIdx];setSpeakPrompt(`[${loop.name} · ${r.name} (${r.minutes} min)] Focus: ${r.focus}`);}}}}><option value="">Mock interview loops</option>{mockLoops.map(loop=><optgroup key={loop.id} label={`${loop.name} (${loop.totalMinutes}m)`}>{loop.rounds.map((r,idx)=><option key={`${loop.id}:${idx}`} value={`${loop.id}:${idx}`}>{r.name} ({r.minutes}m)</option>)}</optgroup>)}</select><select aria-label="Choose a speaking question" value={behaviors.includes(speakPrompt)?speakPrompt:''} disabled={recording} onChange={e=>{setMockLoopId('');setSpeakPrompt(e.target.value);}}><option value="">Behavioral & leadership questions</option>{behaviors.map(q=><option key={q}>{q}</option>)}</select></div></div><h2 className="prompt">{speakPrompt||p.speak}</h2><div className="answerpath"><span>Context</span><span>Evidence</span><span>Options</span><span>Decision</span><span>Trade-off</span><span>Learning</span></div><div className="timer"><div className="segmented" role="group" aria-label="Timer duration">{[30,120,300].map(n=><button key={n} role="button" aria-pressed={limit===n} disabled={recording||running} className={limit===n?'chosen':''} onClick={()=>{setLimit(n);setElapsed(0)}}>{n===30?'30 seconds':`${n/60} minutes`}</button>)}</div><div className={recording?'clock recording':'clock'} aria-live="off" aria-label={`Time remaining: ${time(Math.max(0,limit-elapsed))}`}>{time(Math.max(0,limit-elapsed))}</div><div className="sr-only" aria-live="polite">{recording?'Microphone active. Recording in progress.':audioSaved?'Recording saved privately.':audio?'Recording stopped. Review take.':''}</div><p className="muted smalltext">{recording?'Recording your voice…':limit===30?'Headline + one concrete example':limit===120?'Context + decision + trade-off + result':'Add evidence, alternatives, collaboration, and learning'}</p><div className="actions"><button onClick={recording?()=>recorder.current?.stop():startRecording} disabled={micPending}>{recording?<Square size={16}/>:<Mic size={16}/>} {recording?'Stop recording':micPending?'Opening microphone…':'Record answer'}</button><button className="secondary" disabled={recording} onClick={()=>{if(elapsed>=limit)setElapsed(0);setRunning(!running)}}>{running?<Pause size={16}/>:<Play size={16}/>} {running?'Pause':'Timer only'}</button><button className="iconbutton" disabled={recording} aria-label="Reset timer" onClick={()=>{setRunning(false);setElapsed(0)}}><RotateCcw size={18}/></button></div></div>{recordError&&<p className="alert" role="alert">{recordError}</p>}{audioUrl&&<div className="take"><h3>Your latest take</h3><audio controls aria-label="Playback of your latest practice take" src={audioUrl}/><div className="actions"><button className="small" disabled={audioSaved||busy.includes('audio')||!loaded} onClick={saveAudio}>{audioSaved?'Recording saved':busy.includes('audio')?'Saving…':'Save recording'}</button><button className="secondary small" onClick={()=>audio&&download(`day-${day}-practice.${audio.type.includes('mp4')?'m4a':audio.type.includes('ogg')?'ogg':'webm'}`,audio)}>Download take</button></div><p className="muted smalltext">Review the take before starting another. Unsaved recordings are lost when you leave the page.</p></div>}<p className="privacytext"><ShieldCheck size={14}/> Microphone starts only when you choose Record. Audio is uploaded only when you choose Save.</p></section><aside><section className="panel"><p className="eyebrow">INTERRUPTION PRACTICE</p><h2>Stay with the question.</h2><p>{interruption||'Try a challenge midway through your answer. Pause, acknowledge it, and respond directly.'}</p><button className="secondary" onClick={()=>setInterruption(interruptions[(interruptions.indexOf(interruption)+1)%interruptions.length])}>Give me a challenge</button><hr/><p className="smalltext">“That changes the constraint. I would…”</p><p className="smalltext">“What I can support with evidence is…”</p><p className="smalltext">“Let me separate those two questions.”</p></section><section className="panel"><h3>Review for clarity</h3><ul className="cleanlist"><li>Did I answer the actual question?</li><li>Was my own decision clear?</li><li>Did I explain a real trade-off?</li><li>Did I distinguish evidence from assumption?</li><li>What would I shorten or clarify?</li></ul><p className="muted smalltext">Self-review, not automated scoring. Accent, pauses, and word count are not measures of design ability.</p></section></aside></div><section className="panel">{note(`speaking_${day}`,'One thing to improve in the next take','Name a specific sentence, missing example, or decision to explain. Then record another take.',4)}</section><section className="panel"><h2>Saved recordings <span className="count">{recordings.length}</span></h2>{recordings.length?recordings.map(r=><div className="recordrow" key={r.id}><div><strong>{r.label}</strong><small>{new Date(r.date).toLocaleString()}</small></div><audio controls preload="none" src={`/api/audio?id=${r.id}`}/></div>):<p className="muted">Your first saved take will appear here. Keep day one so you can compare it with day seven.</p>}</section></>}
 {view==='lab'&&<><div className="filters"><label htmlFor="company-filter">Company<select id="company-filter" aria-label="Filter challenges by company" value={company} onChange={e=>setCompany(e.target.value)}>{['All','Apple','Google','Atlassian','General'].map(x=><option key={x}>{x}</option>)}</select></label><label htmlFor="focus-filter">Focus<select id="focus-filter" aria-label="Filter challenges by category" value={filter} onChange={e=>setFilter(e.target.value)}>{['All',...new Set(challenges.map(c=>c.category))].map(x=><option key={x}>{x}</option>)}</select></label><label htmlFor="difficulty-filter">Difficulty<select id="difficulty-filter" aria-label="Filter challenges by difficulty" value={level} onChange={e=>setLevel(e.target.value)}>{['All','Warm-up','Senior','Stretch'].map(x=><option key={x}>{x}</option>)}</select></label><span className="muted smalltext">{challenges.filter(c=>(filter==='All'||c.category===filter)&&(level==='All'||c.level===level)&&(company==='All'||c.company===company)).length} challenges available</span></div><div className="labgrid"><section className="challengeitems" role="region" aria-label="Design challenges list">{challenges.filter(c=>(filter==='All'||c.category===filter)&&(level==='All'||c.level===level)&&(company==='All'||c.company===company)).map(c=><button key={c.id} className={`challengeitem ${selected===c.id-1?'selected':''}`} aria-current={selected===c.id-1?'true':undefined} onClick={()=>challengeSelect(c.id-1)}><span className="eyebrow">{String(c.id).padStart(2,'0')} · {c.company} · {c.category} · {c.level}</span><strong>{c.title}</strong></button>)}</section><section className="panel challengeworkspace" ref={workspaceRef} tabIndex={-1}><div className="sectionhead"><span className="tag">{selectedChallenge.company} · {selectedChallenge.category} / {selectedChallenge.level}</span><span className="muted smalltext">15–30 min</span></div><h2 className="prompt">{selectedChallenge.title}</h2><p>{selectedChallenge.prompt}</p><div className="inset"><h3>Before you draw</h3><ul><li>Who is the user, and what job matters?</li><li>What outcome and constraints shape the decision?</li><li>What evidence exists, and what are you assuming?</li></ul></div><div className="threeways"><div><b>A · Expected</b><p>A strong conventional solution.</p></div><div><b>B · Reframed</b><p>Change the mental model.</p></div><div><b>C · Radical</b><p>Question whether the work should exist.</p></div></div>{note(`challenge_${selectedChallenge.id}`,'Your working notes','Clarify → evidence → three options → choice → flow → edge states → accessibility → measurement. Link to your sketch if useful.',7)}<div className="actions"><button className="secondary" onClick={()=>openSpeak(selectedChallenge.prompt)}>Defend it aloud</button><button className="secondary" onClick={()=>setInterruption(interruptions[(interruptions.indexOf(interruption)+1)%interruptions.length])}>Add a constraint</button></div>{interruption&&<p className="constraint">New constraint: {interruption}</p>}<button className="disclosure" aria-expanded={challengeReveal} aria-controls="coaching-notes" onClick={()=>setChallengeReveal(!challengeReveal)}>{challengeReveal?'Hide coaching notes':'I have attempted it — show coaching notes'}<ChevronRight size={17}/></button>{challengeReveal&&<div id="coaching-notes" className="inset"><h3>Risk to examine</h3><p>{selectedChallenge.risk}</p><h3>Reasoning to explore</h3><div style={{whiteSpace:'pre-line',fontSize:'0.9rem',lineHeight:1.6}}>{selectedChallenge.notes}</div><h3>Self-review</h3><p>Can you defend user value, feasibility, accessibility, risk, and the rejected alternative? State a success metric, a guardrail, and the next experiment. These are coaching directions, not a single correct solution.</p></div>}</section></div></>}
 {view==='sharp'&&<>
  <section className="panel sharpframe" aria-label="The five actions">
   <div className="dosehead">
    <p className="eyebrow" style={{margin:0}}>THE LOOP · EVERY REP, EVERY MODE</p>
    <span className="streakchip" role="status" aria-label={sharpStreak>0?`Sharpness streak: ${sharpStreak} days`:'No sharpness streak yet — log a session to begin'}><Flame size={14} aria-hidden="true"/> {sharpStreak>0?`${sharpStreak}-day streak`:'Start your streak'}</span>
   </div>
   <div className="actionstrip">
    {sharpActions.map((a,i)=><div key={a.id} className="actioncard">
     <span className="actionnum">{i+1}</span>
     <strong>{a.label}</strong>
     <em>{a.question}</em>
     <p>{a.prompt}</p>
     {frameOpen&&<p className="actiongood"><Check size={13} aria-hidden="true"/> {a.good}</p>}
     {frameOpen&&<p className="actionbad"><X size={13} aria-hidden="true"/> {a.failure}</p>}
    </div>)}
   </div>
   <button className="textbutton" aria-expanded={frameOpen} onClick={()=>setFrameOpen(v=>!v)}>{frameOpen?'Hide what strong and weak sound like':'Show what strong and weak sound like'} <ChevronRight size={14} aria-hidden="true"/></button>
  </section>

  <section className="panel rhythmcard" aria-label="Weekly rhythm">
   <div className="sectionhead">
    <div><h2>{todayRhythm.day} · {modeById(rhythmMode).name}</h2><p className="muted smalltext">{todayRhythm.note}</p></div>
    <button className="secondary small" onClick={()=>pickMode(rhythmMode)}>Practise today’s mode <ChevronRight size={14} aria-hidden="true"/></button>
   </div>
   <div className="rhythmrow" role="group" aria-label="This week’s sharpness sessions">
    {sharpWeek.map((d,i)=><button key={d.ds} className={`rhythmday${d.logged?' done':''}${d.isToday?' today':''}`} aria-label={`${d.plan.day} ${d.ds}: ${modeById(d.plan.mode==='review'?'autopsy':d.plan.mode).name}${d.logged?' — logged':' — not logged'}${d.isToday?' (today)':''}`} onClick={()=>pickMode(d.plan.mode==='review'?'autopsy':d.plan.mode)}>
     <span>{d.plan.short}</span>
     <small>{modeById(d.plan.mode==='review'?'autopsy':d.plan.mode).short}</small>
     {d.logged&&<Check size={12} aria-hidden="true"/>}
    </button>)}
   </div>
   {todayRhythm.day==='Sunday'&&<p className="sayhint"><RotateCcw size={13} aria-hidden="true"/> {sundayRevision}</p>}
  </section>

  <div className="domainchips" role="group" aria-label="Practice modes">
   {sharpModes.map(m=>{const Icon=sharpIcons[m.id];return <button key={m.id} aria-pressed={sharpMode===m.id} className={`chip${sharpMode===m.id?' chosen':''}`} onClick={()=>pickMode(m.id)}><Icon size={15} aria-hidden="true"/> {m.name}</button>;})}
  </div>

  <section className="panel modecard" aria-label={`${mode.name} briefing`}>
   <div className="dosehead">
    <p className="eyebrow" style={{margin:0}}>{mode.name.toUpperCase()} · {mode.minutes} MIN</p>
    {sharpOn||sharpLeft>0?(
     <span className="drilltimer" aria-live="off" aria-label={`Rep time remaining: ${time(sharpLeft)}`}>{time(sharpLeft)}
      {sharpOn?<button className="ghostbtn" aria-label="Pause rep timer" onClick={sharpPause}><Pause size={14}/></button>:<button className="ghostbtn" aria-label="Resume rep timer" onClick={sharpStart}><Play size={14}/></button>}
      <button className="ghostbtn" aria-label="Reset rep timer" onClick={sharpResetTimer}><RotateCcw size={14}/></button>
     </span>
    ):<button className="small" onClick={sharpStart}><Play size={14}/> Start {mode.minutes}-min rep</button>}
   </div>
   <h2>{mode.tagline}</h2>
   <p className="drillbrief">{mode.trains}</p>
   <ol className="drillsteps">{mode.steps.map(s=><li key={s}>{s}</li>)}</ol>
   <div className="actionmini" aria-label="Actions trained by this mode">{sharpActions.filter(a=>mode.actions.includes(a.id)).map(a=><span key={a.id}>{a.label}</span>)}</div>
   <p className="sayhint"><Sparkles size={13} aria-hidden="true"/> {mode.senior}</p>
   {sharpMode!=='critique'&&<button className="textbutton" aria-expanded={libOpen} onClick={()=>setLibOpen(v=>!v)}><ImageIcon size={14} aria-hidden="true"/> {libOpen?'Hide the Critique Library':`Capture this to the Critique Library${library.length?` (${library.length} saved)`:''}`}</button>}
  </section>

  {sharpMode==='critique'&&<>
   <section className="panel">
    <div className="sectionhead">
     <div><span className="domtag">{sprint.sector}</span><h2 style={{marginTop:'8px'}}>{sprint.surface}</h2><p className="muted smalltext">{sprint.context}</p></div>
     <button className="textbutton" onClick={sharpNext}>Another surface <ChevronRight size={14} aria-hidden="true"/></button>
    </div>
    <div className="signalbox">
     <span>OBSERVABLE SIGNALS — FACTS ONLY</span>
     <ul>{sprint.signals.map(s=><li key={s}>{s}</li>)}</ul>
    </div>
    <h3><ListChecks size={16} aria-hidden="true"/> Five questions · five minutes</h3>
    {critiqueQuestions.map((cq,i)=><div key={cq}>{note(`sharp_cs_${sprint.id}_q${i}`,`${i+1}. ${cq}`,i===3?'One move only. Say why it is first.':i===4?'Name who loses, and what you would watch.':'One or two lines. Speak it aloud first.',2)}</div>)}
    <div className="actions" style={{marginTop:'18px'}}>
     <button className="secondary" onClick={()=>openSpeak(`Critique sprint — ${sprint.surface}. ${sprint.context} Answer all five: ${critiqueQuestions.join(' ')}`,300)}><Mic size={15}/> Answer aloud · 5 min</button>
     <button className={sharpStage>0?'secondary':''} aria-expanded={sharpStage>0} onClick={()=>setSharpStage(sharpStage>0?0:1)}>{sharpStage>0?'Hide the sharp answer':'Show the sharp answer'}</button>
    </div>
    {sharpStage>0&&<div className="revealbox">
     <h3><Lightbulb size={16} aria-hidden="true"/> What a sharp answer names</h3>
     <p>{sprint.lens}</p>
     <p className="trapline"><TriangleAlert size={14} aria-hidden="true"/> Common trap: {sprint.trap}</p>
     <button className="textbutton" onClick={()=>openDrillTopic(sprint.topicId)}>Related encyclopedia topic <ChevronRight size={14} aria-hidden="true"/></button>
    </div>}
   </section>

  </>}

  {sharpMode==='constraint'&&<>
   <section className="panel">
    <div className="sectionhead">
     <div><span className="tag">BASE CHALLENGE · {baseChallenge.company.toUpperCase()} · {baseChallenge.category}</span><h2 style={{marginTop:'10px'}}>{baseChallenge.title}</h2></div>
     <button className="textbutton" onClick={sharpNext}>Another pairing <ChevronRight size={14} aria-hidden="true"/></button>
    </div>
    <p className="lede">{baseChallenge.prompt}</p>
    <p className="muted smalltext">Work it normally for six minutes. Do not read ahead — the value of this mode is entirely in not seeing it coming.</p>
    {note(`sharp_ci_base_${baseChallenge.id}`,'Your approach before the interruption','User, job, first direction, and the one thing you would build first.',3)}
    <div className="actions">
     <button disabled={sharpStage>0} onClick={()=>setSharpStage(1)}><Zap size={15}/> {sharpStage>0?'Constraint revealed':'Reveal the constraint'}</button>
     <button className="secondary" onClick={()=>openSpeak(`Design challenge: ${baseChallenge.prompt}`,360)}><Mic size={15}/> Work it aloud · 6 min</button>
    </div>
   </section>
   {sharpStage>0&&<section className="panel constraintcard">
    <span className="tag">THE INTERRUPTION · SIXTY SECONDS TO ADAPT</span>
    <h2 style={{marginTop:'10px'}}>{constraintCard.label}</h2>
    <p className="constraint">{constraintCard.reveal}</p>
    <p className="muted smalltext"><Target size={13} aria-hidden="true"/> What this actually tests: {constraintCard.tests}</p>
    {note(`sharp_ci_adapt_${baseChallenge.id}_${constraintCard.id}`,'Adapt out loud, then write it down','What survives, what you drop, what you will no longer promise — and your new first move.',3)}
    <div className="actions">
     <button className="secondary" onClick={()=>openSpeak(`Constraint: ${constraintCard.reveal} Adapt your design in sixty seconds. What survives, what goes, what do you no longer promise?`,60)}><Mic size={15}/> Adapt aloud · 60s</button>
     <button className={sharpStage>1?'secondary':''} aria-expanded={sharpStage>1} onClick={()=>setSharpStage(sharpStage>1?1:2)}>{sharpStage>1?'Hide the comparison':'Compare with cheap and sharp'}</button>
    </div>
    {sharpStage>1&&<div className="trapgrid" style={{marginTop:'18px'}}>
     <div className="trapweak"><b>THE CHEAP ANSWER</b><p>{constraintCard.cheap}</p></div>
     <div className="trapsenior"><b>THE SHARP ANSWER</b><p>{constraintCard.sharp}</p></div>
     <div className="trapweak" style={{gridColumn:'1/-1',background:'#fff',borderColor:'#dfe4ee'}}><b>FIRST MOVE</b><p>{constraintCard.firstMove}</p></div>
     <div className="trapsenior" style={{gridColumn:'1/-1'}}><b>HOW YOU WOULD KNOW</b><p>{constraintCard.measure}</p></div>
    </div>}
   </section>}
  </>}

  {sharpMode==='metrics'&&<section className="panel">
   <div className="sectionhead">
    <div><span className="domtag">{metricsKindMeta[rep.kind].label}</span><h2 style={{marginTop:'8px'}}>{rep.title}</h2><p className="muted smalltext">{metricsKindMeta[rep.kind].blurb}</p></div>
    <button className="textbutton" onClick={sharpNext}>Another rep <ChevronRight size={14} aria-hidden="true"/></button>
   </div>
   <div className="casestudy"><p>{rep.scenario}</p></div>
   <h3><ListChecks size={16} aria-hidden="true"/> The rep</h3>
   <ol className="drillsteps">{rep.tasks.map(t=><li key={t}>{t}</li>)}</ol>
   {note(`sharp_mg_${rep.id}`,'Your answers','One line per task. Name the segment and the window before you name a number.',5)}
   <div className="actions">
    <button className="secondary" onClick={()=>openSpeak(`Metrics rep — ${rep.title}. ${rep.scenario} ${rep.tasks.join(' ')}`,180)}><Mic size={15}/> Reason aloud · 3 min</button>
    <button className={sharpStage>0?'secondary':''} aria-expanded={sharpStage>0} onClick={()=>setSharpStage(sharpStage>0?0:1)}>{sharpStage>0?'Hide the defensible read':'Show a defensible read'}</button>
   </div>
   {sharpStage>0&&<div className="revealbox">
    <h3><Lightbulb size={16} aria-hidden="true"/> One defensible read</h3>
    <p>{rep.read}</p>
    <p className="trapline"><TriangleAlert size={14} aria-hidden="true"/> Trap: {rep.trap}</p>
    <button className="textbutton" onClick={()=>openDrillTopic(rep.topicId)}>Related encyclopedia topic <ChevronRight size={14} aria-hidden="true"/></button>
   </div>}
  </section>}

  {sharpMode==='synthesis'&&<section className="panel">
   <div className="sectionhead">
    <div><h2>{synth.title}</h2><p className="muted smalltext">{synth.context}</p></div>
    <button className="textbutton" onClick={sharpNext}>Another study <ChevronRight size={14} aria-hidden="true"/></button>
   </div>
   <p className="methodline"><FileText size={14} aria-hidden="true"/> {synth.method}</p>
   <h3><Split size={16} aria-hidden="true"/> Sort every line before you cluster anything</h3>
   <ul className="synthlist">
    {synth.items.map(it=><li key={it.id} className={synthChecked?(synthPicks[it.id]===it.kind?'right':'wrong'):''}>
     <p>{it.text}</p>
     <div className="segmented" role="group" aria-label={`Classify: ${it.text.slice(0,60)}`}>
      {(['observation','interpretation'] as const).map(k=><button key={k} className={synthPicks[it.id]===k?'chosen':''} aria-pressed={synthPicks[it.id]===k} disabled={synthChecked} onClick={()=>setSynthPicks(p=>({...p,[it.id]:k}))}>{k==='observation'?'Observation':'Interpretation'}</button>)}
     </div>
     {synthChecked&&<p className="synthwhy"><strong>{it.kind==='observation'?'Observation':'Interpretation'}</strong> — {it.why}</p>}
    </li>)}
   </ul>
   <div className="actions">
    <button disabled={synthChecked||Object.keys(synthPicks).length<synth.items.length} onClick={()=>setSynthChecked(true)}><Check size={15}/> Check my sort ({Object.keys(synthPicks).length}/{synth.items.length})</button>
    {synthChecked&&<span className="muted smalltext">{synth.items.filter(it=>synthPicks[it.id]===it.kind).length} of {synth.items.length} sorted correctly. Interpretations are where premature solutions get in.</span>}
   </div>
   <hr/>
   {note(`sharp_rs_${synth.id}_clusters`,'Your clusters','Name each cluster in the user’s language, not the product’s.',3)}
   {note(`sharp_rs_${synth.id}_contradiction`,'The contradiction','Two things in this set do not fit together. Which, and what does that force you to admit?',2)}
   {note(`sharp_rs_${synth.id}_insight`,'One insight','A sentence that explains behaviour. Not a feature, not a complaint.',2)}
   {note(`sharp_rs_${synth.id}_opportunity`,'One opportunity statement','How might we… — framed so more than one solution could win.',2)}
   {note(`sharp_rs_${synth.id}_limits`,'What cannot yet be concluded','The discipline that separates evidence from enthusiasm.',2)}
   <div className="actions">
    <button className={sharpStage>0?'secondary':''} aria-expanded={sharpStage>0} onClick={()=>setSharpStage(sharpStage>0?0:1)}>{sharpStage>0?'Hide the debrief':'Show the debrief'}</button>
    <button className="secondary" onClick={()=>openSpeak(`Synthesis — ${synth.title}. State your insight, your opportunity statement, and what cannot yet be concluded.`,120)}><Mic size={15}/> Present it · 2 min</button>
   </div>
   {sharpStage>0&&<div className="revealbox">
    <h3><Lightbulb size={16} aria-hidden="true"/> Debrief</h3>
    <p><strong>The contradiction.</strong> {synth.contradiction}</p>
    <p><strong>One insight.</strong> {synth.insight}</p>
    <p><strong>One opportunity.</strong> {synth.opportunity}</p>
    <p className="trapline"><TriangleAlert size={14} aria-hidden="true"/> Cannot yet be concluded: {synth.cannotConclude}</p>
    <button className="textbutton" onClick={()=>openDrillTopic(synth.topicId)}>Related encyclopedia topic <ChevronRight size={14} aria-hidden="true"/></button>
   </div>}
  </section>}

  {sharpMode==='summary'&&<section className="panel">
   <h2>Three lengths, one decision</h2>
   <p className="muted smalltext">Use the work you just finished in another mode, or a live decision you owe someone an answer on.</p>
   {note('sharp_sum_subject','The decision you are summarising','Name it in one line — the choice, not the project.',2)}
   {summaryLevels.map(l=><div key={l.id} className="sumlevel">
    <div className="sectionhead">
     <div><h3>{l.label}<span className="count">{l.words}</span></h3></div>
     <button className="secondary small" onClick={()=>openSpeak(`${l.label} summary. Must contain: ${l.mustContain.join(' ')}`,l.seconds)}><Mic size={14}/> Record · {l.label}</button>
    </div>
    <ul className="principlelist">{l.mustContain.map(x=><li key={x}><CheckCircle2 size={15} aria-hidden="true"/>{x}</li>)}</ul>
    <p className="sayhint"><Trash2 size={13} aria-hidden="true"/> Cut: {l.cut}</p>
    <p className="sayhint"><ShieldCheck size={13} aria-hidden="true"/> Passes when: {l.test}</p>
    {note(`sharp_sum_${l.id}`,`Your ${l.label} version`,'Write it, then read it aloud against the clock. Trim whatever you stumble on.',l.id==='thirty'?3:l.id==='two'?5:8)}
   </div>)}
   <div className="trapbox">
    <h3><TriangleAlert size={16} aria-hidden="true"/> Five ways this goes wrong</h3>
    <ul className="cleanlist">{summaryFaults.map(f=><li key={f}>{f}</li>)}</ul>
   </div>
  </section>}

  {sharpMode==='crossexam'&&(()=>{
   const storyKeys=[...new Set(['story_first',...Object.keys(entries).filter(k=>k.startsWith('story_')),...Object.keys(drafts).filter(k=>k.startsWith('story_'))])];
   const s=value(cxStory,{title:'My first project',status:'Needs evidence',fields:{}});
   const ev=String(s.fields?.[cxQ.evidenceField]||'').trim();
   const answerKey=cxKey(cxStory,cxQ.id);
   const answer=String(value(answerKey,'')||'').trim();
   const done=crossExamQuestions.filter(x=>cxAnswered(cxStory,x.id)).length;
   const coreLeft=crossExamQuestions.filter(x=>x.core&&!cxAnswered(cxStory,x.id)).length;
   return <section className="panel">
    <div className="sectionhead">
     <div><h2>Cross-examine one story</h2><p className="muted smalltext">Ninety seconds, out loud, without reading your notes first.</p></div>
     <label htmlFor="cx-story" className="dayselect">Story<select id="cx-story" value={cxStory} onChange={e=>{setCxStory(e.target.value);setSharpStage(0);}}>{storyKeys.map(k=><option key={k} value={k}>{value(k,{title:'My first project'}).title||'Untitled project'}</option>)}</select></label>
    </div>
    {s.status!=='Verified'&&<div className="alert" role="status">This story is marked “{s.status||'Needs evidence'}”. Practise freely, but verify it before it enters an interview.</div>}
    <p className="muted smalltext" style={{marginBottom:'8px'}}><ListChecks size={13} aria-hidden="true"/> {done} of {crossExamQuestions.length} answered for this story · {coreLeft===0?'every core question rehearsed':`${coreLeft} core question${coreLeft===1?'':'s'} still unrehearsed`}</p>
    <div className="cxjump" role="group" aria-label="Questions for this story">
     {crossExamQuestions.map((x,i)=><button key={x.id} className={`coverdot${cxAnswered(cxStory,x.id)?' done':''}${x.core?' core':''}${x.id===cxQ.id?' current':''}`} aria-current={x.id===cxQ.id?'true':undefined} aria-label={`${x.core?'Core':'Pressure'} question ${i+1}: ${x.question} — ${cxAnswered(cxStory,x.id)?'answered':'not answered yet'}`} title={x.question} onClick={()=>goToQuestion(i)}>{cxAnswered(cxStory,x.id)?<Check size={13}/>:i+1}</button>)}
    </div>
    <div className="questioncard">
     <span className="tag">{cxQ.core?'CORE QUESTION':'PRESSURE QUESTION'}</span>
     <p className="prompt">{cxQ.question}</p>
     <p className="muted smalltext"><Target size={13} aria-hidden="true"/> Why they ask: {cxQ.whyAsked}</p>
    </div>
    <div className={ev?'evidencebox':'evidencebox empty'}>
     <span>YOUR RECORDED EVIDENCE · {cxQ.evidenceField.toUpperCase()}</span>
     {ev?<p>{ev}</p>:<p>Nothing recorded in this field yet — so this claim is not usable in an interview. Answer below, then promote it into the story.</p>}
     <button className="textbutton" onClick={()=>{setStory(cxStory);nav('stories');}}>Open this story <ChevronRight size={14} aria-hidden="true"/></button>
    </div>
    {note(answerKey,'Your answer','Answer first, then check it against the evidence above. If they disagree, the evidence wins.',3,cxStory==='story_first'?String(value(`sharp_cx_${cxQ.id}`,'')||''):'')}
    <div className="actions">
     <button className="secondary" onClick={()=>openSpeak(`${cxQ.question} (About: ${s.title||'this project'})`,90)}><Mic size={15}/> Answer aloud · 90s</button>
     <button className={sharpStage>0?'secondary':''} aria-expanded={sharpStage>0} onClick={()=>setSharpStage(sharpStage>0?0:1)}>{sharpStage>0?'Hide the comparison':'Compare weak and strong'}</button>
     <button className="textbutton" onClick={()=>{setCxIdx(i=>i+1);setSharpStage(0);}}>Draw another question <ChevronRight size={14} aria-hidden="true"/></button>
    </div>
    {answer&&<div className="promoterow">
     <strong>{ev?`Promote this answer into “${cxQ.evidenceField}”`:`“${cxQ.evidenceField}” is empty — this answer can fill it`}</strong>
     <p>{ev?'Appending keeps what you already verified and adds the sharper sentence underneath. Replacing is for when the old text was simply wrong.':'Promoting writes it straight into the story. Nothing is marked verified for you.'}</p>
     <div className="actions">
      <button onClick={()=>promoteAnswer(cxStory,cxQ.evidenceField,answer,false)}><Plus size={15}/> {ev?'Append to my story':'Write into my story'}</button>
      {ev&&<button className="secondary" onClick={()=>promoteAnswer(cxStory,cxQ.evidenceField,answer,true)}><RotateCcw size={15}/> Replace the field</button>}
      <span className="muted smalltext">Saved drafts promote too — press Save notes first if you want the latest text.</span>
     </div>
    </div>}
    {sharpStage>0&&<>
     <div className="trapgrid" style={{marginTop:'18px'}}>
      <div className="trapweak"><b>WEAK</b><p>{cxQ.weak}</p></div>
      <div className="trapsenior"><b>STRONG</b><p>{cxQ.strong}</p></div>
     </div>
     <p className="trapline" style={{marginTop:'14px'}}><MessageCircle size={14} aria-hidden="true"/> They will follow up with: “{cxQ.followUp}”</p>
    </>}
   </section>;
  })()}

  {sharpMode==='a11yrepair'&&<section className="panel">
   <div className="sectionhead">
    <div><h2>{a11yCase.screen}</h2><p className="muted smalltext">{a11yCase.context}</p></div>
    <button className="textbutton" onClick={sharpNext}>Another screen <ChevronRight size={14} aria-hidden="true"/></button>
   </div>
   <p className="sayhint">Find everything you can across all seven categories before revealing anything.</p>
   <div className="domainchips">{a11yCategories.map(c=><span key={c} className="chip">{c}</span>)}</div>
   {note(`sharp_ar_${a11yCase.id}`,'What you found','One line per defect, and who it blocks. Name the task they cannot finish.',6)}
   <div className="actions">
    <button disabled={sharpStage>0} onClick={()=>setSharpStage(1)}><ScanEye size={15}/> {sharpStage>0?'Defects revealed':'Reveal the defect set'}</button>
    <button className="secondary" onClick={()=>openSpeak(`Accessibility repair — ${a11yCase.screen}. ${a11yCase.context} Name the defects, then rank them by who is blocked.`,240)}><Mic size={15}/> Audit aloud · 4 min</button>
   </div>
   {sharpStage>0&&<>
    <h3 style={{marginTop:'24px'}}><ListChecks size={16} aria-hidden="true"/> Tick what you found</h3>
    <ul className="defectlist">
     {a11yCase.defects.map(d=><li key={d.id} className={`sev-${d.severity}`}>
      <button className={`checkbutton ${foundDefects[`${a11yCase.id}_${d.id}`]?'checked':''}`} aria-pressed={!!foundDefects[`${a11yCase.id}_${d.id}`]} aria-label={`I found this: ${d.symptom}`} onClick={()=>setFoundDefects(f=>({...f,[`${a11yCase.id}_${d.id}`]:!f[`${a11yCase.id}_${d.id}`]}))}>{foundDefects[`${a11yCase.id}_${d.id}`]&&<Check size={13}/>}</button>
      <div>
       <div className="cardmeta"><span className="domtag">{d.category}</span><span className={`statusbadge ${d.severity==='blocker'?'s-block':d.severity==='major'?'s-rev':'s-new'}`}>{d.severity}</span></div>
       <p className="defsymptom">{d.symptom}</p>
       <p className="tcsum"><strong>Blocks:</strong> {d.blocks}</p>
       <p className="tcsum"><strong>Repair:</strong> {d.repair}</p>
       <p className="sourcespan">{d.wcag}</p>
      </div>
     </li>)}
    </ul>
    <p className="muted smalltext">You found {a11yCase.defects.filter(d=>foundDefects[`${a11yCase.id}_${d.id}`]).length} of {a11yCase.defects.length}. Missing one is information, not failure — note which category you keep missing.</p>
    <h3 style={{marginTop:'24px'}}><Target size={16} aria-hidden="true"/> Which one do you ship first?</h3>
    <div className="repairpick" role="group" aria-label="Choose the first repair">
     {a11yCase.defects.map(d=><button key={d.id} className={firstRepair===d.id?'chosen':''} aria-pressed={firstRepair===d.id} onClick={()=>{setFirstRepair(d.id);setSharpStage(2);}}>{d.category}: {d.symptom.slice(0,58)}{d.symptom.length>58?'…':''}</button>)}
    </div>
    {sharpStage>1&&<div className="revealbox">
     <h3><Lightbulb size={16} aria-hidden="true"/> Defensible ordering</h3>
     <p>{a11yCase.ordering}</p>
     <button className="textbutton" onClick={()=>openDrillTopic(a11yCase.topicId)}>Related encyclopedia topic <ChevronRight size={14} aria-hidden="true"/></button>
    </div>}
   </>}
  </section>}

  {sharpMode==='autopsy'&&<section className="panel">
   <div className="sectionhead">
    <div><span className="tag">{autopsy.period}</span><h2 style={{marginTop:'10px'}}>{autopsy.subject}</h2></div>
    <button className="textbutton" onClick={sharpNext}>Another case <ChevronRight size={14} aria-hidden="true"/></button>
   </div>
   <div className="casestudy"><p>{autopsy.whatHappened}</p></div>
   <p className="sourcespan">{autopsy.reported} Treat this as a practice lens, not an account of anyone’s internal reasoning.</p>
   {note(`sharp_ap_${autopsy.id}_behaviour`,'What user behaviour was misunderstood?','Write this before you choose a lens — the lens will bias the answer otherwise.',3)}
   <h3><Target size={16} aria-hidden="true"/> Commit to one dominant risk</h3>
   <div className="lensgrid" role="group" aria-label="Choose the dominant risk">
    {riskLenses.map(l=><button key={l.id} className={`lensbtn${lensPick===l.id?' chosen':''}`} aria-pressed={lensPick===l.id} onClick={()=>setLensPick(l.id)}><strong>{l.label}</strong><small>{l.asks}</small></button>)}
   </div>
   {note(`sharp_ap_${autopsy.id}_signal`,'Which early signal could have exposed it — and when?','Name a number or behaviour that was observable before the money was spent.',2)}
   {note(`sharp_ap_${autopsy.id}_experiment`,'What smaller experiment should have run first?','Cheap, fast, and capable of returning bad news.',2)}
   <div className="actions">
    <button disabled={!lensPick||sharpStage>0} onClick={()=>setSharpStage(1)}><Microscope size={15}/> {sharpStage>0?'Verdict revealed':'Reveal the verdict'}</button>
    <button className="secondary" onClick={()=>openSpeak(`Failure autopsy — ${autopsy.subject}. What behaviour was misunderstood, which risk was mispriced, what signal came first, and what smaller experiment should have run?`,180)}><Mic size={15}/> Present it · 3 min</button>
   </div>
   {sharpStage>0&&<div className="revealbox">
    <h3><Lightbulb size={16} aria-hidden="true"/> {lensPick===autopsy.verdict?'You called it: ':'A defensible verdict: '}{riskLenses.find(l=>l.id===autopsy.verdict)?.label}{lensPick&&lensPick!==autopsy.verdict?` — you chose ${riskLenses.find(l=>l.id===lensPick)?.label}`:''}</h3>
    <p>{autopsy.verdictWhy}</p>
    <p><strong>Secondary risk.</strong> {riskLenses.find(l=>l.id===autopsy.secondary)?.label} — rarely the headline, usually the accelerant.</p>
    <p><strong>Behaviour misread.</strong> {autopsy.behaviourMisread}</p>
    <p><strong>Earliest signal.</strong> {autopsy.earlySignal}</p>
    <p><strong>The smaller experiment.</strong> {autopsy.smallerExperiment}</p>
    <p className="trapline"><Sparkles size={14} aria-hidden="true"/> Transferable: {autopsy.transferable}</p>
   </div>}
  </section>}

  {(sharpMode==='critique'||libOpen)&&<section className="panel libpanel" aria-label="Critique Library">
   <div className="sectionhead">
    <div><h2>Critique Library</h2><p className="muted smalltext">{library.length} saved · notes sync privately, screenshots stay on this device only.</p></div>
    <button className="secondary small" onClick={exportLibrary} disabled={!libFiltered.length}><Download size={14}/> Export{libFilterOn?` these ${libFiltered.length}`:' as Markdown'}</button>
   </div>
   <div className="libform">
    <div className="formgrid">
     <label htmlFor="lib-title">Title<input id="lib-title" value={libTitle} maxLength={120} placeholder={sharpMode==='critique'?sprint.surface:'What did you just see?'} onChange={e=>setLibTitle(e.target.value)}/></label>
     <label htmlFor="lib-principle">Principle in play<input id="lib-principle" list="lib-principles" value={libPrinciple} maxLength={80} placeholder="Type freely — encyclopedia topics autocomplete" onChange={e=>setLibPrinciple(e.target.value)}/></label>
    </div>
    <datalist id="lib-principles">{uxEncyclopedia.map(t=><option key={t.id} value={t.title}/>)}</datalist>
    <label htmlFor="lib-note">Two sentences<textarea id="lib-note" rows={2} maxLength={1200} value={libNote} placeholder="What is alive or violated here, and what would you test first?" onChange={e=>setLibNote(e.target.value)}/></label>
    <label htmlFor="lib-shot" className="shotlabel"><ImageIcon size={14} aria-hidden="true"/> Screenshot (optional — stored on this device)</label>
    <input id="lib-shot" ref={shotInput} type="file" accept="image/*" onChange={e=>setLibFile(e.target.files?.[0]||null)}/>
    <div className="actions">
     {sharpMode==='critique'&&<button disabled={libBusy} onClick={()=>saveLibrary('sprint',`cl_${crypto.randomUUID()}`)}><Upload size={15}/> {libBusy?'Saving…':'Save this sprint'}</button>}
     <button className={sharpMode==='critique'?'secondary':''} disabled={libBusy} onClick={()=>saveLibrary('wild',`cl_${crypto.randomUUID()}`)}><Eye size={15}/> {libBusy?'Saving…':'Save as craft-in-the-wild'}</button>
     <span className="muted smalltext">{sharpMode==='critique'?'Sprint saves copy your five answers. Craft-in-the-wild saves the note alone.':'Tag it with a principle so it can be found again in six months.'}</span>
    </div>
   </div>
   {library.length>0&&<div className="libfilters">
    <div className="searchwrap"><Search size={17} aria-hidden="true"/><input type="search" aria-label="Search your critique library" placeholder="Search titles, notes, principles, answers…" value={libQuery} onChange={e=>setLibQuery(e.target.value)}/></div>
    <div className="segmented" role="group" aria-label="Filter by capture type">
     {([['all','All'],['sprint','Sprints'],['wild','In the wild']] as const).map(([k,l])=><button key={k} className={libKind===k?'chosen':''} aria-pressed={libKind===k} onClick={()=>setLibKind(k)}>{l}</button>)}
    </div>
   </div>}
   {libTags.length>0&&<div className="domainchips" role="group" aria-label="Filter by principle">
    <button className={`chip${libTag?'':' chosen'}`} aria-pressed={!libTag} onClick={()=>setLibTag('')}>All principles <span>{library.length}</span></button>
    {libTags.map(t=><button key={t.key} className={`chip${libTag===t.key?' chosen':''}`} aria-pressed={libTag===t.key} onClick={()=>setLibTag(libTag===t.key?'':t.key)}>{t.label} <span>{t.count}</span></button>)}
   </div>}
   {libFiltered.length>0?<div className="libgrid">
    {libFiltered.map(item=>{const topic=topicByName(item.principle||'');return <article key={item.id} className="libcard">
     {/* eslint-disable-next-line @next/next/no-img-element -- on-device blob URL, never a remote asset */}
     {item.hasShot&&shotUrls[item.id]&&<img src={shotUrls[item.id]} alt={`Screenshot saved with ${item.title}`}/>}
     <div className="libbody">
      <div className="cardmeta"><span className="topicnum">{new Date(item.date).toLocaleDateString()}</span><span className="statusbadge s-rev">{item.kind==='sprint'?'Sprint':'In the wild'}</span></div>
      <strong className="tctitle">{item.title}</strong>
      {item.principle&&(topic
        ?<button className="domtag linktag" onClick={()=>openDrillTopic(topic.id)} aria-label={`Open the encyclopedia topic ${topic.title}`}>{item.principle} <ChevronRight size={11} aria-hidden="true"/></button>
        :<span className="domtag">{item.principle}</span>)}
      {item.note&&<p className="tcsum">{item.note}</p>}
      {(item.answers||[]).length>0&&<details><summary>Five answers</summary><ul className="cleanlist">{item.answers.map((a:LibAnswer,i:number)=><li key={i}><strong>{a.q}</strong><br/>{a.a}</li>)}</ul></details>}
      <button className="textbutton" onClick={()=>removeLibrary(item.id)}><Trash2 size={13} aria-hidden="true"/> Remove</button>
     </div>
    </article>;})}
   </div>:library.length>0
    ?<div className="encycempty"><strong>No captures match</strong>Clear the filters, or add today’s capture.<div className="actions" style={{justifyContent:'center',marginTop:'14px'}}><button className="secondary small" onClick={()=>{setLibTag('');setLibQuery('');setLibKind('all');}}>Clear filters</button></div></div>
    :<div className="encycempty"><strong>Nothing saved yet</strong>One capture a day builds a library nobody else has — your own evidence of what good and bad look like in the wild.</div>}
  </section>}

  <section className="panel rubricpanel" aria-label="Self-review">
   <div className="sectionhead">
    <div><h2>Self-review · no score, one repair</h2><p className="muted smalltext">Six dimensions, marked honestly. The output is your weakest one and the drill that fixes it.</p></div>
    <span className="progpill"><span className="pdot rev" aria-hidden="true"/> {markedDims}/6 marked</span>
   </div>
   {sharpRubric.map(d=><div key={d.id} className="rubricrow">
    <div className="rubriclabel"><strong>{d.label}</strong><small>{d.asks}</small></div>
    <div className="segmented" role="group" aria-label={d.label}>
     {rubricLevels.map(l=><button key={l.id} className={review[d.id]===l.id?'chosen':''} aria-pressed={review[d.id]===l.id} aria-label={`${d.label}: ${l.label} — ${d.levels[l.id]}`} title={d.levels[l.id]} onClick={()=>setReview(r=>({...r,[d.id]:l.id}))}>{l.label}</button>)}
    </div>
   </div>)}
   {weakest&&<div className="repairbox">
    <strong>Weakest today · {weakest.label}</strong>
    <p>{weakest.levels[review[weakest.id] as RubricLevel]}</p>
    <p><Wrench size={14} aria-hidden="true"/> Repair: {weakest.repair}</p>
   </div>}
   <div className="actions">
    <button disabled={!markedDims} onClick={logSharp}><Check size={15}/> Log this session</button>
    <button className="secondary" onClick={()=>{setReview({});setSharpStage(0);}}><RotateCcw size={15}/> Clear marks</button>
    {sharpLog[todayStr]&&<span className="muted smalltext">Logged today: {modeById(sharpLog[todayStr] as SharpModeId).name}</span>}
   </div>
   <p className="privacytext"><Lock size={14} aria-hidden="true"/> Nothing here is scored or shared. Marks are for choosing tomorrow’s repair, nothing else.</p>
  </section>
 </>}
 {view==='stories'&&<><section className="panel"><div className="sectionhead"><div><h2>Your evidence bank</h2><p className="muted smalltext">Start with a real project. No achievements or metrics have been filled in for you.</p></div><button onClick={()=>{const id=`story_${crypto.randomUUID()}`;setStory(id);setDrafts(d=>({...d,[id]:{title:'Untitled project',status:'Needs evidence',fields:{}}}))}}><Plus size={16}/> New story</button></div><div className="storytabs">{[...new Set(['story_first',...Object.keys(entries).filter(k=>k.startsWith('story_')),...Object.keys(drafts).filter(k=>k.startsWith('story_'))])].map(k=><button key={k} className={story===k?'chosen':''} onClick={()=>setStory(k)}>{value(k,{title:'My first project'}).title||'Untitled project'}</button>)}</div>{(()=>{const s=value(story,{title:'',status:'Needs evidence',fields:{}});const edit=(v:any)=>setDrafts(d=>({...d,[story]:{...s,...v}}));const cxDone=crossExamQuestions.filter(x=>cxAnswered(story,x.id)).length;const cxCoreLeft=crossExamQuestions.filter(x=>x.core&&!cxAnswered(story,x.id)).length;const cxEmpty=storyFields.filter(f=>!String(s.fields?.[f]||'').trim()).length;return <><div className="formgrid"><label htmlFor="story-title-input">Project name<input id="story-title-input" value={s.title} onChange={e=>edit({title:e.target.value})} placeholder="A real project you can discuss" maxLength={150}/></label><label htmlFor="story-status-select">Evidence status<select id="story-status-select" aria-label="Evidence status" value={s.status} onChange={e=>edit({status:e.target.value})}>{['Needs evidence','Verified','Do not claim yet'].map(t=><option key={t}>{t}</option>)}</select></label></div><p className="inset smalltext">Possible starting points from your brief: NetElixir / LXRSEO / LXRGuide, Chiti Console, operational systems, Kashi Sahayak, or design-system work. Verify your role and project status before using a story in an interview.</p><div className="formgrid">{storyFields.map(f=><label key={f}>{f}<textarea rows={3} maxLength={8000} value={s.fields?.[f]||''} placeholder={f.includes('evidence')?'Describe or link the evidence. State any limitations.':'Use concrete details you can substantiate.'} onChange={e=>edit({fields:{...s.fields,[f]:e.target.value}})}/></label>)}</div><div className="actions"><button disabled={!loaded||busy.includes(story)} onClick={()=>save(story,s)}>{busy.includes(story)?'Saving…':'Save story'}</button><button className="secondary" onClick={()=>openSpeak(`Walk me through ${s.title||'this project'}. What did you personally decide, why, and what evidence supports the outcome?`)}>Rehearse this story</button><span className="muted smalltext">{drafts[story]!==undefined?'Unsaved changes':'Saved stories remain private'}</span></div>
<div className="cxcoverage">
 <div className="sectionhead">
  <div><h3>Cross-examination coverage</h3><p className="muted smalltext">{cxDone} of {crossExamQuestions.length} questions answered · {cxCoreLeft===0?'every core question rehearsed':`${cxCoreLeft} core question${cxCoreLeft===1?'':'s'} unrehearsed`}{cxEmpty>0?` · ${cxEmpty} evidence field${cxEmpty===1?'':'s'} still empty`:' · every field filled'}</p></div>
  <button className="secondary small" onClick={()=>{setCxStory(story);pickMode('crossexam');nav('sharp');}}><Crosshair size={14}/> Cross-examine this story</button>
 </div>
 <div className="covergrid" role="group" aria-label="Cross-examination questions for this story">
  {crossExamQuestions.map((x,i)=><button key={x.id} className={`coverdot${cxAnswered(story,x.id)?' done':''}${x.core?' core':''}`} title={x.question} aria-label={`${x.core?'Core':'Pressure'} question ${i+1}: ${x.question} — ${cxAnswered(story,x.id)?'answered':'not answered yet'}`} onClick={()=>{setCxStory(story);pickMode('crossexam');goToQuestion(i);nav('sharp');}}>{cxAnswered(story,x.id)?<Check size={13}/>:i+1}</button>)}
 </div>
 <p className="sayhint">A story is interview-ready when the seven core questions are answered and the answers match the evidence above — not when the fields are merely full.</p>
</div></>})()}</section><section className="panel"><h2>The five whys of design defence</h2><div className="answerpath">{['Why this approach?','Why not another?','Why this information?','Why here?','Why this hierarchy?'].map(x=><span key={x}>{x}</span>)}</div><p className="muted">Ask a peer to challenge one choice repeatedly. Revise when their question exposes a weak assumption.</p></section></>}
 {view==='learn'&&<><div style={{display:'flex',gap:'8px',marginBottom:'16px'}}><div className="segmented" role="tablist" aria-label="Study modes"><button role="tab" aria-selected={critiqueTab==='encyc'} className={critiqueTab==='encyc'?'chosen':''} onClick={()=>setCritiqueTab('encyc')}>UX Encyclopedia ({uxEncyclopedia.length})</button><button role="tab" aria-selected={critiqueTab==='lessons'} className={critiqueTab==='lessons'?'chosen':''} onClick={()=>setCritiqueTab('lessons')}>Core Study Lessons ({lessons.length})</button><button role="tab" aria-selected={critiqueTab==='critiques'} className={critiqueTab==='critiques'?'chosen':''} onClick={()=>setCritiqueTab('critiques')}>Product & Interaction Critiques ({critiques.length})</button></div></div>{critiqueTab==='encyc'?(<>
 <div className="encyctop">
  <div className="searchwrap">
   <Search size={17} aria-hidden="true"/>
   <label className="sr-only" htmlFor="encyc-search">Search encyclopedia topics</label>
   <input id="encyc-search" type="search" autoComplete="off" placeholder="Search topics — try ‘tokens’, ‘HEART’, ‘Fitts’, ‘stale’…" value={query} onChange={e=>setQuery(e.target.value)}/>
  </div>
  <div className="progpill" role="status" aria-label={`Revision progress: ${masCount} mastered, ${revCount} in progress, ${refreshCount} due for refresh, ${uxEncyclopedia.length-masCount-revCount-refreshCount} not started`}>
   <span><span className="pdot mas" aria-hidden="true"/> {masCount} mastered</span>
   <span><span className="pdot rev" aria-hidden="true"/> {revCount} reviewing</span>
   {refreshCount>0&&<span><span className="pdot ref" aria-hidden="true"/> {refreshCount} refresh</span>}
   <span><span className="pdot new" aria-hidden="true"/> {uxEncyclopedia.length-masCount-revCount-refreshCount} to go</span>
  </div>
  <button type="button" className={`secondary flashbtn ${flashMode?'on':''}`} aria-pressed={flashMode} onClick={()=>{setFlashMode(!flashMode);setRevealed({})}}>{flashMode?<EyeOff size={16}/>:<GraduationCap size={16}/>} {flashMode?'Exit flashcards':'Flashcard revision'}</button>
 </div>
 <div className="domainchips" role="group" aria-label="Filter topics by domain">
  <button type="button" className={domain==='All'?'chip chosen':'chip'} aria-pressed={domain==='All'} onClick={()=>setDomain('All')}>All domains <span>{uxEncyclopedia.length}</span></button>
  <button type="button" className={domain==='__review'?'chip chosen':'chip'} aria-pressed={domain==='__review'} onClick={()=>setDomain('__review')}>For review <span>{reviewList.length}</span></button>
  {uxDomains.map(d=><button type="button" key={d} className={domain===d?'chip chosen':'chip'} aria-pressed={domain===d} onClick={()=>setDomain(d)}>{d} <span>{uxEncyclopedia.filter(t=>t.category===d).length}</span></button>)}
 </div>
 <div className="sr-only" role="status">{selTopic?`Deep dive open: ${selTopic.title}`:''}</div>
 <div className="encyclayout">
  <div className="topicgrid" aria-label={flashMode?'Flashcard revision mode':'All encyclopedia topics'}>
   {filteredTopics.length===0&&<div className="encycempty"><strong>No topics match this view.</strong><p className="muted smalltext">Try a different keyword, or clear the filters to browse all {uxEncyclopedia.length} topics.</p><div className="actions" style={{justifyContent:'center'}}><button type="button" className="secondary small" onClick={()=>{setQuery('');setDomain('All')}}>Clear search & filters</button></div></div>}
   {filteredTopics.map(t=>{
    const idx=uxEncyclopedia.indexOf(t)+1;
    const badge=badgeFor(t.id);
    const hidden=flashMode&&!revealed[t.id];
    return <button type="button" key={t.id}
     className={`topiccard${hidden?' flashcard':''}${flashMode&&revealed[t.id]?' revealed':''}${topicSel===t.id?' selected':''}`}
     aria-label={hidden?`Flashcard ${idx} of ${uxEncyclopedia.length}: ${t.category}. Prompt: ${t.mentalModel}. Activate to reveal the topic.`:`Topic ${idx} of ${uxEncyclopedia.length}: ${t.title}. Domain: ${t.category}. Revision status: ${badge.label}. Activate to open the deep dive.`}
     onClick={()=>{if(hidden){setRevealed(r=>({...r,[t.id]:true}));}else{selectTopic(t.id);}}}>
     <span className="cardmeta"><span className="topicnum">{String(idx).padStart(2,'0')}</span><span className={`statusbadge ${badge.cls}`}>{badge.label}</span></span>
     <span className="domtag">{t.category}</span>
     {hidden?(<>
      <span className="flashq">{t.mentalModel}</span>
      <span className="flashhint"><GraduationCap size={13} aria-hidden="true"/> Recite what you know, then reveal.<span className="revealcta"><Eye size={14} aria-hidden="true"/> Reveal topic</span></span>
     </>):(<>
      <span className="tctitle">{t.title}</span>
      <span className="tcsum">{t.summary}</span>
      {flashMode&&<span className="flashhint"><Eye size={13} aria-hidden="true"/> Revealed — activate again to open the deep dive.</span>}
     </>)}
    </button>;
   })}
  </div>
  <div className="encycdetailwrap">
   {selTopic?(
    <article className="panel encycdetail" ref={detailRef} tabIndex={-1} aria-label={`Topic deep dive: ${selTopic.title}`}>
     
     <div className="detailtop">
      <button type="button" className="secondary small backtotopicsbtn" onClick={()=>{topicGridRef.current?.scrollIntoView({behavior:'smooth',block:'start'});}}>
        <ArrowLeft size={14} aria-hidden="true"/> Back to topic list
      </button>
      <span className="domtag">{selTopic.category}</span>
<span className={`statusbadge ${selBadge.cls}`}>{selBadge.label}</span><span className="topicpos">TOPIC {selIdx+1} OF {uxEncyclopedia.length}</span></div>
     <span className="entryeyebrow">{selTopic.eyebrow}</span>
     <h2>{selTopic.title}</h2>
     <p className="lede">{selTopic.summary}</p>
     {flashMode&&<p className="sayhint" role="note"><GraduationCap size={13} aria-hidden="true"/> Flashcard mode is on — recite the principles from memory before reading below.</p>}
     <div className="mentalbanner"><span>MENTAL MODEL</span><p>{selTopic.mentalModel}</p></div>
     <h3>Core principles & rules of thumb</h3>
     <ul className="principlelist">{selTopic.keyPrinciples.map(k=><li key={k}><CheckCircle2 size={16} aria-hidden="true"/>{k}</li>)}</ul>
     <div className="casestudy"><h3>Real-world case</h3><p>{selTopic.realWorldExample}</p></div>
     {selWisdom&&<div className="wisdom">
      <h3><Sparkles size={15} aria-hidden="true"/> Wisdom mirror</h3>
      <p className="wisdomsrc">{selWisdom.source}</p>
      <p className="wisdomverse">“{selWisdom.verse}”</p>
      <p className="wisdomtext">{selWisdom.parallel}</p>
      <p className="wisdomnote">One principle, two tongues. Say both aloud — the older voice will make the modern one unforgettable.</p>
     </div>}
     <div className="sayaloud">
      <div className="sectionhead"><h3>Say it aloud</h3>
       <div className="segmented" role="group" aria-label="Choose script length">
        <button type="button" className={saySel==='thirty'?'chosen':''} aria-pressed={saySel==='thirty'} onClick={()=>setSaySel('thirty')}>30-second pitch</button>
        <button type="button" className={saySel==='two'?'chosen':''} aria-pressed={saySel==='two'} onClick={()=>setSaySel('two')}>2-minute defense</button>
       </div>
      </div>
      <p className="script">{saySel==='thirty'?selTopic.sayAloud.thirtySec:selTopic.sayAloud.twoMin}</p>
      <div className="actions">
       <button type="button" onClick={()=>openSpeak(`${saySel==='thirty'?'30-second pitch':'2-minute defense'} — explain “${selTopic.title}” (${selTopic.category}) like a senior designer. Anchor on the mental model: ${selTopic.mentalModel}`,saySel==='thirty'?30:120)}><Mic size={16}/> Practise aloud in Studio</button>
      </div>
      <p className="sayhint">Opens the Speaking Studio with this topic preloaded and the timer set to {saySel==='thirty'?'30 seconds':'2 minutes'}.</p>
     </div>
     <div className="trapbox">
      <h3>Common weak answer vs senior framing</h3>
      <div className="trapgrid">
       <div className="trapweak"><b>WEAK ANSWER</b><p>{trapParts[0]}</p></div>
       <div className="trapsenior"><b>SENIOR FRAMING</b><p>{trapParts[1]||trapParts[0]}</p></div>
      </div>
     </div>
     <div className="statustoggle">
      <h3>Revision status</h3>
      <div className="statusopts" role="group" aria-label={`Set revision status for ${selTopic.title}`}>
       <button type="button" className={!topicStatus[selTopic.id]?'chosen':''} aria-pressed={!topicStatus[selTopic.id]} onClick={()=>setTopicStat(selTopic.id,'new')}>Needs review</button>
       <button type="button" className={topicStatus[selTopic.id]==='reviewing'?'chosen':''} aria-pressed={topicStatus[selTopic.id]==='reviewing'} onClick={()=>setTopicStat(selTopic.id,'reviewing')}>In progress</button>
       <button type="button" className={topicStatus[selTopic.id]==='mastered'?'chosen':''} aria-pressed={topicStatus[selTopic.id]==='mastered'} onClick={()=>setTopicStat(selTopic.id,'mastered')}>Mastered</button>
      </div>
      <p className="statusnote">{loaded?'Status is saved to your private practice space and synced.':'Status is kept on this device; sign in to sync it across sessions.'}</p>
     </div>
     <p className="sourcespan"><BookOpen size={14} aria-hidden="true"/> <span><strong>Primary source:</strong> {selTopic.relatedSource}</span></p>
     {note(`encyc_note_${selTopic.id}`,'Personal notes on this topic','How would you explain this with your own project evidence? Capture an example, a number, or a story you can defend.',4)}
    </article>
   ):(
    <div className="encycplaceholder">
     <GraduationCap size={34} aria-hidden="true"/>
     <strong>Select a topic to open its deep dive.</strong>
     <p>{uxEncyclopedia.length} topics across {uxDomains.length} design domains — each with a mental model, rules of thumb, a real Apple/Google/enterprise case, scripts to practise aloud, and revision tracking.</p>
    </div>
   )}
  </div>
 </div>
</>):critiqueTab==='lessons'?(<><div className="studygrid"><section className="panel lessonmenu"><p className="eyebrow">STUDY NOTES</p>{lessons.map((l,i)=><button className={lesson===i?'chosen':''} key={l.title} onClick={()=>{setLesson(i);setTimeout(()=>{lessonRef.current?.scrollIntoView({behavior:'smooth',block:'start'});lessonRef.current?.focus?.({preventScroll:true});},50);}}><span>{String(i+1).padStart(2,'0')}</span>{l.title}</button>)}</section><article className="panel lesson" ref={lessonRef} tabIndex={-1}><span className="tag">{lessons[lesson].category}</span><h2>{lessons[lesson].title}</h2><p>{lessons[lesson].body}</p><h3>A concrete example</h3><p>{lessons[lesson].example}</p><div className="inset"><h3>Say it aloud</h3><p>“{lessons[lesson].say}”</p><button className="secondary small" onClick={()=>openSpeak(lessons[lesson].task)}>Practise this concept</button></div><h3>Try it</h3><p>{lessons[lesson].task}</p><h3>Common weak answer</h3><p>{lessons[lesson].weak}</p>{note(`lesson_${lesson}`,'Apply it to your work','What decision would this change? Give a real example.',3)}</article></div><div className="sectionhead"><div><h2>Keep a small, useful reading habit.</h2><p className="muted">Two short sessions a week. Turn one source into one applied idea.</p></div><span className="tag">PRIMARY SOURCES</span></div><p className="muted smalltext">A reference library, not an automatically refreshed news feed. Open the source to check its current guidance.</p><div className="resourcegrid">{resources.map(([title,desc,url,task])=><article className="panel resource" key={title}><h3><a href={url} target="_blank" rel="noreferrer">{title}</a></h3><p className="muted smalltext">{desc}</p><p>{task}</p></article>)}</div><section className="panel">{note('learning_log','Your update journal','Date and source URL → what changed or what I learned → design implication → a sketch or experiment I tried.',7)}</section></>):(<><div className="studygrid"><section className="panel lessonmenu"><p className="eyebrow">CRITIQUE DECK</p>{critiques.map((c,i)=><button className={critiqueIdx===i?'chosen':''} key={c.title} onClick={()=>{setCritiqueIdx(i);setTimeout(()=>{critiqueRef.current?.scrollIntoView({behavior:'smooth',block:'start'});critiqueRef.current?.focus?.({preventScroll:true});},50);}}><span>{String(i+1).padStart(2,'0')}</span>{c.title}</button>)}</section><article className="panel lesson" ref={critiqueRef} tabIndex={-1}><span className="tag">{critiques[critiqueIdx].type} Critique · {critiques[critiqueIdx].target}</span><h2>{critiques[critiqueIdx].title}</h2><p style={{fontSize:'1.05rem',marginBottom:'1rem'}}>{critiques[critiqueIdx].scenario}</p><h3>Core Evaluation Focus</h3><p>{critiques[critiqueIdx].focus}</p><div className="inset"><h3>8-Step Critique Spine</h3><p>User → Job → Context → Strengths → Core Problem → Evidence Needed → Highest-Impact Improvement → Trade-off & Validation.</p><button className="secondary small" onClick={()=>openSpeak(`Critique ${critiques[critiqueIdx].title}: ${critiques[critiqueIdx].scenario}. Identify the job, strengths, highest-impact improvement, and trade-off.`)}>Practise 2-minute critique</button></div>{note(`critique_${critiques[critiqueIdx].id}`,'Your critique notes','Record what works well, the single highest-impact problem, the evidence you would request, and the trade-off of your proposed change.',4)}</article></div></>)}</>}
 {view==='roadmap'&&<><div className="roadmapintro"><div className="panel"><p className="eyebrow">YOUR DAILY LOOP</p><div className="answerpath"><span>Recall</span><span>Solve</span><span>Make</span><span>Defend</span><span>Review</span><span>Retry</span></div><p className="muted">45 minutes normally, or a focused 15-minute session. Add one small real conversation. The first seven days are a detailed pilot; later days pair a topic with a design challenge and a portfolio application.</p></div><button className="secondary printbutton" onClick={()=>window.print()}>Print roadmap</button></div>{phases.map((phase,i)=><section className="panel phase" key={phase.name}><div className="phasehead"><span className="phaseindex">{String(i+1).padStart(2,'0')}</span><div><p className="eyebrow">DAYS {phase.start}–{phase.end}</p><h2>{phase.name}</h2></div></div><div className="daygrid">{roadmap.filter(d=>d.phase===phase.name).map(d=><button className={day===d.day?'daycard selected':'daycard'} key={d.day} onClick={()=>{setDay(d.day);setActivity(null);nav('today')}}><span>DAY {String(d.day).padStart(2,'0')}{tasks.every(t=>entries[`done_${d.day}_${t.key}`]?.done)&&<CheckCircle2 size={16}/>}</span><strong>{d.topic}</strong></button>)}</div></section>)}</>}
 {view==='review'&&<><div className="stats"><section className="panel"><span className="statnumber">{completeDays}<small>/60</small></span><p>Full practice days</p></section><section className="panel"><span className="statnumber">{recordings.length}</span><p>Saved voice recordings</p></section><section className="panel"><span className="statnumber">{Object.entries(entries).filter(([k,v])=>k.startsWith('social_')&&v.done).length}</span><p>Conversation practices</p></section><section className="panel"><span className="statnumber">{Object.entries(entries).filter(([k,v])=>k.startsWith('story_')&&v.title).length}</span><p>Saved project stories</p></section></div><section className="panel"><h2>Your practice map</h2><p className="muted smalltext">Each square is a curriculum day. Filled squares mean all six activities are complete.</p><div className="heatmap" role="region" aria-label="60-day curriculum progress">{roadmap.map(d=>{const count=tasks.filter(t=>entries[`done_${d.day}_${t.key}`]?.done).length;return <button key={d.day} aria-label={`Day ${d.day}: ${count} of 6 activities completed`} title={`Day ${d.day}: ${count}/6 activities`} className={count===6?'complete':count?'partial':''} onClick={()=>{setDay(d.day);nav('today')}}>{d.day}</button>})}</div></section><div className="twocol"><section className="panel"><h2>Compare, then choose one focus.</h2><p>Listen to your baseline and your latest answer. Write down concrete differences in structure, evidence, and trade-offs. Invite a peer to review the same two takes.</p>{note('weekly_review','Weekly reflection','This week I made… clearer. Evidence from my recording or sketch: … Next week I will practise… Feedback from a peer: …',7)}</section><section className="panel"><h2>Self-assessment</h2><p className="muted smalltext">1 = not yet demonstrated · 2 = needs prompting · 3 = clear with notes · 4 = clear without notes · 5 = adapts under challenge. This is a reflection tool, not a hiring prediction.</p>{['Clarity','Evidence','Alternatives','Trade-offs','Craft','Adaptation'].map(skill=><label className="rating" key={skill}><span>{skill}</span><select value={value('ratings',{})[skill]||''} onChange={e=>setDrafts(d=>({...d,ratings:{...value('ratings',{}),[skill]:e.target.value}}))}><option value="">Not assessed</option>{[1,2,3,4,5].map(n=><option key={n}>{n}</option>)}</select></label>)}<button disabled={!loaded||busy.includes('ratings')} onClick={()=>save('ratings',value('ratings',{}))}>Save self-assessment</button></section></div><section className="panel"><div className="sectionhead"><div><h2>Take your notes with you.</h2><p className="muted smalltext">Export your saved notes and progress as a backup. Audio can be downloaded from its player.</p></div><button className="secondary" disabled={!loaded} onClick={()=>download('design-practice-backup.json',new Blob([JSON.stringify({exportedAt:new Date().toISOString(),entries},null,2)],{type:'application/json'}))}><Download size={16}/> Export saved practice</button></div></section></>}
 <footer>
  <div className="mobileprofile">
    <div className="avatar" aria-hidden="true">PK</div>
    <div className="mobileprofileinfo">
      <strong>Prabhakar Kumar</strong>
      <span className="roletext">Senior product design · Admin</span>
      <span className="emailtext">prabhakarmdes12@gmail.com</span>
      <div className="private"><ShieldCheck size={14} aria-hidden="true"/> Private practice space</div>
    </div>
  </div>
  <div className="footercontent">
    Design Practice <span>Practice thoughtfully. Speak honestly. Make something better.</span>
  </div>
</footer></main>{showScrollTop&&(
    <button type="button" className="scrolltopbtn" aria-label="Scroll back to top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>
      <ArrowUp size={16} aria-hidden="true"/>
      <span>Top</span>
    </button>
  )}
  {notice&&<div className="toast" role="status"><CheckCircle2 size={17}/>{notice}</div>}
  {sahayakOpen&&(
    <div className="sahayak-backdrop" onClick={()=>setSahayakOpen(false)} role="presentation">
      <div 
        className="sahayak-drawer" 
        role="dialog" 
        aria-modal="true" 
        aria-label="Studio Sahayak Socratic Mentor" 
        onClick={e=>e.stopPropagation()}
      >
        <div className="sahayak-header">
          <div className="sahayak-title-group">
            <div className="sahayak-avatar" aria-hidden="true">
              <Sparkles size={18}/>
            </div>
            <div>
              <div className="sahayak-badge-row">
                <h2>Studio Sahayak <span className="sahayak-devanagari">स्टूडियो सहायक</span></h2>
                
              </div>
              <p className="sahayak-tagline">Socratic Design Sparring · Practice thinking, not memorizing</p>
            </div>
          </div>
          <button 
            type="button" 
            className="ghostbtn close-sahayak" 
            onClick={()=>setSahayakOpen(false)} 
            aria-label="Close Studio Sahayak"
          >
            <X size={18}/>
          </button>
        </div>

        {(()=>{
          const activeTopic=uxEncyclopedia.find(t=>t.id===sahayakTopicId)||doseTopic;
          const activeWisdom=wisdomMirrors[activeTopic.id];
          return(
            <div className="sahayak-context-banner">
              <div className="context-meta">
                <span className="context-domain">{activeTopic.category.toUpperCase()}</span>
                <strong>{activeTopic.title}</strong>
              </div>
              {activeWisdom&&(
                <div className="context-wisdom">
                  <span className="context-verse">“{activeWisdom.verse}”</span>
                  <span className="context-src">— {activeWisdom.source}</span>
                </div>
              )}
            </div>
          );
        })()}

        <div className="sahayak-mode-tabs" role="group" aria-label="Choose Socratic dialectic mode">
          <button 
            type="button" 
            className={sahayakMode==='bridge'?'mode-pill active':'mode-pill'}
            onClick={()=>switchSahayakMode('bridge')}
          >
            <span>🪞 विजडम सेतु</span>
            <small>Wisdom Bridge</small>
          </button>
          <button 
            type="button" 
            className={sahayakMode==='counter'?'mode-pill active':'mode-pill'}
            onClick={()=>switchSahayakMode('counter')}
          >
            <span>⚔️ प्रतिवाद</span>
            <small>Purva-Paksha</small>
          </button>
          <button 
            type="button" 
            className={sahayakMode==='defense'?'mode-pill active':'mode-pill'}
            onClick={()=>switchSahayakMode('defense')}
          >
            <span>🎙️ साक्षात्कार</span>
            <small>30s Defense</small>
          </button>
        </div>

        <div className="sahayak-chat-stream" ref={sahayakChatRef}>
          {sahayakChat.map(msg=>(
            <div 
              key={msg.id} 
              className={msg.role==='sahayak'?'sahayak-msg-row sahayak-agent':'sahayak-msg-row sahayak-user'}
            >
              {msg.role==='sahayak'&&(
                <div className="sahayak-msg-avatar" aria-hidden="true">
                  <Sparkles size={14}/>
                </div>
              )}
              <div className="sahayak-msg-bubble">
                {msg.pramanaTag&&(
                  <span className="pramana-badge">
                    प्रमाण · {msg.pramanaTag}
                  </span>
                )}
                <div className="msg-text">
                  {msg.content.split('\n\n').map((paragraph,i)=>(
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <span className="msg-time">
                  {new Date(msg.timestamp).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
                </span>
              </div>
            </div>
          ))}
        </div>

        {(()=>{
          const activeTopic=uxEncyclopedia.find(t=>t.id===sahayakTopicId)||doseTopic;
          const suggestions=getTopicSuggestions(activeTopic.id);
          return(
            <div className="sahayak-quick-starters" role="region" aria-label="Suggested discussion starters">
              <span className="starter-label">Try asking or exploring:</span>
              <div className="starter-chips">
                {suggestions.map((sugg,i)=>(
                  <button 
                    key={i} 
                    type="button" 
                    className="starter-chip" 
                    onClick={()=>handleStarterClick(sugg)}
                  >
                    {sugg}
                  </button>
                ))}
              </div>
            </div>
          );
        })()}
        <div className="sahayak-input-box">
          <textarea
            rows={2}
            value={sahayakInput}
            onChange={e=>setSahayakInput(e.target.value)}
            placeholder="Type your design trade-off, defense, or philosophical reflection... (Enter to submit)"
            onKeyDown={e=>{
              if(e.key==='Enter'&&!e.shiftKey){
                e.preventDefault();
                sendSahayakMessage();
              }
            }}
          />
          <div className="sahayak-input-actions">
            <button 
              type="button" 
              className="ghostbtn sahayak-clear" 
              onClick={clearSahayakChat}
              title="Restart dialectic"
            >
              <RotateCcw size={14}/> Reset
            </button>
            <button 
              type="button" 
              className="sahayak-send-btn" 
              onClick={sendSahayakMessage}
              disabled={!sahayakInput.trim()}
            >
              विचार करें · Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
}

