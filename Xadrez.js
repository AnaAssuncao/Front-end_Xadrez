//Tela
//Renderizar as casas do tabuleiro.
function boardCreation(){
    const board = document.querySelector('#board');
    let color = true
    for(let i=0; i<8;i++){   
        for(let j=0;j<8;j++){
            const tagPosition = document.createElement('div');
            tagPosition.classList.add('board__square');
            tagPosition.id = `ref${i+1}${j+1}`;
            tagPosition.onclick= () => {
                const squareRefIdClick = tagPosition.id; 
                renderSquareToGo(squareRefIdClick);
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
function renderBoard(chessBoard){
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
function optionCreation(tagFather,piece){
    const selectPiece = document.querySelector(tagFather);
    const optionPiece = document.createElement('option');
    optionPiece.classList.add("board__option");
    optionPiece.innerHTML= piece;
    selectPiece.appendChild(optionPiece);
}
function clearGeneralInput (tagFather){
    const optionSelect = document.querySelector(tagFather);
    while (optionSelect.childElementCount>0){
        const optionChildren = optionSelect.firstElementChild;
        optionSelect.removeChild(optionChildren);
    }
}
function updateInputCoordinate(namePiece,colorPiece){
    clearGeneralInput("#select__coordinate");
    const possiblePosition= piecesBoard[namePiece+colorPiece].functionPiece(chessBoard); 
    coordinateSelection(possiblePosition);
}
// ------
//Objeto que possui como chave a referência do id de cada casa do tabuleiro.
const chessBoard = {
    ref11:null,
    ref12:null,
    ref13:null,
    ref14:null,
    ref15:null,
    ref16:null,
    ref17:null,
    ref18:null,
    ref21:null,
    ref22:null,
    ref23:null,
    ref24:null,
    ref25:null,
    ref26:null,
    ref27:null,
    ref28:null,
    ref31:null,
    ref32:null,
    ref33:null,
    ref34:null,
    ref35:null,
    ref36:null,
    ref37:null,
    ref38:null,
    ref41:null,
    ref42:null,
    ref43:null,
    ref44:null,
    ref45:null,
    ref46:null,
    ref47:null,
    ref48:null,
    ref51:null,
    ref52:null,
    ref53:null,
    ref54:null,
    ref55:null,
    ref56:null,
    ref57:null,
    ref58:null,
    ref61:null,
    ref62:null,
    ref63:null,
    ref64:null,
    ref65:null,
    ref66:null,
    ref67:null,
    ref68:null,
    ref71:null,
    ref72:null,
    ref73:null,
    ref74:null,
    ref75:null,
    ref76:null,
    ref77:null,
    ref78:null,
    ref81:null,
    ref82:null,
    ref83:null,
    ref84:null,
    ref85:null,
    ref86:null,
    ref87:null,
    ref88:null,
} ;

function makePiece(name,color,img,position,functionPiece,isAtive=true){   
    this.name=name;
    this.color=color;
    this.img=`img/${img}`;
    this.position=position;
    this.isAtive=isAtive;
    this.functionPiece=functionPiece;
    this.qtMovements=0;
}  
//chave Nome+cor - conforme obj chessBoard
const piecesBoard ={};

//Objeto para Inicio.
const starChessBoard = {
    colorPieceBoard: {
        higher:"White",
        bottom:"Black"
    },
    objStarBoard:{
        starPiecesBlack:["towerBlack","knightBlack","bishopBlack","queenBlack","kingBlack","bishopBlack","knightBlack","towerBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack"],
        starPiecesWhite:["towerWhite","knightWhite","bishopWhite","queenWhite","kingWhite","bishopWhite","knightWhite","towerWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite"],
        namePiece:["Tower-Left","Knight-Left","Bishop-Left","Queen","King","Bishop-Right","Knight-Right","Tower-Right","Pawn-1","Pawn-2","Pawn-3","Pawn-4","Pawn-5","Pawn-6","Pawn-7","Pawn-8"],
        functionPieces:[possibleMovimentTower,possibleMovimentKnight,possibleMovimentBishop,possibleMovimentQueen,possibleMovimentKing, possibleMovimentBishop,possibleMovimentKnight, possibleMovimentTower,
            possibleMovimentPawn, possibleMovimentPawn, possibleMovimentPawn, possibleMovimentPawn, possibleMovimentPawn, possibleMovimentPawn, possibleMovimentPawn, possibleMovimentPawn]
    },
    starObjGame(chessBoard){
        Object.keys(chessBoard).forEach((value)=>{chessBoard[value]=null});
    
        for (let i in this.objStarBoard.starPiecesBlack) {
            const refLine= (parseInt(i/8)+1);
            const refColumn= (i%8+1);
            const keyChess = `ref${refColumn}${refLine}`
            const keyPieces = `${this.objStarBoard.namePiece[i]}${this.colorPieceBoard.bottom}`
            piecesBoard[keyPieces]= new makePiece(this.objStarBoard.namePiece[i],this.colorPieceBoard.bottom,this.objStarBoard.starPiecesBlack[i],keyChess,this.objStarBoard.functionPieces[i]);
            chessBoard[keyChess]= piecesBoard[keyPieces];
        }
        for (let i in this.objStarBoard.starPiecesWhite) {
            const refColumn= (i%8+1);
            const refLine= (8 - parseInt(i/8));
            const keyChess = `ref${refColumn}${refLine}`
            const keyPieces = `${this.objStarBoard.namePiece[i]}${this.colorPieceBoard.higher}`
            piecesBoard[keyPieces]= new makePiece(this.objStarBoard.namePiece[i],this.colorPieceBoard.higher,this.objStarBoard.starPiecesWhite[i],keyChess, this.objStarBoard.functionPieces[i]);
            chessBoard[keyChess]= piecesBoard[keyPieces];
        }
        return chessBoard;
    },
    starGame (chessBoard,piecesBoard){
        clearGeneralInput ("#select__color");
        clearGeneralInput ("#select__coordinate");
        this.starObjGame(chessBoard,this.objStarBoard,piecesBoard,this.colorPieceBoard);
        renderBoard(chessBoard);
        optionCreation("#select__color",this.colorPieceBoard.higher);
        optionCreation("#select__color",this.colorPieceBoard.bottom);
        selectPiece (this.colorPieceBoard.higher,piecesBoard);
    },
    //função construtora do objeto com as informações das peças. 
}


//Cria o tabuleiro
boardCreation();
//Clicar no iniciar jogo as peças irão para as casas iniciais
const buttomStar= document.querySelector(`#button__start`);
buttomStar.addEventListener("click", ()=>{
    starChessBoard.starGame(chessBoard,piecesBoard)
});

//Caso tiver mudança de cor informa as peças que estão ativas. Evento onChance.
const inputColor= document.querySelector("#select__color");
inputColor.addEventListener('change', () => { console.log("qualquer "); 
    selectPiece (inputColor.value,piecesBoard)});

const inputName = document.querySelector("#select__name")
inputName.addEventListener('change', (e) =>{
    updateInputCoordinate(e.target.value,inputColor.value);
});

const inputCoordinate = document.querySelector('#select__coordinate');

document.querySelector(`#button__movement`).addEventListener("click", () =>{
    requiredPieceMovement(chessBoard,piecesBoard,inputColor.value,inputName.value,inputCoordinate.value);
}); 

function selectPiece (colorPiece,piecesBoard){
    clearGeneralInput ("#select__name");
    for(let piece in piecesBoard){
        if(piecesBoard[piece].color==colorPiece && piecesBoard[piece].isAtive==true){
            optionCreation("#select__name",piecesBoard[piece].name);
        }
    }
}
function renderSquareToGo(idSquare){
    clearMovementsBoard("move__piece--possibilities");//limpar as class das possibilidades
    const divSquareRefId = document.getElementById(`${idSquare}`);
    if(divSquareRefId.classList.contains("move__piece--selected"))
    {
        divSquareRefId.classList.remove("move__piece--selected");
    }
    else{
        const refPiece = chessBoard[divSquareRefId.id]
        clearMovementsBoard("move__piece--selected");
        divSquareRefId.classList.add('move__piece--selected');
        const PossibleMovements = (refPiece)?refPiece.functionPiece(chessBoard):[];
        demonstrationPossibleMovements(PossibleMovements);
    }
}
function  clearMovementsBoard(classToRemove){
    const classPossibilities = document.querySelectorAll(`.${classToRemove}`);
    classPossibilities.forEach((possibilitie)=>{
        document.getElementById(`${possibilitie.id}`).classList.remove(`${classToRemove}`);
       
    })
}
function demonstrationPossibleMovements(PossibleMovements){
    PossibleMovements.forEach((moviment)=>{
        document.getElementById(`${moviment}`).classList.add("move__piece--possibilities");
    })
}
//Mudança de peça informa as coordenadas

function possibleMovimentTower(chessBoard){
    const column=Number(this.position.charAt(3));
    const line=Number(this.position.charAt(4));
    const direction = [[0,1],[0,-1],[1,0],[-1,0]];
     
    const moviment= direction.reduce((possibleMoviment,direction)=>{
        const newPossibilitiesMoviment =  possibleMoviment.concat(checkRegularMovement(direction, column, line, chessBoard, this.color,8));
         return newPossibilitiesMoviment;
    },[]);

    return moviment;
}
function possibleMovimentKnight (chessBoard){
    const column=Number(this.position.charAt(3));
    const line=Number(this.position.charAt(4));
    const direction = [[2,1],[2,-1],[-2,-1],[-2,1],[1,2],[-1,2],[-1,-2],[1,-2]];
   
    const moviment= direction.reduce((possibleMoviment,direction)=>{
        const newPossibilitiesMoviment =  possibleMoviment.concat(checkRegularMovement(direction, column, line, chessBoard, this.color,1));
         return newPossibilitiesMoviment;
    },[]);

    return moviment;
}
function possibleMovimentBishop  (chessBoard){
    const column=Number(this.position.charAt(3));
    const line=Number(this.position.charAt(4));
    const direction=[[1,1],[1,-1],[-1,-1],[-1,1]];
   
    const moviment= direction.reduce((possibleMoviment,direction)=>{
        const newPossibilitiesMoviment =  possibleMoviment.concat(checkRegularMovement(direction, column, line, chessBoard, this.color,8));
         return newPossibilitiesMoviment;
    },[]);

    return moviment;
}
function possibleMovimentQueen  (chessBoard){
    const column=Number(this.position.charAt(3));
    const line=Number(this.position.charAt(4));
    const direction = [[1,1],[1,-1],[-1,-1],[-1,1],[0,1],[0,-1],[1,0],[-1,0]];

    const moviment= direction.reduce((possibleMoviment,direction)=>{
        const newPossibilitiesMoviment =  possibleMoviment.concat(checkRegularMovement(direction, column, line, chessBoard, this.color,8));
         return newPossibilitiesMoviment;
    },[]);

    return moviment;
}
function possibleMovimentKing (chessBoard){
    const column=Number(this.position.charAt(3));
    const line=Number(this.position.charAt(4));
    const direction = [[1,1],[1,-1],[-1,-1],[-1,1],[0,1],[0,-1],[1,0],[-1,0]];
   
    const moviment= direction.reduce((possibleMoviment,direction)=>{
        const newPossibilitiesMoviment =  possibleMoviment.concat(checkRegularMovement(direction, column, line, chessBoard, this.color,1));
         return newPossibilitiesMoviment;
    },[]);

    return moviment;
}

function checkRegularMovement([column,line], columnPosition, linePosition, chessBoard, color, maximumPaces){
    let possibleColumn = columnPosition + column;
    let possibleLine = linePosition+ line;
    const possibleDirection = [];
    for(let limit = 1; possibleColumn>=1 && possibleColumn<=8 && possibleLine>=1 && possibleLine<=8 && limit<=maximumPaces;limit++){
        const position = `ref${possibleColumn}${possibleLine}`;
        if(chessBoard[position]==null){
            possibleDirection.push(position);
        }
        else if(chessBoard[position].color!==color){
            possibleDirection.push(position);
            break;
        }
        else{
            break;
        }
        possibleColumn = possibleColumn+column;
        possibleLine= possibleLine+line;
    }
    return possibleDirection;
}

function possibleMovimentPawn (chessBoard){
    const column=Number(this.position.charAt(3));
    const line =Number(this.position.charAt(4));
    const movimentPawn = [];
    const direction=[(this.color==starChessBoard.colorPieceBoard.bottom)?1:-1]
//Peças Pretas aumentam a linha e as Brancas diminuem.
if((line+Number(direction))>=1 && (line+Number(direction))<=8){
    const possibleMovement=[`ref${column}${(line+Number(direction))}`]
    if(this.qtMovements==0){
        possibleMovement.push(`ref${column}${(line+direction*2)}`)
    }
    possibleMovement.forEach((position)=>{
        if(chessBoard[position]==null){
            movimentPawn.push(position);
        }
    });

    const possibleEat=[`ref${column-1}${(line+Number(direction))}`,`ref${column+1}${(line+Number(direction))}`];
    possibleEat.forEach((position)=>{
        if((chessBoard[position]!==null) && (chessBoard[position]!==undefined) && (chessBoard[position].color!==this.color)){
            movimentPawn.push(position);
        }
    })   
}
    return movimentPawn;
}

function coordinateSelection(positions){

    if(positions.length==0){
        optionCreation("#select__coordinate","Sem Movimento");
     }
     positions.sort();
    positions.forEach((possibleCoordinate)=>{ 
        possibleCoordinate = refIdToCoordinate(possibleCoordinate);
        optionCreation("#select__coordinate",possibleCoordinate)}
        );
}

function refIdToCoordinate (coordenadasClass){
    let result = coordenadasClass.substring(3);
    //Edita as coordenadas para renderização, trocando o número pela letra usando .charCodeAt
    result = (String.fromCharCode(result.charCodeAt(0)+16))+result.charAt(1);
    return result;
    // const conversao = [["1","A"],["2","B"],["3","C"],["4","D"],["5","E"],["6","F"],["7","G"],["8","H"]];
}

function coordinateToRefId (coordenadasClass){
    //Edita as coordenadas para renderização, trocando a letra pelo numero usando .charCodeAt
   let result = "ref"+(String.fromCharCode(coordenadasClass.charCodeAt(0)-16))+coordenadasClass.charAt(1);
    return result;
}

//Movimentar as peças
function requiredPieceMovement(chessBoard,piecesBoard,inputColorValue,inputNamePieceValue,inputCoordinateValue){
    // descobrir onde esta a peça q vai mover
    const refId = coordinateToRefId(inputCoordinateValue);
    // Altera obj do jogo
    positionRefModification(chessBoard,piecesBoard,inputColorValue,inputNamePieceValue,refId);
    renderBoard(chessBoard);
    updateInputCoordinate(inputNamePieceValue,inputColorValue);
    renderSquareToGo(refId);
    return chessBoard;
};

function positionRefModification(chessBoard,piecesBoard,inputColorValue,inputNamePieceValue,inputCoordinateValue){
    const namePiece=`${inputNamePieceValue}${inputColorValue}`;
    const refPiece=piecesBoard[namePiece];
    const newPosition = inputCoordinateValue;
    if(chessBoard[newPosition]!==null && refPiece.position!==chessBoard[newPosition]){
        chessBoard[newPosition].isAtive = false;
    }
        chessBoard[refPiece.position]=null;
        refPiece.position=newPosition;
        refPiece.qtMovements++;
        chessBoard[newPosition]= refPiece;
}