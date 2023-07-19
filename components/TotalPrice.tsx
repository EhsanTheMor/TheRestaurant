'use client'

import { useAppSelector } from '@/app/Redux/hooks'
import FormControl from '@mui/material/FormControl/FormControl'
import InputLabel from '@mui/material/InputLabel/InputLabel'
import MenuItem from '@mui/material/MenuItem/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select/Select'
import { selectFoodCalculatedPriceForOrder, selectTableCalculatedPrice, selectTotalPrice } from '@/app/Redux/cartSlice/cartSlice'

type Props = {
     activeOrderId: string | undefined;
     setActiveOrderId: (id: string) => void;
}

export default function TotalPrice({ activeOrderId, setActiveOrderId }: Props) {
     const orders = useAppSelector(state => state.cart.orders)

     const intl = new Intl.NumberFormat('fa-IR')

     const tablePriceSelector = selectTableCalculatedPrice(orders, activeOrderId);
     const foodPriceSelector = selectFoodCalculatedPriceForOrder(orders, activeOrderId);
     const totalPriceSelector = selectTotalPrice(orders, activeOrderId);

     return (
          <div className='bg-blue-50 p-5 flex flex-col h-[510px]'>

               <FormControl className='col-span-4' fullWidth>
                    <InputLabel id='demo-simple-select-label'>
                         میز مورد نظر
                    </InputLabel>
                    <Select
                         sx={{ fontFamily: 'Vazirmatn' }}
                         labelId='demo-simple-select-label'
                         id='demo-simple-select'
                         value={activeOrderId || ''}
                         label='میز مورد نظر'
                         onChange={(e: SelectChangeEvent) =>
                              setActiveOrderId(e.target.value)
                         }
                    >
                         {orders.length > 0 &&
                              orders.map(order => (
                                   <MenuItem
                                        sx={{ fontFamily: 'Vazirmatn' }}
                                        key={order.id}
                                        value={order.id}
                                   >
                                        {order.table.tableName}  {' '}
                                        {`${order.orderDate.day}-${order.orderDate.month}`}
                                   </MenuItem>
                              ))}
                    </Select>
               </FormControl>

               <div className="flex flex-col flex-1">
                    {tablePriceSelector !== -1 && (
                         <>
                              <div className='mt-5 flex justify-between'>
                                   <span>هزینه میز:</span>
                                   <span>{`${intl.format(tablePriceSelector)} تومان`}</span>
                              </div>
                              <h1></h1>
                         </>
                    )}


                    <div className='flex-1'>
                         {foodPriceSelector !== -1 &&
                              (
                                   <div className='mt-5 space-y-2'>
                                        <span>هزینه غذا:</span>

                                        {foodPriceSelector.map(
                                             (item, index) => (
                                                  <div key={index} className='flex justify-between pr-5'>
                                                       <span>{item.foodName}</span>
                                                       <span>{`${intl.format(item.price)} تومان`}</span>
                                                  </div>
                                             )
                                        )
                                        }
                                   </div>
                              )
                         }


                    </div>


                    {tablePriceSelector !== -1 && (
                         <div className='h-[1px] bg-black mt-5'></div>
                    )}

                    {totalPriceSelector !== -1 && (
                         <>
                              <div className='mt-5 flex justify-between'>
                                   <span>هزینه کل:</span>
                                   <span>{`${intl.format(totalPriceSelector)} تومان`}</span>
                              </div>
                              <h1>{ }</h1>
                         </>
                    )}
               </div>
          </div>
     )
}
