import React, { useState, useEffect } from 'react';
import Link from "next/link"

export default function EventList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/events", { cache: "no-store" });
                if (!res.ok) {
                    throw new Error("Failed fetch");
                }
                const {events } = await res.json();
                console.log(events)
                setData([...events]);
            } catch (error) {
                console.error(error);
            }
        };

        getEvents();
    }, []);

    return (
        <>
       {data.map(e => (
            <Link key={e._id} href={`/editEvent/${e._id}`} className='event__item'>
                <h2>{e.title}</h2>
            </Link>))}
       
        </>
    );
}

// import Link from "next/link"
// import { useEffect, useState } from "react";

// // const getEvents = async () => {
// //         try {
// //             const res = await fetch("http://localhost:3001/api/events", { cache: "no-store", }); 
// //             if (!res.ok) { throw new Error("Failed fetch") }
// //             console.log(res)
// //             return res.json();
// //         }
// //         catch (error){
// //             console.log(error)
// //         }
// //     }


// export default async function EventList() {
//     const [data, setData] = useState(null);
//     useEffect(() => {
        
// const getEvents = async () => {
//         try {
//             const res = await fetch("http://localhost:3001/api/events", { cache: "no-store", }); 
//             if (!res.ok) { throw new Error("Failed fetch") }
            
//             const jsonData = await res.json();
//             console.log(jsonData)
//                 setData(jsonData);
//             // return res.json();
//         }
//         catch (error){
//             console.log(error)
//         }
//     }
    

//     getEvents();
//     }, []);
    

//     // const events = await getEvents();
//     return (
//         <>
//             <p>HHHHH</p>
//         {/* {events.map(e => (
//             <Link key={e._id} href={`/editEvent/${e._id}`}>
//                 <h2>{e.title}</h2>
//             </Link>)
//         )}
//          */}
//        </> 
//     )
// }