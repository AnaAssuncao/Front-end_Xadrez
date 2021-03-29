const express = require('express')
const app = express()
const routes = require('./Router')
const cors = require('cors')
const gameRooms = require("./GameRooms.js")

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3030, () => {
	console.log('servidor rodando')
})