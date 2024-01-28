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

export default function AddEvent() {
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(30);
    const [hours, setHours] = useState(8);
    const [minutes, setMinutes] = useState(0);
    const [start, setStart] = useState(0)

     useEffect(() => {
        const startTime = (hours*60 + minutes) - 8*60
        setStart(startTime);
     }, [hours, minutes]); 
    
    const router = useRouter();
    const minArray = Array.from({ length: 12 }, (_, index) => index * 5);

    const handleSubmit = async (e)=>{
        e.preventDefault();
      if ((start + duration) > 540) {
        setDuration((prev) => {
      const newDuration = 540 - start;
      console.log(newDuration); // Новое значение
      return newDuration;
    });
        }
        if (!title) {
            toast("Type something in title field...");
        } else {
      
            try {
                const res = await fetch("http://localhost:3001/api/events/", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ title, start, duration })
                });
                if (res.ok) {
                    router.push('/');
                } else {
                    throw new Error("Failed to create an event")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const durationChange = (event) => {
      setDuration(event.target.value);
    };
      const hoursChange = (event) => {
        setHours(event.target.value);
    }; 
         const minutesChange = (event) => {
        setMinutes(event.target.value);
    }; 
    return (
        <form onSubmit={handleSubmit} className="form__container">
            <h3 className='form__title'>Let's create event...</h3>
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
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </Box>
            <h4 className='form__title--params'>Change event duration</h4>
            <Slider
                aria-label="Duration"
                defaultValue={30}
                value={duration}
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
                    height: '50px',
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

            <div className="buttons__container">
                <Button variant="outlined" type="submit">Save event</Button>
            </div>
     
            

      </form>
    );
}