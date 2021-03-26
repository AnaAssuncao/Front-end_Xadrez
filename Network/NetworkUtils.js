import msgsAndAlerts from "../MsgsAndAlerts.js"

const functionToCallBack= {
    updateCode:[],
}

const subscribeUpdateCode=function(fn){
    functionToCallBack.updateCode.push(fn)
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
                namePlayer:param.statusGame.statusPlayerAdv.namePlayer,
                color:param.statusGame.statusPlayerAdv.color
            },
            msg:msgsAndAlerts.roomAndCode.connectedRoom(param.statusGame.statusCodes.roomCode)
        }
        notifyUpdates(functionToCallBack.updateCode,param.statusGame.statusCodes)
        return sendController
    },
    noExistRoom:function(){
        const sendController=  {
            serverConnection:false,
            msg:msgsAndAlerts.roomAndCode.noExistRoom()
        }
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
    correctMove:function(){
        const sendController={
            serverConnection:true,
            isCorrectMove:true,
            msg:msgsAndAlerts.roomAndCode.waitAgain()
        }
        return sendController
    },
    incorrectMove:function(){
        const sendController={
            serverConnection:true,
            isCorrectMove:false,
            msg:msgsAndAlerts.movement.movementIncorret()
        }
        return sendController
    },
    movementAvailable:function(param){
        const sendController={
            serverConnection:true,
            move:param.moveGame,
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
    },
}

const functionsStatusGame={
    advPlayer:function(param){
        const sendController={
            connection:param.statusPlayerAdv.connection,
            namePlayer:param.statusPlayerAdv.namePlayer,
            colorWin: param.statusPlayerAdv.color
        }
        return sendController
    },
    endtimeAdv:function(){
        const sendController={
            connection:false,
        }
        return sendController
    },
    giveUpGame:function(){
        const sendController={
            connection:true
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
    else{
        return functionsStatusServer.errServer()
    }
}

const callFunctionByStatusMovement= function(status,paramStatus){
    if(functionsStatusMovement[status]){
        return functionsStatusMovement[status](paramStatus)
    }
    else{
        return functionsStatusServer.errServer()
    }
}

const callFunctionByStatusGame = function(status,paramStatus){
    if(functionsStatusGame[status]){
        return functionsStatusGame[status](paramStatus)
    }
    else{
        return functionsStatusServer.errServer()
    }
}

const callFunctionByStatusServer = function(status,paramStatus){
    if(functionsStatusServer[status]){
        return functionsStatusServer[status](paramStatus)
    }
    else{
        return functionsStatusServer.errServer()
    }
}

function notifyUpdates(objToCallBack,parameters){
    objToCallBack.forEach((fn)=>fn(parameters))
}

export default {
    subscribeUpdateCode,
    callFunctionByStatusRoom,
    callFunctionByStatusMovement,
    callFunctionByStatusGame,
    callFunctionByStatusServer
}