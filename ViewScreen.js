export default function viewScreen(){

    const functionToCallBack= {
        buttomStart:[],
        pieceInput:[],
        buttomMove:[],
        clickChessBoard:[]
    }

    this.buttomStart={
        subscribeFunction(fn){
            functionToCallBack.buttomStart.push(fn)
        },
        clearAll(highlightedMovement){
            clearGeneralInput ("#select__color")
            clearGeneralInput ("#select__name")
            clearGeneralInput ("#select__coordinate")
            if(highlightedMovement.refPiece){
                clearMovementsBoard(highlightedMovement)
            }
        },
        addPieceColor(color){
            renderInputOption("#select__color",color)
        },
        addPiecesName(arrayValue){
            arrayValue.forEach((value)=>{
                renderInputOption("#select__name",value)
            })
        },
        addPiecesCoordinates(arrayValue){
            arrayValue.forEach((value)=>{
                renderInputOption("#select__coordinate",value)
            })
        }
    }

    this.pieceInput={
        subscribeFunction(fn){
            functionToCallBack.pieceInput.push(fn)
        },
        clearAll(highlightedMovement){
            clearGeneralInput ("#select__coordinate")
            if(highlightedMovement.refPiece){
                clearMovementsBoard(highlightedMovement)
            }
        },
        addPiecesCoordinates(arrayValue){
            arrayValue.forEach((value)=>{
                renderInputOption("#select__coordinate",value)
            })
        },
        renderhighlightedMovement(highlightedMovement){
            if(highlightedMovement.refPiece){
                renderMovementsBoard(highlightedMovement)
            }
        }
    }

    this.buttomMove={
        subscribeFunction(fn){
            functionToCallBack.buttomMove.push(fn)
        },
        clearAll(highlightedMovement){
            if(highlightedMovement.refPiece){
                clearMovementsBoard(highlightedMovement)
            }
        },

    }

    this.clickChessBoard={
        subscribeFunction(fn){
            functionToCallBack.clickChessBoard.push(fn)
        },
        clearAll(highlightedMovement){
            clearGeneralInput ("#select__coordinate")
            if(highlightedMovement.refPiece){
                clearMovementsBoard(highlightedMovement)
            }
        },
        renderhighlightedMovement(highlightedMovement){
            if(highlightedMovement.refPiece){
                renderMovementsBoard(highlightedMovement)
            }
        },
        addPiecesCoordinates(arrayValue){
            arrayValue.forEach((value)=>{
                renderInputOption("#select__coordinate",value)
            })
        },
        renderNamePieceSelect(namePiece){
            const selectPiece = document.getElementById("select__name");
            selectPiece.value= namePiece;
        }
    }

    this.nextColorToPlay ={
        clearAll(){
            clearGeneralInput ("#select__color")
            clearGeneralInput ("#select__name")
            clearGeneralInput ("#select__coordinate")
        },
        addPieceColor(color){
            renderInputOption("#select__color",color)
        },
        addPiecesName(arrayValue){
            arrayValue.forEach((value)=>{
                renderInputOption("#select__name",value)
            })
        },
        addPiecesCoordinates(arrayValue){
            arrayValue.forEach((value)=>{
                renderInputOption("#select__coordinate",value)
            })
        }
    }

    function notifyFunctions (objToCallBack,parameters){
        objToCallBack.forEach((fn)=>fn(parameters))
    }

    const starGameEvent={
        buttomStart(){
            const buttomStar= document.querySelector(`#button__start`);
            buttomStar.addEventListener("click", ()=>{
                notifyFunctions(functionToCallBack.buttomStart)
            });
        },
        pieceInput(){          
            const inputPiece= document.querySelector("#select__name")
            inputPiece.addEventListener('change', () =>{
                notifyFunctions(functionToCallBack.pieceInput,inputPiece.value)
            })
        },
        buttomMove(){
            const inputCoordinate = document.querySelector('#select__coordinate');
            document.querySelector(`#button__movement`).addEventListener("click", () =>{
                notifyFunctions(functionToCallBack.buttomMove,inputCoordinate.value);
            }); 
        },
        clickChessBoard(tagPosition){
            tagPosition.onclick= () => {
                const squareRefIdClick = tagPosition.id;
                notifyFunctions(functionToCallBack.clickChessBoard,squareRefIdClick);
            }
        },
    }
    starGameEvent.buttomStart()
    starGameEvent.pieceInput()
    starGameEvent.buttomMove()

    this.boardCreation=function(chessBoard){
        const board = document.querySelector('#board');
        let color = true
        let newColumn = 1
        for(let refId in chessBoard){
                const tagPosition = document.createElement('div');
                tagPosition.classList.add('board__square');
                tagPosition.id = `${refId}`;
                starGameEvent.clickChessBoard(tagPosition);
                // tagPosition.onclick= () => {
                //     const squareRefIdClick = tagPosition.id;
                //     this.subscribe.movimentsPiece(squareRefIdClick);
                // }
                if(color===true){
                    tagPosition.classList.add('square__dark');
                    color=false;
                }
                else{
                    tagPosition.classList.add('square__light');
                    color=true;
                } 
                board.appendChild(tagPosition) 
                if(newColumn==8){
                    color = (color===true)?false:true; 
                    newColumn=0
                }
               newColumn++
            }
        coordinatesCreation('#line','line');
        coordinatesCreation('#column','column');
    }

    //Renderizar as coordenadas ao lado tabuleiro.
    function coordinatesCreation(fatherDiv,classDiv){
        const board = document.querySelector(fatherDiv);
        for(let i=0; i<8;i++){
            const tagPosition = document.createElement('div');
            tagPosition.classList.add(classDiv);
            if(classDiv ==='column'){
                tagPosition.innerHTML=String.fromCharCode(65+i)
            }
            else{ 
                tagPosition.innerHTML=`${i+1}`;
            }
            board.appendChild(tagPosition);
        
        }
    }

    //renderizar as peças conforme a chave (referência) do objeto.
    this.renderBoard = function (chessBoard){
        for (let key of Object.keys(chessBoard)){
            const divSquare= document.querySelector(`#${key}`);
            if(!!divSquare.childElementCount){
                const divChildren = divSquare.firstElementChild;
                divSquare.removeChild(divChildren);
            }
            if(chessBoard[key]!==null){
                const divImg = document.createElement('div');
                const img = document.createElement('img');
                divImg.classList.add("board__pieces");
                img.src=`${chessBoard[key].img}.png`;
                img.classList.add('pieces__imagem');
                divImg.appendChild(img);
                divSquare.appendChild(divImg);           
            }
        }
    }

    //renderizar as opções para escolher.
    function renderInputOption(tagFather,data){
        const selectPiece = document.querySelector(tagFather);
        const optionPiece = document.createElement('option');
        optionPiece.classList.add("board__option");
        optionPiece.innerHTML= data;
        selectPiece.appendChild(optionPiece);
    }

    function clearGeneralInput(tagFather){
        const optionSelect = document.querySelector(tagFather);
        while (optionSelect.childElementCount>0){
            const optionChildren = optionSelect.firstElementChild;
            optionSelect.removeChild(optionChildren);
        }
    }

    function clearMovementsBoard(pieceSelect){
        document.getElementById(`${pieceSelect.refPiece}`).classList.remove("move__piece--selected");
        pieceSelect.refMoviments.forEach((possibilitie)=>{
            document.getElementById(`${possibilitie}`).classList.remove("move__piece--possibilities");
        });
    }

    function renderMovementsBoard(pieceSelect){
        document.getElementById(`${pieceSelect.refPiece}`).classList.add("move__piece--selected");
        pieceSelect.refMoviments.forEach((possibilitie)=>{
            document.getElementById(`${possibilitie}`).classList.add("move__piece--possibilities");
        });
    }

}
