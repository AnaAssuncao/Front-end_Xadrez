
export default function interfaceNetwork(){
    const game={
        keys:{
            main:null,
            secretPlayer:null
        }
    }

    const networkConf={
        url:"http://localhost:3030/api/v1"
    }

    this.send={
        infStartGame: async(infGame) =>{
            const url = networkConf.url+'/startGame/infGame'
            const msgRes = await httpPost(infGame,url)
            game.keys = msgRes.keyGame
            const sendController={
                players:msgRes.players,
                statusGame:msgRes.statusGame
            }
            return sendController
        },
        moveGame: async(move) =>{
            const url = networkConf.url+'/movementGame'
            const objsend={
                key:game.keys.main,
                player:game.keys.secretPlayer,
                movement:move
            }
            const msgRes = await httpPost(objsend,url)
            console.log(msgRes)
            return msgRes
        },
        giveUp: async(giveUp) =>{
            if (giveUp === true){
                const url = networkConf.url+'/giveUpGame'
                const msgRes = await httpPost(giveUp,url,functionToCallBack.informationStart)
            }
            return msgRes
        },
        endGame: async(endGame) =>{
            if (endGame === true){
                const url = networkConf.url+'/endGame'
                const msgRes = await httpPost(endGame,url,functionToCallBack.informationStart)
            }
            return msgRes
        }
    }
   
    this.get={
        moveAdversary: async()=>{
            const params = {
                key: game.keys.main,
                player: game.keys.secretPlayer
              }
            let query = Object.keys(params)
                    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
                    .join('&');
            const url = networkConf.url+"/movementGame?" +query
            const waitMove = 
                setInterval(
                        async()=>{
                            const msgRes = await httpGet(url)
                            if(msgRes.msg!=="noMove"){
                                clearInterval(waitMove) 
                                notifyFunctions(functionToCallBack.moveAdversary,msgRes.move)
                            }
                        },1000)
        },
        playerConnection: async()=>{
            const params = {
                key: game.keys.main,
                player: game.keys.secretPlayer
              }
            let query = Object.keys(params)
                    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
                    .join('&');
            const url = networkConf.url+"/statusGame?"+query
            let msgRes
            const waitInf = 
                await setInterval(
                            async()=>{
                                msgRes = await httpGet(url)
                                if(msgRes.statusGame.connection==="connected players"){
                                    clearInterval(waitInf) 
                                    notifyFunctions(functionToCallBack.playerConnection)
                                }
                            },1000)
        }
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