function createGame () {
    //Objeto que possui como chave a referência do id de cada casa do tabuleiro.
    this.chessBoard= {
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
    };

    //chave Nome+cor - conforme obj chessBoard
    this.piecesBoard= {};

    //Cor peças
    this.colorPieceBoard= {
        top:"White",
        bottom:"Black"
    }

    // Controle de peça selecionada.
    this.pieceSelect= {
        namePiece:null,
        refPiece:null,
        refMoviments:[],
        color:null
    }
    
    //Objeto para Inicio.
    objStarBoard={
        starPiecesBlack:["towerBlack","knightBlack","bishopBlack","queenBlack","kingBlack","bishopBlack","knightBlack","towerBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack","pawnBlack"],
        starPiecesWhite:["towerWhite","knightWhite","bishopWhite","queenWhite","kingWhite","bishopWhite","knightWhite","towerWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite","pawnWhite"],
        namePiece:["Tower-Left","Knight-Left","Bishop-Left","Queen","King","Bishop-Right","Knight-Right","Tower-Right","Pawn-1","Pawn-2","Pawn-3","Pawn-4","Pawn-5","Pawn-6","Pawn-7","Pawn-8"],
        functionPieces:[possibleMovimentTower,possibleMovimentKnight,possibleMovimentBishop,possibleMovimentQueen,possibleMovimentKing, possibleMovimentBishop,possibleMovimentKnight, possibleMovimentTower,
            possibleMovimentPawn, possibleMovimentPawn, possibleMovimentPawn, possibleMovimentPawn, possibleMovimentPawn, possibleMovimentPawn, possibleMovimentPawn, possibleMovimentPawn]
    }

    const makePiece = (name,color,img,position,functionPiece,isAtive=true)=>{   
        return {
            __proto__: this, 
            name:name,
            color:color,
            img:`img/${img}`,
            position:position,
            isAtive:isAtive,
            functionPiece:functionPiece,
            qtMovements:0
        } 
    }  

    this.starObjGame = function (){
        Object.keys(this.chessBoard).forEach((value)=>{this.chessBoard[value]=null});

        for (let i in objStarBoard.starPiecesBlack) {
            const refLine= (parseInt(i/8)+1);
            const refColumn= (i%8+1);
            const keyChess = `ref${refColumn}${refLine}`
            const keyPieces = `${objStarBoard.namePiece[i]}${this.colorPieceBoard.bottom}`;
          
            this.piecesBoard[keyPieces]= makePiece(objStarBoard.namePiece[i],this.colorPieceBoard.bottom,objStarBoard.starPiecesBlack[i],keyChess,objStarBoard.functionPieces[i]);
            this.chessBoard[keyChess]= this.piecesBoard[keyPieces];
        }
        for (let i in objStarBoard.starPiecesWhite) {
            const refColumn= (i%8+1);
            const refLine= (8 - parseInt(i/8));
            const keyChess = `ref${refColumn}${refLine}`
            const keyPieces = `${objStarBoard.namePiece[i]}${this.colorPieceBoard.top}`
            
            this.piecesBoard[keyPieces]= makePiece(objStarBoard.namePiece[i],this.colorPieceBoard.top,objStarBoard.starPiecesWhite[i],keyChess, objStarBoard.functionPieces[i]);
            this.chessBoard[keyChess]= this.piecesBoard[keyPieces];
        }

        this.pieceSelect.color=this.colorPieceBoard.top; //Cor Branca começam.
        return this.chessBoard
    }
    this.starObjGame();

    //Mudança de peça informa as coordenadas
    function possibleMovimentTower(tower){
        const column=Number(this.position.charAt(3));
        const line=Number(this.position.charAt(4));
        const direction = [[0,1],[0,-1],[1,0],[-1,0]];
        
        const moviment= direction.reduce((possibleMoviment,direction)=>{
            const newPossibilitiesMoviment =  possibleMoviment.concat(checkRegularMovement(direction, column, line, this.color,8));
            return newPossibilitiesMoviment;
        },[]);

        return moviment;
    }
    function possibleMovimentKnight (){
        const column=Number(this.position.charAt(3));
        const line=Number(this.position.charAt(4));
        const direction = [[2,1],[2,-1],[-2,-1],[-2,1],[1,2],[-1,2],[-1,-2],[1,-2]];
    
        const moviment= direction.reduce((possibleMoviment,direction)=>{
            const newPossibilitiesMoviment =  possibleMoviment.concat(checkRegularMovement(direction, column, line, this.color,1));
            return newPossibilitiesMoviment;
        },[]);

        return moviment;
    }
    function possibleMovimentBishop  (){
        const column=Number(this.position.charAt(3));
        const line=Number(this.position.charAt(4));
        const direction=[[1,1],[1,-1],[-1,-1],[-1,1]];
    
        const moviment= direction.reduce((possibleMoviment,direction)=>{
            const newPossibilitiesMoviment =  possibleMoviment.concat(checkRegularMovement(direction, column, line, this.color,8));
            return newPossibilitiesMoviment;
        },[]);

        return moviment;
    }
    function possibleMovimentQueen  (){
        const column=Number(this.position.charAt(3));
        const line=Number(this.position.charAt(4));
        const direction = [[1,1],[1,-1],[-1,-1],[-1,1],[0,1],[0,-1],[1,0],[-1,0]];

        const moviment= direction.reduce((possibleMoviment,direction)=>{
            const newPossibilitiesMoviment =  possibleMoviment.concat(checkRegularMovement(direction, column, line, this.color,8));
            return newPossibilitiesMoviment;
        },[]);

        return moviment;
    }
    function possibleMovimentKing (){
        const column=Number(this.position.charAt(3));
        const line=Number(this.position.charAt(4));
        const direction = [[1,1],[1,-1],[-1,-1],[-1,1],[0,1],[0,-1],[1,0],[-1,0]];
    
        const moviment= direction.reduce((possibleMoviment,direction)=>{
            const newPossibilitiesMoviment =  possibleMoviment.concat(checkRegularMovement(direction, column, line, this.color,1));
            return newPossibilitiesMoviment;
        },[]);

        return moviment;
    }

    const checkRegularMovement =([column,line], columnPosition, linePosition, color, maximumPaces)=>{
        let possibleColumn = columnPosition + column;
        let possibleLine = linePosition+ line;
        const possibleDirection = [];
        for(let limit = 1; possibleColumn>=1 && possibleColumn<=8 && possibleLine>=1 && possibleLine<=8 && limit<=maximumPaces;limit++){
            const position = `ref${possibleColumn}${possibleLine}`;
            if(this.chessBoard[position]==null){
                possibleDirection.push(position);
            }
            else if(this.chessBoard[position].color!==color){
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

    function possibleMovimentPawn (){
        const column=Number(this.position.charAt(3));
        const line =Number(this.position.charAt(4));
        const movimentPawn = [];
        const direction=[(this.color==this.colorPieceBoard.bottom)?1:-1]
    //Peças Pretas aumentam a linha e as Brancas diminuem.
    if((line+Number(direction))>=1 && (line+Number(direction))<=8){
        const possibleMovement=[`ref${column}${(line+Number(direction))}`]
        if(this.qtMovements==0){
            possibleMovement.push(`ref${column}${(line+direction*2)}`)
        }
        possibleMovement.forEach((position)=>{
            if(this.chessBoard[position]==null){
                movimentPawn.push(position);
            }
        });

        const possibleEat=[`ref${column-1}${(line+Number(direction))}`,`ref${column+1}${(line+Number(direction))}`];
        possibleEat.forEach((position)=>{
            if((this.chessBoard[position]!==null) && (this.chessBoard[position]!==undefined) && (this.chessBoard[position].color!==this.color)){
                movimentPawn.push(position);
            }
        })   
    }
        return movimentPawn;
    }

    this.positionRefModification = function (ColorValue,NamePieceValue,CoordinateValue){
        const namePiece=`${NamePieceValue}${ColorValue}`;
        const refPiece=this.piecesBoard[namePiece];
        const newPosition = CoordinateValue;
        if(this.chessBoard[newPosition]!==null && refPiece.position!==this.chessBoard[newPosition]){
            this.chessBoard[newPosition].isAtive = false;
        }
            this.chessBoard[refPiece.position]=null;
            refPiece.position=newPosition;
            refPiece.qtMovements++;
            this.chessBoard[newPosition]= refPiece;
    }

    const checkColor=(idSquare)=>{
        let colorMoviment = true;
        if(this.pieceSelect.color!==this.chessBoard[idSquare].color){
            colorMoviment = false;
        }
        return colorMoviment;
    }
    const checkMoviments=(idSquare)=>{
        let movedThePiece =false;
        for(let ref of this.pieceSelect.refMoviments){
            if(ref===idSquare){
                movedThePiece=true;
                break;
            }
        }
        return movedThePiece;
    }
    const movePiece=(idSquare)=>{
        const informationPieceSelect={
            color: this.chessBoard[this.pieceSelect.refPiece].color,
            namePiece: this.chessBoard[this.pieceSelect.refPiece].name,
        }
        this.positionRefModification(informationPieceSelect.color,informationPieceSelect.namePiece,idSquare);
    }
    this.movimentsPiece = function (piece){
        const refId=this.piecesBoard[piece].position;
        this.movimentsModification(refId)
    }
    // Movimentação peça no tabuleiro
    this.movimentsModification = function (idSquare){
        if((this.pieceSelect.refPiece!==idSquare)&&(this.chessBoard[idSquare]!==null)&&checkColor(idSquare))
        {
            this.pieceSelect.refPiece=idSquare;
            const refPiece = this.chessBoard[idSquare];
            this.pieceSelect.namePiece=refPiece.name;
            this.pieceSelect.refMoviments = (refPiece)?refPiece.functionPiece():[];      
        }
        else{
            if(checkMoviments(idSquare)){
                movePiece(idSquare);   
                this.pieceSelect.color=(this.colorPieceBoard.top===this.pieceSelect.color)?this.colorPieceBoard.bottom:this.colorPieceBoard.top;
            }
            this.pieceSelect.namePiece=null;
            this.pieceSelect.refPiece=null;           
            this.pieceSelect.refMoviments=[];
        } 
    }
}