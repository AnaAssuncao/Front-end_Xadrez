
const colors={
    white:"White",
    black:"Black"
}

const roomAndCode={
    roomWithOnePlayer:()=> "This room has already been created, connect to the adversary",
    roomUnavailable:()=>"Ocupied room code, try another code",
    connectedRoom:(code)=>"Connected to room " + code,
    noExistRoom:()=>"This room does not exist or code is incorrect, check code or create this room.",
    waitAgain:()=>"It's not your turn to play, wait." ,
    reconnectRoom:()=>"Reconnected room",
    roomNotReconnected:()=>"Room not reconnected",
    runningGame:()=>"Possibly there is an open game tab, close and reload this. If not, reload the page after 5 seconds."
}

const connection={
    noConnection:()=>"No server connection, wait or play local.",
    errServer:()=>"There was an error on the server, please reload the page.",
    place:()=>"Local Game",
    waitAdv:()=>"Awaiting adversary",
    connected:(playerName)=>"Adversary "+ playerName
}

const checksPiece={
    checkMate:(color)=> "Checkmate in the " + colors[color] + " Pieces",
    check:(color)=>"Check in the " + colors[color] + " Pieces",
    noCheck:()=>"No Check"
}

const checksPlayers={
    checkMate:(playerName)=>"Checkmate on the Player " + playerName,
    check:(playerName)=>"Check on the Player " + playerName,
    noCheck:()=>"No Check"
}
    
const endGame={
    winPiece:(color)=>"Victory of the " + colors[color] + " Pieces",
    winPlayer:(playerName)=>"Player victory " + playerName,
    giveUpPlayer:(playerName)=>"Player " + playerName +" has surrendered",
    draw:()=>"Tied game",
    timeOutToMovePiece:(color)=>"Time out to move " + colors[color] + " Pieces",
    timeOutToMovePlayer:(playerName)=>"Time out to move Player" + playerName
}

const startGame={
    startGame:()=>"Game started",
    colorPlayer:(color)=>"The color of your Pieces are " + colors[color],
    noAdv:()=> "No adversary"
}

const movement={
    movementPiece:(color)=>"Movement of " + colors[color] + " Pieces",
    movementPlayer:(color,name)=>"Movement of " + colors[color] + " Pieces - Player    " + name,
    return:(color)=>"Return of " + colors[color] + " Pieces",
    nextColor:(color)=>"Pieces turn: " + colors[color],
    nextPlayer:(name)=>"Player turn: " + name,
    yourTurn:(name)=>name + " your turn to play",
    nextColorAndPlayer:(color,name)=>"Pieces turn: " + colors[color]+" - Player turn: " + name,
    incorrectMovement:(color)=>"Error in playing the Pieces " + colors[color],
    cheatMovement:()=>"Cheat move",
    endTime:()=>"Time has ended to player",
    moveAgain:()=>"Move again",
    correctMovement:()=>"Correct movement"
}
const log={
    connected:(playerName)=>"Connected with " + playerName,
    gamelog:(msg)=>{
        const time = new Date()
        const hours = formatTime(time.getHours())
        const minutes = formatTime(time.getMinutes())
        const seconds = formatTime(time.getSeconds())
        return `${hours}:${minutes}:${seconds} - ${msg}`
    }
}

const formatTime=(number)=>{
    let stringNumber = number.toString()
    if(stringNumber.length===1){
        stringNumber = "0" + stringNumber
    }
    return stringNumber
}

export default {
    roomAndCode,
    connection,
    checksPiece,
    checksPlayers,
    endGame,
    startGame,
    movement,
    log
}
