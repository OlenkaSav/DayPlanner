'use client';


import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from 'react';
import ExportButton from "./ExportButton";
import { useRouter } from "next/navigation";

export default function ToolsPanel() {
    const { status } = useSession();
    const router = useRouter();

    const handleSignOut = () => {
  signOut();
    // router.replace("/");
    };
        useEffect(() => {
            if (status !== 'authenticated') {
            router.replace("/");
       }
        
    }, [status]);
   
    return (
        <nav className="tools-panel">
            <Link href={"/"} className="tools-panel__home">MyDay</Link>
            <div className="tools-panel__actions">
                {status === 'authenticated' &&
                    <>
                        <ExportButton/>
                        <Link href="/addEvent" className="tools-panel__action">Add event</Link>
                    </>
                }
                {status === 'authenticated' ? (<button className="tools-panel__action" onClick={handleSignOut}>Sign out</button>)
                    : (<button className="tools-panel__action" onClick={() => signIn('google')}>Sign in</button>)}
                
                
            </div>
        </nav>
     )
}