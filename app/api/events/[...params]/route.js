// "use client"
import { connectMongoDB } from '@/libs/mongodb';
import Event from '@/models/event';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    
    const { user, email } = params;
    console.log("params route" + JSON.stringify(params, null, 2))
    await connectMongoDB();
    const events = await Event.find({ user: email });
    return NextResponse.json({ events }, { status: 200 });
}

// export async function GET() {
//     await connectMongoDB();
//     const events = await Event.find();
//     return NextResponse.json({ events });
// }

