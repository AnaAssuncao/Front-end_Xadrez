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
    viewController.addStatusConection(playerConfig.typeGame,"Jogo Local")
    startGame(playerConfig.currentPlayer, playerConfig.top)
    viewController.addButtonBackMovement()
}

async function startMultiPlayer(infGame){
    // infGame = {name:value, roomCode:value}
    viewController.clearButtonBackMovement()
    const infPlayers= await network.send.infStartGame(infGame)
    if(infPlayers){
        viewController.clearModalStartGame()
        playerConfig.typeGame="MultiPlayer"
        if(infPlayers.playerAdv.connection===false){
            viewController.addStatusConection(playerConfig.typeGame,"Jogo Online")
            playerConfig.colorMultiPlayer="White"
            playerConfig.currentPlayer =playerConfig.colorMultiPlayer
            const isPlayable = false
            startGame(playerConfig.currentPlayer, playerConfig.top, isPlayable)
            network.get.playerConnection()
        }
        else{
            viewController.addStatusConection(playerConfig.typeGame,"Jogo Online")
            playerConfig.colorMultiPlayer="Black"
            playerConfig.currentPlayer="White"
            const isPlayable = false
            startGame(playerConfig.currentPlayer, playerConfig.top, isPlayable)
            network.get.moveAdversary()
        }
        network.get.statusGame()
    }
}

async function connectionPlayerTwo(connection){
    if(connection===false){
        console.log("alerta e novo jogo")
    }
    else{
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
            network.send.moveGame(informationPieceSelect)
            network.get.moveAdversary()
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
            // network.send.recMoveGame("true")
        }
        else{
            // enviar caso tiver movimento invalido
            // network.send.recMoveGame("false")
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
    if(statusGame.endGame===true){
        const status ={
            endGame:statusGame.endGame,
            playerConfigWin:statusGame.playerConfigWin
        }
        viewController.endGame(status,colorPlayer)
    }
    viewController.updateStatusGame(statusGame,colorPlayer)
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
        updateBoard(pastColor,chessBoard,pastColor)       
        updateInformationGame(pastColor,statusGame)
        updateCapturedPiece(playerConfig.top,capturedPieces)        
        updatePlaysHistory(playHistory)   
        playerConfig.currentPlayer=pastColor
    }
}
