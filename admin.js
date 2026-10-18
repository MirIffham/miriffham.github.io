const $=s=>document.querySelector(s);
const el=(t,p={},...k)=>{const e=document.createElement(t);for(const[a,v]of Object.entries(p))a in e?e[a]=v:e.setAttribute(a,v);k.flat().forEach(c=>e.append(c));return e};
const b64=s=>{let t='';new TextEncoder().encode(s).forEach(x=>t+=String.fromCharCode(x));return btoa(t)};
const unb64=s=>new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\s/g,'')),c=>c.charCodeAt(0)));
const HEAD='/* Managed by admin.html. Edit your content from the dashboard. */\nwindow.SITE = ';
let A=null,D=null,dirty=false,resume=null,photo=null,idle;
try{A=JSON.parse(sessionStorage.getItem('adm'))}catch{}

async function gh(path,o={}){
  const put=o.method==='PUT';
  const r=await fetch(`https://api.github.com/repos/${encodeURIComponent(A.u)}/${encodeURIComponent(A.r)}/contents/${path}`+(put?'':`?ref=${encodeURIComponent(A.b)}`),{method:o.method||'GET',cache:'no-store',headers:{Authorization:'Bearer '+A.t,Accept:'application/vnd.github+json',...(o.body?{'Content-Type':'application/json'}:{})},body:o.body&&JSON.stringify(o.body)});
  if(r.status===404&&o.allow404)return null;
  if(!r.ok)throw new Error(r.status===401?'Token rejected. Sign in again.':r.status===403||r.status===404?'Access denied or repository not found. Check the names and that the token has Contents: Read and write.':r.status===409||r.status===422?'Conflict. Reload and try again.':'GitHub error '+r.status);
  return r.json();
}
async function start(){
  try{
    const j=await gh('data.js'),t=unb64(j.content);
    D=JSON.parse(t.slice(t.indexOf('{'),t.lastIndexOf('}')+1));
    sessionStorage.setItem('adm',JSON.stringify(A));
    $('#login').hidden=true;$('#app').hidden=false;build();watch();
  }catch(e){$('#loginMsg').textContent=e.message;A=null;sessionStorage.removeItem('adm')}
}
$('#loginForm').onsubmit=e=>{e.preventDefault();const f=e.target.elements;
  A={u:f.u.value.trim(),r:f.r.value.trim(),b:f.b.value.trim()||'main',t:f.t.value.trim()};f.t.value='';$('#loginMsg').textContent='Checking…';start()};
function signOut(){sessionStorage.clear();location.reload()}
$('#out').onclick=signOut;
function watch(){const r=()=>{clearTimeout(idle);idle=setTimeout(signOut,20*60e3)};['click','keydown','pointermove'].forEach(v=>addEventListener(v,r));r()}
addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue=''}});
const mark=()=>{dirty=true;$('#status').textContent='Unsaved changes'};

const SC={
  stats:{n:['Number','num'],label:['Label'],plain:['Show as plain number (no count-up)','bool']},
  skills:{group:['Group'],items:['Skills (comma separated)','list']},
  projects:{title:['Title'],desc:['Description','area'],tags:['Tags (comma separated)','list'],link:['Live link'],repo:['Code link']},
  education:{title:['Degree'],place:['Institution'],period:['Period'],note:['Note','area']},
  experience:{title:['Role'],place:['Organisation'],period:['Period'],note:['What you did','area']}};
const TT={stats:'Highlight numbers',skills:'Skills',projects:'Projects',education:'Education',experience:'Experience'};
const BASIC=[['name','Full name'],['role','Role / headline'],['tagline','Tagline','area'],['status','Status line'],['accent','Accent colour','color'],['email','Email (public)'],['phone','Phone (empty = hidden)'],['address','Address (empty = hidden)'],['linkedin','LinkedIn URL'],['github','GitHub URL'],['formKey','Web3Forms access key (optional)'],['playground','Show network playground section','bool']];

function field(lab,type,val,set){
  let i;
  if(type==='area'||type==='paras')i=el('textarea',{rows:type==='paras'?8:3,value:type==='paras'?(val||[]).join('\n\n'):val??''});
  else if(type==='bool')i=el('input',{type:'checkbox',checked:!!val});
  else if(type==='num')i=el('input',{type:'number',value:val??0});
  else if(type==='list')i=el('input',{type:'text',value:(val||[]).join(', ')});
  else i=el('input',{type:type==='color'?'color':'text',value:val??''});
  i.oninput=i.onchange=()=>{const v=i.value;set(type==='bool'?i.checked:type==='num'?+v:type==='list'?v.split(',').map(s=>s.trim()).filter(Boolean):type==='paras'?v.split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean):v);mark()};
  return el('label',{className:type==='bool'?'chk':''},el('span',{},lab),i);
}
const btn=(t,fn,c='')=>el('button',{type:'button',className:c,textContent:t,onclick:fn});
const panel=(t,k)=>el('section',{className:'panel'},el('h2',{textContent:t}),k);

function list(k){
  D[k]=D[k]||[];const box=el('div');
  const mv=(i,d)=>{const j=i+d;if(j<0||j>=D[k].length)return;[D[k][i],D[k][j]]=[D[k][j],D[k][i]];mark();draw()};
  const draw=()=>box.replaceChildren(...D[k].map((it,i)=>el('div',{className:'item'},
    Object.entries(SC[k]).map(([f,[l,t]])=>field(l,t||'text',it[f],v=>it[f]=v)),
    el('div',{className:'row'},btn('↑',()=>mv(i,-1)),btn('↓',()=>mv(i,1)),btn('Remove',()=>{D[k].splice(i,1);mark();draw()},'danger')))));
  draw();
  return panel(TT[k],[box,btn('+ Add',()=>{D[k].push(Object.fromEntries(Object.entries(SC[k]).map(([f,[,t]])=>[f,t==='list'?[]:t==='num'?0:t==='bool'?false:''])));mark();draw()})]);
}
function build(){
  const m=$('#form');m.replaceChildren(
    panel('Basic details',BASIC.map(([k,l,t])=>field(l,t||'text',D[k],v=>D[k]=v))),
    panel('About you',field('Paragraphs (separate with a blank line)','paras',D.about,v=>D.about=v)),
    ...Object.keys(SC).map(list),
    panel('Resume (PDF)',el('label',{},el('span',{textContent:'Choose a file. It is uploaded as resume.pdf when you publish.'}),
      el('input',{type:'file',accept:'application/pdf',onchange:e=>{const f=e.target.files[0];if(!f)return;if(f.size>5e6){alert('Please use a PDF under 5 MB.');e.target.value='';return}
        const r=new FileReader();r.onload=()=>{resume=r.result.split(',')[1];D.resume='resume.pdf';mark()};r.readAsDataURL(f)}}))),
    panel('Profile photo',el('label',{},el('span',{textContent:'Choose a photo. It is cropped to a square, resized and uploaded as photo.jpg when you publish.'}),
      el('input',{type:'file',accept:'image/*',onchange:e=>{const f=e.target.files[0];if(!f)return;const im=new Image();
        im.onload=()=>{const s=Math.min(im.width,im.height),c=document.createElement('canvas');c.width=c.height=600;c.getContext('2d').drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,600,600);
          photo=c.toDataURL('image/jpeg',.85).split(',')[1];D.photo='photo.jpg?v='+Date.now();mark();URL.revokeObjectURL(im.src)};im.src=URL.createObjectURL(f)}}))));
}
$('#pub').onclick=async()=>{
  const s=$('#status');s.textContent='Publishing…';
  try{
    const up=async(p,content,message)=>{const c=await gh(p,{allow404:true});await gh(p,{method:'PUT',body:{message,content,branch:A.b,...(c?{sha:c.sha}:{})}})};
    if(resume){await up('resume.pdf',resume,'Update resume');resume=null}
    if(photo){await up('photo.jpg',photo,'Update profile photo');photo=null}
    const c=await gh('data.js');
    await gh('data.js',{method:'PUT',body:{message:'Update portfolio content',content:b64(HEAD+JSON.stringify(D,null,2)+';\n'),sha:c.sha,branch:A.b}});
    dirty=false;s.textContent='Published. GitHub Pages can take a few minutes to update, and your browser may need a hard refresh.';
  }catch(e){s.textContent=e.message}
};
$('#bak').onclick=()=>{const a=el('a',{href:URL.createObjectURL(new Blob([HEAD+JSON.stringify(D,null,2)+';\n'],{type:'text/javascript'})),download:'data.js'});a.click()};
if(A)start();
