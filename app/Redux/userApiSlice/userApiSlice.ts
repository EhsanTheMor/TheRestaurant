'use client'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type UserType = {
     status: string,
     user: {
          _id: string,
          userName: string,
          userEmail: string,
          contactInformation: string[],
          role: "user" | "admin",
          userOrders: {
               _id: string;
               orderDate: {
                    year: number,
                    month: number,
                    day: number
               },
               tableID: string,
               orderTime: number[],
               userID: string,
          }[],
     }
}

export const userApiSlice = createApi({
     reducerPath: 'user-api',
     baseQuery: fetchBaseQuery({
          baseUrl: 'http://localhost:3000/api'
     }),
     endpoints(builder) {
          return {
               fetchUser: builder.query<UserType, string>({
                    query(id) {
                         return `/user/${id}`;
                    }
               })
          }
     }
})

export const { useFetchUserQuery, useLazyFetchUserQuery } = userApiSlice