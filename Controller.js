import CreateGame from "./Game/XadrezGame.js"
import ViewController from "./View/ViewController.js"
import InterfaceNetwork from "./Network/Network.js"
import ApplicationSetup from "./Control_Prototypes/ApplicationSetup.js"
import OfflineGame from "./Control_Prototypes/OfflineGame.js"
import OnlineGame from "./Control_Prototypes/OnlineGame.js"
import msgsAndAlerts from "./MsgsAndAlerts.js"

const applicationSetup = new ApplicationSetup()
let gameLogic = new CreateGame(applicationSetup.colorsGame)
const startBoard = gameLogic.getCurrentBoard()

const viewController = new ViewController (startBoard)
const network = new InterfaceNetwork()

const interfaceFunctions={ 
    startGameOffline:function(){
        const gameModeFunctions= new OfflineGame(gameLogic,applicationSetup,viewController)
        applicationSetup.addGame(gameModeFunctions)
        applicationSetup.gameMode.start()
    },  
    startNewRoomOnline:function(nickAndCode){
        const gameModeFunctions= new OnlineGame(gameLogic,applicationSetup,viewController,network)
        applicationSetup.addGame(gameModeFunctions)
        applicationSetup.gameMode.startNewRoom(nickAndCode)
    },
    connectInARoomOnline:function(nickAndCode){
        const gameModeFunctions= new OnlineGame(gameLogic,applicationSetup,viewController,network)
        applicationSetup.addGame(gameModeFunctions)
        applicationSetup.gameMode.connectInARoom(nickAndCode)
    },
    restartGame:function(){
        applicationSetup.gameMode.restartGame()
    },
    move:function(informationPieceSelect){
        applicationSetup.gameMode.move(informationPieceSelect)
    },
    backPreviousMove:function(){
        applicationSetup.gameMode.backPreviousMove()
    },
    moveAdv:function(infMoveAdv){
        applicationSetup.gameMode.getMoveAdv(infMoveAdv)
    },
    playerConnection:function(infPlayerAdv){
        applicationSetup.gameMode.connectionPlayerTwo(infPlayerAdv)
    },
    giveUp:function(){
        applicationSetup.gameMode.advGiveUp()
    },
    errConnection(msgErr){
        applicationSetup.gameMode.informationProminentErr(msgErr)
    },
    timeOutToMove(playerName){
        applicationSetup.gameMode.timeOutToMove(playerName)
    }
}

wakeUpServer()
recoveryGame()
viewController.subscribeStartGameOffline(interfaceFunctions.startGameOffline)
viewController.subscribeStartNewRoomOnline(interfaceFunctions.startNewRoomOnline)
viewController.subscribeConnectInARoomOnline(interfaceFunctions.connectInARoomOnline)
viewController.subscribeMovePiece(interfaceFunctions.move)
viewController.subscribeHistory(interfaceFunctions.backPreviousMove)
viewController.subscribeRestartGame(interfaceFunctions.restartGame)
network.subscribeMoveAdversary(interfaceFunctions.moveAdv)
network.subscribePlayerConnection(interfaceFunctions.playerConnection)
network.subscribeGiveUp(interfaceFunctions.giveUp)
network.subscribeErrConnection(interfaceFunctions.errConnection)
network.subscribeTimeOutToMove(interfaceFunctions.timeOutToMove)

function wakeUpServer(){
    network.sendServer.wakeUp()
}

async function recoveryGame(){
    const playerInformationJSON = localStorage.getItem("playerInformation")
    if(playerInformationJSON){
        const playerInformation = JSON.parse(playerInformationJSON)
        if((Date.now()-playerInformation.timeConnection)>applicationSetup.time.connection){
            try{
                const room = await network.sendServer.checkGameReconnection(playerInformation.statusCode)
                const savedPlaysJSON = localStorage.getItem("historyPlayer")
                const plays = (savedPlaysJSON)?JSON.parse(savedPlaysJSON):null
                if(room.isConnected && room.statusPlayerAdv.namePlayer===playerInformation.statusPlayers.advName){
                    applicationSetup.addGame(new OnlineGame(gameLogic,applicationSetup,viewController,network))
                    if(plays){
                        if(room.qtMovements===plays.length || (room.qtMovements-1)===plays.length){
                            applicationSetup.gameMode.startReconnection(room,playerInformation,plays)
                        }
                        else{
                            applicationSetup.gameMode.restartGame()
                        }
                    }
                    else if(room.qtMovements===0){
                        applicationSetup.gameMode.startReconnection(room,playerInformation,plays)
                    }
                    else{
                        applicationSetup.gameMode.restartGame()
                    }
                }
                else{
                    viewController.displayHomeMenu()
                    applicationSetup.clearLocalStorage()
                }    
            }
            catch{
                viewController.displayHomeMenu()
            }
        }
        else{
            viewController.displayBannerGame(msgsAndAlerts.roomAndCode.runningGame())
        }  
    }
    else{
        viewController.displayHomeMenu()
    }
}