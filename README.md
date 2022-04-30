# Eleventy Not So Minimal Blog Starter

A not so minimal starter for building a website + blog using the Eleventy static site generator.

This eleventy starter already includes:
- Basic site navigation with eleventy-navigation
- Blog categories & category based navigation
- Image optimisation with Eleventy-img
- SVG icons with svg-icon-sprite
- SEO (sitemap, metadata)
- Luxon for handling dates & times
- A few basic Eleventy configurations, filters and shortcodes
- Nunjucks templates
- Sass & the necessary scripts to compile Sass

If the listed setup is not what you require, you might want to check out one of the many other Eleveny starters, which can be found here.

## Getting Started

### 1. Clone this Repository

```
git clone https://github.com/mangamaui/eleventy-not-so-minimal-blog-starter.git your-blog-name
```

### 2. Navigate to the directory

```
cd your-blog-name
```


### 3. Install dependencies

```
npm install
```

### 4. Edit _data/metadata.json

### 5. Run Eleventy

```
npm start
```

In debug mode:
```
DEBUG=* npx eleventy
```

To build 
```
npm run build
```