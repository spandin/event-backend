declare namespace Express {
  interface Request {
    _query: {
      [key: string]: string | undefined
    }
  }
}
