import msgsAndAlerts from "../MsgsAndAlerts.js"
import networkFlows from "./NetworkFlows.js"
import methodsHTTP from "./MethodsHTTP.js"
const httpMethods = new methodsHTTP()

export default function interfaceNetwork(){
    const networkConf={
        codes:{
            room:null,
            player:null
        },
        url:"http://localhost:3030/api/v1"
    }

    this.sendSever={
        startNewRoom: async(nickAndCode) =>{
            const url = networkConf.url+"/startGame/startNewRoom"
            // nickAndCode = {name:value, roomCode:value}
            const infMultiplayer = {
                playerName:nickAndCode.name,
                roomCode:nickAndCode.roomCode
            }
            const msgRes = await httpMethods.post(infMultiplayer,url)
            if(msgsAndAlerts.network.connectedServer.connection===msgRes){
                const err=networkFlows.server.errServer
                notifyFunctions(functionToCallBack.errConnection,err)
                return err.connectedServer
            }
            else{
                const status= networkFlows.room[msgRes.statusRoom](msgRes.status)
                return status
            }
        },

        async connectInARoom(nickAndCode){
            const url = networkConf.url+"/startGame/connectInARoom"
            // nickAndCode = {name:value, roomCode:value}
            const infMultiplayer = {
                playerName:nickAndCode.name,
                roomCode:nickAndCode.roomCode
            }
            const msgRes = await httpMethods.post(infMultiplayer,url)
            if(msgsAndAlerts.network.connectedServer.connection===msgRes){
                const err=networkFlows.server.errServer
                notifyFunctions(functionToCallBack.errConnection,err)
                return err.connectedServer
            }
            else{
                const status= networkFlows.room[msgRes.statusRoom](msgRes.status)
                return status
            }
        },

        moveGame: async(move) =>{
            const url = networkConf.url+"/movementGame/updateMovement"
            const objSend={
                roomCode:networkConf.codes.room,
                playerCode:networkConf.codes.player,
                movement:move
            }
            const msgRes = await httpMethods.post(objSend,url)
            if(msgsAndAlerts.network.connectedServer.connection===msgRes){
                const err=networkFlows.server.errServer
                notifyFunctions(functionToCallBack.errConnection,err)
                return err.connectedServer
            }
            else{
                const status= networkFlows.room[msgRes.statusMovement](msgRes.move)
                return status
            }
        },

        confirmMovement:function(isCorretMove){
            const url = networkConf.url+"/movementGame/confirmMovement"
            const objSend={
                roomCode:networkConf.codes.room,
                playerCode:networkConf.codes.player,
                isCorretMove:isCorretMove
            }
            const msgRes = httpMethods.post(objSend,url)
            if(msgsAndAlerts.network.connectedServer.connection===msgRes){
                const err=networkFlows.server.errServer
                notifyFunctions(functionToCallBack.errConnection,err)
                return err.connectedServer
            }
            else{
                const status= networkFlows.room[msgRes.statusMovement](msgRes.move)
                return status
            }
        },

        giveUp: async() =>{
            const url = networkConf.url+"/giveUpGame"
            const objSend={
                roomCode:networkConf.codes.room,
                playerCode:networkConf.codes.player,
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
                roomCode:networkConf.codes.room,
                playerCode:networkConf.codes.player,
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
                roomCode: networkConf.codes.room,
                playerCode: networkConf.codes.player
            }
            let query = Object.keys(params)
                    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
                    .join("&");
            const url = networkConf.url+"movementGame/getMovement?" +query
            setTimeMoveAdv(url)
        },
        playerConnection: ()=>{
            const params = {
                roomCode: networkConf.codes.room,
                playerCode: networkConf.codes.player
              }
            let query = Object.keys(params)
                    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
                    .join("&");
            const url = networkConf.url+"/statusGame?"+query
            setTimePlayer(url)
        },
        statusGame: ()=>{ 
            const params = {
                roomCode: networkConf.codes.room,  
                playerCode: networkConf.codes.player
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
                    const err=networkFlows.server.errServer
                    notifyFunctions(functionToCallBack.errConnection,err)
                }
                else if(msgRes.statusMovement===networkConf.movement.status.movementAvailable){
                    const status = networkConf.movement.movementAvailable()
                    notifyFunctions(functionToCallBack.moveAdversary,status)
                }
                else if(msgRes.statusMovement===networkConf.movement.status.waitAgain){
                    const status = networkConf.movement.waitAgain()
                    notifyFunctions(functionToCallBack.moveAdversary,status)
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
                    const err=networkFlows.server.errServer
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
                const statusGame = await httpMethods.get(url)
                if(msgServer.connectionServer===statusGame){
                    clearInterval(waitInf) 
                    const err={
                        connectedServer:false,
                        msg:msgServer.connectionServer
                    }
                    notifyFunctions(functionToCallBack.errConnection,err)
                }
                else if(statusGame.infPlayerAdv.giveUp===true){
                    clearInterval(waitInf) 
                    const infPlayerAdv= statusGame.infPlayerAdv
                    notifyFunctions(functionToCallBack.giveUp,infPlayerAdv)
                }
                else if(statusGame.statusGame.endGame===true){
                    clearInterval(waitInf) 
                    const statusGame = statusGame.statusGame
                    notifyFunctions(functionToCallBack.endGame,statusGame)
                }
                else if(statusGame.statusGame.connection===false){
                    if(statusGame.infPlayerAdv.connection===false){
                        clearInterval(waitInf) 
                        const statusGame = statusGame.infPlayerAdv
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