import { Client } from '@/models/client.models';

import axiosInstance from '../../../lib/axiosInstance';

export default async function ClientList() {
  try {
    const response = await axiosInstance({
      url: 'http://localhost:3000/api/clients',
      method: 'get',
      isServerSide: true,
    });
    const clients = response.data.clients;

    return <div>{clients.map((client: Client) => client.company)}</div>;
  } catch (error) {
    console.error('Clients Fetch Error:', error);
    return <div>Erreur de chargement des clients</div>;
  }
}
