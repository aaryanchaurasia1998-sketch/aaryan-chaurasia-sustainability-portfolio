const areas=['Materiality Assessment','ESG Strategy','GHG Emissions Inventorization','ESG Report','ESG Ratings','ESG Assurance','ESG Due Diligence','Water Neutrality','CSR Advisory'];
const slug=s=>s.toLowerCase().replaceAll('&','and').replaceAll(' ','-');
const expertiseRoot=location.pathname.includes('/expertise/')?'':'expertise/';
const item=(name,i)=>`<a href="${expertiseRoot}${slug(name)}/index.html"><span class="number">${String(i+1).padStart(2,'0')}</span><span class="item-name">${name}</span><span class="arrow">↗</span></a>`;
const mini=document.getElementById('mini-index');if(mini)mini.innerHTML=areas.map((x,i)=>`<a href="expertise/${slug(x)}/index.html"><span>${String(i+1).padStart(2,'0')}</span>${x}</a>`).join('');
const index=document.getElementById('expertise-index');if(index)index.innerHTML=areas.map(item).join('');
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.site-header nav');if(toggle&&nav)toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);toggle.textContent=open?'Close':'Menu'});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.14});document.querySelectorAll('section:not(.hero) .section-label, .milestone, .recognition-list article, .expertise-index a').forEach(el=>{el.classList.add('reveal');observer.observe(el)});
const sections=[...document.querySelectorAll('main section[id]')],links=[...document.querySelectorAll('.site-header nav a')];const spy=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${e.target.id}`))}),{rootMargin:'-35% 0px -55% 0px'});sections.forEach(s=>spy.observe(s));

document.querySelectorAll('[data-copy-email]').forEach(link=>link.addEventListener('click',async()=>{
  const email=link.dataset.copyEmail;
  const clearFeedback=()=>{if(statusTimer)clearTimeout(statusTimer);statusTimer=setTimeout(()=>{if(status)status.textContent=''},2500)};
  let statusTimer;
  const status=document.getElementById('email-feedback');
  let copied=false;
  try{await navigator.clipboard.writeText(email);copied=true}catch{
    const field=document.createElement('textarea');field.value=email;field.setAttribute('readonly','');field.style.position='fixed';field.style.opacity='0';document.body.appendChild(field);field.select();copied=document.execCommand('copy');field.remove();
  }
  if(status){status.textContent=copied?`${email} copied to clipboard.`:`Email: ${email}`;clearFeedback()}
}));

// GHG Scope 3 category descriptions use a viewport-level tooltip so neighboring
// grid cards cannot overlap the popup or clip its wrapped text.
const ghgCategories=[...document.querySelectorAll('.ghg-category[data-tip]')];
if(ghgCategories.length){
  const ghgTooltip=document.createElement('div');
  ghgTooltip.className='ghg-floating-tooltip';
  ghgTooltip.id='ghg-category-tooltip';
  ghgTooltip.setAttribute('role','tooltip');
  ghgTooltip.setAttribute('aria-hidden','true');
  document.body.appendChild(ghgTooltip);
  let activeGhgCategory=null;
  const placeGhgTooltip=()=>{
    if(!activeGhgCategory)return;
    const anchor=activeGhgCategory.getBoundingClientRect();
    if(anchor.bottom<0||anchor.top>window.innerHeight){hideGhgTooltip();return}
    const tip=ghgTooltip.getBoundingClientRect();
    const left=Math.max(12,Math.min(anchor.left+anchor.width/2-tip.width/2,window.innerWidth-tip.width-12));
    let top=anchor.bottom+8;
    if(top+tip.height>window.innerHeight-8&&anchor.top-tip.height-8>=8)top=anchor.top-tip.height-8;
    else if(top+tip.height>window.innerHeight-8)top=Math.max(8,window.innerHeight-tip.height-8);
    ghgTooltip.style.left=`${left}px`;
    ghgTooltip.style.top=`${top}px`;
  };
  const showGhgTooltip=category=>{
    activeGhgCategory=category;
    ghgTooltip.textContent=category.dataset.tip||'';
    category.setAttribute('aria-describedby',ghgTooltip.id);
    ghgTooltip.setAttribute('aria-hidden','false');
    ghgTooltip.classList.add('is-visible');
    placeGhgTooltip();
  };
  function hideGhgTooltip(){
    if(activeGhgCategory?.getAttribute('aria-describedby')===ghgTooltip.id)activeGhgCategory.removeAttribute('aria-describedby');
    activeGhgCategory=null;
    ghgTooltip.classList.remove('is-visible');
    ghgTooltip.setAttribute('aria-hidden','true');
  }
  ghgCategories.forEach(category=>{
    category.addEventListener('pointerenter',()=>showGhgTooltip(category));
    category.addEventListener('pointerleave',hideGhgTooltip);
    category.addEventListener('focus',()=>showGhgTooltip(category));
    category.addEventListener('blur',hideGhgTooltip);
  });
  window.addEventListener('resize',placeGhgTooltip,{passive:true});
  window.addEventListener('scroll',hideGhgTooltip,{passive:true});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')hideGhgTooltip()});
}

// ESG Reporting standards use a viewport-level tooltip for reliable wrapping.
const reportingStandards=[...document.querySelectorAll('.reporting-standard[data-tip], .assurance-info-box[data-tip], .water-coverage-box[data-tip]')];
if(reportingStandards.length){
  const reportingTooltip=document.createElement('div');
  reportingTooltip.className='reporting-floating-tooltip';
  reportingTooltip.id='reporting-standard-tooltip';
  reportingTooltip.setAttribute('role','tooltip');
  reportingTooltip.setAttribute('aria-hidden','true');
  document.body.appendChild(reportingTooltip);
  let activeReportingStandard=null;
  const placeReportingTooltip=()=>{
    if(!activeReportingStandard)return;
    const anchor=activeReportingStandard.getBoundingClientRect();
    if(anchor.bottom<0||anchor.top>window.innerHeight){hideReportingTooltip();return}
    const tip=reportingTooltip.getBoundingClientRect();
    const left=Math.max(12,Math.min(anchor.left+anchor.width/2-tip.width/2,window.innerWidth-tip.width-12));
    let top=anchor.bottom+9;
    if(top+tip.height>window.innerHeight-8&&anchor.top-tip.height-9>=8)top=anchor.top-tip.height-9;
    else if(top+tip.height>window.innerHeight-8)top=Math.max(8,window.innerHeight-tip.height-8);
    reportingTooltip.style.left=`${left}px`;
    reportingTooltip.style.top=`${top}px`;
  };
  const showReportingTooltip=standard=>{
    activeReportingStandard=standard;
    reportingTooltip.textContent=standard.dataset.tip||'';
    standard.setAttribute('aria-describedby',reportingTooltip.id);
    reportingTooltip.setAttribute('aria-hidden','false');
    reportingTooltip.classList.add('is-visible');
    placeReportingTooltip();
  };
  function hideReportingTooltip(){
    if(activeReportingStandard?.getAttribute('aria-describedby')===reportingTooltip.id)activeReportingStandard.removeAttribute('aria-describedby');
    activeReportingStandard=null;
    reportingTooltip.classList.remove('is-visible');
    reportingTooltip.setAttribute('aria-hidden','true');
  }
  reportingStandards.forEach(standard=>{
    standard.addEventListener('pointerenter',()=>showReportingTooltip(standard));
    standard.addEventListener('pointerleave',()=>{if(document.activeElement!==standard)hideReportingTooltip()});
    standard.addEventListener('focus',()=>showReportingTooltip(standard));
    standard.addEventListener('blur',hideReportingTooltip);
  });
  window.addEventListener('resize',placeReportingTooltip,{passive:true});
  window.addEventListener('scroll',hideReportingTooltip,{passive:true});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')hideReportingTooltip()});
}
