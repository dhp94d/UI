import run from '@golfzon-ui/esbuild';
import pkg from './package.json' assert { type: 'json' };

run({
  pkg,
  entryPoints: ['src/**/*'],
});
