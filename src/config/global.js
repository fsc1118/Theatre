/**
 *
 * @author Shicheng
 *
 * Global variables and configurations
 *
 * */

// for local development, change SERVER_IP to "https://localhost:8080/"
// for deployment to heroku, change SERVER_IP to https://cs348-theatre.herokuapp.com/"
let AppConfig = {
    SERVER_IP: "https://cs348-theatre.herokuapp.com/",
    CONNECTION_RETRY: 5,
    NETWORK_ERROR_MESSAGE: () => {
        window.location.replace("Error.html")
    }
}
export let LOGIN = 0
export let SIGNUP = 1
export let DEFAULT = 2
export default AppConfig
