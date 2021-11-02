import ClassCapturedPiece from "./ClassCapturedPiece.js"
import ClassChessBoard from "./ClassChessBoard.js"
import ClassPiecesBoard from "./ClassPiecesBoard.js"
import ClassPiecesPromotion from "./ClassPiecesPromotion.js"
import ClassPlayHistory from "./ClassPlayHistory.js"
import ClassSpecialMovement from "./ClassSpecialMovement.js"
import ClassStatusGame from "./ClassStatusGame.js"

const objBlackPieces=["towerBlack","knightBlack","bishopBlack","queenBlack","kingBlack","bishopBlack","knightBlack","towerBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack"]
const objWhitePieces=["towerWhite","knightWhite","bishopWhite","queenWhite","kingWhite","bishopWhite","knightWhite","towerWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite"]
const objNamePieces =["Tower-Left","Knight-Left","Bishop-Left","Queen","King","Bishop-Right","Knight-Right","Tower-Right","Pawn-1","Pawn-2","Pawn-3","Pawn-4","Pawn-5","Pawn-6","Pawn-7","Pawn-8"]

export default {
    ClassCapturedPiece,
    ClassChessBoard,
    ClassPiecesBoard,
    ClassPiecesPromotion,
    ClassPlayHistory,
    ClassSpecialMovement,
    ClassStatusGame,
    objBlackPieces,
    objWhitePieces,
    objNamePieces,
}