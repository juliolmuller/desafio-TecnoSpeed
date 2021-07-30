import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { ErrorRequestHandler } from 'express'
import { EntityNotFoundError } from 'typeorm'
import { ValidationError as YupError } from 'yup'
import ApiException from './ApiException'
import ResourceNotFound from './ResourceNotFound'
import ValidationError from './ValidationError'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handler: ErrorRequestHandler = (error, request, response, _next) => {
  if (error instanceof ApiException) {
    error.handle(request, response)
  } else if (error instanceof EntityNotFoundError) {
    new ResourceNotFound().handle(request, response)
  } else if (error instanceof YupError) {
    new ValidationError(error).handle(request, response)
  } else {
    console.log(error)
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

export {
  handler as default,
  ResourceNotFound,
}
