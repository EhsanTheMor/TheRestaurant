'use client';

import {
     Button,
     FormControl,
     InputLabel,
     MenuItem,
     Select,
} from '@mui/material';
import React from 'react';

export default function MUIButton() {
     return (
          <>
               <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Age</InputLabel>
                    <Select
                         labelId='demo-simple-select-label'
                         id='demo-simple-select'
                         // value={age}
                         label='Age'
                         // onChange={handleChange}
                    >
                         <MenuItem value={10}>Ten</MenuItem>
                         <MenuItem value={20}>Twenty</MenuItem>
                         <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
               </FormControl>
          </>
     );
}
