window.UI_LAYOUT_EXAMPLES = {
  '1.1': {
    note: 'All three sections share one page. Use the buttons at the top to jump between them. A single-page layout keeps the content together; it does not have to be long.', height:220,
    html:`<nav aria-label="On this page"><button data-to="intro">Overview</button><button data-to="paths">Trails</button><button data-to="tips">Tips</button></nav>
<div class="sections" tabindex="0" aria-label="Scrollable single-page content">
  <section id="intro" tabindex="-1"><b>01 / Overview</b><p>Choose from three half-day hikes starting at the foot of the mountain.</p></section>
  <section id="paths" tabindex="-1"><b>02 / Trails</b><p>Pine Trail is the gentlest route. Creek Trail has spots to rest along the way.</p></section>
  <section id="tips" tabindex="-1"><b>03 / Tips</b><p>Avoid slippery stone steps after rain and bring plenty of drinking water.</p></section>
</div>`,
    css:`nav{display:flex;gap:8px;padding-bottom:8px}.sections{height:150px;overflow:auto;border:1px solid var(--line)}
section{min-height:100%;padding:20px;background:var(--tile)}section:nth-child(2){background:#d8e8d9}section:nth-child(3){background:#f1e6d3}p{margin:.4em 0}
@media(prefers-reduced-motion:no-preference){.sections{scroll-behavior:smooth}}`,
    js:`const sections = document.querySelector('.sections');
document.querySelectorAll('[data-to]').forEach(btn => btn.onclick = () => {
  const target = document.getElementById(btn.dataset.to);
  target.focus({preventScroll:true});
  sections.scrollTop += target.getBoundingClientRect().top - sections.getBoundingClientRect().top - sections.clientTop;
});`
  },
  '1.2': {
    note: 'The navigation swaps in separate templates for Home, Trails, and Hiking Tips while keeping the header and footer. This simulates a multi-page site without loading a new document or changing the URL.', height:215, kind:'Approximation',
    html:`<header><b>Mountain Trails</b><nav aria-label="Site navigation"><button data-page="home" aria-current="page">Home</button><button data-page="paths">Trails</button><button data-page="tips">Hiking Tips</button></nav></header>
<main></main><footer>Mountain Trails · Trail information</footer>
<template id="home"><h2 tabindex="-1">Mountain Routes</h2><p>Pick a half-day hike and head out.</p></template>
<template id="paths"><h2 tabindex="-1">Trail Directory</h2><ul><li>Pine Trail · 2.5 km</li><li>Creek Trail · 4 km</li></ul></template>
<template id="tips"><h2 tabindex="-1">Before You Go</h2><p><strong>After rain:</strong> Avoid wet stone steps and remember to bring water.</p></template>`,
    css:`header,footer{padding:6px 9px;background:var(--tile)}header{display:flex;align-items:center;flex-wrap:wrap;gap:4px 12px}nav{display:flex;flex-wrap:wrap;gap:4px}button[aria-current]{background:var(--forest);color:white}main{min-height:102px;padding:7px 9px;border-inline:1px solid var(--line);background:white}h2,p,ul{margin:.15em 0}h2{font-size:18px}ul{padding-inline-start:1.2em}footer{font-size:12px}`,
    js:`const buttons = [...document.querySelectorAll('button[data-page]')];
const main = document.querySelector('main');
function openPage(selected, focus = false) {
  buttons.forEach(button => button === selected ? button.setAttribute('aria-current','page') : button.removeAttribute('aria-current'));
  const template = document.getElementById(selected.dataset.page);
  main.replaceChildren(template.content.cloneNode(true));
  if (focus) main.querySelector('h2').focus();
}
buttons.forEach(button => button.onclick = () => openPage(button, true));
openPage(buttons[0]);`
  },
  '1.3': {
    note: 'Scroll inside the preview to advance the progress bar. Sections follow the climb in order of elevation, so scrolling tells the story rather than simply jumping to sections.', height:232,
    html:`<label for="progress">Hike Journal · Reading progress</label><progress id="progress" max="100" value="0"></progress>
<div class="trail" tabindex="0" aria-label="Scroll down to read the hike journal">
  <section><small>01 / 240 m</small><h2>Through the Mist</h2><p>Follow the boardwalk into the shade of the pines.</p></section>
  <section><small>02 / 410 m</small><h2>Across the Creek Valley</h2><p>The sound of water fades as the forest trail climbs.</p></section>
  <section><small>03 / 610 m</small><h2>Above the Trees</h2><p>Take a break at the overlook ahead.</p></section>
  <section><small>04 / 760 m</small><h2>At the Summit</h2><p>The entire route is now visible below.</p></section>
</div>`,
    css:`label{font-size:12px;font-weight:700}progress{display:block;width:100%;height:8px;margin:4px 0 7px;accent-color:var(--forest)}
.trail{height:164px;overflow:auto;border:1px solid var(--line)}section{display:grid;align-content:center;min-height:154px;padding:16px;background:#e4eddc}
section:nth-child(2){background:#cddfd7}section:nth-child(3){background:#a9c7b4}section:nth-child(4){background:#315941;color:#fff}h2,p{margin:.15em 0}h2{font-size:clamp(17px,4vw,25px)}`,
    js:`const trail = document.querySelector('.trail');
const progress = document.querySelector('progress');
function update() { progress.value = 100 * trail.scrollTop / Math.max(1, trail.scrollHeight - trail.clientHeight); }
trail.addEventListener('scroll', update, {passive:true});
addEventListener('resize', update);`
  },
  '1.4': {
    note: 'The headline dominates the opening screen, with secondary details below the fold. What matters is the prominence of the opening: neither centered alignment nor a full-screen background is required.', height:215,
    html:`<main><section class="opening"><small>Mountain Series / 01</small><h1>Half a Day<br>in the Mountains</h1><p>Three trails to take at your own pace.</p></section>
<section class="secondary"><b>Plan Your Hike</b><p>Check routes, grades, and supply stops before setting out.</p></section></main>`,
    css:`.opening{min-height:calc(100vh - 20px);display:grid;align-content:center;justify-items:start;padding:14px clamp(16px,6vw,64px);background:#dbe8d7;border-inline-start:7px solid var(--forest)}
h1{font-size:clamp(36px,10vw,65px);line-height:1.01;margin:.12em 0;color:var(--forest);letter-spacing:-.05em}p{margin:0}.secondary{padding:16px 22px;margin-block:8px;border-top:1px solid var(--line)}`
  },
  '1.5': {
    note: 'Two independent themes share the space equally. Neither side controls what the other displays. On narrow screens, they stack in two equal halves.', height:225,
    html:`<main class="split"><section><small>01 / Forest</small><h2>Through the Pines</h2><p>Gentle forest trail · 2.5 km</p></section>
<section><small>02 / Waterside</small><h2>Along the Creek</h2><p>Creekside walk · 4 km</p></section></main>`,
    css:`.split{height:calc(100vh - 20px);display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:2px}
section{display:grid;align-content:center;justify-items:start;padding:10px clamp(12px,4vw,36px);background:#dce9d7;color:#1f402f}section+section{background:#dee9ed;color:#173944}h2,p{margin:.12em 0}h2{font-size:clamp(20px,5vw,34px)}
@media(max-width:360px){.split{grid-template-columns:1fr;grid-template-rows:repeat(2,minmax(0,1fr))}}`
  },
  '1.6': {
    note: 'An inline vector landscape fills the preview, with the title over a dark overlay. Unlike a headline-led opening, this technique is about background coverage, not type size.', height:200,
    html:`<main><svg class="landscape" aria-hidden="true" viewBox="0 0 780 290" preserveAspectRatio="xMidYMid slice">
  <rect width="780" height="290" fill="#b2ccc5"/><circle cx="560" cy="72" r="44" fill="#fae2a1"/>
  <path d="M0 178 132 94 224 150 355 53 558 166 650 95 780 184V290H0Z" fill="#69897e"/>
  <path d="M0 230 122 160 194 187 330 128 460 219 630 166 780 208V290H0Z" fill="#476a58"/>
  <path d="M0 248C145 290 250 200 425 243S690 204 780 247V290H0Z" fill="#25493a"/>
</svg><div class="caption"><h1>Morning in the Valley</h1><p>Creek Trail · Follow the water upstream</p></div></main>`,
    css:`body{padding:0}main{position:relative;isolation:isolate;display:grid;align-items:end;min-height:100vh;color:white}
.landscape,main::after{position:absolute;inset:0;width:100%;height:100%;z-index:-1}main::after{content:"";background:linear-gradient(0deg,#122b23e8,transparent 85%)}
.caption{padding:clamp(14px,5vw,42px)}h1,p{margin:.12em 0}`
  },
  '1.7': {
    note: 'The cover story gets a large image and a summary. Briefs use smaller type and less space. Editorial priority sets the size, rather than a uniform card grid.', height:232,
    html:`<header>Mountain Journal <small>· Issue 08</small></header>
<div class="mag"><article class="feature"><svg aria-hidden="true" viewBox="0 0 320 75" preserveAspectRatio="none"><rect width="320" height="75" fill="#d7cba4"/><path d="M0 75 89 21 135 44 212 4 320 64V75Z" fill="#6d9174"/><path d="M0 75 60 40 160 72 258 37 320 75Z" fill="#365b48"/></svg><small>Cover Story</small><h2>Autumn on the Ridge</h2><p>A leisurely walk from the woods to the grassy slopes.</p></article>
<aside aria-label="In Brief"><article><b>Trail Update</b><p>The south slope boardwalk has been repaired.</p></article><article><b>People</b><p>Walk the riverbank with a ranger.</p></article></aside></div>`,
    css:`header{font-family:Georgia,"Songti SC",serif;font-size:25px;font-weight:700;line-height:1.2;border-bottom:3px double var(--forest);padding-bottom:6px;margin-bottom:8px}small{font:650 11px system-ui;color:var(--forest)}
.mag{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:10px}.feature svg{display:block;width:100%;height:72px;margin-bottom:5px}h2,p{margin:0}h2{font-size:19px}aside{border-inline-start:1px solid var(--line);padding-inline-start:9px}aside article{padding:6px 0;border-bottom:1px solid var(--line);font-size:12px}`
  },
  '1.9': {
    note: 'Each card has its own status, title, and details. Opening one leaves the other cards unchanged. A card is a unit of content, not a grid column count.', height:192,
    html:`<div class="cards"><details><summary><small>Easy</small><b>Pine Trail</b><span>2.5 km</span></summary><p>About 1 hour. Water is available at the trailhead.</p></details>
<details><summary><small>Moderate</small><b>Creek Trail</b><span>4 km</span></summary><p>About 2 hours. Watch for slippery sections after rain.</p></details>
<details><summary><small>Challenging</small><b>Overlook Loop</b><span>6 km</span></summary><p>About 3 hours. The loop ends at the trailhead.</p></details></div>`,
    css:`.cards{display:flex;flex-wrap:wrap;align-items:flex-start;gap:8px}details{flex:1 1 85px;min-width:0;padding:8px;background:white;border:1px solid var(--line);border-radius:10px;box-shadow:0 2px 4px #25493a14}summary{cursor:pointer;color:var(--forest)}summary b,summary span{display:block}summary b{font-size:16px}summary span,p{font-size:12px}p{margin:6px 0 0;border-top:1px solid var(--line);padding-top:5px}details[open]{background:var(--tile)}`
  },
  '1.12': {
    note: 'Scroll inside the preview to move the near, middle, and distant layers at different rates. With reduced motion enabled, the layers stay still.', height:225,
    html:`<div class="view" tabindex="0" aria-label="Scroll up and down to compare the speeds of the three mountain layers"><div class="depth"><div class="scene">
  <i class="far"></i><i class="mid"></i><i class="near"></i><span>Far 0.09 · Middle 0.25 · Near 0.47</span>
</div></div></div><small>Scroll inside the scene to see how the peaks move relative to one another.</small>`,
    css:`.view{height:164px;overflow:auto;border:1px solid var(--line)}.depth{height:344px}.scene{position:sticky;top:0;height:162px;overflow:hidden;isolation:isolate;background:#d6e7e0}
.scene i{position:absolute;inset:0;transform:translateY(calc(var(--scroll,0px) * var(--speed)));pointer-events:none}
.far{--speed:-.09;background:#a1bfae;clip-path:polygon(0 84%,23% 45%,43% 64%,66% 28%,100% 74%,100% 160%,0 160%)}
.mid{--speed:-.25;background:#678d75;clip-path:polygon(0 95%,24% 60%,57% 88%,82% 59%,100% 81%,100% 160%,0 160%)}
.near{--speed:-.47;background:#315941;clip-path:polygon(0 97%,17% 82%,51% 100%,75% 77%,100% 96%,100% 170%,0 170%)}
.scene span{position:absolute;top:6px;left:8px;background:white;padding:3px 7px;font-size:11px}small{display:block;margin-top:5px}
@media(prefers-reduced-motion:reduce){.scene i{transform:none}}`,
    js:`const view = document.querySelector('.view');
view.addEventListener('scroll', () => view.style.setProperty('--scroll', view.scrollTop + 'px'), {passive:true});`
  },
  '2.1': {
    note: 'Start with the headline and summary, then scan the story titles down the left. The horizontal sweeps get shorter farther down. The dashed guide illustrates the pattern; it does not predict how everyone reads.', height:222,
    html:`<main class="scan"><header><small>This Week in Brief</small><h2>Three Mountain Hikes for the Weekend</h2><p>Selected for grade, trail conditions, and walking time.</p></header>
<article><b>Pine Trail · Shaded, level trail</b><p>2.5 km, with supplies at the trailhead.</p></article><article><b>Creek Trail · Creekside boardwalk</b><p>4 km. Slippery after rain.</p></article>
</main>`,
    css:`.scan{padding-inline-start:10px;border-inline-start:2px dashed #6d9075}.scan>*{padding:0 0 5px;margin:0 0 7px;border-bottom:1px dashed #6d9075}.scan article:nth-child(2){width:71%}.scan article:nth-child(3){width:56%}
h2,p{margin:.08em 0}h2{font-size:18px;color:var(--forest)}small,p{font-size:12px}`
  },
  '2.2': {
    note: 'The name at top left, badge at top right, pitch at bottom left, and action at bottom right form a Z-shaped reading path. The line illustrates a pattern suited to short promotional pages.', height:197,
    html:`<main class="z"><svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M5 10H95L5 90H95" fill="none" stroke="#8aa28a" stroke-dasharray="5 4" vector-effect="non-scaling-stroke"/></svg>
<b>Mountain Weekend</b><small>Half-Day Picks</small><strong>Take a half-day hike</strong><button>Pick a Trail →</button></main><p role="status"></p>`,
    css:`.z{display:grid;grid-template-columns:1fr auto;grid-template-rows:repeat(2,1fr);align-items:center;gap:14px;position:relative;isolation:isolate;height:132px;padding:8px;background:#e6ede1}.z svg{position:absolute;inset:13px 6px;width:calc(100% - 12px);height:calc(100% - 26px);z-index:-1}.z :is(b,small,strong){justify-self:start;background:#f9faf6;padding:4px 7px}.z small{justify-self:end}.z strong{font-size:clamp(15px,4.6vw,22px)}button{background:var(--forest);color:white}p{margin:5px 0}`,
    js:`document.querySelector('button').onclick = () => { document.querySelector('[role=status]').textContent = 'Our pick: Pine Trail, about 1 hour.'; };`
  },
  '2.3': {
    note: 'In a balanced four-quadrant layout, the top left is the entry point and the bottom right is the finish. Unlike the explicit Z-shaped path, this model describes the relative emphasis of each quadrant as a rule of thumb.', height:181,
    html:`<div class="quadrants"><section><small>Entry Area</small><b>Fall Hike</b></section><section><small>Secondary Area</small><span>Saturday morning</span></section>
<section><small>Secondary Area</small><span>Meet at the East Gate</span></section><section><small>End Area</small><b>08:30 departure</b></section></div>`,
    css:`.quadrants{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:minmax(68px,auto);gap:2px;background:var(--line);border:1px solid var(--line)}section{padding:8px 10px;background:#f5f7ef;display:grid;align-content:center}section:first-child,section:last-child{background:#d5e6d2;color:#264533}section:last-child{text-align:end}small{font-size:11px}b{font-size:clamp(16px,4vw,22px)}`
  },
  '2.4': {
    note: 'Imagery, whitespace, and type are balanced around a central axis. This is symmetry, not a split screen with a separate task on each side.', height:175,
    html:`<div class="seal"><small>Fall Meetup</small><svg aria-hidden="true" viewBox="0 0 300 55"><path d="M150 0v55" stroke="#aab6a8" stroke-dasharray="2 3"/><path d="m26 45 35-25 32 14 26-12 31 23 31-23 26 12 32-14 35 25" fill="none" stroke="#315941" stroke-width="2"/></svg><h2>Annual Trail Gathering</h2><p>October · East Slope Overlook</p></div>`,
    css:`.seal{text-align:center;padding:12px 8px;border:3px double #8aa38b;background:var(--tile);color:#264533}.seal svg{display:block;margin:0 auto;width:min(100%,300px);height:52px}h2,p{margin:0}h2{font-family:Georgia,"Songti SC",serif}`
  },
  '2.5': {
    note: 'The headline overlaps the image in an uneven layout, while the issue number sits off to the other side. The deliberate misalignment reinforces hierarchy; it is not random.', height:206,
    html:`<article class="broken"><div class="slope" aria-hidden="true"></div><small>Field Notes / 07</small><h2>Deep in<br>the Pines</h2><p>The trail curves around a low hill, revealing the first view of the ridge.</p></article>`,
    css:`.broken{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));grid-template-rows:auto 90px auto;padding:8px;isolation:isolate}.slope{grid-area:1 / 4 / 3 / 13;background:linear-gradient(154deg,#abbf9f 43%,#729479 44% 68%,#315941 69%);z-index:-1;margin-top:13px}
small{grid-area:1 / 8 / 2 / 13;justify-self:end;background:white;padding:2px 5px}h2{grid-area:2 / 1 / 3 / 10;justify-self:start;align-self:center;margin:0;background:#f6e7c5;color:#264533;font-size:clamp(29px,7vw,38px);line-height:1;padding:8px 13px}p{grid-area:3 / 3 / 4 / 13;margin:8px 0 0}`
  },
  '3.3': {
    note: 'Open Menu to reveal navigation from the left. Choose a destination, click the backdrop or close button, or press Esc to dismiss it. Unlike a persistent sidebar, it takes up no space when closed.', height:222,
    html:`<header><button id="open" aria-haspopup="dialog" aria-controls="menu">☰ Menu</button> Mountain Guide</header>
<main aria-live="polite"><h2>Trail Overview</h2><p>Three mountain trails for a weekend hike.</p></main>
<dialog id="menu" aria-labelledby="drawer-title"><header><b id="drawer-title">Mountain Guide</b><button id="close" autofocus aria-label="Close menu">×</button></header>
<nav aria-label="Main navigation"><button data-text="Three mountain trails for a weekend hike.">Trail Overview</button><button data-text="Avoid wet stone steps after rain.">Hiking Tips</button><button data-text="Drinking water is available at the Pine Trail trailhead.">Water Stops</button></nav></dialog>`,
    css:`header{display:flex;gap:8px;align-items:center;padding:8px;background:var(--tile)}main{padding:12px;border:1px solid var(--line)}h2,p{margin:.2em 0}button{cursor:pointer}
dialog{margin:0 auto 0 0;border:0;border-right:1px solid var(--line);padding:0;height:100%;max-height:100%;width:min(74vw,246px);max-width:none;background:#f9faf6;color:inherit}dialog::backdrop{background:#172b2170}dialog header{justify-content:space-between}nav{display:grid;gap:5px;padding:10px}nav button{text-align:start;padding:5px 8px}
@media(prefers-reduced-motion:no-preference){dialog[open]{animation:slide-in .23s ease-out}@keyframes slide-in{from{transform:translateX(-100%)}}}`,
    js:`const menu = document.querySelector('dialog');
const open = document.querySelector('#open');
open.onclick = () => menu.showModal();
document.querySelector('#close').onclick = () => menu.close();
menu.addEventListener('click', (event) => {
  if (event.target !== menu) return;
  const {left, top, right, bottom} = menu.getBoundingClientRect();
  if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) menu.close();
});
menu.querySelectorAll('[data-text]').forEach(button => button.onclick = () => {
  document.querySelector('main h2').textContent = button.textContent;
  document.querySelector('main p').textContent = button.dataset.text;
  menu.close();
});
menu.addEventListener('close', () => open.focus());`
  },
  '3.5': {
    note: 'Tabs switch between peer sections on the same page rather than navigating the whole site. Use a click, the Left and Right Arrow keys, or Home and End.', height:172,
    html:`<div role="tablist" aria-label="Trail information">
  <button role="tab" id="tab-info" aria-selected="true" aria-controls="panel-info">Overview</button>
  <button role="tab" id="tab-plan" aria-selected="false" aria-controls="panel-plan" tabindex="-1">Route</button>
  <button role="tab" id="tab-kit" aria-selected="false" aria-controls="panel-kit" tabindex="-1">Gear</button>
</div>
<section role="tabpanel" id="panel-info" aria-labelledby="tab-info" tabindex="0"><b>Pine Trail · Beginner-friendly</b><p>2.5 km, about 1 hour.</p></section>
<section role="tabpanel" id="panel-plan" aria-labelledby="tab-plan" tabindex="0" hidden><b>Trailhead → Pine Grove → Lookout Shelter</b><p>Return the same way to avoid steep slopes.</p></section>
<section role="tabpanel" id="panel-kit" aria-labelledby="tab-kit" tabindex="0" hidden><b>Pack Light</b><p>Bring water, a hat, and shoes with good grip.</p></section>`,
    css:`[role=tablist]{display:flex;border-bottom:1px solid var(--line)}[role=tab]{border:0;border-bottom:3px solid transparent;background:transparent;padding:8px 13px;color:inherit;cursor:pointer;font:inherit}[aria-selected=true]{color:var(--forest);border-bottom-color:var(--forest);font-weight:700}section{padding:12px;background:var(--tile)}p{margin:.25em 0}`,
    js:`const tabs = [...document.querySelectorAll('[role=tab]')];
function activate(index, focus = false) {
  tabs.forEach((tab, i) => {
    tab.setAttribute('aria-selected', i === index);
    tab.tabIndex = i === index ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = i !== index;
  });
  if (focus) tabs[index].focus();
}
tabs.forEach((tab, index) => {
  tab.onclick = () => activate(index);
  tab.onkeydown = (event) => {
    const target = {ArrowLeft:(index + tabs.length - 1) % tabs.length, ArrowRight:(index + 1) % tabs.length, Home:0, End:tabs.length - 1}[event.key];
    if (target === undefined) return;
    event.preventDefault(); activate(target, true);
  };
});`
  },
  '3.6': {
    note: 'Click anywhere on a row to open a settings page, then go back to the list. Unlike a sidebar, the list is the main view rather than a persistent column beside it.', height:194,
    html:`<nav aria-label="Trail Settings"><b>Trail Settings</b>
<button data-desc="Trail distances are shown in kilometers."><span aria-hidden="true">◈</span> Distance Units <i aria-hidden="true">›</i></button>
<button data-desc="Alerts are on for trail closures only."><span aria-hidden="true">◇</span> Safety Alerts <i aria-hidden="true">›</i></button>
<button data-desc="Recently saved: Pine Trail."><span aria-hidden="true">▤</span> Saved Trails <i aria-hidden="true">›</i></button></nav>
<section hidden><button id="back">← Back to Settings</button><h2 tabindex="-1"></h2><p></p></section>`,
    css:`nav{border:1px solid var(--line);background:white}nav b{display:block;padding:8px;background:var(--tile)}nav button{width:100%;display:grid;grid-template-columns:1em 1fr auto;align-items:center;gap:8px;padding:8px;font:inherit;color:inherit;text-align:start;border:0;border-top:1px solid var(--line);background:white;cursor:pointer}nav button:hover{background:#f2f6ed}section{padding:10px;background:var(--tile)}h2,p{margin:.3em 0}h2{font-size:19px}`,
    js:`const list = document.querySelector('nav');
const detail = document.querySelector('section');
let last;
list.querySelectorAll('button').forEach(button => button.onclick = () => {
  last = button;
  detail.querySelector('h2').textContent = button.childNodes[1].textContent.trim();
  detail.querySelector('p').textContent = button.dataset.desc;
  list.hidden = true; detail.hidden = false; detail.querySelector('h2').focus();
});
document.querySelector('#back').onclick = () => { detail.hidden = true; list.hidden = false; last.focus(); };`
  },
  '3.7': {
    note: 'Nine destinations of equal priority sit in a three-by-three grid. Select an icon to see what it opens. This is a launcher, not a dashboard for metrics.', height:247,
    html:`<nav aria-label="Mountain guide shortcuts"><button data-status="Pine Trail · Creek Trail · Overlook Loop"><span aria-hidden="true">△</span>Trails</button><button data-status="The East Gate is at the foot of the mountain."><span aria-hidden="true">▧</span>Map</button><button data-status="Sample forecast: sunny, 19 °C."><span aria-hidden="true">☀</span>Weather</button>
<button data-status="Water is available at the Pine Trail trailhead."><span aria-hidden="true">◇</span>Supplies</button><button data-status="Saved to favorites: Pine Trail."><span aria-hidden="true">☆</span>Favorites</button><button data-status="One trail closure alert today."><span aria-hidden="true">!</span>Alerts</button>
<button data-status="Sample activity: 4 km hiked last week."><span aria-hidden="true">▥</span>Activity</button><button data-status="Wear shoes with good grip."><span aria-hidden="true">▣</span>Gear</button><button data-status="Use caution on stone steps after rain."><span aria-hidden="true">◎</span>Guide</button></nav>
<p role="status">Choose a shortcut</p>`,
    css:`nav{max-width:480px;margin:auto;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px}button{display:grid;justify-items:center;gap:1px;border:1px solid var(--line);background:white;color:var(--forest);border-radius:6px;padding:5px;font:inherit;cursor:pointer}button span{font-weight:700;font-size:18px;line-height:1.1}button:hover{background:var(--tile)}p{margin:6px 0;text-align:center}`,
    js:`document.querySelectorAll('[data-status]').forEach(button => button.onclick = () => {
  document.querySelector('[role=status]').textContent = button.dataset.status;
});`
  },
  '3.8': {
    note: 'Click to open the command palette, or press Ctrl/⌘ + K while the preview has focus. Type “trail” to filter. Use Up and Down to select a command, Enter to run it, or Esc to close the palette.', height:255,
    html:`<button id="open" aria-haspopup="dialog">Open Command Palette <kbd>Ctrl / ⌘ + K</kbd></button><p role="status">No command run yet.</p>
<dialog aria-labelledby="search-label"><label id="search-label" for="command">Search commands</label><input id="command" type="search" placeholder="e.g., trail" autocomplete="off">
<div class="choices"><button data-result="Opened Pine Trail.">Open Pine Trail</button><button data-result="Opened Creek Trail.">Open Creek Trail</button><button data-result="Showing hiking tips.">Show Hiking Tips</button></div><p id="empty" hidden>No matching commands</p></dialog>`,
    css:`button,input{font:inherit}button{cursor:pointer}kbd{margin-left:5px;color:#355746}dialog{width:min(calc(100% - 24px),420px);margin:12px auto auto;padding:10px;background:#f9faf6;border:1px solid var(--line);border-radius:8px;color:inherit}dialog::backdrop{background:#152d227d}label{font-weight:700}input{display:block;width:100%;min-width:0;margin:5px 0;padding:4px 6px} .choices button{display:block;text-align:start;width:100%;padding:4px 7px;background:white;border:1px solid var(--line);margin:2px 0;color:inherit}.choices button.current{background:#d3e6ce}.choices button[hidden]{display:none}p{margin:.5em 0}`,
    js:`const dialog = document.querySelector('dialog');
const input = dialog.querySelector('input');
const choices = [...dialog.querySelectorAll('button')];
let selected = 0;
const visible = () => choices.filter(button => !button.hidden);
function mark() { visible().forEach((button,i) => button.classList.toggle('current', i === selected)); }
function filter() {
  choices.forEach(button => button.hidden = !button.textContent.toLowerCase().includes(input.value.trim().toLowerCase()));
  document.querySelector('#empty').hidden = visible().length !== 0;
  selected = 0; mark();
}
function run(button) {
  if (!button) return;
  document.querySelector('[role=status]').textContent = button.dataset.result; dialog.close();
}
function open() { if (dialog.open) return; input.value = ''; filter(); dialog.showModal(); input.focus(); }
document.querySelector('#open').onclick = open;
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); open(); }
});
input.oninput = filter;
input.onkeydown = event => {
  if (event.isComposing) return;
  const count = visible().length;
  if (event.key === 'Enter') { event.preventDefault(); run(visible()[selected]); }
  if (count && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
    event.preventDefault(); selected = (selected + (event.key === 'ArrowDown' ? 1 : -1) + count) % count; mark();
  }
};
choices.forEach(button => button.onclick = () => run(button));`
  },
  '3.9': {
    note: 'Select any ancestor in the breadcrumb to go back up, then use the button below to go deeper. The final crumb marks the current location, not browsing history or progress.', height:194,
    html:`<nav aria-label="Current location"><ol></ol></nav><main><h2 aria-live="polite"></h2><p></p><button></button></main>`,
    css:`ol{display:flex;align-items:center;flex-wrap:wrap;gap:3px 8px;list-style:none;padding:8px;margin:0;background:var(--tile)}li+li::before{content:'›';margin-right:8px;color:#617567}ol button{border:0;padding:0;background:transparent;color:var(--forest);text-decoration:underline;font:inherit;cursor:pointer}[aria-current=page]{font-weight:700}main{padding:10px;border:1px solid var(--line)}h2,p{margin:.12em 0 .35em}h2{font-size:19px}`,
    js:`const pages = [['Trail Library','Browse trails by terrain.'],['Mountain Routes','Choose a mountain trail to see its details.'],['Pine Trail','2.5 km · gentle forest trail']];
const path = document.querySelector('ol');
const next = document.querySelector('main button');
function show(depth, focus = false) {
  path.replaceChildren(...pages.slice(0, depth + 1).map(([name], index) => {
    const item = document.createElement('li');
    if (index === depth) { const current = document.createElement('span'); current.setAttribute('aria-current','page'); current.textContent = name; item.append(current); }
    else { const button = document.createElement('button'); button.textContent = name; button.onclick = () => show(index, true); item.append(button); }
    return item;
  }));
  const heading = document.querySelector('h2');
  heading.textContent = pages[depth][0];
  heading.tabIndex = -1;
  document.querySelector('p').textContent = pages[depth][1];
  next.hidden = depth === pages.length - 1;
  next.textContent = next.hidden ? '' : 'Open ' + pages[depth + 1][0];
  next.onclick = () => show(depth + 1, true);
  if (focus) heading.focus();
}
show(2);`
  },
  '4.1': {
    note: 'The eyebrow, headline, supporting copy, and action share a center axis. The technique is about alignment within the hero, not filling the entire screen.', height:211,
    html:`<main class="hero"><small>Weekend Guide / Half-Day Hikes</small><h1>Spend the Weekend Outdoors</h1><p>Pick one of three handpicked trails and head out today.</p><button>See Our Pick</button><output aria-live="polite"></output></main>`,
    css:`.hero{min-height:178px;display:grid;align-content:center;justify-items:center;text-align:center;padding:14px;background:radial-gradient(ellipse at top,#f8f8ed,#dce9d8);border:1px solid var(--line);color:#254331}h1,p{margin:.1em 0}h1{font-size:clamp(22px,6vw,39px)}button{padding:5px 13px;margin:8px 0 0;color:white;background:var(--forest);border:0;border-radius:4px;cursor:pointer}output{display:block;min-height:17px;font-size:12px}`,
    js:`document.querySelector('button').onclick = () => { document.querySelector('output').textContent = 'Suggested starting point: Pine Trail at the East Gate.'; };`
  },
  '4.3': {
    note: 'Three sections guide the reader from what it is, to why it matters, to what to do next. Unlike a general single-page layout, each section has a deliberate role and order.', height:278,
    html:`<main><section class="intro"><small>01 / Introduction</small><h2>Half a Day in the Mountains</h2><p>Mountain Guide helps first-time hikers get started.</p></section>
<section class="features"><small>02 / Benefits</small><ul><li>Clearly marked difficulty</li><li>Water stops along the way</li><li>Safety tips for wet trails</li></ul></section>
<section class="action"><small>03 / Action</small><button>Build a Half-Day Itinerary</button><output aria-live="polite"></output></section></main>`,
    css:`section{padding:7px 12px;margin:0 0 4px}.intro{background:#d6e6d5}.features{background:white;border:1px solid var(--line)}.action{background:#315941;color:white}.features ul{display:flex;flex-wrap:wrap;list-style:none;gap:3px 8px;padding:0}.features li{border-left:2px solid #8ea991;padding-left:5px}h2,p,ul{margin:.12em 0}small{display:block}button{margin:3px 0;cursor:pointer}output{display:block;min-height:18px;font-size:12px}`,
    js:`document.querySelector('button').onclick = () => { document.querySelector('output').textContent = 'Itinerary ready: Leave the East Gate at 09:00 for an out-and-back hike on Pine Trail.'; };`
  },
  '4.4': {
    note: 'Prices, benefits, and selection buttons line up across plans, with the middle tier highlighted. Changing the billing cycle updates all prices together for easy comparison.', height:262,
    html:`<fieldset><legend>Billing cycle</legend><label><input type="radio" name="billing" value="month" checked> Monthly</label><label><input type="radio" name="billing" value="year"> Yearly</label></fieldset>
<div class="plans"><article><h3>Basic</h3><strong data-month="0" data-year="0">¥0/mo</strong><p>Offline trail guides</p><button>Choose Basic</button></article><article class="chosen"><h3>Explore <small>Recommended</small></h3><strong data-month="19" data-year="190">¥19/mo</strong><p>Weather alerts</p><button>Choose Explore</button></article><article><h3>Team</h3><strong data-month="49" data-year="490">¥49/mo</strong><p>Shared itineraries</p><button>Choose Team</button></article></div><p role="status">Demo only. No subscription will be created.</p>`,
    css:`fieldset{border:0;padding:0;margin:0 0 8px}legend{font-weight:700}.plans{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px}.plans article{padding:7px 5px;text-align:center;background:white;border:1px solid var(--line);border-radius:6px}.plans .chosen{background:#e0eedb;border-color:var(--forest)}h3,p{margin:.1em 0 .35em}h3{font-size:14px;min-height:2.9em}h3 small{display:inline-block;background:var(--forest);color:white;padding:0 3px;border-radius:3px;font-size:10px}.plans strong{font-size:clamp(12px,3vw,21px)}button{font:inherit;cursor:pointer}[role=status]{margin-top:6px;font-size:12px}`,
    js:`const prices = [...document.querySelectorAll('[data-month]')];
const status = document.querySelector('[role=status]');
document.querySelector('fieldset').onchange = (event) => {
  const period = event.target.value;
  prices.forEach(price => price.textContent = '¥' + price.dataset[period] + (period === 'year' ? '/yr' : '/mo'));
  status.textContent = 'Demo only. No subscription will be created.';
};
document.querySelectorAll('.plans button').forEach((button, index) => button.onclick = () => {
  status.textContent = button.textContent + ' · ' + prices[index].textContent + ' (demo only)';
});`
  },
  '4.5': {
    note: 'A thumbnail grid showcases selected work. Open a project to see the problem, the process, and the result. The emphasis is on telling each project story, not just expanding a generic card.', height:229,
    html:`<section id="gallery"><b>Mountain Design Projects</b><div class="gallery">
<button data-project="0"><i class="map" aria-hidden="true"></i>Pine Trail Map</button><button data-project="1"><i class="sign" aria-hidden="true"></i>Creek Trail Signs</button><button data-project="2"><i class="guide" aria-hidden="true"></i>Weekend Trail Booklet</button></div></section>
<article hidden><button id="back">← All Case Studies</button><h2 tabindex="-1"></h2><p></p></article>`,
    css:`.gallery{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin-top:7px}.gallery button{display:grid;gap:4px;align-content:start;border:1px solid var(--line);border-radius:6px;background:white;color:var(--forest);padding:5px;font:inherit;cursor:pointer}.gallery i{display:block;height:77px}.map{background:repeating-linear-gradient(24deg,#bbd2b4 0 10px,#4b785d 11px 13px,#dce8d4 14px 24px)}.sign{background:linear-gradient(145deg,#dbe5e4 37%,#41656b 38% 61%,#c0d5d8 62%)}.guide{background:linear-gradient(90deg,#a88f5a 13%,#e6d4a6 14% 59%,#f2e5c7 60%)}article{padding:10px;background:var(--tile)}h2,p{margin:.3em 0}`,
    js:`const projects = [['Pine Trail Map','Problem: The trailhead was hard to find. Process: Redrew the trail and landmarks. Result: One map connects all three junctions.'],['Creek Trail Signs','Problem: Signs were hard to read in rain and fog. Process: Tested high-contrast arrows. Result: Consistent direction and distance labels.'],['Weekend Trail Booklet','Problem: Gear advice was scattered. Process: Organized it by stage of the trip. Result: A single pocket checklist.']];
const gallery = document.querySelector('#gallery');
const detail = document.querySelector('article');
let previous;
gallery.querySelectorAll('button').forEach(button => button.onclick = () => {
  const [name, description] = projects[Number(button.dataset.project)];
  detail.querySelector('h2').textContent = name; detail.querySelector('p').textContent = description;
  previous = button; gallery.hidden = true; detail.hidden = false; detail.querySelector('h2').focus();
});
document.querySelector('#back').onclick = () => { gallery.hidden = false; detail.hidden = true; previous.focus(); };`
  },
  '5.1': {
    note: 'A narrow, centered column and generous line spacing make the text easier to follow. The space on either side is whitespace, not sidebars. Unlike F-pattern search results, this layout is for sustained reading rather than scanning.', height:263,
    html:`<article><header><small>Trail Journal · 4-minute read</small><h1>Pine Trail After the Rain</h1><p>Field Notes Editors · October</p></header>
<p>The boardwalk bends through the woods. The rain has just stopped. Drops fall from the pine needles onto your shoes, then vanish into the dark grain of the boards.</p>
<p>At the first fork, take the gentle path to the lookout shelter before heading uphill. From there, you can watch the mist lift off the mountainside.</p></article>`,
    css:`article{max-width:34em;margin:auto;padding-inline:clamp(4px,2vw,14px);line-height:1.6}header{border-bottom:1px solid var(--line);padding:2px 0 6px;color:var(--forest);margin-bottom:8px}h1{margin:0;font-family:Georgia,"Songti SC",serif;font-size:26px}p{margin:5px 0 10px}header p{font-size:12px;margin:0}`
  },
  '5.3': {
    note: 'The section index sits on the left, the article in the center, and separate tools on the right. In a narrow container, the article gets its own row between the two supporting sections.', height:269,
    html:`<div class="three"><aside class="index"><b>Sections</b><ul><li>Trail Guide</li><li>Hiking Journal</li><li>Gear Talk</li></ul></aside>
<article><small>Hiking Journal / Discussion</small><h2>The Fork on Pine Trail</h2><p>Past the first wooden bridge, the left fork climbs gently and the right leads to the lookout shelter. Both rejoin the main trail.</p></article>
<aside class="tools"><b>Planning Tools</b><details><summary>Safety Checklist</summary><small>Drinking water · Shoes with good grip · Offline map</small></details></aside></div>`,
    css:`.three{display:grid;grid-template-areas:"index article tools";grid-template-columns:minmax(0,1fr) minmax(0,2.2fr) minmax(0,1fr);gap:7px}aside,article{min-width:0;padding:8px;background:var(--tile)}article{grid-area:article;background:white;border:1px solid var(--line)}.index{grid-area:index}.tools{grid-area:tools}h2,p,ul{margin:.25em 0}h2{font-size:19px}ul{padding-inline-start:1.2em}details{margin-top:5px}
@media(max-width:360px){.three{grid-template:"index" auto "article" auto "tools" auto / 1fr}.index ul{display:flex;gap:4px 8px;flex-wrap:wrap;list-style:none;padding:0}.tools{display:flex;align-items:start;gap:8px}.tools details{margin:0}}`
  },
  '5.4': {
    note: 'The main image and thumbnails form one group; product options and purchase controls form another. Switch views, choose a size, or add an item to the local demo cart.', height:356,
    html:`<main class="product"><section aria-label="Product images"><div class="picture" data-view="front" role="img" aria-label="Front view of the water bottle"><i></i></div><div class="thumbs" role="group" aria-label="Choose a product view"><button aria-pressed="true" data-view="front">Front</button><button aria-pressed="false" data-view="side">Side</button></div></section>
<section><small>Hiking Gear</small><h1>Lightweight Water Bottle</h1><strong id="price">¥69</strong><label>Capacity <select><option value="69">500 mL</option><option value="89">750 mL</option></select></label><button id="add">Add to Cart</button><p role="status">Cart: 0</p></section></main>`,
    css:`.product{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}.picture{height:168px;background:#e2eadc;display:grid;place-items:center}.picture i{position:relative;width:54px;height:105px;border-radius:15px 15px 12px 12px;background:linear-gradient(90deg,#436d52,#83af8f 69%,#477a57);border:1px solid #315941}.picture i::before{content:"";position:absolute;width:28px;height:12px;top:-12px;left:50%;transform:translateX(-50%);background:#293a30;border-radius:4px 4px 0 0}.picture[data-view=side]{background:#dfebec}.picture[data-view=side] i{width:42px;transform:rotate(14deg);background:linear-gradient(90deg,#436069,#7ba0ac 69%,#36565e)}.thumbs{display:flex;gap:6px;margin-top:5px}button[aria-pressed=true],#add{background:var(--forest);color:white}h1,p{margin:.1em 0}h1{font-size:21px}label{display:block;margin:6px 0}strong{font-size:19px}button,select{font:inherit}p{font-size:12px;margin-top:5px}
@media(max-width:360px){.product{grid-template-columns:1fr}.picture{height:120px}.picture i{height:76px}}`,
    js:`const picture = document.querySelector('.picture');
const thumbnails = [...document.querySelectorAll('.thumbs button')];
const size = document.querySelector('select');
let count = 0;
thumbnails.forEach(button => button.onclick = () => {
  picture.dataset.view = button.dataset.view;
  picture.setAttribute('aria-label', button.textContent + ' view of the water bottle');
  thumbnails.forEach(item => item.setAttribute('aria-pressed', item === button));
});
size.onchange = () => { document.querySelector('#price').textContent = '¥' + size.value; };
document.querySelector('#add').onclick = () => { document.querySelector('[role=status]').textContent = 'Added: ' + size.selectedOptions[0].text + ' · Cart: ' + ++count; };`
  },
  '5.5': {
    note: 'Keyword search and difficulty filters work together, while results retain an F-shaped scanning pattern. The focus is on searching, filtering, and feedback, not just arranging headings.', height:261,
    html:`<div class="filters"><label>Trail keywords <input type="search" placeholder="e.g., pine"></label><label>Difficulty <select><option value="">All</option><option>Easy</option><option>Moderate</option><option>Challenging</option></select></label></div>
<p role="status">Results: 3</p><ul><li data-level="Easy"><b>Pine Trail</b><small>Easy · Gentle forest trail · 2.5 km</small></li><li data-level="Moderate"><b>Creek Trail</b><small>Moderate · Creekside boardwalk · 4 km</small></li><li data-level="Challenging"><b>Overlook Loop</b><small>Challenging · Ridge loop · 6 km</small></li></ul>`,
    css:`.filters{display:flex;flex-wrap:wrap;gap:6px 10px;background:var(--tile);padding:6px}.filters label{display:flex;align-items:center;gap:5px;font-size:12px}input,select{font:inherit;min-width:0}input{width:8em}ul,p{margin:4px 0;padding:0}ul{list-style:none}li{padding:5px 6px;border-bottom:1px solid var(--line)}li small{display:block}li b{color:var(--forest)}[role=status]{font-size:12px}`,
    js:`const input = document.querySelector('input');
const difficulty = document.querySelector('select');
const results = [...document.querySelectorAll('li')];
function filter() {
  const term = input.value.trim().toLowerCase();
  results.forEach(item => { item.hidden = !item.textContent.toLowerCase().includes(term) || Boolean(difficulty.value && item.dataset.level !== difficulty.value); });
  const count = results.filter(item => !item.hidden).length;
  document.querySelector('[role=status]').textContent = count ? 'Results: ' + count : 'No matches. Try clearing the search or difficulty filter.';
}
input.oninput = difficulty.onchange = filter;`
  },
  '5.6': {
    note: 'Start with why the team exists, then use a team grid and concrete numbers to support the mission. This is not a feature list or a project portfolio.', height:278,
    html:`<header><small>About Us</small><h2>Good Trails, Clearly Mapped</h2><p>We started with a hand-drawn map to help first-time hikers head out with confidence.</p></header>
<div class="team" aria-label="Team members"><article><i aria-hidden="true">LZ</i><b>Lin Zhi</b><small>Trail Surveying</small></article><article><i aria-hidden="true">YN</i><b>Yue Ning</b><small>Visual Design</small></article><article><i aria-hidden="true">JY</i><b>Jiang Yao</b><small>Editing</small></article></div>
<footer><b>3 years</b> maintaining trails <span aria-hidden="true">·</span> <b>24</b> field checks</footer>`,
    css:`header{background:#dfe9d9;padding:9px 10px}.team{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin:6px 0}article{display:grid;justify-items:center;gap:1px;text-align:center;border:1px solid var(--line);padding:7px 3px;background:white}article i{display:grid;place-items:center;width:29px;height:29px;border-radius:50%;background:#cbdcc7;color:#294834;font-style:normal}h2,p{margin:.1em 0}h2{font-size:21px}footer{text-align:center;padding:5px;border-block:1px solid var(--line)}`
  },
  '5.7': {
    note: 'Contact details and the form offer two clear ways to get in touch. Enter sample data to try the browser’s required-field and email validation. Nothing is sent or saved.', height:375,
    html:`<main><aside><h2>Contact the Trail Team</h2><p>Send trail corrections, partnership inquiries, or safety suggestions.</p><p>Address: Visitor Center at the trailhead</p><small>Monday to Friday · 09:00–17:00</small></aside>
<form><label>Email <input type="email" name="email" required placeholder="e.g., a@example.org"></label><label>Message <textarea name="message" required rows="2"></textarea></label><button>Submit Demo</button><p role="status"></p></form></main>`,
    css:`main{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:8px}aside,form{padding:9px}aside{background:var(--tile)}form{background:white;border:1px solid var(--line)}h2,p{margin:.15em 0 .45em}h2{font-size:18px}label{display:grid;gap:3px;margin-bottom:6px}input,textarea,button{font:inherit;min-width:0}textarea{resize:vertical}[role=status]{font-size:12px;min-height:1.3em;margin-top:5px}
@media(max-width:360px){main{grid-template-columns:1fr}}`,
    js:`const form = document.querySelector('form');
const status = document.querySelector('[role=status]');
form.oninput = () => { status.textContent = ''; };
form.onsubmit = event => {
  event.preventDefault();
  status.textContent = 'Form validated. This demo did not send anything.'; form.reset();
};`
  },
  '6.1': {
    note: 'A row of key metrics comes first, followed by charts that show trends and distribution. Changing the period updates both the numbers and the bars. Unlike a shortcut grid, this dashboard helps readers assess conditions.', height:255,
    html:`<header><b>Trail Operations Overview</b><label>Period <select><option value="0">This Week</option><option value="1">Last Week</option></select></label></header>
<div class="metrics" aria-live="polite"><div>Visits<b>1,240</b></div><div>Completed Hikes<b>860</b></div><div>Alerts<b>3</b></div></div>
<div class="charts"><figure><figcaption>Visits by Part of Week</figcaption><div class="bars"><div>Early week <meter max="700" value="320" aria-label="Visits early in the week"></meter></div><div>Midweek <meter max="700" value="410" aria-label="Midweek visits"></meter></div><div>Weekend <meter max="700" value="510" aria-label="Weekend visits"></meter></div></div></figure><figure class="completion"><figcaption>Completion Rate</figcaption><output>69%</output></figure></div>`,
    css:`header{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:4px;margin-bottom:6px}.metrics,.charts{display:grid;gap:5px}.metrics{grid-template-columns:repeat(3,minmax(0,1fr));margin-bottom:5px}.charts{grid-template-columns:minmax(0,2fr) minmax(0,1fr)}.metrics div,figure{border:1px solid var(--line);padding:6px 8px;background:var(--tile);margin:0}.metrics b,output{display:block;font-size:20px;color:var(--forest)}figure{background:white}.bars div{display:grid;grid-template-columns:2.5em 1fr;align-items:center;gap:4px;font-size:12px}meter{width:100%;min-width:0}.completion output{font-size:clamp(21px,5vw,29px);font-weight:700}`,
    js:`const data = [[['1,240','860','3'],[320,410,510],'69%'],[['1,086','728','5'],[290,366,430],'67%']];
document.querySelector('select').onchange = event => {
  const [metrics, counts, percentage] = data[Number(event.target.value)];
  document.querySelectorAll('.metrics b').forEach((node,i) => node.textContent = metrics[i]);
  document.querySelectorAll('meter').forEach((meter,i) => meter.value = counts[i]);
  document.querySelector('output').textContent = percentage;
};`
  },
  '6.2': {
    note: 'A central schematic anchors monitoring metrics on a dark, high-contrast display designed to be read from a distance. Refreshing cycles through fixed local samples; there is no live data connection.', height:320,
    html:`<main class="screen"><header><span>Trail Monitoring Center</span><button>Refresh Sample Data</button></header>
<div class="telemetry"><section><b>Visitors</b><strong id="readers">1,240</strong><small>Across all three trails</small></section>
<figure><svg viewBox="0 0 240 102" role="img" aria-label="Map showing three active monitoring stations"><path d="M5 81 50 33 85 59 144 17 175 38 208 23 237 55M16 94l38-40 36 20 57-43 29 21 31-14 23 27" fill="none" stroke="#356b79" stroke-width="2"/><path d="M48 66 95 42 138 64 194 45" fill="none" stroke="#71d9c9" stroke-width="2" stroke-dasharray="4 3"/><g fill="#89fff0" stroke="#102e39" stroke-width="2"><circle cx="48" cy="66" r="5"/><circle cx="95" cy="42" r="5"/><circle cx="194" cy="45" r="5"/></g></svg><figcaption>Trail Network / Monitoring Stations</figcaption></figure>
<section><b>Trail Alerts</b><strong id="warnings">3</strong><small>Check conditions on Creek Trail</small></section></div><footer role="status">Local Sample · Batch 01</footer></main>`,
    css:`body{background:#102b36;color:#e3faef}.screen{min-height:calc(100vh - 20px);padding:8px;display:flow-root;background:linear-gradient(135deg,#11222d,#153e48);border:1px solid #538c90}header{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:4px;margin-bottom:8px;font-weight:700}button{background:#1d4650;border:1px solid #76bdbb;color:white;font:inherit;cursor:pointer}.telemetry{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr) minmax(0,1fr);gap:6px}.telemetry>*{border:1px solid #4f8792;padding:5px;margin:0}.telemetry section{display:grid;align-content:center}.telemetry strong{font-size:clamp(16px,4vw,27px);color:#89fff0}small,figcaption,footer{font-size:11px}svg{display:block;width:100%;height:105px}footer{margin-top:7px}
@media(max-width:360px){.telemetry{grid-template-columns:repeat(2,minmax(0,1fr))}.telemetry figure{grid-area:2 / 1 / 3 / 3}}`,
    js:`const samples = [['1,240',3],['1,248',2],['1,261',4]];
let batch = 0;
document.querySelector('button').onclick = () => {
  batch = (batch + 1) % samples.length;
  document.querySelector('#readers').textContent = samples[batch][0];
  document.querySelector('#warnings').textContent = samples[batch][1];
  document.querySelector('footer').textContent = 'Local Sample · Batch 0' + (batch + 1);
};`
  },
  '6.3': {
    note: 'The top bar holds global identity and controls, the sidebar switches modules, and the main area offers records you can act on rather than just metrics. Switch modules, collapse navigation, or change a record status.', height:285,
    html:`<div class="admin"><header><button id="toggle" aria-expanded="true" aria-controls="admin-nav">☰ Menu</button><b>Trail Records</b><small>Duty Officer</small></header>
<div class="shell"><nav id="admin-nav" aria-label="Admin modules"><button data-mode="paths" aria-current="page">Manage Trails</button><button data-mode="stations">Manage Water Stops</button></nav>
<main><h2>Manage Trails</h2><table><thead><tr><th scope="col">Name</th><th scope="col">Status</th><th scope="col">Action</th></tr></thead><tbody></tbody></table><p role="status"></p></main></div></div>`,
    css:`header{display:flex;align-items:center;gap:6px;padding:6px 8px;background:#315941;color:white}header small{margin-inline-start:auto}.shell{display:flex;gap:6px}.shell nav{flex:0 0 auto;background:var(--tile);padding:4px}.shell nav button{display:block;width:100%;margin-bottom:3px}button{font:inherit;cursor:pointer}button[aria-current]{background:#d0e3cf;font-weight:700}main{min-width:0;flex:1;background:white;padding:6px;border:1px solid var(--line)}h2,p{margin:.2em 0}h2{font-size:17px}table{border-collapse:collapse;width:100%;font-size:12px}th,td{padding:4px 3px;text-align:start;border-bottom:1px solid var(--line)}[role=status]{font-size:12px}`,
    js:`const data = {paths:[['Pine Trail',true],['Creek Trail',true]],stations:[['East Gate Water Stop',true],['Lookout Shelter Water Stop',false]]};
const nav = document.querySelector('nav');
const toggle = document.querySelector('#toggle');
const tbody = document.querySelector('tbody');
const status = document.querySelector('[role=status]');
toggle.onclick = () => { nav.hidden = !nav.hidden; toggle.setAttribute('aria-expanded', !nav.hidden); };
function render(mode, activeIndex) {
  const rows = data[mode].map(([name, live], index) => {
    const row = document.createElement('tr');
    row.insertCell().textContent = name; row.insertCell().textContent = live ? 'Open' : 'Closed';
    const change = document.createElement('button'); change.textContent = live ? 'Close' : 'Open';
    change.setAttribute('aria-label', change.textContent + name);
    change.onclick = () => { data[mode][index][1] = !live; render(mode, index); status.textContent = name + (live ? ' is now closed.' : ' is now open.'); };
    row.insertCell().append(change);
    return row;
  });
  tbody.replaceChildren(...rows);
  if (activeIndex !== undefined) rows[activeIndex].querySelector('button').focus();
}
const modules = [...nav.querySelectorAll('button')];
modules.forEach(button => button.onclick = () => {
  modules.forEach(item => item === button ? item.setAttribute('aria-current','page') : item.removeAttribute('aria-current'));
  document.querySelector('h2').textContent = button.textContent; status.textContent = ''; render(button.dataset.mode);
});
render('paths');`
  },
  '7.2': {
    note: 'Mobile-first is an order of priorities, not a layout rule. The small screen starts with the trail and its main action. Wider screens add supporting information. Compare narrow and wide previews: the base styles work without media queries.', height:190,
    html:`<main class="mobile"><section><small>Core Task</small><h2>Find a Trail to Hike</h2><p>Pine Trail · 2.5 km · about 1 hour</p><details><summary>Show Trailhead</summary><p>Start at the East Gate and follow the Pine Trail signs.</p></details></section><aside><b>Extra Details on Wide Screens</b><p>Similar hike: Creek Trail</p><p>Drinking water is available at supply stops.</p></aside></main>`,
    css:`.mobile{display:grid;gap:8px}.mobile section,.mobile aside{padding:10px;background:var(--tile)}.mobile aside{display:none;background:white;border:1px solid var(--line)}h2,p{margin:.15em 0 .4em}h2{font-size:20px}summary{cursor:pointer;color:var(--forest)}
@media(min-width:361px){.mobile{grid-template-columns:minmax(0,2fr) minmax(0,1fr)}.mobile aside{display:block}}`
  },
  '7.3': {
    note: 'At preview widths of 361px and 600px, the same four items reflow from one column to two and then four. These values demonstrate breakpoints; they are not universal device sizes.', height:246,
    html:`<div class="state" aria-live="polite"><output id="width"></output><span class="small">≤ 360px · 1 column</span><span class="medium">361–599px · 2 columns</span><span class="large">≥ 600px · 4 columns</span></div>
<div class="tracks"><div>01 Pine Trail</div><div>02 Creek Trail</div><div>03 Overlook Loop</div><div>04 Waterside Trail</div></div>`,
    css:`.state{display:flex;flex-wrap:wrap;gap:3px 8px;margin-bottom:8px;padding:7px;background:#315941;color:white}.state span{font-weight:700}.medium,.large{display:none}.tracks{display:grid;grid-template-columns:minmax(0,1fr);gap:6px}.tracks div{padding:9px 7px;background:var(--tile);border:1px solid var(--line)}
@media(min-width:361px){.tracks{grid-template-columns:repeat(2,minmax(0,1fr))}.small{display:none}.medium{display:inline}}
@media(min-width:600px){.tracks{grid-template-columns:repeat(4,minmax(0,1fr))}.medium{display:none}.large{display:inline}}`,
    js:`const width = document.querySelector('#width');
function measure() { width.textContent = 'Viewport: ' + innerWidth + 'px'; }
addEventListener('resize', measure); measure();`
  },
  '7.4': {
    note: 'Drag the slider to compare two approaches at the same viewport width. The top row jumps among fixed widths of 168, 252, and 342px. The bottom row changes width continuously. Real layouts can combine fluid sizing and breakpoints.', height:246,
    html:`<label>Simulated container width <input type="range" min="185" max="425" value="280" aria-label="Simulated container width"> <output></output></label>
<section class="sample"><div class="adaptive" data-size="medium"><b>Adaptive</b><span>Pine Trail</span><span>Creek Trail</span><span>Overlook Loop</span></div><div class="responsive"><b>Responsive</b><span>Pine Trail</span><span>Creek Trail</span><span>Overlook Loop</span></div></section>`,
    css:`label{display:flex;align-items:center;flex-wrap:wrap;gap:3px 7px;margin-bottom:8px}input{max-width:40%}.sample{width:280px;max-width:100%;padding:6px;border:1px dashed #7b9680;background:white}.sample div{display:grid;background:var(--tile);gap:3px;padding:4px}.sample b{grid-column:1 / -1;font-size:12px}.sample span{background:#cee0c9;padding:2px 3px;font-size:11px}.adaptive[data-size=small]{width:168px;grid-template-columns:1fr}.adaptive[data-size=medium]{width:252px;grid-template-columns:repeat(2,1fr)}.adaptive[data-size=large]{width:342px;grid-template-columns:repeat(3,1fr)}.sample .responsive{width:100%;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:5px;background:#dce9ed}.responsive span{background:#c1d9dd}`,
    js:`const slider = document.querySelector('input');
const sample = document.querySelector('.sample');
const fixed = document.querySelector('.adaptive');
const output = document.querySelector('output');
function update() {
  slider.max = Math.max(185, Math.min(425, document.body.clientWidth - 20));
  sample.style.width = slider.value + 'px';
  const actual = Math.round(sample.getBoundingClientRect().width);
  fixed.dataset.size = actual >= 370 ? 'large' : actual >= 270 ? 'medium' : 'small';
  output.textContent = actual + 'px';
}
slider.oninput = update; addEventListener('resize', update); update();`
  },
  '7.5': {
    note: 'The toolbar distributes space along one main axis. The title takes only the space it needs, the search field fills the rest, and the button stays fixed. Check the box to switch the main axis from horizontal to vertical.', height:220,
    html:`<label class="toggle"><input type="checkbox"> Use a vertical main axis</label><div class="toolbar" role="search"><b>Trail Library</b><input type="search" aria-label="Trail name" placeholder="Type pine or creek"><button>Search</button></div><p role="status"></p>`,
    css:`.toggle{display:block;margin-bottom:7px}.toolbar{display:flex;align-items:center;gap:6px;padding:8px;background:var(--tile);border:1px solid var(--line)}.toolbar input{flex:1;min-width:0}.toolbar button,.toolbar b{flex:none}.toolbar button,.toolbar input{font:inherit;padding:4px 5px}body:has(.toggle input:checked) .toolbar{flex-direction:column;align-items:stretch}body:has(.toggle input:checked) .toolbar input{flex:auto}p{margin:5px 0}`,
    js:`const search = document.querySelector('input[type=search]');
function query() {
  const value = search.value.trim().toLowerCase();
  const matches = ['Pine Trail','Creek Trail','Overlook Loop'].filter(name => name.toLowerCase().includes(value));
  document.querySelector('[role=status]').textContent = matches.length ? matches.join(' · ') : 'No trails found.';
}
document.querySelector('button').onclick = query;
search.onkeydown = event => { if (event.key === 'Enter' && !event.isComposing) query(); };`
  },
  '7.6': {
    note: 'The dashed outline marks the fluid container. The bands split its width 64% to 36%, while spacing and type scale smoothly with the viewport. The layout does not reflow at fixed breakpoints.', height:196,
    html:`<main class="fluid"><h2>Trail Terrain Breakdown</h2><div class="bands"><div>Woodland · 64%</div><div>Open slope · 36%</div></div><p>Resize the preview to see the widths change while the proportions stay the same.</p></main>`,
    css:`.fluid{width:88%;max-width:720px;margin:auto;padding:clamp(7px,2.2vw,22px);border:1px dashed #729379;background:white}.bands{display:flex}.bands div{padding:6px 4px;text-align:center;background:#cbdcc7}.bands div:first-child{width:64%}.bands div+div{width:36%;background:#dce8eb}h2,p{margin:.12em 0 .35em}h2{font-size:clamp(16px,4vw,33px)}p{font-size:12px;margin-top:7px}`
  },
  '7.7': {
    note: 'The layout stays 460px wide. It centers when there is room and scrolls horizontally when there is not. Try a narrow preview: the content does not collapse to one column.', height:194,
    html:`<div class="scroll" tabindex="0" aria-label="Fixed-width page with horizontal scrolling"><div class="fixed"><header><b>Mountain Trails / 460px</b><span>Trail Archive</span></header><main><aside>Trail Categories</aside><article><b>Pine Trail</b><p>2.5 km · level woodland trail</p></article></main></div></div>`,
    css:`.scroll{overflow-x:auto;padding:8px;border:1px dashed #759178}.fixed{width:460px;margin-inline:auto;border:1px solid var(--line);background:white}.fixed header{display:flex;justify-content:space-between;gap:8px;padding:8px;background:var(--tile)}.fixed main{display:grid;grid-template-columns:128px 1fr;min-height:71px}.fixed aside,.fixed article{padding:8px}.fixed aside{border-right:1px solid var(--line)}p{margin:.25em 0}`
  }
};
