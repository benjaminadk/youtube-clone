module.exports = {
  staticFileGlobs: [
    './build/**/**.html',
    './build/images/**.*',
    './build/static/**'
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: './build/firebase-messaging-sw.js',
  navigateFallback: './200.html',
  navigateFallbackWhitelist: [/^(?!\/__).*/],
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
  stripPrefix: './build'
}
