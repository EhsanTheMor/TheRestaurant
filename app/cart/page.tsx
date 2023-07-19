'use client';

import Nav from '@/components/Nav';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import CartOrder from '@/components/CartOrder';
import Protected from '@/components/Protected';
import TotalPrice from '@/components/TotalPrice';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { orderDeleted, selectTotalPrice } from '../Redux/cartSlice/cartSlice';

export default function Page() {
     const orders = useAppSelector(state => state.cart.orders);
     const dispatch = useAppDispatch();
     console.log(orders)

     const { data: session } = useSession()

     const [activeOrderId, setActiveOrderId] = useState<string>()

     useEffect(() => {
          if (orders.length > 0) {
               setActiveOrderId(orders[0].id)
          }
     }, [])

     const totalPriceSelector = selectTotalPrice(orders, activeOrderId)


     //sends the request to book the table.
     async function bookTheTable(orderId: string) {
          if (!session) return
          const order = orders.filter(item => item.id === orderId)[0]

          const newOrder = {
               tableID: order.table._id,
               userID: session.user.id,
               foodList: order.foodList.map(food => ({ amount: food.amount, food: food.food._id })),
               totalPrice: totalPriceSelector,
               orderDate: order.orderDate,
               orderTime: order.orderTime,
               discountApplied: 0,
          }

          console.log(newOrder)
          try {
               const res = await axios.post('/api/order', newOrder)
               dispatch(orderDeleted(order.id))
          } catch (err) {
               console.log(err)
          }

     }

     return (
          <Protected>
               <div className='h-screen flex flex-col'>
                    <Nav />
                    <div className='rest bg-gray-200 p-10 flex-1'>
                         <div className='inner_cart_container overflow-auto p-5 h-full bg-white w-full m-auto  grid grid-cols-4 gap-5'>

                              {orders.length !== 0 ? (
                                   <>
                                        <div className='table_cart_container h-full col-span-3 flex flex-col gap-5 justify-between'>
                                             {orders.map(order => (
                                                  <CartOrder
                                                       bookTheTable={bookTheTable}
                                                       order={order}
                                                       key={order.id}
                                                  />
                                             ))}

                                        </div>
                                        <TotalPrice
                                             activeOrderId={activeOrderId}
                                             setActiveOrderId={setActiveOrderId}
                                        />
                                   </>
                              ) : (
                                   <h1 className='text-center text-2xl col-span-4'>
                                        شما سفاشی برای خرید ندارید
                                   </h1>
                              )}

                         </div>
                    </div>
               </div>
          </Protected >
     );
}

