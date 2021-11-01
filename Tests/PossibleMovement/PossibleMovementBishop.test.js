import possibleMovementBishop from "../../Game/PossibleMovement/PossibleMovementBishop.js"
import {noMove,withMove,withMoveToEat} from "./PossibleMovementObj.js"

const bishop={
    color: "white",
    fullName: "Bishop-Leftwhite",
    functionPiece: possibleMovementBishop,
    imgName: "bishopWhite",
    isAtive: true,
    name: "Bishop-Left",
    position: null,
    possibleSpecialMovements: [],
    qtMovements: 0,
    refMovements: []
}

describe("Possible Movement Bishop", ()=>{
    test("The bishop must not have possible moves",()=>{
        bishop.position="ref11"
        const chessBoardTest = noMove(bishop)
        const possibleMovements = bishop.functionPiece(chessBoardTest)
        expect(possibleMovements).toEqual([])
    })
    test("The bishop must have possible moves",()=>{
        bishop.position="ref44"
        const chessBoardTest = withMove(bishop)
        const possibleMovements = bishop.functionPiece(chessBoardTest)
        expect(possibleMovements).not.toEqual([])
        const refPossibleMovement = "ref77"
        expect(possibleMovements).toContain(refPossibleMovement)
    })
    test("The bishop must have possible moves",()=>{
        bishop.position="ref11"
        const refAdversaryPiece= "ref22"
        const chessBoardTest = withMoveToEat(bishop,refAdversaryPiece)
        const possibleMovements = bishop.functionPiece(chessBoardTest)
        expect(possibleMovements).toContain(refAdversaryPiece)
    })
}
)