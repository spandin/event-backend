import server from './server'
import { PORT } from './constants'

const SERVER_PORT = process.env.PORT || PORT

const initialize = () => {
  server.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`)
  })
}

initialize()
