import type { NuxtPage } from '@nuxt/schema';

export default function router(pages: NuxtPage[]) {
  // нужно именно так, чтобы изменить оригинальный массив выше
  pages.splice(0, pages.length);

  // push тоже мутирует оригинальный массив
  pages.push({
    name: 'home',
    path: '/',
    file: '@/pages/home',
  });
}
