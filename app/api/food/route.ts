import { Food } from '@/models/data';
import connectDB from '@/utils/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
     try {
          await connectDB();
          const foods = await Food.find();

          return NextResponse.json(
               { status: 'success', foodsLength: foods.length, foods },
               { status: 200 },
          );
     } catch (err) {
          console.log(err);
          return NextResponse.json(
               { msg: 'Something went wrong!!' },
               { status: 500 },
          );
     }
}
