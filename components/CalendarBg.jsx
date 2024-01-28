import EventList from '@/components/EventList';
import { useState, useEffect } from 'react';
import Link from "next/link"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"; 


export default function CalendarBg() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getEvents = async () => {
            setLoading(true);
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
            setLoading(false);
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

    
    const sellWidth = 496;
    function renderSell(slot) {
        const events = data.filter(item => (item.start <= slot && (item.start + item.duration) > slot)).sort((a, b)=> a.start-b.start);
        const eventsFull = [...events];
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
            return (eventsFull.map((item, index) => (item._id ?
                (<Link key={item._id} href={`/editEvent/${item._id}`} className='bg__div--event' style={{ width: sellWidth/eventsFull.length}}>
                    <h2 style={{position: 'relative', zIndex: 20}} className='bg__div--title' style={{ width: (sellWidth/eventsFull.length)}}>{slot === item.start && item.title}</h2>
                </Link>)
            : (<div key={`${slot}+${index}`} className="bg__div"></div>)
            )));
        } else {return (<div key={slot} className="bg__div" ></div>)}
    }
    return (
        <>
            <div className="bg__wrapper">
                {loading && <Loader 
                    type="Puff"
                    color="#00BFFF"
                    height={100} 
                    width={100} 
                    timeout={3000}  
                    style={{position: 'absolute',  top: '50%', left: '50%', tranform: 'translate(-50%, -50%)', zIndex: '100'}}
                />  }
                
                {layoutData.map((container) => (
                    <div key={container.key} className={` ${container.key%60===0 ? 'bg__minutes--line' : 'bg__minutes'} `}>
                        <span className={` ${(container.key+30) % 60 === 0 ? 'bg__span--small' : 'bg__span'} `}>{container.lable}</span>
                        <div className="bg__sell">
                            {renderSell(container.key)}
                        </div>
                    </div>
                ))} 
      
            </div>

        </>
    )
}