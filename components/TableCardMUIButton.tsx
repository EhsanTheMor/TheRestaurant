'use client'

import Button from '@mui/material/Button/Button'
import React from 'react'

export default function TableCardMUIButton() {
     return (
          <Button
               variant='contained'
               sx={{
                    fontSize: '20px',
                    fontFamily: 'vazirmatn'
               }}
               fullWidth className='h-full'
               color='info'
          >
               مشاهده جزئیات
          </Button>
     )
}
