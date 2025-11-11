import { axios } from '@/app/api';
import { serverLog } from '@/shared/lib/server-log.ts';
import {
  type confirmationUserRequest,
  type confirmationUserResponse,
  type registerUserRequestBody,
  type registerUserResponse,
} from '~/entities/registration/model';

export default {
  registerUser,
  confirmationUser,
};

const registrationEndpoints = {
  registerUser: (req: registerUserRequestBody) =>
    axios.post<registerUserResponse>(`/api/v3/auth/registration/`, req),
  confirmationUser: (req: confirmationUserRequest) =>
    axios.post<confirmationUserResponse>(`/api/v3/auth/confirmation/`, req),
};

async function registerUser(
  phone: string | number,
): Promise<registerUserResponse | null> {
  try {
    const { data } = await registrationEndpoints.registerUser({
      phone: (process.env.phonecode ?? '7') + phone,
      type: process.env.clienttype ?? '2',
      roistat: null,
    });

    return data;
  } catch (e) {
    serverLog(e, true);

    return null;
  }
}

async function confirmationUser(
  req: confirmationUserRequest,
): Promise<confirmationUserResponse | null> {
  try {
    const { data } = await registrationEndpoints.confirmationUser(req);

    return data;
  } catch (e) {
    serverLog(e, true);

    return null;
  }
}
