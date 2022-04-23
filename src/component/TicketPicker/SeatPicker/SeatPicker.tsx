import 'bootstrap/dist/css/bootstrap.css'
import {Table} from "react-bootstrap"
import "./SeatPicker.css"
import React, { useState, useEffect } from "react"

/**
 *
 * @author Min Lu
 *
 * The Seat Selection Component. Allow user to pick an available seat.
 * */
export let SeatPicker = (props: any) => {

    const [seats, setSeats] = useState<number []>([])
    const [availableSeats, setAvailableSeats] = useState<number []>([])
    const [selectedSeat, setSelectedSeat] = useState(-1)

    const getSeats = async(room_id: number) => {
        try {
            const response = await fetch(`/api/seats/${room_id}`)
            const seat_data = await response.json()
            setSeats([...seat_data])
        } catch (error) {
//             console.log(error)
        }
    }

    const getAvailableSeats = async(movie_id: number, room_id: number, showDatetime: string) => {
        try {
//             console.log(`ShowDateTime in SeatPicker: ${showDatetime}`)
            const api_url = '/api/seats/avail/movie=' + `${movie_id}_room=${room_id}_dt=` + encodeURI(showDatetime);
//             console.log(api_url)
            const response = await fetch(api_url) // change to this later

            const avail_seat_data = await response.json()
//             console.log("Avail seat data " + avail_seat_data)
            setAvailableSeats(avail_seat_data)
//             console.log(availableSeats)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSeats(props.selectedRoom) // change this later

        const d = new Date(props.selectedDatetime)
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        let hr = new Intl.DateTimeFormat('en', { hour: '2-digit', hour12: false }).format(d);
        let min = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(d);
        let sec = new Intl.DateTimeFormat('en', { second: '2-digit' }).format(d);
        if (min.length == 1) {
            min = "0" + min
        }
        if (sec.length == 1) {
            sec = "0" + sec
        }

        const datetime_str = `${ye}-${mo}-${da} ${hr}:${min}:${sec}` // "yyyy-MM-dd HH:mm:ss"
//         console.log(`GoodbyeFrom SeatPicker: ${datetime_str}`);

//         console.log("Datetime str: " + datetime_str)
        getAvailableSeats(props.selectedMovie, props.selectedRoom, datetime_str)
    }, [props.submitted, props.selectedMovie])

//     console.log("hello world")
//     console.log(seats)
//     console.log(seats.length)

    function handleAddSeat(id: number, e: any) {
        if (id === selectedSeat) {
            setSelectedSeat(-1)
            props.selectSeat(-1)
        } else {
            setSelectedSeat(id)
            props.selectSeat(id)
        }
//         console.log("hello " + id)
    }

    const copy_seats = [...seats]

    const newSeatArr:number[][] = []
    while (copy_seats.length) {
        newSeatArr.push(copy_seats.splice(0,5))
    }

    return (
        <>
            <h3 className={"SeatPicker-h3"}>Screen</h3>
            <Table className={"SeatPicker"} responsive="sm">
                <tbody className={"SeatPicker-Body"}>
                    {newSeatArr.map((rows: number [], index) => {
                        return (
                            <tr key = {index} className={"SeatPicker-Row"}>
                                <td key = {index}
                                    className={"SeatPicker-Row-Identifier"}>
                                    {String.fromCharCode(index + 65)}
                                </td>
                                {rows.map((seats: number, j) => {
                                    return (
                                        <td key = {seats}
                                            onClick = {availableSeats.includes(seats)?
                                                            (e: any) => handleAddSeat(seats, e): undefined}
                                            className={"SeatPicker-Box"}
                                            style={ {
                                                backgroundColor: !availableSeats.includes(seats)? "#8FBC8F":
                                                                 selectedSeat === seats? "green": undefined,
                                                color: (!availableSeats.includes(seats) ||
                                                            selectedSeat === seats)? "white": undefined,
                                                cursor: availableSeats.includes(seats)? "pointer": "default"
                                            } }>
                                            {j + 1}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <h3 className={"SeatPicker-h3"}>Back</h3>
        </>
    )
}