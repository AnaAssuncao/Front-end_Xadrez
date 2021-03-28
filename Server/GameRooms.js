const Room = require('./Models/roomGame')

module.exports =gameRooms={
    createdRooms:{},
    addNewRoom(roomCode,playerCode,playerName,playerColor){
        this.createdRooms[roomCode]= new Room(roomCode,playerCode,playerName,playerColor)
        return this.createdRooms[roomCode]
    },
    removeRoom(roomCode){
        setTimeout(()=>delete this.createdRooms[roomCode],30000)
    },
    verifyRoomCode(roomCode){
        if(this.createdRooms[roomCode]){
            return true
        }
        return false
    }
}
