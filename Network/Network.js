export default function interfaceNetwork(){
    const gameCong={
        codes:{
            room:null,
            player:null
        }
    }

    const networkConf={
        url:"http://localhost:3030/api/v1"
    }

    this.send={
        infStartGame: async(infGame) =>{
            const url = networkConf.url+"/startGame/infGame"
            // infGame = {name:value, roomCode:value}
            const infMultiplayer = {
                playerName:infGame.name,
                roomCode:infGame.roomCode
            }
            const msgRes = await httpPost(infMultiplayer,url)
            gameCong.codes = msgRes.codes
            const sendController={
                playerAdv:msgRes.infPlayerAdv,
                connection:msgRes.statusGame.connection,
            }
            return sendController
        },
        moveGame: async(move) =>{
            const url = networkConf.url+"/movementGame"
            const objsend={
                roomCode:gameCong.codes.room,
                playerCode:gameCong.codes.player,
                movement:move
            }
            const msgRes = await httpPost(objsend,url)
            return msgRes
        },
        giveUp: async(giveUp) =>{
            if (giveUp === true){
                const url = networkConf.url+"/giveUpGame"
                const msgRes = await httpPost(giveUp,url,functionToCallBack.informationStart)
            }
            return msgRes
        },
        endGame: async(endGame) =>{
            if (endGame === true){
                const url = networkConf.url+"/endGame"
                const msgRes = await httpPost(endGame,url,functionToCallBack.informationStart)
            }
            return msgRes
        }
    }
   
    this.get={
        moveAdversary: async()=>{
            const params = {
                roomCode: gameCong.codes.room,
                playerCode: gameCong.codes.player
              }
            let query = Object.keys(params)
                    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
                    .join("&");
            const url = networkConf.url+"/movementGame?" +query
            let time = 0
            setTimeMoveAdv(url,time)
        },
        playerConnection: async()=>{
            const params = {
                roomCode: gameCong.codes.room,
                playerCode: gameCong.codes.player
              }
            let query = Object.keys(params)
                    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
                    .join("&");
            const url = networkConf.url+"/statusGame?"+query
            let time = 0
            await setTimePlayer(url,time)
        },
        statusGame: async()=>{ 
            const params = {
                roomCode: gameCong.codes.room,  
                playerCode: gameCong.codes.player
              }
            let query = Object.keys(params)
                    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
                    .join("&");
                    
            const url = networkConf.url+"/statusGame?"+query
            const waitInf = setInterval(async()=>{
                    const infGame = await httpGet(url)
                    if((infGame.statusGame.giveUP===true) || (infGame.statusGame.endGame===true)){
                        clearInterval(waitInf) 
                        const statusGame = infGame.statusGame
                        notifyFunctions(functionToCallBack.endGame,statusGame)
                    }
                    if(infGame.statusGame.connection===false){
                        if(infGame.infPlayerAdv.connection===false){
                            clearInterval(waitInf) 
                            const statusGame = infGame.infPlayerAdv
                            notifyFunctions(functionToCallBack.playerConnection,statusGame)
                        }
                    }
                    else if(infGame==="err"){
                        clearInterval(waitInf) 
                    }

            },1000)
        }
    }

    async function setTimeMoveAdv(url,time){
        await setTimeout(
            async()=>{
                const msgRes = await httpGet(url)
                if(msgRes.msg!=="no Move"){
                    notifyFunctions(functionToCallBack.moveAdversary,msgRes.move)
                }
                else if(time===100){
                    const connection = false
                    notifyFunctions(functionToCallBack.playerConnection,connection)
                }
                else{
                    time++
                    setTimeMoveAdv(url,time)
                }
            },1000)
    }

    async function setTimePlayer(url,time){
        await setTimeout(
            async()=>{
                const msgRes = await httpGet(url)
                if(msgRes.infPlayerAdv.namePlayer!==null){
                    notifyFunctions(functionToCallBack.playerConnection,msgRes.infPlayerAdv)
                }
                else if(time===10){
                    const infPlayerAdv={
                        connection:false}
                    notifyFunctions(functionToCallBack.playerConnection,infPlayerAdv)
                }
                else{
                    time++
                    setTimePlayer(url,time)
                }
            },1000)
    }

    const functionToCallBack= {
        moveAdversary:[],
        informationStart:[],
        endGame:[],
        playerConnection:[]
    }

    this.subscribeMoveAdversary=function(fn){
        functionToCallBack.moveAdversary.push(fn)   
    }
    this.subscribeInformationStart=function(fn){
        functionToCallBack.informationStart.push(fn)
    }
    this.subscribeEndGame=function(fn){
        functionToCallBack.endGam.push(fn)
    }
    this.subscribePlayerConnection=function(fn){
        functionToCallBack.playerConnection.push(fn)
    }
    function notifyFunctions (objToCallBack,parameters){
        objToCallBack.forEach((fn)=>fn(parameters))
    }
    
    async function httpPost(obj,url){
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

    async function httpGet(url){
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
}