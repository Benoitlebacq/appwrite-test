import { Account, Client, Databases } from 'node-appwrite';

const createAdminClient = async () => {
  // Ce client a des permissions basées sur sa clef API
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
    .setKey(process.env.NEXT_PUBLIC_API_KEY!);

  return {
    get account() {
      return new Account(client);
    },

    get databases() {
      return new Databases(client);
    },
  };
};

const createSessionClient = async (session: any) => {
  // Ce client a des permissions basées sur sa session
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!);

  if (session) {
    client.setSession(session);
  }

  return {
    get account() {
      return new Account(client);
    },

    get databases() {
      return new Databases(client);
    },
  };
};

export { createAdminClient, createSessionClient };
