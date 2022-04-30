const slugify = require('slugify')

module.exports = (collectionApi) => {
  const catPages = []
  let categories = []
  const blogPosts = collectionApi.getFilteredByGlob('./src/blog/*.md')

  blogPosts.map((item) => {        
    let category = item.data.category
    categories.push(category)
  })

  categories = categories.sort(sortAlphabetically)
  let temp = [...new Set(categories)]

  temp.forEach((category) => {
    let slug = strToSlug(category);

    if(slug !== 'in-the-spotlight') {
      catPages.push({
        'key': slug,
        'name': category 
      })
    }
  })

  return catPages  
}

function strToSlug(str) {
  const options = {
    replacement: '-',
    remove: /[&,+()$~%.'':*?<>{}]/g,
    lower: true,
  }
    
  return slugify(str, options)
}


function sortAlphabetically(a, b) {
  return a.localeCompare(b, 'en', { sensitivity: 'base' });
}