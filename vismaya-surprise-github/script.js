const chapters=[...document.querySelectorAll(".chapter")];
let current=0;
const state={memory:new Set(),secret:new Set()};
const progress=document.getElementById("progress");
const modal=document.getElementById("objectModal");
const modalTitle=document.getElementById("modalTitle");
const modalText=document.getElementById("modalText");
const modalIcon=document.getElementById("modalIcon");
const memoryMessages={
 letter:["LETTER","✦","Some things are easier to write than to say.<br><br>Maybe this is one of them."],
 photo:["POLAROID","□","Some memories don't need pictures to stay alive."],
 key:["KEY","⌁","Some people are given a key to your life without even asking for it."],
 envelope:["ENVELOPE","✉","And some messages are worth keeping forever."]
};
function showChapter(i){
 i=Math.max(0,Math.min(chapters.length-1,i));
 chapters.forEach((c,n)=>c.classList.toggle("active",n===i));
 current=i;
 const ch=chapters[i];
 progress.textContent=`${String(ch.dataset.chapter).padStart(2,"0")} / 05`;
 window.scrollTo({top:0,behavior:"smooth"});
}
function next(){showChapter(current+1)}
document.querySelectorAll(".next").forEach(b=>b.addEventListener("click",next));
function openGift(){
 const env=document.getElementById("openGift");
 env.classList.add("open");
 document.getElementById("openGift2").style.opacity="0";
 setTimeout(next,1500);
}
document.getElementById("openGift").addEventListener("click",openGift);
document.getElementById("openGift2").addEventListener("click",openGift);

document.querySelectorAll(".memory-object").forEach(obj=>{
 obj.addEventListener("click",()=>{
   const key=obj.dataset.memory;
   state.memory.add(key); obj.classList.add("found");
   const m=memoryMessages[key];
   modalIcon.textContent=m[1]; modalTitle.textContent=m[0]; modalText.innerHTML=m[2];
   modal.classList.add("show"); modal.setAttribute("aria-hidden","false");
   if(state.memory.size===4) document.getElementById("memoryNext").classList.add("unlocked");
 });
});
function closeModal(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true")}
document.getElementById("closeModal").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});

const letter=`Vishy,\n\nI don't know if I've ever properly said this.\n\nYou're not just someone I know.\n\nSomewhere along the way, you became family.\n\nLife gives us a lot of people. Some stay for a moment, some stay for a chapter, and a very few somehow become part of the story itself.\n\nYou're one of those people for me.\n\nWe've had our stupid moments, random conversations, laughs, misunderstandings, and those completely unnecessary conversations that somehow become memories.\n\nAnd honestly…\n\nI wouldn't trade those memories for anything.\n\nI may not always say it.\n\nI may joke around.\n\nI may annoy you.\n\nI may call you Kuruppe for absolutely no reason.\n\nBut underneath all that, there's something simple:\n\nI'm genuinely grateful that you're in my life.\n\nYou're my sister from another mother.\n\nAnd no matter how busy life gets, how much things change, or how far everyone goes…\n\nI hope you always remember that you have someone who will always consider you family.\n\nThis little website isn't expensive.\n\nIt isn't some huge gift.\n\nIt's just a tiny piece of my heart turned into a website.\n\nFor you.`;
function buildLetter(){
 const box=document.getElementById("letterText");box.innerHTML="";
 letter.split("\n").forEach((line,i)=>{
   const p=document.createElement("p");p.className="letter-line";p.textContent=line||" ";
   p.style.animationDelay=`${i*.11}s`;box.appendChild(p);
 });
}
buildLetter();
document.getElementById("kuruppeBtn").addEventListener("click",()=>{
 const r=document.getElementById("kuruppeResponse");r.textContent="Yeah yeah… I knew you would.";r.animate([{opacity:0,transform:"translateY(8px)"},{opacity:1,transform:"none"}],{duration:700,fill:"forwards"});
});
document.getElementById("finalOpen").addEventListener("click",()=>{
 document.getElementById("finalEnvelope").classList.add("open");
 setTimeout(()=>document.getElementById("finalLetter").classList.add("show"),850);
 document.getElementById("finalOpen").style.display="none";
 document.querySelector(".one-last").style.display="none";
});
document.getElementById("finalEnvelope").addEventListener("click",()=>{
 document.getElementById("finalOpen").click();
});
document.getElementById("replay").addEventListener("click",()=>{
 state.memory.clear();document.querySelectorAll(".memory-object").forEach(x=>x.classList.remove("found"));
 document.getElementById("memoryNext").classList.remove("unlocked");
 document.getElementById("finalEnvelope").classList.remove("open");
 document.getElementById("finalLetter").classList.remove("show");
 document.getElementById("finalOpen").style.display="";
 document.querySelector(".one-last").style.display="";
 document.getElementById("openGift").classList.remove("open");
 document.getElementById("openGift2").style.opacity="";
 document.getElementById("kuruppeResponse").textContent="";
 showChapter(0);
});
document.querySelectorAll(".secret").forEach((el,i)=>{
 el.addEventListener("click",()=>{
  if(state.secret.has(i))return;
  state.secret.add(i);
  const msgs=["You're stuck with me now.","No refunds.","You're family. That's permanent."];
  const t=document.getElementById("toast");t.textContent=msgs[i];t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2400);
  el.style.opacity=".08";
 });
});
document.addEventListener("keydown",e=>{
 if(e.key==="ArrowRight") next();
 if(e.key==="ArrowLeft") showChapter(current-1);
 if(e.key==="Escape") closeModal();
});
const particles=document.getElementById("particles");
for(let i=0;i<24;i++){
 const p=document.createElement("i");p.className="particle";
 p.style.left=Math.random()*100+"vw";p.style.top=(60+Math.random()*50)+"vh";
 p.style.animationDuration=(8+Math.random()*14)+"s";p.style.animationDelay=(-Math.random()*15)+"s";
 particles.appendChild(p);
}
let touchX=0;
document.addEventListener("touchstart",e=>touchX=e.changedTouches[0].clientX,{passive:true});
document.addEventListener("touchend",e=>{
 const dx=e.changedTouches[0].clientX-touchX;
 if(Math.abs(dx)>80){dx<0?next():showChapter(current-1)}
},{passive:true});
showChapter(0);
