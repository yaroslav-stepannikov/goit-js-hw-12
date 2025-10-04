import{a as P,S as q,i as l}from"./assets/vendor-BNibzuFn.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const E="https://pixabay.com/api/",R="52544732-939bdd7f86cf76540eb760f6b",u=15,$=P.create({baseURL:E,params:{key:R,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:u}});async function g(o,e=1){if(!o)return{hits:[]};try{const{data:s}=await $.get("",{params:{q:o,page:e}});return s}catch(s){return console.log(s),{hits:[]}}}const p=document.querySelector(".gallery"),m=document.querySelector(".loader"),y=document.querySelector(".load-btn, .load-btn-hidden"),B=new q(".gallery a",{captionsData:"alt",captionDelay:250});function f(o){const e=o.map(({webformatURL:s,largeImageURL:a,tags:t,likes:r,views:n,comments:w,downloads:S})=>`
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
            <p class="gallery-title-value">${w}</p>
          </div>
          <div class="content-wrapper">
            <h3 class="gallery-content-title">Downloads</h3>
            <p class="gallery-title-value">${S}</p>
          </div>
        </li>
      </ul>
    </li>
  `).join("");p.insertAdjacentHTML("beforeend",e),v(),B.refresh()}function M(){p.innerHTML=""}function b(){m.classList.add("is-visible")}function d(){m.classList.remove("is-visible")}function v(){y.classList.replace("load-btn-hidden","load-btn")}function L(){y.classList.replace("load-btn","load-btn-hidden")}const h=document.querySelector(".form"),O=document.querySelector(".load-btn, .load-btn-hidden");let c="",i=1;h.addEventListener("submit",async o=>{if(o.preventDefault(),c=h.elements["search-text"].value.trim(),i=1,!c){l.warning({title:"Warning",message:"Please enter a search query",timeout:3e3,position:"topRight"});return}M(),L(),b();try{const e=await g(c,i);if(d(),!e.hits||e.hits.length===0){l.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",timeout:4e3,position:"topRight"});return}f(e.hits),e.totalHits>i*u&&v(),l.success({title:"Success",message:`Found ${e.hits.length} images`,timeout:3e3,position:"topRight"})}catch(e){console.log(e),l.error({title:"Error",message:"Something went wrong while fetching images.",position:"topRight"})}});O.addEventListener("click",async()=>{i+=1,b();try{const o=await g(c,i),e=Math.ceil(o.totalHits/u);if(d(),!o.hits||o.hits.length===0||i>=e){L(),l.info({title:"End",message:"We're sorry, but you've reached the end of search results",timeout:3e3,position:"topRight"});return}f(o.hits);const s=document.querySelector(".gallery-item");if(s){const{height:a}=s.getBoundingClientRect();window.scrollBy({top:a*3,behavior:"smooth"})}}catch(o){console.log(o),d()}});
//# sourceMappingURL=index.js.map
