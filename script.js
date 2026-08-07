document.addEventListener('DOMContentLoaded',()=>{
  const images=document.querySelectorAll('.gallery-img');
  if(!images.length)return;
  const box=document.createElement('div');
  box.className='lightbox';
  box.setAttribute('role','dialog');
  box.setAttribute('aria-modal','true');
  box.innerHTML='<button class="lightbox-close" aria-label="Закрыть">×</button><img alt=""><div class="lightbox-caption"></div>';
  document.body.appendChild(box);
  const preview=box.querySelector('img');
  const caption=box.querySelector('.lightbox-caption');
  const close=()=>box.classList.remove('open');
  images.forEach(img=>img.addEventListener('click',()=>{
    preview.src=img.currentSrc||img.src;
    preview.alt=img.alt;
    caption.textContent=img.alt;
    box.classList.add('open');
  }));
  box.querySelector('.lightbox-close').addEventListener('click',close);
  box.addEventListener('click',e=>{if(e.target===box)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
});
