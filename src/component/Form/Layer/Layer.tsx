import {DISAPPEAR} from "../../../config/config"
import "./Layer.css"
export let Layer = (props: any)=>{
    if (props.formControl === DISAPPEAR) {
        return null
    }
    return <div className={"shadow"}>
    </div>
}