export function isBrowser() {
  return typeof window !== 'undefined';
}

export function isPseudoMobile() {
  return isBrowser() && window.innerWidth <= 768;
}

export function isPseudoMobileOrTablet() {
  return isBrowser() && window.innerWidth <= 1024;
}
