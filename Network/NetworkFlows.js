import msgsAndAlerts from "../MsgsAndAlerts.js"

const networkFlows={
    server:{
        errServer:{
            connectedServer:false,
            msg:msgsAndAlerts.network.connectedServer.alertToRender
        }
    },
    room:{
        roomWithOnePlayer(){
            const sendController= {
                connectedServer:false,
                msg:msgsAndAlerts.network.roomWithOnePlayer.alertToRender
            }
            return sendController
        },
        roomUnavailable(){
            const sendController=  {
                connectedServer:false,
                msg:msgsAndAlerts.network.roomWithOnePlayer.alertToRender
            }
            return sendController
        },
        connectedRoom(statusGame,updateCodes){
            const sendController=  {
                connectedServer:true,
                advPlayer:{
                    advName:statusGame.statusPlayerAdv.namePlayer,
                    advColor:statusGame.statusPlayerAdv.color
                },
                msg:msgsAndAlerts.network.connectedRoom.msgToRender
            }
            updateCodes(statusGame.statusCodes)
            return sendController
        },
        noExistRoom(){
            const sendController=  {
                connectedServer:false,
                msg:msgsAndAlerts.network.noExistRoom.alertToRender
            }
            return sendController
        }
    },
    movement:{
        typeStatus:{
            movementAvailable:"movementAvailable",
            waitAgain:"waitAgain"
        },
        waitAgain(){
            const sendController={
                connectedServer:true,
                isCorrectMove:false,
                move:null,
                msg:msgsAndAlerts.network.waitAgain.alertToRender
            }
            return sendController
        },
        correctMove(){
            const sendController={
                connectedServer:true,
                isCorrectMove:true,
                msg:msgsAndAlerts.network.waitAgain.alertToRender
            }
            return sendController
        },
        incorrectMove(){
            const sendController={
                connectedServer:true,
                isCorrectMove:false,
                msg:msgsAndAlerts.network.incorrectMove.alertToRender
            }
            return sendController
        },
        movementAvailable(movement){
            const sendController={
                connectedServer:true,
                move:movement,
            }
            return sendController
        }
    },
    statusGame:{
        advPlayer(statusPlayerAdv){
            const sendController={
                connection:true,
                namePlayer:statusPlayerAdv.namePlayer,
                colorWin: statusPlayerAdv.color
            }
            return sendController
        },

        giveUp(statusPlayerAdv){
            const sendController={
                typeEndGame:"giveUp",
                colorWin: statusPlayerAdv.color, 
                namePlayer:statusPlayerAdv.namePlayer,
                sendServer:true
            }
            return sendController
        } 
    },
    timeLimit:{
        connection:false
    }
}

export default networkFlows