import {Alert} from "react-bootstrap"

export let ErrorAlert = (props:any)=>{
    return <Alert variant="danger" style={{"display": props.isDisplay ? "block": "none"}}>
        <Alert.Heading>Oops! You got an error!</Alert.Heading>
        <p>
            {props.errorText}
        </p>
    </Alert>
}