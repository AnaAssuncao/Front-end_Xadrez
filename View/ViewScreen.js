export default function ViewScreen(chessBoard){

    const functionToCallBack= {
        buttonStartGameOffline:[],
        buttonStartNewRoom:[],
        buttonConnectInARoom:[],
        buttonExitGame:[],
        pieceInput:[],
        buttonMove:[],
        clickChessBoard:[],
        buttonBackMovement:[],
        piecesPromotion:[]
    }

    this.homeMenu={
        clear(){
            const selectModal = document.querySelector("#menu__home")
            selectModal.classList.toggle("menu__home--display")
        },
        render(){
            const selectModal = document.querySelector("#menu__home")
            selectModal.classList.toggle("menu__home--display")
        }
    }

    this.alerts={
        alertInformation(text){
            alert(text)
        }
    }

    this.banner={
        addBannerGame(text){
            const chess = document.querySelector("#chess")
            const banner = document.createElement("div")
            banner.classList.add("chess__banner")
            const textBanner = document.createElement("p")
            textBanner.classList.add("banner__text")
            textBanner.innerText=text
            banner.appendChild(textBanner)
            chess.appendChild(banner)
        }
    }

    this.buttonStartGameOffline={
        subscribeToClick(fn){
            functionToCallBack.buttonStartGameOffline.push(fn)
        }
    }

    this.buttonStartNewRoom={
        subscribeToClick(fn){
            functionToCallBack.buttonStartNewRoom.push(fn)
        }
    }

    this.buttonConnectInARoom={
        subscribeToClick(fn){
            functionToCallBack.buttonConnectInARoom.push(fn)
        }
    }

    this.buttonExitGame={
        subscribeToClick(fn){
            functionToCallBack.buttonExitGame.push(fn)
        }
    }

    this.buttonBackMovement={
        subscribeToClick(fn){
            functionToCallBack.buttonBackMovement.push(fn)
        },
        renderButton(){
            const buttonMove = document.querySelector("#button__back__movement")
            buttonMove.classList.remove("move__back--display")
        },
        clearButton(){
            const buttonMove = document.querySelector("#button__back__movement")
            if(buttonMove){
                buttonMove.classList.add("move__back--display")
            }
        }
    }

    this.colorInformation={
        updateInformation(value,imgPiece){
            const text= document.querySelector("#select__color")
            text.innerHTML=value
            const img=document.querySelector("#player__img")
            img.src = imgPiece
        },
        addAnimation(){
            this.clearAnimation()
            const animation = document.querySelector("#player__animation")
            animation.classList.add("player__animation")
        },      
        clearAnimation(){
            const animation = document.querySelector("#player__animation")
            if(animation.classList.contains("player__animation")){ 
                animation.classList.remove("player__animation")
            }
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

    this.buttonMove={
        subscribeToClick(fn){
            functionToCallBack.buttonMove.push(fn)
        }
    }

    this.times={
        updateGameTime(time){
            document.querySelector("#time__game").innerHTML=time
        },
        updateMovementTime(time){
            document.querySelector("#time__movement").innerHTML=time
        }
    }
    this.chessBoard={
        subscribeToClick(fn){
            functionToCallBack.clickChessBoard.push(fn)
        },
            //renderizar as peças conforme a chave (referência) do objeto.
        renderBoard(chessBoard,nameImgPieceFn){
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
                    img.src=nameImgPieceFn(chessBoard[key].imgName)
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
                const selectedSquare = document.getElementById(piece.position)
                selectedSquare.classList.remove("move__piece--selected-l")
                selectedSquare.classList.remove("move__piece--selected-d")
                piece.refMovements.forEach((possibilitie)=>{
                    const selectedSquare = document.getElementById(possibilitie)
                    selectedSquare.classList.remove("move__piece--possibilities-l")
                    selectedSquare.classList.remove("move__piece--possibilities-d")
                })
            },
            addHighlightSquares(piece){
                const selectedSquare = document.getElementById(piece.position)
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

    this.capturedPiece={
        colorTop(capturedPiece){
            clearOptionsInput("#colorTop")
            for (let img of capturedPiece){
               addImagem(img,"#colorTop")            
            }
        },
        colorBottom(capturedPiece){
            clearOptionsInput("#colorBottom")
            for (let img of capturedPiece){
               addImagem(img,"#colorBottom")            
            }
        }
    }

    this.informationGame={
        updateInformation(typeImg,text){       
            const img=document.querySelector("#connection__img")
            img.src=typeImg
            document.querySelector("#information__connection").innerText = text
        },
        addinformation(text){
            document.querySelector("#information__game").innerText = text
            document.querySelector(".status__game--board").classList.add("check-alert-effect")
        },      
        clearInformation(textNoCheck){
            document.querySelector("#information__game").innerText = textNoCheck
            document.querySelector(".status__game--board").classList.remove("check-alert-effect")
        }
    }

    this.modalOnBoard={
        renderModal(text){
            const selectModal = document.querySelector("#modal__information")
            selectModal.classList.toggle("chess__modal--display")
            document.querySelector("#chess__inf").innerText = text
        },
        clearModal(){
            const selectModal = document.querySelector("#modal__information")
            const classModal = selectModal.className
            if(classModal.indexOf("chess__modal--display")===-1){
                selectModal.classList.toggle("chess__modal--display")
            }
        }
    }

    this.piecesPromotion={
        subscribeToClick(fn){
            functionToCallBack.piecesPromotion.push(fn)
        },
        renderPiecePromotion(arrayImg,namesPiecePromotion){
            const board = document.querySelector("#board")
            const squarePieces = document.createElement("div")
            squarePieces.id= "pawnPromotion"
            squarePieces.classList.add("board__banner__promotion")
            squarePieces.classList.add("chess__row__center")
            board.appendChild(squarePieces) 

            arrayImg.forEach((pieceImg,i)=>{
                const img = document.createElement("img")
                img.src=pieceImg
                img.classList.add("board__banner__img")
                starGameEvent.piecesPromotion(img,namesPiecePromotion[i])
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
        addPlay(number){
            const history = document.querySelector("#information__history")
            const play = document.createElement("div")
            play.classList.add("history__play")
            play.id = "history__play-" + number
            const numberPlay= document.createElement("div")
            numberPlay.classList.add("history__number")
            numberPlay.innerHTML=number + "."
            play.appendChild(numberPlay)
            history.appendChild(play)
        },
        removeLine(number){
            const id = "history__play-" + number
            const line = document.querySelector("#"+id)
            line.remove()
        },
        addMovement(number,numberMovement){
            const play = document.querySelector("#history__play-" + number)
            const movements = document.createElement("div")
            movements.classList.add("history__movement")
            movements.id = "history__movement-" + numberMovement
            play.appendChild(movements)
        },
        addRefId(refId,number,position){
            const play = document.querySelector("#history__movement-" + number)
            const refIdPiece = document.createElement("div")
            refIdPiece.classList.add("history__refIdPiece")
            refIdPiece.innerHTML =(position==="last")? refId + " ->":refId
            play.appendChild(refIdPiece)
        },
        addImgPiece(img,number){
            const play = document.querySelector("#history__movement-" + number)
            const imgPiece = document.createElement("img")
            imgPiece.src=img
            imgPiece.classList.add("history__img")
            play.appendChild(imgPiece) 
        },
        addPieceCaptured(img,number){
            const play = document.querySelector("#history__movement-" + number)
            const imgPiece = document.createElement("img")
            if(img){
                imgPiece.src=img
                imgPiece.classList.add("history__img")
                imgPiece.classList.add("history__img--rotate")
            }
            else{
                imgPiece.classList.add("history__img")
                imgPiece.innerHTML=" "
            }  
            play.appendChild(imgPiece)     
        },
        clearPlays(){
            clearOptionsInput("#information__history")
        }
    }

    this.statusLog={
        addMsgsLog(text){
            const detailsLog = document.querySelector("#details__log")
            const log = document.createElement("div")
            const msgsLog = document.createElement("p")
            log.classList.add("modal__log")
            msgsLog.classList.add("log__msgs")
            msgsLog.innerText = text
            log.appendChild(msgsLog)
            detailsLog.appendChild(log)
        },
        clearMsgsLog(){
            clearOptionsInput("#details__log")
        }
    }

    function addImagem(capturedPieceImg,player){
        const divSquare= document.querySelector(player)
        const img = document.createElement("img")
        img.src=capturedPieceImg
        img.classList.add("pieceDead__img")
        divSquare.appendChild(img) 
    }

    function notifyFunctions (objToCallBack,parameters){
        objToCallBack.forEach((fn)=>fn(parameters))
    }

    const starGameEvent={
        buttonStartGameOffline(){
            const buttonStar= document.querySelector("#button__menu__offline")
            buttonStar.addEventListener("click", ()=>{
                 notifyFunctions(functionToCallBack.buttonStartGameOffline)
            })
        },
        buttonStartNewRoom(){
            const buttonStart = document.querySelector("#button__menu__newRoom")
            buttonStart.addEventListener("click", ()=>{
                const inputName = document.querySelector("#input__gameOnline--name")
                const inputRoomCode= document.querySelector("#input__gameOnline--code")
                if(inputName.value!=="" && inputRoomCode.value!==""){
                    notifyFunctions(functionToCallBack.buttonStartNewRoom,{name:inputName.value, roomCode:inputRoomCode.value})
                }
            })
        },
        buttonConnectInARoom(){
            const buttonStart = document.querySelector("#button__menu__connectRoom")
            buttonStart.addEventListener("click", ()=>{
                const inputName = document.querySelector("#input__gameOnline--name")
                const inputRoomCode= document.querySelector("#input__gameOnline--code")
                if(inputName.value!=="" && inputRoomCode.value!==""){
                    notifyFunctions(functionToCallBack.buttonConnectInARoom,{name:inputName.value, roomCode:inputRoomCode.value})
                }
            })
        }, 
        buttonExitGame(){
            const buttonExit= document.querySelector("#button__exit")
            buttonExit.addEventListener("click", ()=>{
                notifyFunctions(functionToCallBack.buttonExitGame)
            })
            buttonExit.addEventListener("mouseover", ()=>{
                const textExit = document.querySelector("#text__exit")
                textExit.classList.toggle("section__panel__exit--display")
            })
            buttonExit.addEventListener("mouseout", ()=>{
                const textExit = document.querySelector("#text__exit")
                textExit.classList.toggle("section__panel__exit--display")
            })
        },
        buttonDarkGame(){
            const buttonDark= document.querySelector("#button__dark")
            buttonDark.addEventListener("click", ()=>{
                const currentTheme = document.documentElement.getAttribute("data-theme")
                if(currentTheme === "dark"){
                    document.documentElement.setAttribute("data-theme", "light")
                    document.querySelector("#menu__logo").src = "Img/logoChess.png" 
                    document.querySelector("#header__logo").src = "Img/logoChess.png"
                }
                else{
                    document.documentElement.setAttribute("data-theme", "dark")
                    document.querySelector("#menu__logo").src = "Img/logoChess-dark.png" 
                    document.querySelector("#header__logo").src = "Img/logoChess-dark.png"
                }
            })
            buttonDark.addEventListener("mouseover", ()=>{
                const textDark = document.querySelector("#text__dark")
                textDark.classList.toggle("module__dark--display")
            })
            buttonDark.addEventListener("mouseout", ()=>{
                const textDark = document.querySelector("#text__dark")
                textDark.classList.toggle("module__dark--display")
            })
        },
        buttonModal(){
            const buttonStar= document.querySelector("#button__details__modal")
            const modal= document.querySelector(".modal__details")
            const icon = document.querySelector(".icon__micro")
            buttonStar.addEventListener("click", ()=>{
                const srcImg = icon.getAttribute("src")!=="Img/down-chevron.svg"?"Img/down-chevron.svg":"Img/up-chevron.svg"
                icon.setAttribute("src",srcImg)
                modal.classList.toggle("modal__details--display")
            })
        },
        pieceInput(){          
            const inputPiece= document.querySelector("#select__name")
            inputPiece.addEventListener("change", () =>{
                notifyFunctions(functionToCallBack.pieceInput,inputPiece.value)
            })
        },
        buttonMove(){
            const inputCoordinate = document.querySelector("#select__coordinate")
            document.querySelector("#button__movement").addEventListener("click", () =>{
                notifyFunctions(functionToCallBack.buttonMove,inputCoordinate.value)
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
        buttonBackMovement(){
            const buttonBackMovement= document.querySelector("#button__back__movement")
            buttonBackMovement.addEventListener("click", ()=>{
                notifyFunctions(functionToCallBack.buttonBackMovement)
            })
        },
        piecesPromotion(img,pieceImg){
            img.addEventListener("click",()=>{
                notifyFunctions(functionToCallBack.piecesPromotion,pieceImg)
            })
        }
    }
    starGameEvent.buttonStartGameOffline()
    starGameEvent.buttonStartNewRoom()
    starGameEvent.buttonConnectInARoom()
    starGameEvent.pieceInput()
    starGameEvent.buttonMove()
    starGameEvent.buttonBackMovement()
    starGameEvent.buttonModal()
    starGameEvent.buttonExitGame()
    starGameEvent.buttonDarkGame()
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
            tagPosition.classList.add("chess__row__center")
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
