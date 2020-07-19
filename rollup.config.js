import path from 'path'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist', // This is also declared in tsconfig
    format: 'es', // Output bundle should use ES Module syntax
    sourcemap: true,
    exports: 'named', // Export multiple named modules instead of a single default one
  },
  // Do not include any 3rd party libraries in the bundled code
  external: id => !id.startsWith('.') && !path.isAbsolute(id),
  plugins: [typescript()],
}
