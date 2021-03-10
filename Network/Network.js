
export default function interfaceNetwork(){
    const game={
        keys:{
            main:null,
            secretPlayer:null
        }
    }
    this.send={
        infStartGame: async(infGame) =>{
            const url = 'http://localhost:3030/api/v1/startGame/infGame'
            const msgRes = await sendPost(infGame,url)
            game.keys = msgRes.keyGame
            const sendController={
                players:msgRes.players,
                statusGame:msgRes.statusGame
            }
            return sendController
        },
        aMoveGame: async(move) =>{
            const url = 'http://localhost:3030/api/v1/movementGame'
            const objsend={
                key:game.keys.main,
                player:game.keys.secretPlayer,
                movement:move
            }
            const msgRes = await sendPost(objsend,url)
            console.log(msgRes)
            return msgRes
        },
        giveUp: async(giveUp) =>{
            if (giveUp === true){
                const url = 'http://localhost:3030/api/v1/giveUpGame'
                const msgRes = await sendPost(giveUp,url,functionToCallBack.informationStart)
            }
            return msgRes
        },
        endGame: async(endGame) =>{
            if (endGame === true){
                const url = 'http://localhost:3030/api/v1/endGame'
                const msgRes = await sendPost(endGame,url,functionToCallBack.informationStart)
            }
            return msgRes
        }
    }
    this.receibe={
        moveAdversary: async()=>{
            const url = `http://localhost:3030/api/v1/movementGame?key=${game.keys.main}&player=${game.keys.secretPlayer}`
            const waitMove = setInterval(async()=>{
                const msgRes = await getInf(url)
                if(msgRes.msg!=="noMove"){
                    clearInterval(waitMove) 
                    notifyFunctions(functionToCallBack.moveAdversary,msgRes.move)
                }
            },1000)
        }
    }

    const functionToCallBack= {
        moveAdversary:[],
        informationStart:[],
        endGame:[],
        giveUpAdv:[],
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
    this.subscribeGiveUpAdv=function(fn){
        functionToCallBack.giveUpAdv.push(fn)
    }

    function notifyFunctions (objToCallBack,parameters){
        objToCallBack.forEach((fn)=>fn(parameters))
    }
    
    async function sendPost(obj,url){
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

    async function getInf(url){
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