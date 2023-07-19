import FirstScreen from '@/components/FirstScreen';
import FoodMenu from '@/components/FoodMenu';
import GoToStart from '@/components/GoToStart';
import Nav from '@/components/Nav';
import TableMenu from '@/components/TableMenu';
import Footer from '@/components/Footer';

import '@/style/globals.css';

export default async function Home() {
     return (
          <main >
               <div className='first_screen_container'>
                    <Nav />
                    <FirstScreen />
               </div>
               <FoodMenu />
               <TableMenu />
               <Footer />
               <GoToStart />
          </main>
     );
}
