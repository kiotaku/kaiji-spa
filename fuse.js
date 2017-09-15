import { FuseBox, SVGPlugin, CSSPlugin. BabelPlugin, QuantumPlugin, WebIndexPlugin, Sparky } from 'fuse-box'

let fuse, isProduction;

Sparky.task("build", () => {
    fuse = new FuseBox({
        homeDir: "app/",
        sourceMaps: !isProduction,
        hash: isProduction,
        output: "build/$name.js",
        plugins: [
            SVGPlugin(),
            CSSPlugin(),
            BabelPlugin(),
            WebIndexPlugin({
                template: "app/index.html"
            }),
            isProduction && QuantumPlugin({
                treeshake: true,
                uglify: true
            })
        ]
    })
    fuse.bundle("vendor").instructions("~ index.jsx")
    fuse.bundle("app").instructions("> [index.jsx]")
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
