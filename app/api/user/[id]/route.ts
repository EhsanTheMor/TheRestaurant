import { User } from '@/models/data';
import connectDB from '@/utils/mongodb';
import { NextResponse } from 'next/server';

export async function GET(
     req: Request,
     { params }: { params: { id: string } },
) {
     try {
          await connectDB();
          const user = await User.findById(params.id);

          if (!user)
               return NextResponse.json(
                    { msg: 'User Not Found' },
                    { status: 400 },
               );

          return NextResponse.json({
               status: 'success',
               user,
          });
     } catch (err) {
          console.log(err);
          return NextResponse.json(
               { msg: 'Something went wrong' },
               { status: 500 },
          );
     }
}

export async function DELETE(
     req: Request,
     { params }: { params: { id: string } },
) {
     try {
          await connectDB();
          const users = await User.findByIdAndDelete(params.id);

          return NextResponse.json({
               status: 'success',
               users,
          });
     } catch (err) {
          console.log(err);
          return NextResponse.json(
               { msg: 'Something went wrong' },
               { status: 500 },
          );
     }
}
