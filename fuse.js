const { FuseBox, EnvPlugin, SVGPlugin, CSSPlugin, BabelPlugin, QuantumPlugin, WebIndexPlugin, Sparky } = require('fuse-box')

let fuse, isProduction;

Sparky.task("build", () => {
  fuse = FuseBox.init({
    homeDir: "src/",
    sourceMaps: !isProduction,
    hash: isProduction,
    output: "build/$name.js",
    cache: false,
    plugins: [
      EnvPlugin({ NODE_ENV: isProduction ? 'production' : 'develop' , API_HOST : process.env.API_HOST, PRINT_API_HOST : 'http://192.168.11.4' }),
      SVGPlugin(),
      CSSPlugin(),
      BabelPlugin(),
      WebIndexPlugin({
        template: "src/index.html"
      }),
      isProduction && QuantumPlugin({
        treeshake: true,
        uglify: true,
        removeUseStrict: false,
        replaceProcessEnv: false,
        target: 'browser'
      })
    ],
    target: 'browser'
  })
  fuse.bundle("vendor").instructions("~ index.jsx")
  fuse.bundle("src").instructions("> [index.jsx]")
});

Sparky.task("default", ["clean", "build"], () => {
  fuse.dev()
  return fuse.run()
})

Sparky.task("clean", () => Sparky.src("build/").clean("build/"))

Sparky.task("prod-env", ["clean"], () => { isProduction = true })

Sparky.task("prod", ["prod-env", "clean", "build"], () => {
  fuse.dev()
  return fuse.run()
})
