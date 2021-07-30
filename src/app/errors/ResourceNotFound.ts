import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import ApiException from './ApiException'

class ResourceNotFound extends ApiException {
  // eslint-disable-next-line class-methods-use-this
  handle(_request: Request, response: Response) {
    response
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'Recurso não encontrado' })
  }
}

export default ResourceNotFound
