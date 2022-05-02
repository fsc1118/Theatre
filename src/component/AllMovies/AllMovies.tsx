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
import { NoResults } from '../NoResults/NoResults'
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import './AllMovies.css'

export let AllMovies = (props: any) => {
    interface FilteredMovies {
        type: string,
        ratings: string,
        movie_name: string,
        production_date: string,
        movie_summary: string,
        image_url: string,
        movie_length_in_minutes: number,
    }

    const [ year, setYear] = useState("none")
    const [ title, setTitle ] = useState("none")
    const [ buttonClicked, setButtonClicked ] = useState(false)
    const [ resultsFound, setResultsFound ] = useState(true)
    const [ movies, setMovies ] = useState<FilteredMovies []>([])

    const years = [ {index: 2001, yearX: "2001"},
                        {index: 2002, yearX: "2002"},
                        {index: 2003, yearX: "2003"},
                        {index: 2004, yearX: "2004"},
                        {index: 2005, yearX: "2005"},
                        {index: 2006, yearX: "2006"},
                        {index: 2007, yearX: "2007"},
                        {index: 2008, yearX: "2008"},
                        {index: 2009, yearX: "2009"},
                        {index: 2010, yearX: "2010"},
                        {index: 2011, yearX: "2011"},
                        {index: 2012, yearX: "2012"},
                        {index: 2013, yearX: "2013"},
                        {index: 2014, yearX: "2014"},
                        {index: 2015, yearX: "2015"},
                        {index: 2016, yearX: "2016"},
                        {index: 2017, yearX: "2017"},
                        {index: 2018, yearX: "2018"},
                        {index: 2019, yearX: "2019"},
                        {index: 2020, yearX: "2020"},
                        {index: 2021, yearX: "2021"},
                        {index: 2022, yearX: "2022"}];

    const handleChangeYear = (event: SelectChangeEvent) => {
            setYear(event.target.value as string)
    };

    const getMoviesData = async(year1: string, title: string) => {
            const year_request = `/api/movies/filter/year=${year1}_title=${title}`

            try {
                    const response = await fetch(year_request)
                    const data = await response.json()
                    console.log(year_request)
                    setMovies(data)
            } catch (error) {
                console.log("Error: ")
                console.log(error)
            }
    }

    const handleClick = (e: any) => {
            getMoviesData(year, title)
            setButtonClicked(true)
    }

    useEffect(() => {
            getMoviesData(year, title)
            if (movies.length === 0) {
                console.log("didn't found!!!")
                setResultsFound(false)
            } else {
                setResultsFound(true)
                console.log(movies.length)
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
        <Container className="AllMovies">
            <h1>All Movies!</h1>
            <div className = "Filters">
            <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ m: 2, minWidth: 120 }}>
                    <h4>Filters</h4>
                </FormControl>
                <FormControl variant="outlined" sx={{ m: 2, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                        <Select labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={year}
                                label="Year"
                                onChange={handleChangeYear}>
                                { years.map( (item) => {
                                    return (<MenuItem value={item.index} key = {item.index}>{item.yearX}</MenuItem>)
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
                                         <Item>
                                         <img src={item.image_url} />
                                         <p>{item.movie_name}</p>
                                          <p><b>Year:</b> {item.production_date.substring(0, 4)}</p>
                                          <p><b>Movie Length:</b> {item.movie_length_in_minutes}mins</p>
                                          </Item>
                               </Grid>
                             ))}
                           </Grid> : <NoResults />
                       }
                       </Box>
        </Container>
    )
}

