'use client';

import React, { Dispatch } from 'react';

import {
     DatePicker,
     DateTimePicker,
     DateTimeRangePicker,
     DateRangePicker,
     PickerProps,
} from 'react-advance-jalaali-datepicker';
import { ACTIONS, ActionType, StateType } from './TimeTable';

const jalaali = require('jalaali-js');

type Props = {
     state: StateType;
     dispatch: Dispatch<ActionType>;
};

export default function Calender({ state, dispatch }: Props) {
     const today = Object.values(jalaali.toJalaali(new Date())).join('/');

     function DatePickerInput(props: any) {
          return <input className=' w-[300px] text-xl' {...props} />;
     }

     function change(unix: string, formatted: string) {
          const selectedDate = formatted.split('/');

          //This functions return a date object based on the given jallali calendar data.
          // const inDateFormat: Date = jalaali.jalaaliToDateObject(
          //      Number(selectedDate[0]),
          //      Number(selectedDate[1]),
          //      Number(selectedDate[2]),
          // );

          const dateObject = {
               year: Number(selectedDate[0]),
               month: Number(selectedDate[1]),
               day: Number(selectedDate[2]),
          };

          const today = jalaali.toJalaali(new Date());

          if (
               today.jy > dateObject.year ||
               today.jm > dateObject.month ||
               today.jd > dateObject.day
          )
               throw new Error('This date is not pickable');

          dispatch({
               type: ACTIONS.ADD_DATE,
               payload: {
                    year: dateObject.year,
                    month: dateObject.month,
                    day: dateObject.day,
               },
          });
     }

     return (
          <div>
               <DatePicker
                    inputComponent={DatePickerInput}
                    placeholder='انتخاب تاریخ'
                    format='jYYYY/jMM/jDD'
                    onChange={change}
                    id='datePicker'
                    preSelected={today}
               />
          </div>
     );
}
