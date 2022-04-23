import 'bootstrap/dist/css/bootstrap.css'
import { Container, Button } from "react-bootstrap"
import "./UserSettings.css"
import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

export let UserSettings = (props: any) => {

    return (
        <Container className="UserSettings-container">

        <h1>User Settings!</h1>

        </Container>
    )

}