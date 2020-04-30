const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  webpack: function (config, env) {
    if (env === 'development') {
      return config;
    }
    //do stuff with the webpack config...
    config.output.filename = 'static/js/[name].js';
    config.output.chunkFilename = 'static/js/[name].chunk.js';

    config.entry = {
      main: [resolveApp('src/entry/popupMain.js')],
      content: [resolveApp('src/entry/contentMain.js')],
      background: [resolveApp('src/entry/backgroundMain.js')],
      options: [resolveApp('src/entry/optionsMain.js')],
    }

    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };

    config.optimization.runtimeChunk = false;
    return config;
  }
}