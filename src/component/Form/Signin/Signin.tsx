import {Button, Col, Form, Row, Dropdown} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css'
import {SIGNIN} from "../../../config/config"
import "./Signin.css"
import {useState} from "react";
let StateSelector = ()=> {
    const [state, setState] = useState("")
    let states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

    return (
        <Dropdown id={"state_drop_down"}>
            <Dropdown.Toggle>
                {state}
            </Dropdown.Toggle>

            <Dropdown.Menu id={"state_menu"}>
                {states.map((item)=>{
                    return <Dropdown.Item key={item} onClick = ()=>{}
                >{item}</Dropdown.Item>})}
            </Dropdown.Menu>
        </Dropdown>
    )

}
export let Signin = (props: any)=>{
    if (props.formControl !== SIGNIN) {
        return null
    }
    return <Form id={"Signin"}>
        <div id={"SigninLogo"}>Welcome!</div>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter username:" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose...">
                    {/*<option>Choose...</option>*/}
                    {/*<option>...</option>*/}
                    <StateSelector/>
                </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
            </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
}