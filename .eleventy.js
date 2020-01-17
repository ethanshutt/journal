const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("DDDD");
    });

    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });

    const site = require('./src/_data/site.json');

    const now = new Date();
    const livePosts = post => post.date <= now && !post.data.draft;
    eleventyConfig.addCollection('posts', collection => {
        return [
            ...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts)
        ].reverse();
    });

    eleventyConfig.addCollection('postFeed', collection => {
        return [...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts)]
            .reverse()
            .slice(0, site.maxPostsPerPage);
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