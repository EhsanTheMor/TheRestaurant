'use client';

import Nav from '@/components/Nav';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useReducer } from 'react';
import { CompletionTriggerKind } from 'typescript';

type StateType = {
     userName: string | null;
     Email: string | null;
     password: string | null;
     passwordConfirm: string | null;
};

const initialState = {
     userName: null,
     Email: null,
     password: null,
     passwordConfirm: null,
};

const enum ACTIONS {
     UPDATE_USERNAME,
     UPDATE_EMAIL,
     UPDATE_PASSWORD,
     UPDATE_PASSWORDCONFIRM,
     RESET_STATE,
}

type UPDATE_USERNAME = { type: ACTIONS.UPDATE_USERNAME; payload: string };
type UPDATE_EMAIL = { type: ACTIONS.UPDATE_EMAIL; payload: string };
type UPDATE_PASSWORD = { type: ACTIONS.UPDATE_PASSWORD; payload: string };
type UPDATE_PASSWORDCONFIRM = {
     type: ACTIONS.UPDATE_PASSWORDCONFIRM;
     payload: string;
};
type RESET_STATE = {
     type: ACTIONS.RESET_STATE;
};

type ActionType =
     | UPDATE_USERNAME
     | UPDATE_EMAIL
     | UPDATE_PASSWORD
     | UPDATE_PASSWORDCONFIRM
     | RESET_STATE;

function reducer(state: StateType, action: ActionType) {
     switch (action.type) {
          case ACTIONS.UPDATE_USERNAME: {
               return { ...state, userName: action.payload };
          }
          case ACTIONS.UPDATE_EMAIL: {
               return { ...state, Email: action.payload };
          }
          case ACTIONS.UPDATE_PASSWORD: {
               return { ...state, password: action.payload };
          }
          case ACTIONS.UPDATE_PASSWORDCONFIRM: {
               return { ...state, passwordConfirm: action.payload };
          }
          case ACTIONS.RESET_STATE: {
               return {
                    userName: null,
                    Email: null,
                    password: null,
                    passwordConfirm: null,
               };
          }
          default: {
               return { ...state };
          }
     }
}

export default function Page() {
     const [state, dispatch] = useReducer(reducer, initialState);
     const router = useRouter();

     function handleChange(e: ChangeEvent<HTMLInputElement>) {
          switch (e.target.name) {
               case 'user-name': {
                    dispatch({
                         type: ACTIONS.UPDATE_USERNAME,
                         payload: e.target.value,
                    });
                    break;
               }
               case 'email': {
                    dispatch({
                         type: ACTIONS.UPDATE_EMAIL,
                         payload: e.target.value,
                    });
                    break;
               }
               case 'password': {
                    dispatch({
                         type: ACTIONS.UPDATE_PASSWORD,
                         payload: e.target.value,
                    });
                    break;
               }
               case 'password-confirm': {
                    dispatch({
                         type: ACTIONS.UPDATE_PASSWORDCONFIRM,
                         payload: e.target.value,
                    });
                    break;
               }
               default: {
                    return;
               }
          }
     }

     async function clickHandler() {
          try {
               const user = await axios.post('http://localhost:3000/api/user', {
                    userName: state.userName,
                    userEmail: state.Email,
                    password: state.password,
                    passwordConfirm: state.passwordConfirm,
               });

               if (user) {
                    const res = await signIn('credentials', {
                         redirect: false,
                         username: state.Email,
                         password: state.password,
                    });

                    if (!res?.error) {
                         router.push('/');
                    }
               }
          } catch (error) {
               console.log(error);
          }
     }

     return (
          <div className='flex h-screen flex-col'>
               <Nav />
               <div className='bg-gray-200 flex-1 flex justify-center items-center'>
                    <div className='card bg-white rounded-xl p-10 flex flex-col text-lg'>
                         <label htmlFor='user-name-input'>نام کاربری</label>
                         <input
                              dir='ltr'
                              type='text'
                              name='user-name'
                              id='user-name-input'
                              className='border-gray-200 border-2 mb-5'
                              onChange={e => handleChange(e)}
                         />
                         <label htmlFor='email-input'>ایمیل</label>
                         <input
                              dir='ltr'
                              type='email'
                              name='email'
                              id='email-input'
                              className='border-gray-200 border-2 mb-5'
                              onChange={e => handleChange(e)}
                         />
                         <label htmlFor='password-input'>رمز</label>
                         <input
                              dir='ltr'
                              type='password'
                              name='password'
                              id='password-input'
                              className='border-gray-200 border-2 mb-5'
                              onChange={e => handleChange(e)}
                         />
                         <label htmlFor='password-confirm-input'>
                              تایید رمز
                         </label>
                         <input
                              dir='ltr'
                              type='password'
                              name='password-confirm'
                              id='password-confirm-input'
                              className='border-gray-200 border-2 mb-5'
                              onChange={e => handleChange(e)}
                         />
                         <input
                              type='button'
                              value='ثبت نام'
                              className='p-2 bg-gray-300'
                              onClick={clickHandler}
                         />
                    </div>
               </div>
          </div>
     );
}
