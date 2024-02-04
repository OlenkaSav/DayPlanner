'use client';

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from 'react';
import ExportButton from "./ExportButton";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../redux/slices/userSlice';
import { clearData} from '../redux/slices/dataSlice';

export default function ToolsPanel() {
    const { status, data } = useSession();
  
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSignOut = () => {
    signOut();
        dispatch(clearUser());
        dispatch(clearData())
    
  };

    useEffect(() => {
      
    if (status === 'authenticated' && data) {
      dispatch(setUser(data?.user?.email)); 
    } else {router.replace('/');}
  }, [status, data, dispatch, router]);

    // const handleSignOut = () => {
    //     signOut();
    // // router.replace("/");
    // };
    // useEffect(() => {
    //     if (status !== 'authenticated') {
    //     router.replace("/");
    // }
        
    // }, [status, router]);
   
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