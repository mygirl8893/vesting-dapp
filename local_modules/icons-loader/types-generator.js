const fs = require('fs')
const path = require('path')
const glob = require('glob')
const chokidar = require('chokidar')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')


const argv = yargs(hideBin(process.argv)).argv
const folder = path.resolve('public/images/svg')
const pattern = path.resolve(folder, '**/*.svg')
const typesOutputPath = path.resolve('src/components/ui/Icon/icons.d.ts')

const generate = () => {
  const filePaths = glob.sync(pattern)
  const fileNames = filePaths.map((filePath) => filePath.replace(/.+images\/svg\//, '').replace('.svg', ''))
  const content = `export type IconName = '${fileNames.join('\' | \'')}'`

  fs.writeFileSync(typesOutputPath, content)
}

if (argv.watch) {
  chokidar.watch(pattern, {
    useFsEvents: false,
    ignoreInitial: true,
  })
    .on('change', generate)
    .on('add', generate)
    .on('unlink', generate)
}

generate()
