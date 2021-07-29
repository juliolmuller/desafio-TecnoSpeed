import { RequestHandler } from 'express'
import * as yup from 'yup'

const descriptionsSchema = yup
  .string()
  .optional()
  .max(30) // eslint-disable-line no-magic-numbers
  .trim()
const valueSchema = yup
  .number()
  .required()
  .test({
    name: 'non_zero',
    message: 'Valor deve ser no mínimo de 1 centavo (+ ou -).',
    test: (value) => !!value && Math.abs(value) > 0.01, // eslint-disable-line no-magic-numbers
  })

const newTransactionSchema = yup.object().shape({
  description: descriptionsSchema,
  value: valueSchema,
})

const updateTransactionSchema = yup.object().shape({
  description: descriptionsSchema,
})

function validateTransaction(type: 'NEW' | 'UPDATE'): RequestHandler {
  const schema = type === 'NEW'
    ? newTransactionSchema
    : updateTransactionSchema

  return async (request, _response, next) => {
    request.body = await schema.validate({
      description: request.body.description,
      value: request.body.value,
    }, { abortEarly: false })

    next()
  }
}

export default validateTransaction
