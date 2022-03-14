import {Form} from "react-bootstrap"
import {LOGIN} from "../../../config/config"
import 'bootstrap/dist/css/bootstrap.css'
export let Login = (props: any)=>{
    if (props.formControl !== LOGIN) {
        return null
    }
    return <Form className={"login"}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"/>
        </Form.Group>
    </Form>;
}