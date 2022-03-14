import {Navigation} from "./Navigation/Navigation"
import {Layer} from "./Form/Layer/Layer";
import {Signup} from "./Form/Signup/Signup";
import {Login} from "./Form/Login/Login";
import {DEFAULT} from "../config/global"
import {useState} from "react"
export let Main = ()=>{
    const [formControl, setFormControl] = useState(DEFAULT)
    return <div>
        <Navigation changePage={setFormControl}/>
        <Layer formControl={formControl} changePage={setFormControl}/>
        <Signup formControl={formControl} changePage={setFormControl}/>
        <Login formControl={formControl} changePage={setFormControl}/>
    </div>
}