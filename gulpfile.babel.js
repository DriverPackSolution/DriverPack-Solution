import fs from 'fs'
import path from 'path'
import gulp from 'gulp'
import Promise from 'bluebird'
import git from 'gulp-git'
import gutil from 'gulp-util'

Promise.promisifyAll(fs)
Promise.promisifyAll(git)

const deployDir = 'update.drp.su'
const cwd = path.join(__dirname, deployDir)

function copyDist (version) {
  return new Promise((resolve, reject) => {
    gulp.src('./bin/**/*.{html,hta,png,jpg,gif,ico,ttf,css,js}', {base: './bin'})
      .pipe(gulp.dest(path.join('.', deployDir, 'beetle', version)))
      .on('end', resolve)
      .on('error', reject)
  })
}

function commitFiles (commitMessage) {
  return new Promise((resolve, reject) => {
    gulp.src(cwd)
      .pipe(git.add({cwd}))
      .pipe(git.commit(commitMessage, {cwd}))
      .on('end', resolve)
      .on('error', reject)
  })
}

function getVersion () {
  return fs.readFileAsync('bin/Tools/modules/variables.js')
  .then(contents => {
    const firstline = contents.toString().split('\n')[0]
    return firstline.match(/([\.0-9]+)/)[1]
  })
}

gulp.task('release', () => {
  let release
  return getVersion()
    .then(version => {
      release = {
        version,
        commitMessage: `Release beetle v${version}`
      }
    })
    .then(() => gutil.log(release.commitMessage))
    .then(() => {
      return git
        .statusAsync({cwd, quiet: true})
        .catch(() => git.cloneAsync('git@bitbucket.org:artxgroup/update.drp.su.git'))
    })
    .then(() => git.checkoutAsync('master', {cwd}))
    .then(() => copyDist(release.version))
    .then(() => commitFiles(release.commitMessage))
})

