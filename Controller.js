import createGame from "./XadrezGame.js"
import viewScreen from "./ViewScreen.js"

const game = new createGame()
const render = new viewScreen(game.chessBoard) //mudar p view

render.buttomStart.subscribeFunction(notifyStarGame)
render.pieceInput.subscribeFunction(notifyPieceInput)
render.buttomMove.subscribeFunction(notifybuttomMove)
render.chessBoard.subscribeFunction(notifyclickChessBoard)

function notifyStarGame(){
    starGame()
}
function notifyPieceInput(piece){
    updateInputCoordinate(piece)
}
function notifybuttomMove(coordinate){debugger
    requiredPieceMovement(coordinate)
}
function notifyclickChessBoard(idSquare){
    updateClickChessBoard (idSquare)
}

function starGame(){
    game.starObjGame()
    render.chessBoard.renderBoard(game.chessBoard)
    colorToPlay()
}

function colorToPlay (){
    // limpar tabuleiro e input
    render.colorInput.clearAll()
    // iniciar ou reiniciar tabuleiro e input
    render.colorInput.addPiecesColor(game.pieceSelect.color) 
    const arrayPieces = updatePieceInput ()
    render.pieceInput.selectNamePiece("")
    render.coordinateInput.clearAll()
}

function updatePieceInput (){
    render.pieceInput.clearAll()
    const arrayPieces = []
    for(let piece in game.piecesBoard){ 
        if(game.piecesBoard[piece].color==game.pieceSelect.color && game.piecesBoard[piece].isAtive==true){
            arrayPieces.push(game.piecesBoard[piece].name)
        }
    }
    render.pieceInput.addPiecesName(arrayPieces)
    return arrayPieces
}

function updateInputCoordinate(piece){
    // Limpar coordenadas e destaque dos movimentos com a mudança de peça
    render.coordinateInput.clearAll()
    if(game.pieceSelect.refPiece){
        render.chessBoard.highlighSquare.clearHighlightSquares(game.pieceSelect)
    }
    const refPiece=`${piece}${game.pieceSelect.color}`
    game.movimentsPiece(refPiece)
    // renderizar novas coordenadas e destaque dos movimentos
    const arrayCoordinates = coordinateSelection(game.pieceSelect.refMoviments)
    render.coordinateInput.addPiecesCoordinates(arrayCoordinates)
    render.coordinateInput.selectNamePiece("")
    render.chessBoard.highlighSquare.addHighlightSquares(game.pieceSelect)
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
        render.chessBoard.highlighSquare.clearHighlightSquares(game.pieceSelect)//limpar destaque movimentos
        const refId = coordinateToRefId(coordinate)
        game.movimentsModification(refId)
        render.chessBoard.renderBoard(game.chessBoard)
        colorToPlay()
    }   
}

function updateClickChessBoard (idSquare){
    if(game.pieceSelect.refPiece){
        render.chessBoard.highlighSquare.clearHighlightSquares(game.pieceSelect)
    }  //limpar destaque movimentos da peça anterior
    game.movimentsModification(idSquare) 
    if(game.pieceSelect.refPiece){
        render.chessBoard.highlighSquare.addHighlightSquares(game.pieceSelect)
        render.pieceInput.selectNamePiece(game.pieceSelect.namePiece)
        render.coordinateInput.clearAll()
        const arrayCoordinates = coordinateSelection(game.pieceSelect.refMoviments)
        render.coordinateInput.addPiecesCoordinates(arrayCoordinates)
    }
    else{
        render.chessBoard.renderBoard(game.chessBoard)
        colorToPlay()
    }
}
