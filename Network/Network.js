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
        updateCodes(statusCodes){
            networkConf.codes.room=statusCodes.room
            networkConf.codes.player=statusCodes.player
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
                return err
            }
            else{
                const status= networkFlows.room[msgRes.statusRoom](msgRes.status,networkConf.updateCodes)
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
                return err
            }
            else{
                const status= networkFlows.room[msgRes.statusRoom](msgRes.status,networkConf.updateCodes)
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
                return err
            }
            else{
                const status= networkFlows.movement[msgRes.statusMovement](msgRes.move)
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
                return err
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
            if(msgsAndAlerts.network.connectedServer.connection===msgRes){
                const err=networkFlows.server.errServer
                notifyFunctions(functionToCallBack.errConnection,err)
                return err
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
            if(msgsAndAlerts.network.connectedServer.connection===msgRes){
                const err=networkFlows.server.errServer
                notifyFunctions(functionToCallBack.errConnection,err)
                return err
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
            const url = networkConf.url+"/movementGame/getMovement?" +query
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
                if(msgsAndAlerts.network.connectedServer.connection===msgRes){
                    const err=networkFlows.server.errServer
                    notifyFunctions(functionToCallBack.errConnection,err)
                }
                else if(msgRes.statusMovement===networkFlows.movement.typeStatus.movementAvailable){
                    const status = networkFlows.movement.movementAvailable(msgRes.move)
                    notifyFunctions(functionToCallBack.moveAdversary,status)
                }
                else if(msgRes.statusMovement===networkFlows.movement.typeStatus.waitAgain){
                    timeCounter++
                    setTimeMoveAdv(url,timeCounter)
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
                if(msgsAndAlerts.network.connectedServer.connection===msgRes){
                    const err=networkFlows.server.errServer
                    notifyFunctions(functionToCallBack.errConnection,err)
                }
                else if(msgRes.statusPlayerAdv.namePlayer!==null){
                    const statusPlayerAdv= networkFlows.statusGame.advPlayer(msgRes.statusPlayerAdv)
                    notifyFunctions(functionToCallBack.playerConnection,statusPlayerAdv)
                }
                else if(timeCounter===timeLimite){
                    notifyFunctions(functionToCallBack.playerConnection,networkFlows.timeLimit)
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
                if(msgsAndAlerts.network.connectedServer.connection===statusGame){
                    clearInterval(waitInf) 
                    const err=networkFlows.server.errServer  
                    notifyFunctions(functionToCallBack.errConnection,err)
                }
                else if(statusGame.statusPlayerAdv.giveUp===true){
                    clearInterval(waitInf)
                    const statusGiveUp=networkFlows.statusGame.giveUp(statusPlayerAdv)
                    notifyFunctions(functionToCallBack.giveUp,statusGiveUp)
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