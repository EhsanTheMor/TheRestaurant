import React from 'react';
import TableCard from './TableCard';

import '@/style/tablemenu.css';
import { TableType } from '@/utils/types';

async function getData(): Promise<TableType[]> {
     const res = await fetch('http://localhost:3000/api/table', {
          next: { revalidate: 60 },
     });
     const tablesData = await res.json();
     const tables: TableType[] = tablesData.tables.map(
          (item: any): TableType => {
               const newTable: TableType = {
                    _id: item._id,
                    tableName: item.tableName,
                    availability: item.availability,
                    seatingCapacity: item.seatingCapacity,
                    specialFeatures: item.specialFeatures,
                    mapUrl: item.mapUrl,
                    prices: item.prices
               };
               return newTable;
          },
     );

     return tables;
}

export default async function TableMenu() {
     const tables = await getData();

     return (
          <div id='table_menu' className='table_menu '>
               <div className='text-white bg-blue-600 -mx-10 p-10 py-5 mb-5'>
                    <h1 className=' font-extrabold text-2xl'>لیست میزها:</h1>
                    <p className='table_menu_header'>منوی زیر شامل میزهای در حال ارائه خدمت به مشتریان گرامی می‌باشد. با انتخاب هر کدام می‌توانید نسبت به سفارش آن میز اقدام نمایید.</p>
               </div>
               <div className='inside_table_menu_container'>
                    {tables.map(table => (
                         <TableCard item={table} key={table._id} />
                    ))}
               </div>
          </div>
     );
}
