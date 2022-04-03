import {sendPostRequest} from "../Util/Http_Utilities"

/**
 *
 *  @author Shicheng Fang
 *
 *  The LoginAPI will send a HTTP Post Request and returns a Promise
 *  with the resolved Truth value signals the if login is successful.
 * */
export let LoginAPI = (
    username: string, password: string
) :Promise<boolean>=>{
    return sendPostRequest({
        "name" : username,
        "password": password
    }, "login")
}