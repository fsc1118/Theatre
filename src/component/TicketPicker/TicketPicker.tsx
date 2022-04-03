import 'bootstrap/dist/css/bootstrap.css'
import { Container, Col, Row } from "react-bootstrap"
import "./TicketPicker.css"
import { SeatPicker } from "./SeatPicker/SeatPicker"
import { MovieDescriptionSidebar } from "./MovieDescriptionSidebar/MovieDescriptionSidebar"
import React, { useState, useEffect } from "react"

/**
 *
 * @author Min Lu
 *
 * The Ticket Selection Component. Allow user to select date and seats and submit request for movie ticket.
 * */
export let TicketPicker = (props: any) => {

    return (
        <Container className="TicketPicker-container align-items-center">
            <Row className="TicketPicker-row align-items-center justify-content-center">
                <Col md={5}
                    className="Sidebar">
                    <MovieDescriptionSidebar />
                </Col>

                <Col md={5}
                    className="Selectors">
                    <h4 className="SeatPicker-h4">Pick your seat...</h4>
                    <SeatPicker />
                </Col>
            </Row>
        </Container>
    )
}