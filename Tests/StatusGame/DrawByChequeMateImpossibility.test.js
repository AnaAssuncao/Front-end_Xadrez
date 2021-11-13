import drawByChequeMateImpossibility from "../../Game/UpdateStatusGame/DrawByChequeMateImpossibility.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"
import movementsPossibilities from "../../Game/MovementsPossibilities/index.js"

const chessBoard = new defaultsObjects.ClassChessBoard()
const piecesBoard = new defaultsObjects.ClassPiecesBoard()


const createPiece = (typePiece, namePiece, refPiece,colorPiece)=>{
    const piece = defaultsObjects.factoryMakePiece.apply({chessBoard},[typePiece,namePiece,colorPiece,namePiece,refPiece,movementsPossibilities[typePiece]])
    piecesBoard.addPieceOfRef(namePiece,piece)
    piece.changePosition(refPiece)
    chessBoard.addPieceOfRef(refPiece,piece)
    return piece
}

const kingWhite = createPiece("king","Kingwhite","ref11","white")
const kingBlack = createPiece("king","Kingblack","ref58","black")
const bishopBlack=createPiece("bishop","Bishop-Leftblack","ref55","black")

describe("Draw By Cheque Mate Impossibility", ()=>{   
    test("Should draw",()=>{
        expect(drawByChequeMateImpossibility(piecesBoard)).toBeTruthy()
    })
})