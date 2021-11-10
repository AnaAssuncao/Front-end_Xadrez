import makeMovements from "../../Game/makeMovements/index.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"
import movementsPossibilities from "../../Game/MovementsPossibilities/index.js"

const chessBoard = new defaultsObjects.ClassChessBoard()
const specialMovement = new defaultsObjects.ClassSpecialMovement ()
const playHistory = new defaultsObjects.ClassPlayHistory ()
const capturedPiece = new defaultsObjects.ClassCapturedPiece ()
const piecesBoard = new defaultsObjects.ClassPiecesBoard()

const color = "white"
const king = defaultsObjects.factoryMakePiece.apply({chessBoard},["King","Kingwhite",color,"kingWhite","ref51",movementsPossibilities.king])
piecesBoard.addPieceOfRef("Kingwhite",king)
chessBoard.addPieceOfRef("ref51",king)
const towerLeft = defaultsObjects.factoryMakePiece.apply({chessBoard},["Tower","Tower-Leftwhite",color,"Towerwhite","ref11",movementsPossibilities.tower])
piecesBoard.addPieceOfRef("Tower-Leftwhite",towerLeft)
chessBoard.addPieceOfRef("ref11",towerLeft)

const possibleMovementKing = 'ref31'
const possibleMovementTower= 'ref41'
specialMovement.addRoqueMovement(true,king,possibleMovementKing,towerLeft,possibleMovementTower)
king.changeMovementsPossibilities([...king.refMovements,possibleMovementKing])
const specialRoque = {
    positions:possibleMovementKing,
    type:"roque"
}
king.addPossibleSpecialMovements(specialRoque)

describe("Movement Roque",()=>{
    test("Should change piece position",()=>{
        const informationPieceToMove = {
            color: "white",
            fullName: "Kingwhite",
            piecePromotion: null,
            refId: possibleMovementKing,
            specialMovement: true,
            typeMovement: "roque",
        }
        makeMovements.movementRoque.apply({chessBoard,specialMovement,playHistory,piecesBoard,capturedPiece},[informationPieceToMove])
        expect(chessBoard.reference[possibleMovementKing]).toEqual(king)
        expect(chessBoard.reference[possibleMovementTower]).toEqual(towerLeft)
    })
})