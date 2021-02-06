export default class createGame {
    constructor(){
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
        this.colorPieceBoard= {
            top:"White",
            bottom:"Black"
        }
    
        // Controle de peça selecionada.
        this.pieceSelect= {
            name:null,
            refId:null,
            refMoviments:[],
            color:null
        }

        this.capturePiece={}

        this.statusCheckKing={}

        this.specialMoviment={}
    
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
            refMoviments:[]
        } 
    }  

    starObjGame(){
        const objStarBoard={
            starPiecesBlack:["towerBlack","knightBlack","bishopBlack","queenBlack","kingBlack","bishopBlack","knightBlack","towerBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack"],
            starPiecesWhite:["towerWhite","knightWhite","bishopWhite","queenWhite","kingWhite","bishopWhite","knightWhite","towerWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite"],
            namePiece:["Tower-Left","Knight-Left","Bishop-Left","Queen","King","Bishop-Right","Knight-Right","Tower-Right","Pawn-1","Pawn-2","Pawn-3","Pawn-4","Pawn-5","Pawn-6","Pawn-7","Pawn-8"],
             functionPieces:[this.possibleMovimentTower,this.possibleMovimentKnight,this.possibleMovimentBishop,this.possibleMovimentQueen,this.possibleMovimentKing, this.possibleMovimentBishop,this.possibleMovimentKnight, this.possibleMovimentTower,
                this.possibleMovimentPawn, this.possibleMovimentPawn, this.possibleMovimentPawn, this.possibleMovimentPawn, this.possibleMovimentPawn, this.possibleMovimentPawn, this.possibleMovimentPawn, this.possibleMovimentPawn]
        }
        Object.keys(this.chessBoard).forEach((value)=>{this.chessBoard[value]=null})

        for (let i in objStarBoard.starPiecesBlack) {
            const refLine= (parseInt(i/8)+1)
            const refColumn= (i%8+1)
            const keyChess = `ref${refColumn}${refLine}`
            const keyPieces = objStarBoard.namePiece[i] + this.colorPieceBoard.bottom 
            this.piecesBoard[keyPieces]= this.makePiece(objStarBoard.namePiece[i],keyPieces,this.colorPieceBoard.bottom,objStarBoard.starPiecesBlack[i],keyChess,objStarBoard.functionPieces[i])
            this.chessBoard[keyChess]= this.piecesBoard[keyPieces]
        }
        for (let i in objStarBoard.starPiecesWhite) {
            const refColumn= (i%8+1)
            const refLine= (8 - parseInt(i/8))
            const keyChess = `ref${refColumn}${refLine}`
            const keyPieces = objStarBoard.namePiece[i]+this.colorPieceBoard.top
            this.piecesBoard[keyPieces]= this.makePiece(objStarBoard.namePiece[i],keyPieces,this.colorPieceBoard.top,objStarBoard.starPiecesWhite[i],keyChess, objStarBoard.functionPieces[i])
            this.chessBoard[keyChess]= this.piecesBoard[keyPieces]
        }

        this.pieceSelect= {
            name:null,
            refId:null,
            refMoviments:[],
            color:this.colorPieceBoard.top //Cor Branca começam.
        }
        
        this.capturePiece={}
        
        this.checkMovimentsAllPieces()

        this.statusCheckKing={
            color:null,
            check:false,
            checkMate:false,
            endGame:null,
            winColor:null,
            refIdPathsToCheck: []
        }

        this.playHistory=[]

        this.specialMoviment={
            possibleMoviment:false,
            roque:{
                ative:false,
                king:null,
                positionKingToRoque:[],
                tower:[],
                newMovimentTower:[],
            },
            enPassant:{
                ative:false,
                pawnPossibleCapture:null,
                refIdPawn:null,
                pawnInAtack:null
            },
        }  
    }

    possibleMovimentTower(chessBoard=this.chessBoard){//fazer isso
        const column=Number(this.position.charAt(3))
        const line=Number(this.position.charAt(4))
        const direction = [[0,1],[0,-1],[1,0],[-1,0]]
        
        const moviment= direction.reduce((possibleMoviment,direction)=>{
            const newPossibilitiesMoviment =  possibleMoviment.concat(this.checkRegularMovement(direction, column, line, this.color,8,chessBoard))
            return newPossibilitiesMoviment
        },[])
        
        return moviment
    }
    possibleMovimentKnight(chessBoard=this.chessBoard){
        const column=Number(this.position.charAt(3))
        const line=Number(this.position.charAt(4))
        const direction = [[2,1],[2,-1],[-2,-1],[-2,1],[1,2],[-1,2],[-1,-2],[1,-2]]
    
        const moviment= direction.reduce((possibleMoviment,direction)=>{
            const newPossibilitiesMoviment =  possibleMoviment.concat(this.checkRegularMovement(direction, column, line, this.color,1,chessBoard))
            return newPossibilitiesMoviment
        },[])

        return moviment
    }
    possibleMovimentBishop(chessBoard=this.chessBoard){
        const column=Number(this.position.charAt(3))
        const line=Number(this.position.charAt(4))
        const direction=[[1,1],[1,-1],[-1,-1],[-1,1]]
    
        const moviment= direction.reduce((possibleMoviment,direction)=>{
            const newPossibilitiesMoviment =  possibleMoviment.concat(this.checkRegularMovement(direction, column, line, this.color,8,chessBoard))
            return newPossibilitiesMoviment
        },[])

        return moviment
    }
    possibleMovimentQueen(chessBoard=this.chessBoard){
        const column=Number(this.position.charAt(3))
        const line=Number(this.position.charAt(4))
        const direction = [[1,1],[1,-1],[-1,-1],[-1,1],[0,1],[0,-1],[1,0],[-1,0]]
        const a = this.chessBoard
        const moviment= direction.reduce((possibleMoviment,direction)=>{
            const newPossibilitiesMoviment =  possibleMoviment.concat(this.checkRegularMovement(direction, column, line, this.color,8,chessBoard))
            return newPossibilitiesMoviment
        },[])

        return moviment
    }
    possibleMovimentKing(chessBoard=this.chessBoard){
        const column=Number(this.position.charAt(3))
        const line=Number(this.position.charAt(4))
        const direction = [[1,1],[1,-1],[-1,-1],[-1,1],[0,1],[0,-1],[1,0],[-1,0]]
    
        let moviment = direction.reduce((possibleMoviment,direction)=>{
            const newPossibilitiesMoviment = possibleMoviment.concat(this.checkRegularMovement(direction, column, line, this.color,1,chessBoard))
            return newPossibilitiesMoviment
        },[])

        return moviment
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

    possibleMovimentPawn(chessBoard=this.chessBoard){
        const column=Number(this.position.charAt(3))
        const line =Number(this.position.charAt(4))
        const movimentPawn = []
        const direction=[(this.color==this.colorPieceBoard.bottom)?1:-1]
    //Peças Pretas aumentam a linha e as Brancas diminuem.
    if((line+Number(direction))>=1 && (line+Number(direction))<=8){
        const possibleMovement=`ref${column}${(line+Number(direction))}`
        if(chessBoard[possibleMovement]===null){
            movimentPawn.push(possibleMovement)

            if(this.qtMovements==0){
                const fistMovement=`ref${column}${(line+direction*2)}`
                if(chessBoard[fistMovement]===null){
                    movimentPawn.push(fistMovement)
                }
            }
        }    

        const possibleEat=[`ref${column-1}${(line+Number(direction))}`,`ref${column+1}${(line+Number(direction))}`]
        possibleEat.forEach((position)=>{
            if((chessBoard[position]!==null) && (chessBoard[position]!==undefined) && (chessBoard[position].color!==this.color)){
                movimentPawn.push(position)
            }
        })   
    }
        return movimentPawn
    }

    checkMovimentsAllPieces(){
        for(let piece in this.piecesBoard){
            if(this.piecesBoard[piece].isAtive===true)
                {
                    this.piecesBoard[piece].refMoviments=this.piecesBoard[piece].functionPiece()
                }
        }
    }

        // Movimentação peça no tabuleiro
    verifyPieceSelect(idSquare){
        if((this.pieceSelect.refId!==idSquare) && (this.chessBoard[idSquare]!==null) && this.checkColor(idSquare))
        {
            this.pieceSelect.refId=idSquare
            this.pieceSelect.name=this.chessBoard[idSquare].name
            this.pieceSelect.refMoviments =  this.chessBoard[idSquare].refMoviments
        }
        else{
            if(this.checkMoviments(idSquare)){
                const informationPieceSelect={
                    color: this.chessBoard[this.pieceSelect.refId].color,
                    fullName:  this.chessBoard[this.pieceSelect.refId].fullName,
                    refId:idSquare
                }   
                this.verifyMove(informationPieceSelect)    
                this.pieceSelect.color=(this.colorPieceBoard.top===this.pieceSelect.color)?this.colorPieceBoard.bottom:this.colorPieceBoard.top  
            }
            this.pieceSelect.name=null
            this.pieceSelect.refId=null           
            this.pieceSelect.refMoviments=[]
        } 
    }
    
    verifyMove(informationPieceSelect){
        if(!this.verifySpecialMoviment(informationPieceSelect)){
            this.updateHistory([informationPieceSelect],"movimentPiece")
            this.changePiecePosition(informationPieceSelect)
        }
 
        this.updateStatusGame(informationPieceSelect.color)
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

    updateHistory(arrayPiece,typeMoviment){
        const moviment={
            pieceInitial:[],
            pieceEat:null,
            newRefId:[],
            typeMoviment:null
        }
        arrayPiece.forEach(piece=> {
            moviment.pieceInitial.push({__proto__:this,
                ...this.piecesBoard[piece.fullName]})
            if(this.chessBoard[piece.refId]!==null){
                moviment.pieceEat={__proto__:this,
                    ...this.piecesBoard[this.chessBoard[piece.refId].fullName]}
            }
            if(typeMoviment==="enPassant"){
               moviment.pieceEat={__proto__:this,
                    ...this.piecesBoard[this.specialMoviment.enPassant.pawnPossibleCapture.fullName]}
            }
            moviment.newRefId.push(piece.refId)
            moviment.typeMoviment=typeMoviment
        })
     
        this.playHistory.push(moviment)
    }

    eatPiece(nameCapturePiece){
        this.piecesBoard[nameCapturePiece].isAtive = false
        this.piecesBoard[nameCapturePiece].refMoviments=[]
        this.capturePiece[nameCapturePiece]=this.piecesBoard[nameCapturePiece]
        if(nameCapturePiece==="KingWhite"||nameCapturePiece==="KingBlack"){
            this.statusCheckKing.endGame=true
            this.statusCheckKing.winColor=(this.colorPieceBoard.top===this.pieceSelect.color)?this.colorPieceBoard.bottom:this.colorPieceBoard.top 
        }
    }

    verifySpecialMoviment(informationPieceToMove){
        if(this.specialMoviment.roque.ative===true){
            if(informationPieceToMove.fullName===this.specialMoviment.roque.king.fullName){
                if(this.specialMoviment.roque.positionKingToRoque.includes(informationPieceToMove.refId)){
                    this.movimentRoque(informationPieceToMove)
                    return true
                } 
            }
        }
        if(this.specialMoviment.enPassant.ative===true){
            if(this.specialMoviment.enPassant.pawnInAtack.fullName===informationPieceToMove.fullName)// && this.specialMoviment.enPassant.indiceLastMoviment===this.playHistory.length){
            {
                this.movimentEnPassant(informationPieceToMove)
                return true
            }
            else{
                this.specialMoviment.enPassant.ative=false
            }
        }
        return false
    }

    updateStatusGame(colorMove){
        this.checkMovimentsAllPieces()
        const nextColor=(this.colorPieceBoard.top===colorMove)?this.colorPieceBoard.bottom:this.colorPieceBoard.top
        this.updateStatusCheck(nextColor)
        this.updateSpecialMoves(nextColor)
        this.updateFilterMoviment(nextColor)
    }

    updateSpecialMoves(nextColor){
        this.verifyRoque(nextColor)
        this.verifyEnPassant(nextColor)
    }

    updateFilterMoviment(color){
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

    checkColor(idSquare){
        let colorMoviment = true
        if(this.pieceSelect.color!==this.chessBoard[idSquare].color){
            colorMoviment = false
        }
        return colorMoviment
    }

    checkMoviments(idSquare){
        let movedThePiece =false
        for(let ref of this.pieceSelect.refMoviments){
            if(ref===idSquare){
                movedThePiece=true
                break
            }
        }
        return movedThePiece
    }

    movimentsPiece(piece){
        const refId=this.piecesBoard[piece].position
        this.movimentsModification(refId)
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
                if(this.movimentsPieceAdversity(this.piecesBoard[piece].refMoviments,refIdKing)){
                    checks.qt++
                    checks.pieceCheck=piece
                }
            }
        }
        return checks
    }

    movimentsPieceAdversity(movimentsPiece,refIdKing){
        for (let i = 0;i<movimentsPiece.length;i++){
            if(movimentsPiece[i]===refIdKing){
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
        for(let i=0;i<this.piecesBoard[nameKing].refMoviments.length;i++){
            const refIdInitialKing=this.piecesBoard[nameKing].position
            const newRefIdKing = this.piecesBoard[nameKing].refMoviments[i]
            const fakeChessBoard = this.newFakeChessBoard(refIdInitialKing,newRefIdKing) //FALSO CHESSBOARD PARA CONFERÊNCIA DO REI
            if(this.verifyCheckInFakeBoard(fakeChessBoard,newRefIdKing,colorKing) === false){//se na nova refId do rei não tem check, não há checkMate
                return false 
            }
        }

        if(checks.qt===1)
            for(let refId in this.chessBoard){
                if(this.chessBoard[refId]!==null && this.chessBoard[refId].color===colorKing && this.chessBoard[refId].name!=="King")
                {
                    for(let refMovimentFriend of this.chessBoard[refId].refMoviments){
                        for(let refIdPossiblePath of this.statusCheckKing.refIdPathsToCheck){
                            if(refMovimentFriend===refIdPossiblePath){
                                const fakeChessBoard = this.newFakeChessBoard(refId,refMovimentFriend)
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
                const refMoviments=fakeChessBoard[refId].functionPiece(fakeChessBoard)
                if(this.movimentsPieceAdversity(refMoviments,newRefIdKing)){//verifica se o refId adversario e igual ao refId do rei
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
        for(let refMovimentKing of this.piecesBoard[nameKing].refMoviments){
           for(let refMovimentAdversary of this.piecesBoard[checks.pieceCheck].refMoviments){
               if(refMovimentKing===refMovimentAdversary){
                    refIdPossiblePaths.push(refMovimentAdversary)
                    const arrayPositionKing=this.refIdToArray(positionInitialKing)
                    const arrayPositionAdversary=this.refIdToArray(refMovimentAdversary)
                    direction = [(arrayPositionAdversary[0]-arrayPositionKing[0]),(arrayPositionAdversary[1]-arrayPositionKing[1])]
                    break
                }
           }
        }

        let currentRefid = refIdPossiblePaths[0]
        while(currentRefid){
            const refId = this.refIdToArray(currentRefid)
            const possibleRefid = `ref${refId[0]+direction[0]}${refId[1]+direction[1]}`
            for(let refMovimentAdversary of this.piecesBoard[checks.pieceCheck].refMoviments){
                if(possibleRefid===refMovimentAdversary){
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
        this.piecesBoard[nameKing].refMoviments=this.piecesBoard[nameKing].refMoviments.reduce((possibleMovimentKing,refIdKing)=>{
               const fakeChessBoard = this.newFakeChessBoard(positionInitialKing,refIdKing)
               if(this.verifyCheckInFakeBoard(fakeChessBoard,refIdKing,assistantPieceColor) === false){
                    possibleMovimentKing.push(refIdKing)
               }
               return possibleMovimentKing
        },[])
    }

    checkAssistance(assistantPieceColor){
        const nameKing =`King${assistantPieceColor}`
        this.assistantKing(assistantPieceColor)

        const positionInitialKing = this.piecesBoard[nameKing].position
        const arrayNamesPieces = Object.keys(this.piecesBoard)
        arrayNamesPieces.forEach((namePiece)=>{
            if((assistantPieceColor===this.piecesBoard[namePiece].color)&&(this.piecesBoard[namePiece].isAtive===true)&&(namePiece!==nameKing)){
                this.piecesBoard[namePiece].refMoviments=this.piecesBoard[namePiece].refMoviments.reduce((possibleMovimentPiece,refIdpiece)=>{
                    for(let refIdPossiblePath of this.statusCheckKing.refIdPathsToCheck){
                        if(refIdPossiblePath===refIdpiece){
                            const fakeChessBoard = this.newFakeChessBoard(this.piecesBoard[namePiece].position,refIdpiece)
                            if(this.verifyCheckInFakeBoard(fakeChessBoard,positionInitialKing,assistantPieceColor) === false){//se na nova refId do rei não tem check, não há checkMate
                                possibleMovimentPiece.push(refIdpiece)
                            }                
                        }
                    }
                    return possibleMovimentPiece
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
                    this.piecesBoard[namePiece].refMoviments=[]
                }  
            }
        }
    )}

    returnMoviment(){
        this.returnChangePiece( )
        this.updateStatusGame(this.pieceSelect.color)
        this.pieceSelect.name=null
        this.pieceSelect.refId=null           
        this.pieceSelect.refMoviments=[]
        this.pieceSelect.color=(this.colorPieceBoard.top===this.pieceSelect.color)?this.colorPieceBoard.bottom:this.colorPieceBoard.top

    }

    returnChangePiece(){
        const lastMoviment= this.playHistory.length-1
        this.playHistory[lastMoviment].pieceInitial.forEach((pieceInitial,indice)=>{
            const position = this.playHistory[lastMoviment].newRefId[indice]
            this.chessBoard[position]=null
            if(this.playHistory[lastMoviment].pieceEat!==null){
                const namePieceEat =this.playHistory[lastMoviment].pieceEat.fullName
                this.piecesBoard[namePieceEat]=this.playHistory[lastMoviment].pieceEat
                const positionPieceEat=this.playHistory[lastMoviment].pieceEat.position
                this.chessBoard[positionPieceEat]=this.playHistory[lastMoviment].pieceEat   
                delete this.capturePiece[namePieceEat]
            }
            const positionBack = pieceInitial.position
            const namePiece=pieceInitial.fullName
            this.chessBoard[positionBack]=pieceInitial
            this.piecesBoard[namePiece]=pieceInitial
        })
        this.playHistory.pop()  
    }

    verifyRoque(color){
        this.specialMoviment.roque.ative=false
        this.specialMoviment.roque.positionKingToRoque=[]
        this.specialMoviment.roque.tower=[]
        this.specialMoviment.roque.newMovimentTower=[]
        const nameKing = `King${color}`
        if(this.piecesBoard[nameKing].qtMovements===0 && this.statusCheckKing.check===false){
            const TowerLeft = `Tower-Left${color}`
            const TowerRight = `Tower-Right${color}`
            if(this.piecesBoard[TowerLeft].qtMovements===0){
                if(this.piecesBoard[TowerLeft].refMoviments.includes("ref41")){    
                    this.possibleMovimentRoque(TowerLeft,"ref41",nameKing)
                } 
                if(this.piecesBoard[TowerLeft].refMoviments.includes("ref48")){
                    this.possibleMovimentRoque(TowerLeft,"ref48",nameKing)
                }         
            }
            if(this.piecesBoard[TowerRight].qtMovements===0){
                if(this.piecesBoard[TowerRight].refMoviments.includes("ref61")){
                    this.possibleMovimentRoque(TowerRight,"ref61",nameKing)
                } 
                if(this.piecesBoard[TowerRight].refMoviments.includes("ref68")){ 
                    this.possibleMovimentRoque(TowerRight,"ref68",nameKing)
                }
            }
            this.piecesBoard[nameKing].refMoviments.push()
        }
    }

    possibleMovimentRoque(tower,refMovimentTower,nameKing){
        const towerMoviment = {
            ref41:"ref31",
            ref48:"ref38",
            ref61:"ref71",
            ref68:"ref78"
        }   
        const possiblemoviment = towerMoviment[refMovimentTower] 
        this.specialMoviment.roque.ative=true
        this.specialMoviment.roque.king=this.piecesBoard[nameKing]
        this.specialMoviment.roque.positionKingToRoque.push(possiblemoviment)
        this.specialMoviment.roque.tower.push(this.piecesBoard[tower])
        this.specialMoviment.roque.newMovimentTower.push(refMovimentTower)
        this.piecesBoard[nameKing].refMoviments.push(possiblemoviment)
    }

    movimentRoque(informationPieceToMove){
        const indice = this.specialMoviment.roque.positionKingToRoque.indexOf(informationPieceToMove.refId)
        const informationTowerMove={
            color: this.specialMoviment.roque.tower[indice].color,
            fullName: this.specialMoviment.roque.tower[indice].fullName,
            refId:this.specialMoviment.roque.newMovimentTower[indice]
        }
        const roque = "roque"
        this.updateHistory([informationPieceToMove,informationTowerMove],roque)
        this.changePiecePosition(informationPieceToMove)
        this.changePiecePosition(informationTowerMove)
    }
    
    verifyEnPassant(nextColor){
        if(this.playHistory.length>0){
            const lastMoviment=this.playHistory.length-1
            if(this.playHistory[lastMoviment].pieceInitial.length===1){
                const nameReg = /Pawn/g
                const lastPieceMove=this.playHistory[lastMoviment].pieceInitial[0]
                if(nameReg.test(lastPieceMove.name) && lastPieceMove.qtMovements===0){
                    const direction =(lastPieceMove.color==this.colorPieceBoard.bottom)?1:-1
                    this.possibleMovimentEnPassant(lastPieceMove,direction,nextColor)
                }
            }         
        }  
    }

    possibleMovimentEnPassant(lastPieceMove,direction,nextColor){
        const enPassant = {}
        const positionInitialPawn= this.refIdToArray(lastPieceMove.position)
        const newPositionPawn= this.refIdToArray(this.piecesBoard[lastPieceMove.fullName].position)
        if((positionInitialPawn[1]+(direction*2))===newPositionPawn[1]){
            for(let piece in this.piecesBoard){
                const nameReg = /Pawn/g
                if(nameReg.test(piece) && this.piecesBoard[piece].color===nextColor){
                    const positionPawnInAtack = this.refIdToArray(this.piecesBoard[piece].position)
                    if((positionPawnInAtack[0]+1===newPositionPawn[0] || positionPawnInAtack[0]-1===newPositionPawn[0]) && positionPawnInAtack[1]===newPositionPawn[1])
                    {
                        const newMovimentPiece= `ref${newPositionPawn[0]}${newPositionPawn[1]-direction}`
                        this.piecesBoard[piece].refMoviments=this.piecesBoard[piece].refMoviments.concat(newMovimentPiece)
                        enPassant.ative=true
                        enPassant.pawnPossibleCapture=lastPieceMove
                        enPassant.refIdPawn=this.piecesBoard[lastPieceMove.fullName].position
                        enPassant.pawnInAtack=this.piecesBoard[piece]
                        enPassant.indiceLastMoviment=this.playHistory.length
                    }
                }
            }
        }
        this.specialMoviment.enPassant=enPassant
    }

    movimentEnPassant(informationPieceToMove){
           const enPassant = "enPassant"
            this.updateHistory([informationPieceToMove],enPassant)
            this.changePiecePosition(informationPieceToMove)
            this.eatPiece(this.specialMoviment.enPassant.pawnPossibleCapture.fullName)
            this.chessBoard[this.specialMoviment.enPassant.refIdPawn]=null
            this.specialMoviment.enPassant={
                ative:false,
                pawnPossibleCapture:null,
                refIdPawn:null,
                pawnInAtack:null
            }
    }
}