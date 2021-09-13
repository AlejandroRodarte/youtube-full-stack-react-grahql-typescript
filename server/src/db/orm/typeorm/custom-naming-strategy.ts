import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm'

export default class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  primaryKeyName (tableOrName: Table | string, columnNames: string[]): string {
    const names = []

    if (tableOrName instanceof Table) names.push(tableOrName.name)
    else names.push(tableOrName)

    names.push(...columnNames)

    return names.join('_')
  }

  foreignKeyName (tableOrName: Table | string, columnNames: string[], referencedTablePath?: string, referencedColumnNames?: string[]): string {
    const names = []

    if (tableOrName instanceof Table) names.push(tableOrName.name)
    else names.push(tableOrName)

    if (referencedTablePath) names.push(referencedTablePath)

    columnNames.forEach((columnName, index) => {
      names.push(columnName)
      if (referencedColumnNames && referencedColumnNames[index]) names.push(referencedColumnNames[index])
    })

    return names.join('_')
  }
}
