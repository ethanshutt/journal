const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/images");
    eleventyConfig.addPassthroughCopy("src/assets/stylesheets");
    eleventyConfig.addPassthroughCopy("src/assets/scripts");
    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("DDDD");
    });

    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });


    eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));
    eleventyConfig.addCollection("posts", function (collection) {
            return collection.getFilteredByTag("posts");
    });

    
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