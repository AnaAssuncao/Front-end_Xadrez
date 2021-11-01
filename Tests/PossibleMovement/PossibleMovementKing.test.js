import possibleMovementKing from "../../Game/PossibleMovement/PossibleMovementKing.js"
import {noMove,withMove,withMoveToEat} from "./PossibleMovementObj.js"

const King={
    color: "white",
    fullName: "Kingwhite",
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
        const possibleMovements = King.functionPiece(chessBoardTest)
        expect(possibleMovements).toEqual([])
    })
    test("The King must have possible moves",()=>{
        King.position="ref44"
        const chessBoardTest = withMove(King)
        const possibleMovements = King.functionPiece(chessBoardTest)
        expect(possibleMovements).not.toEqual([])
        const refPossibleMovement = "ref55"
        expect(possibleMovements).toContain(refPossibleMovement)    
    })
    test("The King must have possible moves",()=>{
        King.position="ref11"
        const refAdversaryPiece= "ref22"
        const chessBoardTest = withMoveToEat(King,refAdversaryPiece)
        const possibleMovements = King.functionPiece(chessBoardTest)
        expect(possibleMovements).toContain(refAdversaryPiece)
    })
}
)