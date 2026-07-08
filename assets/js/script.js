const menuToggle=document.querySelector('.menu-toggle');const navLinks=document.querySelector('.nav-links');if(menuToggle){menuToggle.addEventListener('click',()=>navLinks.classList.toggle('open'))}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const forms=document.querySelectorAll('form[data-demo-form]');forms.forEach(form=>{form.addEventListener('submit',e=>{e.preventDefault();const notice=form.querySelector('.notice');if(notice){notice.style.display='block';notice.textContent='Thanks! This demo form is ready to connect to your email, CRM, or Google Form endpoint.'}form.reset();})});
const spinBtn=document.querySelector('#spinBtn');const wheel=document.querySelector('#discountWheel');const result=document.querySelector('#discountResult');let rotation=0;const discounts=['5% off a starter website','Free first update request','10% off your first month','Free homepage copy polish','Free mock-site consultation','15% off site refresh package','Free local lead review','Free contact form setup'];if(spinBtn&&wheel){spinBtn.addEventListener('click',()=>{const index=Math.floor(Math.random()*discounts.length);const segment=360/discounts.length;const target=360*5+(360-(index*segment+segment/2));rotation+=target;wheel.style.transform=`rotate(${rotation}deg)`;spinBtn.disabled=true;setTimeout(()=>{result.textContent=discounts[index];spinBtn.disabled=false},4100);})}

// Lead fishing mini game
const castLeadBtn=document.querySelector('#castLeadBtn');
const restartLeadBtn=document.querySelector('#restartLeadBtn');
const restartLeadBtnModal=document.querySelector('#restartLeadBtnModal');
const viewCaughtBtn=document.querySelector('#viewCaughtBtn');
const caughtList=document.querySelector('#caughtList');
const catchCount=document.querySelector('#catchCount');
const leadGameStatus=document.querySelector('#leadGameStatus');
const fishingStage=document.querySelector('.fishing-stage');
const leadModal=document.querySelector('#leadModal');
const closeLeadModal=document.querySelector('#closeLeadModal');
const leadSummary=document.querySelector('#leadSummary');

const mockLeads=[
  {business:'Maple Street Bakery',need:'Needs a cleaner menu page and online order buttons',area:'Downtown local shop',urgency:'Warm lead'},
  {business:'Iron Oak Landscaping',need:'Website is missing service areas, gallery photos, and quote form',area:'Suburban service route',urgency:'High potential'},
  {business:'Cornerstone Barber Co.',need:'Needs booking links, reviews, and stronger mobile layout',area:'Main street storefront',urgency:'Ready soon'},
  {business:'Northside Auto Repair',need:'No clear emergency contact path or service breakdown',area:'Industrial road garage',urgency:'Strong fit'},
  {business:'Little Lantern Daycare',need:'Needs trust-focused copy, parent FAQs, and tour request form',area:'Family neighborhood',urgency:'Nurture lead'},
  {business:'Riverbend Yoga Studio',need:'Class schedule is hard to update and hard to read on phones',area:'Wellness district',urgency:'Warm lead'},
  {business:'Summit Roofing Crew',need:'Needs storm-damage landing page and quote funnel',area:'Regional contractor',urgency:'High potential'},
  {business:'Cedar Pet Grooming',need:'Needs before-and-after gallery and appointment request form',area:'Local plaza',urgency:'Ready soon'}
];
let caughtLeads=[];
function renderCaughtLeads(){
  if(!caughtList||!catchCount)return;
  catchCount.textContent=caughtLeads.length;
  caughtList.innerHTML='';
  if(caughtLeads.length===0){caughtList.innerHTML='<li class="empty-catch">No leads caught yet. Cast the line to begin.</li>';return;}
  caughtLeads.forEach((lead,index)=>{
    const li=document.createElement('li');
    li.innerHTML=`<strong>${index+1}. ${lead.business}</strong><span>${lead.need}</span><span>${lead.area} • ${lead.urgency}</span>`;
    caughtList.appendChild(li);
  });
}
function resetLeadGame(){
  caughtLeads=[];renderCaughtLeads();
  if(castLeadBtn){castLeadBtn.disabled=false;castLeadBtn.textContent='Cast for a lead';}
  if(viewCaughtBtn){viewCaughtBtn.disabled=true;}
  if(leadGameStatus){leadGameStatus.innerHTML='<strong>Ready to cast?</strong> Catch 5 mock leads to finish the round.';}
  if(leadModal){leadModal.classList.remove('open');leadModal.setAttribute('aria-hidden','true');}
}
function openLeadModal(){
  if(!leadModal||!leadSummary)return;
  leadSummary.innerHTML=`<div class="lead-summary-grid">${caughtLeads.map(lead=>`<div class="lead-summary-card"><h3>${lead.business}</h3><p><strong>Need:</strong> ${lead.need}</p><p><strong>Area:</strong> ${lead.area}</p><p><strong>Status:</strong> ${lead.urgency}</p></div>`).join('')}</div>`;
  leadModal.classList.add('open');leadModal.setAttribute('aria-hidden','false');
}
if(castLeadBtn){
  renderCaughtLeads();
  castLeadBtn.addEventListener('click',()=>{
    if(caughtLeads.length>=5)return;
    castLeadBtn.disabled=true;
    if(fishingStage)fishingStage.classList.add('casting');
    if(leadGameStatus)leadGameStatus.innerHTML='<strong>Casting...</strong> Searching the local pond for a useful lead.';
    setTimeout(()=>{
      const remaining=mockLeads.filter(lead=>!caughtLeads.some(caught=>caught.business===lead.business));
      const lead=remaining[Math.floor(Math.random()*remaining.length)];
      caughtLeads.push(lead);renderCaughtLeads();
      if(fishingStage)fishingStage.classList.remove('casting');
      if(caughtLeads.length>=5){
        castLeadBtn.disabled=true;castLeadBtn.textContent='Round complete';
        if(viewCaughtBtn)viewCaughtBtn.disabled=false;
        if(leadGameStatus)leadGameStatus.innerHTML='<strong>Round complete!</strong> You caught 5 mock leads. View the catches or restart the game.';
      }else{
        castLeadBtn.disabled=false;
        if(leadGameStatus)leadGameStatus.innerHTML=`<strong>Caught ${lead.business}!</strong> ${5-caughtLeads.length} more lead${5-caughtLeads.length===1?'':'s'} to go.`;
      }
    },850);
  });
}
if(viewCaughtBtn)viewCaughtBtn.addEventListener('click',openLeadModal);
if(restartLeadBtn)restartLeadBtn.addEventListener('click',resetLeadGame);
if(restartLeadBtnModal)restartLeadBtnModal.addEventListener('click',resetLeadGame);
if(closeLeadModal)closeLeadModal.addEventListener('click',()=>{leadModal.classList.remove('open');leadModal.setAttribute('aria-hidden','true');});
