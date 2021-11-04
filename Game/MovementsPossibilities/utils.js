const checkRegularMovement = ([column,line], columnPosition, linePosition, color, maximumPaces,chessBoard)=>{
    let possibleColumn = columnPosition + column
    let possibleLine = linePosition+ line
    const possibleDirection = []
    for(let limit = 1; possibleColumn>=1 && possibleColumn<=8 && possibleLine>=1 && possibleLine<=8 && limit<=maximumPaces;limit++){
        const position = `ref${possibleColumn}${possibleLine}`
        if(chessBoard.reference[position]==null){
            possibleDirection.push(position)
        }
        else if(chessBoard.reference[position].color!==color){
            possibleDirection.push(position)
            break
        }
        else{
            break
        }
        possibleColumn = possibleColumn+column
        possibleLine= possibleLine+line
    }
    return possibleDirection
}

export {checkRegularMovement}