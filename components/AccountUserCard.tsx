'use client'

import { useFetchUserQuery } from '@/app/Redux/userApiSlice/userApiSlice'
import { Button } from '@mui/material'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { ChangeEvent, useEffect, useReducer } from 'react'


type StateType = {
     username: string | null,
     email: string | null,
}

const initialState: StateType = {
     username: null,
     email: null
}

enum ACTIONS {
     SET_USER_NAME,
     SET_EMAIL
}

type SET_USER_NAME = { type: ACTIONS.SET_USER_NAME, payload: string };
type SET_EMAIL = { type: ACTIONS.SET_EMAIL, payload: string };

type ActionType = SET_USER_NAME | SET_EMAIL;

function reducer(state: StateType, action: ActionType) {
     switch (action.type) {
          case ACTIONS.SET_USER_NAME: {
               if (!action.payload) throw new Error("Action must be string")
               return { ...state, username: action.payload.length > 0 ? action.payload : null }
          }
          case ACTIONS.SET_EMAIL: {
               if (!action.payload) throw new Error("Action must be string")
               return { ...state, email: action.payload.length > 0 ? action.payload : null }
          }
          default: {
               return { ...state }
          }
     }
}

export default function AccountUserCard() {
     const [state, dispatch] = useReducer(reducer, initialState);
     const { data: session } = useSession();

     const { data } = useFetchUserQuery(session?.user.id)

     useEffect(() => {
          if (!data) return;
          dispatch({ type: ACTIONS.SET_USER_NAME, payload: data.user.userName })
          dispatch({ type: ACTIONS.SET_EMAIL, payload: data.user.userEmail })

     }, [data])

     const handleChange = (e: ChangeEvent<HTMLInputElement>, type: ACTIONS) => {
          if (type === ACTIONS.SET_USER_NAME) {
               dispatch({ type, payload: e.target.value })
               console.log(state)
          } else if (type === ACTIONS.SET_EMAIL) {
               dispatch({ type, payload: e.target.value })
               console.log(state)
          }


     }

     return (
          <div className='h-full border-2 border-[#1124a0] w-full rounded-[50px] flex p-10 gap-5'>
               <div className="details flex flex-col flex-1 text-2xl h-full">
                    <ul className='space-y-10 flex-1'>
                         <li className='flex items-center'>
                              <label className='w-1/3' htmlFor="username">نام کاربری:</label>
                              <input dir='ltr'
                                   value={state.username ? state.username : ''}
                                   onChange={
                                        (e) =>
                                             handleChange(e, ACTIONS.SET_USER_NAME)
                                   }
                                   className='flex-1 border-2 rounded-md p-3 border-[#1124a0]' type="text"
                                   name='username' />
                         </li>
                         <li className='flex items-center'>
                              <label className='w-1/3' htmlFor="email">ایمیل:</label>
                              <input
                                   dir='ltr'
                                   value={state.email ? state.email : ''}
                                   onChange={
                                        (e) =>
                                             handleChange(e, ACTIONS.SET_EMAIL)
                                   }
                                   className='flex-1 border-2 rounded-md p-3 border-[#1124a0]' type="text"
                                   name='email'
                              />
                         </li>
                    </ul>
                    <div className="buttons grid place-items-center ">
                         <Button
                              variant='contained'
                              color='info'
                              className='bg-blue-700'
                              sx={{
                                   fontSize: '1.5rem',
                                   fontFamily: 'Vazirmatn',
                              }}
                         >
                              اعمال تغییرات
                         </Button>
                    </div>
               </div>
               <div className="image border-2 border-gray-100 w-1/3">

               </div>

          </div>
     )
}
