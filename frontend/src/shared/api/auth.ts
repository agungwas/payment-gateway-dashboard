export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  const response = await fetch(`${baseURL}/dashboard/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to login');
  }

  return response.json();
}
