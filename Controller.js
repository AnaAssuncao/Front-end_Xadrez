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
    render.renderBoard(game.chessBoard)
    colorToPlay()
}

function colorToPlay (){
    // limpar tabuleiro e input
    render.colorInput.clearAll()
    // iniciar ou reiniciar tabuleiro e input
    render.colorInput.addPiecesColor(game.pieceSelect.color) 
    const arrayPieces = updatePieceInput ()
    updateInputCoordinate(arrayPieces[0])
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
    if(game.pieceSelect.refPiece){render.highlightedMovement.clearAll(game.pieceSelect)}
    
    game.movimentsPiece(`${piece}${game.pieceSelect.color}`)
    // renderizar novas coordenadas e destaque dos movimentos
    const arrayCoordinates = coordinateSelection(game.pieceSelect.refMoviments)
    render.coordinateInput.addPiecesCoordinates(arrayCoordinates)
    render.highlightedMovement.renderhighlightedMovement(game.pieceSelect)
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
        render.highlightedMovement.clearAll(game.pieceSelect)//limpar destaque movimentos
        const refId = coordinateToRefId(coordinate)
        game.movimentsModification(refId)
        render.renderBoard(game.chessBoard)
        colorToPlay()
    }   
}

function updateClickChessBoard (idSquare){
    render.highlightedMovement.clearAll(game.pieceSelect)//limpar destaque movimentos
    game.movimentsModification(idSquare) 

    if(game.pieceSelect.refPiece){
        render.highlightedMovement.renderhighlightedMovement(game.pieceSelect)
        render.pieceInput.renderNamePieceSelect(game.pieceSelect.namePiece)
        render.coordinateInput.clearAll()
        const arrayCoordinates = coordinateSelection(game.pieceSelect.refMoviments)
        render.coordinateInput.addPiecesCoordinates(arrayCoordinates)
    }
    else{
        render.renderBoard(game.chessBoard)
        colorToPlay()
    }
}
