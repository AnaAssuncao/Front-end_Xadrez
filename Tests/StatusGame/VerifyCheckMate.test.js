import verifyCheckMate from "../../Game/UpdateStatusGame/VerifyCheckMate.js"
import makePiece from "../../Game/DefaultsObjects/FactoryMakePiece.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"
import movementsPossibilities from "../../Game/MovementsPossibilities/index.js"

const chessBoard = new defaultsObjects.ClassChessBoard()
const piecesBoard = new defaultsObjects.ClassPiecesBoard()
const statusGame = new defaultsObjects.ClassStatusGame()

const nameKing = "Kingwhite"
const colorKing = "white"
const refIdKing = "ref18"
const queen1Black = makePiece.apply({chessBoard},["Queen","Queen-1black","black","queenBlack","ref26",movementsPossibilities.queen])
piecesBoard.addPieceOfRef("Queenblack",queen1Black)
const queen2Black = makePiece.apply({chessBoard},["Queen","Queen-2black","black","queenBlack","ref26",movementsPossibilities.queen])
piecesBoard.addPieceOfRef("Queenblack",queen2Black)
const king = makePiece.apply({chessBoard},["King",nameKing,"white","kingWhite",refIdKing,movementsPossibilities.king])
piecesBoard.addPieceOfRef(nameKing,king)
statusGame.checkKing.refIdPathsToCheck=[refIdKing,"ref17","ref27","ref28"]
king.changePosition(refIdKing)
chessBoard.addPieceOfRef("ref26",king)

describe("verify Check", ()=>{
    test("No Should return checkMate",()=>{
        movementsPossibilities.updateAllMovements(piecesBoard)
        const refQueen= ["ref15","ref86"]
        const checks ={
            qt:1,
            pieceCheck:"Queen-1black"
        }
        queen1Black.changePosition(refQueen[0])
        chessBoard.addPieceOfRef(refQueen[0],queen1Black)
        queen2Black.changePosition(refQueen[1])
        chessBoard.addPieceOfRef(refQueen[1],queen2Black)

        expect(verifyCheckMate(nameKing,colorKing,checks,chessBoard,piecesBoard,statusGame)).toBeFalsy()

        chessBoard.deletePieceOfRef(refQueen[0])
        chessBoard.deletePieceOfRef(refQueen[1])
    })
    
    test("Should return checkMate",()=>{
        movementsPossibilities.updateAllMovements(piecesBoard)
        const refQueen= ["ref26","ref45"]
        const checks ={
            qt:1,
            pieceCheck:"Queen-1black"
        }
        queen1Black.changePosition(refQueen[0])
        chessBoard.addPieceOfRef(refQueen[0],queen1Black)
        queen2Black.changePosition(refQueen[1])
        chessBoard.addPieceOfRef(refQueen[1],queen2Black)

        expect(verifyCheckMate(nameKing,colorKing,checks,chessBoard,piecesBoard,statusGame)).toBeTruthy()

        chessBoard.deletePieceOfRef(refQueen[0])
        chessBoard.deletePieceOfRef(refQueen[1])
    })
})