import { User } from '@/models/data';
import connectDB from '@/utils/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
     try {
          await connectDB();
          const users = await User.find();

          return NextResponse.json({
               status: 'success',
               orderLength: users.length,
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

export async function POST(req: Request) {
     try {
          await connectDB();
          const userData = await req.json();

          const {
               userName,
               userEmail,
               password,
               passwordConfirm,
               contactInformation,
          } = userData;

          const newUser = await User.create({
               userName,
               userEmail,
               password,
               passwordConfirm,
               contactInformation,
          });

          return NextResponse.json({
               status: 'success',
               user: newUser,
          });
     } catch (err) {
          console.log(err);
          return NextResponse.json(
               { msg: 'Something went wrong' },
               { status: 500 },
          );
     }
}
