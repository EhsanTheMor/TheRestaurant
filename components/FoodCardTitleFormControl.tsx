'use client'

import { useAppSelector } from '@/app/Redux/hooks'
import FormControl from '@mui/material/FormControl/FormControl'
import InputLabel from '@mui/material/InputLabel/InputLabel'
import MenuItem from '@mui/material/MenuItem/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select/Select'
import React from 'react'

type Props = {
     activeOrderId: string | null;
     setActiveOrderId: (value: string) => void
}

export default function FoodCardTitleFormControl({ activeOrderId, setActiveOrderId }: Props) {
     const orders = useAppSelector(state => state.cart.orders)

     return (
          <FormControl className='col-span-4' fullWidth>
               <InputLabel id='demo-simple-select-label'>
                    میز مورد نظر
               </InputLabel>
               <Select
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
                                   key={order.id}
                                   value={order.id}
                              >
                                   {order.table.tableName}  {' '}
                                   {`${order.orderDate.day}-${order.orderDate.month}`}
                              </MenuItem>
                         ))}
               </Select>
          </FormControl>
     )
}
