import Image from 'next/image';
import React from 'react';
import { FoodType } from './FoodMenu';
import FoodAddButtonOnFoodCard from '@/components/FoodAddButtonOnFoodCard';

type Props = {
     item: FoodType;
};

export default function FoodCard({ item }: Props) {
     return (
          <div className='food_card_container'>
               <div className='food_card_image_container grid place-items-center h-1/2 relative'>
                    <Image
                         src={`/${item.image}`}
                         alt='place holder'
                         fill={true}
                    />
               </div>
               <div className='food_card_description_container h-1/2 p-5 grid grid-rows-7'>
                    <h2>
                         <span>{`نام غذا:  `}</span>
                         <span>{`${item.foodName}`}</span>
                    </h2>
                    <h2>
                         <span>{`محتویات:  `}</span>
                         <span>{`${item.ingredients.join(',')}`}</span>
                    </h2>
                    <h2>
                         <span>{`قیمت:  `}</span>
                         <span>{`${item.price} ریال`}</span>
                    </h2>
                    <FoodAddButtonOnFoodCard item={item} />
               </div>
          </div>
     );
}
