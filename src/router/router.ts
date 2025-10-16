// import type { NuxtPage } from '@nuxt/schema';
//
// export default function router(pages: NuxtPage[]) {
//   // нужно именно так, чтобы изменить оригинальный массив выше
//   pages.splice(0, pages.length);
//
//   // push тоже мутирует оригинальный массив
//   pages.push({
//     name: 'home',
//     path: '/',
//     file: '@/pages/home',
//   });
// }

// если мы захотим сделать вложенные components в pages - делаем то, что выше + в nuxt.config

// import router from './src/router/router';
// hooks: {
//   // eslint-disable-next-line func-names
//   'pages:extend': function (pages) {
//     router(pages);
//   },
// }
