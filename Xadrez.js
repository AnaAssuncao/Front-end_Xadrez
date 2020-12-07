//Tela
//Renderizar as casas do tabuleiro.
function boardCreation(){
    const board = document.querySelector('.chess__board');
    let color = true
    for(let i=0; i<8;i++){   
        for(let j=0;j<8;j++){
            const tagPosition = document.createElement('div');
            tagPosition.classList.add('board__square');
            tagPosition.id = `ref${i+1}${j+1}`;
            // tagPosition.innerHTML=`${i+1}${j+1}`;
            board.appendChild(tagPosition);
            if(color===true){
                tagPosition.classList.add('square__light');
                color=false;
            }
            else{
                tagPosition.classList.add('square__dark');
                color=true;
            }
        }   
        color = (color===true)?false:true;  
    }

    coordinatesCreation('.chess__rank','rank');
    coordinatesCreation('.chess__column','column');

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
        if(divSquare.childElementCount==1){
            const divChildren = divSquare.firstElementChild;
            divSquare.removeChild(divChildren);
        }
        if(chessBoard[key]!==null){
            const divImg = document.createElement('div');
            const img = document.createElement('img')
            divImg.classList.add("board__pieces");
            img.src=`${chessBoard[key].img}.png`
            img.classList.add('pieces__imagem')
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
} 
//função construtora do objeto com as informações das peças.
function makePiece(name,color,img,position,isAtive=true){   
    this.name=name;
    this.color=color;
    this.img=`img/${img}`;
    this.position=position;
    this.isAtive=isAtive;
}
//Objeto para Iniciar o tabuleiro.
const objStarBoard={
    starPiecesBlack:["towerBlack","knightBlack","bishopBlack","queenBlack","kingBlack","bishopBlack","knightBlack","towerBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack"],
    starPiecesWhite:["towerWhite","knightWhite","bishopWhite","kingWhite","queenWhite","bishopWhite","knightWhite","towerWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite"],
    namePieceBlack:["Tower-Left","Knight-Left","Bishop-Left","Queen","King","Bishop-Right","Knight-Right","Tower-Right","Pawn-1","Pawn-2","Pawn-3","Pawn-4","Pawn-5","Pawn-6","Pawn-7","Pawn-8"],
    namePieceWhite:["Tower-Left","Knight-Left","Bishop-Left","Queen","King","Bishop-Right","Knight-Right","Tower-Right","Pawn-1","Pawn-2","Pawn-3","Pawn-4","Pawn-5","Pawn-6","Pawn-7","Pawn-8"],
    // functionPiecesBlack:[tower,knight,bishop,queen,king,bishop,knight,tower,pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn],
    // functionPiecesWhite:[tower,knight,bishop,king,queen,bishop,knight,tower,pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn],
}

//chave Nome+cor - conforme obj chessBoard
const piecesBoard ={}

function starBoard(chessBoard,objStarBoard){
    Object.keys(chessBoard).forEach((value)=>{chessBoard[value]=null});

    for (let i in objStarBoard.starPiecesBlack) {
        const refLine= (parseInt(i/8)+1);
        const refColumn= (i%8+1);
        const keyChess = `ref${refColumn}${refLine}`
        chessBoard[keyChess]= new makePiece(objStarBoard.namePieceBlack[i],'Black',objStarBoard.starPiecesBlack[i],keyChess);
        const keyPieces = `${objStarBoard.namePieceBlack[i]}Black`
        piecesBoard[keyPieces]=chessBoard[keyChess];
    }
    for (let i in objStarBoard.starPiecesWhite) {
        const refColumn= (i%8+1);
        const refLine= (8 - parseInt(i/8));
        const keyChess = `ref${refColumn}${refLine}`
        chessBoard[keyChess]= new makePiece(objStarBoard.namePieceWhite[i],'White',objStarBoard.starPiecesWhite[i],keyChess);
        const keyPieces = `${objStarBoard.namePieceWhite[i]}White`
        piecesBoard[keyPieces]=chessBoard[keyChess];
    }
    renderBoard(chessBoard);
}
//Cria o tabuleiro
boardCreation();
//Clicar no iniciar jogo as peças irão para as casas iniciais
const buttomStar= document.querySelector(`.chess__button`);
buttomStar.addEventListener("click", ()=>{
    starBoard(chessBoard,objStarBoard);
    // Informar conforme a cor 
    // objStarBoard.namePiece.forEach(element => {
    //     optionCreation(`.move__piece`,element)
    // });   
});

//Caso tiver mudança de cor informa as peças que estão ativas

//Mudança de peça informa as coordenadas

//Movimentar as peças
const buttomMove= document.querySelector(`.move__button`);
buttomMove.addEventListener("click", () =>{
    movementPieceBoard={
        name: document.querySelector('.move__piece').value,
        color: document.querySelector('.move__color').value,
        column:document.querySelector('.move__column').value,
        rank: document.querySelector('.move__rank').value
    }
    let refRemove;
    // descobrir onde esta a peça q vai mover
    for(let key in chessBoard){
        if(chessBoard[key]!==null){
            if((chessBoard[key].name== movementPieceBoard.name) && (chessBoard[key].color== movementPieceBoard.color))
            {
                refRemove=chessBoard[key].position;
            }
        }
    }
    const newPosition = `ref${ movementPieceBoard.column}${ movementPieceBoard.rank}`
    chessBoard[newPosition]={...chessBoard[refRemove]};
    chessBoard[newPosition].position=newPosition;
    chessBoard[refRemove]=null;
    renderBoard(chessBoard);
});
