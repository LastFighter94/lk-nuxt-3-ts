// import router from './src/router/router';

import pkg from './package.json';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/device'],
  typescript: {
    typeCheck: true,
  },
  devServer: {
    host: '0.0.0.0',
  },
  srcDir: 'src/',
  // hooks: {
  //   // eslint-disable-next-line func-names
  //   'pages:extend': function (pages) {
  //     router(pages);
  //   },
  // },
  runtimeConfig: {
    public: {
      apiInternalUrl: process.env.NUXT_API_INTERNAL_URL || '',
      clientType: parseInt(process.env.CLIENT_TYPE || '0', 10),
      locale: process.env.LOCALE || '',
      phoneCode: process.env.PHONECODE || '',
      title: process.env.TITLE || '',
      logo: process.env.LOGO || '',
      appType: process.env.APP_TYPE || '',
      appKey: process.env.APP_KEY || '',
      version: pkg.version,
    },
  },
  css: [`~/assets/css/main.scss`],
  vite: {
    build: {
      // если сделать false тогда весь css сайта превращается в 1 css файл
      cssCodeSplit: true,
      rollupOptions: {
        // таким образом собираем все js файлы используемые на странице - в 1 chunk
        output: {
          // target ~250KB per chunk in an ideal world
          experimentalMinChunkSize: 250 * 1024,

          manualChunks: (id) => {
            function getPageChunk(pageUrl: string) {
              if (pageUrl.includes('src/pages')) {
                const parts = pageUrl.split('/');
                const folderIndex = parts.indexOf('pages');
                if (folderIndex + 2 < parts.length) {
                  const pageGroup = parts[folderIndex + 1];
                  return `chunk-pg-${pageGroup}`;
                }
                return 'chunk-pg-misc';
              }
              return undefined; // Явное возвращение значения, чтобы ESLint не ругался
            }

            // need to avoid touching non-entrypoint files, otherwise it breaks bundling
            // because imports aren't idempotent
            if (
              !id.includes('node_modules') &&
              !id.startsWith('virtual:') &&
              !id.includes('src') &&
              !id.includes('assets')
            ) {
              // merge pages/foo/* as chunk-pg-foo, pages/bar/* as chunk-pg-bar, etc.
              // then merge pages/* (ie no subfolder) into chunk-pg-misc
              if (id.includes('src/pages')) {
                return getPageChunk(id);
              }
            }

            return undefined;
          },
        },
      },
    },
    optimizeDeps: {
      include: ['form-data', 'axios'],
    },
    ssr: {
      noExternal: ['form-data', 'axios'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/css/_colors.scss" as *;
            @use "~/assets/css/_fonts.scss" as *;
            @use "~/assets/css/_media.scss" as *;
            @use "~/assets/css/_mixins.scss" as *;`,
        },
      },
    },
  },
  nitro: {
    // это апи для локального теста (когда юзаем npm run start)
    // routeRules: {
    //   '/api/': {
    //     proxy: { to: `${process.env.NUXT_API_INTERNAL_URL}/api/},
    //     // proxy: { to:https://flex-stage-client-gateway.366.ru/api/**},
    //   },
    // },
    devProxy: {
      '/api': {
        target: `${process.env.NUXT_API_INTERNAL_URL}/api`,
        changeOrigin: true,
        // rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  },
});
