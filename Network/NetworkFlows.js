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
                }
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
    }
}

export default networkFlows