document.addEventListener('DOMContentLoaded', () => {
  const images = [...document.querySelectorAll('.gallery-img')];
  if (!images.length) return;

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Просмотр работы');
  box.innerHTML = '<button class="lightbox-close" aria-label="Закрыть">×</button><button class="lightbox-prev" aria-label="Предыдущая работа">‹</button><img alt=""><button class="lightbox-next" aria-label="Следующая работа">›</button><div class="lightbox-caption"></div>';
  document.body.appendChild(box);

  const preview = box.querySelector('img');
  const caption = box.querySelector('.lightbox-caption');
  const closeButton = box.querySelector('.lightbox-close');
  const prevButton = box.querySelector('.lightbox-prev');
  const nextButton = box.querySelector('.lightbox-next');
  let current = 0;
  let previousFocus = null;

  const render = (index) => {
    current = (index + images.length) % images.length;
    const image = images[current];
    preview.src = image.currentSrc || image.src;
    preview.alt = image.alt;
    caption.textContent = `${current + 1} / ${images.length} · ${image.alt}`;
  };

  const open = (index) => {
    previousFocus = document.activeElement;
    render(index);
    box.classList.add('open');
    document.body.classList.add('no-scroll');
    closeButton.focus();
  };

  const close = () => {
    box.classList.remove('open');
    document.body.classList.remove('no-scroll');
    preview.removeAttribute('src');
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  };

  images.forEach((image, index) => {
    image.setAttribute('tabindex', '0');
    image.addEventListener('click', () => open(index));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(index);
      }
    });
  });

  closeButton.addEventListener('click', close);
  prevButton.addEventListener('click', () => render(current - 1));
  nextButton.addEventListener('click', () => render(current + 1));
  box.addEventListener('click', (event) => { if (event.target === box) close(); });

  document.addEventListener('keydown', (event) => {
    if (!box.classList.contains('open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') render(current - 1);
    if (event.key === 'ArrowRight') render(current + 1);
  });
});
