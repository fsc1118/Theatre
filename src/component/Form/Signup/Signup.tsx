import {Button, CloseButton, Col, Form, Row} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css'
import {DEFAULT, LOGIN} from "../../../config/global"
import "./Signup.css"
import React, {FormEvent, useState} from "react"
import {SignupAPI} from "../../../API/Signup"
import {sendRequestWithRetry} from "../../../Util/Http_Utilities";
import {ErrorAlert} from "../ErrorAlert/ErrorAlert";
import {setCookie} from "../../../Util/Cookie_Utilities";


/**
 *
 * @author Shicheng Fang
 *
 * The Signup component. Pop up a form to allow user to create a new user.
 * */
export let Signup =  (props: any)=>{
    const [isError, setIsError] = useState(false)
    const [errorText, setErrorText] = useState("")
    /*
    * Variables that store the users' input
    * */
    let nameRef:React.RefObject<any> = React.createRef()
    let emailRef:React.RefObject<any> = React.createRef()
    let passwordRef:React.RefObject<any> = React.createRef()
    let confirmedRef:React.RefObject<any> = React.createRef()
    let cityRef:React.RefObject<any> = React.createRef()
    let phoneRef:React.RefObject<any> = React.createRef()
    let zipRef:React.RefObject<any>= React.createRef()

    /* when the form is submitted, this function is invoked*/
    let onFormSubmit = (event:FormEvent)=> {
        event.preventDefault()
        let name:string = nameRef.current.value
        let email:string = emailRef.current.value
        let password:string = passwordRef.current.value
        let confirmedPassword:string = confirmedRef.current.value
        let city:string = cityRef.current.value
        let phone:string = phoneRef.current.value
        let zip:string = zipRef.current.value
        if (password !== confirmedPassword || password.length < 6) {
            setIsError(true)
            setErrorText("Check passwords are neither too short nor unmatched")
            return
        }
        sendRequestWithRetry (
            () => {
                return SignupAPI(name, password, email, city, phone, zip)
            },
            (isSuccessful) => {
                if (isSuccessful) {
                    setCookie("username", name)
                    props.changePage(DEFAULT)
                } else {
                    setIsError(true)
                    setErrorText("This username has been used")
                }
            }
        )
    }



    /* UI */
    return <Form id={"Signup"} onSubmit={(event)=>{onFormSubmit(event)}}>
        <div style={{"float": "right"}}>
            <CloseButton onClick={()=>{props.changePage(DEFAULT)}}/>
        </div>
        <div id={"SignupLogo"}>Welcome!</div>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control ref={nameRef} type="text" placeholder="Enter username:" required/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control ref = {emailRef} type="email" placeholder="Enter email"/>
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control ref = {passwordRef} type="password" placeholder="Password" required/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridRePassword">
                <Form.Label>Confirm</Form.Label>
                <Form.Control ref = {confirmedRef} type="password" placeholder="Password" required/>
            </Form.Group>

        </Row>

        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control ref = {cityRef} required/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control ref = {phoneRef} required/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control ref={zipRef} pattern="[0-9]+"/>
            </Form.Group>
        </Row>
        <Row>
            <Button variant="success" type="submit">
                Create account!
            </Button>
        </Row>
        <br/>
        <a href={"#"} onClick={(event)=>{
            event.preventDefault()
            props.changePage(LOGIN)}
        }
        >Already have an account?</a>
        <br/><br/>
        <ErrorAlert errorText={errorText} isDisplay={isError}/>
    </Form>
}