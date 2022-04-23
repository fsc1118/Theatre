import 'bootstrap/dist/css/bootstrap.css'
import {Table} from "react-bootstrap"
import "./RoomTimePicker.css"
import React, { useState, useEffect, useRef } from "react"

/**
 *
 * @author Min Lu
 *
 * The Movie Room + Time Selection Component. Allow user to pick an available room and time
 * for a movie.
 * */
export let RoomTimePicker = (props: any) => {

    interface RoomAndTime {
        room_id: number;
        show_datetime: string;
    }

    const [roomsAndTimes, setRoomsAndTimes] = useState<RoomAndTime []>([])
    const [availRoomsAndTimes, setAvailRoomsAndTimes] = useState<RoomAndTime []>([])
    const [selectedRoom, setSelectedRoom] = useState(-1)
    const [selectedDatetime, setSelectedDatetime] = useState("")

    const mountedRef = useRef(true)

    function handleAddRoomTime(roomID: number, datetime: string, e: any) {
        if (roomID == selectedRoom && datetime == selectedDatetime) {
            setSelectedRoom(-1)
            setSelectedDatetime("")
            props.selectRoomTime(-1, "")
        } else {
            setSelectedRoom(roomID)
            setSelectedDatetime(datetime)
            props.selectRoomTime(roomID, datetime)
        }
    }

    const getRoomsAndTimes = async(movie_id: number) => {
        try {
            const response = await fetch(`/api/movieShowings/movie=${movie_id}`)
            const showings_data = await response.json()
//             console.log("All Rooms And times: " + showings_data)
            setRoomsAndTimes(showings_data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAvailRoomsAndTimes = async(movie_id: number) => {
        try {
            const response = await fetch(`/api/movieShowings/avail/movie=${movie_id}`)
            const showings_data = await response.json()
//             console.log("Avail Rooms And times: " + showings_data)
            setAvailRoomsAndTimes(showings_data)
        } catch (error) {
            console.log(error)
        }
    }

//     console.log(availRoomsAndTimes)
//
// {console.log(item)}
//                             {console.log(availRoomsAndTimes.includes(item, 0))}

    useEffect(() => {
        getRoomsAndTimes(props.selectedMovie) // change movie id to props.movieId etc later
        getAvailRoomsAndTimes(props.selectedMovie) // change movie id to props.movieId etc later
        return () => { mountedRef.current = false }
    }, [props.selectedMovie])

    return (
        <div className={"RoomTimePicker-container"}>
            <h3 className={"RoomTimePicker-h3"}>Rooms and Times</h3>
            <ul className={"RoomTimePicker-ul"}>
                {roomsAndTimes.map( (item, index) => {
                    return (
                        <li key= {index}
                            className={"RoomTimePicker-li"}
                            onClick = {availRoomsAndTimes.find(element => element.room_id === item.room_id &&
                                            element.show_datetime === item.show_datetime)?
                                                (e) => handleAddRoomTime(item.room_id,
                                                                    item.show_datetime.toString(),
                                                                    e): undefined}
                            style = { {
                                backgroundColor: !availRoomsAndTimes.find(element => element.room_id === item.room_id &&
                                                                                     element.show_datetime === item.show_datetime)?
                                    "#8FBC8F":
                                        (item.room_id == selectedRoom &&
                                            item.show_datetime.toString() == selectedDatetime)? "cyan": undefined
                            } }>

                            Room: {item.room_id},
                            Time: { (new Date(item.show_datetime))
                                        .toLocaleDateString('en-US',
                                            { weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                timeZone: 'America/New_York',
                                                timeZoneName: 'short' }) +
                                      " " +
                                      (new Date(item.show_datetime))
                                        .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}