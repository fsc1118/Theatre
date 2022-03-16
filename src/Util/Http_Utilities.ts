import ServerConfig from "../config/global"
/**
*
*  @author Shicheng Fang
*
*  The sendPostRequest will send a HTTP Post Request and returns a Promise
*  with the resolved Truth value signals the if operation of this request is successful
* */
export let sendPostRequest = (http_body: any, url: string):Promise<boolean>=>{
    return new Promise<boolean>(
        (resolve, reject)=>{
            fetch(ServerConfig.SERVER_IP + url, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(http_body)
            }).then(
                (response)=>{
                    if (response.status !== 200) {
                        reject()
                    }
                    return response.json()
                }
            ).then((json)=>{
                resolve(json["success"])
            }).catch(()=>{
                reject()
            })
        }
    )
}


/**
 *
 *
 * Wrapper function to enable a callback to resend request upon network failure
 *
 * @author Shicheng Fang
 *
 * */
export let sendRequestWithRetry = (callAPI: ()=>Promise<boolean>,
                         onNetworkOK:(isSuccess:boolean)=>void,
                         onNetworkFailure:()=>void = ServerConfig.NETWORK_ERROR_MESSAGE,
                         retry: number = ServerConfig.CONNECTION_RETRY):void=>{
    if (retry === 0) {
        onNetworkFailure()
        return
    }
    callAPI().then((isSuccess:boolean)=>{
        onNetworkOK(isSuccess)
    }).catch(()=>{
        sendRequestWithRetry(callAPI, onNetworkOK, onNetworkFailure, retry - 1)
    })
}