import methodsHTTP from "./MethodsHTTP.js"
const httpMethods = new methodsHTTP()

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

    const msgServer={
        room:{
            exist:"codeExist"
        },
        connectionServer:"errServe",
        move:{
            move:"move",
            noMove:"no Move"
        }
    }

    this.sendSever={
        infStartGame: async(infGame) =>{
            const url = networkConf.url+"/startGame/infGame"
            // infGame = {name:value, roomCode:value}
            const infMultiplayer = {
                playerName:infGame.name,
                roomCode:infGame.roomCode
            }
            const msgRes = await httpMethods.post(infMultiplayer,url)
            if(msgServer.connectionServer===msgRes){
                const err={
                    connectedServer:false,
                    msg:msgServer.connectionServer
                }
                notifyFunctions(functionToCallBack.errConnection,err)
                return err.connectedServer
            }
            else{
                if(msgServer.room.exist===msgRes.codes.room){
                    const sendController={
                        connectedServer:false,
                        msg:msgServer.room.exist
                    }
                    return sendController
                }
                else{
                    gameCong.codes = msgRes.codes
                    const sendController={
                        connectedServer:true,
                        playerAdv:msgRes.infPlayerAdv,
                        connection:msgRes.statusGame.connection,
                    }
                    return sendController
                }
            }
        },
        moveGame: async(move) =>{
            const url = networkConf.url+"/movementGame"
            const objSend={
                roomCode:gameCong.codes.room,
                playerCode:gameCong.codes.player,
                movement:move
            }
            const msgRes = await httpMethods.post(objSend,url)
            if(msgServer.connectionServer===msgRes){
                const err={
                    connectedServer:false,
                    msg:msgServer.connectionServer
                }
                notifyFunctions(functionToCallBack.errConnection,err)
                return err.connectedServer
            }
            else{
                const sendController={
                    connectedServer:true,
                    msg:msgRes
                }
                return sendController
            }
        },
        giveUp: async() =>{
            const url = networkConf.url+"/giveUpGame"
            const objSend={
                roomCode:gameCong.codes.room,
                playerCode:gameCong.codes.player,
                giveUp:true
            } 
            const msgRes = await httpMethods.post(objSend,url)
            if(msgServer.connectionServer===msgRes){
                const err={
                    connectedServer:false,
                    msg:msgServer.connectionServer
                }
                notifyFunctions(functionToCallBack.errConnection,err)
                return err.connectedServer
            }
            return msgRes
        },
        endGame: async() =>{
            const objSend={
                roomCode:gameCong.codes.room,
                playerCode:gameCong.codes.player,
                endGame:true
            } 
            const url = networkConf.url+"/endGame"
            const msgRes = await httpMethods.post(objSend,url)
            if(msgServer.connectionServer===msgRes){
                const err={
                    connectedServer:false,
                    msg:msgServer.connectionServer
                }
                notifyFunctions(functionToCallBack.errConnection,err)
                return err.connectedServer
            }
            return msgRes
        }
    }
   
    this.enableCalls={
        moveAdversary: ()=>{
            const params = {
                roomCode: gameCong.codes.room,
                playerCode: gameCong.codes.player
              }
            let query = Object.keys(params)
                    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
                    .join("&");
            const url = networkConf.url+"/movementGame?" +query
            setTimeMoveAdv(url)
        },
        playerConnection: ()=>{
            const params = {
                roomCode: gameCong.codes.room,
                playerCode: gameCong.codes.player
              }
            let query = Object.keys(params)
                    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
                    .join("&");
            const url = networkConf.url+"/statusGame?"+query
            setTimePlayer(url)
        },
        statusGame: ()=>{ 
            const params = {
                roomCode: gameCong.codes.room,  
                playerCode: gameCong.codes.player
              }
            let query = Object.keys(params)
                    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
                    .join("&");
                    
            const url = networkConf.url+"/statusGame?"+query
            setTimeStatusGame(url)
        }
    }

    function setTimeMoveAdv(url,timeCounter=0,timeLimite=1000){
        setTimeout(
            async()=>{
                const msgRes = await httpMethods.get(url)
                if(msgServer.connectionServer===msgRes){
                    const err={
                        connectedServer:false,
                        msg:msgServer.connectionServer
                    }
                    notifyFunctions(functionToCallBack.errConnection,err)
                }
                else if(msgRes.msg===msgServer.move.move){
                    const sendController={
                        move:msgRes.move,
                        infPlayerAdv:msgRes.infPlayerAdv
                    }
                    notifyFunctions(functionToCallBack.moveAdversary,sendController)
                }
                else if(timeCounter===timeLimite){
                    const connection = false
                    notifyFunctions(functionToCallBack.playerConnection,connection)
                }
                else{
                    timeCounter++
                    setTimeMoveAdv(url,timeCounter)
                }
            },1000)
    }

    function setTimePlayer(url,timeCounter=0,timeLimite=1000){
        setTimeout(
            async()=>{
                const msgRes = await httpMethods.get(url)
                if(msgServer.connectionServer===msgRes){
                    const err={
                        connectedServer:false,
                        msg:msgServer.connectionServer
                    }
                    notifyFunctions(functionToCallBack.errConnection,err)
                }
                else if(msgRes.infPlayerAdv.namePlayer!==null){
                    notifyFunctions(functionToCallBack.playerConnection,msgRes.infPlayerAdv)
                }
                else if(timeCounter===timeLimite){
                    const infPlayerAdv={
                        connection:false}
                    notifyFunctions(functionToCallBack.playerConnection,infPlayerAdv)
                }
                else{
                    timeCounter++
                    setTimePlayer(url,timeCounter)
                }
            },1000)
    }

    function setTimeStatusGame(url){
        const waitInf = 
        setInterval(
            async()=>{
                const infGame = await httpMethods.get(url)
                if(msgServer.connectionServer===infGame){
                    clearInterval(waitInf) 
                    const err={
                        connectedServer:false,
                        msg:msgServer.connectionServer
                    }
                    notifyFunctions(functionToCallBack.errConnection,err)
                }
                else if(infGame.infPlayerAdv.giveUp===true){
                    clearInterval(waitInf) 
                    const infPlayerAdv= infGame.infPlayerAdv
                    notifyFunctions(functionToCallBack.giveUp,infPlayerAdv)
                }
                else if(infGame.statusGame.endGame===true){
                    clearInterval(waitInf) 
                    const statusGame = infGame.statusGame
                    notifyFunctions(functionToCallBack.endGame,statusGame)
                }
                else if(infGame.statusGame.connection===false){
                    if(infGame.infPlayerAdv.connection===false){
                        clearInterval(waitInf) 
                        const statusGame = infGame.infPlayerAdv
                        notifyFunctions(functionToCallBack.playerConnection,statusGame)
                    }
                }
        },1000)
    }

    const functionToCallBack= {
        moveAdversary:[],
        informationStart:[],
        giveUp:[],
        endGame:[],
        playerConnection:[], 
        errConnection:[]
    }

    this.subscribeMoveAdversary=function(fn){
        functionToCallBack.moveAdversary.push(fn)   
    }
    this.subscribeInformationStart=function(fn){
        functionToCallBack.informationStart.push(fn)
    }
    this.subscribeEndGame=function(fn){
        functionToCallBack.endGame.push(fn)
    }
    this.subscribeGiveUp=function(fn){
        functionToCallBack.giveUp.push(fn)
    }
    this.subscribePlayerConnection=function(fn){
        functionToCallBack.playerConnection.push(fn)
    }
    this.subscribeErrConnection=function(fn){
        functionToCallBack.errConnection.push(fn)
    }
    function notifyFunctions (objToCallBack,parameters){
        objToCallBack.forEach((fn)=>fn(parameters))
    }
}