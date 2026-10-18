const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const D=SITE,calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),lerp=(a,b,t)=>a+(b-a)*t,ease=t=>1-Math.pow(1-t,3);
const safe=u=>{u=String(u||'').trim();return /^(javascript|data|vbscript):/i.test(u)?'':u};
const lk=(u,t)=>(u=safe(u))?`<a href="${esc(u)}" target="_blank" rel="noopener">${t}</a>`:'';
const sec=(id,title,body)=>{$('#'+id).innerHTML=body?`<h2 class="hd">${title.split(' ').map(w=>`<span class="w"><span class="wi">${esc(w)}</span></span>`).join(' ')}</h2>${body}`:''};
const T=[],scrubs=[],SK=1000;
/* skill logos: brand icons from Devicon where known, clean built-in icons otherwise */
const BR=[[/^python$/i,'python-plain colored'],[/^(javascript|js)$/i,'javascript-plain colored'],[/^(typescript|ts)$/i,'typescript-plain colored'],[/^java$/i,'java-plain colored'],[/^(c\+\+|cpp)$/i,'cplusplus-plain colored'],[/^c#/i,'csharp-plain colored'],[/^c$/i,'c-plain colored'],[/^php$/i,'php-plain colored'],[/^html/i,'html5-plain colored'],[/^css/i,'css3-plain colored'],[/react/i,'react-original colored'],[/node/i,'nodejs-plain colored'],[/mysql/i,'mysql-plain colored'],[/postgres/i,'postgresql-plain colored'],[/mongo/i,'mongodb-plain colored'],[/github/i,'github-original'],[/^git/i,'git-plain colored'],[/linux|ubuntu/i,'linux-plain'],[/docker/i,'docker-plain colored'],[/vs ?code/i,'vscode-plain colored'],[/figma/i,'figma-plain colored'],[/bootstrap/i,'bootstrap-plain colored'],[/tailwind/i,'tailwindcss-original colored'],[/django/i,'django-plain'],[/flask/i,'flask-original'],[/^(wordpress)$/i,'wordpress-plain colored']];
const SV={db:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
 net:'<circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="18" r="2.2"/><circle cx="19" cy="18" r="2.2"/><path d="M12 7.2v4.3M12 11.5l-6 5M12 11.5l6 5"/>',
 os:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
 shield:'<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
 cloud:'<path d="M7 18a4 4 0 010-8 5.5 5.5 0 0110.6 1.2A3.4 3.4 0 0117 18z"/>',
 code:'<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>'};
const svk=n=>/sql|database|\bdb\b|data ?base/i.test(n)?'db':/network|tcp|dns|router|cisco/i.test(n)?'net':/operating|^os$|windows|unix/i.test(n)?'os':/secur|crypto|cyber/i.test(n)?'shield':/cloud|aws|azure|gcp/i.test(n)?'cloud':'code';
const ico=n=>{const m=BR.find(([r])=>r.test(n.trim()));return m?`<i class="devicon-${m[1]}" aria-hidden="true"></i>`:`<span class="gi" aria-hidden="true"><svg viewBox="0 0 24 24">${SV[svk(n)]}</svg></span>`};
let lenis;

function render(){
  document.title=`${D.name} | ${D.role}`;
  document.documentElement.style.setProperty('--ac',D.accent||'#E8892B');
  $('#navName').textContent=D.name;
  const ini=D.name.split(' ').map(w=>w[0]).join('').slice(0,2);
  $('#avatar').innerHTML=(D.photo?`<img src="${esc(D.photo)}" alt="Photo of ${esc(D.name)}">`:'')+`<b>${esc(ini)}</b>`;
  const im=$('#avatar img');if(im)im.onerror=()=>im.remove();
  const ex=(D.experience||[]).length;
  const nav=[['about','About'],['skills','Skills'],['projects','Projects'],['education','Education'],...(ex?[['experience','Experience']]:[]),['contact','Contact']];
  $('#links').innerHTML=nav.map((n,i)=>`<a href="#${n[0]}" style="--n:${i}">${n[1]}</a>`).join('')+'<span id="pill" aria-hidden="true"></span>';
  let k=0;
  $('#heroBody').innerHTML=`<div class="status">${esc(D.status)}</div>
    <div class="hero-top"><div id="slot"></div><h1 class="name" aria-label="${esc(D.name)}">${D.name.split(' ').map(w=>`<span class="word" aria-hidden="true">${[...w].map(c=>`<span class="ch"><i style="--k:${k++}">${esc(c)}</i></span>`).join('')}</span>`).join('')}</h1></div>
    <div class="role">${esc(D.role)}</div><p class="tag">${esc(D.tagline)}</p>
    <div class="cta"><a class="btn p" href="#projects">View projects</a>${safe(D.resume)?`<a class="btn" href="${esc(safe(D.resume))}" download>Download resume</a>`:''}<a class="btn" href="#contact">Contact me</a></div>`;
  const ab=D.about||[];
  sec('about','About',`<div class="about"><div class="rv">${ab.map((p,i)=>i?`<p>${esc(p)}</p>`:`<p class="scrub">${p.split(/\s+/).map(w=>`<span>${esc(w)} </span>`).join('')}</p>`).join('')}</div><div class="stats">${(D.stats||[]).map((s,i)=>`<div class="stat rv" style="--i:${i}"><b data-n="${s.n}" ${s.plain?'data-plain':''}>${s.n}</b><span>${esc(s.label)}</span></div>`).join('')}</div></div>`);
  sec('lab','Network playground',D.playground===false?'':`<p class="lead rv">A tiny network of nodes. Move your cursor across it to disturb the grid, and click or tap to send a packet to a random node.</p><div class="labwrap rv"><canvas id="net" role="img" aria-label="Interactive animation of a computer network with packets travelling between nodes"></canvas><div id="hud"></div></div>`);
  sec('skills','Skills',(D.skills||[]).length&&`<div class="skgrid">${D.skills.map((g,i)=>`<div class="skcard rv" style="--i:${i}"><h3>${esc(g.group)}</h3><ul class="sklist">${(g.items||[]).map(x=>`<li class="sk">${ico(x)}<span>${esc(x)}</span></li>`).join('')}</ul></div>`).join('')}</div>`);
  sec('projects','Projects',(D.projects||[]).length&&`<div class="grid">${D.projects.map((p,i)=>`<article class="card rv" style="--i:${i}"><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p><div class="chips">${(p.tags||[]).map(t=>`<span class="chip">${esc(t)}</span>`).join('')}</div><div class="links">${lk(p.link,'Live')}${lk(p.repo,'Code')}</div></article>`).join('')}</div>`);
  const tl=a=>`<div class="tl">${a.map((e,i)=>`<div class="item rv" style="--i:${i}"><small>${esc(e.period)}</small><h3>${esc(e.title)}</h3><div class="pl">${esc(e.place)}</div>${e.note?`<p>${esc(e.note)}</p>`:''}</div>`).join('')}</div>`;
  sec('education','Education',(D.education||[]).length&&tl(D.education));
  sec('experience','Experience',ex&&tl(D.experience));
  const c=(l,v,h)=>v?`<li><span>${l}</span>${h?`<a href="${esc(h)}" ${h.startsWith('http')?'target="_blank" rel="noopener"':''}>${esc(v)}</a>`:esc(v)}</li>`:'';
  sec('contact','Contact','');
  const oldCw=$('#cw');if(oldCw)oldCw.remove();
  document.body.insertAdjacentHTML('beforeend',`<div id="cw"><div id="cpanel" role="dialog" aria-label="Contact me"><div class="chead"><h3>Get in touch</h3><button id="cclose" type="button" aria-label="Close">&times;</button></div><ul class="cl">${c('Email',D.email,'mailto:'+D.email)}${c('Phone',D.phone,'tel:'+(D.phone||'').replace(/\s/g,''))}${c('Address',D.address)}${c('LinkedIn',D.linkedin&&'View profile',safe(D.linkedin))}${c('GitHub',D.github&&'View profile',safe(D.github))}</ul>
    <form id="form"><input name="name" placeholder="Your name" required aria-label="Your name"><input name="email" type="email" placeholder="Your email" required aria-label="Your email"><textarea name="message" rows="4" placeholder="Your message" required aria-label="Message"></textarea><button class="btn p">Send message</button><p id="msg" role="status"></p></form></div>
    <button id="cfab" type="button" aria-label="Contact me" aria-expanded="false" aria-controls="cpanel"><svg class="i1" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3.5 7.5l8.5 6 8.5-6"/></svg><svg class="i2" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>`);
  $('#foot').textContent=`© ${new Date().getFullYear()} ${D.name}`;
  fx();bind();net();trace();
}

/* nav: a pill that slides to the hovered link, then back to the current section */
function setContact(o){const w=$('#cw');if(!w)return;w.classList.toggle('open',o);$('#cfab').setAttribute('aria-expanded',o);syncPill();if(o)setTimeout(()=>{const f=$('#cpanel input');f&&f.focus({preventScroll:true})},350)}
function setMenu(o){$('#links').classList.toggle('open',o);$('#burger').setAttribute('aria-expanded',o);document.documentElement.classList.toggle('menu',o)}
function syncPill(t){const p=$('#pill');if(!p)return;const cw=$('#cw'),cl=$('#links a[href="#contact"]'),co=!!(cw&&cl&&cw.classList.contains('open'));if(cl)cl.classList.toggle('cur',co);
  const a=t||(co?cl:$('#links a.on'));$$('#links a').forEach(x=>x.classList.toggle('under',x===a));
  if(!a||innerWidth<=900){p.style.opacity=0;return}
  p.style.opacity=1;p.style.width=a.offsetWidth+'px';p.style.transform=`translateX(${a.offsetLeft}px)`}
addEventListener('resize',()=>syncPill());
function bind(){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');const b=e.target.querySelector('[data-n]');if(b)count(b);io.unobserve(e.target)}),{threshold:.15});
  $$('.rv').forEach(el=>io.observe(el));
  const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){$$('#links a').forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id));syncPill()}}),{rootMargin:'-45% 0px -50% 0px'});
  $$('#links a').forEach(a=>{a.addEventListener('pointerenter',()=>syncPill(a));a.addEventListener('focus',()=>syncPill(a));a.addEventListener('blur',()=>syncPill())});
  $('#links').addEventListener('pointerleave',()=>syncPill());
  $$('main section').forEach(s=>so.observe(s));
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{setMenu(false);if(a.hash==='#contact'){e.preventDefault();setContact(true);return}const t=$(a.hash);if(lenis&&t){e.preventDefault();lenis.scrollTo(t,{offset:-108,duration:1.3})}}));
  $('#cfab').onclick=()=>setContact(!$('#cw').classList.contains('open'));$('#cclose').onclick=()=>{setContact(false);$('#cfab').focus()};
  document.addEventListener('pointerdown',e=>{const w=$('#cw');if(w&&w.classList.contains('open')&&!w.contains(e.target)&&!e.target.closest('a[href="#contact"]'))setContact(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setContact(false)});
  const hov=matchMedia('(hover:hover)').matches&&!calm;
  if(hov){$$('.card').forEach(c=>{c.onpointermove=e=>{const r=c.getBoundingClientRect();c.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*8+'deg');c.style.setProperty('--rx',(.5-(e.clientY-r.top)/r.height)*8+'deg')};c.onpointerleave=()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')}});
    $$('.btn').forEach(b=>{b.onpointermove=e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`};b.onpointerleave=()=>b.style.transform=''})}
  const f=$('#form');if(f)f.onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f)),m=$('#msg');
    if(D.formKey){m.textContent='Sending…';try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({access_key:D.formKey,...d})});m.textContent=(await r.json()).success?'Message sent. Thank you!':'Could not send. Please email me directly.';if(r.ok)f.reset()}catch{m.textContent='Network error. Please email me directly.'}}
    else location.href=`mailto:${D.email}?subject=${encodeURIComponent('Portfolio message from '+d.name)}&body=${encodeURIComponent(d.message+'\n\n'+d.name+' ('+d.email+')')}`};
}
function count(b){if(b.hasAttribute('data-plain')||calm)return;const n=+b.dataset.n,t=performance.now();(function f(x){const p=Math.min((x-t)/1200,1);b.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t)}

/* ---- scroll-driven: progress bar, wave, parallax, avatar flight, word scrub ---- */
function avatar(){
  const a=$('#avatar'),s=$('#slot'),n=$('#navSlot');if(!s||!n)return;
  const hr=s.getBoundingClientRect(),nr=n.getBoundingClientRect(),e=ease(clamp(scrollY/(innerHeight*.4)));
  a.style.width=a.style.height=hr.width+'px';a.style.setProperty('--s',hr.width+'px');
  a.style.transform=`translate3d(${lerp(hr.left,nr.left,e)}px,${lerp(hr.top,nr.top,e)}px,0) scale(${lerp(1,nr.width/hr.width,e)})`;
  $('#navName').style.opacity=e>.92?1:0;
}
function scrub(){$$('.scrub').forEach(p=>{const r=p.getBoundingClientRect(),w=p.children,n=Math.round((calm?1:clamp((innerHeight*.9-r.top)/(innerHeight*.45+r.height)))*w.length);for(let i=0;i<w.length;i++)w[i].classList.toggle('lit',i<n)})}
let tick=false;const schedule=()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}};
function onScroll(){
  tick=false;const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
  $('#bar').style.transform=`scaleX(${h>0?y/h:0})`;$('#nav').classList.toggle('s',y>20);
  if(!calm){$$('.ch').forEach((c,i)=>c.style.transform=`translateY(${Math.sin(i*.7+y/110)*Math.min(y/25,14)}px)`);
    $('.b1').style.transform=`translateY(${y*.25}px)`;$('.b2').style.transform=`translateY(${-y*.15}px)`}
  avatar();scrub();scrubs.forEach(f=>f());traceUpdate();
}
let rt;addEventListener('scroll',schedule,{passive:true});addEventListener('resize',()=>{schedule();clearTimeout(rt);rt=setTimeout(()=>{trace();schedule()},250)});
if(window.Lenis&&!calm){lenis=new Lenis({lerp:.09,smoothWheel:true});lenis.on('scroll',schedule);requestAnimationFrame(function r(t){lenis.raf(t);requestAnimationFrame(r)})}

/* ---- network playground (canvas, no libraries) ---- */
function net(){
  const cv=$('#net');if(!cv)return;
  const g=cv.getContext('2d'),hud=$('#hud');
  let W,H,cols,rows,N=[],P=[],R=[],mx=-1e3,my=-1e3,run=false,sent=0,ping=0,last=0,spawn=0,hudT=0,col={},looping=false;
  const colors=()=>{const s=getComputedStyle(document.documentElement);col={ac:s.getPropertyValue('--ac').trim()||'#E8892B',fg:s.getPropertyValue('--fg').trim()||'#fff'}};
  function size(){
    const r=cv.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;g.setTransform(d,0,0,d,0,0);
    const gap=W<600?34:44;cols=Math.max(4,Math.floor(W/gap));rows=Math.max(3,Math.floor(H/gap));N=[];P=[];
    for(let j=0;j<rows;j++)for(let i=0;i<cols;i++)N.push({i,j,x:(i+.5)*W/cols,y:(j+.5)*H/rows,e:0,dx:0,dy:0});
    if(!run)draw(performance.now(),0);
  }
  const idx=(i,j)=>j*cols+i;
  function route(a,b){const p=[a],A=N[a],B=N[b];let i=A.i,j=A.j;const hFirst=Math.random()<.5;
    const mv=(h)=>{while(h?i!==B.i:j!==B.j){h?i+=Math.sign(B.i-i):j+=Math.sign(B.j-j);p.push(idx(i,j))}};hFirst?(mv(1),mv(0)):(mv(0),mv(1));return p}
  function send(from){const to=Math.floor(Math.random()*N.length);if(to===from)return;P.push({path:route(from,to),t:0})}
  function near(x,y){let b=0,bd=1e9;N.forEach((n,k)=>{const d=(n.x-x)**2+(n.y-y)**2;if(d<bd){bd=d;b=k}});return b}
  const at=(p,t)=>{const s=clamp(Math.floor(t),0,p.path.length-1),a=N[p.path[s]],b=N[p.path[Math.min(s+1,p.path.length-1)]],f=clamp(t-s,0,1);return[lerp(a.x+a.dx,b.x+b.dx,f),lerp(a.y+a.dy,b.y+b.dy,f)]};
  function draw(t,dt){
    colors();g.clearRect(0,0,W,H);
    const dec=Math.pow(.93,dt*60);
    for(const n of N){
      const d=Math.hypot(n.x-mx,n.y-my),pe=d<120?1-d/120:0;n.e*=dec;if(pe*.9>n.e)n.e=pe*.9;
      for(const r of R){const df=Math.abs(Math.hypot(n.x-r.x,n.y-r.y)-(t-r.t)/1000*460),age=(t-r.t)/1600;if(df<46&&age<1)n.e=Math.max(n.e,(1-df/46)*(1-age))}
      n.dx=lerp(n.dx,pe?(mx-n.x)*pe*.22:0,.15);n.dy=lerp(n.dy,pe?(my-n.y)*pe*.22:0,.15);
    }
    R=R.filter(r=>t-r.t<1600);
    for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const a=N[idx(i,j)];
      for(const b of [i+1<cols&&N[idx(i+1,j)],j+1<rows&&N[idx(i,j+1)]]){if(!b)continue;
        g.beginPath();g.moveTo(a.x+a.dx,a.y+a.dy);g.lineTo(b.x+b.dx,b.y+b.dy);
        g.globalAlpha=.1;g.strokeStyle=col.fg;g.lineWidth=1;g.stroke();
        const e=(a.e+b.e)/2;if(e>.04){g.globalAlpha=Math.min(.9,e*1.2);g.strokeStyle=col.ac;g.stroke()}}}
    for(const n of N){const s=2.5+5*n.e;g.globalAlpha=n.e>.12?.35+.65*n.e:.35;g.fillStyle=n.e>.12?col.ac:col.fg;g.fillRect(n.x+n.dx-s/2,n.y+n.dy-s/2,s,s)}
    for(let k=P.length-1;k>=0;k--){const p=P[k];p.t+=dt*7;const s=Math.floor(p.t);
      if(s<p.path.length&&N[p.path[s]].e<1)N[p.path[s]].e=1;
      if(p.t>=p.path.length-1){P.splice(k,1);sent++;ping=8+Math.floor(Math.random()*33);continue}
      for(let q=4;q>=0;q--){const[x,y]=at(p,p.t-q*.14);g.globalAlpha=.9-q*.17;g.fillStyle=col.ac;g.fillRect(x-3.5+q*.4,y-3.5+q*.4,7-q*.8,7-q*.8)}}
    g.globalAlpha=1;
    if(t-hudT>250){hudT=t;hud.textContent=`nodes ${N.length}  |  packets delivered ${sent}  |  last ping ${ping?ping+' ms':'--'}`}
  }
  function frame(t){if(!run){looping=false;return}const dt=Math.min((t-last)/1000||0,.05);last=t;
    if(t-spawn>1000&&P.length<3){spawn=t;send(Math.floor(Math.random()*N.length))}
    draw(t,dt);requestAnimationFrame(frame)}
  const rel=e=>{const r=cv.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]};
  cv.addEventListener('pointermove',e=>[mx,my]=rel(e));
  cv.addEventListener('pointerleave',()=>{mx=my=-1e3});
  cv.addEventListener('click',e=>{const[x,y]=rel(e);R.push({x,y,t:performance.now()});send(near(x,y));if(calm)draw(performance.now(),0)});
  new ResizeObserver(size).observe(cv);
  if(!calm)new IntersectionObserver(([e])=>{run=e.isIntersecting;if(run&&!looping){looping=true;last=performance.now();requestAnimationFrame(frame)}}).observe(cv);
  size();
}


/* ---- Anime.js effects (library loaded from CDN; the site works without it) ---- */
const onEnter=(el,fn,th=.15)=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){o.disconnect();fn()}},{threshold:th});o.observe(el)};
function fx(){
  const A=window.anime;if(calm||!A||!A.animate||!A.stagger)return;
  const {animate,stagger}=A;document.documentElement.classList.add('anime');
  const hide=(els,p)=>els.forEach(e=>{e.classList.remove('rv');e.classList.add('ani');Object.assign(e.style,p);T.push(e)});
  const done=els=>()=>els.forEach(e=>{e.classList.remove('ani');e.style.transform=''});
  const show=(host,els,o={})=>{hide(els,{opacity:0});onEnter(host,()=>{animate(els,{opacity:[0,1],translateY:[o.y??50,0],scale:[.94,1],delay:stagger(o.gap??90),duration:900,ease:'outExpo',onComplete:done(els)});o.after&&o.after()},.12)};
  try{
    /* hero: letters spring in, then the text lines follow */
    const chars=$$('.ch i');chars.forEach(c=>T.push(c));
    animate(chars,{translateY:[80,0],rotate:[14,0],opacity:[0,1],delay:stagger(45,{start:150}),duration:1200,ease:'outElastic(1,.7)'});
    const hi=[$('.status'),$('.role'),$('.tag'),...$('.cta').children];hide(hi,{opacity:0});
    animate(hi,{opacity:[0,1],translateY:[26,0],delay:stagger(110,{start:650}),duration:900,ease:'outExpo',onComplete:done(hi)});
    /* hero: dot grid. Click anywhere to send a ripple; it lifts away as you scroll */
    const hero=$('#hero'),cell=innerWidth<600?44:56,cols=Math.max(6,Math.round(hero.offsetWidth/cell)),rows=Math.max(4,Math.round(hero.offsetHeight/cell));
    const g=document.createElement('div');g.className='gridbg';g.style.gridTemplateColumns=`repeat(${cols},1fr)`;g.style.gridTemplateRows=`repeat(${rows},1fr)`;g.innerHTML='<i></i>'.repeat(cols*rows);hero.prepend(g);
    const dots=[...g.children],sg=(gap,from)=>stagger(gap,{grid:[cols,rows],from});
    animate(dots,{scale:[0,1],opacity:[0,.4],delay:sg(28,'center'),duration:900,ease:'outBack'});
    hero.addEventListener('click',e=>{if(e.target.closest('a,button'))return;const r=hero.getBoundingClientRect(),c=clamp(Math.floor((e.clientX-r.left)/r.width*cols),0,cols-1),w=clamp(Math.floor((e.clientY-r.top)/r.height*rows),0,rows-1);
      animate(dots,{scale:[{to:2.8,duration:220,ease:'outQuad'},{to:1,duration:900,ease:'outElastic(1,.6)'}],opacity:[{to:1,duration:220},{to:.4,duration:900}],delay:sg(40,w*cols+c)})});
    const gs=animate(g,{translateY:[0,-140],opacity:[1,0],ease:'linear',duration:SK,autoplay:false});gs.seek(0);
    scrubs.push(()=>gs.seek(clamp(scrollY/(innerHeight*.9))*SK));
    /* headings: words slide up from behind a mask */
    $$('.hd').forEach(h=>{const w=[...h.querySelectorAll('.wi')];w.forEach(x=>{x.style.transform='translateY(115%)';T.push(x)});onEnter(h,()=>animate(w,{translateY:['115%','0%'],delay:stagger(80),duration:1000,ease:'outExpo'}),.5)});
    /* cards, timeline items, stats, playground, contact: staggered entrances */
    $$('.grid').forEach(x=>show(x,[...x.children]));
    $$('.tl').forEach(t=>{show(t,[...t.querySelectorAll('.item')],{y:30,gap:140});
      const l=document.createElement('i');l.className='line';t.prepend(l);const a=animate(l,{scaleY:[0,1],ease:'linear',duration:SK,autoplay:false});a.seek(0);
      scrubs.push(()=>{const r=t.getBoundingClientRect();a.seek(clamp((innerHeight*.75-r.top)/r.height)*SK)})});
    const st=$('.stats');st&&show(st,$$('.stat'),{y:30,after:()=>$$('.stat b[data-n]').forEach(count)});
    const lw=$('.labwrap');lw&&show(lw,[$('.lead'),lw],{y:40});
    const ct=$('.contact');ct&&show(ct,[...ct.children],{y:40,gap:150});
  }catch(err){
    console.warn('Animation fallback',err);document.documentElement.classList.remove('anime');
    T.forEach(x=>{x.style.opacity='';x.style.transform='';x.classList.remove('ani')});$$('.gridbg').forEach(x=>x.remove());scrubs.length=0;
  }
}

/* ---- circuit trace: a line that draws itself down the left margin (wide screens) ---- */
let TS=null;
function trace(){
  const old=$('#trace');if(old)old.remove();TS=null;if(calm||innerWidth<1240)return;
  const H=document.documentElement.scrollHeight;let y=0,x=26,L=0,d='M26 0',n='';const seg=[];
  while(y<H-220){const ny=y+260+((y/260)%3)*90;seg.push([y,ny,L]);L+=ny-y;y=ny;d+=` V${y}`;x=x===26?54:26;d+=` H${x}`;L+=28;n+=`<circle cx="${x}" cy="${y}" r="4.5" data-y="${y}"/>`}
  seg.push([y,H,L]);TS={seg,total:L+(H-y)};
  $('main').insertAdjacentHTML('afterbegin',`<svg id="trace" width="80" height="${H}" viewBox="0 0 80 ${H}" data-h="${H}" aria-hidden="true"><path class="tb" d="${d} V${H}"/><path class="tf" id="tp" pathLength="1" d="${d} V${H}"/>${n}</svg>`);
  traceUpdate();
}
function traceUpdate(){const s=$('#trace');if(!s||!TS)return;const H=+s.dataset.h,p=clamp(scrollY/Math.max(1,H-innerHeight)),hy=p*H;
  let len=TS.total;for(const[a,b,l]of TS.seg)if(hy<=b){len=l+Math.max(0,hy-a);break}
  $('#tp').style.strokeDashoffset=1-clamp(len/TS.total);s.querySelectorAll('circle').forEach(c=>c.classList.toggle('on',+c.dataset.y<=hy))}

/* ---- theme + menu ---- */
const setT=t=>{document.documentElement.dataset.theme=t;try{localStorage.setItem('theme',t)}catch{}};
setT((()=>{try{return localStorage.getItem('theme')}catch{}})()||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'));
let rot=0;$('#theme').onclick=()=>{setT(document.documentElement.dataset.theme==='dark'?'light':'dark');$('#theme').style.rotate=(rot+=180)+'deg'};
$('#burger').onclick=()=>setMenu(!$('#links').classList.contains('open'));
/* if the icon font can't load (offline / blocked), fall back to built-in icons */
function iconFallback(){if(!document.querySelector('i[class^="devicon-"]'))return;const c=getComputedStyle(document.querySelector('i[class^="devicon-"]'),'::before').content,ok=!!c&&c!=='none'&&c!=='normal';
  if(!ok)$$('i[class^="devicon-"]').forEach(i=>{const n=i.nextElementSibling?i.nextElementSibling.textContent:'';i.outerHTML=`<span class="gi" aria-hidden="true"><svg viewBox="0 0 24 24">${SV[svk(n)]}</svg></span>`})}
render();onScroll();document.fonts&&document.fonts.ready.then(()=>{trace();schedule();syncPill()});addEventListener('load',()=>{setTimeout(iconFallback,400);trace();schedule()});
