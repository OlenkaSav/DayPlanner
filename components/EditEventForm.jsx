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
     }, [hours, minutes]); 
    
    const router = useRouter();
    const minArray = Array.from({ length: 12 }, (_, index) => index * 5);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!newTitle) {
            toast("Type something in title field...");
        }
        try {
            const res = await fetch(`http://localhost:3001/api/events/${event._id}`, {
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

    const durationChange = (e) => {
        let dur = e.target.value;
        if ((newStart + dur) > 540) {
            dur = 480 - start;
        }
        setNewDuration(dur);
    };
      const hoursChange = (e) => {
        setHours(e.target.value);
    }; 
         const minutesChange = (e) => {
        setMinutes(e.target.value);
    }; 
    return (
        <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    height: '44px',
                    width: '700px',
                    fontSize: '14px',
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
                    marginRight: '10px'
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
                    marginRight: '10px'
                    }}
                >
                    {minArray.map((i) => (
                        <MenuItem key={i} value={i }>
                            {i }
                        </MenuItem>
                        ))}
                </Select>
            </FormControl>
     
            <Button variant="outlined" type="submit">Save event</Button>
             {event && event._id && <RemoveBtn id={`${event._id}`} />}

    </form>
    )
}