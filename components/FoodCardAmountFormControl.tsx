import FormControl from '@mui/material/FormControl/FormControl'
import InputLabel from '@mui/material/InputLabel/InputLabel'
import MenuItem from '@mui/material/MenuItem/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select/Select'
import React from 'react'

type Props = {
     amount: number;
     setAmount: (amount: number) => void
}

export default function FoodCardAmountFormControl({ amount, setAmount }: Props) {
     const amountsList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

     return (
          <FormControl fullWidth>
               <InputLabel id='amount-select-label'>
                    تعداد
               </InputLabel>
               <Select
                    labelId='amount-select-label'
                    id='amount-select'
                    value={amount.toString()}
                    label='تعداد'
                    onChange={(e: SelectChangeEvent) =>
                         setAmount(Number(e.target.value))
                    }
               >
                    {
                         amountsList.map(item => (
                              <MenuItem
                                   key={item}
                                   value={item}
                              >
                                   {item}
                              </MenuItem>
                         ))}
               </Select>
          </FormControl>
     )
}
