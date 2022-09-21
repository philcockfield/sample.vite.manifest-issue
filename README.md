# Issue Sample

[Vite Issue #10190](https://github.com/vitejs/vite/issues/10190)

Run:

```bash
yarn        # <== install
yarn build  # <== generate production build
```


## Context

When Vite uses a worker (which emits a [seperate chunk in the production build](https://vitejs.dev/guide/features.html#import-with-query-suffixes)) and is configured to export a build manifest, eg:

```ts
// vite.config.mts

import { UserConfigExport } from 'vite';

const config: UserConfigExport = {
  build: {
    manifest: true,
  },
};

export default config;

```

The generated manifest is stomped on during compilation.  This looks like some kind of race condition where two 
different processes build but do not coordinate to produce a unified final manifest (speculation) -??

## Warning Output 

   $ yarn build

![image](https://user-images.githubusercontent.com/185555/191613667-475683fe-5070-4415-89be-9499f38acfeb.png)

>> "rendering chunks (1)...The emitted file "manifest.json" overwrites a previously emitted file of the same name."


## Error State

The manifest contains only one of the build assets:

```json
{
  "index.html": {
    "file": "assets/index.0c2f4243.js",
    "src": "index.html",
    "isEntry": true
  }
}
```

While the actual `/dist` output folder contains two files:

![image](https://user-images.githubusercontent.com/185555/191614010-2cdd9618-c9b0-4a9d-9e5f-36b3f10b885e.png)



### System Info

```shell
System:
    OS: macOS 12.6
    CPU: (8) arm64 Apple M1
    Memory: 77.03 MB / 8.00 GB
    Shell: 5.8.1 - /bin/zsh
  Binaries:
    Node: 18.7.0 - /usr/local/bin/node
    Yarn: 1.22.19 - /usr/local/bin/yarn
    npm: 8.15.0 - /usr/local/bin/npm
  Browsers:
    Brave Browser: 105.1.43.93
    Safari: 16.0
  npmPackages:
    vite: ^3.1.0 => 3.1.3
```


### Used Package Manager

yarn

### Logs

<details>
<summary>Click to expand!</summary>

```shell
sample.vite.manifest-issue git:(main) yarn vite build --debug
yarn run v1.22.19
$ /Users/phil/Documents/tmp/sample.vite.manifest-issue/node_modules/.bin/vite build --debug
  vite:config bundled config file loaded in 45.17ms +0ms
  vite:esbuild init tsconfck (root: /Users/phil/Documents/tmp/sample.vite.manifest-issue) +0ms
  vite:esbuild init tsconfck (root: /Users/phil/Documents/tmp/sample.vite.manifest-issue) +0ms
  vite:esbuild init tsconfck (root: /Users/phil/Documents/tmp/sample.vite.manifest-issue) +0ms
  vite:esbuild init tsconfck (root: /Users/phil/Documents/tmp/sample.vite.manifest-issue) +1ms
  vite:esbuild init tsconfck end +1ms
  vite:esbuild init tsconfck end +0ms
  vite:esbuild init tsconfck end +1ms
  vite:esbuild init tsconfck end +0ms
  vite:config using resolved config: {
  vite:config   build: {
  vite:config     target: [ 'es2020', 'edge88', 'firefox78', 'chrome87', 'safari13' ],
  vite:config     polyfillModulePreload: true,
  vite:config     outDir: 'dist',
  vite:config     assetsDir: 'assets',
  vite:config     assetsInlineLimit: 4096,
  vite:config     cssCodeSplit: true,
  vite:config     cssTarget: [ 'es2020', 'edge88', 'firefox78', 'chrome87', 'safari13' ],
  vite:config     sourcemap: false,
  vite:config     rollupOptions: {},
  vite:config     minify: 'esbuild',
  vite:config     terserOptions: {},
  vite:config     write: true,
  vite:config     emptyOutDir: null,
  vite:config     manifest: true,
  vite:config     lib: false,
  vite:config     ssr: false,
  vite:config     ssrManifest: false,
  vite:config     reportCompressedSize: true,
  vite:config     chunkSizeWarningLimit: 500,
  vite:config     watch: null,
  vite:config     commonjsOptions: { include: [Array], extensions: [Array] },
  vite:config     dynamicImportVarsOptions: { warnOnError: true, exclude: [Array] }
  vite:config   },
  vite:config   optimizeDeps: {
  vite:config     disabled: 'build',
  vite:config     force: undefined,
  vite:config     esbuildOptions: { preserveSymlinks: undefined }
  vite:config   },
  vite:config   configFile: '/Users/phil/Documents/tmp/sample.vite.manifest-issue/vite.config.mts',
  vite:config   configFileDependencies: [
  vite:config     '/Users/phil/Documents/tmp/sample.vite.manifest-issue/vite.config.mts'
  vite:config   ],
  vite:config   inlineConfig: {
  vite:config     root: undefined,
  vite:config     base: undefined,
  vite:config     mode: undefined,
  vite:config     configFile: undefined,
  vite:config     logLevel: undefined,
  vite:config     clearScreen: undefined,
  vite:config     optimizeDeps: { force: undefined },
  vite:config     build: {}
  vite:config   },
  vite:config   root: '/Users/phil/Documents/tmp/sample.vite.manifest-issue',
  vite:config   base: '/',
  vite:config   resolve: { alias: [ [Object], [Object] ] },
  vite:config   publicDir: '/Users/phil/Documents/tmp/sample.vite.manifest-issue/public',
  vite:config   cacheDir: '/Users/phil/Documents/tmp/sample.vite.manifest-issue/node_modules/.vite',
  vite:config   command: 'build',
  vite:config   mode: 'production',
  vite:config   ssr: {
  vite:config     format: 'esm',
  vite:config     target: 'node',
  vite:config     optimizeDeps: { disabled: true, esbuildOptions: [Object] }
  vite:config   },
  vite:config   isWorker: false,
  vite:config   mainConfig: null,
  vite:config   isProduction: true,
  vite:config   plugins: [
  vite:config     'vite:build-metadata',
  vite:config     'vite:pre-alias',
  vite:config     'alias',
  vite:config     'vite:modulepreload-polyfill',
  vite:config     'vite:resolve',
  vite:config     'vite:html-inline-proxy',
  vite:config     'vite:css',
  vite:config     'vite:esbuild',
  vite:config     'vite:json',
  vite:config     'vite:wasm-helper',
  vite:config     'vite:worker',
  vite:config     'vite:asset',
  vite:config     'vite:wasm-fallback',
  vite:config     'vite:define',
  vite:config     'vite:css-post',
  vite:config     'vite:build-html',
  vite:config     'vite:worker-import-meta-url',
  vite:config     'vite:force-systemjs-wrap-complete',
  vite:config     'vite:watch-package-data',
  vite:config     'commonjs',
  vite:config     'vite:data-uri',
  vite:config     'vite:asset-import-meta-url',
  vite:config     'vite:dynamic-import-vars',
  vite:config     'vite:import-glob',
  vite:config     'vite:build-import-analysis',
  vite:config     'vite:esbuild-transpile',
  vite:config     'vite:terser',
  vite:config     'vite:manifest',
  vite:config     'vite:reporter',
  vite:config     'vite:load-fallback'
  vite:config   ],
  vite:config   server: {
  vite:config     preTransformRequests: true,
  vite:config     middlewareMode: false,
  vite:config     fs: { strict: true, allow: [Array], deny: [Array] }
  vite:config   },
  vite:config   preview: {
  vite:config     port: undefined,
  vite:config     strictPort: undefined,
  vite:config     host: undefined,
  vite:config     https: undefined,
  vite:config     open: undefined,
  vite:config     proxy: undefined,
  vite:config     cors: undefined,
  vite:config     headers: undefined
  vite:config   },
  vite:config   env: { BASE_URL: '/', MODE: 'production', DEV: false, PROD: true },
  vite:config   assetsInclude: [Function: assetsInclude],
  vite:config   logger: {
  vite:config     hasWarned: false,
  vite:config     info: [Function: info],
  vite:config     warn: [Function: warn],
  vite:config     warnOnce: [Function: warnOnce],
  vite:config     error: [Function: error],
  vite:config     clearScreen: [Function: clearScreen],
  vite:config     hasErrorLogged: [Function: hasErrorLogged]
  vite:config   },
  vite:config   packageCache: Map(0) { set: [Function (anonymous)] },
  vite:config   createResolver: [Function: createResolver],
  vite:config   worker: {
  vite:config     format: 'iife',
  vite:config     plugins: [
  vite:config       'vite:build-metadata',
  vite:config       'vite:pre-alias',
  vite:config       'alias',
  vite:config       'vite:modulepreload-polyfill',
  vite:config       'vite:resolve',
  vite:config       'vite:html-inline-proxy',
  vite:config       'vite:css',
  vite:config       'vite:esbuild',
  vite:config       'vite:json',
  vite:config       'vite:wasm-helper',
  vite:config       'vite:worker',
  vite:config       'vite:asset',
  vite:config       'vite:wasm-fallback',
  vite:config       'vite:define',
  vite:config       'vite:css-post',
  vite:config       'vite:build-html',
  vite:config       'vite:worker-import-meta-url',
  vite:config       'vite:force-systemjs-wrap-complete',
  vite:config       'vite:watch-package-data',
  vite:config       'commonjs',
  vite:config       'vite:data-uri',
  vite:config       'vite:asset-import-meta-url',
  vite:config       'vite:dynamic-import-vars',
  vite:config       'vite:import-glob',
  vite:config       'vite:build-import-analysis',
  vite:config       'vite:esbuild-transpile',
  vite:config       'vite:terser',
  vite:config       'vite:manifest',
  vite:config       'vite:reporter',
  vite:config       'vite:load-fallback'
  vite:config     ],
  vite:config     rollupOptions: {},
  vite:config     getSortedPlugins: [Function: getSortedPlugins],
  vite:config     getSortedPluginHooks: [Function: getSortedPluginHooks]
  vite:config   },
  vite:config   appType: 'spa',
  vite:config   experimental: { importGlobRestoreExtension: false, hmrPartialAccept: false },
  vite:config   getSortedPlugins: [Function: getSortedPlugins],
  vite:config   getSortedPluginHooks: [Function: getSortedPluginHooks]
  vite:config } +9ms
vite v3.1.3 building for production...
✓ 1 modules transformed.
✓ 4 modules transformed.
rendering chunks (1)...The emitted file "manifest.json" overwrites a previously emitted file of the same name.
dist/manifest.json               0.11 KiB
dist/assets/worker.1e26ae98.js   0.07 KiB
dist/index.html                  0.22 KiB
dist/assets/index.0c2f4243.js    0.89 KiB / gzip: 0.48 KiB
✨  Done in 1.08s.```
</details>

