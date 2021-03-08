export default function interfaceNetwork(a){
    this.send={
        infStartGame(infGame){
            console.log(infGame)
            // network.sendKeyGame(key)
            return true
        },
        aMoveGame(move){
            // network.sendAMoveGame(move)
            return true
        },
        giveUp(giveUp){
            // if (giveUp === true)
            // network.sendGiveUp(giveUp)
            return true
        },
        endGame(endGame){
            // if (endGame === true)
            // network.sendEndGame(endGame)
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
}