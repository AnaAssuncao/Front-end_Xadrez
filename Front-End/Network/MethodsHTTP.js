export default function HttpMethods(){
    this.post=async function(obj,url){
       return httpPost(obj,url)
    }

    this.get=async function(url){
        return httpGet(url)
    }

    async function httpPost(obj,url){
        try{
            const msgSend = JSON.stringify(obj)
            const resp = await fetch(url,{
                method: "POST",
                body: msgSend,
                headers:{
                    "content-type": "application/json; charset=UTF-8",
                    "accept": "*/*",
                    "Content-Length" : msgSend.length.toString(),
                    "Access-Control-Allow-Origin": "*"
                }
            })   
            const msgRes = await resp.json()     
            return msgRes
        }
        catch{
            const err = "errServer"
            return err
        }
    }

    async function httpGet(url){
        try{
            const resp = await fetch(url,{
                method: "GET",
                headers:{
                    "content-type": "application/json; charset=UTF-8",
                    "accept": "*/*",
                    "Access-Control-Allow-Origin": "*"
                }
            })   
            const msgRes = await resp.json()   
            return msgRes  
        }
        catch{
            const err = "errServer"
            return err
        }
    }   
}