import { NextResponse } from 'next/server';

export async function GET(
     req: Request,
     { params }: { params: { tableId: string; reviewId: string } },
) {
     const res = `${params.tableId} ${params.reviewId}`;

     return NextResponse.json({ response: res });
}
