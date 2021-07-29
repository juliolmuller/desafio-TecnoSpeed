import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { ErrorRequestHandler } from 'express'
import ApiException from './ApiException'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handler: ErrorRequestHandler = (error, request, response, _next) => {
  if (error instanceof ApiException) {
    error.handle(request, response)
  }

  console.log(error)
  response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
}

export default handler
export { default as ResourceNotFound } from './ResourceNotFound'
