var manifestJSON = require('./public/manifest.json')
module.exports = {
  lintOnSave: undefined,
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/custom.scss";
          `
      }
    }
  }
}
