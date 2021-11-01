
import possibleMovementTower from "./PossibleMovement/PossibleMovementTower.js"
import possibleMovementKnight from "./PossibleMovement/PossibleMovementKnight.js"
import possibleMovementBishop from "./PossibleMovement/PossibleMovementBishop.js"
import possibleMovementQueen from "./PossibleMovement/PossibleMovementQueen.js"
import possibleMovementKing from "./PossibleMovement/PossibleMovementKing.js"
import possibleMovementPawn from "./PossibleMovement/PossibleMovementPawn.js"
import {
    defaultPiecesBoard,
    defaultBlackPieces,
    defaulWhitePieces,
    defaultNamePieces,
    defaultChessBoard,
    defaultStatusGame,
    defaultSpecialMovement,
    defaultPiecesPromotion,
    defaultCapturePiece,
    defaultPlayHistory } from "./DefaultObjets.js"
import { refIdToArray } from "./utils.js"

export default class CreateGame {
    constructor(player){
        this.chessBoard= defaultChessBoard
        //chave Nome+cor - conforme obj chessBoard
        this.piecesBoard= {}
    
        //Cor peças
        this.colorPieceBoard= player

        this.capturePiece={}

        this.statusGame={}

        this.statusDrawn={}

        this.playHistory=[]

        this.specialMovement={}

        this.piecesPromotion={}
    }

    makePiece (name,fullName,color,img,position,functionPiece,isAtive=true){  
        return {
            __proto__:this,
            name:name,
            fullName:fullName,
            color:color,
            imgName:img,
            position:position,
            isAtive:isAtive,
            functionPiece:functionPiece,
            qtMovements:0,
            refMovements:[],
            possibleSpecialMovements:[]
        } 
    }  

    starObjGame(){
        this.piecesBoard=defaultPiecesBoard
        this.statusGame=defaultStatusGame
        this.capturePiece=defaultCapturePiece
        this.playHistory=defaultPlayHistory
        this.specialMovement=defaultSpecialMovement
        this.piecesPromotion=defaultPiecesPromotion

        const objStarBoard={
            starPiecesBlack:defaultBlackPieces,
            starPiecesWhite:defaulWhitePieces,
            namePiece:defaultNamePieces,
            functionPieces:[possibleMovementTower,possibleMovementKnight,possibleMovementBishop,possibleMovementQueen,possibleMovementKing, possibleMovementBishop,possibleMovementKnight, possibleMovementTower,
                possibleMovementPawn, possibleMovementPawn, possibleMovementPawn, possibleMovementPawn, possibleMovementPawn, possibleMovementPawn, possibleMovementPawn, possibleMovementPawn]
        }
        Object.keys(this.chessBoard.reference).forEach((value)=>{this.chessBoard.reference[value]=null})

        for (let i in objStarBoard.starPiecesWhite) {
            const refLine= (parseInt(i/8)+1)
            const refColumn= (i%8+1)
            const keyChess = `ref${refColumn}${refLine}`
            const keyPieces = objStarBoard.namePiece[i] + this.colorPieceBoard.bottom 
            const newPiece= this.makePiece(objStarBoard.namePiece[i],keyPieces,this.colorPieceBoard.bottom,objStarBoard.starPiecesWhite[i],keyChess,objStarBoard.functionPieces[i])
            this.piecesBoard.addPieceOfRef(keyPieces,newPiece)
            this.chessBoard.reference[keyChess]= newPiece
        }
        for (let i in objStarBoard.starPiecesBlack) {
            const refColumn= (i%8+1)
            const refLine= (8 - parseInt(i/8))
            const keyChess = `ref${refColumn}${refLine}`
            const keyPieces = objStarBoard.namePiece[i]+this.colorPieceBoard.top
            const newPiece= this.makePiece(objStarBoard.namePiece[i],keyPieces,this.colorPieceBoard.top,objStarBoard.starPiecesBlack[i],keyChess, objStarBoard.functionPieces[i])
            this.piecesBoard.addPieceOfRef(keyPieces,newPiece)
            this.chessBoard.reference[keyChess]= newPiece
        }
        this.checkMovementsAllPieces()
    }


    checkMovementsAllPieces(){
        for(let piece in this.piecesBoard.pieces){
            if(this.piecesBoard.pieces[piece].isAtive===true)
                {
                    this.piecesBoard.pieces[piece].refMovements=this.piecesBoard.pieces[piece].functionPiece(this.chessBoard.reference)
                    this.piecesBoard.pieces[piece].possibleSpecialMovements=[]
                }
        }
    }

    setMove(informationPieceSelect){
        const piece = this.piecesBoard.pieces[informationPieceSelect.fullName]
        const isMove = piece.refMovements.includes(informationPieceSelect.refId)
        if(isMove){
            this.updateHistory([informationPieceSelect],"movementPiece")
            this.changePiecePosition(informationPieceSelect)
            this.updateStatusGame(piece.color)
        }
        return isMove
    }

    changePiecePosition(informationPiecetoMove){
        const movePiece =this.piecesBoard.pieces[informationPiecetoMove.fullName]
        const newRefId = informationPiecetoMove.refId
        if(this.chessBoard.reference[newRefId]!==null){
            this.eatPiece(this.chessBoard.reference[newRefId].fullName)
        }
        this.chessBoard.reference[movePiece.position]=null
        movePiece.position=newRefId
        movePiece.qtMovements++
        this.chessBoard.reference[newRefId]= movePiece
    }

    updateHistory(arrayPiece,typeMovement){
        const movement={
            piecesPlayed:[],
            pieceCaptured:null,
            newRefId:[],
            typeMovement:null
        }
        arrayPiece.forEach(piece=> {
            if( this.piecesBoard.pieces[piece.fullName]){
                movement.piecesPlayed.push({__proto__:this,
                    ... this.piecesBoard.pieces[piece.fullName]})   
                if(this.chessBoard.reference[piece.refId]!==null){
                    movement.pieceCaptured={__proto__:this,
                        ... this.piecesBoard.pieces[this.chessBoard.reference[piece.refId].fullName]}
                }
                if(typeMovement==="enPassant"){
                    movement.pieceCaptured={__proto__:this,
                        ... this.piecesBoard.pieces[this.specialMovement.enPassant.pawnPossibleCapture.fullName]}
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
        this.piecesBoard.pieces[nameCapturePiece].isAtive = false
        this.piecesBoard.pieces[nameCapturePiece].refMovements=[]
        this.capturePiece[nameCapturePiece]= this.piecesBoard.pieces[nameCapturePiece]
        if(nameCapturePiece==="KingWhite"||nameCapturePiece==="KingBlack"){
            this.statusGame.endGame=true
            this.statusGame.winColor=(this.colorPieceBoard.top===this.colorPieceBoard.play)?this.colorPieceBoard.bottom:this.colorPieceBoard.top 
        }
    }

    setSpecialMovement(informationPieceToMove){
        const piece = this.piecesBoard.pieces[informationPieceToMove.fullName]
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
        if(this.statusGame.checkKing.checkMate===false){
            if(this.statusGame.checkKing.check===true ){
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
        this.statusGame.checkKing.check=false
        const nameKing =`King${color}` 
        const checks=this.verifyCheck( this.piecesBoard.pieces[nameKing].position,color,nameKing)

        if(checks.qt!==0){
            this.statusGame.checkKing.refIdPathsToCheck = this.pathToCheck(nameKing,checks)
            this.statusGame.checkKing.check=true
            this.statusGame.checkKing.checkMate=this.checkMate(nameKing,color,checks)
                if( this.statusGame.checkKing.checkMate===true){
                    this.statusGame.endGame=true
                    this.statusGame.winColor=(this.colorPieceBoard.top===color)?this.colorPieceBoard.bottom:this.colorPieceBoard.top
                }
        }
    } 
 
    verifyCheck(refIdKing,colorKing){
        let checks = {
            qt:0,
            pieceCheck:null
        }
        for(let piece in this.piecesBoard.pieces){
            if((colorKing!== this.piecesBoard.pieces[piece].color)&&( this.piecesBoard.pieces[piece].isAtive===true)){
                if(this.movementsPieceAdversity( this.piecesBoard.pieces[piece].refMovements,refIdKing)){
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

    checkMate(nameKing,colorKing,checks){
        const positionInitialKing = this.piecesBoard.pieces[nameKing].position
        for(let i=0;i< this.piecesBoard.pieces[nameKing].refMovements.length;i++){
            const refIdInitialKing= this.piecesBoard.pieces[nameKing].position
            const newRefIdKing = this.piecesBoard.pieces[nameKing].refMovements[i]
            const fakeChessBoard = this.newFakeChessBoard(refIdInitialKing,newRefIdKing) //FALSO CHESSBOARD PARA CONFERÊNCIA DO REI
            if(this.verifyCheckInFakeBoard(fakeChessBoard,newRefIdKing,colorKing) === false){//se na nova refId do rei não tem check, não há checkMate
                return false 
            }
        }

        if(checks.qt===1)
            for(let refId in this.chessBoard.reference){
                if(this.chessBoard.reference[refId]!==null && this.chessBoard.reference[refId].color===colorKing && this.chessBoard.reference[refId].name!=="King")
                {
                    for(let refMovementFriend of this.chessBoard.reference[refId].refMovements){
                        for(let refIdPossiblePath of this.statusGame.checkKing.refIdPathsToCheck){
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
        const positionPieceAdversary = this.piecesBoard.pieces[checks.pieceCheck].position
        const positionInitialKing = this.piecesBoard.pieces[nameKing].position
        let direction = [0,0]

        // descobrir direção
        for(let refMovementKing of this.piecesBoard.pieces[nameKing].refMovements){
           for(let refMovementAdversary of this.piecesBoard.pieces[checks.pieceCheck].refMovements){
               if(refMovementKing===refMovementAdversary){
                    refIdPossiblePaths.push(refMovementAdversary)
                    const arrayPositionKing=refIdToArray(positionInitialKing)
                    const arrayPositionAdversary=refIdToArray(refMovementAdversary)
                    direction = [(arrayPositionAdversary[0]-arrayPositionKing[0]),(arrayPositionAdversary[1]-arrayPositionKing[1])]
                    break
                }
           }
        }

        let currentRefid = refIdPossiblePaths[0]
        while(currentRefid){
            const refId = refIdToArray(currentRefid)
            const possibleRefid = `ref${refId[0]+direction[0]}${refId[1]+direction[1]}`
            for(let refMovementAdversary of this.piecesBoard.pieces[checks.pieceCheck].refMovements){
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
        const fakeChessBoard= {...this.chessBoard.reference} 
        const pieceMove = fakeChessBoard[pastPositionPiece]
        fakeChessBoard[newPositionPiece] = pieceMove
        fakeChessBoard[pastPositionPiece]=null
        return fakeChessBoard
    }

    assistantKing(assistantPieceColor){
        const nameKing =`King${assistantPieceColor}` 
        const positionInitialKing = this.piecesBoard.pieces[nameKing].position
        this.piecesBoard.pieces[nameKing].refMovements= this.piecesBoard.pieces[nameKing].refMovements.reduce((possibleMovementKing,refIdKing)=>{
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

        const positionInitialKing = this.piecesBoard.pieces[nameKing].position
        const arrayNamesPieces = Object.keys(this.piecesBoard.pieces)
        arrayNamesPieces.forEach((namePiece)=>{
            if((assistantPieceColor=== this.piecesBoard.pieces[namePiece].color)&&( this.piecesBoard.pieces[namePiece].isAtive===true)&&(namePiece!==nameKing)){
                this.piecesBoard.pieces[namePiece].refMovements= this.piecesBoard.pieces[namePiece].refMovements.reduce((possibleMovementPiece,refIdpiece)=>{
                    for(let refIdPossiblePath of this.statusGame.checkKing.refIdPathsToCheck){
                        if(refIdPossiblePath===refIdpiece){
                            const fakeChessBoard = this.newFakeChessBoard( this.piecesBoard.pieces[namePiece].position,refIdpiece)
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
        const positionInitialKing = this.piecesBoard.pieces[nameKing].position
        const arrayNamesPieces = Object.keys(this.piecesBoard.pieces)
        arrayNamesPieces.forEach((namePiece)=>{
            if((assistantPieceColor=== this.piecesBoard.pieces[namePiece].color)&&( this.piecesBoard.pieces[namePiece].isAtive===true)&&(namePiece!==nameKing)){
                const fakeChessBoard={...this.chessBoard.reference} 
                const positionPiece = this.piecesBoard.pieces[namePiece].position
                fakeChessBoard[positionPiece]=null
                if(this.verifyCheckInFakeBoard(fakeChessBoard,positionInitialKing,assistantPieceColor)){//se na nova refId do rei não tem check, não há checkMate
                    this.piecesBoard.pieces[namePiece].refMovements=[]
                }  
            }
        }
    )}

    returnMovement(){
        this.statusGame.endGame=false
        this.statusGame.checkKing.checkMate=false
        this.statusGame.winColor=null
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
                    delete this.piecesBoard.pieces[namePiece]
                }
                else{
                    const position = this.playHistory[lastMovement].newRefId[ind]
                    this.chessBoard.reference[position]=null
                    if(this.playHistory[lastMovement].pieceCaptured!==null){
                        const namePieceCaptured =this.playHistory[lastMovement].pieceCaptured.fullName
                        this.piecesBoard.pieces[namePieceCaptured]=this.playHistory[lastMovement].pieceCaptured
                        const positionPieceCaptured=this.playHistory[lastMovement].pieceCaptured.position
                        this.chessBoard.reference[positionPieceCaptured]=this.playHistory[lastMovement].pieceCaptured   
                        delete this.capturePiece[namePieceCaptured]
                    }
                    const positionBack = piecesPlayed.position
                    const namePiece=piecesPlayed.fullName
                    this.chessBoard.reference[positionBack]=piecesPlayed
                    this.piecesBoard.pieces[namePiece]=piecesPlayed
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
        if( this.piecesBoard.pieces[nameKing].qtMovements===0 && this.statusGame.checkKing.check===false){
            const TowerLeft = `Tower-Left${color}`
            const TowerRight = `Tower-Right${color}`
            if( this.piecesBoard.pieces[TowerLeft].qtMovements===0){
                if( this.piecesBoard.pieces[TowerLeft].refMovements.includes("ref41")){    
                    this.possibleMovementRoque(TowerLeft,"ref41",nameKing)
                } 
                if( this.piecesBoard.pieces[TowerLeft].refMovements.includes("ref48")){
                    this.possibleMovementRoque(TowerLeft,"ref48",nameKing)
                }         
            }
            if( this.piecesBoard.pieces[TowerRight].qtMovements===0){
                if( this.piecesBoard.pieces[TowerRight].refMovements.includes("ref61")){
                    this.possibleMovementRoque(TowerRight,"ref61",nameKing)
                } 
                if( this.piecesBoard.pieces[TowerRight].refMovements.includes("ref68")){ 
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
        this.specialMovement.roque.king= this.piecesBoard.pieces[nameKing]
        this.specialMovement.roque.positionKingToRoque.push(possibleMovement)
        this.specialMovement.roque.tower.push( this.piecesBoard.pieces[tower])
        this.specialMovement.roque.newMovementTower.push(refMovementTower)
        this.piecesBoard.pieces[nameKing].refMovements.push(possibleMovement)
        const specialRoque = {
            positions:possibleMovement,
            type:"roque"
        }
        this.piecesBoard.pieces[nameKing].possibleSpecialMovements.push(specialRoque)
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
                    const positionLastPawn= refIdToArray(lastPieceMove.position)
                    const newPositionPawn= refIdToArray( this.piecesBoard.pieces[lastPieceMove.fullName].position)
                    if((positionLastPawn[1]+(directionLastPawn*2))===newPositionPawn[1]){
                        const positionInAtackLeft = `ref${(newPositionPawn[0]-1)}${newPositionPawn[1]}`
                        if(!!this.chessBoard.reference[positionInAtackLeft]){
                            if(this.chessBoard.reference[positionInAtackLeft].fullName.includes("Pawn") && this.chessBoard.reference[positionInAtackLeft].color===nextColor){
                                this.possibleMovementEnPassant(lastPieceMove,directionLastPawn,positionInAtackLeft)
                            }
                        }
                        const positionInAtackRigth = `ref${(newPositionPawn[0]+1)}${newPositionPawn[1]}`
                        if(!!this.chessBoard.reference[positionInAtackRigth]){
                            if(this.chessBoard.reference[positionInAtackRigth].fullName.includes("Pawn") && this.chessBoard.reference[positionInAtackRigth].color===nextColor){
                                this.possibleMovementEnPassant(lastPieceMove,directionLastPawn,positionInAtackRigth)
                            }
                        }
                    }
                }
            }         
        }  
    }

    possibleMovementEnPassant(lastPieceMove,direction,positionInAtack){
        const movement = refIdToArray(lastPieceMove.position)
        const newMovementPiece= `ref${movement[0]}${movement[1]+direction}`
        this.chessBoard.reference[positionInAtack].refMovements.push(newMovementPiece)
        this.specialMovement.enPassant.isPossible=true
        this.specialMovement.enPassant.pawnPossibleCapture= this.piecesBoard.pieces[lastPieceMove.fullName]
        this.specialMovement.enPassant.refIdAtack=newMovementPiece
        this.specialMovement.enPassant.pawnInAtack=this.chessBoard.reference[positionInAtack]
        const specialEnPassant = {
            positions: this.specialMovement.enPassant.refIdAtack,
            type:"enPassant"
        }
        this.chessBoard.reference[positionInAtack].possibleSpecialMovements.push(specialEnPassant)
    }

    movementEnPassant(informationPieceToMove){
           const enPassant = "enPassant"
            this.updateHistory([informationPieceToMove],enPassant)
            this.changePiecePosition(informationPieceToMove)
            this.eatPiece(this.specialMovement.enPassant.pawnPossibleCapture.fullName)
            this.chessBoard.reference[this.specialMovement.enPassant.pawnPossibleCapture.position]=null
    }

    verifyPawnPromotion(color){
        this.specialMovement.pawnPromotion.piecesPawn=[]
        this.specialMovement.pawnPromotion.namesPawn=[]
        this.specialMovement.pawnPromotion.isPossible=false
    
        for(let piece in this.piecesBoard.pieces){
            if(piece.includes("Pawn")){
                const positionPawn = refIdToArray( this.piecesBoard.pieces[piece].position)
                const directionPawn =( this.piecesBoard.pieces[piece].color==this.colorPieceBoard.bottom)?1:-1
                if((positionPawn[1]+directionPawn)===8 ||(positionPawn[1]+directionPawn)===1){
                    this.possiblePawnPromotion(piece,positionPawn,directionPawn)
                }
            }
        }
    }
    
    possiblePawnPromotion(piece,positionPawn,directionPawn){
        if(!this.specialMovement.pawnPromotion.namesPawn.includes(piece)){
            this.specialMovement.pawnPromotion.isPossible=true
            this.specialMovement.pawnPromotion.piecesPawn.push( this.piecesBoard.pieces[piece])
            this.specialMovement.pawnPromotion.namesPawn.push(piece)
            const refId=[]
            const squareLeft = `ref${positionPawn[0]-1}${positionPawn[1]+directionPawn}`
            if( this.piecesBoard.pieces[piece].refMovements.includes(squareLeft)){
                refId.push(squareLeft)
            }
            const squareRight = `ref${positionPawn[0]+1}${positionPawn[1]+directionPawn}`
            if( this.piecesBoard.pieces[piece].refMovements.includes(squareRight)){
                refId.push(squareRight)
            }
            const specialPawnPromotion = {
                positions: refId,
                type:"piecePromotion"
            }
            this.piecesBoard.pieces[piece].possibleSpecialMovements.push(specialPawnPromotion)
        }
    }

    movementPawnPromotion(informationPieceToMove){
        const pawn = this.piecesBoard.pieces[informationPieceToMove.fullName]
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
        this.piecesBoard.pieces[this.piecesPromotion.newPiece.fullName]=this.piecesPromotion.newPiece
        this.chessBoard.reference[this.piecesPromotion.newPiece.position]=this.piecesPromotion.newPiece
        this.piecesBoard.pieces[informationPawnToMove.fullName].isAtive=false
        this.piecesBoard.pieces[informationPawnToMove.fullName].refMovements=[]
    }

    createNewPiece(informationNewPiece,changePawn){
        const chancePiece={
            names:["Tower","Knight","Bishop","Queen"],
            functionPieces:[possibleMovementTower,possibleMovementKnight,possibleMovementBishop,possibleMovementQueen],
            black:{
                fullName:["towerBlack","knightBlack","bishopBlack","queenBlack"],
            },
            white:{
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
            this.statusGame.statusDrawn.draw=true
            this.statusGame.endGame=true
        }
    }
    
    drawByDrowning(color){
        if(this.statusGame.checkKing.check===false){
            for(let piece in this.piecesBoard.pieces){
                if( this.piecesBoard.pieces[piece].color===color){
                    if( this.piecesBoard.pieces[piece].refMovements.length>0){
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
        if(qtPlays>=6 && this.statusGame.checkKing.check===true){
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
        for(let piece in this.piecesBoard.pieces){
            if( this.piecesBoard.pieces[piece].isAtive){
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
        this.statusGame.checkKing.check===false
        for(let piece in this.piecesBoard.pieces){
                this.piecesBoard.pieces[piece].refMovements=[]
                this.piecesBoard.pieces[piece].isAtive=false
        }
        draw.push(this.drawByDrowning("Black"))

        this.statusGame.checkKing.check=true
        this.playHistory=[{piecesPlayed:[ this.piecesBoard.pieces["KingBlack"]], pieceCaptured:null, newRefId:["ref25"], typeMovement:null},
        {piecesPlayed:[ this.piecesBoard.pieces["QueenWhite"]], pieceCaptured:null, newRefId:["ref45"], typeMovement:null},
        {piecesPlayed:[ this.piecesBoard.pieces["KingBlack"]], pieceCaptured:null, newRefId:["ref24"], typeMovement:null},
        {piecesPlayed:[ this.piecesBoard.pieces["QueenWhite"]], pieceCaptured:null, newRefId:["ref44"], typeMovement:null},
        {piecesPlayed:[ this.piecesBoard.pieces["KingBlack"]], pieceCaptured:null, newRefId:["ref25"], typeMovement:null},
        {piecesPlayed:[ this.piecesBoard.pieces["QueenWhite"]], pieceCaptured:null, newRefId:["ref45"], typeMovement:null},
        {piecesPlayed:[ this.piecesBoard.pieces["KingBlack"]], pieceCaptured:null, newRefId:["ref24"], typeMovement:null}]

        draw.push(this.drawByReplayThreeMoves())
        draw.push(this.drawByFiftyRules(7))

        for(let refId in this.chessBoard.reference){
            this.chessBoard.reference[refId]=null
        }
        this.chessBoard.reference["ref11"]= this.piecesBoard.pieces["KingBlack"]
        this.piecesBoard.pieces["KingBlack"].isAtive=true
        this.chessBoard.reference["ref55"]= this.piecesBoard.pieces["KingWhite"]
        this.piecesBoard.pieces["KingWhite"].isAtive=true
        draw.push(this.drawByChequeMateImpossibility())
        this.chessBoard.reference["ref15"]= this.piecesBoard.pieces["Bishop-RightWhite"]
        this.piecesBoard.pieces["Bishop-RightWhite"].isAtive=true
        draw.push(this.drawByChequeMateImpossibility())
        this.chessBoard.reference["ref68"]= this.piecesBoard.pieces["Bishop-LeftBlack"]
        this.piecesBoard.pieces["Bishop-LeftBlack"].isAtive=true
        draw.push(this.drawByChequeMateImpossibility())

        if(draw.includes(true)){
            this.statusGame.statusDrawn.draw=true
        }
    }
    getStatusGame(){
        return {
            endGame:this.statusGame.endGame,
            check: this.statusGame.checkKing.check,
            checkMate: this.statusGame.checkKing.checkMate,
            draw: this.statusGame.statusDrawn.draw,
            winColor:this.statusGame.winColor
        }
    }
    getCurrentBoard(){
        return this.chessBoard.reference
    }
    getHistoryMoves(){
        return this.playHistory
    }
    getCapturedPieces(){
        return this.capturePiece
    }
}