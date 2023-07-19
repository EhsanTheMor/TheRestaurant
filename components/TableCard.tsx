import { TableType } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import TableCardMUIButton from './TableCardMUIButton';

type Props = {
     item: TableType;
};

export default function TableCard({ item }: Props) {
     return (
          <div className='table_card_container'>
               <div className='table_card_image_container'>
                    <Image
                         src={`/tables/${item.mapUrl}`}
                         alt='place holder'
                         fill={true}
                    />
               </div>
               <div className='p-5 grid grid-rows-4 flex-1'>
                    <h2 className='flex gap-2 items-center text-lg'>
                         <span>{item.tableName}</span>
                    </h2>
                    <h2 className='flex gap-2 items-center text-lg'>
                         <span>{`ظرفیت:`}</span>
                         <span>{` ${item.seatingCapacity} نفر `}</span>
                    </h2>
                    <h2 className='flex gap-2 items-center text-lg'>
                         <span>{`جنس:  `}</span>
                         <span>{`صندلی چوبی`}</span>
                    </h2>
                    <Link
                         href={`table/${item._id}`}
                         className='w-full text-center mt-2 hover:cursor-pointer rounded-sm block h-12'
                    >
                         <TableCardMUIButton />
                    </Link>
               </div>
          </div>
     );
}
