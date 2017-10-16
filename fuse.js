const { FuseBox, SVGPlugin, CSSPlugin, BabelPlugin, QuantumPlugin, WebIndexPlugin, Sparky } = require('fuse-box')

let fuse, isProduction;

Sparky.task("build", () => {
  fuse = new FuseBox({
    homeDir: "src/",
    sourceMaps: !isProduction,
    hash: isProduction,
    output: "build/$name.js",
    plugins: [
      SVGPlugin(),
      CSSPlugin(),
      BabelPlugin(),
      WebIndexPlugin({
        template: "src/index.html"
      }),
      isProduction && QuantumPlugin({
        treeshake: true,
        uglify: true
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

Sparky.task("prod", ["prod-env", "build"], () => {
  fuse.dev()
  return fuse.run()
})
