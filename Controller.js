import createGame from "./XadrezGame.js";
import renderScreen from "./RenderScreen.js";
const render = new renderScreen(notifyMoviment);
const game = new createGame();
//Clicar no iniciar jogo as peças irão para as casas iniciais
const buttomStar= document.querySelector(`#button__start`);
buttomStar.addEventListener("click", ()=>{
    starGame()
});

//Caso tiver mudança de cor informa as peças que estão ativas. Evento onChancse.
const inputColor= document.querySelector("#select__color");
// inputColor.addEventListener('change', () => { 
//     selectPiece (inputColor.value)});

const inputName = document.querySelector("#select__name")
inputName.addEventListener('change', (e) =>{
    updateInputCoordinate(e.target.value,inputColor.value);
});

const inputCoordinate = document.querySelector('#select__coordinate');

document.querySelector(`#button__movement`).addEventListener("click", () =>{
    requiredPieceMovement(inputCoordinate.value);
}); 

//Cria o tabuleiro 
render.boardCreation();

function starGame(){
    render.clearGeneralInput ("#select__color");
    render.clearGeneralInput ("#select__coordinate");
    game.starObjGame();
    render.renderBoard(game.chessBoard);
    render.optionCreation("#select__color",game.pieceSelect.color);
    selectPieceInput (game.pieceSelect.color,game.piecesBoard);
    (game.pieceSelect.refPiece)?render.clearMovementsBoard(game.pieceSelect):null;
}
// MOVER BOTÃO
function selectPieceInput (colorPiece){
    render.clearGeneralInput ("#select__name");
    for(let piece in game.piecesBoard){
        if(game.piecesBoard[piece].color==colorPiece && game.piecesBoard[piece].isAtive==true){
            render.optionCreation("#select__name",game.piecesBoard[piece].name);
        }
    }
}

function updateInputCoordinate(namePiece,colorPiece){
    render.clearGeneralInput("#select__coordinate"); 
    if(game.pieceSelect.refPiece) {render.clearMovementsBoard(game.pieceSelect);}
    game.movimentsPiece(`${namePiece}${colorPiece}`);
    coordinateSelection(game.pieceSelect.refMoviments);
    if(game.pieceSelect.refPiece) {render.renderMovementsBoard(game.pieceSelect);}
}   

function coordinateSelection(positions){
    if(positions.length==0){
        render.optionCreation("#select__coordinate","Sem Movimento");
    }
    positions.sort();
    positions.forEach((possibleCoordinate)=>{ 
        possibleCoordinate = refIdToCoordinate(possibleCoordinate);
        render.optionCreation("#select__coordinate",possibleCoordinate)}
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
function requiredPieceMovement(inputCoordinateValue){
    // Modificando o nome da ref ID pela função coordinateToRefId
    const refId = coordinateToRefId(inputCoordinateValue);
    // Altera obj do jogo
    render.clearMovementsBoard(game.pieceSelect)
    game.movimentsModification(refId);
    render.renderBoard(game.chessBoard);
    nextColorToPlay()
};

// MOVER NA TELA
function notifyMoviment (idSquare){
    updateMovimentsPiece(idSquare);
    render.clearGeneralInput ("#select__coordinate");
    render.renderBoard(game.chessBoard);
    inputModification(idSquare);
}

function updateMovimentsPiece(idSquare){
    if(game.pieceSelect.refPiece) {render.clearMovementsBoard(game.pieceSelect);}
    //limpar as class das possibilidades
    game.movimentsModification(idSquare);
    if(game.pieceSelect.refPiece) {render.renderMovementsBoard(game.pieceSelect);}
}

function inputModification(){
    if(game.pieceSelect.refPiece){
        render.renderNamePieceSelect(game.pieceSelect.namePiece);
        coordinateSelection(game.pieceSelect.refMoviments);
    }
    else{nextColorToPlay()} //peça movimentou
}

function nextColorToPlay (){
    render.clearGeneralInput ("#select__color");
    render.clearGeneralInput ("#select__coordinate");
    render.optionCreation("#select__color",game.pieceSelect.color);
    selectPieceInput (game.pieceSelect.color,game.piecesBoard);
}

