const noMove = (pieceTest)=> {
    const chessBoard =
    {
        ref11:null,
        ref12: {name: 'Pawn-1', fullName: 'Pawn-1white', color: 'white', imgName: 'pawnWhite', position: 'ref12'},
        ref13:null,
        ref14:null,
        ref15:null,
        ref16:null,
        ref17:null,
        ref18:null,
        ref21:{name: 'Knight-Left', fullName: 'Knight-Leftwhite', color: 'white', imgName: 'knightWhite', position: 'ref21'},
        ref22:{name: 'Pawn-2', fullName: 'Pawn-2white', color: 'white', imgName: 'pawnWhite', position: 'ref22'},
        ref23:{name: 'Pawn-3', fullName: 'Pawn-3white', color: 'white', imgName: 'pawnWhite', position: 'ref23'},
        ref24:null,
        ref25:null,
        ref26:null,
        ref27:null,
        ref28:null,
        ref31:null,
        ref32:{name: 'Pawn-4', fullName: 'Pawn-4white', color: 'white', imgName: 'pawnWhite', position: 'ref24'},
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
    chessBoard[pieceTest.position]=pieceTest
    return chessBoard
}

const withMove = (pieceTest) =>{
    const chessBoard=
    {
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
    chessBoard[pieceTest.position]=pieceTest
    return chessBoard
}

const withMoveToEat = (pieceTest,refAdversaryPiece) =>{
    const adversaryPiece= {name: 'Pawn-2', fullName: 'Pawn-2black', color: 'black', imgName: 'pawnBlack', position: refAdversaryPiece}
    const chessBoard=
        {
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
    chessBoard[pieceTest.position]=pieceTest
    chessBoard[refAdversaryPiece]=adversaryPiece
    return chessBoard
}
export {
    withMove,
    withMoveToEat,
    noMove
}