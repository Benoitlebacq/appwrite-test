export type Client = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  accessToken: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
};

export type ClientCardProps = {
  client: Client;
};
