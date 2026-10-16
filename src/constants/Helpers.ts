import { AES, Utf8 } from 'crypto-es';

import LocalStorageManager from '@/managers/LocalStorageManger';

import { LocalStorageKeys } from '@/constants/Constants';

const secretKey = 'we are the best of the best';

export const updateObject = <T extends object, U extends object>(
  oldObject: T,
  UpdatedValues: U
) => ({
  ...oldObject,
  ...UpdatedValues,
});

export const decodeToken = (token: string) => JSON.parse(atob(token.split('.')[1]));

export const encryptData = (data: any) => {
  return AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (data: any) => {
  const bytes = AES.decrypt(data, secretKey);
  return JSON.parse(bytes.toString(Utf8));
};

export const isAuthenticated = () => LocalStorageManager.getItem(LocalStorageKeys.TOKEN);
