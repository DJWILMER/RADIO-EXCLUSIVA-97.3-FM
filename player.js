"use strict";function w(t){const e=t.split(" - ");return{title:e[1],artist:e[0]}}function z(t,e){return t.length!==e.length?!0:!t.every((o,i)=>JSON.stringify(o)===JSON.stringify(e[i]))}let S="",x=[];async function M(){const t=window.setupRadio??{},e=document.querySelector(".history"),o=e.querySelector("#history"),i=document.querySelector("#history-template"),l=document.querySelector(".song-backdrop"),r=document.querySelector("#song-name"),d=document.querySelector("#song-artist"),a=document.querySelector(".song-cover"),g=`${t.api?t.api:"https://free.streampwa.com/api.php/?url="}${t.stream}`;try{const n=await(await fetch(g)).json(),u=w(n.songtitle).title,y=w(n.songtitle).artist;let c=await fetch(`${t.metadata_api}?title=${u}&artist=${y}`);c=await c.json(),a.src=n.artwork||c.cover||t.cover,l.src=n.artwork||c.cover||t.cover,(n.songtitle!==S||S==="")&&(r.innerHTML=u,d.innerHTML=y,S=n.songtitle,"mediaSession"in navigator&&(document.title=(y||t.description)+" - "+(u==="undefined"?t.name:u),navigator.mediaSession.metadata=new MediaMetadata({title:u,artist:w(n.songtitle).artist,artwork:[{src:n.artwork||c.cover||t.cover,sizes:"96x96",type:"image/jpeg"},{src:n.artwork||c.cover||t.cover,sizes:"512x512",type:"image/jpeg"}]})));const m=n.song_history.slice(0,2);let h=[];for(let s=0;s<m.length;s++){const f=m[s];let v=await fetch(`${t.metadata_api}?title=${f.song.title}&artist=${f.song.artist}`);v=await v.json(),h.push(v)}if(n.song_history&&n.song_history.length==0){e.setAttribute("style","opacity: 0");return}z(x,h)&&(e.removeAttribute("style"),o.innerHTML="",h.forEach(s=>{const f=i.innerHTML;o.innerHTML+=f.replace(/{title}/g,s.title).replace(/{artist}/g,s.artist).replace(/{cover}/g,s.cover?`<img src="${s.cover}" class="w-[54px] h-[54px] rounded-lg"/>`:'<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-history-toggle opacity-50"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" /><path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" /><path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" /><path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" /><path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" /><path d="M12 8v4l3 3" /></svg>')}),x=h)}catch(p){console.error(p),e.setAttribute("style","opacity: 0")}}async function b(){const t=window.setupRadio??{};M(),setInterval(M,t.refresh_timeout)}function k(t){const e=document.createElement("canvas");return e.setAttribute("id","visualizerCanvas"),e.setAttribute("class","visualizer-item"),t.appendChild(e),e.width=t.clientWidth,e.height=t.clientHeight,e}function q(t,e){t.width=e.clientWidth,t.height=e.clientHeight}function H(t,e){if(!t||!e)return;const o={fftSize:e.dataset.fftSize||2048,numBars:e.dataset.bars||80,maxHeight:e.dataset.maxHeight||150},i=new AudioContext,l=i.createMediaElementSource(t),r=i.createAnalyser();l.connect(r),l.connect(i.destination);const d=new Uint8Array(r.frequencyBinCount),a=k(e),g=a.getContext("2d"),p=()=>{q(a,e),r.getByteFrequencyData(d),r.fftSize=o.fftSize,g.clearRect(0,0,a.width,a.height);for(let n=0;n<o.numBars;n++){const u=Math.floor((n+10)*(n<o.numBars/2?2:1)),y=d[u],c=Math.max(4,y||0)+o.maxHeight/255,m=a.width/o.numBars,h=n*m,s=a.height-c;g.fillStyle="white",g.fillRect(h,s,m-2,c)}requestAnimationFrame(p)};p(),window.addEventListener("resize",()=>{q(a,e)})}function L(){const t=document.querySelector("#btn-play"),e=document.querySelector("#volume"),o=window.setupRadio,i=new Audio(o.stream);i.crossOrigin="anonymous";let l=!0,r=!0;t.addEventListener("click",function(){l?(i.load(),i.play(),t.classList.add("is-playing"),r&&(H(i,document.querySelector("#equalizer")),r=!1),l=!1):(i.pause(),t.classList.remove("is-playing"),l=!0)}),i.volume=parseFloat(e.value/100),e.addEventListener("input",function(){const d=parseFloat(e.value/100);i.volume=d})}function C(){document.querySelectorAll('input[type="range"]').forEach(t=>{function e(){const o=(t.value-t.min)/(t.max-t.min)*100;t.style.background=`linear-gradient(to right, var(--color-primary) ${o}%, var(--color-light) ${o}%)`}t.addEventListener("input",e),e()})}document.addEventListener("DOMContentLoaded",function(){C(),L(),b()});
