import viewScreen from "./ViewScreen.js"

export default function viewController(startBoard){
    const view = new viewScreen(startBoard)
    const chess= {
        pieceSelect:{
            position:null
        },
        informationBoard:{
            chessBoard:null,
            playerMove:null,
            imgPiecePromotion:null
        }
    }
    const updateInput ={
        allInput:(board)=>{
            updateInput.inputColor(board)
            updateInput.inputPieces(board)
            updateInput.inputCoordinate(board)
        },
        inputColor: (board) => {
            // limpar tabuleiro e input
            view.colorInput.clearAll()
            // iniciar ou reiniciar tabuleiro e input
            view.colorInput.addPiecesColor([board.playerMove])  
        },
        inputPieces: (board) =>{
            view.pieceInput.clearAll()
            const arrayPieces = []
            for(let refId in board.chessBoard){ 
                if(board.chessBoard[refId]!==null){
                    if(board.chessBoard[refId].color==board.playerMove && board.chessBoard[refId].isAtive==true){
                        arrayPieces.push(board.chessBoard[refId].name)
                    }
                }
            }
            arrayPieces.sort()
            view.pieceInput.addPiecesName(arrayPieces)
            view.pieceInput.selectNamePiece("")
        },
        inputCoordinate: (board)=>{
            // Limpar coordenadas e destaque dos movimentos com a mudança de peça
            view.coordinateInput.clearAll()
            // renderizar novas coordenadas e destaque dos movimentos
            if(chess.pieceSelect.position){
                const arrayCoordinates = utilities.coordinateSelection(chess.pieceSelect.refMovements)
                view.coordinateInput.addPiecesCoordinates(arrayCoordinates)
            }
            view.coordinateInput.selectNamePiece("")
        }
    }

    const functionToCallBack= {
        movePiece:[],
        startGameOffline:[],
        startGameOnline:[],
        underHistory:[],
        giveUp:[],
    }

    function notifyFunctions (objToCallBack,parameters){
        objToCallBack.forEach((fn)=>fn(parameters))
    }

    this.startGameOffline={
        subscribe(fn){
            functionToCallBack.startGameOffline.push(fn)
        },
        startGame(){
            utilities.clearAllBoard()
            notifyFunctions(functionToCallBack.startGameOffline)
        }
    }
    this.startGameOnline={
        subscribe(fn){
            functionToCallBack.startGameOnline.push(fn)
        },
        startGame(){
            utilities.clearAllBoard()
            // input para digitar a chave
            const key = ""
            notifyFunctions (functionToCallBack.startGameOffline,key)
        }
    }
    this.movePiece={
        subscribe(fn){
            functionToCallBack.movePiece.push(fn)
        }
    }
    this.subscribeHistory=function(fn){
        this.underHistory.subscribe(fn)
    }
    this.underHistory={
        subscribe(fn){
            functionToCallBack.underHistory.push(fn)
        },
        previoushistory(){
            if(chess.pieceSelect.refId){
                view.chessBoard.highlighSquare.clearHighlightSquares(pieceSelect)
            }
            notifyFunctions (functionToCallBack.underHistory)
        }
    }
    this.giveUp={
        subscribe(fn){
            functionToCallBack.giveUp.push(fn)
        }
    }

    view.buttomStart.subscribeToClick(this.startGameOffline.startGame)
    view.pieceInput.subscribeToChange(selectPieceInput)
    view.buttomMove.subscribeToClick(movePieceByButtom)
    view.chessBoard.subscribeToClick(updatePieceSelect)
    view.buttomBackMovement.subscribeToClick(this.underHistory.previoushistory)
    view.piecesPromotion.subscribeToClick(changePiecePromotion)

    this.updateBoard=function(board){
        if(chess.pieceSelect.position){
            view.chessBoard.highlighSquare.clearHighlightSquares(chess.pieceSelect)
        }
        view.chessBoard.renderBoard(board.chessBoard)
        updateInput.allInput(board)
        chess.informationBoard.chessBoard = board.chessBoard
        chess.informationBoard.playerMove = board.playerMove
        chess.informationBoard.imgPiecePromotion=board.imgPiecePromotion
    }

    this.updateHistory=function(history){
        view.playHitory.clearPlays()
        for(let indPlay in history){
            const number = Number(indPlay)+1
            view.playHitory.addPlay(number) 
            history[indPlay].piecesPlayed.forEach((piece,ind)=>{
                view.playHitory.addImgPiece(piece.img,number)
                view.playHitory.addRefId(utilities.refIdToCoordinate(piece.position),number,"last")
                view.playHitory.addRefId(utilities.refIdToCoordinate(history[indPlay].newRefId[ind]),number,"new")
                const imgPieceCaptured = (history[indPlay].pieceCaptured && ind!==1)?history[indPlay].pieceCaptured.img:null
                view.playHitory.addPieceCaptured(imgPieceCaptured,number)
            })
        }
    }

    this.updateCapturedPieces=function(color,capturePieces){
        const top = []
        const bottom=[]
        for(let capturePiece in capturePieces){ 
            if(color==capturePieces[capturePiece].color){
                top.push(capturePieces[capturePiece].img)
            }
            else{
                bottom.push(capturePieces[capturePiece].img)
            }
        }
        view.capturePiece.colorTop(top) //renderColorTop nome
        view.capturePiece.colorBottom(bottom)
    }

    this.updateStatusGame=function(statusGame,color){
        if(statusGame.drawn){
            view.informationGame.addinformation("Jogo empatado")
        }
        else if(statusGame.checkMate===true){
            view.informationGame.addinformation(`Xeque-Mate no King ${statusGame.colorCheck} - Vitória das Peças ${statusGame.playerWin}`)
        }
        else if(statusGame.check===true){
            view.informationGame.addinformation(`Xeque no King ${statusGame.colorCheck}`)
        }
        else{
            view.informationGame.clearInformation()
        }
    }

    this.updateStatusConection=function(statusConection){
        // enviar para view renderizar o status do jogo
    }

    this.endGame=function(statusGame){
        if(statusGame.endGame===true){
            view.informationGame.addinformation(`Vitória das Peças ${statusGame.playerWin}`)
        }
        // demonstrar a cor vitoriosa
    }

    function selectPieceInput({piece,color}){
        const refPiece=`${piece}${color}`
        const refId=utilities.discoverRefId(refPiece)
        updatePieceSelect(refId)
    }
    
    function movePieceByButtom(coordinate){
        // Modificando o nome da ref ID pela função coordinateToRefId
        if(coordinate!=="Sem Movimento" && coordinate!==""){
            if(chess.pieceSelect.position){
                view.chessBoard.highlighSquare.clearHighlightSquares(chess.pieceSelect)
            } 
            const refId = utilities.coordinateToRefId(coordinate)
            const isMove=utilities.verifyMove(refId)
            chess.pieceSelect={
                    position:null
                }  
            }
        }   

    function updatePieceSelect(idSquare){   
        if(chess.pieceSelect.position){
            view.chessBoard.highlighSquare.clearHighlightSquares(chess.pieceSelect)
        } 
        if((chess.pieceSelect.position!==idSquare) && (chess.informationBoard.chessBoard[idSquare]!==null) && chess.informationBoard.playerMove===chess.informationBoard.chessBoard[idSquare].color)
        {
            chess.pieceSelect=chess.informationBoard.chessBoard[idSquare]
            view.chessBoard.highlighSquare.addHighlightSquares(chess.pieceSelect)
            view.pieceInput.selectNamePiece(chess.pieceSelect.name)
            updateInput.inputCoordinate()
        }
        else if(chess.pieceSelect.position===idSquare){
            chess.pieceSelect={
                position:null
            }  
        }
        else if(chess.pieceSelect.position){
            if(chess.pieceSelect.refMovements.includes(idSquare)){
                const isMove = utilities.verifyMove(idSquare) 
                if(isMove){
                    chess.pieceSelect={
                        position:null
                    }  
                }
            }
        }
    }

    function changePiecePromotion(imgPieceSelect){
        view.piecesPromotion.clearPiecePromotion()
        movePiece(chess.pieceSelect.newMovements,imgPieceSelect)
    }

    function movePiece(idSquare,piece=null){
        if(piece){
            piece= piece.replace("img/","")
        }
        const informationPieceSelect={
            fullName:  chess.pieceSelect.fullName,
            refId:idSquare,
            piecePromotion:piece
        }   
        notifyFunctions(functionToCallBack.movePiece,informationPieceSelect)
    }
    
    const utilities ={
        refIdToCoordinate: function (coordenadasClass){
            let result = coordenadasClass.substring(3)
            //Edita as coordenadas para renderização, trocando o número pela letra usando .charCodeAt
            result = (String.fromCharCode(result.charCodeAt(0)+16))+result.charAt(1)
            return result
            // const conversao = [["1","A"],["2","B"],["3","C"],["4","D"],["5","E"],["6","F"],["7","G"],["8","H"]]
        },
        coordinateToRefId: function (coordenadasClass){
            //Edita as coordenadas para renderização, trocando a letra pelo numero usando .charCodeAt
           let result = "ref"+(String.fromCharCode(coordenadasClass.charCodeAt(0)-16))+coordenadasClass.charAt(1)
            return result
        }
        ,
        coordinateSelection (positions){
            const arrayCoordinates = []
            if(positions.length==0){
                arrayCoordinates.push("Sem Movimento")
            }
            else{
                positions.forEach((possibleCoordinate)=>{ 
                    arrayCoordinates.push(utilities.refIdToCoordinate(possibleCoordinate))
                })
                positions.sort()
            }  
            return arrayCoordinates
        },
        clearAllBoard: function(){
            if(chess.pieceSelect.position){
                view.chessBoard.highlighSquare.clearHighlightSquares(chess.pieceSelect)
            }
            chess.pieceSelect={
                position:null
            }  
        },
        discoverRefId: function(fullNamePiece){
            let position = null
            for(let refId in chess.informationBoard.chessBoard){
                if(chess.informationBoard.chessBoard[refId]!==null){
                    if(chess.informationBoard.chessBoard[refId].fullName===fullNamePiece){
                        position = refId
                        break
                    }
                }
            }
            return position
        },
        verifyMove(idSquare){
            const specialMovement = utilities.verifyPiecePromotion(idSquare)
            let isMove = false
            if(!specialMovement){
                movePiece(idSquare)
                isMove = true
            }
            return isMove
        },
        verifyPiecePromotion: function(idSquare){
            let specialMovement = false
            chess.pieceSelect.possibleSpecialMovements.forEach((specialMovements)=>{
                if(specialMovements.type==="piecePromotion"){
                    chess.pieceSelect.newMovements=idSquare
                    const imgPromotion=chess.informationBoard.imgPiecePromotion.map((nameImg)=>{
                        return `img/${nameImg}`
                    })
                    view.piecesPromotion.renderPiecePromotion(imgPromotion)
                    specialMovement = true
                }
            })
            return specialMovement 
        }    
    }
}

