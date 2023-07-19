'use client';

import React, { ReducerState, useEffect, useReducer, useRef, useState } from 'react';
import TimeTableButton from './TimeTableButton';
import Calender from './Calender';
import { useAppDispatch, useAppSelector } from '@/app/Redux/hooks';
import { tableAdded } from '@/app/Redux/cartSlice/cartSlice';
import { TableType } from '@/utils/types';
import axios from 'axios';

const jalaali = require('jalaali-js');

export type StateType = {
     times: {
          id: number;
          time: string;
          isTaken: boolean;
     }[];
     dateTime: {
          year: number | null;
          month: number | null;
          day: number | null;
     };
     selectedTimes: number[];
};

const initialState: StateType = {
     times: [
          { id: 9, time: '8-9 AM', isTaken: false },
          { id: 10, time: '9-10 AM', isTaken: false },
          { id: 11, time: '10-11 AM', isTaken: false },
          { id: 12, time: '11-12 AM', isTaken: false },
          { id: 13, time: '12-13 PM', isTaken: false },
          { id: 14, time: '13-14 PM', isTaken: false },
          { id: 15, time: '14-15 PM', isTaken: false },
          { id: 16, time: '15-16 PM', isTaken: false },
          { id: 17, time: '16-17 PM', isTaken: false },
          { id: 18, time: '17-18 PM', isTaken: false },
          { id: 19, time: '18-19 PM', isTaken: false },
          { id: 20, time: '19-20 PM', isTaken: false },
          { id: 21, time: '20-21 PM', isTaken: false },
          { id: 22, time: '21-22 PM', isTaken: false },
          { id: 23, time: '22-23 PM', isTaken: false },
     ],
     dateTime: {
          year: null,
          month: null,
          day: null,
     },
     selectedTimes: [],
};

export const enum ACTIONS {
     UPDATE,
     ADD_DATE,
     TOGGLE_SELECTED_TIMES,
     ADD_WHOLE_ARRAY_TO_SELECTEDTIMES,
     RESET_SELECTED_TIMES,
}

type UPDATE = { type: ACTIONS.UPDATE; payload: number[] };
type ADD_DATE = {
     type: ACTIONS.ADD_DATE;
     payload: { year: number; month: number; day: number };
};
type TOGGLE_SELECTED_TIMES = {
     type: ACTIONS.TOGGLE_SELECTED_TIMES;
     payload: number;
};
type ADD_WHOLE_ARRAY_TO_SELECTEDTIMES = {
     type: ACTIONS.ADD_WHOLE_ARRAY_TO_SELECTEDTIMES;
     payload: number[];
};
type RESET_SELECTED_TIMES = {
     type: ACTIONS.RESET_SELECTED_TIMES;
};

export type ActionType =
     | UPDATE
     | ADD_DATE
     | TOGGLE_SELECTED_TIMES
     | ADD_WHOLE_ARRAY_TO_SELECTEDTIMES
     | RESET_SELECTED_TIMES;

function reducer(state: StateType, action: ActionType): StateType {
     switch (action.type) {
          case ACTIONS.UPDATE: {
               const newTimes = state.times.map(item =>
                    action.payload.includes(item.id)
                         ? { ...item, isTaken: true }
                         : { ...item, isTaken: false },
               );
               return { ...state, times: newTimes };
          }
          case ACTIONS.ADD_DATE: {
               const { year, month, day } = action.payload;
               return { ...state, dateTime: { year, month, day } };
          }
          case ACTIONS.TOGGLE_SELECTED_TIMES: {
               if (state.selectedTimes.includes(action.payload)) {
                    return {
                         ...state,
                         selectedTimes: state.selectedTimes.filter(
                              time => time !== action.payload,
                         ),
                    };
               } else {
                    return {
                         ...state,
                         selectedTimes: [
                              ...state.selectedTimes,
                              action.payload,
                         ],
                    };
               }
          }
          case ACTIONS.ADD_WHOLE_ARRAY_TO_SELECTEDTIMES: {
               return {
                    ...state,
                    selectedTimes: state.selectedTimes.concat(action.payload),
               };
          }
          case ACTIONS.RESET_SELECTED_TIMES: {
               return { ...state, selectedTimes: [] };
          }
          default: {
               return { ...state };
          }
     }
}

async function getTableTimes(
     id: string,
     newDateTimes: { year: number; month: number; day: number },
) {
     try {
          const tableRes = await axios.post(
               `http://localhost:3000/api/table/${id}`,
               newDateTimes,
          );
          const newTableTimes: number[] = tableRes.data.tableTimes;

          return newTableTimes;
     } catch (err) {
          console.log(err);
          console.log('This error is from the getTableTimes function');
     }
}

function areSameDate(
     firstYear: number, firstMonth: number, firstDay: number, secondYear: number, secondMonth: number, secondDay: number
) {
     if (firstYear === secondYear && firstMonth === secondMonth && firstDay === secondDay) {
          return true
     } else {
          return false
     }
}

type Props = {
     table: TableType;
     tableTimes: number[];
};

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Main Function////////////////////////////////////////////////

export default function TimeTable({ table, tableTimes }: Props) {
     //A reducer which holds all the data related to this page.
     const [reducerState, reducerDispatch] = useReducer<typeof reducer>(
          reducer,
          initialState,
     );

     //Creating a ref for a toaster // snack message
     const [snackClass, setSnackClass] = useState<string>('snackbar')
     const snackBar = useRef<HTMLDivElement>(null)

     //This is redux dispatcher for adding table to cart section.
     const dispatch = useAppDispatch();

     //This is cart redux state
     const orders = useAppSelector(state => state.cart.orders);

     //Typing The State
     // console.log(reducerState.selectedTimes);

     //matches the time table with the props.
     useEffect(() => {
          reducerDispatch({ type: ACTIONS.UPDATE, payload: tableTimes });

          const today = jalaali.toJalaali(new Date());
          const { jy, jm, jd } = today;
          reducerDispatch({
               type: ACTIONS.ADD_DATE,
               payload: { year: jy, month: jm, day: jd },
          });
     }, []);

     //With every date selection gets the data and renders the token ones.
     useEffect(() => {
          //Gets data for the chosen date and chosen table to be able to
          //See already taken times.
          const { year, month, day } = reducerState.dateTime;
          if (year == null || month == null || day == null) return;

          async function getData() {
               if (year == null || month == null || day == null) return;
               const res = await getTableTimes(table._id, { year, month, day });

               if (res) {
                    reducerDispatch({ type: ACTIONS.UPDATE, payload: res });
               } else {
                    reducerDispatch({ type: ACTIONS.UPDATE, payload: [] });
               }
          }

          getData();

          //Checkes the orders to be able to see already selected times.
          const wantedOrders = orders.filter(
               order => order.table._id === table._id,
          );
          if (wantedOrders.length === 0) return;

          //First we clean the selected times then fetch the
          //Ordered ones and add them to list
          reducerDispatch({ type: ACTIONS.RESET_SELECTED_TIMES });

          wantedOrders.forEach(wantedOrder => {
               const { year: orderYear, month: orderMonth, day: orderDay } = wantedOrder.orderDate;

               if (
                    areSameDate(
                         year, month, day, orderYear, orderMonth, orderDay
                    )
               ) {
                    // console.log('qualified');
                    reducerDispatch({
                         type: ACTIONS.ADD_WHOLE_ARRAY_TO_SELECTEDTIMES,
                         payload: wantedOrder.orderTime,
                    });
               }
          });

          console.log('done');
     }, [reducerState.dateTime]);

     const clickHandler = () => {
          if (reducerState.selectedTimes.length === 0) {
               alert('please select proper time');
               return;
          }
          const { year, month, day } = reducerState.dateTime;
          if (!year || !month || !day) return;

          dispatch(
               tableAdded({
                    table: table,
                    orderDate: { year, month, day },
                    orderTime: reducerState.selectedTimes,
               }),
          );
          console.log('table added');
          console.log(snackBar.current?.classList)

          // Add the "show" class to DIV
          setSnackClass('snackbar show')

          // After 3 seconds, remove the show class from DIV
          setTimeout(function () { setSnackClass('snackbar') }, 3000);
     };

     return (
          <div className='time_table_container col-span-2 flex flex-col gap-10 mt-10'>

               <div className='time_table' dir='ltr'>
                    {reducerState.times.map(item => (
                         <TimeTableButton
                              key={item.id}
                              item={item}
                              toggleInTheList={id =>
                                   reducerDispatch({
                                        type: ACTIONS.TOGGLE_SELECTED_TIMES,
                                        payload: id,
                                   })
                              }
                              isActive={reducerState.selectedTimes.includes(
                                   item.id,
                              )}
                         />
                    ))}
               </div>

               <div className='flex justify-around items-center'>
                    <div className='calender w-[200px] outline-emerald-700'>
                         <Calender
                              state={reducerState}
                              dispatch={reducerDispatch}
                         />
                    </div>
                    <button
                         onClick={clickHandler}
                         className='button bg-blue-200 w-1/4 block p-5'
                    >
                         اضافه به سبد سفارش
                    </button>
               </div>

               <div ref={snackBar} className={snackClass} id="snackbar"><span>سفارش شما به سبد شفارش اضافه شد.</span></div>
          </div>
     );
}
