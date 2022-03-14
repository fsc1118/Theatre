import {sendPostRequest} from "../Util/Http_Utilities"


/**
 *
 *  @author Shicheng Fang
 *
 *  The LoginAPI will send a HTTP Post Request and returns a Promise
 *  with the resolved Truth value signals the if login is successful.
 *
 *  If resolved value is true, a new user is created.
 *  The resolved False value typically implies the given username has been used.
 * */

export let  SignupAPI = (
    username: string,
    password: string,
    email: string,
    city: string,
    phone: string,
    zip: string
):Promise<boolean>=>{
    return sendPostRequest({
        "name" : username,
        "password": password,
        "email": email,
        "city": city,
        "phone": phone,
        "zip": zip
    }, "signup")

}