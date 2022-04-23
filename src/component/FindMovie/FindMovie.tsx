import 'bootstrap/dist/css/bootstrap.css'
import { Container, Col, Row, Button } from "react-bootstrap"
import "./FindMovie.css"
import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

export let FindMovie = (props: any) => {

    return (
        <Container className="FindMovie-container">
            <h1>Find Movie!</h1>
        </Container>
    )
}