import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import auth from './auth';

export async function middleware(request: NextRequest) {
  // Créer une copie modifiable de la requête
  const response = NextResponse.next();

  // Configuration CORS
  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  // Gérer les requêtes OPTIONS
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cookie',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  }

  // Vérification de l'authentification
  try {
    const sessionCookie = request.cookies.get('session');

    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Vérifiez la validité de la session avec votre méthode d'authentification
    const user = await auth.getUser();

    if (!user) {
      // Invalider le cookie si l'utilisateur n'est pas trouvé
      response.cookies.delete('session');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return response;
  } catch (error) {
    console.error('Middleware Authentication Error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/'], // Ajustez selon vos besoins
};
