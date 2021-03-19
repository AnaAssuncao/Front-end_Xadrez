import viewScreen from "./ViewScreen.js"

export default function viewController(startBoard){
    const view = new viewScreen(startBoard)
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
    const updateInput ={
        allInput:(chessBoard,currentPlayer)=>{
            updateInput.inputColor(currentPlayer)
            updateInput.inputPieces(chessBoard,currentPlayer)
            updateInput.inputCoordinate()
        },
        inputColor: (color) => {
            // limpar tabuleiro e input
            view.colorInput.clearAll()
            // iniciar ou reiniciar tabuleiro e input
            view.colorInput.addPiecesColor([color])  
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

    const board={
        update:function(chessBoard,currentPlayer,isPlayable){
            if(chess.pieceSelect.position){
                view.chessBoard.highlighSquare.clearHighlightSquares(chess.pieceSelect)
            }
            view.chessBoard.renderBoard(chessBoard)
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
        colors:{
            White:"Brancas",
            Black:"Pretas"
        },
        updateCheck:function(statusCheck,color){
            if(statusCheck==="checkMate"){
                view.informationGame.addinformation("Xeque-Mate nas Peças " + this.colors[color])
            }
            else if(statusCheck==="check"){
                view.informationGame.addinformation("Xeque nas Peças " + this.colors[color])
            }
            else{
                view.informationGame.clearInformation()
            }
        },
        startGameOfflineGame:function(){
            board.clearAllBoard()
            notifyFunctions(functionToCallBack.startGameOfflineGame)
        },
        startGameOnlineGame:function(infGame){
            board.clearAllBoard()
            notifyFunctions (functionToCallBack.startGameOnlineGame,infGame)
        },
        restartGame(){
            notifyFunctions (functionToCallBack.restartGame)
        },
        updateConnection(connection,complementMsg=""){
            const msgs={
                place:"Jogo Local",
                wait:"Aguardando adversário",
                connected:"conectado com "
            }
            const img = connection.type
            const msgConnection = msgs[connection.msg] + complementMsg
            view.informationGame.updateInformation(img,msgConnection)
        }
    }

    const endGameinformation={
        colors:{
            White:"Brancas",
            Black:"Pretas"
        },
        addModal(typeInformation,complementColor="",complementoName=null){
            if(complementColor==="Black"||complementColor==="White"){
                complementColor= this.colors[complementColor]
            }
            const informations={
                winPiece:"Vitória das Peças ",
                player:" Jogador ",
                draw:"Jogo empatado",
                noConnection:"Sem conexão",
                noAdv:"Sem adversario",
                giveUp:"Desistência das Peças "
            }
            let msg = informations[typeInformation]+complementColor
            if(complementoName){
                msg = msg + informations.player + complementoName
            }
            view.modalOnBoard.renderModal(msg)
        },
        clearModal(){   
            view.modalOnBoard.clearModal()
        }
    }

    const informationDetails={
        updateLog(text){
            view.informationDetails.updateLog(text)
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
        selectPieceInput:function({namePiece,color}){
            const refPiece=`${namePiece}${color}`
            const refId=utilities.discoverRefId(refPiece)
            piece.updatePieceSelect(refId)
        },
        movePieceByButtom: function(coordinate){
            // Modificando o nome da ref ID pela função coordinateToRefId
            if(chess.informationBoard.currentPlayer===chess.pieceSelect.color){
                if(coordinate!=="Sem Movimento" && coordinate!=="" && chess.pieceSelect.position){
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
            if(piece){
                piece= piece.replace("img/","")
            }
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
                isMove: true,
                type:"piecePromotion",
                specialMovement:true
            } 
            piece.movePiece(chess.pieceSelect.newMovements,informationMove,piecePromotion)
        }
    }

    const homePage = {
        addModal(){
            view.homePage.render()
        },
        clearModal(){
            view.homePage.clear()
        }
    }

    const gameAlerts={
        informationAlert(text){
            const msgAlert={
                codeExist: "Neste código já está acontecendo um jogo, tente outro código",
                errServe: "Erro no servidor, tente mais tarde"
            }
            view.alerts.alertInformation(msgAlert[text])
        }
    }      

    const functionToCallBack= {
        movePiece:[],
        startGameOfflineGame:[],
        startGameOnlineGame:[],
        underHistory:[],
        giveUp:[],
        restartGame:[]
    }

    function notifyFunctions (objToCallBack,parameters){
        objToCallBack.forEach((fn)=>fn(parameters))
    }
   
    this.subscribeStartOfflineGame=function(fn){
        functionToCallBack.startGameOfflineGame.push(fn)   
    }
    this.subscribeStartOnlineGame=function(fn){
        functionToCallBack.startGameOnlineGame.push(fn)
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

    view.buttonStartOfflineGame.subscribeToClick(statusGame.startGameOfflineGame)
    view.buttonStartOnlineGame.subscribeToClick(statusGame.startGameOnlineGame)
    view.pieceInput.subscribeToChange(piece.selectPieceInput)
    view.buttonMove.subscribeToClick(piece.movePieceByButtom)
    view.chessBoard.subscribeToClick(piece.updatePieceSelect)
    view.buttonBackMovement.subscribeToClick(history.previoushistory)
    view.piecesPromotion.subscribeToClick(piece.changePiecePromotion)
    view.buttonNewGame.subscribeToClick(statusGame.restartGame)

    this.hideHomePage=function(){
        homePage.clearModal()
    }

    this.exposeHomePage=function(){
        homePage.addModal()
    }

    this.exposeBackMovement=function(){
        history.addButtonBackMovement()
    }
    
    this.hideBackMovement=function(){
        history.clearButtonBackMovement()
    }
    this.updateBoard=function(chessBoard,currentPlayer,isPlayable){
        board.update(chessBoard,currentPlayer,isPlayable)
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

    this.updateStatusConection=function(connection,complementMsg){
        statusGame.updateConnection(connection,complementMsg)
    }

    this.endGame=function(status){
        statusGame.endGame(status)
    }

    this.exposeEndGameInformation=function(information,complementColor,complementoName){
        endGameinformation.addModal(information,complementColor,complementoName)
    }

    this.hideEndGameInformation=function(information){
        endGameinformation.clearModal(information)
    }

    this.informationLog=function(text){
        informationDetails.updateLog(text)
    }

    this.informationProminent=function(text){
        gameAlerts.informationAlert(text)
    }

    this.hideSubscribes=function(){
        utilities.clearFunctionToCallBack()
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
        },
        clearFunctionToCallBack: function(){
            functionToCallBack.movePiece=[]
            functionToCallBack.restartGame=[]
            functionToCallBack.backPreviousMove=[]
        }
    }
}

