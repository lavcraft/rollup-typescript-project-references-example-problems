import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import typescript2 from 'rollup-plugin-typescript2';
import fs from 'fs';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
    input: {
        ...files('actions'),
        ...files('models'),
    },
    output: {
        sourcemap: true,
        dir: 'build',
        preserveModules: false,
        format: 'esm'
    },
    plugins: [
        nodeResolve(),
        typescript2({
            // useTsconfigDeclarationDir: true,
            // debugging options
            verbosity: 3,
            clean: true,
        }),
        // commonjs(),
    ],
    external: [
        /@shared/,
        'undici',
        'querystring',
        'mobx',
        'mobx-react-lite',
        'mobx-utils',
        'react',
    ],
    watch: {
        chokidar: true,
        exclude: ['build/**', '**/*.d.ts', '**/*.js']
    }
};

function files(dir = '.', exclude = ['__tests__']) {
    return fs
        .readdirSync(path.resolve(__dirname, `src/${dir}`))
        .reduce((prev, current) => {
            if (exclude.includes(current)) return prev;
            const targetName = current.replace('.ts', '');
            prev[`${dir}/${targetName}`] = `./src/${dir}/${current}`;
            return prev;
        }, {});
}
export default [config];
