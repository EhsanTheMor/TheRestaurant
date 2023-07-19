'use client';

import React from 'react';
import '../style/GoToStart.css'

export default function GoToStart() {
     const handleClick = (id: string) => {
          const el = document.getElementById(id)
          el?.scrollIntoView({ behavior: 'smooth' })
     }

     return (
          <div
               id='go-to-start'
               className='fixed bg-gray-800 left-10 bottom-10 w-20 h-20 rounded-full grid place-items-center font-bold text-white hover:cursor-pointer'
          >
               <a onClick={() => handleClick('navbar')} className=' hover:text-blue-500'>اصلی</a>
               <a onClick={() => handleClick('food_menu')} className='hidden hover:text-blue-500'>غذا</a>
               <a onClick={() => handleClick('table_menu')} className='hidden hover:text-blue-500'>میز</a>
          </div >
     );
}
