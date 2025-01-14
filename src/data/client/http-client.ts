import type { SearchParamOptions } from '@/types';
import axios from 'axios';
import Router from 'next/router';
import { getAuthToken, removeAuthToken } from '../../utils/supabase/token.utils';

// TODO: Due to windows timeout was set to 15000
const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  timeout: 150000000,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Change request data/error here
Axios.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    //@ts-ignore
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ''}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403) ||
      (error.response &&
        error.response.data.message === 'PIXER_ERROR.NOT_AUTHORIZED')
    ) {
      // removeAuthToken();
      Router.reload();
    }
    return Promise.reject(error);
  }
);

export class HttpClient {
  static async get<T>(url: string, params?: unknown) {
    const response = await Axios.get<T>(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const response = await Axios.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await Axios.put<T>(url, data);
    return response.data;
  }

  static async delete<T>(url: string) {
    const response = await Axios.delete<T>(url);
    return response.data;
  }

  static formatSearchParams(params: Partial<SearchParamOptions>) {
    return Object.entries(params)
      .filter(([, value]) => Boolean(value))
      .map(([k, v]) =>
        ['type', 'categories', 'tags', 'author', 'manufacturer'].includes(k)
          ? `${k}.slug:${v}`
          : `${k}:${v}`
      )
      .join(';');
  }
}
