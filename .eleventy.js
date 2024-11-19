import eleventyNavigationPlugin from "@11ty/eleventy-navigation"
import pluginRss from "@11ty/eleventy-plugin-rss"
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img"
import pluginIcons from "eleventy-plugin-icons"

import {
  getAllPosts,
  getCategoryList,
  getCategorisedPosts,
} from "./config/collections.js"

import { readableDate } from "./config/filters.js"

const imageConfig = {
  extensions: "html",
  formats: ["webp"],
  widths: [300, 600, 900, "auto"],
  defaultAttributes: {
    loading: "lazy",
    decoding: "async",
    sizes: "100vw",
  },
  urlPath: "/images/",
}


export default function (eleventyConfig) {
  /*================================*/
  /*   plugins and configurations   */
  /*================================*/
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, imageConfig)

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
    excerpt_alias: "excerpt",
  })

    eleventyConfig.addPlugin(pluginIcons, {
      sources: [{ name: "custom", path: "./src/assets/icons" }],
    })

  /*===================================================*/
  /* files that need to be copied to the build folder  */
  /*===================================================*/
  eleventyConfig.addPassthroughCopy("./src/assets/social-image.jpg")
  eleventyConfig.addPassthroughCopy("./src/assets/icons")
  eleventyConfig.addPassthroughCopy("./src/assets/sprite.svg")

  /*=================*/
  /*     Layouts     */
  /*=================*/
  eleventyConfig.addLayoutAlias("page", "layouts/page")
  eleventyConfig.addLayoutAlias("article", "layouts/article")

  /*=================*/
  /*   Collections   */
  /*=================*/
  eleventyConfig.addCollection("blog", getAllPosts)
  eleventyConfig.addCollection("categoryList", getCategoryList)
  eleventyConfig.addCollection("categorisedPosts", getCategorisedPosts)

  /*=================*/
  /*     Filters     */
  /*=================*/
  eleventyConfig.addFilter("readableDate", readableDate)


  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
  };
}
