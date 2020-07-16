module.exports = {
  pwa: {
    name: 'vue-fire-ts-template',
    themeColor: '#F60B0B', // change this
    msTileColor: '#F60B0B', // change this
    manifestOptions: {
      background_color: '#F60B0B' // change this
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'sw.js',
    }
  },
  transpileDependencies: [
    "vuetify"
  ],
  productionSourceMap: false,
}