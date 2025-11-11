import axios, { AxiosError } from 'axios';
import get from 'lodash/get';
import { sha256 } from 'js-sha256';
import { serverLog } from '@/shared/lib/server-log.ts';
import { useGlobalStore } from '~/entities/stores/globStore/store.ts';

// Предположим, sha256 функция доступна, импортируйте ее из нужного пакета

// Вам надо получить access к state и redirect. В обычном axios их нет.
// Поэтому передавайте их в функцию или используйте внешние механизмы.

const axiosInstance = axios.create({});
axiosInstance.defaults.baseURL = '/';
// axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(async (request) => {
  const globalStore = useGlobalStore();

  const config = useRuntimeConfig();

  const { data } = request;

  // const router = useRouter()

  const controller = new AbortController();
  request.signal = controller.signal;

  // Заголовки из вашего кода
  request.headers['moydevice-client-type'] = config.public.clientType;
  request.headers['moydevice-app-client'] = config.public.clientType;
  request.headers['moydevice-app-version'] = config.public.version;
  request.headers['moydevice-app-name'] = config.public.appType;

  if (globalStore.getTokenValue !== '') {
    request.headers.Authorization = globalStore.getTokenValue;
  } else {
    request.headers.Authorization = 'no auth token';
  }

  const errorTest = false;

  if (
    request.method === 'post' &&
    errorTest
    // (someState.forbidden || someState.delete_personal_data)
  ) {
    // Отменяем запрос
    controller.abort();

    // if (someState.delete_personal_data) {
    //   const router = useRouter()
    //   await router.push('/information-delete-profile')
    // }
    return Promise.reject(new axios.Cancel('Cancelled by client state'));
  }

  const hiddenData = data ? JSON.stringify(data) : '';
  const str =
    config.public.appType +
    config.public.version +
    hiddenData +
    config.public.appKey;

  request.headers['x-signature'] = sha256(str).toString();

  if (process.server) {
    request.baseURL = process.env.NUXT_API_INTERNAL_URL;
  }

  // Можно добавить здесь логику про токены, если нужно

  return request;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (get(error, 'config.skipErrors')) {
      return Promise.reject(error);
    }
    serverLog(error, true);
    return Promise.reject(error);
  },
);

export default axiosInstance;
