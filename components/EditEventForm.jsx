'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RemoveBtn from './RemoveBtn';



export default function EditEventForm({ event}) {
    
    const [newTitle, setNewTitle] = useState('');
    const [newDuration, setNewDuration] = useState(0);
    const [hours, setHours] = useState(8);
    const [minutes, setMinutes] = useState(0);
    const [newStart, setNewStart] = useState(0);
      
    useEffect(() => {
        if (event) {
            setNewTitle(event.title);
            setNewDuration(event.duration);
            setNewStart(event.start);
            setHours(Math.floor(event.start / 60) + 8);
            setMinutes(event.start%60)
        }
    }, [event]);

     useEffect(() => {
        const startTime = (hours*60 + minutes) - 8*60
         setNewStart(startTime);
        if ((newStart + newDuration) > 540) {
            setNewDuration((prev) => {
            const newDuration = 540 - newStart;
            return newDuration;
        });
        }
     }, [hours, minutes, newStart, newDuration]); 
    
    const router = useRouter();
    const minArray = Array.from({ length: 12 }, (_, index) => index * 5);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if ((newStart + newDuration) > 540) {
            setNewDuration((prev) => {
                const newDuration = 540 - newStart;
                return newDuration;
            });
        }
        if (!newTitle) {
            toast("Type something in title field...");
        } else {
        
            try {
                const res = await fetch(`http://localhost:3000/api/events/${event._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ newTitle, newStart, newDuration })
                });
                if (res.ok) {
                    router.push("/");
                } else { throw new Error("Failed to update event"); }
            
            } catch (error) {
                console.log(error)
            }
        }
    }

    const durationChange = (e) => {
        setNewDuration(e.target.value);
    };
    const hoursChange = (e) => {
        setHours(e.target.value);
    }; 
    const minutesChange = (e) => {
        setMinutes(e.target.value);
    }; 
    return (
        <>
        <form onSubmit={handleSubmit}>
            <h3 className='form__title'>Let&apos;s edit event...</h3>
            <Box
                sx={{
                    height: '44px',
                    width: '700px',
                    fontSize: '14px',
                    marginBottom: '25px',
                }}
                noValidate
                autoComplete="off"
                >
                <TextField id="outlined-basic" label="Title" variant="outlined" plaseholder="Enter title"
                    sx={{
                    height: '44px',
                    width: '700px',
                    fontSize: '20px',
                    }}
                    onChange={(e) => setNewTitle(e.target.value)}
                    value={newTitle}
                />
            </Box>

            <h4 className='form__title--params'>Change event duration</h4>

            <Slider
                aria-label="Duration"
                value={newDuration}
                onChange={durationChange}
                valueLabelDisplay="auto"
                step={5}
                marks
                min={5}
                max={180}
                sx={{
                    width: '700px',
                    fontSize: '20px',
                    }}
            />
             <h4 className='form__title--params'>Select event start</h4>
              <FormControl sx={{ m: 1, minWidth: 80  }}>
                <InputLabel id="demo-simple-select-autowidth-label">Hours</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={hours}
                    onChange={hoursChange}
                    autoWidth
                    label="Hours"
                    sx={{
                    width: '80px',
                    fontSize: '20px',
                    marginRight: '10px',
                    height: '50px',
                    }}
                    
                >
                   {[...Array(9).keys()].map((i) => (
                        <MenuItem key={i} value={i + 8}>
                            {i + 8}
                        </MenuItem>
                        ))}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Minutes</InputLabel>
                <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={minutes}
                onChange={minutesChange}
                autoWidth
                    label="Hours"
                    sx={{
                    width: '80px',
                    fontSize: '20px',
                    marginRight: '10px',
                    height: '50px',
                    }}
                >
                    {minArray.map((i) => (
                        <MenuItem key={i} value={i }>
                            {i }
                        </MenuItem>
                        ))}
                </Select>
            </FormControl>
            <div className="buttons__container">
                <Button variant="outlined" type="submit" sx={{marginRight: '10px',}}>Save event</Button>
                {event && event._id && <RemoveBtn id={`${event._id}`} />}
            </div>
        </form>
     </>
    )
}