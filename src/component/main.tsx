import {Navigation} from "./Navigation/Navigation"
import {Layer} from "./Form/Layer/Layer";
import {Signin} from "./Form/Signin/Signin";
import {Login} from "./Form/Login/Login";
import {DISAPPEAR, LOGIN, SIGNIN, DEFAULT} from "../config/config"
import {useState} from "react"
export let Main = ()=>{
    const [formControl, setFormControl] = useState(DEFAULT)
    return <div>
        <Navigation changePage={setFormControl}/>
        <Layer formControl={formControl}/>
        <Signin formControl={formControl}/>
        <Login formControl={formControl}/>
    </div>
}