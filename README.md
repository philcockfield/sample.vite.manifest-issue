# Issue Sample

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
