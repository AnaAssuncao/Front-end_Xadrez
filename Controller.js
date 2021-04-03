import CreateGame from "./Game/XadrezGame.js"
import ViewController from "./View/ViewController.js"
import InterfaceNetwork from "./Network/Network.js"
import GameSetup from "./Control_Prototypes/GameSetup.js"
import OfflineGame from "./Control_Prototypes/OfflineGame.js"
import OnlineGame from "./Control_Prototypes/OnlineGame.js"

const gameSetup = new GameSetup()
let game = new CreateGame(gameSetup.colorsGame)
const startBoard = game.getCurrentBoard()

const viewController = new ViewController (startBoard)
const network = new InterfaceNetwork()

const interfaceFunctions={ 
    startGameOffline:function(){
        gameSetup.addGame(new OfflineGame(game,gameSetup,viewController))
        gameSetup.game.start()
    },  
    startNewRoomOnline:function(nickAndCode){
        gameSetup.addGame(new OnlineGame(game,gameSetup,viewController,network))
        gameSetup.game.startNewRoom(nickAndCode)
    },
    connectInARoomOnline:function(nickAndCode){
        gameSetup.addGame(new OnlineGame(game,gameSetup,viewController,network))
        gameSetup.game.connectInARoom(nickAndCode)
    },
    restartGame:function(){
        gameSetup.game.restartGame()
    },
    move:function(informationPieceSelect){
        gameSetup.game.move(informationPieceSelect)
    },
    backPreviousMove:function(){
        gameSetup.game.backPreviousMove()
    },
    moveAdv:function(infMoveAdv){
        gameSetup.game.getMoveAdv(infMoveAdv)
    },
    playerConnection:function(infPlayerAdv){
        gameSetup.game.connectionPlayerTwo(infPlayerAdv)
    },
    giveUp:function(infPlayerAdv){
        gameSetup.game.advGiveUp(infPlayerAdv)
    },
    errConnection(msgErr){
        gameSetup.game.informationProminentErr(msgErr)
    }
}

viewController.displayHomeMenu()
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
