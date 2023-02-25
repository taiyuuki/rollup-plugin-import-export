import type { Plugin } from 'rollup'
import fastGlob from 'fast-glob'
import path from 'path'
interface ImportExportOptions {
  prefix: string
}
export function importExportPlugin(options: ImportExportOptions = { prefix: 'iem' }): Plugin {
  const code = new Map()
  return {
    name: 'rollup-plugin-import-export',
    async resolveId(source, importer) {
      if (!source.startsWith(options.prefix) || !importer) {
        return null
      }
      const sourceDir = source.replace(`${options.prefix}:`, '')
      const resolveDir = path.dirname(importer)
      const files = (
        await fastGlob(sourceDir, { cwd: resolveDir })
      ).sort()

      const importerCode = `
        ${files
          .map((module) => `export * from '${module}'`)
          .join(';')}
      `
      const tempId = path.join(resolveDir, source.replace(/\W/g, (c) => `_${c.codePointAt(0)}_`))
      code.set(tempId, importerCode)
      return tempId
    },
    load(id) {
      return code.get(id)
    },
  }
}