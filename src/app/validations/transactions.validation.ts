import { RequestHandler } from 'express'
import * as yup from 'yup'
import { Category } from '../models'

const descriptionsSchema = yup
  .string()
  .optional()
  .max(30) // eslint-disable-line no-magic-numbers
  .trim()
  .nullable()
const valueSchema = yup
  .number()
  .required()
  .test({
    name: 'non_zero',
    message: 'Valor deve ser no mínimo de 1 centavo (+ ou -).',
    test: (value) => !!value && Math.abs(value) > 0.01, // eslint-disable-line no-magic-numbers
  })
const categoryIdSchema = yup
  .number()
  .optional()
  .min(1)
  .nullable()
  .test({
    name: 'category_not_found',
    message: 'Categoria não existente.',
    async test(value) {
      if (value === null || value === undefined) {
        return true
      }

      return Boolean(await Category.findOne(this.options.context?.categoryId))
    },
  })

const newTransactionSchema = yup.object().shape({
  description: descriptionsSchema,
  category_id: categoryIdSchema,
  value: valueSchema,
})

const updateTransactionSchema = yup.object().shape({
  description: descriptionsSchema,
  category_id: categoryIdSchema,
})

function validateTransaction(type: 'NEW' | 'UPDATE'): RequestHandler {
  const schema = type === 'NEW'
    ? newTransactionSchema
    : updateTransactionSchema

  return async (request, _response, next) => {
    request.body = await schema.validate({
      description: request.body.description,
      category_id: request.body.category_id,
      value: request.body.value,
    }, {
      abortEarly: false,
      context: {
        categoryId: request.body.category_id,
      },
    })

    next()
  }
}

export default validateTransaction
