import connectDB from '@/utils/mongodb';
import { Order, Table } from '@/models/data';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

const jalaali = require('jalaali-js');

export async function GET(
     req: NextRequest,
     { params }: { params: { id: string } },
) {
     try {
          await connectDB();
          const table = await Table.findById(params.id);

          const today = jalaali.toJalaali(new Date());
          const year = today.jy;
          const month = today.jm;
          const day = today.jd;

          const tableTimesAggregate = await Order.aggregate([
               {
                    $match: {
                         tableID: new mongoose.Types.ObjectId(params.id),
                         orderStatus: 'active',
                         'orderDate.day': day,
                         'orderDate.month': month,
                         'orderDate.year': year,
                    },
               },
               {
                    $group: {
                         _id: null,
                         orderTimes: { $addToSet: '$orderTime' },
                    },
               },
               {
                    $project: {
                         _id: 0,
                    },
               },
          ]);
          let tableTimes: number[] = [];
          tableTimesAggregate[0]?.orderTimes.map((item: number[]) => {
               tableTimes = tableTimes.concat(item);
          });

          return NextResponse.json({ status: 'success', table, tableTimes });
     } catch (err) {
          console.log(err);
          return NextResponse.json({
               status: 'fail',
               msg: 'Something went wrong',
          });
     }
}

export async function POST(
     req: Request,
     { params }: { params: { id: string } },
) {
     try {
          await connectDB();

          const {
               year,
               month,
               day,
          }: { year: number; month: number; day: number } = await req.json();

          if (!year || !day || !month)
               return NextResponse.json(
                    { msg: 'Please Provide sufficient data' },
                    { status: 404 },
               );

          const tableTimesAggregate = await Order.aggregate([
               {
                    $match: {
                         tableID: new mongoose.Types.ObjectId(params.id),
                         orderStatus: 'active',
                         'orderDate.day': day,
                         'orderDate.month': month,
                         'orderDate.year': year,
                    },
               },
               {
                    $group: {
                         _id: null,
                         orderTimes: { $addToSet: '$orderTime' },
                    },
               },
               {
                    $project: {
                         _id: 0,
                    },
               },
          ]);
          let tableTimes: number[] = [];
          tableTimesAggregate[0]?.orderTimes.map((item: number[]) => {
               tableTimes = tableTimes.concat(item);
          });

          return NextResponse.json({ msg: 'Hello', tableTimes });
     } catch (err) {
          return NextResponse.json({ msg: 'err' }, { status: 500 });
     }
}

export const PATCH = async (req: NextRequest) => {


     const user = req.headers.get('user')
     if (!user) return NextResponse.json({ msg: 'Siktir' }, { status: 400 })
     console.log(JSON.parse(user))
     // req.cookies.delete('user')
     // const newUser = req.cookies.get('user')
     // console.log(newUser)

     const res = NextResponse.json({ user: 'hello' })



     return res
}
