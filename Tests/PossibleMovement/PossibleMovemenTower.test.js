import possibleMovementTower from "../../Game/PossibleMovement/PossibleMovementTower.js"
import makePiece from "../../Game/DefaultsObjects/FactoryMakePiece.js"
import ChessBoard from "../../Game/DefaultsObjects/ClassChessBoard.js"

const tower = makePiece("Tower","towerWhite","white","Towerwhite","ref11",possibleMovementTower)
const chessBoard = new ChessBoard ()

describe("Possible Movement Tower", ()=>{
    test("The tower should have possible moves",()=>{
        const refID = "ref44"
        tower.changePosition(refID)
        chessBoard.addPieceOfRef(refID,tower)
        const possibleMovements = tower.functionPiece(chessBoard.reference)
        expect(possibleMovements).not.toEqual([])

        const refPossibleMovement = "ref84"
        expect(possibleMovements).toContain(refPossibleMovement)

        chessBoard.deletePieceOfRef(refID)
    })
    test("The tower should have possible eat adversary piece",()=>{
        const refID = "ref11"
        tower.changePosition(refID)
        chessBoard.addPieceOfRef(refID,tower)
        const refAdversaryPiece= "ref18"
        const adversaryPiece = makePiece("Tower-Left","Tower-black","black","towerBlack",refAdversaryPiece,possibleMovementTower)
        chessBoard.addPieceOfRef(refAdversaryPiece,adversaryPiece)
        const possibleMovements = tower.functionPiece(chessBoard.reference)
        expect(possibleMovements).toContain(refAdversaryPiece)

        chessBoard.deletePieceOfRef(refID)
        chessBoard.deletePieceOfRef(refAdversaryPiece)
    })
    test("The tower should not have possible moves",()=>{
        const refID = "ref11"
        tower.position=refID
        tower.changePosition(refID)
        const refAllyPiece= ["ref12","ref21"]
        const allyPiece = makePiece("Pawn-1","Pawn-1-white","white","Pawn-2White",refAllyPiece,possibleMovementTower)
        refAllyPiece.forEach((refIdAlly)=>{
            chessBoard.addPieceOfRef(refIdAlly,allyPiece)
        })
        const possibleMovements = tower.functionPiece(chessBoard.reference)
        expect(possibleMovements).toEqual([])

        chessBoard.deletePieceOfRef(refID)
        refAllyPiece.forEach((refIdAlly)=>{
            chessBoard.deletePieceOfRef(refIdAlly)
        })
    })
}
)