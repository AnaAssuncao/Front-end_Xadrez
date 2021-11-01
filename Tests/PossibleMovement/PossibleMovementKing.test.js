import possibleMovementKing from "../../Game/PossibleMovement/PossibleMovementKing.js"
import {noMove,withMove,withMoveToEat} from "./PossibleMovementObj.js"

const King={
    color: "white",
    fullName: "kingWhite",
    functionPiece: possibleMovementKing,
    imgName: "kingWhite",
    isAtive: true,
    name: "King",
    position: null,
    possibleSpecialMovements: [],
    qtMovements: 0,
    refMovements: []
}

describe("Possible Movement King", ()=>{
    test("The King must not have possible moves",()=>{
        King.position="ref11"
        const chessBoardTest = noMove(King)
        const possibleMovement = King.functionPiece(chessBoardTest)
        expect(possibleMovement).toEqual([])
    })
    test("The King must have possible moves",()=>{
        King.position="ref44"
        const chessBoardTest = withMove(King)
        const possibleMovement = King.functionPiece(chessBoardTest)
        expect(possibleMovement).not.toEqual([])
    })
    test("The King must have possible moves",()=>{
        King.position="ref11"
        const refAdversaryPiece= "ref22"
        const chessBoardTest = withMoveToEat(King,refAdversaryPiece)
        const possibleMovement = King.functionPiece(chessBoardTest)
        expect(possibleMovement).toContain(refAdversaryPiece)
    })
}
)