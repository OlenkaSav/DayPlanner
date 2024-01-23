'use client';
import { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
    
    const minArray = Array.from({ length: 12 }, (_, index) => index * 5);

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
        <form>
            <Box
                component="form"
                // sx={{
                //     '& > :not(style)': { m: 1, width: '25ch' },
                // }}
                noValidate
                autoComplete="off"
                >
                <TextField id="outlined-basic" label="Title" variant="outlined" plaseholder="Enter title" />
                
            </Box>

            <Slider
            aria-label="Duration"
            defaultValue={30}
            onChange={durationChange}
            valueLabelDisplay="auto"
            step={5}
            marks
            min={5}
            max={180}
            />
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Hours</InputLabel>
                <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={hours}
                onChange={hoursChange}
                autoWidth
                label="Hours"
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
                >
                    {minArray.map((i) => (
                        <MenuItem key={i} value={i }>
                            {i }
                        </MenuItem>
                        ))}
                </Select>
            </FormControl>
     
            <Button variant="outlined">Save event</Button>

      </form>
    );
}