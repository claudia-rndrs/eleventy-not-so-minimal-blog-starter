const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)

  eleventyConfig.addLayoutAlias('page', 'layouts/page')

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