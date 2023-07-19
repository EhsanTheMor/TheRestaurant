'use client';

import { FoodType } from '@/components/FoodMenu';
import { CartOrderType, TableType } from '@/utils/types';
import { createSelector, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

type CartState = {
     orders: CartOrderType[];
};

const initialState: CartState = {
     orders: [],
};

const cartSlice = createSlice({
     name: 'table',
     initialState,
     reducers: {
          //Adds table to order.
          //Checkes if that table has already another order for the same day,
          //just updates the Times.
          tableAdded(
               state,
               action: PayloadAction<{
                    table: TableType;
                    orderDate: { year: number; month: number; day: number };
                    orderTime: number[];
               }>,
          ) {
               //Checkes if the data is there or not. If not Does nothing.
               if (
                    !action.payload.table ||
                    !action.payload.orderTime ||
                    !action.payload.orderDate.year ||
                    !action.payload.orderDate.month ||
                    !action.payload.orderDate.day
               )
                    return;

               //Checkes if this table has another order for the same date in cart or not.
               const theOrder = state.orders.find(
                    item =>
                         item.table._id === action.payload.table._id &&
                         item.orderDate.year === action.payload.orderDate.year &&
                         item.orderDate.month === action.payload.orderDate.month &&
                         item.orderDate.day === action.payload.orderDate.day
               );

               if (theOrder) {

                    //If there is another order for the same date just update the timeOrder.
                    theOrder.orderTime = action.payload.orderTime;
               } else {

                    //If there is not creates new cart and push to cart.
                    const newOrder: CartOrderType = {
                         id: nanoid(),
                         table: action.payload.table,
                         foodList: [],
                         userID: null,
                         totalPrice: null,
                         orderDate: action.payload.orderDate,
                         orderTime: action.payload.orderTime,
                         discountApplied: null,
                    };
                    state.orders.push(newOrder);
               }
          },

          //Add food to the Order.
          //Checkes if food is already exists in the order just
          //updates the amount.
          foodAddedToOrder(
               state,
               action: PayloadAction<{
                    food: FoodType;
                    amount: number;
                    orderID: string;
               }>,
          ) {
               const theOrder = state.orders.find(
                    order => order.id === action.payload.orderID
               );

               if (!theOrder) return console.log('This order does not exist')

               const foodListIds = theOrder.foodList.map(
                    food => food.food._id,
               );

               //Checkes if food already is in order or not.
               const theFood = theOrder.foodList.find(
                    food => food.food._id === action.payload.food._id
               )

               if (theFood) {
                    //If food is already in order just updates the amount
                    theFood.amount = theFood.amount + action.payload.amount
               } else {
                    //If food does not exist in order pushes it to order.
                    theOrder.foodList.push({
                         food: action.payload.food,
                         amount: action.payload.amount,
                    });
               }
          },

          //For deleting a specific order
          orderDeleted(state, action: PayloadAction<string>) {
               state.orders = state.orders.filter(
                    order => order.id !== action.payload,
               );
          },

          //increase the amount of activity of a food in certain order.
          foodDecreased(
               state,
               action: PayloadAction<{ orderId: string; foodId: string }>,
          ) {
               //First want to look at the amount if it reaches zero. food will be deleted.
               const orderItem = state.orders.find(
                    order => order.id === action.payload.orderId,
               );
               if (!orderItem) return;

               const foodItem = orderItem.foodList.find(
                    food => food.food._id === action.payload.foodId,
               );

               if (!foodItem) return;
               if (foodItem.amount === 1) {
                    orderItem.foodList = orderItem.foodList.filter(
                         food => food.food._id !== action.payload.foodId
                    )
               } else {
                    foodItem.amount = foodItem.amount - 1;
               }
          },

          //This function increases amount of certain food in certain order
          foodIncreased(
               state,
               action: PayloadAction<{ orderId: string; foodId: string }>,
          ) {
               const theOrder = state.orders.find(order => order.id === action.payload.orderId)
               if (!theOrder) return;

               const theFood = theOrder.foodList.find(
                    food => food.food._id === action.payload.foodId
               )
               if (!theFood) return;

               theFood.amount = theFood.amount + 1
          },

          //Completely gets rid of one type of food from an order
          foodDeleted(
               state,
               action: PayloadAction<{ orderId: string; foodId: string }>,
          ) {
               const theOrder = state.orders.find(order => order.id === action.payload.orderId)
               if (!theOrder) return;

               theOrder.foodList = theOrder.foodList.filter(
                    food => food.food._id !== action.payload.foodId
               )
          },
     },
});



//This selector selects a specific order of order list
const selectOrder = (state: CartOrderType[], id: string | undefined) => {
     if (!id) return null;
     return state.filter(
          order => order.id === id)[0]
}

//This selector takes the id of an order and returns the price for the times
//that the table is ordered.
export const selectTableCalculatedPrice = createSelector(
     selectOrder,
     order => {
          if (!order) return -1

          const price = tablePriceCalculator(order);

          return price
     }
)

//This selectors calculates prices for the each type of food in one order.
export const selectFoodCalculatedPriceForOrder = createSelector(
     selectOrder,
     order => {
          if (!order) return -1;

          const foodListPrices = foodPriceCalculator(order)

          return foodListPrices;
     }
)

//This selector returns the whole price for an order
export const selectTotalPrice = createSelector(
     selectOrder,
     order => {
          if (!order) return -1;

          let totalPrice = 0;

          const tablePrice = tablePriceCalculator(order);
          const foodListPrices:
               ReturnType<typeof foodPriceCalculator> = foodPriceCalculator(order)

          totalPrice += tablePrice;
          if (foodListPrices === -1) return totalPrice

          const foodsPrices = foodListPrices.reduce(
               (acu, cur) => acu + cur.price,
               0
          )
          return totalPrice + foodsPrices
     }
)

//This function takes an order and returns its table value.
const tablePriceCalculator = (order: CartOrderType) => {
     let price = 0;
     const { orderTime } = order;
     const { prices } = order.table;
     orderTime.forEach(
          time => {
               const timePrice = prices[time.toString() as keyof typeof prices];
               if (timePrice) {
                    price = price + timePrice;
               }
          }
     )

     return price
}

//This function takes an order and returns a list containing food types and prices.
const foodPriceCalculator = (order: CartOrderType) => {
     const { foodList } = order;
     if (!foodList.length) return -1;

     const foodListPrices: {
          foodName: string,
          price: number
     }[] = [];

     foodList.forEach(
          food => {
               const foodPrice = food.amount * food.food.price;

               foodListPrices.push({
                    foodName: food.food.foodName,
                    price: foodPrice
               })
          }
     )

     return foodListPrices
}

export const {
     tableAdded,
     foodAddedToOrder,
     orderDeleted,
     foodDecreased,
     foodIncreased,
     foodDeleted,
} = cartSlice.actions;
export default cartSlice.reducer;
