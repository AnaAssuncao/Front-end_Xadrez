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

    const board={
        update:function(board){
            if(chess.pieceSelect.position){
            view.chessBoard.highlighSquare.clearHighlightSquares(chess.pieceSelect)
            }
            view.chessBoard.renderBoard(board.chessBoard)
            updateInput.allInput(board)
            chess.informationBoard.chessBoard = board.chessBoard
            chess.informationBoard.playerMove = board.playerMove
        },
        clearAllBoard: function(){
            if(chess.pieceSelect.position){
                view.chessBoard.highlighSquare.clearHighlightSquares(chess.pieceSelect)
            }
            chess.pieceSelect={
                position:null
            }  
        }
    }

    const history={
        update:function(history){
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
        },
        previoushistory:function(){
            if(chess.pieceSelect.refId){
                view.chessBoard.highlighSquare.clearHighlightSquares(pieceSelect)
            }
            notifyFunctions (functionToCallBack.underHistory)
        }
    }

    const capturedPieces={
        update:function(capturedPieces,color){
            const top = []
            const bottom=[]
            for(let capturedPiece in capturedPieces){ 
                if(color==capturedPieces[capturedPiece].color){
                    top.push(capturedPieces[capturedPiece].img)
                }
                else{
                    bottom.push(capturedPieces[capturedPiece].img)
                }
            }
            view.capturedPiece.colorTop(top) //renderColorTop nome
            view.capturedPiece.colorBottom(bottom)
        }
    }

    const statusGame={
        update:function(statusGame,color){
            if(statusGame.draw){
                view.informationGame.addinformation("Jogo empatado")
            }
            else if(statusGame.checkMate===true){
                view.informationGame.addinformation(`Xeque-Mate no King ${color} - Vitória das Peças ${statusGame.playerWin}`)
            }
            else if(statusGame.check===true){
                view.informationGame.addinformation(`Xeque no King ${color}`)
            }
            else{
                view.informationGame.clearInformation()
            }
        },
        endGame:function(status){
            if(status.endGame===true){
                view.informationGame.addinformation(`Vitória das Peças ${status.playerWin}`)
            }
            // demonstrar a cor vitoriosa
        },
        startGameOff:function(){
            board.clearAllBoard()
            notifyFunctions(functionToCallBack.startGameOffline)
        },
        startGameOn:function(){
            board.clearAllBoard()
            // input para digitar a chave
            const key = ""
            notifyFunctions (functionToCallBack.startGameOffline,key)
        }
    }

    const pieceSelect={
        selectPieceInput:function({piece,color}){
            const refPiece=`${piece}${color}`
            const refId=utilities.discoverRefId(refPiece)
            pieceSelect.updatePieceSelect(refId)
        },
        updatePieceSelect:function(idSquare){   
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
                const informationMove=movePiece.verifyMove(idSquare)
                if(informationMove.isMove){
                    movePiece.movePiece(idSquare,informationMove)
                    chess.pieceSelect={
                            position:null
                        }  
                    }
                } 
        }
    }

    const movePiece = {
        movePieceByButtom: function(coordinate){
            // Modificando o nome da ref ID pela função coordinateToRefId
            if(coordinate!=="Sem Movimento" && coordinate!==""){
                if(chess.pieceSelect.position){
                    view.chessBoard.highlighSquare.clearHighlightSquares(chess.pieceSelect)
                } 
                const refId = utilities.coordinateToRefId(coordinate)
                const informationMove=movePiece.verifyMove(refId)
                if(informationMove.isMove){
                    movePiece.movePiece(refId,informationMove)
                    chess.pieceSelect={
                        position:null
                    }  
                }
            }
        },
        movePiece: function(idSquare,informationMove,piece=null){
            if(piece){
                piece= piece.replace("img/","")
            }
            const informationPieceSelect={
                fullName:  informationMove.namePiece,
                typeMovement: informationMove.type,
                specialMovement:informationMove.specialMovement,
                refId:idSquare,
                piecePromotion:piece
            }   
            notifyFunctions(functionToCallBack.movePiece,informationPieceSelect)
        },
        verifyMove: function(idSquare){
            const informationMove={
                namePiece:null,
                isMove: false,
                type:null,
                specialMovement:false,
            } 
            if(chess.pieceSelect.refMovements.includes(idSquare)){
                informationMove.namePiece= chess.pieceSelect.fullName
                informationMove.isMove=true
                const specialMovement = movePiece.verifySpecialMovement(idSquare)
                if(specialMovement.isMovement){
                    informationMove.specialMovement = specialMovement.isMovement
                    informationMove.type= specialMovement.type
                }
                else{
                    informationMove.type= "movementPiece"
                }
                if(specialMovement.piecePromotion){
                    informationMove.isMove=false
                }
            }
            return informationMove
        },
        verifySpecialMovement: function(idSquare){
           const specialMovement = {
                isMovement: false,
                type: null,
                piecePromotion: false
            }
            chess.pieceSelect.possibleSpecialMovements.forEach((movements)=>{
                if(movements.type!=="movementPiece"){
                    specialMovement.isMovement = true
                    specialMovement.type=movements.type
                    if(movements.type==="piecePromotion"){
                        specialMovement.piecePromotion=utilities.piecePromotion(idSquare,movements.type)
                    }
                }
            })   
            return specialMovement
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

    this.subscribeStartOffline=function(fn){
        functionToCallBack.startGameOffline.push(fn)   
    }
    this.subscribeStartOnline=function(fn){
        functionToCallBack.startGameOnline.push(fn)
    }
    this.subscribeMovePiece=function(fn){
        functionToCallBack.movePiece.push(fn)
    }
    this.subscribeHistory=function(fn){
        functionToCallBack.underHistory.push(fn)
    }
    this.subscribeGiveUp=function(fn){
        functionToCallBack.giveUp.push(fn)
    }

    view.buttomStart.subscribeToClick(statusGame.startGameOff)
    view.pieceInput.subscribeToChange(pieceSelect.selectPieceInput)
    view.buttomMove.subscribeToClick(movePiece.movePieceByButtom)
    view.chessBoard.subscribeToClick(pieceSelect.updatePieceSelect)
    view.buttomBackMovement.subscribeToClick(history.previoushistory)
    view.piecesPromotion.subscribeToClick(changePiecePromotion)

    this.updateBoard=function(chessboard){
        board.update(chessboard)
    }

    this.updateHistory=function(historys){
        history.update(historys)
    }

    this.updateCapturedPieces=function(color,captured){
        capturedPieces.update(captured,color)
    }

    this.updateStatusGame=function(status,color){
        statusGame.update(status,color)
    }

    this.updateStatusConection=function(statusConection){
        // enviar para view renderizar o status do jogo
    }

    this.endGame=function(status){
        statusGame.endGame(status)
    }

    function changePiecePromotion(pieceSelect){
        view.piecesPromotion.clearPiecePromotion()
        const informationMove={
            namePiece:chess.pieceSelect.fullName,
            isMove: true,
            type:"piecePromotion",
            specialMovement:true
        } 
        movePiece.movePiece(chess.pieceSelect.newMovements,informationMove,pieceSelect)
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
        piecePromotion: function(idSquare,typeMovement){
            let piecePromotion = false
            const imgPiecePromotion={
                Black:["img/towerBlack","img/knightBlack","img/bishopBlack","img/queenBlack"],
                White:["img/towerWhite","img/knightWhite","img/bishopWhite","img/queenWhite"]
            }
            if(typeMovement==="piecePromotion"){
                chess.pieceSelect.newMovements=idSquare
                const imgPromotion=imgPiecePromotion[chess.pieceSelect.color]
                view.piecesPromotion.renderPiecePromotion(imgPromotion)
                piecePromotion = true
            }
            return piecePromotion 
        }    
    }
}

