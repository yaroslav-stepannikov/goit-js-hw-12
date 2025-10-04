import{a as R,S as P,i}from"./assets/vendor-BNibzuFn.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const q="https://pixabay.com/api/",$="52544732-939bdd7f86cf76540eb760f6b",d=15,B=R.create({baseURL:q,params:{key:$,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:d}});async function m(o,e=1){if(!o)return{hits:[]};try{const{data:s}=await B.get("",{params:{q:o,page:e}});return s}catch(s){return console.log(s),{hits:[]}}}const f=document.querySelector(".gallery"),y=document.querySelector(".loader"),v=document.querySelector(".load-btn"),H=new P(".gallery a",{captionsData:"alt",captionDelay:250});function b(o){const e=o.map(({webformatURL:s,largeImageURL:a,tags:t,likes:r,views:n,comments:S,downloads:E})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${a}">
        <img class="gallery-image" src="${s}" alt="${t}" loading="lazy" />
      </a>
      <ul class="gallery-content-list">
        <li class="gallery-content-item">
          <div class="content-wrapper">
            <h3 class="gallery-content-title">Likes</h3>
            <p class="gallery-title-value">${r}</p>
          </div>
          <div class="content-wrapper">
            <h3 class="gallery-content-title">Views</h3>
            <p class="gallery-title-value">${n}</p>
          </div>
          <div class="content-wrapper">
            <h3 class="gallery-content-title">Comments</h3>
            <p class="gallery-title-value">${S}</p>
          </div>
          <div class="content-wrapper">
            <h3 class="gallery-content-title">Downloads</h3>
            <p class="gallery-title-value">${E}</p>
          </div>
        </li>
      </ul>
    </li>
  `).join("");f.insertAdjacentHTML("beforeend",e),g(),H.refresh()}function M(){f.innerHTML=""}function w(){y.classList.add("is-visible")}function L(){y.classList.remove("is-visible")}function g(){v.classList.replace("load-btn-hidden","load-btn")}function u(){v.classList.replace("load-btn","load-btn-hidden")}const h=document.querySelector(".form"),p=document.querySelector(".load-btn");let c="",l=1;h.addEventListener("submit",async o=>{if(o.preventDefault(),c=h.elements["search-text"].value.trim(),l=1,!c){i.warning({title:"Warning",message:"Please enter a search query",timeout:3e3,position:"topRight"});return}M(),u(),w();try{const e=await m(c,l);if(!e.hits||e.hits.length===0){i.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",timeout:4e3,position:"topRight"});return}b(e.hits),e.totalHits>l*d?g():u(),i.success({title:"Success",message:`Found ${e.totalHits} images`,timeout:3e3,position:"topRight"})}catch(e){console.log(e),i.error({title:"Error",message:"Something went wrong while fetching images.",position:"topRight"})}finally{L()}});p&&p.addEventListener("click",async()=>{l+=1,w();try{const o=await m(c,l);if(!o.hits||o.hits.length===0){u(),i.info({title:"End",message:"We're sorry, but you've reached the end of search results.",timeout:3e3,position:"topRight"});return}b(o.hits);const e=Math.ceil(o.totalHits/d);l>=e?(u(),i.info({title:"End",message:"You've reached the last page of results.",timeout:3e3,position:"topRight"})):g();const s=document.querySelector(".gallery-item");if(s){const{height:a}=s.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})}}catch(o){console.error(o),i.error({title:"Error",message:"Something went wrong while loading more images.",position:"topRight"})}finally{L()}});
//# sourceMappingURL=index.js.map
