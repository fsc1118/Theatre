import 'bootstrap/dist/css/bootstrap.css'
import { Container, Col, Row, Button } from "react-bootstrap"
import "./TicketPicker.css"
import { SeatPicker } from "./SeatPicker/SeatPicker"
import { RoomTimePicker } from "./RoomTimePicker/RoomTimePicker"
import { MovieDescriptionSidebar } from "./MovieDescriptionSidebar/MovieDescriptionSidebar"
import React, { useState, useEffect } from "react"

/**
 *
 * @author Min Lu
 *
 * The Ticket Selection Component. Allow user to select date and seats and submit request for movie ticket.
 * */
export let TicketPicker = (props: any) => {
    const [selectedSeat, setSelectedSeat] = useState(-1)
    const [selectedRoom, setSelectedRoom] = useState(-1)
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [hasSelectedRoomTime, setHasSelectedRoomTime] = useState(false)
    const [hasSelectedSeat, setHasSelectedSeat] = useState(false)

    function toggleHandleSelectSeat(seat_id: number) {
        if (hasSelectedSeat && seat_id === -1) {
            setHasSelectedSeat(false)
            setSelectedSeat(-1)
        }
        else {
            setHasSelectedSeat(true)
            setSelectedSeat(seat_id)
        }
    }

    function toggleHandleSelectRoomTime(room_id: number, date: string, time: string) {
        if (hasSelectedRoomTime && room_id == -1 && date == "" && time == "") {
            setHasSelectedRoomTime(false)
            setSelectedRoom(-1)
            setSelectedDate("")
            setSelectedTime("")
        } else {
            setHasSelectedRoomTime(true)
            setSelectedRoom(room_id)
            setSelectedDate(date)
            setSelectedTime(time)
        }
    }

    function handleReturn(e: any) {
        setHasSelectedRoomTime(false)
        setHasSelectedSeat(false)
    }

    function handleSubmit(room_id: number, date: string, time: string, seat_id: number, e: any) {
        console.log("Room ID: " + room_id + "Date: " + date + "Time: " + time + "Seat: " + seat_id)
    }

    useEffect(() => {
        console.log(selectedRoom + " " + selectedDate + " " + selectedTime)
    }, [selectedRoom, selectedDate, selectedTime])

    return (
        <Container className="TicketPicker-container align-items-center">
            <Row className="TicketPicker-row align-items-center justify-content-center">
                <Col md={5}
                    className="Sidebar">
                    <MovieDescriptionSidebar />
                </Col>

                <Col md={5}
                    className="Selectors">
                    {!hasSelectedRoomTime &&
                    <>
                    <h4 className="RoomTimePicker-h4">Pick your Room and Time...</h4>
                    <RoomTimePicker selectRoomTime={toggleHandleSelectRoomTime}/>
                    </>
                    }

                    {hasSelectedRoomTime &&
                        <>
                            <h4 className="SeatPicker-h4">Pick your seat...</h4>
                            <SeatPicker selectSeat={toggleHandleSelectSeat}/>
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
                                    onClick={(e: any) => handleSubmit(selectedRoom,
                                                                        selectedDate,
                                                                        selectedTime,
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