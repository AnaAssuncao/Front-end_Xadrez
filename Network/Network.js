
export default function interfaceNetwork(){
    this.send={
            infStartGame: async(infGame) =>{
            const url = 'http://localhost:3030/api/v1/startGame/infGame'
            const msgRes = await sendPost(infGame,url,functionToCallBack.informationStart)
            return msgRes
        },
        aMoveGame(move){
            const url = 'http://localhost:3030/api/v1/movementGame'
            sendPost(move,url,functionToCallBack.informationStart)
            return true
        },
        giveUp(giveUp){
            if (giveUp === true){
                const url = 'http://localhost:3030/api/v1/giveUpGame'
                sendPost(giveUp,url,functionToCallBack.informationStart)
            }

            return true
        },
        endGame(endGame){
            if (endGame === true){
                const url = 'http://localhost:3030/api/v1/endGame'
                sendPost(endGame,url,functionToCallBack.informationStart)
            }
            return true
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
}