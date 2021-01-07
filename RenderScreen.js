function renderScreen(){
    //Tela
    //Renderizar as casas do tabuleiro.
    this.boardCreation = function (){
        const board = document.querySelector('#board');
        let color = true
        for(let i=0; i<8;i++){   
            for(let j=0;j<8;j++){
                const tagPosition = document.createElement('div');
                tagPosition.classList.add('board__square');
                tagPosition.id = `ref${i+1}${j+1}`;
                tagPosition.onclick= () => {
                    const squareRefIdClick = tagPosition.id;
                    notifyMoviment(squareRefIdClick);
                }
                // tagPosition.innerHTML=`${i+1}${j+1}`;
                board.appendChild(tagPosition);
                if(color===true){
                    tagPosition.classList.add('square__dark');
                    color=false;
                }
                else{
                    tagPosition.classList.add('square__light');
                    color=true;
                }
            }   
            color = (color===true)?false:true;  
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
   this.optionCreation= function (tagFather,data){
        const selectPiece = document.querySelector(tagFather);
        const optionPiece = document.createElement('option');
        optionPiece.classList.add("board__option");
        optionPiece.innerHTML= data;
        selectPiece.appendChild(optionPiece);
    }
    this.clearGeneralInput= function (tagFather){
        const optionSelect = document.querySelector(tagFather);
        while (optionSelect.childElementCount>0){
            const optionChildren = optionSelect.firstElementChild;
            optionSelect.removeChild(optionChildren);
        }
    }

    this.clearMovementsBoard=function(pieceSelect){
        document.getElementById(`${pieceSelect.refPiece}`).classList.remove("move__piece--selected");
        pieceSelect.refMoviments.forEach((possibilitie)=>{
            document.getElementById(`${possibilitie}`).classList.remove("move__piece--possibilities");
        });
    }
    this.renderMovementsBoard=function(pieceSelect){
        document.getElementById(`${pieceSelect.refPiece}`).classList.add("move__piece--selected");
        pieceSelect.refMoviments.forEach((possibilitie)=>{
            document.getElementById(`${possibilitie}`).classList.add("move__piece--possibilities");
        });
    }

}

