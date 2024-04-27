import server from './server.js'
import { PORT } from './constants/index.js'

const SERVER_PORT = process.env.PORT || PORT

const initialize = () => {
  server.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`)
  })
}

initialize()
