import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createAdminClient, createSessionClient } from './appwrite/config';
import { Auth } from './models/auth.models';

const auth: Auth = {
  user: null,
  sessionCookie: null,

  getUser: async () => {
    const sessionCookies = await cookies(); // Attendre la promesse
    auth.sessionCookie = sessionCookies.get('session') || null; // Si le cookie est inexistant, assigner null
    try {
      const { account } = await createSessionClient(auth?.sessionCookie?.value);
      auth.user = await account.get();
    } catch {
      auth.user = null;
      auth.sessionCookie = null;
    }
    console.log('auth.user :::::', auth.user);
    return auth.user;
  },

  createSession: async (formData: FormData) => {
    'use server';

    const data = Object.fromEntries(formData);
    const { email, password } = data as { email: string; password: string };

    try {
      const { account } = await createAdminClient();
      const session = await account.createEmailPasswordSession(email, password);

      const sessionCookies = await cookies();
      sessionCookies.set('session', session.secret, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        expires: new Date(session.expire),
        path: '/',
      });

      redirect('/');
    } catch (error) {
      // Vérifiez si c'est une erreur d'identifiants invalides
      if (error.type === 'user_invalid_credentials' || error.code === 401) {
        // Redirigez vers la page de connexion avec un message d'erreur
        redirect('/login?error=invalid_credentials');
      }

      // Gérez d'autres types d'erreurs si nécessaire
      console.error('Login Error:', error);
      redirect('/login?error=unexpected');
    }
  },

  deleteSession: async () => {
    'use server';
    const sessionCookies = await cookies(); // Attendre la promesse
    auth.sessionCookie = sessionCookies.get('session') || null; // Si le cookie est inexistant, assigner null
    try {
      if (auth.sessionCookie?.value) {
        // Assurez-vous que le cookie existe avant de l'utiliser
        const { account } = await createSessionClient(auth.sessionCookie.value);
        await account.deleteSession('current');
      }
    } catch (error) {
      console.error('Error deleting session:', error);
    }

    sessionCookies.delete('session');
    auth.user = null;
    auth.sessionCookie = null;
    redirect('/login');
  },
};

export default auth;
