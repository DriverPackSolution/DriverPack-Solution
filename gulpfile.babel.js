import fs from 'fs'
import path from 'path'
import gulp from 'gulp'
import Promise from 'bluebird'
import git from 'gulp-git'
import gutil from 'gulp-util'

Promise.promisifyAll(fs)
Promise.promisifyAll(git)

const REPO_URL = 'git@github.com:DriverPackSolution/update.drp.su.git'
const DEPLOY_DIR = 'update.drp.su'
const REMOTE = 'origin'

const cwd = path.join(__dirname, DEPLOY_DIR)

function copyDist (version) {
  return new Promise((resolve, reject) => {
    gulp.src('./bin/**/*.{html,hta,png,jpg,gif,ico,ttf,css,js}', {base: './bin'})
      .pipe(gulp.dest(path.join('.', DEPLOY_DIR, 'beetle', version)))
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

const updateProject = {
  setActiveVersion (nextVersion) {
    const scriptFile = path.join(DEPLOY_DIR, 'v2/index.html')
    return fs.readFileAsync(scriptFile)
    .then(contents => {
      const patchedContents = contents.toString()
        .replace(
          /http:\/\/[^\.]+.drp.su\/beetle\/([^\\]+)\//,
          (match, currentVersion) => {
            gutil.log(`Patching ${scriptFile}: ${currentVersion} => ${nextVersion}`)
            return match.replace(currentVersion, nextVersion)
          }
        )
      return fs.writeFileAsync(scriptFile, patchedContents)
    })
  }
}

async function release (branch = 'master') {
  let release
  const version = await getVersion()
  release = {
    version,
    commitMessage: `Release beetle v${version}`
  }
  gutil.log(release.commitMessage)
  try {
    await git.statusAsync({cwd, quiet: true})
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
    gutil.log(`Cloning ${REPO_URL} to ${DEPLOY_DIR}`)
    await git.cloneAsync(REPO_URL, {args: DEPLOY_DIR})
  }
  await git.checkoutAsync(branch, {cwd})
  await git.pullAsync(REMOTE, branch, {cwd, args: '--rebase'})
  await copyDist(release.version)
  await updateProject.setActiveVersion(version)
  await commitFiles(release.commitMessage)
  await git.pushAsync(REMOTE, branch, {cwd})
}

gulp.task('release:prod', () => release('master'))
gulp.task('release:test', () => release('dev'))
