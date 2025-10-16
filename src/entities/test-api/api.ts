import { axios } from '@/app/api';
import { serverLog } from '@/shared/lib/server-log.ts';

export default {
  testPoint,
};

type testRequest = {
  phone: string;
  roistat: null | string;
  type: string;
};

type testResponse = {
  error: string;
  statusCode: number;
};

type pointResponse = {
  error: string;
  statusCode: number;
};

const testoviTest = {
  testPoint: (req: testRequest) =>
    axios.post<testResponse>(`/api/v3/auth/registration/`, req),
};

async function testPoint(phone: number): Promise<pointResponse | null> {
  try {
    const { data } = await testoviTest.testPoint({
      phone: (process.env.phonecode ?? '7') + phone,
      type: process.env.clienttype ?? '2',
      roistat: null,
    });

    return data;
  } catch (e) {
    // :TODO Error Handler
    // eslint-disable-next-line
    serverLog(e, true);

    return null;
  }
}
