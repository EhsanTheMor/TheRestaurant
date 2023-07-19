import { Order } from '@/models/data';
import connectDB from '@/utils/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
     try {
          await connectDB();
          const orders = await Order.find();

          return NextResponse.json({
               status: 'success',
               orderLength: orders.length,
               orders,
          });
     } catch (err) {
          console.log(err);
          return NextResponse.json(
               { msg: 'Something went wrong' },
               { status: 500 },
          );
     }
}

export async function POST(req: Request) {
     try {
          await connectDB();
          const orderData = await req.json();

          const {
               userID,
               tableID,
               foodList,
               totalPrice,
               orderDate,
               orderTime,
               discountApplied,
          } = orderData;

          const newOrder = await Order.create({
               tableID,
               userID,
               foodList,
               totalPrice,
               orderDate,
               orderTime,
               discountApplied,
          });

          return NextResponse.json({
               status: 'success',
               order: newOrder,
          });
     } catch (err) {
          console.log(err);
          return NextResponse.json(
               { msg: 'Something went wrong' },
               { status: 500 },
          );
     }
}
