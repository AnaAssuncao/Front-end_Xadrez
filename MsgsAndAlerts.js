const msgsAndAlerts={
    network:{
        connectedServer:{
            connection:"errServe",
            alertToRender:"Erro no servidor, tente mais tarde"
        },
        roomWithOnePlayer:{
            statusRoom:"roomWithOnePlayer",
            alertToRender:"Esta sala já foi criada, conecta ao jogador"
        },
        roomUnavailable:{
            statusRoom:"roomUnavailable",
            alertToRender:"Nesta sala já está acontecendo um jogo, tente outro código"
        },
        connectedRoom:{
            statusRoom:"connectedRoom",
            statusGame:null
        },
        noExistRoom:{
            statusRoom:"noExistRoom",    
            alertToRender:"Está sala não existe, cria esta sala"
        },
    }
}

export default msgsAndAlerts