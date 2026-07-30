import { apiClient } from '@/shared/api/axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/dashboard/v1/auth/login', credentials);
  return response.data;
}
