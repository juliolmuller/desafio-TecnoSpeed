import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { ValidationError as YupError } from 'yup'
import ApiException from './ApiException'

class ValidationError extends ApiException {
  allMessages: Record<string, string[]>

  constructor(error: YupError) {
    super()
    this.allMessages = {}

    if (error.inner.length) {
      error.inner.forEach((yupError) => {
        if (yupError.path) {
          if (!this.allMessages[yupError.path]) {
            this.allMessages[yupError.path] = []
          }

          this.allMessages[yupError.path].push(...yupError.errors)
        }
      })
    } else if (error.path) {
      this.allMessages[error.path] = error.errors
    } else {
      this.allMessages = { error: ['unknown error'] }
    }
  }

  handle(_request: Request, response: Response) {
    response
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: this.allMessages })
  }
}

export default ValidationError
