export default class createGame {
    constructor(player){
        this.chessBoard= {
            ref11:null,
            ref12:null,
            ref13:null,
            ref14:null,
            ref15:null,
            ref16:null,
            ref17:null,
            ref18:null,
            ref21:null,
            ref22:null,
            ref23:null,
            ref24:null,
            ref25:null,
            ref26:null,
            ref27:null,
            ref28:null,
            ref31:null,
            ref32:null,
            ref33:null,
            ref34:null,
            ref35:null,
            ref36:null,
            ref37:null,
            ref38:null,
            ref41:null,
            ref42:null,
            ref43:null,
            ref44:null,
            ref45:null,
            ref46:null,
            ref47:null,
            ref48:null,
            ref51:null,
            ref52:null,
            ref53:null,
            ref54:null,
            ref55:null,
            ref56:null,
            ref57:null,
            ref58:null,
            ref61:null,
            ref62:null,
            ref63:null,
            ref64:null,
            ref65:null,
            ref66:null,
            ref67:null,
            ref68:null,
            ref71:null,
            ref72:null,
            ref73:null,
            ref74:null,
            ref75:null,
            ref76:null,
            ref77:null,
            ref78:null,
            ref81:null,
            ref82:null,
            ref83:null,
            ref84:null,
            ref85:null,
            ref86:null,
            ref87:null,
            ref88:null,
        }
    
        //chave Nome+cor - conforme obj chessBoard
        this.piecesBoard= {}
    
        //Cor peças
        this.colorPieceBoard= player

        this.capturePiece={}

        this.statusCheckKing={}

        this.statusDrawn={}

        this.specialMovement={}

        this.piecesPromotion={}
    
        this.starObjGame()
    }

    makePiece (name,fullName,color,img,position,functionPiece,isAtive=true){  
        return {
            __proto__:this,
            name:name,
            fullName:fullName,
            color:color,
            img:`img/${img}`,
            position:position,
            isAtive:isAtive,
            functionPiece:functionPiece,
            qtMovements:0,
            refMovements:[],
            possibleSpecialMovements:[]
        } 
    }  

    starObjGame(){
        const objStarBoard={
            starPiecesBlack:["towerBlack","knightBlack","bishopBlack","queenBlack","kingBlack","bishopBlack","knightBlack","towerBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack"],
            starPiecesWhite:["towerWhite","knightWhite","bishopWhite","queenWhite","kingWhite","bishopWhite","knightWhite","towerWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite"],
            namePiece:["Tower-Left","Knight-Left","Bishop-Left","Queen","King","Bishop-Right","Knight-Right","Tower-Right","Pawn-1","Pawn-2","Pawn-3","Pawn-4","Pawn-5","Pawn-6","Pawn-7","Pawn-8"],
             functionPieces:[this.possibleMovementTower,this.possibleMovementKnight,this.possibleMovementBishop,this.possibleMovementQueen,this.possibleMovementKing, this.possibleMovementBishop,this.possibleMovementKnight, this.possibleMovementTower,
                this.possibleMovementPawn, this.possibleMovementPawn, this.possibleMovementPawn, this.possibleMovementPawn, this.possibleMovementPawn, this.possibleMovementPawn, this.possibleMovementPawn, this.possibleMovementPawn]
        }
        Object.keys(this.chessBoard).forEach((value)=>{this.chessBoard[value]=null})

        for (let i in objStarBoard.starPiecesWhite) {
            const refLine= (parseInt(i/8)+1)
            const refColumn= (i%8+1)
            const keyChess = `ref${refColumn}${refLine}`
            const keyPieces = objStarBoard.namePiece[i] + this.colorPieceBoard.bottom 
            this.piecesBoard[keyPieces]= this.makePiece(objStarBoard.namePiece[i],keyPieces,this.colorPieceBoard.bottom,objStarBoard.starPiecesWhite[i],keyChess,objStarBoard.functionPieces[i])
            this.chessBoard[keyChess]= this.piecesBoard[keyPieces]
        }
        for (let i in objStarBoard.starPiecesBlack) {
            const refColumn= (i%8+1)
            const refLine= (8 - parseInt(i/8))
            const keyChess = `ref${refColumn}${refLine}`
            const keyPieces = objStarBoard.namePiece[i]+this.colorPieceBoard.top
            this.piecesBoard[keyPieces]= this.makePiece(objStarBoard.namePiece[i],keyPieces,this.colorPieceBoard.top,objStarBoard.starPiecesBlack[i],keyChess, objStarBoard.functionPieces[i])
            this.chessBoard[keyChess]= this.piecesBoard[keyPieces]
        }
        
        this.capturePiece={}
        
        this.checkMovementsAllPieces()

        this.statusCheckKing={
            color:null,
            check:false,
            checkMate:false,
            endGame:null,
            winColor:null,
            refIdPathsToCheck: []
        }

        this.playHistory=[]

        this.specialMovement={
            roque:{
                isPossible:false,
                king:null,
                positionKingToRoque:[],
                tower:[],
                newMovementTower:[],
            },
            enPassant:{
                isPossible:false,
                pawnPossibleCapture:null,
                refIdPawn:null,
                pawnInAtack:[]
            },
            pawnPromotion:{
                isPossible:false,
                piecesPawn:[],   
                namesPawn:[],  
            }        
        }  

        this.piecesPromotion={
            chancePiece:false,
            promotedPawn:null,
            color:null,
            Black:{
                qtPiece:[1,1,1,1]},
            White:{
                qtPiece:[1,1,1,1]},
            newPiece:null,
        }

        this.statusDrawn.drawn=false
    }

    possibleMovementTower(chessBoard=this.chessBoard){//fazer isso
        const column=Number(this.position.charAt(3))
        const line=Number(this.position.charAt(4))
        const direction = [[0,1],[0,-1],[1,0],[-1,0]]
        
        const movement= direction.reduce((possibleMovement,direction)=>{
            const newPossibilitiesMovement =  possibleMovement.concat(this.checkRegularMovement(direction, column, line, this.color,8,chessBoard))
            return newPossibilitiesMovement
        },[])
        
        return movement
    }
    possibleMovementKnight(chessBoard=this.chessBoard){
        const column=Number(this.position.charAt(3))
        const line=Number(this.position.charAt(4))
        const direction = [[2,1],[2,-1],[-2,-1],[-2,1],[1,2],[-1,2],[-1,-2],[1,-2]]
    
        const movement= direction.reduce((possibleMovement,direction)=>{
            const newPossibilitiesMovement =  possibleMovement.concat(this.checkRegularMovement(direction, column, line, this.color,1,chessBoard))
            return newPossibilitiesMovement
        },[])

        return movement
    }
    possibleMovementBishop(chessBoard=this.chessBoard){
        const column=Number(this.position.charAt(3))
        const line=Number(this.position.charAt(4))
        const direction=[[1,1],[1,-1],[-1,-1],[-1,1]]
    
        const movement= direction.reduce((possibleMovement,direction)=>{
            const newPossibilitiesMovement =  possibleMovement.concat(this.checkRegularMovement(direction, column, line, this.color,8,chessBoard))
            return newPossibilitiesMovement
        },[])

        return movement
    }
    possibleMovementQueen(chessBoard=this.chessBoard){
        const column=Number(this.position.charAt(3))
        const line=Number(this.position.charAt(4))
        const direction = [[1,1],[1,-1],[-1,-1],[-1,1],[0,1],[0,-1],[1,0],[-1,0]]
        const a = this.chessBoard
        const movement= direction.reduce((possibleMovement,direction)=>{
            const newPossibilitiesMovement =  possibleMovement.concat(this.checkRegularMovement(direction, column, line, this.color,8,chessBoard))
            return newPossibilitiesMovement
        },[])

        return movement
    }
    possibleMovementKing(chessBoard=this.chessBoard){
        const column=Number(this.position.charAt(3))
        const line=Number(this.position.charAt(4))
        const direction = [[1,1],[1,-1],[-1,-1],[-1,1],[0,1],[0,-1],[1,0],[-1,0]]
    
        let movement = direction.reduce((possibleMovement,direction)=>{
            const newPossibilitiesMovement = possibleMovement.concat(this.checkRegularMovement(direction, column, line, this.color,1,chessBoard))
            return newPossibilitiesMovement
        },[])

        return movement
    }

    checkRegularMovement([column,line], columnPosition, linePosition, color, maximumPaces,chessBoard){
        let possibleColumn = columnPosition + column
        let possibleLine = linePosition+ line
        const possibleDirection = []
        for(let limit = 1; possibleColumn>=1 && possibleColumn<=8 && possibleLine>=1 && possibleLine<=8 && limit<=maximumPaces;limit++){
            const position = `ref${possibleColumn}${possibleLine}`
            if(chessBoard[position]==null){
                possibleDirection.push(position)
            }
            else if(chessBoard[position].color!==color){
                possibleDirection.push(position)
                break
            }
            else{
                break
            }
            possibleColumn = possibleColumn+column
            possibleLine= possibleLine+line
        }
        return possibleDirection
    }

    possibleMovementPawn(chessBoard=this.chessBoard){
        const column=Number(this.position.charAt(3))
        const line =Number(this.position.charAt(4))
        const movementPawn = []
        const direction=[(this.color==this.colorPieceBoard.bottom)?1:-1]
    //Peças Pretas aumentam a linha e as Brancas diminuem.
    if((line+Number(direction))>=1 && (line+Number(direction))<=8){
        const possibleMovement=`ref${column}${(line+Number(direction))}`
        if(chessBoard[possibleMovement]===null){
            movementPawn.push(possibleMovement)

            if(this.qtMovements==0){
                const fistMovement=`ref${column}${(line+direction*2)}`
                if(chessBoard[fistMovement]===null){
                    movementPawn.push(fistMovement)
                }
            }
        }    

        const possibleEat=[`ref${column-1}${(line+Number(direction))}`,`ref${column+1}${(line+Number(direction))}`]
        possibleEat.forEach((position)=>{
            if((chessBoard[position]!==null) && (chessBoard[position]!==undefined) && (chessBoard[position].color!==this.color)){
                movementPawn.push(position)
            }
        })   
    }
        return movementPawn
    }

    checkMovementsAllPieces(){
        for(let piece in this.piecesBoard){
            if(this.piecesBoard[piece].isAtive===true)
                {
                    this.piecesBoard[piece].refMovements=this.piecesBoard[piece].functionPiece()
                    this.piecesBoard[piece].possibleSpecialMovements=[]
                }
        }
    }

        // Movimentação peça no tabuleiro  
    informMove(informationPieceSelect){
        const piece = this.piecesBoard[informationPieceSelect.fullName]
        const isMove = piece.refMovements.includes(informationPieceSelect.refId)
        if(isMove){
            this.updateHistory([informationPieceSelect],"movementPiece")
            this.changePiecePosition(informationPieceSelect)
            this.updateStatusGame(piece.color)
        }
        return isMove
    }

    changePiecePosition(informationPiecetoMove){
        const movePiece =this.piecesBoard[informationPiecetoMove.fullName]
        const newRefId = informationPiecetoMove.refId
        if(this.chessBoard[newRefId]!==null){
            this.eatPiece(this.chessBoard[newRefId].fullName)
        }
        this.chessBoard[movePiece.position]=null
        movePiece.position=newRefId
        movePiece.qtMovements++
        this.chessBoard[newRefId]= movePiece
    }

    updateHistory(arrayPiece,typeMovement){
        const movement={
            piecesPlayed:[],
            pieceCaptured:null,
            newRefId:[],
            typeMovement:null
        }
        arrayPiece.forEach(piece=> {
            if(this.piecesBoard[piece.fullName]){
                movement.piecesPlayed.push({__proto__:this,
                    ...this.piecesBoard[piece.fullName]})   
                if(this.chessBoard[piece.refId]!==null){
                    movement.pieceCaptured={__proto__:this,
                        ...this.piecesBoard[this.chessBoard[piece.refId].fullName]}
                }
                if(typeMovement==="enPassant"){
                    movement.pieceCaptured={__proto__:this,
                        ...this.piecesBoard[this.specialMovement.enPassant.pawnPossibleCapture.fullName]}
                }
            }
            else if(typeMovement==="piecePromotion" ){
                movement.piecesPlayed.push({__proto__:this,
                     ...this.piecesPromotion.newPiece})
            }
            movement.newRefId.push(piece.refId)
        })
        movement.typeMovement=typeMovement
     
        this.playHistory.push(movement)
    }

    eatPiece(nameCapturePiece){
        this.piecesBoard[nameCapturePiece].isAtive = false
        this.piecesBoard[nameCapturePiece].refMovements=[]
        this.capturePiece[nameCapturePiece]=this.piecesBoard[nameCapturePiece]
        if(nameCapturePiece==="KingWhite"||nameCapturePiece==="KingBlack"){
            this.statusCheckKing.endGame=true
            this.statusCheckKing.winColor=(this.colorPieceBoard.top===this.colorPieceBoard.play)?this.colorPieceBoard.bottom:this.colorPieceBoard.top 
        }
    }

    informSpecialMovement(informationPieceToMove){
        const piece = this.piecesBoard[informationPieceToMove.fullName]
        if(this.specialMovement.roque.isPossible===true){
            if(informationPieceToMove.fullName===this.specialMovement.roque.king.fullName){
                if(this.specialMovement.roque.positionKingToRoque.includes(informationPieceToMove.refId)){
                    this.movementRoque(informationPieceToMove)
                    this.updateStatusGame(piece.color)
                    return true
                } 
            }
        }
        if(this.specialMovement.enPassant.isPossible===true){
            if(this.specialMovement.enPassant.refIdAtack===informationPieceToMove.refId){
                this.movementEnPassant(informationPieceToMove)
                this.updateStatusGame(piece.color)
                return true
            }
        }
        if(this.specialMovement.pawnPromotion.isPossible===true){
            if(this.specialMovement.pawnPromotion.namesPawn.includes(informationPieceToMove.fullName)){
                this.movementPawnPromotion(informationPieceToMove)
                this.updateStatusGame(piece.color)
                return true
            }
        }
        return false
    }

    updateStatusGame(colorMove){
        this.checkMovementsAllPieces()
        const nextColor=(this.colorPieceBoard.top===colorMove)?this.colorPieceBoard.bottom:this.colorPieceBoard.top
        this.updateStatusCheck(nextColor)
        this.updateSpecialMoves(nextColor)
        this.updateFilterMovement(nextColor)
        this.verifyDrawGame(nextColor)
        this.colorPieceBoard.play=nextColor
    }

    updateSpecialMoves(nextColor){
        this.verifyRoque(nextColor)
        this.verifyEnPassant(nextColor)
        this.verifyPawnPromotion(nextColor)
    }

    updateFilterMovement(color){
        if(this.statusCheckKing.checkMate===false){
            if(this.statusCheckKing.check===true ){
                this.checkAssistance(color)
            }
            else{
                this.assistantKing(color)
                this.assistantPiece(color)
            }
        }
    }

// Check and ChekMate
    updateStatusCheck(color){
        this.statusCheckKing.check=false
        const nameKing =`King${color}` 
        const checks=this.verifyCheck(this.piecesBoard[nameKing].position,color,nameKing)

        if(checks.qt!==0){
            this.statusCheckKing.refIdPathsToCheck = this.pathToCheck(nameKing,checks)
            this.statusCheckKing.check=true
            this.statusCheckKing.checkMate=this.checkMate(nameKing,color,checks)
                if( this.statusCheckKing.checkMate===true){
                    this.statusCheckKing.endGame=true
                    this.statusCheckKing.winColor=(this.colorPieceBoard.top===color)?this.colorPieceBoard.bottom:this.colorPieceBoard.top
                }
        }
    } 
 
    verifyCheck(refIdKing,colorKing){
        let checks = {
            qt:0,
            pieceCheck:null
        }
        for(let piece in this.piecesBoard){
            if((colorKing!==this.piecesBoard[piece].color)&&(this.piecesBoard[piece].isAtive===true)){
                if(this.movementsPieceAdversity(this.piecesBoard[piece].refMovements,refIdKing)){
                    checks.qt++
                    checks.pieceCheck=piece
                }
            }
        }
        return checks
    }

    movementsPieceAdversity(movementsPiece,refIdKing){
        for (let i = 0;i<movementsPiece.length;i++){
            if(movementsPiece[i]===refIdKing){
                return true
            }                    
        } 
        return false
    }

    refIdToArray(refId){
        return [Number(refId.charAt(3)),Number(refId.charAt(4))]
    }

    checkMate(nameKing,colorKing,checks){
        const positionInitialKing = this.piecesBoard[nameKing].position
        for(let i=0;i<this.piecesBoard[nameKing].refMovements.length;i++){
            const refIdInitialKing=this.piecesBoard[nameKing].position
            const newRefIdKing = this.piecesBoard[nameKing].refMovements[i]
            const fakeChessBoard = this.newFakeChessBoard(refIdInitialKing,newRefIdKing) //FALSO CHESSBOARD PARA CONFERÊNCIA DO REI
            if(this.verifyCheckInFakeBoard(fakeChessBoard,newRefIdKing,colorKing) === false){//se na nova refId do rei não tem check, não há checkMate
                return false 
            }
        }

        if(checks.qt===1)
            for(let refId in this.chessBoard){
                if(this.chessBoard[refId]!==null && this.chessBoard[refId].color===colorKing && this.chessBoard[refId].name!=="King")
                {
                    for(let refMovementFriend of this.chessBoard[refId].refMovements){
                        for(let refIdPossiblePath of this.statusCheckKing.refIdPathsToCheck){
                            if(refMovementFriend===refIdPossiblePath){
                                const fakeChessBoard = this.newFakeChessBoard(refId,refMovementFriend)
                                if(this.verifyCheckInFakeBoard(fakeChessBoard,positionInitialKing,colorKing) === false){//se na nova refId do rei não tem check, não há checkMate
                                    return false 
                                }
                            }
                        }
                    }
                }
            }
        return true
    }

    verifyCheckInFakeBoard(fakeChessBoard,newRefIdKing,colorKing){
        for(let refId in fakeChessBoard){
            if(fakeChessBoard[refId]!==null && fakeChessBoard[refId].color!==colorKing && fakeChessBoard[refId].isAtive)
            {
                const refMovements=fakeChessBoard[refId].functionPiece(fakeChessBoard)
                if(this.movementsPieceAdversity(refMovements,newRefIdKing)){//verifica se o refId adversario e igual ao refId do rei
                    //se for verdadeiro o rei esta em check, movimento para morte
                    return true
                }
            }
        }
        return false
    }

    pathToCheck(nameKing,checks){
        const refIdPossiblePaths=[]
        const positionPieceAdversary = this.piecesBoard[checks.pieceCheck].position
        const positionInitialKing = this.piecesBoard[nameKing].position
        let direction = [0,0]

        // descobrir direção
        for(let refMovementKing of this.piecesBoard[nameKing].refMovements){
           for(let refMovementAdversary of this.piecesBoard[checks.pieceCheck].refMovements){
               if(refMovementKing===refMovementAdversary){
                    refIdPossiblePaths.push(refMovementAdversary)
                    const arrayPositionKing=this.refIdToArray(positionInitialKing)
                    const arrayPositionAdversary=this.refIdToArray(refMovementAdversary)
                    direction = [(arrayPositionAdversary[0]-arrayPositionKing[0]),(arrayPositionAdversary[1]-arrayPositionKing[1])]
                    break
                }
           }
        }

        let currentRefid = refIdPossiblePaths[0]
        while(currentRefid){
            const refId = this.refIdToArray(currentRefid)
            const possibleRefid = `ref${refId[0]+direction[0]}${refId[1]+direction[1]}`
            for(let refMovementAdversary of this.piecesBoard[checks.pieceCheck].refMovements){
                if(possibleRefid===refMovementAdversary){
                    refIdPossiblePaths.push(possibleRefid)
                    currentRefid = possibleRefid
                    break
                }
            }
            if(possibleRefid!==currentRefid){
                currentRefid = null
            }         
        }
        refIdPossiblePaths.push(positionPieceAdversary)
        return refIdPossiblePaths
    }

    newFakeChessBoard(pastPositionPiece,newPositionPiece){
        const fakeChessBoard= {...this.chessBoard} 
        const pieceMove = fakeChessBoard[pastPositionPiece]
        fakeChessBoard[newPositionPiece] = pieceMove
        fakeChessBoard[pastPositionPiece]=null
        return fakeChessBoard
    }

    assistantKing(assistantPieceColor){
        const nameKing =`King${assistantPieceColor}` 
        const positionInitialKing = this.piecesBoard[nameKing].position
        this.piecesBoard[nameKing].refMovements=this.piecesBoard[nameKing].refMovements.reduce((possibleMovementKing,refIdKing)=>{
               const fakeChessBoard = this.newFakeChessBoard(positionInitialKing,refIdKing)
               if(this.verifyCheckInFakeBoard(fakeChessBoard,refIdKing,assistantPieceColor) === false){
                    possibleMovementKing.push(refIdKing)
               }
               return possibleMovementKing
        },[])
    }

    checkAssistance(assistantPieceColor){
        const nameKing =`King${assistantPieceColor}`
        this.assistantKing(assistantPieceColor)

        const positionInitialKing = this.piecesBoard[nameKing].position
        const arrayNamesPieces = Object.keys(this.piecesBoard)
        arrayNamesPieces.forEach((namePiece)=>{
            if((assistantPieceColor===this.piecesBoard[namePiece].color)&&(this.piecesBoard[namePiece].isAtive===true)&&(namePiece!==nameKing)){
                this.piecesBoard[namePiece].refMovements=this.piecesBoard[namePiece].refMovements.reduce((possibleMovementPiece,refIdpiece)=>{
                    for(let refIdPossiblePath of this.statusCheckKing.refIdPathsToCheck){
                        if(refIdPossiblePath===refIdpiece){
                            const fakeChessBoard = this.newFakeChessBoard(this.piecesBoard[namePiece].position,refIdpiece)
                            if(this.verifyCheckInFakeBoard(fakeChessBoard,positionInitialKing,assistantPieceColor) === false){//se na nova refId do rei não tem check, não há checkMate
                                possibleMovementPiece.push(refIdpiece)
                            }                
                        }
                    }
                    return possibleMovementPiece
                },[])
            }
        })
    }   

    assistantPiece(assistantPieceColor){
        const nameKing =`King${assistantPieceColor}`
        const positionInitialKing = this.piecesBoard[nameKing].position
        const arrayNamesPieces = Object.keys(this.piecesBoard)
        arrayNamesPieces.forEach((namePiece)=>{
            if((assistantPieceColor===this.piecesBoard[namePiece].color)&&(this.piecesBoard[namePiece].isAtive===true)&&(namePiece!==nameKing)){
                const fakeChessBoard={...this.chessBoard} 
                const positionPiece = this.piecesBoard[namePiece].position
                fakeChessBoard[positionPiece]=null
                if(this.verifyCheckInFakeBoard(fakeChessBoard,positionInitialKing,assistantPieceColor)){//se na nova refId do rei não tem check, não há checkMate
                    this.piecesBoard[namePiece].refMovements=[]
                }  
            }
        }
    )}

    returnMovement(){
        this.returnChangePiece( )
        this.updateStatusGame(this.colorPieceBoard.play)
        this.colorPieceBoard.play=(this.colorPieceBoard.top===this.colorPieceBoard.play)?this.colorPieceBoard.bottom:this.colorPieceBoard.top
    }

    returnChangePiece(){
        const lastMovement= this.playHistory.length-1
        if(lastMovement>=0){
            this.playHistory[lastMovement].piecesPlayed.forEach((piecesPlayed,ind)=>{
                if(this.playHistory[lastMovement].typeMovement==="piecePromotion" && ind===1){
                    const namePiece=piecesPlayed.fullName
                    delete this.piecesBoard[namePiece]
                }
                else{
                    const position = this.playHistory[lastMovement].newRefId[ind]
                    this.chessBoard[position]=null
                    if(this.playHistory[lastMovement].pieceCaptured!==null){
                        const namePieceCaptured =this.playHistory[lastMovement].pieceCaptured.fullName
                        this.piecesBoard[namePieceCaptured]=this.playHistory[lastMovement].pieceCaptured
                        const positionPieceCaptured=this.playHistory[lastMovement].pieceCaptured.position
                        this.chessBoard[positionPieceCaptured]=this.playHistory[lastMovement].pieceCaptured   
                        delete this.capturePiece[namePieceCaptured]
                    }
                    const positionBack = piecesPlayed.position
                    const namePiece=piecesPlayed.fullName
                    this.chessBoard[positionBack]=piecesPlayed
                    this.piecesBoard[namePiece]=piecesPlayed
                }
            })
            this.playHistory.pop()  
        } 
    }

    verifyRoque(color){
        this.specialMovement.roque.isPossible=false
        this.specialMovement.roque.positionKingToRoque=[]
        this.specialMovement.roque.tower=[]
        this.specialMovement.roque.newMovementTower=[]
        const nameKing = `King${color}`
        if(this.piecesBoard[nameKing].qtMovements===0 && this.statusCheckKing.check===false){
            const TowerLeft = `Tower-Left${color}`
            const TowerRight = `Tower-Right${color}`
            if(this.piecesBoard[TowerLeft].qtMovements===0){
                if(this.piecesBoard[TowerLeft].refMovements.includes("ref41")){    
                    this.possibleMovementRoque(TowerLeft,"ref41",nameKing)
                } 
                if(this.piecesBoard[TowerLeft].refMovements.includes("ref48")){
                    this.possibleMovementRoque(TowerLeft,"ref48",nameKing)
                }         
            }
            if(this.piecesBoard[TowerRight].qtMovements===0){
                if(this.piecesBoard[TowerRight].refMovements.includes("ref61")){
                    this.possibleMovementRoque(TowerRight,"ref61",nameKing)
                } 
                if(this.piecesBoard[TowerRight].refMovements.includes("ref68")){ 
                    this.possibleMovementRoque(TowerRight,"ref68",nameKing)
                }
            }
        }
    }

    possibleMovementRoque(tower,refMovementTower,nameKing){
        const towerMovement = {
            ref41:"ref31",
            ref48:"ref38",
            ref61:"ref71",
            ref68:"ref78"
        }   
        const possibleMovement = towerMovement[refMovementTower] 
        this.specialMovement.roque.isPossible=true
        this.specialMovement.roque.king=this.piecesBoard[nameKing]
        this.specialMovement.roque.positionKingToRoque.push(possibleMovement)
        this.specialMovement.roque.tower.push(this.piecesBoard[tower])
        this.specialMovement.roque.newMovementTower.push(refMovementTower)
        this.piecesBoard[nameKing].refMovements.push(possibleMovement)
        const specialRoque = {
            positions:possibleMovement,
            type:"roque"
        }
        this.piecesBoard[nameKing].possibleSpecialMovements.push(specialRoque)
    }

    movementRoque(informationPieceToMove){
        const indice = this.specialMovement.roque.positionKingToRoque.indexOf(informationPieceToMove.refId)
        const informationTowerMove={
            color: this.specialMovement.roque.tower[indice].color,
            fullName: this.specialMovement.roque.tower[indice].fullName,
            refId:this.specialMovement.roque.newMovementTower[indice]
        }
        const roque = "roque"
        this.updateHistory([informationPieceToMove,informationTowerMove],roque)
        this.changePiecePosition(informationPieceToMove)
        this.changePiecePosition(informationTowerMove)
    }
    
    verifyEnPassant(nextColor){
        this.specialMovement.enPassant.isPossible=false
        if(this.playHistory.length>0){
            const lastMovement=this.playHistory.length-1
            if(this.playHistory[lastMovement].piecesPlayed.length===1){
                const lastPieceMove=this.playHistory[lastMovement].piecesPlayed[0]
                if(lastPieceMove.name.includes("Pawn") && lastPieceMove.qtMovements===0){
                    const directionLastPawn =(lastPieceMove.color==this.colorPieceBoard.bottom)?1:-1
                    const positionLastPawn= this.refIdToArray(lastPieceMove.position)
                    const newPositionPawn= this.refIdToArray(this.piecesBoard[lastPieceMove.fullName].position)
                    if((positionLastPawn[1]+(directionLastPawn*2))===newPositionPawn[1]){
                        const positionInAtackLeft = `ref${(newPositionPawn[0]-1)}${newPositionPawn[1]}`
                        if(!!this.chessBoard[positionInAtackLeft]){
                            if(this.chessBoard[positionInAtackLeft].fullName.includes("Pawn") && this.chessBoard[positionInAtackLeft].color===nextColor){
                                this.possibleMovementEnPassant(lastPieceMove,directionLastPawn,positionInAtackLeft)
                            }
                        }
                        const positionInAtackRigth = `ref${(newPositionPawn[0]+1)}${newPositionPawn[1]}`
                        if(!!this.chessBoard[positionInAtackRigth]){
                            if(this.chessBoard[positionInAtackRigth].fullName.includes("Pawn") && this.chessBoard[positionInAtackRigth].color===nextColor){
                                this.possibleMovementEnPassant(lastPieceMove,directionLastPawn,positionInAtackRigth)
                            }
                        }
                    }
                }
            }         
        }  
    }

    possibleMovementEnPassant(lastPieceMove,direction,positionInAtack){
        const movement = this.refIdToArray(lastPieceMove.position)
        const newMovementPiece= `ref${movement[0]}${movement[1]+direction}`
        this.chessBoard[positionInAtack].refMovements.push(newMovementPiece)
        this.specialMovement.enPassant.isPossible=true
        this.specialMovement.enPassant.pawnPossibleCapture=this.piecesBoard[lastPieceMove.fullName]
        this.specialMovement.enPassant.refIdAtack=newMovementPiece
        this.specialMovement.enPassant.pawnInAtack=this.chessBoard[positionInAtack]
        const specialEnPassant = {
            positions: this.specialMovement.enPassant.refIdAtack,
            type:"enPassant"
        }
        this.chessBoard[positionInAtack].possibleSpecialMovements.push(specialEnPassant)
    }

    movementEnPassant(informationPieceToMove){
           const enPassant = "enPassant"
            this.updateHistory([informationPieceToMove],enPassant)
            this.changePiecePosition(informationPieceToMove)
            this.eatPiece(this.specialMovement.enPassant.pawnPossibleCapture.fullName)
            this.chessBoard[this.specialMovement.enPassant.pawnPossibleCapture.position]=null
    }

    verifyPawnPromotion(color){
        this.specialMovement.pawnPromotion.piecesPawn=[]
        this.specialMovement.pawnPromotion.namesPawn=[]
        this.specialMovement.pawnPromotion.isPossible=false
    
        for(let piece in this.piecesBoard){
            if(piece.includes("Pawn")){
                const positionPawn = this.refIdToArray(this.piecesBoard[piece].position)
                const directionPawn =(this.piecesBoard[piece].color==this.colorPieceBoard.bottom)?1:-1
                if((positionPawn[1]+directionPawn)===8 ||(positionPawn[1]+directionPawn)===1){
                    this.possiblePawnPromotion(piece,positionPawn,directionPawn)
                }
            }
        }
    }
    
    possiblePawnPromotion(piece,positionPawn,directionPawn){
        if(!this.specialMovement.pawnPromotion.namesPawn.includes(piece)){
            this.specialMovement.pawnPromotion.isPossible=true
            this.specialMovement.pawnPromotion.piecesPawn.push(this.piecesBoard[piece])
            this.specialMovement.pawnPromotion.namesPawn.push(piece)
            const refId=[]
            const squareLeft = `ref${positionPawn[0]-1}${positionPawn[1]+directionPawn}`
            if(this.piecesBoard[piece].refMovements.includes(squareLeft)){
                refId.push(squareLeft)
            }
            const squareRight = `ref${positionPawn[0]+1}${positionPawn[1]+directionPawn}`
            if(this.piecesBoard[piece].refMovements.includes(squareRight)){
                refId.push(squareRight)
            }
            const specialPawnPromotion = {
                positions: refId,
                type:"piecePromotion"
            }
            this.piecesBoard[piece].possibleSpecialMovements.push(specialPawnPromotion)
        }
    }

    movementPawnPromotion(informationPieceToMove){
        const pawn = this.piecesBoard[informationPieceToMove.fullName]
        const informationPawnToMove={
            fullName: pawn.fullName,
            refId:informationPieceToMove.refId
        }  
        this.createNewPiece(informationPieceToMove,pawn)
        const informationPiecePromotion={
            fullName: this.piecesPromotion.newPiece.fullName,
            refId:informationPieceToMove.refId
        }  
        const piecePromotion = "piecePromotion"
        this.updateHistory([informationPawnToMove,informationPiecePromotion],piecePromotion)
        this.changePiecePromotion(informationPawnToMove)
        this.updateStatusGame(pawn.color)

    }

    changePiecePromotion(informationPawnToMove){
        this.changePiecePosition(informationPawnToMove)
        this.piecesBoard[this.piecesPromotion.newPiece.fullName]=this.piecesPromotion.newPiece
        this.chessBoard[this.piecesPromotion.newPiece.position]=this.piecesPromotion.newPiece
        this.piecesBoard[informationPawnToMove.fullName].isAtive=false
        this.piecesBoard[informationPawnToMove.fullName].refMovements=[]
    }

    createNewPiece(informationNewPiece,changePawn){
        const chancePiece={
            names:["Tower","Knight","Bishop","Queen"],
            functionPieces:[this.possibleMovementTower,this.possibleMovementKnight,this.possibleMovementBishop,this.possibleMovementQueen],
            Black:{
                fullName:["towerBlack","knightBlack","bishopBlack","queenBlack"],
            },
            White:{
                fullName:["towerWhite","knightWhite","bishopWhite","queenWhite"],
            }
        }
        const color = changePawn.color
        const indChangePiece= chancePiece[color].fullName.indexOf(informationNewPiece.piecePromotion)
        const namePiece=`${chancePiece.names[indChangePiece]}-${this.piecesPromotion[color].qtPiece[indChangePiece]}`
        const fullName=namePiece+color
        const img = informationNewPiece.piecePromotion
        const position = informationNewPiece.refId
        const functionPiece = chancePiece.functionPieces[indChangePiece]
        this.piecesPromotion[color].qtPiece[indChangePiece]++
        this.piecesPromotion.newPiece= this.makePiece(namePiece,fullName,color,img,position,functionPiece)
        this.piecesPromotion.newPiece.refMovements=changePawn.qtMovements
    }

    verifyDrawGame(color){
        const draw=[]
        draw.push(this.drawByDrowning(color))
        draw.push(this.drawByReplayThreeMoves())
        draw.push(this.drawByFiftyRules())
        draw.push(this.drawByChequeMateImpossibility())
        if(draw.includes(true)){
            this.statusDrawn.drawn=true
        }
    }
    
    drawByDrowning(color){
        if(this.statusCheckKing.check===false){
            for(let piece in this.piecesBoard){
                if(this.piecesBoard[piece].color===color){
                    if(this.piecesBoard[piece].refMovements.length>0){
                        return false
                    }
                }
            }
            return true
        }  
        return false   
    }
    
    drawByReplayThreeMoves(){
        const qtPlays= this.playHistory.length-1
        if(qtPlays>=6 && this.statusCheckKing.check===true){
            const lastPlay=this.playHistory[qtPlays]
            const penultimatePlay=this.playHistory[qtPlays-1]
            if(lastPlay.piecesPlayed[0].fullName.includes("King")||penultimatePlay.piecesPlayed[0].fullName.includes("King")){
                const conditions={
                    play1:lastPlay.piecesPlayed[0]===this.playHistory[qtPlays-2].piecesPlayed[0],
                    play2:penultimatePlay.piecesPlayed[0]===this.playHistory[qtPlays-3].piecesPlayed[0],
                    play3:lastPlay.piecesPlayed[0]===this.playHistory[qtPlays-4].piecesPlayed[0] && lastPlay.newRefId[0]===this.playHistory[qtPlays-4].newRefId[0],
                    play4:penultimatePlay.piecesPlayed[0]===this.playHistory[qtPlays-5].piecesPlayed[0] && penultimatePlay.newRefId[0]===this.playHistory[qtPlays-5].newRefId[0]
                }
                    if(conditions.play1===true && conditions.play2===true && conditions.play3===true && conditions.play4===true){
                        return true
                    }
                }
            }

        return false
    }
    
    drawByFiftyRules(numberPlays= 100){
        const qtPlays = this.playHistory.length
        if(qtPlays>=numberPlays){
            for(let i = 1;(i<=numberPlays);i++){
                if(this.playHistory[qtPlays-i].piecesPlayed[0].name.includes("Pawn") || this.playHistory[qtPlays-i].pieceCaptured){
                    return false
                }
            }
            return true
        }
        return false
    }
    
    drawByChequeMateImpossibility(){
        const pieceAtive=[]
        for(let piece in this.piecesBoard){
            if(this.piecesBoard[piece].isAtive){
                pieceAtive.push(piece)
            }
        }
        if(pieceAtive.length>4){
            return false
        }
        if(pieceAtive.length===2){
            return true
        }
        if(pieceAtive.length===3){
            for(let piece of pieceAtive){
                if(piece.includes("Bishop")||piece.includes("Knigth")){
                    return true
                }
            }
        }
        if(pieceAtive.length===4){
            if((pieceAtive.includes("Bishop-LeftBlack")||pieceAtive.includes("Bishop-RightBlack"))
            &&(pieceAtive.includes("Bishop-LeftWhite")||pieceAtive.includes("Bishop-RightWhite"))){
                return true
            }
        }
    }
    
    testDraw(){
        const draw=[]
        this.statusCheckKing.check===false
        for(let piece in this.piecesBoard){
                this.piecesBoard[piece].refMovements=[]
                this.piecesBoard[piece].isAtive=false
        }
        draw.push(this.drawByDrowning("Black"))

        this.statusCheckKing.check=true
        this.playHistory=[{piecesPlayed:[this.piecesBoard["KingBlack"]], pieceCaptured:null, newRefId:["ref25"], typeMovement:null},
        {piecesPlayed:[this.piecesBoard["QueenWhite"]], pieceCaptured:null, newRefId:["ref45"], typeMovement:null},
        {piecesPlayed:[this.piecesBoard["KingBlack"]], pieceCaptured:null, newRefId:["ref24"], typeMovement:null},
        {piecesPlayed:[this.piecesBoard["QueenWhite"]], pieceCaptured:null, newRefId:["ref44"], typeMovement:null},
        {piecesPlayed:[this.piecesBoard["KingBlack"]], pieceCaptured:null, newRefId:["ref25"], typeMovement:null},
        {piecesPlayed:[this.piecesBoard["QueenWhite"]], pieceCaptured:null, newRefId:["ref45"], typeMovement:null},
        {piecesPlayed:[this.piecesBoard["KingBlack"]], pieceCaptured:null, newRefId:["ref24"], typeMovement:null}]

        draw.push(this.drawByReplayThreeMoves())
        draw.push(this.drawByFiftyRules(7))

        for(let refId in this.chessBoard){
            this.chessBoard[refId]=null
        }
        this.chessBoard["ref11"]=this.piecesBoard["KingBlack"]
        this.piecesBoard["KingBlack"].isAtive=true
        this.chessBoard["ref55"]=this.piecesBoard["KingWhite"]
        this.piecesBoard["KingWhite"].isAtive=true
        draw.push(this.drawByChequeMateImpossibility())
        this.chessBoard["ref15"]=this.piecesBoard["Bishop-RightWhite"]
        this.piecesBoard["Bishop-RightWhite"].isAtive=true
        draw.push(this.drawByChequeMateImpossibility())
        this.chessBoard["ref68"]=this.piecesBoard["Bishop-LeftBlack"]
        this.piecesBoard["Bishop-LeftBlack"].isAtive=true
        draw.push(this.drawByChequeMateImpossibility())

        if(draw.includes(true)){
            this.statusDrawn.drawn=true
        }
    }
    getStatusGame(){
        return {
            endGame:this.statusCheckKing.endGame,
            check: this.statusCheckKing.check,
            checkMate: this.statusCheckKing.checkMate,
            draw: this.statusDrawn.draw,
            playerWin:this.statusCheckKing.winColor
        }
    }
    getCurrentBoard(){
        return this.chessBoard
    }
    getHistoryMoves(){
        return this.playHistory
    }
    getCapturedPieces(){
        return this.capturePiece
    }
    getImgPiecePromotion(color){
        return this.piecesPromotion[color].imgs
           
    }
}