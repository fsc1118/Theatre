import 'bootstrap/dist/css/bootstrap.css'
import {Col, Row, Button, Container} from "react-bootstrap";
import "./ReviewOrder.css"


export let ReviewOrder = (props: any) => {
    return (
        <Container className="lineContainer">
        <h1>REVIEW YOUR ORDER</h1>
        <br></br>

        <u><h2 id = "movieName">MOVIE NAME</h2></u>
        <br></br>
        
        <Row className="justify-content-md-center">
            <Col xs md="4">
                <h5 style={{display: "inline"}}>SHOWTIME: </h5>
                <p id="reviewShowtime" style={{display: "inline"}}>Jan 11    6:30pm</p>
            </Col>
            <Col xs md="3">
                <h5 style={{display: "inline"}}>RUNTIME: </h5>
                <p id="reviewMovieRuntime" style={{display: "inline"}}>129 mins</p>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col xs md="4">
                <h5 style={{display: "inline"}}>SEATS: </h5>
                <p id="reviewSeats" style={{display: "inline"}}>A12, A13, A14</p>
            </Col>
            <Col xs md="3">
                <h5 style={{display: "inline"}}>RATING: </h5>
                <p id="reviewSeats" style={{display: "inline"}}>PG-13</p>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col xs md="4">
                <h5 style={{display: "inline"}}>ROOM: </h5>
                <p id="reviewSeats" style={{display: "inline"}}>14</p>
            </Col>
            <Col xs md="3"></Col>
        </Row>

        <br></br>
        <Container className="lineContainer">
            <hr></hr>
        </Container>

        <Row className="justify-content-md-center">
            <Col xs md="5">
                <h4><b>Order Summary</b></h4>
            </Col>
            <Col xs md="2"></Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col xs md="5">
                <p style={{display: "inline"}}>Normal Ticket x</p>
                <p id="reviewNumOfTickets" style={{display: "inline"}}>3</p>
            </Col>
            <Col xs md="2">
                <p style={{display: "inline"}}>$</p>
                <p className = "reviewTicketPrice" style={{display: "inline"}}>12.00</p>
                <p style={{display: "inline"}}> x</p>
                <p id="reviewNumOfTickets" style={{display: "inline"}}>3</p>
            </Col>
        </Row>

        <br></br>
        <Container className="lineContainer">
            <hr></hr>
        </Container>

        <Row className="justify-content-md-center">
            <Col xs md="5">
                <h4><b>Subtotal</b></h4>
            </Col>
            <Col cd md="2">
                <b>
                    <p style={{display: "inline"}}>$</p>
                    <p id = "reviewSubtotal" style={{display: "inline"}}>36.00</p>
                </b>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col xs md="5">
                <p>Taxes and Fees</p>
            </Col>
            <Col xs md="2">
                <p style={{display: "inline"}}>$</p>
                <p id = "reviewTicketPrice" style={{display: "inline"}}>3.78</p>
            </Col>
        </Row>
        <br></br>
        <Row className="justify-content-md-center">
            <Col xs md="5">
                <h4 style={{display: "inline"}}><u><b>Total</b></u></h4>
            </Col>
            <Col xs md="2">
                <p style={{display: "inline"}}>$</p>
                <p id = "reviewTicketPrice" style={{display: "inline"}}>39.78</p>
            </Col>
        </Row>

        <br></br>
        <Container className="lineContainer">
            <hr></hr>
        </Container>

        <Row className="justify-content-md-center">
            <Col xs md="5">
                <h4><b>Payment Methods</b></h4>
                <Button id="submitOrderBtn" style={{backgroundColor: "#000"}} onClick={(e: any) => {e.preventDefault()}}>Pay full amount</Button>
            </Col>
            <Col xs md="2"></Col>
        </Row>

        <br></br>
        <Container className="lineContainer">
            <hr></hr>
        </Container>

        <Row className="justify-content-md-center">
            <Col md="auto">
                <Button id="reviewOrderBackBtn" style={{backgroundColor: "#FFB511"}} onClick={(e: any) => {e.preventDefault()}}><b>Back</b></Button>
            </Col>
        </Row>
    </Container>
    )
}