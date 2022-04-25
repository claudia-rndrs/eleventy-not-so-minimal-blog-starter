const Image = require("@11ty/eleventy-img")
const  path = require('path')

const imageShortcode = async (
  relativeSrc,
  alt,
  className,
  widths = [null, 300, 800, 1280],
  formats = ['webp'],
  sizes = '(min-width: 100px)'
) => {
  const { dir: imgDir } = path.parse(relativeSrc);
  const fullSrc = path.join('src', relativeSrc);

  const imageMetadata = await Image(relativeSrc, {
    widths,
    formats,
    outputDir: "./_site/assets/images/generated/",
    urlPath: "/assets/images/generated/",
  })

  const imageAttributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
  }

  if(className) {imageAttributes["class"] = className }

  return Image.generateHTML(imageMetadata, imageAttributes)
}


module.exports.imageShortcode = imageShortcode;