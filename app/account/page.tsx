'use client'

import AccountSelectIndicator from '@/components/AccountSelectIndicator'
import Nav from '@/components/Nav'
import { useEffect, useMemo, useReducer, useState } from 'react'
import '@/style/account.css'
import AccountUserCard from '@/components/AccountUserCard'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import AccountOrderList from '@/components/AccountOrderList'

type StateType = {
     menuList: string[];
     activeField: string;
}

const initialState: StateType = {
     menuList: ["مشخصات حساب", "لیست سفارش‌ها", "سفارش‌های فعال", "حساب کل"],
     activeField: 'مشخصات حساب',
}

enum ACTIONS {
     SET_ACTIVE_FIELD,
}

type SET_ACTIVE_FILED = { type: ACTIONS.SET_ACTIVE_FIELD, payload: string }

type ActionType = SET_ACTIVE_FILED

function reducer(state: StateType, action: ActionType) {
     switch (action.type) {
          case ACTIONS.SET_ACTIVE_FIELD: {
               return { ...state, activeField: action.payload }
          }
          default: {
               return { ...state }
          }
     }
}

export default function Page() {
     const router = useRouter()
     const [state, dispatch] = useReducer(reducer, initialState)

     const { data: session, status } = useSession();
     if (status === "unauthenticated") return router.push('/');


     return (
          <div className='flex flex-col  h-screen'>
               <Nav />
               <section className='flex-1 flex border-t-2 border-[#3550FF]'>
                    <div className="side_bar h-full w-1/4 shrink-0 bg-[#3550FF] rounded-l-[50px] py-32 pr-32 ">
                         {state.menuList.map((item, index) => (

                              <AccountSelectIndicator
                                   active={state.activeField === item}
                                   setActive={() => dispatch({
                                        type: ACTIONS.SET_ACTIVE_FIELD,
                                        payload: item
                                   })}
                                   key={index}
                                   item={item}
                              />

                         ))}
                    </div>
                    <div className="main-section grid place-items-center h-full flex-1 p-20">
                         {
                              state.activeField === state.menuList[0] && (
                                   <AccountUserCard />
                              )
                         }
                         {
                              state.activeField === state.menuList[1] && (
                                   <AccountOrderList id={session?.user.id} />
                              )
                         }
                         {
                              state.activeField === state.menuList[2] && (
                                   <h1>This is Active Orders </h1>
                              )
                         }
                         {
                              state.activeField === state.menuList[3] && (
                                   <h1>This is Total Outcome </h1>
                              )
                         }
                    </div>
               </section>
          </div>
     )
}
