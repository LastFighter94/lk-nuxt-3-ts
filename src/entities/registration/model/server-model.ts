export type registerUserRequestBody = {
  phone: string;
  roistat: null | string;
  type: string;
};

export type registerUserResponse = {
  error: string;
  statusCode: number;
} | null;

//

export type confirmationUserRequest = {
  phone: string;
  code: string;
};

export type confirmationUserResponse = {
  clientID: number;
  token: string;
};
