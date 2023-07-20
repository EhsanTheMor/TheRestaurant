'use client';

import Link from 'next/link';
import React from 'react';
import '@/style/Nav.css';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useAppSelector } from '@/app/Redux/hooks';
import NavbarExitButton from './NavbarExitButton';

export default function Nav() {
     const { data: session } = useSession();
     const orders = useAppSelector(state => state.cart.orders);

     // console.log(session);

     function clickHandler() {
          if (!session) {
               alert('برای مشاهده سبد خرید لطفا وارد حساب کاربری خود شوید');
          }
     }

     return (
          <div id='navbar' className='div_container'>
               {/* This link is for main route and it is for logo */}
               <Link href={'/'} className='logo'>
                    رستوران
               </Link>

               {/* Navbar list */}
               <ul className='nav_list'>

                    <Link href={'/'} className='nav_list_item'>
                         صفحه اصلی
                    </Link>

                    {/* Cart indicator with counter on the side */}
                    <Link
                         href={'/cart'}
                         className='relative nav_list_item'
                         onClick={clickHandler}
                    >
                         سبد خرید
                         {orders.length > 0 && (
                              <span className='nav_list_item-indicator'>
                                   {orders.length}
                              </span>
                         )}
                    </Link>

                    {/* This is for the sign in and out. (conditional rendering) */}
                    {session ? (
                         <NavbarExitButton />
                    ) : (
                         <button
                              onClick={() => signIn()}
                              className='nav_list_item'
                         >
                              ورود
                         </button>
                    )}
               </ul>
          </div>
     );
}
