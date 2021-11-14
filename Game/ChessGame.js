
import movementsPossibilities from "./MovementsPossibilities/index.js"
import defaultObjets from "./DefaultsObjects/index.js"
import saveHistory from "./History/index.js"
import makeMovements from "./MakeMovements/index.js"
import updateStatusGame from "./UpdateStatusGame/index.js"
import playAssistance from "./PlayAssistance/index.js"
import returnChangePiece from "./ReturnMovement/returnChangePiece.js"
import createNewPieces from "./CreateNewPieces/index.js"

export default class CreateGame {
    constructor(colorPlayers){
        this.chessBoard= new defaultObjets.ClassChessBoard()
        //chave Nome+cor - conforme obj chessBoard
        this.piecesBoard= {}
    
        //Cor peças
        this.colorPieceBoard= colorPlayers

        this.capturedPiece={}

        this.statusGame=new defaultObjets.ClassStatusGame(colorPlayers)

        this.statusDrawn={}

        this.playHistory=[]

        this.specialMovement={}

        this.piecesPromotion={}
    }

    starObjGame(){
        this.chessBoard= new defaultObjets.ClassChessBoard()
        this.piecesBoard=new defaultObjets.ClassPiecesBoard()
        this.statusGame=new defaultObjets.ClassStatusGame({top:this.statusGame.colorPieces.top,bottom:this.statusGame.colorPieces.bottom})
        this.capturedPiece=new defaultObjets.ClassCapturedPiece()
        this.playHistory=new defaultObjets.ClassPlayHistory()
        this.specialMovement=new defaultObjets.ClassSpecialMovement()
        this.piecesPromotion=new defaultObjets.ClassPiecesPromotion()

        createNewPieces.startPieces.apply(this)
        movementsPossibilities.updateAllMovements.apply(this)
    }

    setMove(informationPieceSelect){
        const objOfMovedPiece = this.piecesBoard.pieces[informationPieceSelect.fullName]
        const isMove = objOfMovedPiece.refMovements.includes(informationPieceSelect.refId)
        if(isMove){
            saveHistory.setPlay.apply(this,[[informationPieceSelect]])
            makeMovements.changePiecePosition.apply(this,[objOfMovedPiece,informationPieceSelect])
            this.updateChess(objOfMovedPiece.color)
        }

        return isMove
    }

    setSpecialMovement(informationPieceToMove){
        const piece = this.piecesBoard.pieces[informationPieceToMove.fullName]
        let isSpecialMovement = false
        if(this.specialMovement.roque.isPossible===true){
            if(informationPieceToMove.fullName===this.specialMovement.roque.king.fullName){
                if(this.specialMovement.roque.positionKingToRoque.includes(informationPieceToMove.refId)){
                    makeMovements.movementRoque.apply(this,[informationPieceToMove])
                    isSpecialMovement = true
                } 
            }
        }
        if(this.specialMovement.enPassant.isPossible===true){
            if(this.specialMovement.enPassant.refIdAtack===informationPieceToMove.refId){
                makeMovements.movementEnPassant.apply(this,[informationPieceToMove])
                isSpecialMovement = true
            }
        }
        if(this.specialMovement.pawnPromotion.isPossible===true){
            if(this.specialMovement.pawnPromotion.namesPawn.includes(informationPieceToMove.fullName)){
                makeMovements.movementPawnPromotion.apply(this,[informationPieceToMove])
                isSpecialMovement = true
            }
        }
        this.updateChess(piece.color)
        return isSpecialMovement
    }

    setReturnMovement(){
        this.statusGame.clearStatus()
        returnChangePiece.apply(this)
        this.updateChess(this.colorPieceBoard.play)
    }
    
    updateChess(color){
        movementsPossibilities.updateAllMovements.apply(this)
        this.specialMovement=new defaultObjets.ClassSpecialMovement()
        movementsPossibilities.updateSpecialMoves.apply(this,[color])
        updateStatusGame.verifyStatusGame.apply(this,[color])
        playAssistance.updateFilterMovement.apply(this,[this.statusGame.colorPieces.play])
    }

    getStatusGame(){
        return {
            endGame:this.statusGame.endGame,
            check: this.statusGame.checkKing.check,
            checkMate: this.statusGame.checkKing.checkMate,
            draw: this.statusGame.draw,
            winColor:this.statusGame.winColor
        }
    }
    getCurrentBoard(){
        return this.chessBoard.reference
    }
    getHistoryMoves(){
        return this.playHistory.history
    }
    getCapturedPieces(){
        return this.capturedPiece.pieces
    }
}