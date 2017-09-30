const gulp = require('gulp')
const reflecto = require('gulp-reflecto')
const postcss = require('gulp-postcss')
const cssnext = require('postcss-cssnext')
const cssImport = require('postcss-import')
const watchify = require('watchify')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const gutil = require('gulp-util')
const babelify = require('babelify')
const aliasify = require('aliasify')
const globify = require('require-globify')
const markdown = require('browserify-markdown')
const mergeStream = require('merge-stream')

const bundleFactory = (bundles) => ({ watchMode = false }) => {
  return function bundlerTask () {
    const streams = bundles.map((bundleConfig) => {
      const opts = Object.assign({}, watchMode && watchify.args, {
        debug: true
      }, bundleConfig.browserifyOptions)
      let bundler = browserify(bundleConfig.entry, opts)

      if (watchMode) {
        bundler = watchify(bundler)
      }

      bundler.transform(markdown)
      bundler.transform(babelify)
      bundler.transform(globify)
      bundler.transform(aliasify, {
        // verbose: true,
        // debug: true,
        replacements: {
          '@shared/(\\w+)': './source/@shared/$1',
          '@tags.(\\w+)': './source/tags/@tags.$1',
          '@components.(\\w+)': './source/components/@components.$1'
        },
        aliases: {
          '@tags': './source/tags/@tags.elements',
          '@components': './source/components/@components.elements'
        }
      })

      bundler.on('update', bundle)
      bundler.on('log', gutil.log)

      function bundle () {
        return bundler.bundle()
          .on('error', gutil.log.bind(gutil, 'Browserify Error'))
          .pipe(source(bundleConfig.outputName))
          .pipe(gulp.dest(bundleConfig.outputDir))
      }

      return bundle()
    })

    return mergeStream(streams)
  }
}

const bundler = bundleFactory([{
  entry: './source/bundle.js',
  outputName: 'bundle.js',
  outputDir: 'dist/assets'
}, {
  entry: './source/archive.js',
  outputName: 'archive.js',
  outputDir: 'dist/styleguide',
  browserifyOptions: {
    standalone: 'ElementArchive'
  }
}, {
  entry: './source/demo.js',
  outputName: 'demo.js',
  outputDir: 'dist/styleguide'
}])

const bundleBuild = bundler({ watchMode: false })
const bundleDev = bundler({ watchMode: true })

function styles () {
  return gulp.src('./source/styles.css')
    .pipe(postcss([ cssImport(), cssnext() ]))
    .pipe(gulp.dest('./dist/assets'))
}

function stylesDev () {
  gulp.watch('./source/**/*.css', gulp.series(styles))
}

function styleguide () {
  const config = {
    scriptName: 'styleguide.js',
    stylesName: 'styles.css',
    demoTemplate: {
      head: '<link href="/assets/styles.css" rel="stylesheet">',
      foot: `
        <script src="archive.js"></script>
        <script src="demo.js"></script>
      `
    },
    styleguideTemplate: {
      head: '<link href="styles.css" rel="stylesheet">',
      foot: `
        <script src="archive.js"></script>
        <script src="styleguide.js"></script>
      `
    },
    theme: {
      colors: {
        background: '#fff',
        text: '#666',
        active: '#4925a0',
        inlineCode: '#4925a0',
        tableHeaders: '#000',
        tableRowBorder: '#999',
        headerBackground: '#fff',
        headerTitle: '#999',
        headerLinks: '#666',
        headerBorder: '#ddd',
        exampleHeaderBackground: '#222',
        exampleHeaderForeground: '#fff',
        codeHeaderBackground: '#4925a0',
        codeHeaderForeground: '#fff',
        codeBackground: '#090226'
      }
    }
  }

  return reflecto(config)
    .pipe(gulp.dest('dist/styleguide'))
}

// define task sequences
const build = gulp.series(gulp.parallel(bundleBuild, styles), styleguide)
const dev = gulp.series(styles, styleguide, gulp.parallel(bundleDev, stylesDev))

// default external task api
gulp.task('build', build)
gulp.task('dev', dev)
