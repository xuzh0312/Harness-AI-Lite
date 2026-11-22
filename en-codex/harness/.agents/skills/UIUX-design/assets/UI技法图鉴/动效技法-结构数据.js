// Chapters 8–11: Standalone sandbox demos. No external resources are loaded.
(() => {
  const base = `
button { font: inherit; color: #294636; background: #fffdf6; border: 1px solid var(--line, #bdcbbd); border-radius: 9px; padding: 5px 9px; cursor: pointer; }
button:hover, button[aria-pressed="true"] { background: #dceadd; }
:focus-visible { outline: 2px solid #226ab4; outline-offset: 2px; }
p { margin: 0; }
.controls { display:flex; align-items:center; flex-wrap:wrap; gap:5px; }
.caption { color:#435b4c; font-size:12px; }
`;
  const reduced = `
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
`;
  const demo = entry => ({ ...entry, css: base + entry.css + reduced });

  window.UI_MOTION_STRUCTURE = {
    '8.1': demo({
      note: 'Tiles span rows and columns while staying aligned to a shared grid. The main tile expands to show a summary. The point is to build a clear visual hierarchy, not a list of uniform cards.',
      height: 184,
      html: `<div class="bento"><button class="lead" aria-expanded="false"><small>01 / Main panel</small><strong>Forest survey</strong><span class="hint">Expand</span><span class="expand" hidden>Morning sampling complete</span></button><div><small>02 / Samples</small><b>24 sets</b></div><div><small>03 / Temperature</small><b>18 °C</b></div><div class="wide"><small>04 / Survey route</small><b>North slope ━━━ Lake center</b></div></div>`,
      css: `
.bento { display:grid; grid-template-columns: 1.35fr 1fr 1fr; grid-template-rows: 68px 68px; gap:7px; }
.bento>* { min-width:0; padding:9px; border:0; background:#e1ece2; border-radius:12px; text-align:left; animation:settle .38s both; display:grid; align-content:center; gap:2px; }
.bento .lead { grid-row:span 2; background:#284c3b; color:#f6fff9; }
.bento .lead:hover,.bento .lead[aria-expanded="true"] { background:#356149; }
.bento .wide { grid-column:span 2; background:#efead8; animation-delay:.14s; }
.bento div:nth-child(2) { animation-delay:.05s; }.bento div:nth-child(3) { animation-delay:.1s; }
.bento small,.hint,.expand { font-size:11px; }
.bento strong { font-size:clamp(15px,6vw,25px); }
.expand:not([hidden]) { animation:settle .24s both; }
@keyframes settle { from { opacity:0; transform:translateY(7px); } }
`,
      js: `const b=document.querySelector('.lead'); b.onclick=()=>{const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',open);b.querySelector('.expand').hidden=!open;b.querySelector('.hint').textContent=open?'Collapse':'Expand';};`
    }),
    '8.2': demo({
      note: 'Each card has equal weight, its own boundary, and its own state. Flip one to see the back without rearranging the others.',
      height: 174,
      html: `<div class="cards"><button aria-label="Ridge: flip for details" aria-pressed="false"><span><b>Ridge</b><small>Site 01</small></span><span aria-hidden="true"><b>Elevation</b><small>860 m</small></span></button><button aria-label="Lakeshore: flip for details" aria-pressed="false"><span><b>Lakeshore</b><small>Site 02</small></span><span aria-hidden="true"><b>Water temperature</b><small>16 °C</small></span></button></div><p class="caption">Select either card to flip it.</p>`,
      css: `
.cards {display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:9px; margin:3px 0 8px; perspective:500px; }
.cards button { position:relative; height:104px; border:0; padding:0; background:transparent; }
.cards span { position:absolute; inset:0; border-radius:10px; border:1px solid #cad5c8; background:#f7faf4; box-shadow:0 3px 6px #19372718; display:grid; align-content:center; gap:4px; backface-visibility:hidden; transition:transform .42s; }
.cards span+span { background:#d7eadb; transform:rotateY(180deg); }
.cards [aria-pressed="true"] span:first-child { transform:rotateY(-180deg); }
.cards [aria-pressed="true"] span+span { transform:rotateY(0deg); }
@media (prefers-reduced-motion:reduce) { .cards [aria-hidden="true"] { visibility:hidden; } }
`,
      js: `document.querySelectorAll('.cards button').forEach((b,i)=>b.onclick=()=>{const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);b.setAttribute('aria-label',on?['Ridge elevation: 860 meters. Flip back.','Lakeshore water temperature: 16 degrees Celsius. Flip back.'][i]:['Ridge: flip for details','Lakeshore: flip for details'][i]);b.firstElementChild.setAttribute('aria-hidden',on);b.lastElementChild.setAttribute('aria-hidden',!on);});`
    }),
    '8.3': demo({
      note: 'The backgrounds fill the iframe from edge to edge, and scrolling snaps between two full-bleed scenes. Fullscreen here means filling the demo viewport, not taking over the browser.',
      height: 190,
      html: `<section class="reel" tabindex="0" aria-label="Full-bleed landscapes. Scroll down for the second scene."><article><div><small>01 / Scroll down</small><strong>Through the valley</strong></div></article><article><div><small>02 / Lakeshore</small><strong>Sunset on the lake</strong></div></article></section>`,
      css: `
body { padding:0; }
.reel { height:100vh; overflow-y:auto; overscroll-behavior:contain; scroll-snap-type:y mandatory; }
.reel:focus-visible { outline-offset:-3px; }
.reel article { scroll-snap-align:start; min-height:100%; display:flex; align-items:end; color:#fff; padding:20px; background:linear-gradient(20deg,#173b31 20%,transparent 70%),linear-gradient(152deg,transparent 48%,#3f725b 49%,#6d987a 70%,transparent 71%),linear-gradient(30deg,#a3c09e,#dfeee2); }
.reel article+article { background:linear-gradient(10deg,#243c54 8%,#385c71 45%,transparent 69%),radial-gradient(circle at 71% 34%,#fff6d4 0 15px,transparent 16px),linear-gradient(#da916b,#f5cda1); }
.reel strong { display:block; font-size:28px; letter-spacing:.07em; }
@media (prefers-reduced-motion:reduce) { .reel { scroll-snap-type:none; } }
`
    }),
    '8.4': demo({
      note: 'The same blocks switch from aligned columns to an asymmetrical overlap. Compare the two layouts to see a structural change rather than a shadow added to a regular grid.',
      height: 194,
      html: `<div class="controls"><button aria-pressed="true">Offset layout</button><span class="caption" role="status">Title overlaps the image</span></div><div class="spread broken"><div class="photo" aria-hidden="true">◒</div><strong>Terrain<br>Archive</strong><span>FIELD NOTE / 08</span></div>`,
      css: `
.spread {margin-top:8px; height:122px; overflow:hidden; position:relative; background:#eae7d9; border-radius:8px; color:#233b30; }
.spread>* { position:absolute; transition:transform .35s cubic-bezier(.2,.8,.3,1); }
.spread .photo { left:4%; width:44%; top:8px; height:92px; background:#305745; color:#e4eec8; text-align:center; font:78px/92px serif; }
.spread strong { left:55%; top:17px; z-index:1; background:#ffd27e; padding:5px 10px; font-size:23px; line-height:1.05; }
.spread span { left:55%; bottom:10px; font-size:10px; letter-spacing:.08em; font-weight:700; }
.spread.broken .photo { transform:translate(24%,9px) rotate(-7deg); }
.spread.broken strong { transform:translate(-34%,15px) rotate(4deg); }
.spread.broken span { transform:translate(23%,-11px); }
`,
      js: `const b=document.querySelector('button');b.onclick=()=>{const broken=document.querySelector('.spread').classList.toggle('broken');b.setAttribute('aria-pressed',broken);document.querySelector('[role=status]').textContent=broken?'Title overlaps the image':'Back to two aligned columns';};`
    }),
    '8.5': demo({
      note: 'Cards stack independently in three columns, so their heights do not have to line up. New local samples go into whichever column is shortest at the time. No external images or endless requests are used.',
      height: 208,
      html: `<div class="controls"><button>Add three samples</button><span class="caption" role="status">6 samples · Scroll within the grid</span></div><div class="wall" tabindex="0" aria-label="Sample masonry grid"><div><span style="--h:62px;--color:#debb90">01</span><span style="--h:40px;--color:#dce8bc">04</span></div><div><span style="--h:43px;--color:#d4e4d0">02</span><span style="--h:72px;--color:#cfdfeb">05</span></div><div><span style="--h:76px;--color:#d5e3bf">03</span><span style="--h:46px;--color:#ead9bf">06</span></div></div>`,
      css: `
.wall { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); align-items:start; gap:5px; margin-top:7px; height:141px; overflow:auto; overscroll-behavior:contain; }
.wall div { display:grid; gap:5px; }
.wall span { display:grid; place-items:center; height:var(--h); background:repeating-linear-gradient(35deg,transparent 0 10px,#fff2 10px 20px),var(--color); border-radius:8px; color:#263a31; font-weight:700; animation:pop .36s var(--wait,0s) both; }
@keyframes pop { from { opacity:0; transform:translateY(6px); } }
`,
      js: `const wall=document.querySelector('.wall'), cols=[...wall.children], b=document.querySelector('button'), colors=['#debb90','#d4e4d0','#cfdfeb'];let n=6;b.onclick=()=>{for(let i=0;i<3;i++){const col=cols.reduce((a,c)=>a.offsetHeight<=c.offsetHeight?a:c);const card=document.createElement('span');card.textContent=String(++n).padStart(2,'0');card.style.setProperty('--h',36+n*11%44+'px');card.style.setProperty('--color',colors[n%3]);card.style.setProperty('--wait',i*.06+'s');col.append(card);}document.querySelector('[role=status]').textContent=n+' samples · Scroll within the grid';wall.scrollTo({top:wall.scrollHeight,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});if(n===24){b.disabled=true;b.textContent='All local samples shown';}};`
    }),
    '9.1': demo({
      note: 'A glow follows the pointer with interpolation inside the demo area and becomes a ring over the marker. The system pointer stays visible. The tracking effect is disabled for touch and reduced motion.',
      height: 176,
      html: `<div class="field"><span>Move the pointer over the grid</span><b>◎ Marker</b><i aria-hidden="true"></i></div>`,
      css: `
.field { height:140px; overflow:hidden; position:relative; background:#204333 radial-gradient(#6c8878 1px,transparent 1px) 0 0/16px 16px; border-radius:10px; color:#f2fff7; padding:12px; }
.field b { position:absolute; left:45%; top:43%; border:1px solid #8eaa98; background:#305745; border-radius:6px; padding:7px; }
.field i { position:absolute; left:0; top:0; width:0; height:0; pointer-events:none; display:none; }
.field.live i { display:block; }
.field i::before { content:''; display:block; width:20px; height:20px; translate:-50% -50%; border:2px solid #ffdd87; border-radius:50%; box-shadow:0 0 16px #ffe2a9; background:#ffcf6b80; transition:scale .2s,background .2s; }
.field.mark i::before { scale:1.65; background:transparent; }
@media (prefers-reduced-motion:reduce) { .field.live i { display:none; } }
`,
      js: `const zone=document.querySelector('.field'),halo=zone.querySelector('i'),mark=zone.querySelector('b'),rm=matchMedia('(prefers-reduced-motion: reduce)');let x,y,tx,ty,id=0;function frame(){id=0;x+=(tx-x)*.23;y+=(ty-y)*.23;halo.style.transform='translate('+x+'px,'+y+'px)';if(Math.abs(x-tx)+Math.abs(y-ty)>.25)id=requestAnimationFrame(frame);}zone.onpointermove=e=>{if(e.pointerType==='touch'||rm.matches)return;const r=zone.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top;if(!zone.classList.contains('live')){x=tx;y=ty;zone.classList.add('live');}zone.classList.toggle('mark',e.target===mark);if(!id)frame();};zone.onpointerleave=()=>{zone.classList.remove('live','mark');cancelAnimationFrame(id);id=0;};`
    }),
    '9.2': demo({
      note: 'This time the button itself moves. Distance is measured from a fixed center: the button shifts toward the pointer within the attraction radius and returns when the pointer moves away. Unlike the previous demo, this is not a cursor trail.',
      height: 179,
      html: `<div class="well"><span>Move inside the dashed outline</span><div class="anchor"><button>Magnetic button</button></div><output aria-live="polite"></output></div>`,
      css: `
.well { height:147px; border-radius:10px; position:relative; background:#e4eee4; text-align:center; padding-top:8px; }
.well span,.well output { color:#3b5847; font-size:12px; }
.well output { position:absolute; bottom:7px; left:0; right:0; }
.anchor { position:absolute; top:23px; left:50%; translate:-50%; width:104px; height:104px; border:1px dashed #809b89; border-radius:50%; display:grid; place-items:center; }
.anchor button { transform:translate(var(--x,0px),var(--y,0px)); transition:transform .37s cubic-bezier(.19,1.6,.39,1); background:#315943; color:#fff; white-space:nowrap; }
.well.near button { transition:transform .09s ease-out; }
`,
      js: `const w=document.querySelector('.well'),a=w.querySelector('.anchor'),b=a.querySelector('button');const reset=()=>{w.classList.remove('near');b.style.removeProperty('--x');b.style.removeProperty('--y');};w.onpointermove=e=>{if(e.pointerType==='touch'||matchMedia('(prefers-reduced-motion: reduce)').matches){reset();return;}const r=a.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2,d=Math.hypot(x,y);if(d>54){reset();return;}w.classList.add('near');b.style.setProperty('--x',x*.32+'px');b.style.setProperty('--y',y*.32+'px');};w.onpointerleave=reset;b.onclick=()=>w.querySelector('output').textContent='Button activated';`
    }),
    '9.3': demo({
      note: 'Hovering reveals a panel in place without tracking pointer coordinates. Focus or click opens the same panel for keyboard and touch users.',
      height: 161,
      html: `<button class="tile" aria-label="Moss guide preview: A green carpet on damp, shaded rocks" aria-pressed="false"><span class="title">Moss guide <small>Preview ↗</small></span><span class="detail" aria-hidden="true">A green carpet on damp, shaded rocks</span></button><p class="caption">Hover, focus, or click.</p>`,
      css: `
.tile { display:block; position:relative; height:100px; width:100%; overflow:hidden; margin-bottom:8px; text-align:left; background:#c9dfbf radial-gradient(circle at 85% 10%,#e9efb0,transparent 52%); }
.tile:hover,.tile[aria-pressed="true"] { background:#c9dfbf radial-gradient(circle at 85% 10%,#e9efb0,transparent 52%); }
.title { display:block; font-weight:700; transition:transform .24s; }
.title small { font-weight:400; }
.detail { position:absolute; inset:auto 0 0; padding:8px; transform:translateY(100%); transition:transform .24s; background:#2b533d; color:#fff; font-size:12px; }
.tile:focus-visible .title,.tile[aria-pressed="true"] .title { transform:translateY(-12px); }
.tile:focus-visible .detail,.tile[aria-pressed="true"] .detail { transform:none; }
@media (hover:hover) { .tile:hover .title { transform:translateY(-12px); } .tile:hover .detail { transform:none; } }
`,
      js: `const b=document.querySelector('.tile');b.onclick=()=>b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');`
    }),
    '9.4': demo({
      note: 'Drag the task into the dashed drop zone. Release it outside the target and it stays in its original column. You can also move it by clicking the task or pressing Enter.',
      height: 186,
      html: `<div class="board"><section><b>To do</b><button id="task" aria-label="Collect leaves. Activate to move to the other column.">Collect leaves</button></section><section><b>Done</b></section></div><p class="caption" role="status">Drag the task to the other column or select it to move it.</p>`,
      css: `
.board {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-bottom:9px; }
.board section { min-width:0; height:105px; border:1px dashed #8ca58f; background:#edf2e8; border-radius:9px; padding:7px; }
.board section.over { outline:2px solid #40845b; outline-offset:1px; background:#d8ead8; }
.board button { display:block; margin-top:9px; max-width:100%; touch-action:none; user-select:none; cursor:grab; font-size:12px; }
.ghost { position:fixed; z-index:1; pointer-events:none; border-radius:8px; padding:6px 9px; color:#fff; background:#315943; opacity:.92; }
`,
      js: `const task=document.querySelector('#task'),cols=[...document.querySelectorAll('.board section')],status=document.querySelector('[role=status]');let start=null,ghost=null,target=null,ignoreClick=false;const other=()=>cols.find(c=>c!==task.parentElement);function move(to){to.append(task);task.focus();status.textContent='Task moved to “'+to.querySelector('b').textContent+'”.';}task.onclick=e=>{if(ignoreClick&&e.detail){ignoreClick=false;return;}move(other());};task.onpointerdown=e=>{if(!e.isPrimary||e.button!==0)return;ignoreClick=false;start={x:e.clientX,y:e.clientY,id:e.pointerId};task.setPointerCapture(e.pointerId);};task.onpointermove=e=>{if(!start||start.id!==e.pointerId)return;if(!ghost&&Math.hypot(e.clientX-start.x,e.clientY-start.y)<6)return;if(!ghost){ghost=document.createElement('span');ghost.className='ghost';ghost.setAttribute('aria-hidden','true');ghost.textContent=task.textContent;document.body.append(ghost);}ghost.style.left=e.clientX+8+'px';ghost.style.top=e.clientY-14+'px';const c=other(),r=c.getBoundingClientRect();target=e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom?c:null;c.classList.toggle('over',!!target);};function finish(drop){if(!start)return;start=null;if(!ghost)return;ghost.remove();ghost=null;ignoreClick=true;cols.forEach(c=>c.classList.remove('over'));if(drop&&target)move(target);target=null;}task.onpointerup=()=>finish(true);task.onpointercancel=task.onlostpointercapture=()=>finish(false);`
    }),
    '9.5': demo({
      note: 'The track follows a horizontal swipe and changes slides once the swipe passes a threshold. Drag with a mouse to simulate a single-finger swipe, or use the buttons instead. This demo does not simulate pinching or long presses.',
      height: 194,
      html: `<div class="swipe" aria-label="Landscape slides. Swipe left or right."><div class="track" aria-hidden="true"><div>01 / Pine forest</div><div>02 / Open water</div><div>03 / Ridge</div></div></div><div class="controls"><button class="prev">Previous slide</button><button class="next">Next slide</button><span class="caption" role="status"></span></div>`,
      css: `
.swipe { overflow:hidden; border-radius:9px; touch-action:pan-y; cursor:grab; margin-bottom:6px; }
.track { display:flex; transform:translateX(calc(var(--page,0%) + var(--dx,0px))); transition:transform .26s ease-out; user-select:none; }
.track.dragging { transition:none; }
.track div { flex:0 0 100%; height:112px; display:grid; place-items:center; color:#fff; font-size:20px; font-weight:700; letter-spacing:.12em; background:repeating-linear-gradient(115deg,#2d513e 0 18px,#365d48 18px 35px); }
.track div:nth-child(2) { background:repeating-linear-gradient(10deg,#31576d 0 14px,#3b6478 14px 22px); }
.track div:nth-child(3) { background:repeating-linear-gradient(165deg,#694d3d 0 16px,#745647 16px 23px); }
`,
      js: `const pane=document.querySelector('.swipe'),track=document.querySelector('.track'),prev=document.querySelector('.prev'),next=document.querySelector('.next'),status=document.querySelector('[role=status]'),rm=matchMedia('(prefers-reduced-motion: reduce)');let n=0,start=null,dx=0;function page(i){n=Math.min(2,Math.max(0,i));track.style.setProperty('--page',-n*100+'%');track.style.removeProperty('--dx');prev.disabled=n===0;next.disabled=n===2;status.textContent=['Pine forest','Open water','Ridge'][n]+' '+(n+1)+'/3';}prev.onclick=()=>page(n-1);next.onclick=()=>page(n+1);pane.onpointerdown=e=>{if(!e.isPrimary||e.button!==0)return;start=e.clientX;dx=0;pane.setPointerCapture(e.pointerId);track.classList.add('dragging');};pane.onpointermove=e=>{if(start===null)return;dx=e.clientX-start;if(!rm.matches)track.style.setProperty('--dx',Math.max(-pane.clientWidth,Math.min(pane.clientWidth,dx*((n===0&&dx>0)||(n===2&&dx<0)?.2:1)))+'px');};function end(change){if(start===null)return;start=null;track.classList.remove('dragging');page(n+(change&&Math.abs(dx)>36?(dx<0?1:-1):0));}pane.onpointerup=()=>end(true);pane.onpointercancel=pane.onlostpointercapture=()=>end(false);page(0);`
    }),
    '9.6': demo({
      kind: 'Illustration',
      note: 'Try the sequence from standby through simulated listening to the command result without a microphone. The waveform and command are preset; no speech recognition takes place.',
      height: 185,
      html: `<div class="voice"><div class="wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><p role="status">Standby · No microphone in use</p></div><div class="controls"><button>Simulate “Turn on the lamp”</button></div>`,
      css: `
.voice { border-radius:10px; color:#fff; background:#253f38; padding:11px 7px; text-align:center; margin-bottom:7px; }
.voice.on { background:#496340; }
.wave { height:49px; display:flex; gap:5px; align-items:center; justify-content:center; }
.wave i { display:block; width:7px; height:28px; background:#f2d387; border-radius:8px; transform:scaleY(.25); }
.voice.listen i { animation:pulse .57s ease-in-out infinite alternate; }
.voice.on i { transform:scaleY(.46); }
.voice.listen i:nth-child(2n) { animation-delay:-.35s; }.voice.listen i:nth-child(3) { animation-delay:-.18s; }
@keyframes pulse { to { transform:scaleY(1.4); } }
`,
      js: `const box=document.querySelector('.voice'),s=box.querySelector('[role=status]'),b=document.querySelector('button');let timer;b.onclick=()=>{clearTimeout(timer);box.className='voice listen';s.textContent='Simulated listening…';timer=setTimeout(()=>{box.className='voice on';s.textContent='Simulation result: Lamp turned on';},matchMedia('(prefers-reduced-motion: reduce)').matches?80:700);};`
    }),
    '10.1': demo({
      note: 'One number eases out toward its target. Equal-width digits prevent the numerals from jittering, and reduced motion shows the final value immediately.',
      height: 160,
      html: `<div class="metric"><div>New samples this month</div><strong aria-hidden="true">0</strong><small>samples</small><span class="sr" role="status"></span></div><button>Replay count-up</button>`,
      css: `
.metric { padding:9px 13px; margin-bottom:7px; border-radius:10px; background:#e1ecdf; color:#294534; }
.metric strong { font-size:35px; font-variant-numeric:tabular-nums; letter-spacing:-.025em; }
.metric small { margin-left:4px; }
.sr { position:absolute; width:1px; height:1px; clip-path:inset(50%); overflow:hidden; white-space:nowrap; }
`,
      js: `const num=document.querySelector('strong'),s=document.querySelector('[role=status]'),fmt=new Intl.NumberFormat('en-US'),rm=matchMedia('(prefers-reduced-motion: reduce)');let id;function run(){cancelAnimationFrame(id);s.textContent='';const start=performance.now();function step(now){const p=rm.matches?1:Math.min(1,(now-start)/950);num.textContent=fmt.format(Math.round(12840*(1-(1-p)**3)));if(p<1)id=requestAnimationFrame(step);else s.textContent='12,840 new samples this month';}step(start);}document.querySelector('button').onclick=run;run();`
    }),
    '10.2': demo({
      note: 'Three bars animate to their new values on the same scale. Unlike a single count-up, this shows how the categories change relative to one another. The demo uses fixed sample data.',
      height: 194,
      html: `<div class="controls" aria-label="Chart month"><button aria-pressed="true">April</button><button aria-pressed="false">May</button><span class="caption">Same scale: 0–100</span></div><div class="chart" role="img" aria-label="April: A 32, B 58, C 43"><div><b>32</b><i></i><small>A</small></div><div><b>58</b><i></i><small>B</small></div><div><b>43</b><i></i><small>C</small></div></div>`,
      css: `
.chart {display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px; margin-top:6px; padding:0 10px; background:repeating-linear-gradient(to top,#e1e9df 0 1px,transparent 1px 25px); }
.chart div { --val:0; display:flex; align-items:center; justify-content:end; flex-direction:column; height:125px; }
.chart i { width:min(65%,60px); height:calc(var(--val) * .82px); background:#487d5d; border-radius:5px 5px 0 0; transition:height .45s cubic-bezier(.2,.8,.35,1); }
.chart div:nth-child(2) i { background:#416b8a; }.chart div:nth-child(3) i { background:#a07036; }
.chart b,.chart small { font-size:12px; }
`,
      js: `const chart=document.querySelector('.chart'),bars=[...chart.children],buttons=[...document.querySelectorAll('button')];function plot(i){const vals=i?[76,43,89]:[32,58,43];buttons.forEach((b,j)=>b.setAttribute('aria-pressed',i===j));bars.forEach((b,j)=>{b.style.setProperty('--val',vals[j]);b.querySelector('b').textContent=vals[j];});chart.setAttribute('aria-label',buttons[i].textContent+': A '+vals[0]+', B '+vals[1]+', C '+vals[2]);}let selected=false;buttons.forEach((b,i)=>b.onclick=()=>{selected=true;plot(i);});if(matchMedia('(prefers-reduced-motion: reduce)').matches)plot(0);else requestAnimationFrame(()=>requestAnimationFrame(()=>{if(!selected)plot(0);}));`
    }),
    '10.3': demo({
      note: 'Scroll through the chapters. The display on the left keeps the same data scale and highlights the current stage. The fictional data illustrates the reading sequence, not a real causal relationship.',
      height: 197,
      html: `<div class="story"><div class="index" role="img" aria-label="Three stages: Prep 18, Pilot 41, Rollout 68. Current stage: Prep"><div class="on"><b>18</b><span>Prep</span></div><div><b>41</b><span>Pilot</span></div><div><b>68</b><span>Rollout</span></div></div><div class="chapters" tabindex="0" aria-label="Scroll down to read the three stages."><section><strong>01 Prep</strong><p>The baseline was 18 sites.</p></section><section><strong>02 Pilot</strong><p>After the pilot, 41 sites were recorded.</p></section><section><strong>03 Rollout</strong><p>Coverage reached 68 sites.</p></section></div></div><p class="caption">Scroll on the right to change the highlight on the left.</p>`,
      css: `
.story {display:grid;grid-template-columns:1fr 1fr;gap:9px; margin-bottom:6px; }
.index { display:grid; align-content:center; gap:6px; border-radius:9px; background:#e8efe3; padding:8px; }
.index div { position:relative; padding:4px 6px; border-left:3px solid transparent; border-radius:4px; display:flex; gap:5px; align-items:center; color:#30483a; background:#eef1e8; transition:background .24s,border-color .24s; }
.index div::before { content:''; position:absolute; inset:0 auto 0 0; width:var(--w,18%); opacity:.25; background:#75a67f; }
.index div:nth-child(2) { --w:41%; }.index div:nth-child(3) { --w:68%; }
.index div>* { position:relative; }
.index .on { border-left-color:#2d6544; background:#d8e9d6; }
.chapters { height:135px; overflow:auto; overscroll-behavior:contain; scroll-snap-type:y proximity; }
.chapters section { height:135px; scroll-snap-align:start; background:#f5eee0; display:grid; align-content:center; padding:8px; border-radius:9px; }
.chapters section p { font-size:12px; }
@media (prefers-reduced-motion:reduce) { .chapters { scroll-snap-type:none; } }
`,
      js: `const sc=document.querySelector('.chapters'),ix=document.querySelector('.index'),items=[...ix.children];let active=0;sc.onscroll=()=>{const n=Math.min(2,Math.round(sc.scrollTop/sc.clientHeight));if(n===active)return;active=n;items.forEach((p,i)=>p.classList.toggle('on',i===n));ix.setAttribute('aria-label','Three stages: Prep 18, Pilot 41, Rollout 68. Current stage: '+items[n].querySelector('span').textContent);};`
    }),
    '11.1': demo({
      kind: 'Illustration',
      note: 'Offline rules pick different components for two preset intents and build the interface one piece at a time. The demo neither calls AI nor interprets free text.',
      height: 207,
      html: `<div class="controls"><button data-intent="tour">Plan a route</button><button data-intent="report">View report</button></div><p class="caption mode" role="status">Local template · Choose an intent</p><div class="generated" aria-label="Generated components"></div>`,
      css: `
.mode { margin:6px 0; }
.generated { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:5px; }
.generated article { padding:7px 8px; border-radius:8px; color:#294534; background:#dbeadf; animation:arrive .24s both; font-size:12px; }
.generated article:first-child { grid-column:span 2; background:#e8dfc8; }
.generated[data-intent="report"] article:first-child { grid-column:auto; }
.generated[data-intent="report"] article:last-child { grid-column:span 2; }
@keyframes arrive { from { opacity:0; transform:translateY(5px); } }
`,
      js: `const out=document.querySelector('.generated'),state=document.querySelector('.mode'),rm=matchMedia('(prefers-reduced-motion: reduce)'),templates={tour:['Route · Pine forest → Lakeshore','Distance · 2.4 km','Gear · Raincoat'],report:['Metric · 18 sites','Change · +3 sites','Finding · New monitoring sites in the east']};let run=0;document.querySelectorAll('button').forEach(b=>b.onclick=()=>{const token=++run,key=b.dataset.intent;out.replaceChildren();out.dataset.intent=key;state.textContent='Local template · Assembling components';templates[key].forEach((text,i)=>{const add=()=>{if(token!==run)return;const item=document.createElement('article');item.textContent=text;out.append(item);if(i===2)state.textContent='Local template · 3 components generated';};if(rm.matches)add();else setTimeout(add,i*145);});});`
    }),
    '11.2': demo({
      kind: 'Illustration',
      note: 'No new components are generated from prompts. The same home page reorders its cards and changes its theme based on clicks in this session. It stores no identity, and refreshing clears the preferences.',
      height: 211,
      html: `<div class="controls"><button data-focus="trail">Prefer routes</button><button data-focus="log">Prefer logs</button><button class="reset">Reset</button></div><div class="home"><p class="caption" role="status">Adapts to clicks in this session</p><div class="homecards"><article data-key="trail">Explore routes <b>0</b></article><article data-key="log">Survey logs <b>0</b></article></div></div>`,
      css: `
.home { border-radius:9px; padding:7px; margin-top:7px; background:#e4eee1; transition:background .25s; }
.home[data-theme="log"] { background:#e3eaf4; }
.home .caption { margin-bottom:5px; }
.homecards { display:grid; gap:5px; }
.home article { display:flex; justify-content:space-between; padding:6px 8px; border-radius:7px; background:#fcfcf4; }
`,
      js: `const home=document.querySelector('.home'),grid=home.querySelector('.homecards'),cards=[...grid.children],state=home.querySelector('[role=status]'),taps={trail:0,log:0},rm=matchMedia('(prefers-reduced-motion: reduce)');function adapt(){const old=new Map(cards.map(c=>[c,c.getBoundingClientRect().top]));const order=[...cards].sort((a,b)=>taps[b.dataset.key]-taps[a.dataset.key]);order.forEach(c=>{c.querySelector('b').textContent=taps[c.dataset.key];grid.append(c);if(c.getAnimations)c.getAnimations().forEach(a=>a.cancel());});for(const c of order){const dy=old.get(c)-c.getBoundingClientRect().top;if(dy&&!rm.matches&&c.animate)c.animate([{transform:'translateY('+dy+'px)'},{transform:'none'}],{duration:230,easing:'ease-out'});}const tied=taps.trail===taps.log;home.dataset.theme=tied?'trail':order[0].dataset.key;state.textContent=tied?'Equal interest · Default order':(home.dataset.theme==='trail'?'Routes':'Logs')+' first · Theme follows this session’s preference';}document.querySelectorAll('[data-focus]').forEach(b=>b.onclick=()=>{taps[b.dataset.focus]++;adapt();});document.querySelector('.reset').onclick=()=>{taps.trail=taps.log=0;adapt();};`
    }),
    '11.3': demo({
      kind: 'Illustration',
      note: 'Buttons map style prompts to different local keyframes and easing to simulate motion generation. There is no model, video synthesis, or real-time AI rendering.',
      height: 193,
      html: `<div class="controls"><button data-motion="glide" aria-pressed="false">Prompt: Glide</button><button data-motion="hop" aria-pressed="false">Prompt: Bounce</button></div><div class="rail" aria-hidden="true"><i></i></div><p class="caption" role="status">Rule-based demo · Choose a style to preview it</p>`,
      css: `
.rail { position:relative; height:92px; overflow:hidden; border-radius:9px; margin:7px 0 5px; background:repeating-linear-gradient(90deg,#dce9e0 0 1px,transparent 1px 25%),#eef3e9; }
.rail::before { content:''; position:absolute; inset:auto 7% 17px; border-bottom:2px dashed #7a9480; }
.rail i { position:absolute; bottom:18px; left:8%; width:23px; height:23px; background:#37654d; border-radius:50%; translate:-50%; }
.rail i.end { left:88%; }
`,
      js: `const ball=document.querySelector('.rail i'),state=document.querySelector('[role=status]'),rm=matchMedia('(prefers-reduced-motion: reduce)'),buttons=[...document.querySelectorAll('button')];let playing;const frames={glide:[{left:'8%',transform:'translateY(0)'},{left:'52%',transform:'translateY(-32px)'},{left:'88%',transform:'translateY(0)'}],hop:[{left:'8%',transform:'scaleY(.75)'},{left:'34%',transform:'translateY(-38px)'},{left:'52%',transform:'scaleY(.82)'},{left:'72%',transform:'translateY(-21px)'},{left:'88%',transform:'none'}]};buttons.forEach(b=>b.onclick=()=>{if(playing)playing.cancel();const key=b.dataset.motion;buttons.forEach(c=>c.setAttribute('aria-pressed',b===c));ball.classList.add('end');state.textContent='Local keyframes · '+(key==='glide'?'3 frames / smooth arc':'5 frames / two bounces');if(!rm.matches&&ball.animate)playing=ball.animate(frames[key],{duration:key==='glide'?980:820,easing:key==='glide'?'ease-in-out':'ease-out'});});`
    })
  };
})();
