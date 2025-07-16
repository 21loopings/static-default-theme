/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    base: "./",
    build: {
        outDir: "./dist",
        lib: {
            entry: path.resolve(__dirname, "src/theme.tsx"),
            name: 'theme',
            formats: ['umd'],
            fileName: format => `theme.js`,
        },
        minify: false,
    },
    esbuild: {
        jsx: "transform",
        jsxDev: false,
        jsxInject: `import { jsx, React } from '@/react/jsx-runtime'`,
        jsxFactory: "jsx",
    },
    test: {
        globals: true,
        environment: "node",
    },
    resolve: {
        alias: [
            { find: "@", replacement: path.resolve(__dirname, "src") },
            { find: "@@", replacement: path.resolve(__dirname) },
        ],
    },
});
