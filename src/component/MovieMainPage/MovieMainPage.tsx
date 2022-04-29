import 'bootstrap/dist/css/bootstrap.css'
import {Col, Row, Button, Container} from "react-bootstrap";
import { Link } from 'react-router-dom'
import "./MovieMainPage.css"
import React, { useState, useEffect, useRef, Component } from 'react'

export let MovieMainPage = (props: any) => {
     const mountedRef = useRef(true)
    const name = 'movies'
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
    const [ movies, setMovies ] = useState<Movie []>([])
    const top15 = [ {index: 1, number: "1"},
                               {index: 2, number: "2"},
                               {index: 3, number: "3"},
                               {index: 4, number: "4"},
                               {index: 5, number: "5"},
                               {index: 6, number: "6"},
                               {index: 7, number: "7"},
                               {index: 8, number: "8"},
                               {index: 9, number: "9"},
                               {index: 10, number: "10"},
                               {index: 11, number: "11"},
                               {index: 12, number: "12"},
                                {index : 13, number: "13"},
                                {index : 14, number: "14"},
                                {index : 15, number: "15"}];
    const getURL = async(name : string)=> {
                 const movie_request = `/api/${name}`
                 try {
                     const response = await fetch(movie_request)
                     const url_data = await response.json()
                     setMovies(url_data)
                 } catch (error) {
                     console.log("Error: ")
                     console.log(error)
                 }
      }


    useEffect(() => {
                getURL(name)
                return () => { mountedRef.current = false }
         })
// <img src={item.image_url} width="250" height="350"/>
/*
<Link to = {`/buyTicket/1`}>
                                <img src={item.image_url} width="250" height="350"/>
                          </Link>*/

    return (
        <Container className="MovieMainPage">
        <h1>Trending Movie</h1>
        <div className="scrollable">
                         {movies.map((item, index) => (
                         <Link to = {`/buyTicket/${index+1}`}>
                                     <img src={item.image_url} width="250" height="350"/>
                          </Link>

                         ))}

        </div>


        </Container>
    )
}