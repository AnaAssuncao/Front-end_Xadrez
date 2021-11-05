import verifyCheck from "../../Game/UpdateStatusGame/verifyCheck.js"
import makePiece from "../../Game/DefaultsObjects/FactoryMakePiece.js"
import ClassPiecesBoard from "../../Game/DefaultsObjects/ClassPiecesBoard.js"

const piecesBoard = new ClassPiecesBoard ()
const possibleMovement = ()=>{}

const refIdKing = "ref11"
const colorKing = "white"
const bishop = makePiece("Bishop-Left","Bishop-Leftblack","black","bishopBlack","ref11",possibleMovement)
piecesBoard.addPieceOfRef("Bishop-Leftblack",bishop)
const king = makePiece("King","Kingwhite","white","kingWhite",refIdKing,possibleMovement)
piecesBoard.addPieceOfRef("kingWhite",king)
king.changePosition(refIdKing)

describe("verify Check", ()=>{
    test("No Should return check",()=>{
        bishop.changePosition("ref21")
        bishop.refMovements=["ref33"]
        const checks = verifyCheck(refIdKing,colorKing,piecesBoard)
        expect(checks).toEqual({
            qt:0,
            pieceCheck:null
        })
    })
    
    test("Should return check",()=>{
        bishop.changePosition("ref44")
        bishop.refMovements=["ref11"]
        const checks = verifyCheck(refIdKing,colorKing,piecesBoard)
        expect(checks).toEqual({
            qt:1,
            pieceCheck:"Bishop-Leftblack"
        })
    })
})