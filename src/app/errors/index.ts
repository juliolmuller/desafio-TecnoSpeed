import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import type { ErrorRequestHandler } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error)
  response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
}

export default handler
