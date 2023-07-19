'use client';

import React from 'react';

type Props = {
     text: string;
     guidElement: 'food_menu' | 'table_menu';
};

export default function ScrollButton({ text, guidElement }: Props) {
     const clickHandler = () => {
          document
               .getElementById(guidElement)
               ?.scrollIntoView({ behavior: 'smooth' });
     };

     return (
          <button onClick={clickHandler} className='guidence_btn'>
               {text}
          </button>
     );
}
