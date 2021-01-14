import createGame from "./XadrezGame.js"
import viewScreen from "./ViewScreen.js"

const game = new createGame()
const view = new viewScreen(game.chessBoard) //mudar p view

view.buttomStart.subscribeFunction(notifyStarGame)
view.pieceInput.subscribeFunction(notifyPieceInput)
view.buttomMove.subscribeFunction(notifybuttomMove)
view.chessBoard.subscribeFunction(notifyclickChessBoard)

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
    view.chessBoard.renderBoard(game.chessBoard)
    colorToPlay()
}

function colorToPlay (){
    // limpar tabuleiro e input
    view.colorInput.clearAll()
    // iniciar ou reiniciar tabuleiro e input
    view.colorInput.addPiecesColor([game.pieceSelect.color]) 
    const arrayPieces = updatePieceInput ()
    view.pieceInput.selectNamePiece("")
    view.coordinateInput.clearAll()
}

function updatePieceInput (){
    view.pieceInput.clearAll()
    const arrayPieces = []
    for(let piece in game.piecesBoard){ 
        if(game.piecesBoard[piece].color==game.pieceSelect.color && game.piecesBoard[piece].isAtive==true){
            arrayPieces.push(game.piecesBoard[piece].name)
        }
    }
    view.pieceInput.addPiecesName(arrayPieces)
    return arrayPieces
}

function updateInputCoordinate(piece){
    // Limpar coordenadas e destaque dos movimentos com a mudança de peça
    view.coordinateInput.clearAll()
    if(game.pieceSelect.refPiece){
        view.chessBoard.highlighSquare.clearHighlightSquares(game.pieceSelect)
    }
    const refPiece=`${piece}${game.pieceSelect.color}`
    game.movimentsPiece(refPiece)
    // renderizar novas coordenadas e destaque dos movimentos
    const arrayCoordinates = coordinateSelection(game.pieceSelect.refMoviments)
    view.coordinateInput.addPiecesCoordinates(arrayCoordinates)
    view.coordinateInput.selectNamePiece("")
    view.chessBoard.highlighSquare.addHighlightSquares(game.pieceSelect)
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
    if(coordinate!=="Sem Movimento" && coordinate!==""){
        view.chessBoard.highlighSquare.clearHighlightSquares(game.pieceSelect)//limpar destaque movimentos
        const refId = coordinateToRefId(coordinate)
        game.movimentsModification(refId)
        view.chessBoard.renderBoard(game.chessBoard)
        colorToPlay()
    }   
}

function updateClickChessBoard (idSquare){
    if(game.pieceSelect.refPiece){
        view.chessBoard.highlighSquare.clearHighlightSquares(game.pieceSelect)
    }  //limpar destaque movimentos da peça anterior
    game.movimentsModification(idSquare) 
    if(game.pieceSelect.refPiece){
        view.chessBoard.highlighSquare.addHighlightSquares(game.pieceSelect)
        view.pieceInput.selectNamePiece(game.pieceSelect.namePiece)
        view.coordinateInput.clearAll()
        const arrayCoordinates = coordinateSelection(game.pieceSelect.refMoviments)
        view.coordinateInput.addPiecesCoordinates(arrayCoordinates)
        view.coordinateInput.selectNamePiece("")  
    }
    else{
        view.chessBoard.renderBoard(game.chessBoard)
        colorToPlay()
    }
}
