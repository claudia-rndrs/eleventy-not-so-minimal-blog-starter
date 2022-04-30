const slugify = require('slugify')

module.exports = (collectionApi) => {
  const categories = {}

  collectionApi.getFilteredByGlob('./src/blog/*.md').forEach(item => {
    let category = item.data.category
      
    // Ignore the ones without a category
    if (typeof category !== 'string')
    return

    const slug = strToSlug(category)

    if (Array.isArray(categories[slug])) {
      categories[slug].push(item)
    } else {
      categories[slug] = [item]
    }
  })

  return categories  
}

function strToSlug(str) {
  const options = {
    replacement: '-',
    remove: /[&,+()$~%.'':*?<>{}]/g,
    lower: true,
  }
  
  return slugify(str, options);
}