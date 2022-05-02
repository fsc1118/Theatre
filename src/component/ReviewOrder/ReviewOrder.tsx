import 'bootstrap/dist/css/bootstrap.css'
import {Col, Row, Button, Container} from "react-bootstrap";
import "./ReviewOrder.css"
import axios from 'axios'
import React, { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"


export let ReviewOrder = (props: any) => {
    type TicketInfo = {
        user_id?: number,
        movie_id?: number,
        room_id?: number,
        datetime?: string,
        datetimeFormated?: string,
        seat_id?: number,
        price?: number
    }

    type Movie = {
        type?: string,
        ratings?: string,
        movie_name?: string,
        production_date?: string,
        movie_summary?: string,
        image_url?: string,
        movie_length_in_minutes?: number,
        number_tickets_sold?: number,
        total_earnings?: number
    }
 
    const { state } = useLocation() as { state: TicketInfo }

    const [ticketInfo, setTicketInfo] = useState<TicketInfo>({})

    const [movie, setMovie] = useState<Movie>({})

    const mountedRef = useRef(true)

    const getMovieInfo = async(movie_id: number) => {
        const movieInfo = `/api/movies/${movie_id}`

        try {
            const response = await fetch(movieInfo)
            const movieData = await response.json()
            setMovie(movieData)
        } catch (error) {
            console.log("Error: ")
            console.log(error)
        }
    }

    function handleSubmit(e: any) {
        const request = {
            "movie_id": `${state.movie_id}`,
            "room_id": `${state.room_id}`,
            "user_id": `${state.user_id}`,
            "seat_num": `${state.seat_id}`,
            "datetime": state.datetime
        }

         axios.post('/api/ticket/buy', request)
         .then(function (response: any) {
             console.log(response)         
             navigate('/purchaseComplete', { state: {
                movie_name: movie.movie_name!,
                total_paid: Number.parseFloat((ticketInfo.price! * 0.07 + 1.5 + ticketInfo.price!).toString()).toFixed(2)
            }})
         })
         .catch(function (error: any) {
             console.log(error)
         })
    }

    
    useEffect(() => {
        setTicketInfo(state)
        
        if (state.movie_id) {
            getMovieInfo(state.movie_id)
        }      

        return () => { mountedRef.current = false }
    }, [state])

    const rowLetters = ["A", "B", "C", "D", "E", "F"]
    const navigate = useNavigate()

    return (
        <>
        { ticketInfo != {} ?
        <Container className="lineContainer">
        <h1>REVIEW YOUR ORDER</h1>
        <br></br>

        <u><h2 id = "movieName">{movie.movie_name}</h2></u>
        <br></br>
        
        <Row className="justify-content-md-center">
            <Col xs md="4">
                <h5 style={{display: "inline"}}>SHOWTIME: </h5>
                <p id="reviewShowtime" style={{display: "inline"}}>{ticketInfo.datetimeFormated}</p>
            </Col>
            <Col xs md="3">
                <h5 style={{display: "inline"}}>RUNTIME: </h5>
                <p id="reviewMovieRuntime" style={{display: "inline"}}>{movie.movie_length_in_minutes} minutes</p>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col xs md="4">
                <h5 style={{display: "inline"}}>SEAT: </h5>
                <p id="reviewSeats" style={{display: "inline"}}>{rowLetters[Math.floor((ticketInfo.seat_id!-1)/5)]}{(ticketInfo.seat_id! % 5)!=0?ticketInfo.seat_id!%5:5}</p>
            </Col>
            <Col xs md="3">
                <h5 style={{display: "inline"}}>RATING: </h5>
                <p id="reviewSeats" style={{display: "inline"}}>{movie.ratings}</p>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col xs md="4">
                <h5 style={{display: "inline"}}>ROOM: </h5>
                <p id="reviewSeats" style={{display: "inline"}}>{ticketInfo.room_id}</p>
            </Col>
            <Col xs md="3"></Col>
        </Row>

        <br></br>
        <Container className="lineContainer">
            <hr></hr>
        </Container>

        <Row className="justify-content-md-center">
            <Col xs md="5">
                <h4><b>Order Summary</b></h4>
            </Col>
            <Col xs md="2"></Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col xs md="5">
                <p style={{display: "inline"}}>Normal Ticket x1</p>
            </Col>
            <Col xs md="2">
                <p style={{display: "inline"}}>$</p>
                <p className = "reviewTicketPrice" style={{display: "inline"}}>{ticketInfo.price}</p>
                <p style={{display: "inline"}}> x1</p>
            </Col>
        </Row>

        <br></br>
        <Container className="lineContainer">
            <hr></hr>
        </Container>

        <Row className="justify-content-md-center">
            <Col xs md="5">
                <h4><b>Subtotal</b></h4>
            </Col>
            <Col xs md="2">
                <b>
                    <p style={{display: "inline"}}>$</p>
                    <p id = "reviewSubtotal" style={{display: "inline"}}>{ticketInfo.price}</p>
                </b>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col xs md="5">
                <p>Taxes and Fees</p>
            </Col>
            <Col xs md="2">
                <p style={{display: "inline"}}>$</p>
                <p id = "reviewTicketPrice" style={{display: "inline"}}>{Number.parseFloat((ticketInfo.price! * 0.07 + 1.5).toString()).toFixed(2)}</p>
            </Col>
        </Row>
        <br></br>
        <Row className="justify-content-md-center">
            <Col xs md="5">
                <h4 style={{display: "inline"}}><u><b>Total</b></u></h4>
            </Col>
            <Col xs md="2">
                <p style={{display: "inline"}}>$</p>
                <p id = "reviewTicketPrice" style={{display: "inline"}}>{Number.parseFloat((ticketInfo.price! * 0.07 + 1.5 + ticketInfo.price!).toString()).toFixed(2)}</p>
            </Col>
        </Row>

        <br></br>
        <Container className="lineContainer">
            <hr></hr>
        </Container>

        <Row className="justify-content-md-center">
            <Col xs md="5">
                <h4><b>Payment Methods</b></h4>
                <Button id="submitOrderBtn"
                    style={{backgroundColor: "#000"}}
                    onClick={(e: any) => handleSubmit(e)}>
                    Pay full amount
                </Button>
            </Col>
            <Col xs md="2"></Col>
        </Row>

        <br></br>
        <Container className="lineContainer">
            <hr></hr>
        </Container>

        <Row className="justify-content-md-center">
            <Col md="auto">
                <Button id="reviewOrderBackBtn"
                    style={{backgroundColor: "#FFB511"}}
                    onClick={(e: any) => navigate(-1)}>
                    <b>Back</b>
                </Button>
            </Col>
        </Row>
    </Container> :
    undefined}
    </>
    )
}