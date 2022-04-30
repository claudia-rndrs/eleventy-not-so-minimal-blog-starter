const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')

const { DateTime } = require('luxon')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)

  eleventyConfig.addLayoutAlias('page', 'layouts/page')
  eleventyConfig.addLayoutAlias('article', 'layouts/article')

  eleventyConfig.addPassthroughCopy('./src/assets/icons')
  eleventyConfig.addPassthroughCopy('./src/assets/sprite.svg')
  eleventyConfig.addPassthroughCopy({
      'node_modules/svg-icon-sprite/dist/svg-icon-sprite.js': 'assets/svg-icon-sprite.js'
  })
  eleventyConfig.addPassthroughCopy('./src/assets/social-image.jpg')

  eleventyConfig.addNunjucksAsyncShortcode('image', require('./src/_11ty/imageShortcode').imageShortcode)

  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'Europe/Paris',
    }).setLocale('en').toLocaleString(DateTime.DATE_FULL)
  })

  /* Creating a collection of blogposts by filtering based on folder and filetype */
  eleventyConfig.addCollection('blog', (collectionApi) => {
    return collectionApi.getFilteredByGlob('./src/blog/*.md').reverse()
  })
  eleventyConfig.addCollection('categoryList', require('./src/_11ty/getCategoryList'))
  eleventyConfig.addCollection('categories', require('./src/_11ty/createCategories'))


  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
    excerpt_alias: 'excerpt'
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