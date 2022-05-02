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

import { NoResults } from '../NoResults/NoResults'


export let ShowingMovies = (props:any) => {

    interface FilteredMovieShowings {
        type: string,
        ratings: string,
        room_id: number;
        movie_id: number,
        movie_name: string,
        production_date: string,
        movie_summary: string,
        image_url: string,
        movie_length_in_minutes: number,
        show_datetime: string
    }

    const [ date1, setDate1 ] = useState("none")
    const [ date2, setDate2 ] = useState("none")
    const [ title, setTitle ] = useState("none")
    const [ buttonClicked, setButtonClicked ] = useState(false)
    const [ resultsFound, setResultsFound ] = useState(true)

    const [ movies, setMovies ] = useState<FilteredMovieShowings []>([])

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
        setDate1(event.target.value as string)
    };

    const handleChangeDate2 = (event: SelectChangeEvent) => {
        setDate2(event.target.value as string)
    };

    const getMovieShowingsData = async(month1: string, month2: string, title: string) => {
        const data_request = `/api/movieShowings/filter/date1=${month1}_date2=${month2}_title=${title}`
        try {
            const response = await fetch(data_request)
            const data = await response.json()
            setMovies(data)
        } catch (error) {
            console.log("Error: ")
            console.log(error)
        }
    }

    const handleClick = (e: any) => {
        getMovieShowingsData(date1, date2, title)
        setButtonClicked(true)
    }

    useEffect(() => {
        getMovieShowingsData(date1, date2, title)
        if (movies.length == 0) {
            setResultsFound(false)
        } else {
            setResultsFound(true)
        }
    }, [buttonClicked, movies.length])

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
                        <TextField id="outlined-basic"
                                    label="Title"
                                    variant="outlined"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}/>
                    </FormControl>
                    <FormControl variant="outlined" sx={{ m: 2, minWidth: 120 }}>
                        <Button variant="outlined" onClick={(e) => handleClick(e)}>Filter</Button>
                    </FormControl>
                </Box>
            </div>

            <Box sx={{ flexGrow: 1 }}>
            {resultsFound?
                <Grid container spacing={{ xs: 4, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {movies.map((item, index) => (
                    <Grid item xs={2} sm={3} md={3} key={index}>
                        <Link to = {`/buyTicket/${item.movie_id}`}>
                            <Item>
                                <img src={item.image_url}/>
                                <p>{item.movie_name}</p>
                                <p><b>Showing on:</b> {new Date(item.show_datetime).toString()}</p>
                                <p><b>Room:</b> {item.room_id}</p>
                            </Item>
                        </Link>
                    </Grid>
                  ))}
                </Grid> : <NoResults />
            }
            </Box>
        </Container>
    )

}