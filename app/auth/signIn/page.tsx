'use client';

import Nav from '@/components/Nav';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
     const router = useRouter();

     const { data: session } = useSession();

     useEffect(() => {
          if (session) {
               router.push('/');
          }
     });

     const [email, setEmail] = useState<string | null>(null);
     const [password, setPassword] = useState<string | null>(null);

     const handleClick = async () => {
          try {
               const res = await signIn('credentials', {
                    redirect: false,
                    username: email,
                    password,
               });

               if (!res?.error) {
                    router.push('/');
               }
          } catch (error) {
               console.log(error)
          }



     };

     return (
          <div className='flex h-screen flex-col'>
               <Nav />
               <div className='bg-gray-200 flex-1 flex justify-center items-center'>
                    <div className='card bg-white rounded-xl p-10 flex flex-col text-lg'>
                         <label htmlFor='email-input'>ایمیل</label>
                         <input
                              dir='ltr'
                              type='email'
                              name='Email'
                              id='email-input'
                              className='border-gray-200 border-2 mb-5'
                              onChange={e => setEmail(e.target.value)}
                         />
                         <label htmlFor='password-input'>رمز</label>
                         <input
                              dir='ltr'
                              type='password'
                              name='Password'
                              id='password-input'
                              className='border-gray-200 border-2 mb-5'
                              onChange={e => setPassword(e.target.value)}
                         />
                         <input
                              type='button'
                              value='ورود'
                              className='p-2 bg-gray-300 hover:cursor-pointer'
                              onClick={handleClick}
                         />
                         <Link
                              className='inline-block text-center text-sm mt-5 mx-auto hover:text-blue-500 hover:underline'
                              href='/auth/signUp'
                         >
                              ثبت نام
                         </Link>
                    </div>
               </div>
          </div>
     );
}
