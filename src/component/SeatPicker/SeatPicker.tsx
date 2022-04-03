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

    const getSeats = async(id: number) => {
        try {
            const response = await fetch(`/seats/all_seats_in_room_${id}`)
            const seat_data = await response.json()
            setSeats([...seat_data])
        } catch (error) {
            console.log(error)
        }
    }

    const getAvailableSeats = async(id: number) => {
        try{
//             const response = await fetch(`/seats/all_seats_in_room_${id}`) // change to this later
//             const avail_seat_data = await response.json()
            const avail_seat_data = [...Array(10)].map(()=>{return Math.floor(Math.random() * 15)}); // remove this later
            setAvailableSeats(avail_seat_data)
            console.log(availableSeats)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSeats(1)
        const interval = setInterval(() => {
            getAvailableSeats(1)
        }, 2000)
        return() => clearInterval(interval)
    }, [])

    console.log("hello world")
    console.log(seats)
    console.log(seats.length)

    function handleAddSeat(id: number, e: any) {
        console.log("hello " + id)
    }

    const copy_seats = [...seats]

    const newSeatArr:number[][] = []
    while (copy_seats.length) {
        newSeatArr.push(copy_seats.splice(0,5))
    }

    return (
        <div className="Container">
        <h3>Screen</h3>
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
                                            backgroundColor: !availableSeats.includes(seats)? "grey": undefined,
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
        <h3>Back</h3>
        </div>
    )
}