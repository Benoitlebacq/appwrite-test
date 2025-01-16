import Image from 'next/image';

import ClientCard from '@/app/components/ClientCard';
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

    return (
      <>
        <div className="flex align-center space-between flex-wrap gap-4">
          {clients.map((client: Client) => {
            return <ClientCard client={client} key={client.$id} />;
          })}
        </div>
        <div className="mt-8 flex justify-end gap-2">
          <span>Ajoutez un client</span>
          <Image src="/icons/add.svg" alt="alt" width={25} height={25} className="cursor-pointer" />
        </div>
      </>
    );
  } catch (error) {
    console.error('Clients Fetch Error:', error);
    return <div>Erreur de chargement des clients</div>;
  }
}
