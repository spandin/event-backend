import { CorsOptions } from 'cors'
import { CLIENT_ORIGINS } from './constants/index.js'

export const CORS_CONFIG: CorsOptions = {
  origin: CLIENT_ORIGINS,
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: true
}
