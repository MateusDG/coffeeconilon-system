import api from './api';

interface LoginResponse { access_token: string }

export const loginRequest = async (email: string, password: string): Promise<string> => {
  const response = await api.post<LoginResponse>('/auth/login', { username: email, password });
  return response.data.access_token;
};