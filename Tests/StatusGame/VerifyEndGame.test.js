import verifyEndGame from "../../Game/UpdateStatusGame/VerifyEndGame.js"
import defaultsObjects from "../../Game/DefaultsObjects/index.js"

const capturedPiece = new defaultsObjects.ClassCapturedPiece ()
const possibleMovement = ()=>{}

describe("Verify End Game", ()=>{
    test("No Should return End Game",()=>{
        const bishop = defaultsObjects.factoryMakePiece("Bishop-Left","Bishop-Leftwhite","white","bishopWhite","ref11",possibleMovement)
        capturedPiece.addCapturedPiece("Bishop-Leftwhite",bishop)
        const endGame = verifyEndGame(capturedPiece)
        expect(endGame).toEqual({
            isEndGame:false,
            winColor:null
        })
    })
    
    test("Should return End Game",()=>{
        const king = defaultsObjects.factoryMakePiece("King","Kingwhite","white","kingWhite","ref11",possibleMovement)
        capturedPiece.addCapturedPiece("Kingwhite",king)
        const endGame = verifyEndGame(capturedPiece)
        expect(endGame).toEqual({
            isEndGame:true,
            winColor:"black"
        })
    })
})
