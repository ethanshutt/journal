module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/images");
    eleventyConfig.addPassthroughCopy("src/assets/stylesheets");
    eleventyConfig.addPassthroughCopy("src/assets/scripts");

    eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));

    
    return {
        pathPrefix: "/",
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'md',
        templateFormats: ["html", "liquid", "njk", "md"],
        dir: {
            data: "./_data",
            includes: "./_includes",
            input: "./src",
            output: "./dist",
            layouts: "./_layouts"
        }
    }
}