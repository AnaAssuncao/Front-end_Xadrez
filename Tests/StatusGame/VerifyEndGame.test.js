import verifyEndGame from "../../Game/StatusGame/VerifyEndGame.js"
import makePiece from "../../Game/DefaultsObjects/FactoryMakePiece.js"
import ClassCapturedPiece from "../../Game/DefaultsObjects/ClassCapturedPiece.js"

const capturedPiece = new ClassCapturedPiece ()
const possibleMovement = ()=>{}


describe("Verify End Game", ()=>{
    test("No Should return End Game",()=>{
        const bishop = makePiece("Bishop-Left","Bishop-Leftwhite","white","bishopWhite","ref11",possibleMovement)
        capturedPiece.addCapturedPiece("Bishop-Leftwhite",bishop)
        const endGame = verifyEndGame(capturedPiece)
        expect(endGame).toEqual({
            endGame:false,
            winColor:null
        })
    })
    
    test("Should return End Game",()=>{
        const king = makePiece("King","Kingwhite","white","kingWhite","ref11",possibleMovement)
        capturedPiece.addCapturedPiece("Kingwhite",king)
        console.log(capturedPiece)
        const endGame = verifyEndGame(capturedPiece)
        expect(endGame).toEqual({
            endGame:true,
            winColor:"black"
        })
    })
})
