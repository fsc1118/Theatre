import {Col, Container, Form,Row} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState, Fragment } from "react"
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { v4 as uuid } from 'uuid'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';

import './ShowingMovies.css'
import AppConfig, { DEFAULT } from "../../config/global";
import { NoResults } from '../NoResults/NoResults'
import React from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


export let ShowingMovies = (props: any) => {
    interface Movie {
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
    const LOADING: Array<Movie> = []
    const [movie, setMovie]: [Array<Movie>, any] = useState(LOADING)
    const [movieFiltered, setMovieFiltered]: [Array<Movie>, any] = useState(LOADING)

    const [startDate, setStartDate] : [string, any] = useState(new String(new Date()).valueOf())
    const [endDate, setEndDate] : [string, any] = useState(new String(new Date()).valueOf())
    const [title, setTitle] : [string, any] = useState("")
    const [mpaa, setMpaa] : [string, any] = useState("")
    useEffect(() => {
        const data_request = AppConfig.SERVER_IP + "api/movies"
        fetch(data_request).then((response) => {
            return response.json()
        }).then((movie) => {
            setMovie(movie)
            setMovieFiltered(movie)
        }).catch((error) => {
            window.location.replace("/index.html")
        })
    }, [])

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const mpaaRating = ["G", "PG", "PG-13", "R", "NC-17"]

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }))

    const onFormSubmit = (e: any) => {
        e.preventDefault()
        e.target.reset()
        let allMovies = [...movie]
        e.target.reset()
        if (title !== "") {
            allMovies = allMovies.filter((movie: Movie)=>{
                return movie.movie_name.toUpperCase() === title.toUpperCase()
            })
        }
        if (mpaa !== "") {
           allMovies = allMovies.filter((movie: Movie)=>{
                return movie.ratings.toUpperCase() === mpaa.toUpperCase()
            })
        }
        if (startDate !== "") {
            allMovies = allMovies.filter((movie: Movie)=>{
                return new Date(startDate) < new Date(movie.production_date)
            })
        }
        if (endDate !== "") {
            allMovies = allMovies.filter((movie: Movie)=>{
                return new Date(endDate) > new Date(movie.production_date)
            })
        }
        setMovieFiltered(allMovies)
    }

    if (movie === LOADING) {
        return <div>
            Loading...
        </div>
    }

    return (
        <Container className="ShowingMovies">
            <h1>Currently Showing Movies</h1>
            <Container className="Filters">
                <Row>
                    <Form onSubmit={onFormSubmit} >
                        <FormControl variant="outlined" sx={{ m: 2, minWidth: 120 }} className={"filter"}>
                            <label>Start</label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    value = {startDate}
                                    onChange = {(e: any)=>{
                                        setStartDate(e)
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>

                        <FormControl variant="outlined" sx={{ m: 2, minWidth: 120 }} className={"filter"}>
                            <label>End</label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    value = {endDate}
                                    onChange = {(e: any)=>{
                                       setEndDate(e)
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>

                        <FormControl variant="outlined" sx={{ m: 2, minWidth: 120 }} className={"filter"}>
                            <label>MPAA Rating</label>
                            <Form.Select value={mpaa} aria-label="Default select example" onChange={(event:any)=>{
                                setMpaa(event.target.value)
                            }}>
                                {mpaaRating.map((item) => {
                                    return (<option key={uuid()} value={item}>{item}</option>)
                                })}
                            </Form.Select>
                        </FormControl>
                        <FormControl variant="outlined" sx={{ m: 2, minWidth: 120}} className={"filter"}>
                            <label>Title</label>
                            <TextField value = {title} onChange={(event:any)=>{
                                setTitle(event.target.value)
                            }}/>
                        </FormControl>
                        <FormControl sx={{ m: 2, minWidth: 120 }} className={"filter"}>
                            <label><br/></label>
                            <Button type={"submit"} variant="contained" size={"large"}  style={{
                                backgroundColor: "#21b6ae",
                                borderRadius: 10,
                                padding: "4px 18px",
                                bottom: "10"
                            }}>Search</Button>
                        </FormControl>

                    </Form>
                </Row>
            </Container>

            <Box sx={{ flexGrow: 1 }}>
                {movieFiltered === null || movieFiltered.length !== 0 ?
                    <Grid container spacing={{ xs: 4, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {movieFiltered!.map((item) => (
                            <Grid item xs={2} sm={3} md={3} key={uuid()}>
                                <Link to={`/buyTicket/${item.movie_id}`}>
                                    <Item>
                                        <img src={item.image_url} />
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
        </Container >
    )
}