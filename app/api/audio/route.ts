export const dynamic = 'force-dynamic';
import {getChatGPTUser} from '../../chatgpt-auth';
import {bucket,database} from '../../../db/storage';

export async function POST(req:Request){
  const u=await getChatGPTUser();
  if(!u)return new Response('Sign in first',{status:401});
  if(req.headers.get('origin')&&req.headers.get('origin')!==new URL(req.url).origin)return new Response('Forbidden',{status:403});
  try{
    const bytes=await req.arrayBuffer();
    if(bytes.byteLength>20*1024*1024)return new Response('Recording too large. Download it and try a shorter take.',{status:413});
    const type=req.headers.get('content-type')||'';
    if(!/^audio\/(webm|mp4|ogg|mpeg|wav)(;|$)/.test(type))return new Response('Unsupported audio',{status:400});
    const id=crypto.randomUUID();
    const label=(req.headers.get('x-practice-label')||'Speaking practice').slice(0,160);
    const b: any = bucket();
    const db: any = database();
    await b.put(`${u.userId}/${id}`,bytes,{httpMetadata:{contentType:type}});
    const value={id,label,date:new Date().toISOString(),size:bytes.byteLength};
    await db.prepare('INSERT INTO entries(user_id,key,value,updated) VALUES(?,?,?,?)').bind(u.userId,`audio_${id}`,JSON.stringify(value),value.date).run();
    return Response.json(value);
  }catch(e){
    console.error(e);
    return Response.json({error:'Recording could not be saved. You can still download this take.'},{status:503});
  }
}

export async function GET(req:Request){
  const u=await getChatGPTUser();
  if(!u)return new Response('Sign in first',{status:401});
  const id=new URL(req.url).searchParams.get('id');
  if(!id||!id.match(/^[a-f0-9-]{36}$/))return new Response('Invalid recording',{status:400});
  try{
    const b: any = bucket();
    const file=await b.get(`${u.userId}/${id}`);
    if(!file)return new Response('Recording not found',{status:404});
    return new Response(file.body,{headers:{'content-type':file.httpMetadata?.contentType||'audio/webm','cache-control':'private, no-store'}});
  }catch{
    return new Response('Audio unavailable',{status:503});
  }
}
