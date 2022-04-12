/**
 *
 * @author Shicheng
 *
 * Global variables and configurations
 *
 * */



let AppConfig= {
    SERVER_IP: "https://cs348-theatre.herokuapp.com/",
    CONNECTION_RETRY: 5,
    NETWORK_ERROR_MESSAGE: ()=>{
        window.location.replace("Error.html")
    }
}
export let LOGIN = 0
export let SIGNUP = 1
export let DEFAULT = 2
export default AppConfig
