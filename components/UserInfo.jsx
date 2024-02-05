'use client'
import { useSession } from "next-auth/react";

export default function UserInfo() {
    const { status, data: session } = useSession();
    
    if (status === 'authenticated') {
        return (<h2>Hi, {session?.user?.name}</h2>)
    }
}