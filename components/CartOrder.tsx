import {
     foodDecreased,
     foodDeleted,
     foodIncreased,
     orderDeleted,
} from '@/app/Redux/cartSlice/cartSlice';
import { useAppDispatch } from '@/app/Redux/hooks';
import { CartOrderType } from '@/utils/types';
import Button from '@mui/material/Button/Button';
import React from 'react';

type Props = {
     order: CartOrderType;
     bookTheTable: (orderId: string) => void;
};

export default function CartOrder({ order, bookTheTable }: Props) {
     const dispatch = useAppDispatch();

     function deleteHandler() {
          dispatch(orderDeleted(order.id));
     }

     function foodIncreaseHandler(id: string) {
          dispatch(foodIncreased({ orderId: order.id, foodId: id }));
     }

     function foodDecreaseHandler(id: string) {
          dispatch(foodDecreased({ orderId: order.id, foodId: id }));
     }

     function foodDeleteHandler(id: string) {
          dispatch(foodDeleted({ foodId: id, orderId: order.id }));
     }

     return (
          <div className='table_cart bg-blue-50 p-5 h-fit mb-5'>
               <div className='flex justify-between'>
                    <h3>{order.table.tableName}</h3>
                    <p className='date_declare '>
                         {order.orderDate.year}-{order.orderDate.month}-
                         {order.orderDate.day}
                    </p>
                    <button
                         className='hover:text-red-600'
                         onClick={deleteHandler}
                    >
                         X
                    </button>
               </div>
               <div className='divider mt-3 w-[90%] h-[1px] bg-black mx-auto rounded-xl'></div>
               <div className='food_list_cart py-5 px-10 space-y-2'>
                    {order.foodList?.map(item => (
                         <div
                              className='flex'
                              key={`${order.id}-${item.food._id}`}
                         >
                              <h2>نام غذا: {item.food.foodName}</h2>
                              <h2 className='mr-10'>
                                   تعداد غذا: {item.amount}
                              </h2>
                              <div className='buttons mr-auto'>
                                   <button
                                        onClick={() =>
                                             foodIncreaseHandler(item.food._id)
                                        }
                                        className='mx-3 bg-green-300 p-2 rounded-md'
                                   >
                                        اضافه کردن
                                   </button>
                                   <button
                                        onClick={() =>
                                             foodDecreaseHandler(item.food._id)
                                        }
                                        className='mx-3 bg-red-300 p-2 rounded-md'
                                   >
                                        کم کردن
                                   </button>
                                   <button
                                        onClick={() =>
                                             foodDeleteHandler(item.food._id)
                                        }
                                        className='mx-3 bg-gray-700 text-white p-2 rounded-md'
                                   >
                                        حذف غذا
                                   </button>
                              </div>
                         </div>
                    ))}
               </div>
               <Button
                    onClick={() => bookTheTable(order.id)}
                    variant='contained'
                    sx={{ fontFamily: 'Vazirmatn' }}
                    className=' bg-slate-800  hover:bg-gray-900 w-48 text-white h-14 mx-auto block'>
                    ثبت سفارش
               </Button>
          </div>
     );
}
