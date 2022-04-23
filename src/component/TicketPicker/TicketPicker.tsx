import 'bootstrap/dist/css/bootstrap.css'
import { Container, Col, Row, Button } from "react-bootstrap"
import "./TicketPicker.css"
import { SeatPicker } from "./SeatPicker/SeatPicker"
import { RoomTimePicker } from "./RoomTimePicker/RoomTimePicker"
import { MovieDescriptionSidebar } from "./MovieDescriptionSidebar/MovieDescriptionSidebar"
import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

/**
 *
 * @author Min Lu
 *
 * The Ticket Selection Component. Allow user to select date and seats and submit request for movie ticket.
 * */
export let TicketPicker = (props: any) => {
    const movie_id = 1
    const user_id = 1
//     const navigate = useNavigate()
    // const {user_id} = useParams() - change to this after linking user with this
    // const {movie_id} = useParams() - change to this after linking movie selector with this

    const [selectedDatetime, setSelectedDatetime] = useState("")
    const [selectedRoom, setSelectedRoom] = useState(-1)
    const [selectedSeat, setSelectedSeat] = useState(-1)
    const [price, setPrice] = useState(0.0);

    const [hasSelectedRoomTime, setHasSelectedRoomTime] = useState(false)
    const [hasSelectedSeat, setHasSelectedSeat] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)

    function toggleHandleSelectSeat(seat_id: number) {
        if (hasSelectedSeat && seat_id === -1) {
            setHasSelectedSeat(false)
            setSelectedSeat(-1)
        } else {
            setHasSelectedSeat(true)
            setSelectedSeat(seat_id)
        }
    }

    function toggleHandleSelectRoomTime(room_id: number, datetime: string) {
        if (hasSelectedRoomTime && room_id == -1 && datetime == "") {
            setHasSelectedRoomTime(false)
            setSelectedRoom(-1)
            setSelectedDatetime("")
        } else {
            setHasSelectedRoomTime(true)
            setSelectedRoom(room_id)
            setSelectedDatetime(datetime)
        }
    }

    function handleReturn(e: any) {
        setHasSelectedRoomTime(false)
        setHasSelectedSeat(false)
        setHasSubmitted(false)
    }

    const getPrice = async(movie_id: number, room_id: number, datetime: string) => {
        const price_request = `/api/movieShowings/price/movie=${movie_id}_room=${room_id}_dt=` + encodeURI(datetime)
//         console.log(price_request)
        try {
            const response = await fetch(price_request)
            const price_data = await response.json()
            setPrice(price_data)
//             console.log(price_data)
        } catch (error) {
            console.log("Error: ")
            console.log(error)
        }
    }

    function handleSubmit(movie_id: number, room_id: number, datetime: string, seat_id: number, e: any) {
        console.log("Room ID: " + room_id + "DateTime: " + datetime + "Seat: " + seat_id)
        const d = new Date(datetime)
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric', timeZone: 'UTC' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit', timeZone: 'UTC' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit', timeZone: 'UTC' }).format(d);
        let hr = new Intl.DateTimeFormat('en', { hour: '2-digit', hour12: false, timeZone: 'UTC' }).format(d);
        let min = new Intl.DateTimeFormat('en', { minute: '2-digit', timeZone: 'UTC' }).format(d);
        let sec = new Intl.DateTimeFormat('en', { second: '2-digit', timeZone: 'UTC' }).format(d);

        if (min.length == 1) {
            min = "0" + min
        }
        if (sec.length == 1) {
            sec = "0" + sec
        }

        const datetime_str = `${ye}-${mo}-${da} ${hr}:${min}:${sec}` // "yyyy-MM-dd HH:mm:ss"

        getPrice(movie_id, room_id, datetime_str)

        if (!hasSubmitted) {
            setHasSubmitted(true)
        }
//         console.log(`DatetimeString: ${datetime_str}`);

    }

    useEffect(() => {
        console.log(selectedRoom + " " + selectedDatetime + " " + selectedSeat)
    }, [selectedRoom, selectedDatetime, selectedSeat])

    return (
        <Container className="TicketPicker-container align-items-center">
            <Row className="TicketPicker-row align-items-center justify-content-center">
                <Col md={5}
                    className="Sidebar">
                    <MovieDescriptionSidebar selectedMovie={movie_id}/>
                </Col>

                <Col md={5}
                    className="Selectors">
                    {!hasSelectedRoomTime &&
                    <>
                    <h4 className="RoomTimePicker-h4">Pick your Room and Time...</h4>
                    <RoomTimePicker selectRoomTime={toggleHandleSelectRoomTime}
                                    selectedMovie={movie_id}/>
                    </>
                    }

                    {hasSelectedRoomTime &&
                        <>
                            <h4 className="SeatPicker-h4">Pick your seat...</h4>
                            <SeatPicker selectSeat={toggleHandleSelectSeat}
                                        selectedMovie={movie_id}
                                        selectedRoom={selectedRoom}
                                        selectedDatetime={selectedDatetime}
                                        submitted={hasSubmitted} />
                        </>
                    }


                    {(hasSelectedRoomTime || hasSelectedSeat) &&
                        <div className="TicketPicker-btn-container">
                             {hasSelectedRoomTime &&
                                <Button className="SeatPicker-btn"
                                    onClick={handleReturn}
                                    style = { {float: "left",
                                               marginLeft: hasSelectedSeat? "34%": "46%"
                                            } }>
                                    Return
                                </Button>
                             }

                             {hasSelectedSeat &&
                                <Button className="Submit-btn"
                                    onClick={(e: any) => handleSubmit(movie_id,
                                                                        selectedRoom,
                                                                        selectedDatetime,
                                                                        selectedSeat,
                                                                        e)}
                                                                        style={ {
                                                                                float: "right",
                                                                                marginRight: "25%"
                                                                        } }>
                                    Submit
                                </Button>
                             }
                        </div>
                    }
                </Col>
            </Row>
        </Container>
    )
}