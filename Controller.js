import createGame from "./XadrezGame.js"
import viewScreen from "./ViewScreen.js"

const game = new createGame()
const view = new viewScreen(game.chessBoard) //mudar p view

view.buttomStart.subscribeFunction(starGame)
view.pieceInput.subscribeFunction(updateInputCoordinate)
view.buttomMove.subscribeFunction(requiredPieceMovement)
view.chessBoard.subscribeFunction(updateClickChessBoard)
view.buttomBackMoviment.subscribeFunction(backPreviousMove)
view.piecesPromotion.subscribeFunction(changePiecePromotio)

function starGame(){
    if(game.pieceSelect.refId){
        view.chessBoard.highlighSquare.clearHighlightSquares(game.pieceSelect)
    }
    if(game.specialMoviment.pawnPromotion.changePiece){
        view.piecesPromotion.clearPiecePromotion()
    }
    game.starObjGame()
    view.chessBoard.renderBoard(game.chessBoard)
    view.capturePiece.colorTop([])
    view.capturePiece.colorBottom([])
    updateInput()
    updateInformationGame() 
}

function updateInput (){
    // limpar tabuleiro e input
    view.colorInput.clearAll()
    // iniciar ou reiniciar tabuleiro e input
    view.colorInput.addPiecesColor([game.pieceSelect.color]) 
    updatePieceInput ()
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
    if(game.pieceSelect.refId){
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
        game.verifyPieceSelect(refId)
        view.chessBoard.renderBoard(game.chessBoard)
        updateDeadPiece()
        updateInput()
        updateInformationGame()
    }   
}

function updateClickChessBoard (idSquare){
    if(game.pieceSelect.refId){
        view.chessBoard.highlighSquare.clearHighlightSquares(game.pieceSelect)
    }  //limpar destaque movimentos da peça anterior
    game.verifyPieceSelect(idSquare) 
    if(game.specialMoviment.pawnPromotion.chancePiece){
        const imgPromotion=game.specialMoviment.pawnPromotion.piecePromotion[game.specialMoviment.pawnPromotion.color].map((nameImg)=>{
            return `img/${nameImg}`
        })
            view.piecesPromotion.renderPiecePromotion(imgPromotion)
    }
    else{
        if(game.pieceSelect.refId){
            view.chessBoard.highlighSquare.addHighlightSquares(game.pieceSelect)
            view.pieceInput.selectNamePiece(game.pieceSelect.name)
            view.coordinateInput.clearAll()
            const arrayCoordinates = coordinateSelection(game.pieceSelect.refMoviments)
            view.coordinateInput.addPiecesCoordinates(arrayCoordinates)
            view.coordinateInput.selectNamePiece("")  
        }
        else{
            view.chessBoard.renderBoard(game.chessBoard)
            updateDeadPiece()
            updateInput()
            updateInformationGame()
            // olhar se comeu e renderizar
        }
     }
}

function updateDeadPiece(){
    const top=[]
    const bottom=[]
    for(let capturePiece in game.capturePiece){ 
        if(game.colorPieceBoard.top==game.capturePiece[capturePiece].color){
            top.push(game.capturePiece[capturePiece].img)
        }
        else{
            bottom.push(game.capturePiece[capturePiece].img)
        }
    }
    view.capturePiece.colorTop(top) //renderColorTop nome
    view.capturePiece.colorBottom(bottom)
}

function updateInformationGame(){
    if(game.statusCheckKing.checkMate===true){
        view.informationGame.addinformation(`Xeque-Mate no King ${game.pieceSelect.color} - Vitória das Peças ${game.statusCheckKing.winColor}`)
    }
    else if(game.statusCheckKing.endGame===true){
        view.informationGame.addinformation(`Vitória das Peças ${game.statusCheckKing.winColor}`)
    }

    else if(game.statusCheckKing.check===true){
        view.informationGame.addinformation(`Xeque no King ${game.pieceSelect.color}`)
    }
    else{
        view.informationGame.clearInformation()
    }
       
}

function backPreviousMove(){
    if(game.playHistory.length>0){
        if(game.pieceSelect.refId){
            view.chessBoard.highlighSquare.clearHighlightSquares(game.pieceSelect)
        }
        game.returnMoviment()
        view.chessBoard.renderBoard(game.chessBoard)
        updateDeadPiece()
        updateInput()
        updateInformationGame()
    }
}

function changePiecePromotio(imgPieceSelect){
    const namePieceSelect = imgPieceSelect.replace("img/","")
    game.changePiecePromotion(namePieceSelect)
    view.piecesPromotion.clearPiecePromotion()
}