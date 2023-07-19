import Nav from '@/components/Nav';
import React from 'react';

import '@/style/tabledescription.css';
import TimeTable from '@/components/TimeTable';
import Image from 'next/image';
import axios from 'axios';
import { TableType } from '@/utils/types';

type Props = {
     params: { id: string };
};

export default async function page({ params: { id } }: Props) {
     const tableRes = await axios.get(`http://localhost:3000/api/table/${id}`);
     const table: TableType = tableRes.data.table;
     const tableTimes: number[] = tableRes.data.tableTimes;

     const classList = {
          tablePageContainer: 'table_page_container h-screen flex flex-col',
     };

     return (
          <div>
               <div className={classList.tablePageContainer}>

                    <Nav />

                    <div className='table-description flex-1 bg-gray-200 flex'>

                         <div className='table_description flex-1 p-10'>

                              <div className='table_inner_description flex justify-evenly items-center'>
                                   <h2 className='text-2xl font-semibold'>
                                        {table.tableName}
                                   </h2>
                                   <h2 className='text-2xl font-semibold'>
                                        <span>{`ظرفیت:  `}</span>
                                        <span>{`${table.seatingCapacity} نفر`}</span>
                                   </h2>
                                   <h2 className='text-2xl font-semibold'>
                                        <span>{`جنس:  `}</span>
                                        <span>{`صندلی چوبی`}</span>
                                   </h2>
                              </div>

                              <TimeTable
                                   table={table}
                                   tableTimes={tableTimes}
                              />

                         </div>

                         <div className='table_page_image_container w-1/3 p-10 flex flex-col justify-end'>
                              <div className='map_container relative h-1/2'>
                                   <Image
                                        src={`/tables/${table.mapUrl}`}
                                        fill={true}
                                        alt='table map'
                                   />
                              </div>
                         </div>

                    </div>
               </div>
          </div>
     );
}
