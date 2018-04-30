import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify'

export default [{
    input: 'src/headerComponent.js',
    output: {
        file: 'public/javascripts/headerComponent.js',
        format: 'umd',
        name: 'Academy.headerComponent',
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
        }
    },
    external: [
        'react',
        'react-dom'
    ],
    plugins: [
        resolve({
            jsnext: true,
            main: true
        }),
        babel({
            include: ['*.js', '**/*.js'],
            exclude: 'node_modules/**'
        }),
        commonjs(),
        uglify()
    ]
}, {
    input: 'src/sidebarComponent.js',
    output: {
        file: 'public/javascripts/sidebarComponent.js',
        format: 'umd',
        name: 'Academy/sidebarComponent',
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
        }
    },
    external: [
        'react',
        'react-dom'
    ],
    plugins: [
        resolve(),
        babel({
            include: ['*.js', '**/*.js'],
            exclude: 'node_modules/**'
        }),
        commonjs(),
        uglify()
    ]
}];