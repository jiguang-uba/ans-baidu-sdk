import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'
import { uglify } from 'rollup-plugin-uglify'
import path from 'path'

const pathResolve = p => path.join(__dirname, p)

function changePath () {
    return {
        name: 'changePath',
        transform: function transform (code, id) {
            code = code.replace(/@Storage/g, pathResolve('../../src/ProgramDiff/baidu/storage'))
                .replace(/@Device/g, pathResolve('../../src/ProgramDiff/baidu/device'))
                .replace(/@Fetch/g, pathResolve('../../src/ProgramDiff/baidu/fetch'))
                .replace(/@Router/g, pathResolve('../../src/ProgramDiff/baidu/router'))
                .replace(/\$ANS/g, 'BD')
                .replace(/\$LIB/g, 'Baidu')
                .replace(/\$LibVERSION/, '4.3.1')
            return {
                code: code,
                id: id
            }
        }
    }
}

export default [{
    input: './src/main.js',
    output: [
        {
            file: './Demo/util/sdk/AnalysysAgent_Baidu_SDK.es6.min.js',
            format: 'esm',
            name: 'Ans',
            plugins: [
                terser({
                    mangle: {
                        toplevel: true
                    }
                })
            ]
        }, {
            file: './Demo/util/sdk/AnalysysAgent_Baidu_SDK.min.js',
            format: 'cjs',
            name: 'Ans',
            plugins: [
                uglify({
                    mangle: {
                        toplevel: true
                    }
                })
            ]
        }, {
            file: './dist/Baidu/AnalysysAgent_Baidu_SDK.es6.min.js',
            format: 'esm',
            name: 'Ans',
            plugins: [
                terser({
                    mangle: {
                        toplevel: true
                    }
                })
            ]
        }, {
            file: './dist/Baidu/AnalysysAgent_Baidu_SDK.min.js',
            format: 'cjs',
            name: 'Ans',
            plugins: [
                uglify({
                    mangle: {
                        toplevel: true
                    }
                })
            ]
        }, {
            file: './taroDemo/src/sdk/AnalysysAgent_Baidu_SDK.min.js',
            format: 'cjs',
            name: 'Ans',
            plugins: [
                uglify({
                    mangle: {
                        toplevel: true
                    }
                })
            ]
        }, {
            file: './taroDemo/src/sdk/AnalysysAgent_Baidu_SDK.es6.min.js',
            format: 'esm',
            name: 'Ans',
            plugins: [
                terser({
                    mangle: {
                        toplevel: true
                    }
                })
            ]
        }],
    plugins: [
        changePath(),
        replace({
            $ans: 'swan',
            delimiters: ['', '']
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        commonjs(),
        eslint({
            exclude: [
                'src/**'
            ]
        }),
        babel({
            exclude: 'node_modules/**'
        }),
        terser({
            mangle: {
                toplevel: true
            }
        })
    ],
    sourceMap: true

}, {
    input: './src/main_custom.js',
    output: [
        {
            file: './Demo/util/sdk/AnalysysAgent_Baidu_SDK.custom.es6.min.js',
            format: 'esm',
            name: 'Ans',
            plugins: [
                terser({
                    mangle: {
                        toplevel: true
                    }
                })
            ]
        }, {
            file: './Demo/util/sdk/AnalysysAgent_Baidu_SDK.custom.min.js',
            format: 'cjs',
            name: 'Ans',
            plugins: [
                uglify({
                    mangle: {
                        toplevel: true
                    }
                })
            ]
        }, {
            file: './dist/Baidu/AnalysysAgent_Baidu_SDK.custom.es6.min.js',
            format: 'esm',
            name: 'Ans',
            plugins: [
                terser({
                    mangle: {
                        toplevel: true
                    }
                })
            ]
        }, {
            file: './dist/Baidu/AnalysysAgent_Baidu_SDK.custom.min.js',
            format: 'cjs',
            name: 'Ans',
            plugins: [
                uglify({
                    mangle: {
                        toplevel: true
                    }
                })
            ]
        }, {
            file: './taroDemo/src/sdk/AnalysysAgent_Baidu_SDK.custom.min.js',
            format: 'cjs',
            name: 'Ans',
            plugins: [
                uglify({
                    mangle: {
                        toplevel: true
                    }
                })
            ]
        }, {
            file: './taroDemo/src/sdk/AnalysysAgent_Baidu_SDK.custom.es6.min.js',
            format: 'esm',
            name: 'Ans',
            plugins: [
                terser({
                    mangle: {
                        toplevel: true
                    }
                })
            ]
        }],
    plugins: [
        changePath(),
        replace({
            $ans: 'swan',
            delimiters: ['', '']
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        commonjs(),
        eslint({
            exclude: [
                'src/**'
            ]
        }),
        babel({
            exclude: 'node_modules/**'
        }),
        terser({
            mangle: {
                toplevel: true
            }
        })
    ],
    sourceMap: true

}]
