import { redirect } from 'next/navigation';

import auth from '@/auth';

export default async function Login({ searchParams }: { searchParams: { [key: string]: string } }) {
  const error = searchParams?.error; // Récupérer le paramètre `error` depuis l'URL

  const user = await auth.getUser();
  if (user) redirect('/');
  return (
    <div>
      <form action={auth.createSession} id="login-form">
        <h3>Login</h3>
        <p>Enter your information to create an account</p>

        {error === 'invalid_credentials' && (
          <p className="text-red-600">Utilisateur non trouvé. Vérifiez vos identifiants.</p>
        )}
        {error === 'unexpected' && (
          <p className="text-red-600">Une erreur inattendue s'est produite. Veuillez réessayer.</p>
        )}

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            defaultValue="blebacq@upman-consulting.com"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            defaultValue="password123"
          />
        </div>
        <div>
          <input type="submit" value={'Login'} />
        </div>
      </form>
    </div>
  );
}
