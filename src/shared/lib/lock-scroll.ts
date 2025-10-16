declare global {
  interface Window {
    scrollLockCounter: number;
  }
}

// Функции для блокировки скролла тега body. Используется при открывании всклывающих окон
let scrollPosition = 0;

export const lockBodyScroll = () => {
  if (window.scrollLockCounter) {
    window.scrollLockCounter += 1;
    return;
  }
  window.scrollLockCounter = 1;

  // Считаем размер отступа справа от страницы - там, где был скроллбар.
  const offset = `${window.innerWidth - document.documentElement.clientWidth}px`;

  scrollPosition = window.pageYOffset;

  document.body.classList.add('lock-scroll');
  document.body.style.top = `-${scrollPosition}px`;

  document.body.style.marginRight = offset;

  document.body.setAttribute('data-scroll-locked', 'true');
  document.body.setAttribute('data-scroll-position', String(scrollPosition));
};

export const unlockBodyScroll = () => {
  if (window.scrollLockCounter > 1) {
    window.scrollLockCounter -= 1;
    return;
  }
  if (window.scrollLockCounter === 0) {
    return;
  }
  window.scrollLockCounter = 0;

  document.body.classList.remove('lock-scroll');
  document.body.style.marginRight = '0';

  document.body.removeAttribute('data-scroll-locked');
  document.body.removeAttribute('data-scroll-position');
  document.body.style.removeProperty('top');

  window.scrollTo(0, scrollPosition);
};
