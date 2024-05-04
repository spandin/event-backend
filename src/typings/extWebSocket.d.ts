import ws from 'ws'

interface ExtWebSocket extends ws {
  id: string
}
