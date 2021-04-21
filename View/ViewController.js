import ViewScreen from "./ViewScreen.js"

export default function ViewController(startBoard){
    const view = new ViewScreen(startBoard)
    const chess= {
        pieceSelect:{
            position:null
        },
        informationBoard:{
            chessBoard:null,
            isPlayable:null,
            currentPlayer:null,
        }
    }
    const imgPiece = (img)=>`Img/${img}.png`
    const updateInput ={
        allInput:(chessBoard,currentPlayer)=>{
            updateInput.inputPieces(chessBoard,currentPlayer)
            updateInput.inputCoordinate()
        },
        inputPieces: (chessBoard,currentPlayer) =>{
            view.pieceInput.clearAll()
            const arrayPieces = []
            for(let refId in chessBoard){ 
                if(chessBoard[refId]!==null){
                    if(chessBoard[refId].color==currentPlayer && chessBoard[refId].isAtive==true){
                        arrayPieces.push(chessBoard[refId].name)
                    }
                }
            }
            arrayPieces.sort()
            view.pieceInput.addPiecesName(arrayPieces)
            view.pieceInput.selectNamePiece("")
        },
        inputCoordinate: ()=>{
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

    const informationColor= (msgColor, currentPlayer) => {
        const color = (currentPlayer==="white")? "White":"Black"
        const imgPiece = `Img/king${color}.png`
        view.colorInformation.updateInformation(msgColor,imgPiece)  
    }

    const board={
        update:function(chessBoard,currentPlayer,isPlayable,msgColor){
            if(chess.pieceSelect.position){
                view.chessBoard.highlighSquare.clearHighlightSquares(chess.pieceSelect)
            }
            view.chessBoard.renderBoard(chessBoard,imgPiece)
            informationColor(msgColor,currentPlayer)
            updateInput.allInput(chessBoard,currentPlayer)
            chess.informationBoard.chessBoard = chessBoard
            chess.informationBoard.currentPlayer = currentPlayer
            chess.informationBoard.isPlayable=isPlayable
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
                    const numberMovement = number + "-" + (ind+1)
                    view.playHitory.addMovement(number,numberMovement)
                    view.playHitory.addImgPiece(imgPiece(piece.imgName),numberMovement)
                    view.playHitory.addRefId(utilities.refIdToCoordinate(piece.position),numberMovement,"last")
                    view.playHitory.addRefId(utilities.refIdToCoordinate(history[indPlay].newRefId[ind]),numberMovement,"new")
                    const imgPieceCaptured = (history[indPlay].pieceCaptured && ind!==1)?imgPiece(history[indPlay].pieceCaptured.imgName):null
                    view.playHitory.addPieceCaptured(imgPieceCaptured,numberMovement)
                })
            }
        },
        previoushistory:function(){
            if(chess.pieceSelect.refId){
                view.chessBoard.highlighSquare.clearHighlightSquares(pieceSelect)
            }
            notifyFunctions (functionToCallBack.underHistory)
        },
        addButtonBackMovement:function(){
            view.buttonBackMovement.renderButton()
        },
        clearButtonBackMovement:function(){
            view.buttonBackMovement.clearButton()
        }
    }

    const capturedPieces={
        update:function(capturedPieces,color){
            const top = []
            const bottom=[]
            for(let capturedPiece in capturedPieces){ 
                if(color==capturedPieces[capturedPiece].color){
                    top.push(imgPiece(capturedPieces[capturedPiece].imgName))
                }
                else{
                    bottom.push(imgPiece(capturedPieces[capturedPiece].imgName))
                }
            }
            view.capturedPiece.colorTop(top) //renderColorTop nome
            view.capturedPiece.colorBottom(bottom)
        }
    }

    const statusGame={
        updateCheck:function(msgCheck){
            if(msgCheck){
                view.informationGame.addinformation(msgCheck)
            }
            else{
                view.informationGame.clearInformation()
            }
        },
        startGameOffline:function(){
            board.clearAllBoard()
            notifyFunctions(functionToCallBack.startGameOffline)
        },
        startNewRoom:function(nickAndCode){
            board.clearAllBoard()
            notifyFunctions (functionToCallBack.startNewRoom,nickAndCode)
        },
        connectInARoom:function(nickAndCode){
            board.clearAllBoard()
            notifyFunctions (functionToCallBack.connectInARoom,nickAndCode)
        },
        restartGame(){
            notifyFunctions (functionToCallBack.restartGame)
        },
        updateConnection(connection){
            const imgs={
                offline:"Img/offlineLogo.svg",
                online:"Img/onlineLogo.svg"
            }
            const img = imgs[connection.typeGame]
            const msgConnection = connection.msg
            view.informationGame.updateInformation(img,msgConnection)
        }
    }

    const endGameInformation={
        addModal(msgsEndGame){
            view.modalOnBoard.renderModal(msgsEndGame)
        },
        clearModal(){   
            view.modalOnBoard.clearModal()
        }
    }

    const statusLog={
        updateMsgsLog(arrayMsgsLogs){
            view.statusLog.clearMsgsLog()
            arrayMsgsLogs.forEach((msgsLogs)=>view.statusLog.addMsgsLog(msgsLogs))
        }
    }

    const piece={
        updatePieceSelect:function(idSquare){   
            if(chess.pieceSelect.position){
                view.chessBoard.highlighSquare.clearHighlightSquares(chess.pieceSelect)
            } 
            if((chess.pieceSelect.position!==idSquare) && (chess.informationBoard.chessBoard[idSquare]!==null) 
            && (chess.informationBoard.isPlayable===true) && (chess.informationBoard.currentPlayer===chess.informationBoard.chessBoard[idSquare].color)) 
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
                const informationMove=piece.verifyMove(idSquare)
                if(informationMove.isMove){
                    piece.movePiece(idSquare,informationMove)
                    chess.pieceSelect={
                            position:null
                        }  
                    }
                } 
        },
        selectPieceInput:function(namePiece){
            const refPiece=`${namePiece}${chess.informationBoard.currentPlayer}`
            const refId=utilities.discoverRefId(refPiece)
            piece.updatePieceSelect(refId)
        },
        movePieceByButtom: function(coordinate){
            // Modificando o nome da ref ID pela função coordinateToRefId
            if(chess.informationBoard.currentPlayer===chess.pieceSelect.color){
                if(coordinate!=="-" && coordinate!=="" && chess.pieceSelect.position){
                    view.chessBoard.highlighSquare.clearHighlightSquares(chess.pieceSelect)
                    const refId = utilities.coordinateToRefId(coordinate)
                    const informationMove=piece.verifyMove(refId)
                    if(informationMove.isMove){
                        piece.movePiece(refId,informationMove)
                        chess.pieceSelect={
                            position:null
                        }  
                    }
                }
            }
        },
        movePiece: function(idSquare,informationMove,piece=null){
            const informationPieceSelect={
                fullName:  informationMove.namePiece,
                typeMovement: informationMove.type,
                specialMovement:informationMove.specialMovement,
                color:informationMove.color,
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
                color:null,
            } 
            if(chess.pieceSelect.position!==null){
                  if(chess.pieceSelect.refMovements.includes(idSquare)){
                    informationMove.namePiece= chess.pieceSelect.fullName
                    informationMove.color= chess.pieceSelect.color
                    informationMove.isMove=true
                    const specialMovement = piece.verifySpecialMovement(idSquare)
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
        },
        changePiecePromotion: function(piecePromotion){
            view.piecesPromotion.clearPiecePromotion()
            const informationMove={
                namePiece:chess.pieceSelect.fullName,
                color:chess.pieceSelect.color,
                isMove: true,
                type:"piecePromotion",
                specialMovement:true
            } 
            piece.movePiece(chess.pieceSelect.newMovements,informationMove,piecePromotion)
        }
    }

    const homeMenu = {
        addModal(){
            view.homeMenu.render()
        },
        clearModal(){
            view.homeMenu.clear()
        }
    }

    const gameAlerts={
        informationAlert(text){
            view.alerts.alertInformation(text)
        } 
    }      

    const banner ={
        addBannerGame(text){
            view.banner.addBannerGame(text)
        } 
    }

    const times={
        updateGameTime(time){
            view.times.updateGameTime(time)
        },
        updateMovementTime(time){
            view.times.updateMovementTime(time)
        },
        clearTimes(){
            const gameTime = "00:00:00"
            view.times.updateGameTime(gameTime)
            const movementTime = "00:05:00"
            view.times.updateMovementTime(movementTime)
        }
        
    }
    const functionToCallBack= {
        movePiece:[],
        startGameOffline:[],
        startNewRoom:[],
        connectInARoom:[],
        underHistory:[],
        giveUp:[],
        restartGame:[]
    }

    function notifyFunctions (objToCallBack,parameters){
        objToCallBack.forEach((fn)=>fn(parameters))
    }
   
    this.subscribeStartGameOffline=function(fn){
        functionToCallBack.startGameOffline.push(fn)   
    }
    this.subscribeStartNewRoomOnline=function(fn){
        functionToCallBack.startNewRoom.push(fn)
    }
    this.subscribeConnectInARoomOnline=function(fn){
        functionToCallBack.connectInARoom.push(fn)
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
    this.subscribeRestartGame=function(fn){
        functionToCallBack.restartGame.push(fn)
    }

    view.buttonStartGameOffline.subscribeToClick(statusGame.startGameOffline)
    view.buttonStartNewRoom.subscribeToClick(statusGame.startNewRoom)
    view.buttonConnectInARoom.subscribeToClick(statusGame.connectInARoom)
    view.pieceInput.subscribeToChange(piece.selectPieceInput)
    view.buttonMove.subscribeToClick(piece.movePieceByButtom)
    view.chessBoard.subscribeToClick(piece.updatePieceSelect)
    view.buttonBackMovement.subscribeToClick(history.previoushistory)
    view.piecesPromotion.subscribeToClick(piece.changePiecePromotion)
    view.buttonExitGame.subscribeToClick(statusGame.restartGame)

    this.hideHomeMenu=function(){
        homeMenu.clearModal()
    }

    this.displayHomeMenu=function(){
        homeMenu.addModal()
    }

    this.displayBackMovement=function(){
        history.addButtonBackMovement()
    }
    
    this.hideBackMovement=function(){
        history.clearButtonBackMovement()
    }

    this.updateBoard=function(chessBoard,currentPlayer,isPlayable,informationColor){
        board.update(chessBoard,currentPlayer,isPlayable,informationColor)
    }

    this.updateHistory=function(historys){
        history.update(historys)
    }

    this.updateCapturedPieces=function(color,captured){
        capturedPieces.update(captured,color)
    }

    this.updateStatusCheck=function(status,color){
        statusGame.updateCheck(status,color)
    }

    this.updateStatusConection=function(connection){
        statusGame.updateConnection(connection)
    }

    this.endGame=function(status){
        statusGame.endGame(status)
    }

    this.displayEndGameInformation=function(information,complementColor,complementoName){
        endGameInformation.addModal(information,complementColor,complementoName)
    }

    this.hideEndGameInformation=function(information){
        endGameInformation.clearModal(information)
    }

    this.informationProminent=function(text){
        gameAlerts.informationAlert(text)
    }

    this.hideSubscribes=function(){
        utilities.clearFunctionToCallBack()
    }

    this.displayGameLog=function(text){
        statusLog.updateMsgsLog(text)
    }

    this.displayBannerGame=function(text){
        banner.addBannerGame(text)
    }

    this.displayUpdateGameTime=function(time){
        times.updateGameTime(time)
    }

    this.displayUpdateMovementTime=function(time){
        times.updateMovementTime(time)
    }

    this.clearTimes=function(){
        times.clearTimes()
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
                arrayCoordinates.push("-")
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
            const namesPiecePromotion={
                black:["towerBlack","knightBlack","bishopBlack","queenBlack"],
                white:["towerWhite","knightWhite","bishopWhite","queenWhite"]
            }
            if(typeMovement==="piecePromotion"){
                chess.pieceSelect.newMovements=idSquare
                const namesPromotion=namesPiecePromotion[chess.pieceSelect.color]
                const imgsPiecesPromotion = namesPromotion.map((img)=>imgPiece(img))
                view.piecesPromotion.renderPiecePromotion(imgsPiecesPromotion,namesPromotion)
                piecePromotion = true
            }
            return piecePromotion 
        },
        clearFunctionToCallBack: function(){
            functionToCallBack.movePiece=[]
            functionToCallBack.restartGame=[]
            functionToCallBack.backPreviousMove=[]
        }
    }
}

