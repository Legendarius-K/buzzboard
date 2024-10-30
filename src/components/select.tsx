'use client'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

export default function BasicSelect() {
    const [category, setCategory] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 300, maxWidth: 350 }}>
            <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                
                    labelId="category-label"
                    id="category"
                    value={category}
                    label="Category"
                    name='category'
                    onChange={handleChange}
                    sx={{
                        borderRadius: '50px',  // Round shape
                        border: '3px solid snow', 
                        paddingLeft: '10px'   // Border style                      
                    }}
                >
                    <MenuItem value={'coding'}>Coding</MenuItem>
                    <MenuItem value={'general'}>General</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
