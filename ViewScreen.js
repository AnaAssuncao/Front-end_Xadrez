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
        subscribeToClick(fn){
            functionToCallBack.buttomStart.push(fn)
        }
    }

    this.buttomBackMoviment={
        subscribeToClick(fn){
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
        subscribeToChange(fn){
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
        subscribeToClick(fn){
            functionToCallBack.buttomMove.push(fn)
        }
    }

    this.chessBoard={
        subscribeToClick(fn){
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
                piece.refMovements.forEach((possibilitie)=>{
                    const selectedSquare = document.getElementById(possibilitie)
                    selectedSquare.classList.remove("move__piece--possibilities-l")
                    selectedSquare.classList.remove("move__piece--possibilities-d")
                })
            },
            addHighlightSquares(piece){
                const selectedSquare = document.getElementById(piece.refId)
                const classToAdd = selectedSquare.classList.contains("square__light")?"move__piece--selected-l":"move__piece--selected-d"
                selectedSquare.classList.add(classToAdd)
                piece.refMovements.forEach((possibilitie)=>{
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
            document.querySelector(".status__game--board").classList.add("check-alert-effect")
        },      
        clearInformation(){
            document.querySelector("#information__game").innerText = "Nenhum Xeque Identificado"
            document.querySelector(".status__game--board").classList.remove("check-alert-effect")
        }   
    }

    this.piecesPromotion={
        subscribeToClick(fn){
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

    this.playHitory={
        addPlay(playHitory){
            const history = document.querySelector("#information__history")
            const play = document.createElement("div")
            play.classList.add("history__play")
            play.id = "history__play-" + playHitory.number
            this.addNumber(play,playHitory.number)
            this.addImgPiece(play,playHitory.imgPieces)
            this.addLastRefId(play,playHitory.lastRefId)
            this.addNewRefId(play,playHitory.newRefId)
            this.addPieceCaptured(play,playHitory.imgPieceDeleted)
            history.appendChild(play)
        },
        removeLine(number){
            const id = "history__play-" + number
            const line = document.querySelector("#"+id)
            line.remove()
        },
        addNumber(play,number){
            const numberPlay= document.createElement("div")
            numberPlay.classList.add("play__number")
            numberPlay.innerHTML=number + "."
            play.appendChild(numberPlay)
        },
        addLastRefId(play,arrayRefId){
            arrayRefId.forEach((refId)=>{
                const refIdPiece = document.createElement("div")
                refIdPiece.classList.add("play__refIdPiece")
                refIdPiece.innerHTML = refId + "->"
                play.appendChild(refIdPiece)
            })
        },
        addImgPiece(play,arrayImgs){
            arrayImgs.forEach((img)=>{
                const imgPiece = document.createElement("img")
                imgPiece.src=`${img}.png`
                imgPiece.classList.add("play__img")
                play.appendChild(imgPiece) 
            })
        },
        addNewRefId(play,arrayRefId){
            arrayRefId.forEach((refId)=>{
                const refIdPiece = document.createElement("div")
                refIdPiece.classList.add("play__refIdPiece")
                refIdPiece.innerHTML = refId
                play.appendChild(refIdPiece)
            })
        },
        addPieceCaptured(play,img){
            if(img){
                const imgPiece = document.createElement("img")
                imgPiece.src=`${img}.png`
                imgPiece.classList.add("play__img")
                play.appendChild(imgPiece)
            }
            else{
                const imgPiece = document.createElement("div")
                imgPiece.innerHTML=" "
                play.appendChild(imgPiece)
            }
        },
        clearPlays(){
            clearOptionsInput("#information__history")
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
        buttonModal(){
            const buttomStar= document.querySelector("#button__details__modal")
            const modal= document.querySelector(".modal__details")
            const icon = document.querySelector(".icon_micro")
            buttomStar.addEventListener("click", ()=>{
                const srcImg = icon.getAttribute('src')!=='img/down-chevron.svg'?'img/down-chevron.svg':'img/up-chevron.svg'
                icon.setAttribute('src',srcImg)
                modal.classList.toggle('modal__details--display')
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
            tagPosition.addEventListener("drop",e=>{
            e.preventDefault()
            const squareRefIdClick = tagPosition.id
            notifyFunctions(functionToCallBack.clickChessBoard,squareRefIdClick)
            tagPosition.classList.remove("square__dark--mark")
            // console.log(`drop ${tagPosition.id}`)
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
    starGameEvent.buttonModal()
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
