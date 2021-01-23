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

        this.starObjGame()
    }

    makePiece (name,color,img,position,functionPiece,isAtive=true){  
        return {
            __proto__:this,
            name:name,
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
            const keyPieces = `${objStarBoard.namePiece[i]}${this.colorPieceBoard.bottom}`      
            this.piecesBoard[keyPieces]= this.makePiece(objStarBoard.namePiece[i],this.colorPieceBoard.bottom,objStarBoard.starPiecesBlack[i],keyChess,objStarBoard.functionPieces[i])
            this.chessBoard[keyChess]= this.piecesBoard[keyPieces]
        }
        for (let i in objStarBoard.starPiecesWhite) {
            const refColumn= (i%8+1)
            const refLine= (8 - parseInt(i/8))
            const keyChess = `ref${refColumn}${refLine}`
            const keyPieces = `${objStarBoard.namePiece[i]}${this.colorPieceBoard.top}` 
            this.piecesBoard[keyPieces]= this.makePiece(objStarBoard.namePiece[i],this.colorPieceBoard.top,objStarBoard.starPiecesWhite[i],keyChess, objStarBoard.functionPieces[i])
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
            check:false,
            checkMate:false,
            endGame:null
        }
    }

    checkMovimentsAllPieces(){
        for(let piece in this.piecesBoard){
            if(this.piecesBoard[piece].isAtive===true)
                {
                    this.piecesBoard[piece].refMoviments=this.piecesBoard[piece].functionPiece()
                }
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
    
        const moviment= direction.reduce((possibleMoviment,direction)=>{
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
        const possibleMovement=[`ref${column}${(line+Number(direction))}`]
        if(this.qtMovements==0){
            possibleMovement.push(`ref${column}${(line+direction*2)}`)
        }
        possibleMovement.forEach((position)=>{
            if(chessBoard[position]==null){
                movimentPawn.push(position)
            }
        })

        const possibleEat=[`ref${column-1}${(line+Number(direction))}`,`ref${column+1}${(line+Number(direction))}`]
        possibleEat.forEach((position)=>{
            if((chessBoard[position]!==null) && (chessBoard[position]!==undefined) && (chessBoard[position].color!==this.color)){
                movimentPawn.push(position)
            }
        })   
    }
        return movimentPawn
    }

    positionRefModification(movePiece){
        const nameRefPieceBoard=`${movePiece.namePiece}${movePiece.color}`
        const refMovePiece =this.piecesBoard[nameRefPieceBoard]
        const newRefId = movePiece.coordinateRef
        if(this.chessBoard[newRefId]!==null){
            const nameCapturePiece = `${this.chessBoard[newRefId].name}${this.chessBoard[newRefId].color}`
            this.eatPiece(nameCapturePiece)
        }
        this.chessBoard[refMovePiece.position]=null
        refMovePiece.position=newRefId
        refMovePiece.qtMovements++
        this.chessBoard[newRefId]= refMovePiece
        this.checkMovimentsAllPieces()
        this.captureKingAdversity(movePiece.color)
    }
    
    eatPiece(nameCapturePiece){
        this.piecesBoard[nameCapturePiece].isAtive = false
        this.piecesBoard[nameCapturePiece].refMoviments=[]
        this.capturePiece[nameCapturePiece]=this.piecesBoard[nameCapturePiece]
        if(nameCapturePiece==="KingWhite"){
            this.checkKing[this.colorPieceBoard.top].endGame=true
        }
        else if(nameCapturePiece==="KingBlack"){
            this.checkKing[this.colorPieceBoard.bottom].endGame=true
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
    // Movimentação peça no tabuleiro
    movimentsModification(idSquare){
        if((this.pieceSelect.refId!==idSquare) && (this.chessBoard[idSquare]!==null) && this.checkColor(idSquare))
        {
            this.pieceSelect.refId=idSquare
            const refPiece = this.chessBoard[idSquare]
            this.pieceSelect.name=refPiece.name
            this.pieceSelect.refMoviments =  this.chessBoard[idSquare].refMoviments
        }
        else{
            if(this.checkMoviments(idSquare)){
                const informationPieceSelect={
                    color: this.chessBoard[this.pieceSelect.refId].color,
                    namePiece: this.chessBoard[this.pieceSelect.refId].name,
                    coordinateRef:idSquare
                }   
                this.pieceSelect.color=(this.colorPieceBoard.top===this.pieceSelect.color)?this.colorPieceBoard.bottom:this.colorPieceBoard.top   
                this.positionRefModification(informationPieceSelect)     
            }
            this.pieceSelect.name=null
            this.pieceSelect.refId=null           
            this.pieceSelect.refMoviments=[]
        } 
    }
// Check and ChekMate

    captureKingAdversity(color){
        const adversaryColor = (this.colorPieceBoard.top===color)?this.colorPieceBoard.bottom:this.colorPieceBoard.top
        this.statusCheckKing.check=false
        const nameKing =`King${adversaryColor}` 
        const checks=this.verifyCheck(this.piecesBoard[nameKing].position,adversaryColor,nameKing)

        if(checks.qt!==0){
            this.statusCheckKing.check=true
            this.statusCheckKing.checkMate=this.checkMate(nameKing,adversaryColor,checks)
                if( this.statusCheckKing.checkMate===true){
                    this.statusCheckKing.endGame=true
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
        for(let i=0;i<this.piecesBoard[nameKing].refMoviments.length;i++){
            const fakeChessBoard = {...this.chessBoard}            //FALSO CHESSBOARD PARA CONFERÊNCIA DO REI
            const refIdInitialKing=this.piecesBoard[nameKing].position
            const newRefIdKing = this.piecesBoard[nameKing].refMoviments[i]
           
            const kingRefId = fakeChessBoard[refIdInitialKing]
            fakeChessBoard[newRefIdKing] = kingRefId 
            fakeChessBoard[refIdInitialKing]=null

            if(this.verifyCheckInMate(fakeChessBoard,newRefIdKing,colorKing) === false){//se na nova refId do rei não tem check, não há checkMate
                return false 
            }
        }

        if(checks.qt===1){
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

            for(let refId in this.chessBoard){
                if(this.chessBoard[refId]!==null && this.chessBoard[refId].color===colorKing && this.chessBoard[refId].name!=="King")
                {
                    for(let refMovimentFriend of this.chessBoard[refId].refMoviments){
                        for(let refIdPossiblePath of refIdPossiblePaths){
                            if(refMovimentFriend===refIdPossiblePath){
                                const fakeChessBoard= {...this.chessBoard} 
                                const pieceMoveFriend = fakeChessBoard[refId]
                                fakeChessBoard[refMovimentFriend] = pieceMoveFriend 
                                fakeChessBoard[refId]=null
                                if(this.verifyCheckInMate(fakeChessBoard,positionInitialKing,colorKing) === false){//se na nova refId do rei não tem check, não há checkMate
                                    return false 
                                }
                            }
                        }
                    }
                }
            }
        }
        return true
    }

    verifyCheckInMate(fakeChessBoard,newRefIdKing,colorKing){
        for(let refId in fakeChessBoard){
            if(fakeChessBoard[refId]!==null && fakeChessBoard[refId].color!==colorKing)
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
}
