'use client';

import { useAppDispatch, useAppSelector } from '@/app/Redux/hooks';
import React, { ChangeEvent, useReducer, useState } from 'react';
import { FoodType } from './FoodMenu';
import { foodAddedToOrder } from '@/app/Redux/cartSlice/cartSlice';
import MUIButton from './MUIButton';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import FoodCardTitleFormControl from './FoodCardTitleFormControl';
import FoodCardAmountFormControl from './FoodCardAmountFormControl';

type Props = {
     item: FoodType;
};

export default function FoodAddButtonOnFoodCard({ item }: Props) {
     const dispatch = useAppDispatch();
     const orders = useAppSelector(state => state.cart.orders);

     const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
     const [amount, setAmount] = useState<number>(1)

     // A state for poping up the snackbar.
     const [snackbarClass, setSnackbarClass] = useState<string>('snackbar')

     function handleClick() {
          if (!activeOrderId) return alert('please select a table first.');

          console.log(item);

          dispatch(
               foodAddedToOrder({
                    food: item,
                    amount,
                    orderID: activeOrderId,
               }),
          );


          // Add the "show" class to DIV
          setSnackbarClass('snackbar show')

          // After 3 seconds, remove the show class from DIV
          setTimeout(function () { setSnackbarClass('snackbar') }, 3000);
     }

     return (
          <>
               {/* Rendering a drop down list of already booked tables with material ui library */}
               {orders.length > 0 && (
                    <div className='table_selector row-start-4 grid grid-cols-5 gap-1'>
                         <FoodCardTitleFormControl activeOrderId={activeOrderId} setActiveOrderId={setActiveOrderId} />
                         <FoodCardAmountFormControl amount={amount} setAmount={setAmount} />
                    </div>
               )}

               {/* A button which adds food to table order */}
               <Button
                    sx={{ fontSize: '20px', fontFamily: 'vazirmatn' }}
                    onClick={handleClick}
                    className='bg-green-600 text-xl w-full row-start-6'
                    variant='contained'
                    color='success'
               >
                    اضافه کردن به سبد سفارش
               </Button>

               {/* A Snack bar div */}
               <div className={snackbarClass}>ثبت شد</div>
          </>
     );
}
