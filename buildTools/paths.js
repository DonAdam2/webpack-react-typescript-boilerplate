const {
    outputDirectory,
    rootDirectory,
    publicDirectory,
    environmentsDirectory,
    jestDirectory,
  } = require('./constants'),
  { resolveApp } = require('./helpers');

module.exports = {
  srcPath: resolveApp(rootDirectory),
  appIndexPath: resolveApp(`${rootDirectory}/index`),
  tsDirectoryPath: resolveApp(`${rootDirectory}/ts`),
  stylesDirectoryPath: resolveApp(`${rootDirectory}/scss`),
  publicDirPath: resolveApp(publicDirectory),
  indexHtmlPath: resolveApp(`${publicDirectory}/index.html`),
  jestPath: resolveApp(jestDirectory),
  outputSrcPath: resolveApp(outputDirectory),
  envDevelopmentPath: resolveApp(`${environmentsDirectory}/.env.development`),
  envProductionPath: resolveApp(`${environmentsDirectory}/.env`),
};
