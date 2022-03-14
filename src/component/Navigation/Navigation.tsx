import {Button, Container, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import {SIGNIN} from "../../config/global"
export let Navigation = (props: any)=>{
    return <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Theatre</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Movies</Nav.Link>
                    </Nav>

                    <Button variant="success" onClick={()=>{
                        props.changePage(SIGNIN)
                    }
                    }>Sign up</Button>
                </Navbar.Collapse>

            </Container>
        </Navbar>
}