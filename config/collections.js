const slugify = require("slugify");

/* Creating a collection containing all blogposts by filtering based on folder and filetype */
const getAllPosts = (collectionApi) => {
  return collectionApi.getFilteredByGlob("./src/blog/*.md").reverse();
};

const getCategoryList = (collectionApi) => {
  const catPages = [];
  let categories = [];
  const blogPosts = collectionApi.getFilteredByGlob("./src/blog/*.md");

  blogPosts.map((item) => {
    categories.push(item.data.category);
  });

  categories = categories.sort(sortAlphabetically);
  const temp = [...new Set(categories)];

  temp.forEach((category) => {
    const slug = strToSlug(category);

    if (slug !== "in-the-spotlight") {
      catPages.push({
        key: slug,
        name: category,
      });
    }
  });

  return catPages;
};

const getCategorizedPosts = (collectionApi) => {
  const categorizedPosts = {};

  collectionApi.getFilteredByGlob("./src/blog/*.md").forEach((item) => {
    const category = item.data.category;

    // Ignore the ones without a category
    if (typeof category !== "string") return;

    const slug = strToSlug(category);

    if (Array.isArray(categorizedPosts[slug])) {
      categorizedPosts[slug].push(item);
    } else {
      categorizedPosts[slug] = [item];
    }
  });

  return categorizedPosts;
};

module.exports = {
  getAllPosts,
  getCategoryList,
  getCategorizedPosts,
};

function strToSlug(str) {
  const options = {
    replacement: "-",
    remove: /[&,+()$~%.'":*?<>{}]/g,
    lower: true,
  };

  return slugify(str, options);
}

function sortAlphabetically(a, b) {
  return a.localeCompare(b, "en", { sensitivity: "base" });
}
