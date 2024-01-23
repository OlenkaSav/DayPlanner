import EventList from '@/components/EventList';
import { useState, useEffect } from 'react';
import Link from "next/link"


export default function CalendarBg() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/events", { cache: "no-store" });
                if (!res.ok) {
                    throw new Error("Failed fetch");
                }
                const {events } = await res.json();
                // console.log(events)
                setData([...events]);
            } catch (error) {
                console.error(error);
            }
        };

        getEvents();
    }, []);

    let layoutData = []
    let startH = 8;
    
    for (let i = 0; i <= 540; i += 5){
        let time = '';
        let hour = 0;

        if (i === 0) {
            time = `${startH}:00`;
        } else if (!(i % 30)) {
            if (!(i % 60)) {
                hour = startH + i / 60
                time = `${hour}:00`;
            } else {
                hour = startH + Math.floor(i / 60);
                time = `${hour}:30`;
            }
        }
        layoutData.push({key: i, lable: time})
    }

    function renderSell(slot) {
       const events = data.filter(item => (item.start <= slot && (item.start + item.duration) > slot)).sort((a, b)=> a.start-b.start);
       
        const eventsFull = [...events];
        console.log(eventsFull)
        events.map(event => {
            for (let i = 0; i < data.length; i++) {
                if (event._id !== data[i]._id && slot < data[i].start && (event.start + event.duration) > data[i].start)
                { eventsFull.push({}) }
                else if (
                   event._id !== data[i]._id && slot >= (data[i].start + data[i].duration) &&  (event.start <= data[i].start))
                {
                    eventsFull.unshift({}) 
                }
               
            }
        })

            
        if (!!events.length) {
            return (eventsFull.map(item => (item._id ?
                (<Link key={item._id} href={`/editEvent/${item._id}`} className='bg__div--event'>
                    <h2 style={{position: 'relative', zIndex: 20}}>{slot === item.start && item.title}</h2>
                </Link>)
            : (<div key={slot} className="bg__div"></div>)
            )));
        } else {return (<div key={slot} className="bg__div"></div>)}
        
            
           
        //    ? (
        //                     data
        //                     .filter(all => (all.start <= container.key && (all.start + all.duration) >= container.key))
        //                     .map(item => (
        //                         <div key={item._id} className="bg__div--event">
        //                         {container.key===item.start ? `${item.title}`: ''}
        //                         </div>
        //                     ))
        //                 ) : (
        //                 <div key={container.key} className="bg__div"></div>
        //                 )
        
    }

    return (
        <>
            <div className="bg__wrapper">
                
                
                {layoutData.map((container) => (
                    <div key={container.key} className="bg__minutes">
                        <span className="bg__span">{container.lable}</span>
                        <div className="bg__sell">
                            {renderSell(container.key)}
                            </div>
                        {/* {!!data.filter(item => (item.start <= container.key && (item.start + item.duration) >= container.key)).length ? (
                            data
                            .filter(all => (all.start <= container.key && (all.start + all.duration) >= container.key))
                            .map(item => (
                                <div key={item._id} className="bg__div--event">
                                {container.key===item.start ? `${item.title}`: ''}
                                </div>
                            ))
                        ) : (
                        <div key={container.key} className="bg__div"></div>
                        )}  */}
                    </div>
                ))} 
      
            </div>

        </>
    )
}