import createObjHistory from "../../Game/History/CreateObjHistory.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"

const chessBoard = new defaultsObjects.ClassChessBoard()
const piecesBoard = new defaultsObjects.ClassPiecesBoard()
const specialMovement = new defaultsObjects.ClassSpecialMovement()
const piecesPromotion = new defaultsObjects.ClassPiecesPromotion()
const possibleMovement = ()=>{}

const refID = "ref12"
const fullNamePiece = "Pawnwhite"
const pawn = defaultsObjects.factoryMakePiece("Pawn-1",fullNamePiece,"white","pawn-1White",refID,possibleMovement)
chessBoard.addPieceOfRef(refID,pawn)
piecesBoard.addPieceOfRef(fullNamePiece,pawn)

describe("Create Obj History", ()=>{
    test("Should create an object history with Piece of the movement",()=>{ 
        const typeMovement = "movementPiece"
        const informationPieceSelect = {            
            color: "white",
            fullName: fullNamePiece,
            piecePromotion: null,
            refId: "ref13",
            specialMovement: false,
            typeMovement: typeMovement}
        const arrayPiece=[informationPieceSelect]
        const objHistory = createObjHistory(arrayPiece,typeMovement,chessBoard,piecesBoard,specialMovement,piecesPromotion)
        const objExpectedHistory ={
            newRefId: ['ref13'],
            pieceCaptured: null,
            piecesPlayed: [pawn],
            typeMovement: typeMovement
        }
        expect(objHistory).toEqual(objExpectedHistory)
    })

    test("Should create an object history with Piece of the movement and the captured piece",()=>{
        const typeMovement = "movementPiece"
        const refAdversaryPiece= "ref23"
        const informationPieceSelect = {            
            color: "white",
            fullName: fullNamePiece,
            piecePromotion: null,
            refId: refAdversaryPiece,
            specialMovement: false,
            typeMovement:typeMovement}
        const adversaryPiece = defaultsObjects.factoryMakePiece("Pawn-Left","Pawn-black","black","pawnBlack",refAdversaryPiece,possibleMovement)
        chessBoard.addPieceOfRef(refAdversaryPiece,adversaryPiece)

        const arrayPiece=[informationPieceSelect]
        const objHistory = createObjHistory(arrayPiece,typeMovement,chessBoard,piecesBoard,specialMovement,piecesPromotion)
        const objExpectedHistory ={
            newRefId: ['ref23'],
            pieceCaptured: adversaryPiece,
            piecesPlayed: [pawn],
            typeMovement: typeMovement
        }

        expect(objHistory).not.toEqual(objExpectedHistory)

        chessBoard.deletePieceOfRef(refAdversaryPiece)  
    })
})