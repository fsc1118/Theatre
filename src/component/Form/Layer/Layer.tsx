import {DISAPPEAR} from "../../../config/global"
import "./Layer.css"

/**
 *
 * @author Shicheng Fang
 *
 * The Layer component will shadow the background when form pops out.
 * */
export let Layer = (props: any)=>{
    if (props.formControl === DISAPPEAR) {
        return null
    }
    return <div className={"shadow"}>
    </div>
}