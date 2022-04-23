import 'bootstrap/dist/css/bootstrap.css'
import { Image } from "react-bootstrap"
import "./MovieDescriptionSidebar.css"
import React, { useState, useEffect, useRef } from "react"

/**
 *
 * @author Min Lu
 *
 * The Seat Selection Component. Allow user to pick an available seat.
 * */
export let MovieDescriptionSidebar = (props: any) => {

    const mountedRef = useRef(true)

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

    const [movie, setMovie] = useState<Movie>({})

    const getMovieDetails = async(movie_id: number) => {
        const movie_request = `/api/movies/${movie_id}`
        try {
            const response = await fetch(movie_request)
            const movie_data = await response.json()
            setMovie(movie_data)
        } catch (error) {
            console.log("Error: ")
            console.log(error)
        }
    }

    useEffect(() => {
        getMovieDetails(props.selectedMovie)
        return () => { mountedRef.current = false }
    }, [props.selectedMovie])

//     console.log(movie)

    return (

        <div className="MovieDescriptionSidebar">
            <h4 className="MovieDescriptionSidebar-h4">{movie.movie_name}</h4>
            <Image className="MovieDescriptionSidebar-img" src={movie.image_url}/>
            <p className="MovieDescriptionSidebar-p">{movie.movie_summary}</p>
        </div>
    )

}