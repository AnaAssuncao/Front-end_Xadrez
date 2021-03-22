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
        connectedRoom(statusGame){
            const sendController=  {
                connectedServer:true,
                advPlayer:{
                    advName:statusGame.statusPlayerAdv.namePlayer,
                    advColor:statusGame.statusPlayerAdv.color
                },
                msg:msgsAndAlerts.network.connectedRoom.msgToRender
            }
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
        status:{
            movementAvailable:"movementAvailable"
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
        correctMove(movement){
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
                move:msgRes.move,
                infPlayerAdv:msgRes.infPlayerAdv,
                move:movement
            }
            return sendController
        }

    }
}

export default networkFlows