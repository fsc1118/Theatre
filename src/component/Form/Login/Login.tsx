import {Button, CloseButton, Form, Row} from "react-bootstrap"
import {DEFAULT, LOGIN, SIGNIN} from "../../../config/global"
import 'bootstrap/dist/css/bootstrap.css'
import "./Login.css"
import {LoginAPI} from "../../../API/Login"
import React from "react"
import {setCookie} from "../../../Util/Cookie_Utilities"
import {withResend} from "../../../Util/Http_Utilities"

/**
 *
 * @author Shicheng Fang
 *
 * The Login component. Pop up a form to allow user to login.
 * */
export let Login = (props: any)=>{
    if (props.formControl !== LOGIN) {
        return null
    }
    let username:string = ""
    let password:string = ""
    let login = ()=>{
        withResend(
                ()=>{
                return LoginAPI(username, password)
            },
                (isSuccess: boolean)=>{
                if (isSuccess) {
                    setCookie("username", username)
                    props.changePage(DEFAULT)
                } else {
                    alert("Username and password do not match")
                }
            })
    }
    return <Form id={"Login"} onSubmit={(event)=>{
        event.preventDefault()
        login()
    }
    }>
        <div style={{"float": "right"}}>
            <CloseButton onClick={()=>{props.changePage(DEFAULT)}}/>
        </div>
        <div id={"LoginLogo"}>
            Welcome Back!
        </div>
        <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control  placeholder="Enter username" required
                           onChange={(event)=>{username=event.target.value}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(event)=>{password=event.target.value}}
                          type="password" placeholder="Password" required/>
        </Form.Group>
        <br/>
        <Row>
            <Button type={"submit"} variant={"success"}>Login</Button>
        </Row>
        <br/>
        <a href={""} onClick={(event)=>{
            event.preventDefault()
            props.changePage(SIGNIN)}
        }
        >Don't have an account yet?</a>
    </Form>
}