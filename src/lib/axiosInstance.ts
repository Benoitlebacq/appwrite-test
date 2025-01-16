import axios, { AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

const axiosInstance = async ({
  url,
  method,
  data,
  isServerSide = true,
}: {
  url: string;
  method: 'get' | 'post';
  data?: any;
  isServerSide?: boolean;
}) => {
  try {
    const config: AxiosRequestConfig = {
      url,
      method,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Gestion des cookies côté serveur
    if (isServerSide) {
      try {
        const serverCookies = await cookies();
        const sessionCookie = serverCookies.get('session');

        if (sessionCookie) {
          config.headers = {
            ...config.headers,
            Cookie: `session=${sessionCookie.value}`,
          };
        } else {
          console.warn('No session cookie found on server');
        }
      } catch (cookieError) {
        console.error('Error accessing server cookies:', cookieError);
      }
    }

    // Gestion des données pour les requêtes POST
    if (method === 'post' && data) {
      config.data = data;
    }

    console.log('Axios Request Config:', JSON.stringify(config, null, 2));

    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('Axios Instance Error:', error);

    // Log plus détaillé en cas d'erreur Axios
    if (axios.isAxiosError(error)) {
      console.error('Axios Error Details:', {
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
    }

    throw error;
  }
};

export default axiosInstance;
