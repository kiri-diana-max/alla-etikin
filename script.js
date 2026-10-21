const dialog=document.getElementById('max-dialog');
document.querySelectorAll('[data-max]').forEach(button=>button.addEventListener('click',()=>dialog.showModal()));
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.getElementById('copy-message').addEventListener('click',async()=>{const text=document.getElementById('message-draft').textContent;try{await navigator.clipboard.writeText(text);dialog.querySelector('.status').textContent='Текст скопирован. Откройте MAX и вставьте его в сообщение.';}catch{dialog.querySelector('.status').textContent='Выделите и скопируйте текст сообщения выше.';}});

const motion=document.getElementById('alla-motion');
const toggle=document.getElementById('motion-toggle');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let manualPause=false,loaded=false,inView=false;
function loadMotion(){if(!loaded){motion.querySelector('source').src=motion.querySelector('source').dataset.src;motion.load();loaded=true;}}
function syncMotion(){toggle.textContent=motion.paused?'▶':'Ⅱ';toggle.setAttribute('aria-label',motion.paused?'Воспроизвести видео':'Приостановить видео');toggle.setAttribute('aria-pressed',String(!motion.paused));}
async function startMotion(){loadMotion();motion.muted=true;try{await motion.play();}catch{}syncMotion();}
toggle.addEventListener('click',()=>{if(motion.paused){manualPause=false;startMotion();}else{manualPause=true;motion.pause();}syncMotion();});
motion.addEventListener('play',syncMotion);motion.addEventListener('pause',syncMotion);
if('IntersectionObserver' in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView&&!manualPause&&!reduced.matches&&!document.hidden)startMotion();else motion.pause();},{threshold:.2}).observe(motion);
reduced.addEventListener('change',()=>{if(reduced.matches)motion.pause();else if(inView&&!manualPause)startMotion();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)motion.pause();else if(inView&&!manualPause&&!reduced.matches)startMotion();});
function revealProgram(){const element=document.getElementById(location.hash.slice(1));if(element&&element.matches('details.program'))element.open=true;}
window.addEventListener('hashchange',revealProgram);revealProgram();
