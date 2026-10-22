// To add a project, add a new object to this list and put its HTML file in projects/.
const PROJECTS = [
  {id:'googlemogel',title:'גוגלמוגל',description:'מותג משקאות דיגיטלי בעיצוב צבעוני ומקורי',category:'אתרים',icon:'🥤',color:'#fa6a9a',author:'אור דמארי',url:'projects/googlemogel.html'},
  {id:'barbermatch',title:'BarberMatch',description:'פלטפורמה למציאת מספרות, השוואה וקביעת תורים',category:'אפליקציות',icon:'✂️',color:'#c58f58',author:'אורי בוסקילה',url:'projects/barbermatch.html'},
  {id:'gold',title:'המלצות זהב',description:'עולם המלצות לספרים, מסעדות, סרטים וחוויות',category:'המלצות',icon:'🌟',color:'#ecb747',author:'משה לוי',url:'projects/gold.html'},
  {id:'cityguide',title:'המדריך לנוער',description:'אטרקציות, אוכל וקניות במרכז ובירושלים',category:'תיירות ופנאי',icon:'🗺️',color:'#51b5f0',author:'שחר',url:'projects/cityguide.html'},
  {id:'super',title:'סופר שוק',description:'חוויית קניות בסופרמרקט מקוון',category:'חנויות',icon:'🛒',color:'#5ec5a1',author:'צורי גילה',url:'projects/super.html'},
  {id:'piano',title:'פסנתר כיף',description:'משחק ללימוד פסנתר ונגינה אינטראקטיבית',category:'משחקים',icon:'🎹',color:'#b18cff',author:'משה לוי',url:'projects/piano.html'},
  {id:'jerusalem',title:'ירושלים 3D',description:'עולם פתוח בתלת־ממד עם מערכת בנק',category:'משחקים',icon:'🏙️',color:'#7895f6',author:'עמיחי',url:'projects/jerusalem.html'},
  {id:'fortress',title:'מבצר הכוכב 3D',description:'משחק אסטרטגיה ופעולה בתלת־ממד',category:'משחקים',icon:'🏰',color:'#f28b77',author:'שחר רוזנפלד',url:'projects/fortress.html'},
  {id:'nexus',title:'NexusGames PRO',description:'המלצות למשחקי מחשב וקונסולות',category:'המלצות',icon:'🎮',color:'#9d92ff',author:'סיני אזארי',url:'projects/nexus.html'},
  {id:'videogen',title:'VideoGen AI',description:'ממשק יצירתי לרעיון של יצירת סרטונים בעזרת AI',category:'כלי AI',icon:'🎬',color:'#ed77b6',author:'עדן',url:'projects/videogen.html'},
  {id:'playstation',title:'PlayStation Nexus',description:'קטלוג המלצות למשחקי PlayStation',category:'המלצות',icon:'🕹️',color:'#56a5fc',author:'נוה בן דב',url:'projects/playstation.html'},
  {id:'trails',title:'בשביל הארץ',description:'מדריך למסלולים ולאטרקציות ברחבי ישראל',category:'תיירות ופנאי',icon:'🥾',color:'#7acb97',author:'אביחי דוכן',url:'projects/trails.html'},
  {id:'cinema',title:'CinemaStream Israel',description:'חוויה מעוצבת של קטלוג וצפייה בסרטים',category:'בידור',icon:'🍿',color:'#ff9163',author:'עמיחי בן כליפא',url:'projects/cinema.html'}
];
const gallery=document.getElementById('gallery');
const filters=document.getElementById('filters');
const search=document.getElementById('search');
const modal=document.getElementById('projectModal');
const frame=document.getElementById('modalFrame');
let activeCategory='הכול';
const categories=['הכול',...new Set(PROJECTS.map(p=>p.category))];
document.getElementById('projectCount').textContent=PROJECTS.length;
document.getElementById('countLarge').textContent=PROJECTS.length;
document.getElementById('categoryCount').textContent=categories.length-1;
function escapeHtml(t){return String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderFilters(){filters.innerHTML=categories.map(c=>`<button class="filter ${c===activeCategory?'active':''}" type="button" data-filter="${escapeHtml(c)}" aria-pressed="${c===activeCategory}">${escapeHtml(c)}</button>`).join('');}
function render(){const q=search.value.trim().toLocaleLowerCase('he');const list=PROJECTS.filter(p=>(activeCategory==='הכול'||p.category===activeCategory)&&[p.title,p.author,p.description,p.category].join(' ').toLocaleLowerCase('he').includes(q));gallery.innerHTML=list.map(p=>{const n=PROJECTS.indexOf(p)+1;return `<article class="project-card" style="--accent:${p.color}"><div class="project-cover"><div class="cover-fallback" aria-hidden="true">${p.icon}</div><img class="cover-screenshot" src="assets/previews/${p.id}.png" alt="תצוגה מקדימה של ${escapeHtml(p.title)}" loading="lazy" onerror="this.remove()"><span class="project-index">${String(n).padStart(2,'0')} / ${PROJECTS.length}</span><span class="project-category">${escapeHtml(p.category)}</span></div><div class="project-body"><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.description)}</p><div class="project-bottom"><span class="project-author">נוצר על ידי <strong>${escapeHtml(p.author)}</strong></span><button class="project-open" data-project="${p.id}" type="button">לצפייה ביצירה <span>↗</span></button></div></div></article>`}).join('');document.getElementById('emptyState').hidden=list.length!==0;}
filters.addEventListener('click',e=>{const b=e.target.closest('button[data-filter]');if(!b)return;activeCategory=b.dataset.filter;renderFilters();render();});
search.addEventListener('input',render);
document.getElementById('clearSearch').addEventListener('click',()=>{search.value='';activeCategory='הכול';renderFilters();render();});
gallery.addEventListener('click',e=>{const b=e.target.closest('button[data-project]');if(!b)return;const p=PROJECTS.find(p=>p.id===b.dataset.project);if(!p)return;document.getElementById('modalIcon').textContent=p.icon;document.getElementById('modalTitle').textContent=p.title;document.getElementById('modalAuthor').textContent=`נוצר על ידי ${p.author}`;document.getElementById('modalNewTab').href=p.url;frame.src=p.url;if(typeof modal.showModal==='function')modal.showModal();else window.open(p.url,'_blank','noopener');});
function closeModal(){modal.close();frame.removeAttribute('src');}
document.getElementById('modalClose').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
modal.addEventListener('close',()=>frame.removeAttribute('src'));
renderFilters();render();
