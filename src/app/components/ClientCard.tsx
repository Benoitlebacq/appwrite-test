import Image from 'next/image';
import { FC } from 'react';

import { ClientCardProps } from '@/models/client.models';

const ClientCard: FC<ClientCardProps> = ({ client }) => {
  return (
    <div className="border border-gray-100 rounded-md p-8 w-64 h-64 flex flex-col justify-between shadow-md">
      <div className="flex gap-1 justify-between">
        <h2>{client.company}</h2>
        <Image src="/icons/edit.svg" alt="alt" width={18} height={18} className="cursor-pointer" />
      </div>
      <div className="">
        <span className="text-sm text-gray-600">contact :</span>
        <div className="flex gap-1 flex-col">
          <div className="flex gap-1 text-gray-800 text-sm">
            <span>{client.firstName}</span>
            <span>{client.lastName}</span>
          </div>
          <span>{client.email}</span>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
