import { build, context } from 'esbuild';

const run = async ({ entryPoints = ['src/index.ts'], pkg, config = {} }) => {
  const dev = process.argv.includes('--dev');
  const watch = process.argv.includes('--watch');
  const minify = !dev;

  const external = Object.keys({
    ...pkg.dependencies,
    ...pkg.peerDependencies,
  });

  const baseConfig = {
    entryPoints,
    bundle: true,
    minify,
    sourcemap: true,
    platform: 'node',
    format: 'esm',
    outdir: 'dist',
    target: 'es2022',
    external,
    ...config,
  };

  const buildConfig = (format) => ({
    ...baseConfig,
    format,
    // outExtension: format === 'cjs' ? { '.js': '.cjs' } : {},
  });

  try {
    if (watch) {
      const esmContext = await context(buildConfig('esm'));
      await esmContext.watch();
      console.log('Watching for changes...');
    } else {
      await build(buildConfig('esm'));
      console.log('Build completed.');
    }
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
};

export default run;
