import createGame from "./XadrezGame.js"
import viewScreen from "./ViewScreen.js"

const render = new viewScreen()
const game = new createGame()

render.buttomStart.subscribeFunction(notifyStarGame)
render.pieceInput.subscribeFunction(notifyPieceInput)
render.buttomMove.subscribeFunction(notifybuttomMove)
render.clickChessBoard.subscribeFunction(notifyclickChessBoard)

render.boardCreation(game.chessBoard);

function notifyStarGame(){
    starGame()
}
function notifyPieceInput(piece){
    updateInputCoordinate(piece)
}
function notifybuttomMove(coordinate){
    requiredPieceMovement(coordinate)
}
function notifyclickChessBoard(idSquare){
    updateClickChessBoard (idSquare)
}

function starGame(){
    game.starObjGame()
    render.buttomStart.clearAll(game.pieceSelect)
    render.buttomStart.addPieceColor(game.pieceSelect.color)
    render.renderBoard(game.chessBoard)
    const arrayPieces = selectPieceInput ()
    render.buttomStart.addPiecesName(arrayPieces)
    updateInputCoordinate(arrayPieces[0])
}

function selectPieceInput (){
    const array = []
    for(let piece in game.piecesBoard){ 
        if(game.piecesBoard[piece].color==game.pieceSelect.color && game.piecesBoard[piece].isAtive==true){
            array.push(game.piecesBoard[piece].name)
        }
    }
    return array
}

function updateInputCoordinate(piece){
    render.pieceInput.clearAll(game.pieceSelect)
    game.movimentsPiece(`${piece}${game.pieceSelect.color}`)
    const arrayCoordinates = coordinateSelection(game.pieceSelect.refMoviments)
    render.pieceInput.addPiecesCoordinates(arrayCoordinates)
    render.pieceInput.renderhighlightedMovement(game.pieceSelect)
}   

function coordinateSelection(positions){
    const arrayCoordinates = []
    if(positions.length==0){
        arrayCoordinates.push("Sem Movimento")
    }
    else{
        positions.forEach((possibleCoordinate)=>{ 
            arrayCoordinates.push(refIdToCoordinate(possibleCoordinate))
        })
        positions.sort()
    }  
    return arrayCoordinates
}

function refIdToCoordinate (coordenadasClass){
    let result = coordenadasClass.substring(3)
    //Edita as coordenadas para renderização, trocando o número pela letra usando .charCodeAt
    result = (String.fromCharCode(result.charCodeAt(0)+16))+result.charAt(1)
    return result
    // const conversao = [["1","A"],["2","B"],["3","C"],["4","D"],["5","E"],["6","F"],["7","G"],["8","H"]]
}

function coordinateToRefId (coordenadasClass){
    //Edita as coordenadas para renderização, trocando a letra pelo numero usando .charCodeAt
   let result = "ref"+(String.fromCharCode(coordenadasClass.charCodeAt(0)-16))+coordenadasClass.charAt(1)
    return result
}

function requiredPieceMovement(coordinate){
    // Modificando o nome da ref ID pela função coordinateToRefId
    if(coordinate!=="Sem Movimento"){
        const refId = coordinateToRefId(coordinate)
        render.buttomMove.clearAll(game.pieceSelect)
        game.movimentsModification(refId)
        render.renderBoard(game.chessBoard)
        nextColorToPlay()
    }   
}

function nextColorToPlay (){
    render.nextColorToPlay.clearAll(game.pieceSelect)
    render.nextColorToPlay.addPieceColor(game.pieceSelect.color)
    const arrayPieces = selectPieceInput ()
    render.nextColorToPlay.addPiecesName(arrayPieces)
    updateInputCoordinate(arrayPieces[0])
}

function updateClickChessBoard (idSquare){
    render.clickChessBoard.clearAll(game.pieceSelect)//limpar 
    game.movimentsModification(idSquare) 
    debugger
    if(game.pieceSelect.refPiece){
        render.clickChessBoard.renderhighlightedMovement(game.pieceSelect)
        render.clickChessBoard.renderNamePieceSelect(game.pieceSelect.namePiece)
        const arrayCoordinate = coordinateSelection(game.pieceSelect.refMoviments)
        render.clickChessBoard.addPiecesCoordinates(arrayCoordinate)
    }
    else{
        render.renderBoard(game.chessBoard)
        nextColorToPlay()
    }
}
