import { Container, Dropdown } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState, Fragment } from "react"
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';


import './ShowingMovies.css'


export let ShowingMovies = (props:any) => {

    const [ date1, setDate1 ] = useState("")
    const [ date2, setDate2 ] = useState("")
    const [ title, setTitle ] = useState("")

    const months = [ {index: 1, month: "January"},
                    {index: 2, month: "February"},
                    {index: 3, month: "March"},
                    {index: 4, month: "April"},
                    {index: 5, month: "May"},
                    {index: 6, month: "June"},
                    {index: 7, month: "July"},
                    {index: 8, month: "August"},
                    {index: 9, month: "September"},
                    {index: 10, month: "October"},
                    {index: 11, month: "November"},
                    {index: 12, month: "December"} ];

    const handleChangeDate1 = (event: SelectChangeEvent) => {
        setDate1(event.target.value as string);
    };

    const handleChangeDate2 = (event: SelectChangeEvent) => {
        setDate2(event.target.value as string);
    };

    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(4),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));


    return (
        <Container className = "ShowingMovies">
            <h1>Currently Showing Movies</h1>
            <div className = "Filters">
                <Box sx={{ minWidth: 120 }}>
                    <FormControl sx={{ m: 2, minWidth: 120 }}>
                        <h4>Filters</h4>
                    </FormControl>
                    <FormControl variant="outlined" sx={{ m: 2, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Start Month</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={date1}
                            label="Start Month"
                            onChange={handleChangeDate1}>
                            { months.map( (item) => {
                                return (<MenuItem value={item.index} key = {item.index}>{item.month}</MenuItem>)
                            } ) }
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" sx={{ m: 2, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">End Month</InputLabel>
                        <Select labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={date2}
                                label="End Month"
                                onChange={handleChangeDate2}>
                                { months.map( (item) => {
                                    return (<MenuItem value={item.index} key = {item.index}>{item.month}</MenuItem>)
                                } ) }
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" sx={{ m: 2, minWidth: 120 }}>
                        <TextField id="outlined-basic" label="Title" variant="outlined" />
                    </FormControl>
                    <FormControl variant="outlined" sx={{ m: 2, minWidth: 120 }}>
                        <Button variant="outlined">Find</Button>
                    </FormControl>
                </Box>
            </div>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 4, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {Array.from(Array(8)).map((_, index) => (
                    <Grid item xs={2} sm={3} md={3} key={index}>
                        <Link to = '/buyTicket/1'>
                            <Item>
                                <img src="https://m.media-amazon.com/images/I/61aG6EicTIL._AC_SY741_.jpg"/>
                                <p>Harry Potter and the Deathly Hallows</p>
                                <p>Showing on: 2022/1/02 00:00:00</p>
                            </Item>
                        </Link>
                    </Grid>
                  ))}
                </Grid>
            </Box>



        </Container>
    )

}