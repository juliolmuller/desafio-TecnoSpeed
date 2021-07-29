import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import ApiException from './ApiException'

class ResourceNotFound extends ApiException {
  handle(_request: Request, response: Response) {
    response
      .status(StatusCodes.NOT_FOUND)
      .json({ message: this.message })
  }
}

export default ResourceNotFound
