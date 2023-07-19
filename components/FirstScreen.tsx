import React from 'react';
import '@/style/firstscreen.css';
import ScrollButton from './ScrollButton';

export default function FirstScreen() {
     return (
          <div className='guidence_container'>
               <div className='btns_container'>
                    <ScrollButton text='انتخاب میز' guidElement='table_menu' />
                    <ScrollButton text='انتخاب غذا' guidElement='food_menu' />
               </div>
          </div>
     );
}
