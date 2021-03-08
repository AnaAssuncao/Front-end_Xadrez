
export default function interfaceNetwork(){
    this.send={
        infStartGame(infGame){
            const url = 'http://localhost:3030/api/v1/startGame/infGame'
            sendPost(infGame,url,functionToCallBack.informationStart)
            return true
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
    
    function sendPost(obj,url,functioncallback){
        const msgSend = JSON.stringify(obj)
        fetch(url,{
            method: "POST",
            body: msgSend,
            headers:{
                "content-type": "application/json; charset=UTF-8",
                "accept": "*/*",
                "Content-Length" : msgSend.length.toString(),
                "Access-Control-Allow-Origin": "*"
            }
        })               
        .then(resp => {
            return resp.text()
        })
        .then(resp => {
            const msgRec = JSON.parse(resp)
            notifyFunctions(functioncallback,msgRec)
        })
    }
}