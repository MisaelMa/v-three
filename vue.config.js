// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('obj')
      .test(/\.(fbx|obj|dds|stl)$/)
      .use('file-loader')
      .loader('file-loader')
   },
}
