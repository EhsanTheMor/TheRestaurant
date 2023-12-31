import '../style/globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import { Vazirmatn } from 'next/font/google';

const Vazir = Vazirmatn({
     subsets: ['arabic', 'latin'],
     display: 'swap'
})

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
     title: 'Create Next App',
     description: 'Generated by create next app',
};

export default function RootLayout({
     children,
}: {
     children: React.ReactNode;
}) {
     return (
          <html dir='rtl'>
               <head>
                    <link
                         href='https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css'
                         rel='stylesheet'
                         type='text/css'
                    />
               </head>
               <body className={Vazir.className}>
                    <Providers>{children}</Providers>
               </body>
          </html>
     );
}
