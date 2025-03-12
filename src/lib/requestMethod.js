import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Public Request Instance (With Basic Auth)
export const publicRequest = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME,
    password: process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD,
  },
});

// Helper function to retrieve a cookie value by name
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// User Request Instance (With Access Token)
const userRequest = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization Header to User Request using token from cookies
userRequest.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    console.log('Current Token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { userRequest };
