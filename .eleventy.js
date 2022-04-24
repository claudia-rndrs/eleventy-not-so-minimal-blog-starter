module.exports = function(eleventyConfig) {
  eleventyConfig.addLayoutAlias('page', 'layouts/page')

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
    markdownTemplateEngine: 'njk'
  }
}