import {Button, Container, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import {SIGNIN} from "../../config/global"
import {getUsernameFromCookie} from "../../Util/Cookie_Utilities";
import {useEffect, useState} from "react";
export let Navigation = (props: any)=>{
    const [isLogin, setIsLogin] = useState(getUsernameFromCookie() !== null)
    useEffect(()=>{

        let timer = setInterval(()=>{
            setIsLogin(getUsernameFromCookie() !== null)
        }, 1000)
        return ()=> {
            clearInterval(timer)
        }
    })
    return <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Theatre</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Movies</Nav.Link>
                    </Nav>
                    {/* The button will only display when the user hasn't log in*/}
                    <Button style={{"display": isLogin ? "none":"block"}} variant="success" onClick={()=>{
                        props.changePage(SIGNIN)
                    }
                    }>Sign up</Button>
                    <div style={{"display": isLogin ? "block":"none"}}>Hi! {getUsernameFromCookie()}</div>
                </Navbar.Collapse>

            </Container>
        </Navbar>
}