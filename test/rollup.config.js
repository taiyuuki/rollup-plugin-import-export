import { defineConfig } from 'rollup'
import ts from 'rollup-plugin-typescript2'
import { importExportPlugin } from 'rollup-plugin-import-export'
// import commonjs from '@rollup/plugin-commonjs'
const config = defineConfig({
  input: 'test/input/index.ts',
  output: {
    dir: 'test/output',
    format: 'esm',
    preserveModules: true,
  },
  plugins: [importExportPlugin(), ts()]
})

export default config