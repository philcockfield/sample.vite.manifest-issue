import { BuildOptions, defineConfig, LibraryOptions, UserConfigExport } from 'vite';

export default () => {
  const config: UserConfigExport = {
    build: {
      manifest: true,
    },
  };

  return config;
};
