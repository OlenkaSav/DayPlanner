import { connectMongoDB } from '@/libs/mongodb';
import Event from '@/models/event';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { title, start, duration } = await request.json();
    await connectMongoDB();
    await Event.create({ title, start, duration });
    return NextResponse.json({ message: "Event created" }, {status: 201});
}

export async function GET() {
    await connectMongoDB();
    const events = await Event.find();
    return NextResponse.json({ events });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Event.findByIdAndDelete(id);
    return NextResponse.json({ message: "Event deleted" }, { status: 200 });
}