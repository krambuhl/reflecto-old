const gulp = require('gulp')
const reflecto = require('gulp-reflecto')
const postcss = require('gulp-postcss')
const cssnext = require('postcss-cssnext')
const cssImport = require('postcss-easy-import')
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
      const opts = Object.assign(
        { debug: true },
        watchMode && watchify.args,
        bundleConfig.browserifyOptions
      )
      let bundler = browserify(bundleConfig.entry, opts)

      if (watchMode) {
        bundler = watchify(bundler)
      }

      bundler.transform(markdown)
      bundler.transform(babelify)
      bundler.transform(globify)
      bundler.transform(aliasify, {
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
    .pipe(postcss([
      cssImport(),
      cssnext()
    ]))
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
    }
  }

  return reflecto(config)
    .pipe(gulp.dest('dist/styleguide'))
}

// define task sequences
const styleguideTask = gulp.series(styleguide)
const buildTask = gulp.series(gulp.parallel(bundleBuild, styles), styleguide)
const devTask = gulp.series(styles, styleguide, gulp.parallel(bundleDev, stylesDev))

// default external task api
gulp.task('styleguide', styleguideTask)
gulp.task('build', buildTask)
gulp.task('dev', devTask)
