// typing + carousel + active nav
const phrases=["reliable LLM tools","RAG pipelines","full-stack products","secure AI systems"];
let pi=0,ci=0,del=false;
function tick(){
  const el=document.getElementById('typing');
  if(!el) return;
  const full=phrases[pi];
  el.textContent=full.slice(0,ci);
  if(!del){ ci++; if(ci>full.length){ del=true; setTimeout(tick,1200); return; } }
  else{ ci--; if(ci===0){ del=false; pi=(pi+1)%phrases.length; } }
  setTimeout(tick, del?40:80);
}
tick();

// carousel
let idx=0;
function render(){
  const s=document.getElementById('slides');
  if(!s) return;
  const n=s.children.length;
  idx=(idx+n)%n;
  s.style.transform=`translateX(-${idx*100}%)`;
  const d=document.getElementById('dots');
  if(d){ d.innerHTML=''; for(let i=0;i<n;i++){ const b=document.createElement('button'); b.className='dot'+(i===idx?' active':''); b.setAttribute('aria-label','slide '+(i+1)); b.onclick=()=>{idx=i;render()}; d.appendChild(b);} }
}
function move(d){ idx+=d; render(); }
render();
setInterval(()=>{ const s=document.getElementById('slides'); if(s){ idx++; render(); } },6000);

// touch swipe
(function(){
  const c=document.getElementById('carousel'); if(!c) return;
  let x0=null; c.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
  c.addEventListener('touchend',e=>{ if(x0===null) return; const dx=e.changedTouches[0].clientX-x0; if(Math.abs(dx)>40) move(dx<0?1:-1); x0=null; },{passive:true});
})();
