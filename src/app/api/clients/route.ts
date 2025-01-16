import { cookies } from 'next/headers';

import { createSessionClient } from '@/appwrite/config';

export async function GET(_request: Request): Promise<Response> {
  try {
    // Résoudre la promesse retournée par cookies()
    const sessionCookies = await cookies();
    const sessionCookie = sessionCookies.get('session');

    // Vérifier si le cookie existe
    if (!sessionCookie || !sessionCookie.value) {
      throw new Error('Session cookie is missing or invalid.');
    }

    const { databases } = await createSessionClient(sessionCookie.value);

    // Vérifier que les variables d'environnement nécessaires sont définies
    const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_COLLECTION_CLIENTS;

    if (!databaseId || !collectionId) {
      throw new Error('Database ID or Collection ID is not set in environment variables.');
    }

    const { documents: clients, total } = await databases.listDocuments(databaseId, collectionId);

    return new Response(JSON.stringify({ clients, total }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('ERROR', error);

    return new Response(
      JSON.stringify({ message: 'Access DENIED!', error: (error as Error).message }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
