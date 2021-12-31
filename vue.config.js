module.exports = {
    assetsDir: "static",
    css: {
        loaderOptions: {
            scss: {
                prependData: `
                    @import "@/assets/styles/_variables.scss";
                    @import "@/assets/styles/_mixins.scss";
                `,
            }
        }
    }
}
