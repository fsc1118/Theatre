import {Button, Container, Dropdown, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import {SIGNUP} from "../../config/global"
import {eraseCookie, getUsernameFromCookie} from "../../Util/Cookie_Utilities";
import {useEffect, useState} from "react";
import { Link } from 'react-router-dom'

import './Navigation.css'

export let Navigation = (props: any) => {
    const [isLogin, setIsLogin] = useState(getUsernameFromCookie() !== null)

    useEffect(()=>{
        let timer = setInterval(()=>{
            setIsLogin(getUsernameFromCookie() !== null)
        }, 1000)
        return ()=> {
            clearInterval(timer)
        }
    })

//     <Nav.Link href="#home">Home</Nav.Link>
//                             <Nav.Link href="#link">Movies</Nav.Link>

    return <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Theatre</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to = "/movies/showing">Home</Link>
                        <Link to = "/movies/all">All Movies</Link>
                        <Link to = "/findMovie">Find Movies</Link>
                        <Link to = "/userSettings">My Settings</Link>
                    </Nav>
                    {/* The button will only display when the user hasn't log in*/}
                    <Button style={{"display": isLogin ? "none":"block"}} variant="success" onClick={()=>{
                        props.changePage(SIGNUP)
                    }
                    }>Sign up</Button>
                    <Dropdown style={{"display": isLogin ? "block":"none"}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Hi! {getUsernameFromCookie()}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>{eraseCookie("username")}}>Log out</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item>

                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div></div>
                </Navbar.Collapse>

            </Container>
        </Navbar>
}