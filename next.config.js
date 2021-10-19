const path = require('path')


module.exports = {
  sassOptions: {
    additionalData: `@import '~src/scss/index.scss';`,
    includePaths: [
      path.join(__dirname, 'styles'),
    ],
  },
}
