import {Button, CloseButton, Form, Row} from "react-bootstrap"
import {DEFAULT, SIGNUP} from "../../../config/global"
import 'bootstrap/dist/css/bootstrap.css'
import "./Login.css"
import {LoginAPI} from "../../../API/Login"
import React, {FormEvent, useState} from "react"
import {setCookie} from "../../../Util/Cookie_Utilities"
import {sendRequestWithRetry} from "../../../Util/Http_Utilities"
import {ErrorAlert} from "../ErrorAlert/ErrorAlert";

/**
 *
 * @author Shicheng Fang
 *
 * The Login component. Pop up a form to allow user to login.
 * */
export let Login = (props: any)=>{
    const [isError, setIsError] = useState(false)
    const [errorText, setErrorText] = useState("")
    let usernameRef:React.RefObject<any> = React.createRef()
    let passwordRef:React.RefObject<any> = React.createRef()
    let onFormSubmit = (event: FormEvent)=>{
        event.preventDefault()
        let username:string = usernameRef.current.value
        let password:string = passwordRef.current.value
        sendRequestWithRetry (
                ()=>{
                return LoginAPI(username, password)
            },
                (isSuccess: boolean)=>{
                if (isSuccess) {
                    setCookie("username", username)
                    props.changePage(DEFAULT)
                } else {
                    setIsError(true)
                    setErrorText("Username and password are unmatched")
                }
            })
    }
    return <Form id={"Login"} onSubmit={onFormSubmit}>
        <div style={{"float": "right"}}>
            <CloseButton onClick={()=>{props.changePage(DEFAULT)}}/>
        </div>
        <div id={"LoginLogo"}>
            Welcome Back!
        </div>
        <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={usernameRef} placeholder="Enter username" required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control ref={passwordRef} type="password" placeholder="Password" required/>
        </Form.Group>
        <br/>
        <Row>
            <Button type={"submit"} variant={"success"}>Login</Button>
        </Row>
        <br/>
        <a href={""} onClick={(event)=>{
            event.preventDefault()
            props.changePage(SIGNUP)}
        }
        >Don't have an account yet?</a>
        <br/><br/>
        <ErrorAlert errorText={errorText} isDisplay={isError}/>
    </Form>
}