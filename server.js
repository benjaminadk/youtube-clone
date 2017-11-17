import express from 'express'

const server = express()
const PORT = 8081

server.listen(PORT, () => console.log(`SERVER LISTENING ON PORT: ${PORT}`))