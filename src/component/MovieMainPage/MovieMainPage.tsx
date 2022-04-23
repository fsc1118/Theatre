import 'bootstrap/dist/css/bootstrap.css'
import {Col, Row, Button, Container} from "react-bootstrap";
import { NavLink } from 'react-router-dom'
import "./MovieMainPage.css"
import React, { Component } from 'react'

export let MovieMainPage = (props: any) => {
    const child = {width: `300em`, height: `100%`}
    return (
        <Container className="MovieMainPage">
        <h1>Trending Movie</h1>
        <div className="scrollable">
            <a href="https://www.imdb.com/title/tt10872600/">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZhbU5pWXmpsBxgV6PFL-kAxVAihDFPueGh0n2HoUbWZdFp_AC" alt="Spiderman" width="200" height="300"/>
            </a>
            <a href="https://www.imdb.com/title/tt1877830/">
                <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRTT0pPu6d_lj_oSW5UzqJN3VNOKgWzpmpOE28LQjZsNTZXTBs6" alt="Batman" width="200" height="300"/>
            </a>
            <a href="https://www.imdb.com/title/tt11252248/">
                    <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQYfOlKIxkS4ULGULhHT7o7THm93GGoGMjAaQEjnlrzGElbX8Dp" alt="Dog" width="200" height="300"/>
             </a>
                    <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQr6EDRxGrFnVYchhTylyH1ej6INDVHoOXu1vLwLcnffs3ZYzno" alt="Uncharted" width="200" height="300"/>
                    <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTTZ32XuJkHQKa7kRGnTzX78Q3WXyl6uZAlETx5WPcPdOLdqsgN" alt="jujutsu" width="200" height="300"/>
                    <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRYjNGmW3jCTissanzvS0ZCicoJUXkPyL4dpDHkF2dn2G-XwgBa" alt="Sing2" width="200" height="300"/>
        </div>

        <div className="scrollableTest">
        This is for a test round. Click on each page. It will take you to the corresponding
        IMDB page. Need to replace them with link to our own local movie description page later.
        </div>

        </Container>
    )
}