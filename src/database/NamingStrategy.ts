/* eslint-disable class-methods-use-this */
import { DefaultNamingStrategy } from 'typeorm'
import snakeCase from 'lodash.snakecase'
import pluralize from 'pluralize'

class NamingStrategy extends DefaultNamingStrategy {

  // Default table name becomes the plural of model name
  tableName(targetName: string, userSpecifiedName: string | undefined) {
    if (userSpecifiedName) {
      return userSpecifiedName
    }

    const nameParts = snakeCase(targetName).split('_')
    const [lastName] = nameParts.splice(-1)
    const pluralName = pluralize(lastName)

    return [...nameParts, pluralName].join('_')
  }

  // Transform pascal-cased properties to snake-cased columns names
  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]) {
    const prefix = snakeCase(embeddedPrefixes.concat('').join('_'))
    const columnName = customName ?? snakeCase(propertyName)

    return prefix + columnName
  }
}

export default NamingStrategy
