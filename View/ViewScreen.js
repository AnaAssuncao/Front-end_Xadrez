export default function viewScreen(chessBoard){

    const functionToCallBack= {
        buttonStartGameOffline:[],
        buttonStartNewRoom:[],
        buttonConnectInARoom:[],
        buttonNewGame:[],
        pieceInput:[],
        buttonMove:[],
        clickChessBoard:[],
        buttonBackMovement:[],
        piecesPromotion:[]
    }
    this.homeMenu={
        clear(){
            const selectModal = document.querySelector("#startGame")
            selectModal.classList.toggle("chess__startGame--display")
            const infToStartGame= document.querySelector(".start__infOnlineGame")
            if(infToStartGame){
                selectModal.removeChild(infToStartGame)
            }
        },
        render(){
            const selectModal = document.querySelector("#startGame")
            selectModal.classList.toggle("chess__startGame--display")
        }
    }

    this.alerts={
        alertInformation(text){
            alert(text)
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

    this.buttonNewGame={
        subscribeToClick(fn){
            functionToCallBack.buttonNewGame.push(fn)
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

    this.buttonMove={
        subscribeToClick(fn){
            functionToCallBack.buttonMove.push(fn)
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
        imgs:{
            offline:"img/Offline_logo.svg",
            online:"img/Online_logo.svg"
        },
        updateInformation(typeImg,text){       
            const img=document.querySelector("#connection__img")
            img.src=this.imgs[typeImg]
            document.querySelector("#information__connection").innerText = text
        },
        addinformation(text){
            document.querySelector("#information__game").innerText = text
            document.querySelector(".status__game--board").classList.add("check-alert-effect")
        },      
        clearInformation(){
            document.querySelector("#information__game").innerText = "Nenhum Xeque Identificado"
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
        addPlay(number){
            const history = document.querySelector("#information__history")
            const play = document.createElement("div")
            play.classList.add("history__play")
            play.id = "history__play-" + number
            const numberPlay= document.createElement("div")
            numberPlay.classList.add("play__number")
            numberPlay.innerHTML=number + "."
            play.appendChild(numberPlay)
            history.appendChild(play)
        },
        removeLine(number){
            const id = "history__play-" + number
            const line = document.querySelector("#"+id)
            line.remove()
        },
        addRefId(refId,number,position){
            const play = document.querySelector("#history__play-" + number)
            const refIdPiece = document.createElement("div")
            refIdPiece.classList.add("play__refIdPiece")
            refIdPiece.innerHTML =(position==="last")? refId + " ->":refId
            play.appendChild(refIdPiece)
            
        },
        addImgPiece(img,number){
            const play = document.querySelector("#history__play-" + number)
            const imgPiece = document.createElement("img")
            imgPiece.src=`${img}.png`
            imgPiece.classList.add("play__img")
            play.appendChild(imgPiece) 

        },
        addPieceCaptured(img,number){
            const play = document.querySelector("#history__play-" + number)
            const imgPiece = document.createElement("img")
            if(img){
                imgPiece.src=`${img}.png`
                imgPiece.classList.add("play__img")
            }
            else{
                imgPiece.innerHTML=" "
            }  
            play.appendChild(imgPiece)     
        },
        clearPlays(){
            clearOptionsInput("#information__history")
        }
    }

    this.statusLog={
        updateLog(text){
            const msg = document.querySelector("#details_msg")
            msg.innerText = text
        }
    }

    function addImagem(capturedPieceImg,player){
        const divSquare= document.querySelector(player)
        const img = document.createElement("img")
        img.src=`${capturedPieceImg}.png`
        img.classList.add("pieceDead__img")
        divSquare.appendChild(img) 
    }

    function notifyFunctions (objToCallBack,parameters){
        objToCallBack.forEach((fn)=>fn(parameters))
    }

    const starGameEvent={
        buttonStartGameOffline(){
            const buttonStar= document.querySelector("#button__startGameOffline")
            buttonStar.addEventListener("click", ()=>{
                 notifyFunctions(functionToCallBack.buttonStartGameOffline)
            })
        },
        buttonStartOnlineGame(){
            const buttonStar= document.querySelector("#button__startGameOnline")
            buttonStar.addEventListener("click", ()=>{
                renderInputOnlineGame()
            })
        },
        buttonStartNewRoom(buttonStart){
            buttonStart.addEventListener("click", ()=>{
                const inputName = document.querySelector(".input__gameOnline--name")
                const inputRoomCode= document.querySelector(".input__gameOnline--code")
                if(inputName.value!=="" && inputRoomCode.value!==""){
                    notifyFunctions(functionToCallBack.buttonStartNewRoom,{name:inputName.value, roomCode:inputRoomCode.value})
                }
            })
        },
        buttonConnectInARoom(buttonStart){
            buttonStart.addEventListener("click", ()=>{
                const inputName = document.querySelector(".input__gameOnline--name")
                const inputRoomCode= document.querySelector(".input__gameOnline--code")
                if(inputName.value!=="" && inputRoomCode.value!==""){
                    notifyFunctions(functionToCallBack.buttonConnectInARoom,{name:inputName.value, roomCode:inputRoomCode.value})
                }
            })
        }, 
        buttonNewGame(){
            const buttonStar= document.querySelector("#button__newGame")
            buttonStar.addEventListener("click", ()=>{
                notifyFunctions(functionToCallBack.buttonNewGame)
            })
        },
        buttonModal(){
            const buttonStar= document.querySelector("#button__details__modal")
            const modal= document.querySelector(".modal__details")
            const icon = document.querySelector(".icon_micro")
            buttonStar.addEventListener("click", ()=>{
                const srcImg = icon.getAttribute("src")!=="img/down-chevron.svg"?"img/down-chevron.svg":"img/up-chevron.svg"
                icon.setAttribute("src",srcImg)
                modal.classList.toggle("modal__details--display")
            })
        },
        pieceInput(){          
            const inputColor=document.querySelector("#select__color")
            const inputPiece= document.querySelector("#select__name")
            inputPiece.addEventListener("change", () =>{
                notifyFunctions(functionToCallBack.pieceInput,{namePiece:inputPiece.value,color:inputColor.value})
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
    starGameEvent.buttonStartOnlineGame()
    starGameEvent.pieceInput()
    starGameEvent.buttonMove()
    starGameEvent.buttonBackMovement()
    starGameEvent.buttonModal()
    starGameEvent.buttonNewGame()
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

    function renderInputOnlineGame(){
        const selectModal = document.querySelector("#startGame")
        const selectInfOnlineGame= document.querySelector(".start__infOnlineGame")
        if(selectInfOnlineGame===null){      
            const nickAndCode = document.createElement("div") 
            nickAndCode.classList.add("start__infOnlineGame")
            renderInputNickAndCode(nickAndCode)
            renderButtonStartOnline(nickAndCode)
            selectModal.appendChild(nickAndCode)
        }
    }

    function renderInputNickAndCode(selectModal){
        const inputs = document.createElement("div")
        const inputName = document.createElement("input")
        const inputCode = document.createElement("input")
        inputs.classList.add("start__inputsOnlineGame")
        inputName.classList.add("input__gameOnline--name")
        inputCode.classList.add("input__gameOnline--code")
        inputName.placeholder="Nome do jogador"
        inputCode.placeholder="Código da sala"
        inputs.appendChild(inputName)
        inputs.appendChild(inputCode)
        selectModal.appendChild(inputs)
    }

    function renderButtonStartOnline(selectModal){
        const buttons = document.createElement("div")
        const buttonStartCode = document.createElement("button")
        const buttonStartRoom = document.createElement("button")
        buttons.classList.add("start_buttonOnlineGame")
        buttonStartCode.classList.add("button__gameOnline--code")
        starGameEvent.buttonStartNewRoom(buttonStartCode)
        buttonStartRoom.classList.add("button__gameOnline--code")
        starGameEvent.buttonConnectInARoom(buttonStartRoom)
        buttonStartCode.innerHTML = "Iniciar Código"
        buttonStartRoom.innerHTML = "Iniciar em uma Sala"
        buttons.appendChild(buttonStartCode)
        buttons.appendChild(buttonStartRoom)
        selectModal.appendChild(buttons)
    }
}
