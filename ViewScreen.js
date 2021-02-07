export default function viewScreen(chessBoard){

    const functionToCallBack= {
        buttomStart:[],
        pieceInput:[],
        buttomMove:[],
        clickChessBoard:[],
        buttomBackMoviment:[],
        piecesPromotion:[]
    }

    this.buttomStart={
        subscribeFunction(fn){
            functionToCallBack.buttomStart.push(fn)
        }
    }

    this.buttomBackMoviment={
        subscribeFunction(fn){
            functionToCallBack.buttomBackMoviment.push(fn)
        }
    }

    this.colorInput={
        colorIdClass:{
            idInput:"#select__color",
            classOption:"board__option"
        },
        clearAll(){
            clearOptionsInput(this.colorIdClass.idInput)
        },
        addPiecesColor(value){
            addOptionsInput(value,this.colorIdClass)
        }
    }

    this.pieceInput={
        subscribeFunction(fn){
            functionToCallBack.pieceInput.push(fn)
        },
        pieceIdClass:{
            idInput:"#select__name",
            classOption:"board__option"
        },
        clearAll(){
            clearOptionsInput(this.pieceIdClass.idInput)
        },
        addPiecesName(arrayValue){
            addOptionsInput(arrayValue,this.pieceIdClass)    
        },
        selectNamePiece(namePiece){
            const selectPiece = document.getElementById("select__name")
            selectPiece.value= namePiece
        }
    }

    this.coordinateInput={
        coordinateIdClass:{
            idInput:"#select__coordinate",
            classOption:"board__option"
        },
        clearAll(){
            clearOptionsInput(this.coordinateIdClass.idInput)
        },
        addPiecesCoordinates(arrayValue){
            addOptionsInput(arrayValue,this.coordinateIdClass)
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
                    const divImg = document.createElement("div")
                    const img = document.createElement("img")
                    divImg.classList.add("board__pieces")
                    img.src=`${chessBoard[key].img}.png`
                    img.classList.add("pieces__imagem")
                    img.draggable = true
                    img.addEventListener("dragstart", e=>{
                    notifyFunctions(functionToCallBack.clickChessBoard,chessBoard[key].position)})
                    divImg.appendChild(img)
                    divSquare.appendChild(divImg)           
                }
            }
        },
        highlighSquare:{
            clearHighlightSquares(piece){
                const selectedSquare = document.getElementById(piece.refId)
                selectedSquare.classList.remove("move__piece--selected-l")
                selectedSquare.classList.remove("move__piece--selected-d")
                piece.refMoviments.forEach((possibilitie)=>{
                    const selectedSquare = document.getElementById(possibilitie)
                    selectedSquare.classList.remove("move__piece--possibilities-l")
                    selectedSquare.classList.remove("move__piece--possibilities-d")
                })
            },
            addHighlightSquares(piece){
                const selectedSquare = document.getElementById(piece.refId)
                const classToAdd = selectedSquare.classList.contains("square__light")?"move__piece--selected-l":"move__piece--selected-d"
                selectedSquare.classList.add(classToAdd)
                piece.refMoviments.forEach((possibilitie)=>{
                    const selectedSquare = document.getElementById(possibilitie)
                    const classToAdd = selectedSquare.classList.contains("square__light")?"move__piece--possibilities-l":"move__piece--possibilities-d"
                    selectedSquare.classList.add(classToAdd)
                })
            }
        }, 
    }

    this.capturePiece={
        colorTop(capturePiece){
            clearOptionsInput("#colorTop")
            for (let img of capturePiece){
               addImagem(img,"#colorTop")            
            }
        },
        colorBottom(capturePiece){
            clearOptionsInput("#colorBottom")
            for (let img of capturePiece){
               addImagem(img,"#colorBottom")            
            }
        }
    }

    this.informationGame={
        addinformation(text){
            document.querySelector("#information__game").innerText = text
        },      
        clearInformation(){
            document.querySelector("#information__game").innerText = ""
        }   
    }

    this.piecesPromotion={
        subscribeFunction(fn){
            functionToCallBack.piecesPromotion.push(fn)
        },
        renderPiecePromotion(arrayImg){
            const board = document.querySelector("#board")
            const squarePieces = document.createElement("div")
            squarePieces.id= "pawnPromotion"
            squarePieces.classList.add("board__squarePieces")
            board.appendChild(squarePieces) 

            arrayImg.forEach((pieceImg)=>{
                const img = document.createElement("img")
                img.src=`${pieceImg}.png`
                img.classList.add("squarePieces__img")
                starGameEvent.piecesPromotion(img,pieceImg)
                squarePieces.appendChild(img) 
            })
        },
        clearPiecePromotion(){
            clearOptionsInput("#pawnPromotion")
            const board = document.querySelector("#board")
            const squarePieces = document.querySelector("#pawnPromotion")
            board.removeChild(squarePieces)
        }
    }
    function addImagem(capturePieceImg,player){
        const divSquare= document.querySelector(player)
        const img = document.createElement("img")
        img.src=`${capturePieceImg}.png`
        img.classList.add("pieceDead__img")
        divSquare.appendChild(img) 
    }

    function notifyFunctions (objToCallBack,parameters){
        objToCallBack.forEach((fn)=>fn(parameters))
    }

    const starGameEvent={
        buttomStart(){
            const buttomStar= document.querySelector("#button__start")
            buttomStar.addEventListener("click", ()=>{
                notifyFunctions(functionToCallBack.buttomStart)
            })
        },
        pieceInput(){          
            const inputPiece= document.querySelector("#select__name")
            inputPiece.addEventListener("change", () =>{
                notifyFunctions(functionToCallBack.pieceInput,inputPiece.value)
            })
        },
        buttomMove(){
            const inputCoordinate = document.querySelector("#select__coordinate")
            document.querySelector("#button__movement").addEventListener("click", () =>{
                notifyFunctions(functionToCallBack.buttomMove,inputCoordinate.value)
            }) 
        },
        clickChessBoard(tagPosition){
            tagPosition.onclick= () => {
                const squareRefIdClick = tagPosition.id
                notifyFunctions(functionToCallBack.clickChessBoard,squareRefIdClick)
                const allSquareMark = document.querySelectorAll(".square__dark--mark")
                allSquareMark.forEach(elt=>{elt.classList.remove("square__dark--mark")})
            }
        },
        DragChessBoard(tagPosition){
            tagPosition.addEventListener("dragenter",e=>{
            const allSquareMark = document.querySelectorAll(".square__dark--mark")
            allSquareMark.forEach(elt=>{elt.classList.remove("square__dark--mark")})
            tagPosition.classList.add("square__dark--mark");
            })
            tagPosition.addEventListener("dragover",e=>{e.preventDefault();})
            tagPosition.addEventListener("drop",e=>{console.log(`drop ${tagPosition.id}`);
            notifyFunctions(functionToCallBack.clickChessBoard,tagPosition.id)
            tagPosition.classList.remove("square__dark--mark")
            })
        },
        buttomBackMoviment(){
            const buttomBackMoviment= document.querySelector("#button__back__moviment")
            buttomBackMoviment.addEventListener("click", ()=>{
                notifyFunctions(functionToCallBack.buttomBackMoviment)
            })
        },
        piecesPromotion(img,pieceImg){
            img.addEventListener("click",()=>{
                notifyFunctions(functionToCallBack.piecesPromotion,pieceImg)
            })
        }
    }
    starGameEvent.buttomStart()
    starGameEvent.pieceInput()
    starGameEvent.buttomMove()
    starGameEvent.buttomBackMoviment()
    boardCreation(chessBoard)
    
    function boardCreation(chessBoard){
        const board = document.querySelector("#board")
        let color = true
        let newColumn = 1
        for(let refId in chessBoard){
                const tagPosition = document.createElement("div")
                tagPosition.classList.add("board__square")
                tagPosition.id = refId
                starGameEvent.clickChessBoard(tagPosition)
                starGameEvent.DragChessBoard(tagPosition)
                if(color===true){
                    tagPosition.classList.add("square__dark")
                    color=false
                }
                else{
                    tagPosition.classList.add("square__light")
                    color=true
                } 
                board.appendChild(tagPosition) 
                if(newColumn==8){
                    color = (color===true)?false:true 
                    newColumn=0
                }
               newColumn++
            }
        coordinatesCreation("#line","line")
        coordinatesCreation("#column","column")
    }

    //Renderizar as coordenadas ao lado tabuleiro.
    function coordinatesCreation(fatherDiv,classDiv){
        const board = document.querySelector(fatherDiv)
        for(let i=0; i<8;i++){
            const tagPosition = document.createElement("div")
            tagPosition.classList.add(classDiv)
            if(classDiv ==="column"){
                tagPosition.innerHTML=String.fromCharCode(65+i)
            }
            else{ 
                tagPosition.innerHTML=i+1
            }
            board.appendChild(tagPosition)
        
        }
    }

    function clearOptionsInput(idInput){
        const optionSelect = document.querySelector(idInput)
        while (optionSelect.childElementCount>0){
            const optionChildren = optionSelect.firstElementChild
            optionSelect.removeChild(optionChildren)
        }
    }
    
    function addOptionsInput(arrayValue,input){
        arrayValue.forEach((value)=>{
            const selectPiece = document.querySelector(input.idInput)
            const optionPiece = document.createElement("option")
            optionPiece.classList.add(input.classOption)
            optionPiece.innerHTML= value
            selectPiece.appendChild(optionPiece)
        })
    }
}
