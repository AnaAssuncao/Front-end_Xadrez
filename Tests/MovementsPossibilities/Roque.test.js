import movementsPossibilities from "../../Game/MovementsPossibilities/index.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"

const colors={
    top:"black",
    bottom:"white"
}
const chessBoard = new defaultsObjects.ClassChessBoard()
const piecesBoard = new defaultsObjects.ClassPiecesBoard()
const statusGame = new defaultsObjects.ClassStatusGame(colors)

const color = "white"
const king = defaultsObjects.factoryMakePiece.apply({chessBoard},["King","Kingwhite",color,"kingWhite","ref51",movementsPossibilities.king])
piecesBoard.addPieceOfRef("Kingwhite",king)
chessBoard.addPieceOfRef("ref51",king)
const towerLeft = defaultsObjects.factoryMakePiece.apply({chessBoard},["Tower","Tower-Leftwhite",color,"Towerwhite","ref11",movementsPossibilities.tower])
piecesBoard.addPieceOfRef("Tower-Leftwhite",towerLeft)
chessBoard.addPieceOfRef("ref11",towerLeft)
const towerRight = defaultsObjects.factoryMakePiece.apply({chessBoard},["Tower","Tower-Righttwhite",color,"Towerwhite","ref81",movementsPossibilities.tower])
piecesBoard.addPieceOfRef("Tower-Rightwhite",towerRight)
chessBoard.addPieceOfRef("ref81",towerRight)

describe("Possible Movement Roque", ()=>{
    test("Should happen big Roque special movement",()=>{
        const specialMovement = new defaultsObjects.ClassSpecialMovement()
        towerRight.disablePiece()
        movementsPossibilities.updateAllMovements(piecesBoard)
        movementsPossibilities.roque(color,piecesBoard,statusGame,specialMovement)
        const roqueMovement = {
            isPossible: true,
            king: king,
            newMovementTower: ['ref41'],
            positionKingToRoque: ['ref31'],
            tower: [towerLeft]
        }
        expect(specialMovement.roque).toEqual(roqueMovement)
    })
    test("Should happen small Roque special movement",()=>{
        const specialMovement = new defaultsObjects.ClassSpecialMovement()
        towerRight.enablePiece()
        towerLeft.disablePiece()
        movementsPossibilities.updateAllMovements(piecesBoard)
        movementsPossibilities.roque(color,piecesBoard,statusGame,specialMovement)
        const roqueMovement = {
            isPossible: true,
            king: king,
            newMovementTower: ['ref61'],
            positionKingToRoque: ['ref71'],
            tower: [towerRight]
        }
        expect(specialMovement.roque).toEqual(roqueMovement)
    })
    test("No should happen Roque special movement, because check",()=>{
        const specialMovement = new defaultsObjects.ClassSpecialMovement()
        const pieceAdversary = defaultsObjects.factoryMakePiece.apply({chessBoard},["Bishop-Left","Bishop-Leftblack","black","bishopBlack","ref33",movementsPossibilities.bishop])
        piecesBoard.addPieceOfRef("Bishop-Leftblack",pieceAdversary)
        chessBoard.addPieceOfRef("ref33",pieceAdversary)
        statusGame.updateCheck(true)
        movementsPossibilities.updateAllMovements(piecesBoard)
        movementsPossibilities.roque(color,piecesBoard,statusGame,specialMovement)
        expect(specialMovement.roque.isPossible).toBeFalsy()
    })
})