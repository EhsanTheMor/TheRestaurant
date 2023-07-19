'use client';

import { store } from '../app/Redux/store';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { ThemeProvider, createTheme } from '@mui/material';
import { purple } from '@mui/material/colors';

type Props = {
     children: ReactNode;
};

const theme = createTheme({
     palette: {
          primary: {
               // Purple and green play nicely together.
               main: purple[500],
          },
          secondary: {
               // This is green.A700 as hex.
               main: '#11cb5f',
          },

     },
})

export default function Providers({ children }: Props) {
     return (
          <ThemeProvider theme={theme}>
               <SessionProvider>
                    <Provider store={store}>{children}</Provider>
               </SessionProvider >
          </ThemeProvider>
     );
}
