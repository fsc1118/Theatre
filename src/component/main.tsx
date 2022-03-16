import {Navigation} from "./Navigation/Navigation"
import {Layer} from "./Form/Layer/Layer"
import {Signup} from "./Form/Signup/Signup"
import {Login} from "./Form/Login/Login"
import {DEFAULT, LOGIN, SIGNUP} from "../config/global"
import {useState} from "react"
import {MainContent} from "./MainContent/MainContent";
export let Main = ()=>{
    const [formControl, setFormControl] = useState(DEFAULT)
    if (formControl === DEFAULT) {
        return <div>
            <Navigation changePage={setFormControl}/>
            <MainContent/>
        </div>
    }
    if (formControl === SIGNUP) {
        return <div>
            <Navigation changePage={setFormControl}/>
            <Layer formControl={formControl}/>
            <Signup formControl={formControl} changePage={setFormControl}/>
        </div>
    }
    if (formControl === LOGIN) {
        return <div>
            <Navigation changePage={setFormControl}/>
            <Layer formControl={formControl}/>
            <Login formControl={formControl} changePage={setFormControl}/>
        </div>
    }
    return null
}