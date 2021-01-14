export default function viewScreen(chessBoard){

    const functionToCallBack= {
        buttomStart:[],
        pieceInput:[],
        buttomMove:[],
        clickChessBoard:[]
    }

    this.buttomStart={
        subscribeFunction(fn){
            functionToCallBack.buttomStart.push(fn)
        }
    }

    this.colorInput={
        clearAll(){
            const optionSelect = document.querySelector("#select__color")
            while (optionSelect.childElementCount>0){
                const optionChildren = optionSelect.firstElementChild
                optionSelect.removeChild(optionChildren)
            }
        },
        addPiecesColor(value){
                const selectPiece = document.querySelector("#select__color")
                const optionPiece = document.createElement('option')
                optionPiece.classList.add("board__option")
                optionPiece.innerHTML= value
                selectPiece.appendChild(optionPiece)

        }
    }

    this.pieceInput={
        subscribeFunction(fn){
            functionToCallBack.pieceInput.push(fn)
        },
        clearAll(){
            const optionSelect = document.querySelector("#select__name")
            while (optionSelect.childElementCount>0){
                const optionChildren = optionSelect.firstElementChild
                optionSelect.removeChild(optionChildren)
            }
        },
        addPiecesName(arrayValue){
            arrayValue.forEach((value)=>{
                const selectPiece = document.querySelector("#select__name")
                const optionPiece = document.createElement('option')
                optionPiece.classList.add("board__option")
                optionPiece.innerHTML= value
                selectPiece.appendChild(optionPiece)
            })
        },
        selectNamePiece(namePiece){
            debugger
            const selectPiece = document.getElementById("select__name")
            selectPiece.value= namePiece
        }
    }

    this.coordinateInput={
        clearAll(){
            const optionSelect = document.querySelector("#select__coordinate")
            while (optionSelect.childElementCount>0){
                const optionChildren = optionSelect.firstElementChild
                optionSelect.removeChild(optionChildren)
            }
        },
        addPiecesCoordinates(arrayValue){
            arrayValue.forEach((value)=>{
                const selectPiece = document.querySelector("#select__coordinate")
                const optionPiece = document.createElement('option')
                optionPiece.classList.add("board__option")
                optionPiece.innerHTML= value
                selectPiece.appendChild(optionPiece)
            })
        },
        selectNamePiece(namePiece){
            const selectPiece = document.getElementById("select__coordinate")
            selectPiece.value= namePiece
        }
    }

    this.buttomMove={
        subscribeFunction(fn){
            functionToCallBack.buttomMove.push(fn)
        }
    }

    this.chessBoard={
        subscribeFunction(fn){
            functionToCallBack.clickChessBoard.push(fn)
        },
            //renderizar as peças conforme a chave (referência) do objeto.
        renderBoard(chessBoard){
            for (let key of Object.keys(chessBoard)){
                const divSquare= document.querySelector(`#${key}`)
                if(!!divSquare.childElementCount){
                    const divChildren = divSquare.firstElementChild
                    divSquare.removeChild(divChildren)
                }
                if(chessBoard[key]!==null){
                    const divImg = document.createElement('div')
                    const img = document.createElement('img')
                    divImg.classList.add("board__pieces")
                    img.src=`${chessBoard[key].img}.png`
                    img.classList.add('pieces__imagem')
                    divImg.appendChild(img)
                    divSquare.appendChild(divImg)           
                }
            }
        },
        highlighSquare:{
            clearHighlightSquares(piece){
                document.getElementById(`${piece.refPiece}`).classList.remove("move__piece--selected")
                piece.refMoviments.forEach((possibilitie)=>{
                    document.getElementById(`${possibilitie}`).classList.remove("move__piece--possibilities")
                })
            },
            addHighlightSquares(piece){
                document.getElementById(`${piece.refPiece}`).classList.add("move__piece--selected")
                piece.refMoviments.forEach((possibilitie)=>{
                    document.getElementById(`${possibilitie}`).classList.add("move__piece--possibilities")
                })
            }
        }
    }

    function notifyFunctions (objToCallBack,parameters){
        objToCallBack.forEach((fn)=>fn(parameters))
    }

    const starGameEvent={
        buttomStart(){
            const buttomStar= document.querySelector(`#button__start`)
            buttomStar.addEventListener("click", ()=>{
                notifyFunctions(functionToCallBack.buttomStart)
            })
        },
        pieceInput(){          
            const inputPiece= document.querySelector("#select__name")
            inputPiece.addEventListener('change', () =>{
                notifyFunctions(functionToCallBack.pieceInput,inputPiece.value)
            })
        },
        buttomMove(){
            const inputCoordinate = document.querySelector('#select__coordinate')
            document.querySelector(`#button__movement`).addEventListener("click", () =>{
                notifyFunctions(functionToCallBack.buttomMove,inputCoordinate.value)
            }) 
        },
        clickChessBoard(tagPosition){
            tagPosition.onclick= () => {
                const squareRefIdClick = tagPosition.id
                notifyFunctions(functionToCallBack.clickChessBoard,squareRefIdClick)
            }
        },
    }
    starGameEvent.buttomStart()
    starGameEvent.pieceInput()
    starGameEvent.buttomMove()
    boardCreation(chessBoard)
    
    function boardCreation(chessBoard){
        const board = document.querySelector('#board')
        let color = true
        let newColumn = 1
        for(let refId in chessBoard){
                const tagPosition = document.createElement('div')
                tagPosition.classList.add('board__square')
                tagPosition.id = `${refId}`
                starGameEvent.clickChessBoard(tagPosition)
                if(color===true){
                    tagPosition.classList.add('square__dark')
                    color=false
                }
                else{
                    tagPosition.classList.add('square__light')
                    color=true
                } 
                board.appendChild(tagPosition) 
                if(newColumn==8){
                    color = (color===true)?false:true 
                    newColumn=0
                }
               newColumn++
            }
        coordinatesCreation('#line','line')
        coordinatesCreation('#column','column')
    }

    //Renderizar as coordenadas ao lado tabuleiro.
    function coordinatesCreation(fatherDiv,classDiv){
        const board = document.querySelector(fatherDiv)
        for(let i=0; i<8;i++){
            const tagPosition = document.createElement('div')
            tagPosition.classList.add(classDiv)
            if(classDiv ==='column'){
                tagPosition.innerHTML=String.fromCharCode(65+i)
            }
            else{ 
                tagPosition.innerHTML=`${i+1}`
            }
            board.appendChild(tagPosition)
        
        }
    }
}
