// import { Food, Table } from '@/models/data';
// import connectDB from '@/utils/mongodb';
// import { data } from '@/data/data';
// import { NextResponse } from 'next/server';

// export async function GET(req: Request) {
//      try {
//           await connectDB();

//           const { tables } = data

//           for (const table of tables) {
//                try {

//                     const insertTable = async () => {
//                          await Table.create(table)
//                          console.log('done')
//                     }
//                     insertTable()
//                } catch (err) {
//                     console.log(err)
//                }
//           }
//           return NextResponse.json(
//                { msg: 'The operation was successfull' },
//                { status: 200 },
//           );
//      } catch (err) {
//           return NextResponse.json(
//                { error: 'Operation failed' },
//                { status: 400 },
//           );
//      }
// }


