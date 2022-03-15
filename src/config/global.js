/**
 *
 * @author Shicheng
 *
 * Global variables and configurations
 *
 * */



let AppConfig= {
    SERVER_IP: "http://127.0.0.1:8080/",
    CONNECTION_RESET: 10,
    NETWORK_ERROR_MESSAGE: ()=>{alert("Unexpected error occurred. Please try again")}
}
export let LOGIN = 0
export let SIGNIN = 1
export let DISAPPEAR = 2
export let DEFAULT = 2
export default AppConfig
