import 'bootstrap/dist/css/bootstrap.css'
import {Table} from "react-bootstrap"
import "./RoomTimePicker.css"
import React, { useState, useEffect } from "react"

/**
 *
 * @author Min Lu
 *
 * The Movie Room + Time Selection Component. Allow user to pick an available room and time
 * for a movie.
 * */
export let RoomTimePicker = (props: any) => {
//     const [seats, setSeats] = useState<number []>([])
//     const [availableSeats, setAvailableSeats] = useState<number []>([])
//     const [selectedSeat, setSelectedSeat] = useState(-1)
       const [selectedRoom, setSelectedRoom] = useState(-1)
       const [selectedDate, setSelectedDate] = useState("")
       const [selectedTime, setSelectedTime] = useState("")

//     const getSeats = async(id: number) => {
//         try {
//             const response = await fetch(`/seats/all_seats_in_room_${id}`)
//             const seat_data = await response.json()
//             setSeats([...seat_data])
//         } catch (error) {
//             console.log(error)
//         }
//     }
//
//     const getAvailableSeats = async(id: number) => {
//         try{
// //             const response = await fetch(`/seats/all_seats_in_room_${id}`) // change to this later
// //             const avail_seat_data = await response.json()
// //             const avail_seat_data = [...Array(10)].map(()=>{return Math.floor(Math.random() * 15)}); // remove this later
//             const avail_seat_data = [1, 2, 5, 7, 8, 10, 11, 12, 13, 14]
//             setAvailableSeats(avail_seat_data)
//             console.log(availableSeats)
//         } catch (error) {
//             console.log(error)
//         }
//     }
//
//     useEffect(() => {
//         getSeats(1)
//         const interval = setInterval(() => {
//             getAvailableSeats(1)
//         }, 2000)
//         return() => clearInterval(interval)
//     }, [])

//     console.log("hello world")
//     console.log(seats)
//     console.log(seats.length)

//     function handleAddSeat(id: number, e: any) {
//         if (id === selectedSeat) {
//             setSelectedSeat(-1)
//         } else {
//             setSelectedSeat(id)
//         }
//         console.log("hello " + id)
//     }

//     const copy_seats = [...seats]
//
//     const newSeatArr:number[][] = []
//     while (copy_seats.length) {
//         newSeatArr.push(copy_seats.splice(0,5))
//     }

    function handleAddRoomTime(roomID: number, date: string, time: string, e: any) {
        if (roomID == selectedRoom && date == selectedDate && time == selectedTime) {
            setSelectedRoom(-1)
            setSelectedDate("")
            setSelectedTime("")
            props.selectRoomTime(-1, "", "")
        } else {
            setSelectedRoom(roomID)
            setSelectedDate(date)
            setSelectedTime(time)
            props.selectRoomTime(roomID, date, time)
        }
    }

    const roomsAndTimes = [
        {room_id: 1, time: new Date('December 17, 1995 03:24:00')},
        {room_id: 2, time: new Date('December 18, 1995 03:24:00')},
        {room_id: 3, time: new Date('December 19, 1995 03:24:00')},
        {room_id: 4, time: new Date('December 20, 1995 03:24:00')},
        {room_id: 5, time: new Date('December 23, 1995 07:28:00')},
        {room_id: 3, time: new Date('December 28, 1995 03:24:00')},
        {room_id: 1, time: new Date('December 28, 1995 03:05:00')},
        {room_id: 2, time: new Date('December 28, 1995 03:05:00')},
        {room_id: 2, time: new Date('December 28, 1995 16:05:00')},
        {room_id: 1, time: new Date('December 17, 1995 17:24:00')},
        {room_id: 2, time: new Date('December 18, 1995 13:24:00')},
        {room_id: 3, time: new Date('December 19, 1995 15:24:00')},
        {room_id: 4, time: new Date('December 20, 1995 13:24:00')},
        {room_id: 5, time: new Date('December 23, 1995 12:28:00')},
        {room_id: 3, time: new Date('December 28, 1995 11:24:00')},
        {room_id: 1, time: new Date('December 28, 1995 10:05:00')},
    ]

    return (
        <div className={"RoomTimePicker-container"}>
            <h3 className={"RoomTimePicker-h3"}>Rooms and Times</h3>
            <ul className={"RoomTimePicker-ul"}>
                {roomsAndTimes.map( (item, index) => {
                    return (
                        <li key= {index}
                            className={"RoomTimePicker-li"}
                            onClick = {(e) => handleAddRoomTime(item.room_id,
                                                                    item.time.toDateString(),
                                                                    item.time.toTimeString(),
                                                                    e)}
                            style = { {
                                backgroundColor: (item.room_id == selectedRoom &&
                                                    item.time.toDateString() == selectedDate &&
                                                    item.time.toTimeString() == selectedTime)? "cyan": undefined
                            } }>
                            Room: {item.room_id}, Time: {item.time.toDateString()}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}