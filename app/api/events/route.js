import { connectMongoDB } from '@/libs/mongodb';
import Event from '@/models/event';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { title, start, duration, user } = await request.json();
    await connectMongoDB();
    await Event.create({ title, start, duration, user });
    return NextResponse.json({ message: "Event created" }, {status: 201});
}

export async function GET(request, response) {
     console.log('Full Requestggg:', JSON.stringify(request, null, 2));
    // const { userEmail } = await request.json();
   
    //   const gggg = request.query;
    // console.log("here is email  " + gggg);
    
   
//     try {
//         await connectMongoDB();
//         let events;
// //   const { userEmail } = params;
//     // console.log("here is email" + userEmail)
//         if (userEmail) {
//            events = await Event.find({user: userEmail});
//         }

//         return NextResponse.json({ events });
//     } catch (error) {
//         // console.error("fffff"+ error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
}

// export async function GET() {
//     await connectMongoDB();
//     const events = await Event.find();
//     return NextResponse.json({ events });
// }

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Event.findByIdAndDelete(id);
    return NextResponse.json({ message: "Event deleted" }, { status: 200 });
}