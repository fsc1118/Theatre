import {Button, Col, Form, Row} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css'
import {SIGNIN} from "../../../config/global"
import "./Signup.css"
import {LOGIN} from "../../../config/global"
import {FormEvent} from "react"
import {SignupAPI} from "../../../API/Signup"


/**
 *
 * @author Shicheng Fang
 *
 * The Signup component. Pop up a form to allow user to create a new user.
 * */
export let Signup =  (props: any)=>{
    if (props.formControl !== SIGNIN) {
        return null
    }
    let name:string = ""
    let email:string = ""
    let password:string = ""
    let confirmedPassword:string = ""
    let city:string = ""
    let phone:string = ""
    let zip:string = ""

    let submit = (event: FormEvent)=>{
        event.preventDefault()
        if (password !== confirmedPassword) {
            alert("Password do not match")
            return
        }
        if (password.length < 6) {
            alert("Password too short")
            return
        }
        SignupAPI(name, password, email, city, phone, zip).then((isSuccessful)=>{
            if (isSuccessful) {
                alert("Success")
            } else {
                alert("This username has been used")
            }
        }).catch(()=>{
            alert("Unexpected error occurred. Please try again")
        })
    }
    return <Form id={"Signup"} onSubmit={(event)=>{submit(event)}}>
        <div id={"SignupLogo"}>Welcome!</div>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter username:" required
                              onChange={(event)=>{name = event.target.value}}/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                              onChange={(event)=>{email = event.target.value}}/>
            </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required
                              onChange={(event)=>{password = event.target.value}}/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Confirm</Form.Label>
                <Form.Control type="password" placeholder="Password" required
                              onChange={(event)=>{confirmedPassword = event.target.value}}/>
            </Form.Group>
        </Row>

        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control required onChange={(event)=>{city = event.target.value}}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Phone</Form.Label>
                <Form.Control placeholder={"Example: 1234567890"} pattern="[0-9]{10}" required
                              onChange={(event)=>{phone = event.target.value}}/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control pattern="[0-9]+" required onChange={(event)=>{zip = event.target.value}}/>
            </Form.Group>
        </Row>
        <Row>
            <Button variant="success" type="submit">
                Create account!
            </Button>
        </Row>
        <br/>
        <a href={""} onClick={(event)=>{
            event.preventDefault()
            props.changePage(LOGIN)}
        }
        >Already have an account?</a>
    </Form>
}