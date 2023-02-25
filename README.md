### rollup-plugin-import-export

A rollup plugin to export from glob import.

## Example

There are the following modules.

```tree
src
 ├─modules 
 │  └─t1
 │  │  └─index.js
 │  ├─t2.js
 │  └─t3.js 
 └─ index.js
```

`src/index.js`

```js
export * from 'iem:./modules/**/*'
```

Rollup output

```js
export * from './modules/t1/index.js';
export * from './modules/t2.js';
export * from './modules/t3.js';
```

## Usage

Install this plugin in your project.

```shell
npm install --save-dev rollup-plugin-import-export
```

Add this plugin to your rollup.config.js.

```diff
import { defineConfig } from 'rollup'
+import { importExportPlugin } from 'rollup-plugin-import-export'

const config = defineConfig({
  input: 'src/index.js',
  output: {
    dir: 'dist'
  },
  plugins: [
+      importExportPlugin()
  ]
})

export default config
```

Export from import.

```ts
// @ts-ignore
export * from 'iem:./modules/**/*'
```

### Prefix

The default prefix is `iem`, you can modify it via options.   

```diff
import { defineConfig } from 'rollup'
import { importExportPlugin } from 'rollup-plugin-import-export'

const config = defineConfig({
  input: 'src/index.js',
  output: {
    dir: 'dist'
  },
  plugins: [
- 	   importExportPlugin()
+      importExportPlugin({ prefix: 'glob' })
  ]
})

export default config
```

Then

```diff
- export * from 'iem:./modules/**/*'
+ export * from 'glob:./modules/**/*'
```

### Declaration

If you don't want to use `@ts-ignore`, you can type declare the module.

```ts
// iem.d.ts 
declare module 'iem:./modules/*' {
    export {}
}
```

