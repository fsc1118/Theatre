import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import { SIGNUP } from "../../config/global"
import { eraseCookie, getUsernameFromCookie } from "../../Util/Cookie_Utilities";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import './Navigation.css'

export let Navigation = (props: any) => {
    const [isLogin, setIsLogin] = useState(getUsernameFromCookie() !== null)
    const navigate = useNavigate()

    useEffect(() => {
//         let timer = setInterval(() => {
            setIsLogin(getUsernameFromCookie() !== null)
//         }, 500)
//         return () => {
//             clearInterval(timer)
//         }
    })

    const handleLogout = () => {
        eraseCookie("username")
        navigate('/')
    }

    return <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">Theatre</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/">Home</Link>
                    <Link to="/movies/all">All Movies</Link>
                    <Link to="/topMovies">Top Movies</Link>
                    <Link to="/movies/showing">Showing Movies</Link>
                    {isLogin ? <Link to="/user">My Settings</Link> : undefined}
                    {isLogin ? <Link to="/past_purchases">My Past Purchases</Link> : undefined}
                </Nav>
                {/* The button will only display when the user hasn't log in*/}
                <Button style={{ "display": isLogin ? "none" : "block" }} variant="success" onClick={() => {
                    props.changePage(SIGNUP)
                }
                }>Sign up</Button>
                <Dropdown style={{ "display": isLogin ? "block" : "none" }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Hi! {getUsernameFromCookie()}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div></div>
            </Navbar.Collapse>

        </Container>
    </Navbar>
}