import { useFetchUserQuery } from '@/app/Redux/userApiSlice/userApiSlice'
import React from 'react'

const jalaali = require('jalaali-js')

type Props = {
     id: string
}

export default function AccountOrderList({ id }: Props) {

     const { data, isError, isFetching } = useFetchUserQuery(id)
     const intlDate = Intl.DateTimeFormat('fa-IR');

     function turnDateToFormattedDate(year: number, month: number, day: number) {
          const jalaaliDate = jalaali.toGregorian(year, month, day);

          const date = new Date(
               jalaaliDate.gy,
               jalaaliDate.gm - 1,
               jalaaliDate.gd,
          )
          return intlDate.format(date)
     }

     return (
          <div className='h-full border-2 border-[#1124a0] w-full rounded-[50px] flex flex-col p-10 gap-5'>
               {isFetching && (<h1>Is loeading</h1>)}
               {isError && (<h1>Some Thing is Wrong Here</h1>)}
               {
                    data && data.user.userOrders.map(order => (
                         <div key={order._id} className='w-full flex justify-around item-center  bg-gradient-to-r from-blue-600 to-green-400 text-white py-5 rounded-lg'>
                              {order._id}
                              <h1> تاریخ شفارش: {turnDateToFormattedDate(
                                   order.orderDate.year,
                                   order.orderDate.month,
                                   order.orderDate.day
                              )}</h1>
                         </div>
                    ))
               }
          </div>
     )
}
