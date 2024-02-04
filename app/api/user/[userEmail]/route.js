import { connectMongoDB } from '@/libs/mongodb';
import Event from '@/models/event';
import { NextResponse } from 'next/server';


export async function GET(request, { params }) {
      //   const { userEmail } = request.query;
    console.log("here is user" +  JSON.stringify(params, null, 2))
    // const userEmail = 's.olenka1987'
    try {
        await connectMongoDB();
         const userEmail = params.userEmail;
        let events;
//   const { userEmail } = request.query;
//     console.log("here is email" + userEmail)
        if (userEmail) {
           events = await Event.find({userEmail});
        }

        return NextResponse.json({ events });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}