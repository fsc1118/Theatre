import 'bootstrap/dist/css/bootstrap.css'
import { Row, Col, Container, Button, Form } from "react-bootstrap"
import "./UserSettings.css"
import { UpdateAPI } from "../../API/Update"
import { sendRequestWithRetry } from "../../Util/Http_Utilities"
import React, { useState, useEffect } from "react"
import AppConfig from "../../config/global"
import { getUsernameFromCookie, setCookie, eraseCookie } from "../../Util/Cookie_Utilities"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const profile = require("../../image/profile.png")

export let UserSettings = (props: any) => {
    const LOADING = {
        name: "Loading",
        zip: "Loading",
        email: "Loading",
        city: "Loading",
        phone: "Loading",
    }
    const [userInfo, setUserInfo] = useState(LOADING)
    const [userId, setUserId] = useState(-1)

    const getUserId = async(username: any) => {
        const userId_request = `/api/user/${username}`
        try {
            const response = await fetch(userId_request)
            const user_id_dat = await response.json()
            setUserId(user_id_dat)
        } catch (error) {
            console.log("Error: ")
            console.log(error)
        }
    }

    getUserId(getUsernameFromCookie())
    const [edit, setEdit] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (getUsernameFromCookie() === null) {
            return
        }
        const url = AppConfig.SERVER_IP + `api/user/find/${getUsernameFromCookie()}`
        fetch(url).then(
            (response) => {
                return response.json()
            }
        ).then((data) => {
            setUserInfo(data)
        }).catch(() => {
            window.location.replace("index.html")
        })
    }, [])

    if (getUsernameFromCookie() === null) {
        setTimeout(() => {
            window.location.replace("index.html")
        }, 2000)
        return <Container>
            <h2>You haven't logged in. Redirect you back...</h2>
        </Container>
    }

    if (userInfo === LOADING) {
        return <div>Loading...</div>
    }



    function handleDelete(e: any) {

        const uri = `/api/user/${userId}`

        axios.delete(uri)
        .then(function (response: any) {
            console.log(response)
            eraseCookie("username")
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    if (edit) {
        const emailRef: React.RefObject<any> = React.createRef()
        const zipRef: React.RefObject<any> = React.createRef()
        const cityRef: React.RefObject<any> = React.createRef()
        const phoneRef: React.RefObject<any> = React.createRef()
        let onSubmit = (event: any) => {
            event.preventDefault()
            const email = emailRef.current.value
            const zip = zipRef.current.value
            const city = cityRef.current.value
            const phone = phoneRef.current.value
            if (email === "" || zip === "" || city === "" || phone === "") {
                alert("Some fields are unfilled")
            } else {
                sendRequestWithRetry(() => {
                    return UpdateAPI(getUsernameFromCookie()!, email, city, phone, zip)
                }, () => { window.location.reload() })

            }
        }

        return (
            <div id={"editForm"}>
                <Form className="justify-content-md-center" onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" ref={emailRef} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" ref={cityRef} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" ref={phoneRef} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text" ref={zipRef} />
                    </Form.Group>
                    <Row>
                        <Button variant={"success"} type={"submit"}>Save</Button>
                        <Button variant={"success"} onClick = {() => navigate('/')}>Go Back</Button>
                    </Row>
                </Form>

            </div>
        )
    }

    return (
        <Container className = "UserSettings-Container" style={{ marginTop: "1em" }}>
            <Row>
                <Col xs={12} md={4} sm={12} lg={4}>
                    <img className="profileImg" src={profile}></img>
                </Col>
                <Col xs={12} md={6} lg={6} sm={12}>
                    <Row className={"profileName"}><Col>{userInfo.name}</Col></Row>
                    <Row>
                        <Col lg={3} xs={6}>City:</Col>
                        <Col lg={9} xs={6}>{userInfo.city}</Col>
                    </Row>
                    <Row>
                        <Col lg={3} xs={6}>Email:</Col>
                        <Col lg={9} xs={6}>{userInfo.email}</Col>
                    </Row>
                    <Row>
                        <Col lg={3} xs={6}>Phone:</Col>
                        <Col lg={9} xs={6}>{userInfo.phone}</Col>
                    </Row>
                    <Row>
                        <Col lg={3} xs={6}>Zip:</Col>
                        <Col lg={9} xs={6}>{userInfo.zip}</Col>
                    </Row>
                </Col>
                <Col lg={2}>
                    <Button id="edit" variant={"success"} onClick={() => { setEdit(true) }}>Edit</Button>
                    <Button id="delete" variant={"success"} onClick={(e: any) => handleDelete(e)}>Delete Account</Button>
                </Col>
            </Row>
        </Container>
    )

}
