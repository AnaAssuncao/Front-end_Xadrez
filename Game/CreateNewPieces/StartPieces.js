import defaultObjets from "../DefaultsObjects/index.js"
import movementsPossibilities from "../MovementsPossibilities/index.js"

function startPieces(chessBoard=this.chessBoard,piecesBoard=this.piecesBoard,statusGame=this.statusGame){
    const objStarBoard={
        starPiecesBlack:defaultObjets.objBlackPieces,
        starPiecesWhite:defaultObjets.objWhitePieces,
        namePiece:defaultObjets.objNamePieces,
        functionPieces:[movementsPossibilities.tower,movementsPossibilities.knight,movementsPossibilities.bishop,movementsPossibilities.queen,movementsPossibilities.king, movementsPossibilities.bishop,movementsPossibilities.knight, movementsPossibilities.tower,
            movementsPossibilities.pawn, movementsPossibilities.pawn, movementsPossibilities.pawn, movementsPossibilities.pawn, movementsPossibilities.pawn, movementsPossibilities.pawn, movementsPossibilities.pawn, movementsPossibilities.pawn]
    }

    for (let i in objStarBoard.starPiecesWhite) {
        const refLine= (parseInt(i/8)+1)
        const refColumn= (i%8+1)
        const keyChess = `ref${refColumn}${refLine}`
        const keyPieces = objStarBoard.namePiece[i] + statusGame.colorPieces.bottom
        const newPiece= defaultObjets.factoryMakePiece.apply(this,[objStarBoard.namePiece[i],keyPieces,statusGame.colorPieces.bottom,objStarBoard.starPiecesWhite[i],keyChess,objStarBoard.functionPieces[i]])
        piecesBoard.addPieceOfRef(keyPieces,newPiece)
        chessBoard.reference[keyChess]= newPiece
    }
    for (let i in objStarBoard.starPiecesBlack) {
        const refColumn= (i%8+1)
        const refLine= (8 - parseInt(i/8))
        const keyChess = `ref${refColumn}${refLine}`
        const keyPieces = objStarBoard.namePiece[i]+ statusGame.colorPieces.top
        const newPiece= defaultObjets.factoryMakePiece.apply(this,[objStarBoard.namePiece[i],keyPieces,statusGame.colorPieces.top,objStarBoard.starPiecesBlack[i],keyChess, objStarBoard.functionPieces[i]])
        piecesBoard.addPieceOfRef(keyPieces,newPiece)
        chessBoard.reference[keyChess]= newPiece
    }
}

export default startPieces