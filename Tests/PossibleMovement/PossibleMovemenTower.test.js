import pssibleMovementTower from "../../Game/PossibleMovement/PossibleMovementTower.js"
import {noMove,withMove,withMoveToEat} from "./PossibleMovementObj.js"

const tower={
    color: "white",
    fullName: "Tower-Leftwhite",
    functionPiece: pssibleMovementTower,
    imgName: "towerWhite",
    isAtive: true,
    name: "Tower-Left",
    position: null,
    possibleSpecialMovements: [],
    qtMovements: 0,
    refMovements: []
}

describe("Possible Movement Tower", ()=>{
    test("The tower should not have possible moves",()=>{
        tower.position="ref11"
        const chessBoardTest = noMove(tower)
        const possibleMovements = tower.functionPiece(chessBoardTest)
        expect(possibleMovements).toEqual([])
    })
    test("The tower should have possible moves",()=>{
        tower.position="ref44"
        const chessBoardTest = withMove(tower)
        const possibleMovements = tower.functionPiece(chessBoardTest)
        expect(possibleMovements).not.toEqual([])
        const refPossibleMovement = "ref84"
        expect(possibleMovements).toContain(refPossibleMovement)    
    })
    test("The tower should have possible moves",()=>{
        tower.position="ref11"
        const refAdversaryPiece= "ref18"
        const chessBoardTest = withMoveToEat(tower,refAdversaryPiece)
        const possibleMovements = tower.functionPiece(chessBoardTest)
        expect(possibleMovements).toContain(refAdversaryPiece)
    })
}
)