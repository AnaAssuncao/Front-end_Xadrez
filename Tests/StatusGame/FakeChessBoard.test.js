import {newFakeChessBoard,verifyCheckInFakeBoard} from "../../Game/UpdateStatusGame/FakeChessBoard.js"
import makePiece from "../../Game/DefaultsObjects/FactoryMakePiece.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"
import movementsPossibilities from "../../Game/MovementsPossibilities/index.js"

const chessBoard = new defaultsObjects.ClassChessBoard()
const piecesBoard = new defaultsObjects.ClassPiecesBoard()

const nameKing = "Kingwhite"
const colorKing = "white"
const refIdKing = "ref18"
const king = makePiece.apply({chessBoard},["King",nameKing,"white","kingWhite",refIdKing,movementsPossibilities.king])
piecesBoard.addPieceOfRef(nameKing,king)
king.changePosition(refIdKing)
chessBoard.addPieceOfRef(refIdKing,king)

describe("New FakeChess Board", ()=>{
    test("",()=>{
        const newRefId = "ref55"
        const fakeBoard = newFakeChessBoard(refIdKing,newRefId,chessBoard)
        const newChessBoard = new defaultsObjects.ClassChessBoard()
        newChessBoard.addPieceOfRef(newRefId,king)
        expect(fakeBoard).toEqual(newChessBoard)
    })
})

const piecesAdversity ={}
const createQueen = (fullName) =>{
    piecesAdversity[fullName]=makePiece.apply({chessBoard},["Queen",fullName,"black","queen1Black","ref26",movementsPossibilities.queen])
    piecesBoard.addPieceOfRef("Queenblack",fullName)
}
createQueen("Queen1black")
createQueen("Queen2black")
const addPieceBoard = (refQueen)=>{
    for(let piece in piecesAdversity){
        piecesAdversity[piece].changePosition(refQueen[piece])
        chessBoard.addPieceOfRef(refQueen[piece],piecesAdversity[piece])
    }
}
const deletePieceBoard= (refQueen)=>{
    for(let piece in piecesAdversity){
        chessBoard.deletePieceOfRef(refQueen[piece])
    }
}

describe("Verify Check In FakeBoard", ()=>{
    king.changePosition(refIdKing)
    chessBoard.addPieceOfRef(refIdKing,king)

    test("No Should return check",()=>{
        const refQueen= {
            Queen1black:"ref51",
            Queen2black:"ref86"
        }
        addPieceBoard(refQueen)
        expect(verifyCheckInFakeBoard(chessBoard,refIdKing,colorKing)).toBeFalsy()
        deletePieceBoard(refQueen)
    })
    test("Should return check",()=>{
        const refQueen= {
            Queen1black:"ref26",
            Queen2black:"ref45"
        }
        addPieceBoard(refQueen)
        expect(verifyCheckInFakeBoard(chessBoard,refIdKing,colorKing)).toBeTruthy()
        deletePieceBoard(refQueen)
    })
})
