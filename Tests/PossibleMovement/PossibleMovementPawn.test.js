import possibleMovementPawn from "../../Game/PossibleMovement/PossibleMovementPawn.js"
import {noMove,withMove,withMoveToEat} from "./PossibleMovementObj.js"

const pawn={
    color: "white",
    fullName: "Pawn-1white",
    functionPiece: possibleMovementPawn,
    imgName: "pawnWhite",
    isAtive: true,
    name: "Pawn-1",
    position: null,
    possibleSpecialMovements: [],
    qtMovements: 0,
    refMovements: []
}
const bottomPieceColor = "white"

describe("Possible Movement pawn", ()=>{
    test("The pawn should not have possible moves",()=>{
        pawn.position="ref11"
        const chessBoardTest = noMove(pawn)
        const possibleMovements = pawn.functionPiece(chessBoardTest,bottomPieceColor)
        expect(possibleMovements).toEqual([])
    })
    test("The pawn should have possible moves",()=>{
        pawn.position="ref44"
        const chessBoardTest = withMove(pawn)
        const possibleMovements = pawn.functionPiece(chessBoardTest,bottomPieceColor)
        expect(possibleMovements).not.toEqual([])
        const refPossibleMovement = "ref45"
        expect(possibleMovements).toContain(refPossibleMovement)    
    })
    test("Should be possible for the pawn to jump two squares on the first move",()=>{
        pawn.position="ref12"
        const chessBoardTest = withMove(pawn)
        const possibleMovements = pawn.functionPiece(chessBoardTest,bottomPieceColor)
        expect(possibleMovements).not.toEqual([])
        const refPossibleMovement = "ref14"
        expect(possibleMovements).toContain(refPossibleMovement)    
    })
    test("The pawn should have possible moves",()=>{
        pawn.position="ref11"
        const refAdversaryPiece= "ref22"
        const chessBoardTest = withMoveToEat(pawn,refAdversaryPiece)
        const possibleMovements = pawn.functionPiece(chessBoardTest,bottomPieceColor)
        expect(possibleMovements).toContain(refAdversaryPiece)
    })
})