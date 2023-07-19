import React from 'react';
import FoodCard from './FoodCard';
import '@/style/foodmenu.css';
import { FoodSchemaType } from '@/models/data';

export type FoodType = {
     _id: string;
     foodName: string;
     description: string;
     price: number;
     priceDiscount: number;
     category: string;
     ingredients: string[];
     image: string;
     availability: boolean;
     createdDate: Date;
     updatedDate: Date;
}

export default async function FoodMenu() {
     const res = await fetch('http://localhost:3000/api/food', {
          next: { revalidate: 60 },
     });
     const data = await res.json();
     const foodList: FoodType[] = data.foods;

     const list = [1, 2, 3, 4, 5];

     return (
          <div id='food_menu' className='food_menu'>
               <div className="-mx-10 p-10 bg-green-400 mb-5 text-white">
                    <h1 className='food_menu_header'>منوی غذا</h1>
                    <p className='text-center text-xl'>منوی غذای رستوران جهت سفارش. لطفا پس از انتخاب میز نسبت به تعیین تعداد و سفارش اقدام فرمایید.</p>
               </div>
               <div className='inside_food_menu_container'>
                    {/* rendering list of food */}
                    {foodList.map(item => (
                         <FoodCard item={item} key={item._id} />
                    ))}
               </div>
          </div>
     );
}
