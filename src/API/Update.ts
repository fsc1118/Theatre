import { sendPostRequest } from "../Util/Http_Utilities"


/**
 *
 *  @author Shicheng Fang
 *
 * */

export let UpdateAPI = (
    username: string,
    email: string,
    city: string,
    phone: string,
    zip: string
): Promise<boolean> => {
    return sendPostRequest({
        "name": username,
        "email": email,
        "city": city,
        "phone": phone,
        "zip": zip
    }, `api/user`)

}