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

    this.sendSever={
        infStartGame: async(infGame) =>{
            const url = networkConf.url+"/startGame/infGame"
            // infGame = {name:value, roomCode:value}
            const infMultiplayer = {
                playerName:infGame.name,
                roomCode:infGame.roomCode
            }
            const msgRes = await httpMethods.post(infMultiplayer,url)
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
            const msgRes = await httpMethods.post(objsend,url)
            return msgRes
        },
        giveUp: async(giveUp) =>{
            if (giveUp === true){
                const url = networkConf.url+"/giveUpGame"
                const msgRes = await httpMethods.post(giveUp,url,functionToCallBack.informationStart)
            }
            return msgRes
        },
        endGame: async(endGame) =>{
            if (endGame === true){
                const url = networkConf.url+"/endGame"
                const msgRes = await httpMethods.post(endGame,url)
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
                if(msgRes.msg!=="no Move"){//ficar nun objeto
                    notifyFunctions(functionToCallBack.moveAdversary,msgRes.move)
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
                if(msgRes.infPlayerAdv.namePlayer!==null){
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
}