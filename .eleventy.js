const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/images");
    eleventyConfig.addPassthroughCopy("src/assets/stylesheets");
    eleventyConfig.addPassthroughCopy("src/assets/scripts");

    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("DDDD");
    });

    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });


    eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));
    eleventyConfig.addCollection("posts", function (collection) {
        return collection.getAllSorted().filter(function (item) {
            // Only return content that was originally a markdown file
            // Need to filter better, this will get messy
            let extension = item.inputPath.split('.').pop();
            return extension === "md";
        });
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