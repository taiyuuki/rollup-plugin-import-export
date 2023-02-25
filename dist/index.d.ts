import { Plugin } from 'rollup';

interface ImportExportOptions {
    prefix: string;
}
declare function importExportPlugin(options?: ImportExportOptions): Plugin;

export { importExportPlugin };
