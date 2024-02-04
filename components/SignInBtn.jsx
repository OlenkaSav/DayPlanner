'use client';

import { signIn } from 'next-auth/react';
import Image from "next/image";

export default function SignInBtn() {
    return (
    <button onClick={()=>signIn("google")} className='signIn__button'>
        <Image src="/google-icon.svg" alt="Google icon" className='signIn__icon' width={20} height={20} />
        <span className='signIn__text'>Sign in with Google</span> 
    </button>
    )
}