import { RequestHandler } from 'express'
import * as yup from 'yup'

const nameSchema = yup
  .string()
  .required()
  .max(30) // eslint-disable-line no-magic-numbers
  .min(1)
  .trim()

const newCategorySchema = yup.object().shape({
  name: nameSchema,
})

function validateCategory(): RequestHandler {
  return async (request, _response, next) => {
    request.body = await newCategorySchema.validate({
      name: request.body.name,
    }, { abortEarly: false })

    next()
  }
}

export default validateCategory
