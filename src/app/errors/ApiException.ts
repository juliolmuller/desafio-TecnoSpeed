import { Request, Response } from 'express'

abstract class ApiException extends Error {
  abstract handle(request: Request, response: Response): void | Promise<void>
}

export default ApiException
