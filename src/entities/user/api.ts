import { axios } from '@/app/api';
import { serverLog } from '@/shared/lib/server-log.ts';

export default {
  getUserInfo,
};

const userEndpoints = {
  getUserInfo: () => axios.get<any>(`/api/v3/user/getinfo/`),
};

async function getUserInfo(): Promise<any | null> {
  try {
    const { data } = await userEndpoints.getUserInfo();

    return data;
  } catch (e) {
    serverLog(e, true);

    return null;
  }
}
