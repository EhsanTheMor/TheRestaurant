import { Food } from '@/models/data';
import connectDB from '@/utils/mongodb';
import { NextResponse } from 'next/server';

export async function GET(
     req: Request,
     { params }: { params: { id: string } },
) {
     try {
          await connectDB();
          const food = await Food.findById(params.id);

          return NextResponse.json(
               { status: 'success', food },
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
