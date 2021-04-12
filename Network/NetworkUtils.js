import msgsAndAlerts from "../MsgsAndAlerts.js"

const functionToCallBack= {
    updateCode:[],
    giveUp:[],
    timeOutToMove:[]
}

const subscribeUpdateCode=function(fn){
    functionToCallBack.updateCode.push(fn)
}

const subscribeGiveUp=function(fn){
    functionToCallBack.giveUp.push(fn)
}

const subscribeTimeOutToMove=function(fn){
    functionToCallBack.timeOutToMove.push(fn)
}

const functionsStatusRoom={
    roomWithOnePlayer:function(){
        const sendController= {
            serverConnection:false,
            msg:msgsAndAlerts.roomAndCode.roomWithOnePlayer()
        }
        return sendController
    },
    roomUnavailable:function(){
        const sendController=  {
            serverConnection:false,
            msg:msgsAndAlerts.roomAndCode.roomUnavailable()
        }
        return sendController
    },
    connectedRoom:function(param){
        const sendController=  {
            serverConnection:true,
            statusPlayerAdv:{
                namePlayer:param.statusPlayerAdv.namePlayer,
                color:param.statusPlayerAdv.color
            },
            statusCodes:param.statusCodes,
            msg:msgsAndAlerts.roomAndCode.connectedRoom(param.statusCodes.roomCode)
        }
        notifyUpdates(functionToCallBack.updateCode,param.statusCodes)
        return sendController
    },
    noExistRoom:function(){
        const sendController=  {
            serverConnection:false,
            msg:msgsAndAlerts.roomAndCode.noExistRoom()
        }
        return sendController
    },
    roomNotReconnected:function(){
        const sendController=  {
            isConnected:false,
            msg:msgsAndAlerts.roomAndCode.roomNotReconnected()
        }
        return sendController
    },
    reconnectRoom:function(param){
        const sendController=  {
            isConnected:true,
            statusPlayerAdv:param.statusPlayerAdv,
            qtMovements:param.qtMovements,
            msg:msgsAndAlerts.roomAndCode.reconnectRoom()
        }
        notifyUpdates(functionToCallBack.updateCode,param.statusCode)
        return sendController
    }
}

const functionsStatusMovement={
    waitAgain:function(){
        const sendController={
            serverConnection:true,
            isCorrectMove:false,
            move:null,
            msg:msgsAndAlerts.roomAndCode.noExistRoom()
        }
        return sendController
    },
    correctMovement:function(){
        const sendController={
            serverConnection:true,
            isCorrectMove:true,
            msg:msgsAndAlerts.roomAndCode.waitAgain()
        }
        return sendController
    },
    incorrectMovement:function(){
        const sendController={
            serverConnection:true,
            move:null,
            isCorrectMove:false,
            msg:msgsAndAlerts.movement.cheatMovement()
        }
        return sendController
    },
    movementAvailable:function(param){
        const sendController={
            serverConnection:true,
            move:param.move,
        }
        return sendController
    },
    endTimeMovement:function(){
        const sendController={
            serverConnection:false,
            move:null,
            msg:msgsAndAlerts.movement.endTime(),
        }
        return sendController
    }
}

const functionsStatusGame={
    advPlayer:function(param){
        const sendController={
            isAdvConnected:true,
            namePlayer:param.statusPlayerAdv.namePlayer,
            colorWin: param.statusPlayerAdv.color
        }
        return sendController
    },
    endTimeAdv:function(){
        const sendController={
            isAdvConnected:false,
            msg:msgsAndAlerts.startGame.noAdv(),
        }
        return sendController
    },
    giveUp:function(){
        notifyUpdates(functionToCallBack.giveUp)
    },
    playerWin:function(){
        const sendController={
            serverConnection:true,
        }
        return sendController
    },
    timeOutToMove:function(param){
        const playerName = param.endGame.playerName
        notifyUpdates(functionToCallBack.timeOutToMove,playerName)
    },
    endGame:function(){
        const sendController={
            serverConnection:true,
        }
        return sendController
    }
}


const functionsStatusServer={
    errServer(){
        const sendController={
            msg:msgsAndAlerts.connection.errServer(),
            serverConnection:false,
        }
        return sendController
    }
}

const callFunctionByStatusRoom = function(status,paramStatus){
    if(functionsStatusRoom[status]){
        return functionsStatusRoom[status](paramStatus)
    }
    return functionsStatusServer.errServer()
}

const callFunctionByStatusMovement= function(status,paramStatus){
    if(functionsStatusMovement[status]){
        return functionsStatusMovement[status](paramStatus)
    }
    return functionsStatusServer.errServer()
}

const callFunctionByStatusGame = function(status,paramStatus){
    if(functionsStatusGame[status]){
        return functionsStatusGame[status](paramStatus)
    }
    return functionsStatusServer.errServer()
}

const callFunctionByStatusServer = function(status,paramStatus){
    if(functionsStatusServer[status]){
        return functionsStatusServer[status](paramStatus)
    }
    return functionsStatusServer.errServer()
}

function notifyUpdates(objToCallBack,parameters){
    objToCallBack.forEach((fn)=>fn(parameters))
}

export default {
    subscribeUpdateCode,
    subscribeGiveUp,
    subscribeTimeOutToMove,
    callFunctionByStatusRoom,
    callFunctionByStatusMovement,
    callFunctionByStatusGame,
    callFunctionByStatusServer
}