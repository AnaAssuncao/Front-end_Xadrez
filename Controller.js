import createGame from "./XadrezGame.js"
import viewScreen from "./ViewScreen.js"
let chessBoard = {}
let playHistory = {}
let statusGame = {}
let capturePieces = {}
let specialMovements = {}
const colorInitial = "White"
const game = new createGame(colorInitial)
updateObjs()
const view = new viewScreen(chessBoard) //mudar p view
let numberPlays = 0
const pieceSelect= {
    name:null,
    refId:null,
    refMovements:[],
    color:colorInitial 
}

const colorPieceBoard= game.colorPieceBoard

view.buttomStart.subscribeToClick(starGame)
view.pieceInput.subscribeToChange(updateInputCoordinate)
view.buttomMove.subscribeToClick(requiredPieceMovement)
view.chessBoard.subscribeToClick(updateChessBoard)
view.buttomBackMoviment.subscribeToClick(backPreviousMove)
view.piecesPromotion.subscribeToClick(changePiecePromotion)

function starGame(){
    if(pieceSelect.refId){
        view.chessBoard.highlighSquare.clearHighlightSquares(pieceSelect)
    }
    if(playHistory.length>0){
        view.playHitory.clearPlays()
        numberPlays = 0
    }
    pieceSelect.name=null
    pieceSelect.refId=null           
    pieceSelect.refMovements=[]
    pieceSelect.color=colorInitial
    game.starObjGame()
    view.chessBoard.renderBoard(chessBoard)
    view.capturePiece.colorTop([])
    view.capturePiece.colorBottom([])
    updateInput()
    updateInformationGame() 
    updateObjs()
}

function updateInput (){
    // limpar tabuleiro e input
    view.colorInput.clearAll()
    // iniciar ou reiniciar tabuleiro e input
    view.colorInput.addPiecesColor([pieceSelect.color]) 
    updatePieceInput ()
    view.pieceInput.selectNamePiece("")
    view.coordinateInput.clearAll()
}

function updatePieceInput (){
    view.pieceInput.clearAll()
    const arrayPieces = []
    for(let refId in chessBoard){ 
        if(chessBoard[refId]!==null){
            if(chessBoard[refId].color==pieceSelect.color && chessBoard[refId].isAtive==true){
                arrayPieces.push(chessBoard[refId].name)
            }
        }
    }
    arrayPieces.sort()
    view.pieceInput.addPiecesName(arrayPieces)
    return arrayPieces
}

function updateInputCoordinate(piece){
    // Limpar coordenadas e destaque dos movimentos com a mudança de peça
    view.coordinateInput.clearAll()
    if(pieceSelect.refId){
        view.chessBoard.highlighSquare.clearHighlightSquares(pieceSelect)
    }
    const fullNamePiece=`${piece}${pieceSelect.color}`
    const refId = movementsPiece(fullNamePiece)
    verifyPieceSelect(refId)
    // renderizar novas coordenadas e destaque dos movimentos
    const arrayCoordinates = coordinateSelection(pieceSelect.refMovements)
    view.coordinateInput.addPiecesCoordinates(arrayCoordinates)
    view.coordinateInput.selectNamePiece("")
    view.chessBoard.highlighSquare.addHighlightSquares(pieceSelect)
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
        view.chessBoard.highlighSquare.clearHighlightSquares(pieceSelect)//limpar destaque movimentos
        const refId = coordinateToRefId(coordinate)
        updateChessBoard(refId)
    }   
}

function updateChessBoard(idSquare){
    if(pieceSelect.refId){
        view.chessBoard.highlighSquare.clearHighlightSquares(pieceSelect)
    }  //limpar destaque movimentos da peça anterior
    const movimentValid = verifyPieceSelect(idSquare) 
    if(specialMovements.piecesPromotion.chancePiece){
        const imgPromotion=specialMovements.piecesPromotion[specialMovements.piecesPromotion.color].imgs.map((nameImg)=>{
            return `img/${nameImg}`
        })
            view.piecesPromotion.renderPiecePromotion(imgPromotion)
    }
    else if(pieceSelect.refId){
        view.chessBoard.highlighSquare.addHighlightSquares(pieceSelect)
        view.pieceInput.selectNamePiece(pieceSelect.name)
        view.coordinateInput.clearAll()
        const arrayCoordinates = coordinateSelection(pieceSelect.refMovements)
        view.coordinateInput.addPiecesCoordinates(arrayCoordinates)
        view.coordinateInput.selectNamePiece("")  
    }
    else if(movimentValid){
        view.chessBoard.renderBoard(chessBoard)
        updateObjs()
        updateDeadPiece()
        updateInput()
        updateInformationGame()
        updatePlaysHistory()
    } 
}

function updateDeadPiece(){
    const top=[]
    const bottom=[]
    for(let capturePiece in capturePieces){ 
        if(colorPieceBoard.top==capturePieces[capturePiece].color){
            top.push(capturePieces[capturePiece].img)
        }
        else{
            bottom.push(capturePieces[capturePiece].img)
        }
    }
    view.capturePiece.colorTop(top) //renderColorTop nome
    view.capturePiece.colorBottom(bottom)
}

function updateInformationGame(){
    if(statusGame.drawn){
        view.informationGame.addinformation("Jogo empatado")
    }
    else if(statusGame.checkMate===true){
        view.informationGame.addinformation(`Xeque-Mate no King ${pieceSelect.color} - Vitória das Peças ${statusGame.playerWin}`)
    }
    else if(statusGame.endGame===true){
        view.informationGame.addinformation(`Vitória das Peças ${statusGame.playerWin}`)
    }
    else if(statusGame.check===true){
        view.informationGame.addinformation(`Xeque no King ${pieceSelect.color}`)
    }
    else{
        view.informationGame.clearInformation()
    }
       
}

function backPreviousMove(){
    if(playHistory.length>0){
        if(pieceSelect.refId){
            view.chessBoard.highlighSquare.clearHighlightSquares(pieceSelect)
        }
        view.playHitory.removeLine(playHistory.length)
        game.returnMoviment()
        pieceSelect.color=(colorPieceBoard.top===pieceSelect.color)?colorPieceBoard.bottom:colorPieceBoard.top
        numberPlays--
        view.chessBoard.renderBoard(chessBoard)
        updateObjs()
        updateDeadPiece()
        updateInput()
        updateInformationGame()
    }
}

function changePiecePromotion(imgPieceSelect){
    const namePieceSelect = imgPieceSelect.replace("img/","")
    game.updatePiecePromotion(namePieceSelect)
    view.piecesPromotion.clearPiecePromotion()
    view.chessBoard.renderBoard(chessBoard)
    updateObjs()
    updateDeadPiece()
    updateInput()
    updateInformationGame()
    updatePlaysHistory()
}

function updatePlaysHistory(){
    const number = numberPlays+1
    view.playHitory.addPlay(number) 
    playHistory[numberPlays].piecesPlayed.forEach((piece,ind)=>{
        view.playHitory.addImgPiece(piece.img,number)
        view.playHitory.addRefId(refIdToCoordinate(piece.position),number,"last")
        view.playHitory.addRefId(refIdToCoordinate(playHistory[numberPlays].newRefId[ind]),number,"new")
        const imgPieceCaptured = (playHistory[numberPlays].pieceCaptured && ind!==1)?playHistory[numberPlays].pieceCaptured.img:null
        view.playHitory.addPieceCaptured(imgPieceCaptured,number)
    })
    numberPlays++
}

function verifyPieceSelect(idSquare){
    let movimentValid = false;
    if((pieceSelect.refId!==idSquare) && (chessBoard[idSquare]!==null) && pieceSelect.color===chessBoard[idSquare].color)
    {
        pieceSelect.refId=idSquare
        pieceSelect.name=chessBoard[idSquare].name
        pieceSelect.refMovements =  chessBoard[idSquare].refMovements

    }
    else{
        movimentValid = checkMovements(idSquare)
        if(movimentValid){
            const informationPieceSelect={
                color: chessBoard[pieceSelect.refId].color,
                fullName:  chessBoard[pieceSelect.refId].fullName,
                refId:idSquare
            }   
            game.verifyMove(informationPieceSelect)    
            pieceSelect.color=(colorPieceBoard.top===pieceSelect.color)?colorPieceBoard.bottom:colorPieceBoard.top  
        }
        pieceSelect.name=null
        pieceSelect.refId=null           
        pieceSelect.refMovements=[]
    } 
    return movimentValid
}

function checkMovements(idSquare){
    let movedThePiece =false
    for(let ref of pieceSelect.refMovements){
        if(ref===idSquare){
            movedThePiece=true
            break
        }
    }
    return movedThePiece
}

function movementsPiece (fullNamePiece){
    let position = null
    for(let refId in chessBoard){
        if(chessBoard[refId]!==null){
            if(chessBoard[refId].fullName===fullNamePiece){
                position = refId
                break
            }
        }
    }
    return position
}

function updateObjs(){
    chessBoard = game.getCurrentBoard()
    playHistory = game.getHistoryMoves()
    statusGame = game.getStatusGame()
    capturePieces = game.getCapturedPieces()
    specialMovements = game.getPiecePromotion()
}