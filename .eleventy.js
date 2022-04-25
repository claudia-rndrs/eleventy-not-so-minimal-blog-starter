const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')

const { DateTime } = require('luxon')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)

  eleventyConfig.addLayoutAlias('page', 'layouts/page')
  eleventyConfig.addLayoutAlias('article', 'layouts/article')

  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: "Europe/Paris",
    }).setLocale('en').toLocaleString(DateTime.DATE_FULL)
  })

  eleventyConfig.addNunjucksAsyncShortcode('image', require('./src/_11ty/imageShortcode').imageShortcode)

  /* Creating a collection of blogposts by filtering based on folder and filetype */
  eleventyConfig.addCollection("blog", (collectionApi) => {
    return collectionApi.getFilteredByGlob('./src/blog/*.md').reverse()
  })

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    markdownTemplateEngine: 'njk'
  }
}