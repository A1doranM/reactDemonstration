import axios from 'axios';
import { UserType } from '../../types/types';

export const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    'API-KEY': '849246fb-1531-4da7-b81e-ddd60f9def36'
  },
});

export enum ResultCodesEnum {
  SUCCESS = 0,
  ERROR = 1,
}

export enum ResultCodesEnumWithCaptcha {
  CAPTCHA_REQUIRED = 10,
}

export type GetItemsType = {
  items: Array<UserType>,
  totalCount: number,
  error: string | null
};
export type ResponseType<T = {}, RC = ResultCodesEnum> = {
    data: T,
    messages: Array<string>,
    resultCode: RC
}