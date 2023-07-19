import connectDB from '@/utils/mongodb';
import { Table } from '@/models/data';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
     try {
          await connectDB();
          const tables = await Table.find();

          return NextResponse.json({
               status: 'success',
               tablesLength: tables.length,
               tables,
          });
     } catch (err) {
          console.log(err);
     }
}

export async function POST(req: Request) {
     try {
          await connectDB();
          const body = await req.json()
          const { tableName,
               seatingCapacity,
               availability,
               specialFeatures,
               mapUrl,
               prices } = body;

          const newTable = await Table.create({
               tableName,
               seatingCapacity,
               availability,
               specialFeatures,
               mapUrl,
               prices
          })

          console.log('hello')

          return NextResponse.json({ status: 'success', newTable })
     } catch (err) {
          console.log(err)

     }
}