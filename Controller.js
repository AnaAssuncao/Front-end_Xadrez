import createGame from "./Game/XadrezGame.js"
import ViewController from "./View/ViewController.js"
import interfaceNetwork from "./Network/Network.js"

const playerConfig={
    typeGame:null,
    top:"Black",
    bottom:"White",
    currentPlayer:null,
    colorMultiPlayer:null
}

const game = new createGame(playerConfig)
const startboard = game.getCurrentBoard()

const viewController = new ViewController (startboard)
const network = new interfaceNetwork()

viewController.addModalStartGame()
viewController.subscribeStartSinglePlayer(startSinglePlayer)
viewController.subscribeStartMultiPlayer(startMultiPlayer)
viewController.subscribeMovePiece(moveTypeGame)
viewController.subscribeHistory(backPreviousMove)

network.subscribeMoveAdversary(getMoveAdv)
network.subscribePlayerConnection(connectionPlayerTwo)

function startSinglePlayer(){
    playerConfig.currentPlayer="White"
    playerConfig.typeGame="SinglePlayer"
    viewController.clearModalStartGame()
    viewController.clearinformationModal()
    const msgConnection="Jogo Local"
    viewController.updateStatusConection("offline",msgConnection)
    viewController.addButtonBackMovement()
    startGame(playerConfig.currentPlayer, playerConfig.top)
}

async function startMultiPlayer(infGame){
    // infGame = {name:value, roomCode:value}
    viewController.clearButtonBackMovement()
    const infPlayers= await network.sendSever.infStartGame(infGame)
    if(infPlayers){
        viewController.clearModalStartGame()
        viewController.clearinformationModal()
        playerConfig.typeGame="MultiPlayer"
        if(infPlayers.playerAdv.connection===false){
            const msgConnection = "Aguardando adversário"
            viewController.updateStatusConection("online",msgConnection)
            playerConfig.colorMultiPlayer="White"
            playerConfig.currentPlayer =playerConfig.colorMultiPlayer
            const isPlayable = false
            startGame(playerConfig.currentPlayer, playerConfig.top, isPlayable)
            network.enableCalls.playerConnection()
        }
        else{
            const msgConnection = "Conectado com "+ infPlayers.playerAdv.namePlayer
            viewController.updateStatusConection("online",msgConnection)
            playerConfig.colorMultiPlayer="Black"
            playerConfig.currentPlayer="White"
            const isPlayable = false
            startGame(playerConfig.currentPlayer, playerConfig.top, isPlayable)
            network.enableCalls.moveAdversary()
        }
        network.enableCalls.statusGame()
    }
    else{
        const infCode = "codeExist"
        viewController.informationProminent(infCode)
    }
}

function connectionPlayerTwo(infPlayerAdv){
    if(infPlayerAdv.connection===false){
        viewController.addinformationModal("noAdv")
        setTimeout(()=>{
            viewController.clearinformationModal()
            viewController.addModalStartGame()
        },5000)
    }
    else{
        const msgConnection = "Conectado com "+ infPlayerAdv.namePlayer
        viewController.updateStatusConection("online",msgConnection)
        startGame(playerConfig.currentPlayer, playerConfig.top)
    }
}
    

function startGame(colorPlayer, colorTop, isPlayable){
    game.starObjGame(colorPlayer)
    const chessBoard=game.getCurrentBoard()
    const statusGame = game.getStatusGame() 
    const capturedPieces = game.getCapturedPieces()
    const playHistory = game.getHistoryMoves()
    updateBoard(colorPlayer,chessBoard,isPlayable) 
    updateInformationGame(colorPlayer,statusGame)
    updateCapturedPiece(colorTop,capturedPieces)
    updatePlaysHistory(playHistory)   
}

function moveTypeGame(informationPieceSelect){
    if(playerConfig.typeGame==="SinglePlayer"){
        const nextPlayer=(playerConfig.top===playerConfig.currentPlayer)?playerConfig.bottom:playerConfig.top
        const isMove = movePiece(informationPieceSelect,nextPlayer)
        if(isMove){
            playerConfig.currentPlayer=nextPlayer
        }
    }
    else if(playerConfig.typeGame==="MultiPlayer"){
        const isPlayable=false
        const nextPlayer=(playerConfig.top===playerConfig.currentPlayer)?playerConfig.bottom:playerConfig.top
        const isMove = movePiece(informationPieceSelect,nextPlayer,isPlayable)
        if(isMove){
            // {informationPieceSelect: fullName,color,typeMovement,specialMovement,refId e piecePromotion}
            network.sendSever.moveGame(informationPieceSelect)
            network.enableCalls.moveAdversary()
        }
    }
}

function getMoveAdv(informationPieceSelect){
    if(informationPieceSelect===false){
        console.log("alerta e novo jogo")
    }
    else{
        const nextPlayer=playerConfig.colorMultiPlayer
        const isMove = movePiece(informationPieceSelect,nextPlayer)
        if(isMove){
            // network.sendSever.recMoveGame("true")
        }
        else{
            // enviar caso tiver movimento invalido
            // network.sendSever.recMoveGame("false")
        }
    }
}

function movePiece(informationPieceSelect,colorPlayer,isPlayable){
    let isMove = false
    if(informationPieceSelect.specialMovement){
        isMove=game.informSpecialMovement(informationPieceSelect)
    }
    else{
        isMove=game.informMove(informationPieceSelect) 
    }  
    const chessBoard=game.getCurrentBoard()
    const statusGame = game.getStatusGame() 
    const capturedPieces = game.getCapturedPieces()
    const playHistory = game.getHistoryMoves()
    if(statusGame.endGame){
        isPlayable=false
    }
    updateBoard(colorPlayer,chessBoard,isPlayable) 
    updateInformationGame(colorPlayer,statusGame)
    updateCapturedPiece(playerConfig.top,capturedPieces)
    updatePlaysHistory(playHistory)   
    return isMove
}

function updateBoard(colorPlayer,board,isPlayable=true){
    viewController.updateBoard(board,colorPlayer,isPlayable) 
}

function updateInformationGame(colorPlayer,statusGame){  
    viewController.updateStatusGame(statusGame,colorPlayer)
    if(statusGame.endGame===true && statusGame.checkMate===false){
        const status ={
            endGame:statusGame.endGame,
            playerConfigWin:statusGame.playerConfigWin
        }
        viewController.endGame(status,colorPlayer)
    } 
}

function updateCapturedPiece(colorTop,capturedPieces){
    viewController.updateCapturedPieces(colorTop,capturedPieces)
}

function updatePlaysHistory(history){
    viewController.updateHistory(history)
}

function backPreviousMove(){
    const playHistory = game.getHistoryMoves()
    if(playHistory.length>0){
        game.returnMovement()
        const pastColor=(playerConfig.top===playerConfig.currentPlayer)?playerConfig.bottom:playerConfig.top
        const chessBoard=game.getCurrentBoard()
        const statusGame = game.getStatusGame() 
        const capturedPieces = game.getCapturedPieces()
        const playHistory = game.getHistoryMoves()
        if(statusGame.endGame===false){
            updateBoard(pastColor,chessBoard)        
            updateInformationGame(pastColor,statusGame)
            updateCapturedPiece(playerConfig.top,capturedPieces)        
            updatePlaysHistory(playHistory)   
            playerConfig.currentPlayer=pastColor
        }
    }
}
