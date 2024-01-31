'use client'

import SignInBtn from "./SignInBtn";
import { useSession } from "next-auth/react";

export default function UserInfo() {
    const { status, data: session } = useSession();
    const vvv = useSession()
    console.log(vvv)

    if (status === 'authenticated') {
        return (<h2>Hi, {session?.user?.name}</h2>)
    }
    // else { return <SignInBtn /> }
        
    
}