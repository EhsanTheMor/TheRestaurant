'use client';

import React, { useEffect, useState } from 'react';

type Props = {
     item: { id: number; time: string; isTaken: boolean };
     toggleInTheList: (id: number) => void;
     isActive: boolean;
};

export default function TimeTableButton({
     item,
     toggleInTheList,
     isActive,
}: Props) {
     const { isTaken, time, id } = item;

     const classList = `time_table_btn ${
          isActive ? 'bg-green-200' : 'bg-gray-100'
     } ${isTaken ? 'bg-red-200' : ''}`;

     const handleClick = () => {
          if (isTaken) return alert('This time has already taken');
          console.log('done');
          toggleInTheList(id);
     };

     return (
          <button onClick={handleClick} className={classList}>
               {time}
          </button>
     );
}
