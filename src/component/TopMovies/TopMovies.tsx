import { Container, Dropdown, Row } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from "react"
import AppConfig from "../../config/global"
import { v4 as uuid } from "uuid"
import { Link } from "react-router-dom"
import { styled, Paper } from "@mui/material"

export let TopMovies = (props: any) => {
    interface FilteredMovieShowings {
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
    const initial: Array<FilteredMovieShowings> = new Array<FilteredMovieShowings>()
    const [movie, setMovie] = useState(initial)
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        fetch(AppConfig.SERVER_IP + "api/movies").then((response) => {
            return response.json()
        }).then((data) => {
            setLoaded(true)

            /*
                Due to async nature of setState, setMovie should be surrouned with setTimeout to ensure it will be executed after setLoaded
            */
            setTimeout(() => {
                setMovie(data)
            }, 0)

        })
    }, [])
    if (!loaded) {
        return <Container>
            Loading...
        </Container>
    }
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <Container>
            <h1>Top Movies!</h1>
            <ul>
                {
                    movie.map((item) => {
                        return <Row key={uuid()}>
                            <Item>
                                <img src={item.image_url} />
                                <p>{item.movie_name}</p>
                                <p>{item.movie_summary}</p>
                            </Item>
                        </Row>
                    })
                }
            </ul>
        </Container>

    )
}