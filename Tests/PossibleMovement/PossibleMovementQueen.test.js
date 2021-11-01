import possibleMovementQueen from "../../Game/PossibleMovement/PossibleMovementQueen.js"
import {noMove,withMove,withMoveToEat} from "./PossibleMovementObj.js"

const queen={
    color: "white",
    fullName: "Queenwhite",
    functionPiece: possibleMovementQueen,
    imgName: "queenWhite",
    isAtive: true,
    name: "Queen",
    position: null,
    possibleSpecialMovements: [],
    qtMovements: 0,
    refMovements: []
}

describe("Possible Movement Queen", ()=>{
    test("The queen must not have possible moves",()=>{
        queen.position="ref11"
        const chessBoardTest = noMove(queen)
        const possibleMovements = queen.functionPiece(chessBoardTest)
        expect(possibleMovements).toEqual([])
    })
    test("The queen must have possible moves",()=>{
        queen.position="ref44"
        const chessBoardTest = withMove(queen)
        const possibleMovements = queen.functionPiece(chessBoardTest)
        expect(possibleMovements).not.toEqual([])
        const refPossibleMovement = "ref41"
        expect(possibleMovements).toContain(refPossibleMovement)    
    })
    test("The queen must have possible moves",()=>{
        queen.position="ref11"
        const refAdversaryPiece= "ref55"
        const chessBoardTest = withMoveToEat(queen,refAdversaryPiece)
        const possibleMovements = queen.functionPiece(chessBoardTest)
        expect(possibleMovements).toContain(refAdversaryPiece)
    })
}
)