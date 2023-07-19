'use client';

import { configureStore } from '@reduxjs/toolkit';
import cartReducers from './cartSlice/cartSlice';
import { userApiSlice } from './userApiSlice/userApiSlice'

export const store = configureStore({
     reducer: {
          cart: cartReducers,
          [userApiSlice.reducerPath]: userApiSlice.reducer,
     },
     middleware: (getDefaultMiddleware) => {
          return getDefaultMiddleware().concat(userApiSlice.middleware)
     }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
