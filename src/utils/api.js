const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // only redirect if there was a token AND it was rejected (Expired/Invalid)
  if (response.status === 401 && token) {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = '/login';
    throw new Error('Unauthorized session expired');
  }

  // If it's 401 but no token (like on the login page), just process the error normally
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || `HTTP error status: ${response.status}`);
  }

  return response.json();
};

export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  expenses: {
    base: '/expenses',
    detail: (id) => `/expenses/${id}`,
  },
  dashboard: {
    summary: '/dashboard/summary',
  }
};