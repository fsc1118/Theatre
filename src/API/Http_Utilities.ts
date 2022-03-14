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
            fetch(ServerConfig.serverIP + url, {
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