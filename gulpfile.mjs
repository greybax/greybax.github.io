import through from 'through2';
import gulp from 'gulp';
import rename from 'gulp-rename';
import data from 'gulp-data';
import pug from 'gulp-pug';
import log from 'fancy-log';
import rss from 'rss';
import { promises as fs } from 'fs';
import express from 'express';
import path from 'path';
import extract from 'md-article';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssvariables from 'postcss-css-variables';
import newer from 'gulp-newer';
import changed from 'gulp-changed';
import glob from 'glob';

import pkg from './package.json' with { type: 'json' };
const { site } = pkg;

const env = 'prod';

const pathPosts = '/posts/';
const getBasename = (file) => path.basename(file.relative, path.extname(file.relative));

let articlesList = [];
let relatedPosts = {};
let tagMap = new Map();

const addToList = (file, article) => {
  let fileBaseName = getBasename(file).substr('11');
  let articleData = extract(article, 'YYYY-MM-DD', 'en');

  // Ensure articleData.date exists; fallback to current date if missing
  if (!articleData.date || !articleData.date.text) {
    console.warn(`Invalid or missing date for file: ${file.relative}. Using fallback date.`);
    articleData.date = { text: new Date().toISOString().split('T')[0] }; // Use current date as fallback
  }

  let tags = articleData.tags;

  let articleObj = {
    name: articleData.title.text,
    url: pathPosts + fileBaseName + '/',
    tags: tags.list,
    related: [],
  };

  // Construct tagMap with linked articles url
  for (let tag of articleObj.tags) {
    if (!tagMap.has(tag)) {
      tagMap.set(tag, []);
    }
    tagMap.get(tag).push({
      name: articleObj.name,
      url: articleObj.url,
    });
  }

  articlesList.push({
    ...{
      site: site,
      filename: file.relative,
      url: pathPosts + fileBaseName + '/',
    },
    ...articleData,
  });
};

const buildRelated = (articlesList) => {
  let curArray = 0;

  // loop through articles
  while (curArray < articlesList.length) {
    // loop through tags
    for (let j = 0; j < articlesList[curArray].tags.list.length; j++) {

      // loop through WHOLE articleList
      for (let k = 0; k < articlesList.length; k++) {
        // do not check tags in current array
        if (curArray !== k) {
          if (articlesList[k].tags.list.indexOf(articlesList[curArray].tags.list[j]) > 0) {
            let relArr = {};
            if (!relatedPosts[(articlesList[curArray].url)]) {
              relArr[articlesList[k].url] = { 'weight': 1, 'title': articlesList[k].title.text };
              relatedPosts[articlesList[curArray].url] = relArr;
            } else {
              if (!relatedPosts[articlesList[curArray].url][articlesList[k].url]) {
                relatedPosts[articlesList[curArray].url][articlesList[k].url] = { 'weight': 1, 'title': articlesList[k].title.text };
              } else {
                relatedPosts[articlesList[curArray].url][articlesList[k].url].weight++;
              }
            }
          }
        }
      }
    }
    curArray++;
  }
}

const buildArticle = (article) =>
  gulp.src('layouts/article.pug')
    .pipe(data(() => article))
    .pipe(data(() => ({
      relatedPosts,
      article,
    })))
    .pipe(pug({ pretty: true }))
    .pipe(rename({ dirname: article.url }))
    .pipe(rename({ basename: 'index' }))
    .pipe(gulp.dest('dist'));

const getRSS = (site, list) => {
  var feed = new rss(site);
  list
    .filter(i => !!i.date)
    .sort((a, b) => b.date.unix - a.date.unix)
    .forEach((article) => {
      feed.item({
        url: site.site_url + article.url,
        title: article.title.html,
        description: article.tags.text,
        date: article.date.text
      })
    });
  return feed.xml({ indent: true });
}

gulp.task('articles-registry', () => {
  articlesList = [];
  return gulp.src(env === 'dev' ? ['source/drafts/*.md'] : ['source/posts/*.md'])
    .pipe(through.obj((file, enc, cb) => {
      // Combine replacements into one step
      const content = file.contents.toString().replace(/https:\/\/alfilatov\.com\/?/g, '/');
      file.contents = Buffer.from(content);
      addToList(file, content);
      cb(null, file);
    }));
});

gulp.task('index-page', () =>
  gulp.src('layouts/index.pug')
    .pipe(data(() => ({
      site,
      list: articlesList
        .filter(i => !!i.date)
        .sort((a, b) => b.date.unix - a.date.unix),
      tagMap,
      tags: Array.from(tagMap.keys()).sort((a, b) => tagMap.get(b).length - tagMap.get(a).length)
    })))
    .pipe(pug({ pretty: env === 'dev' }))
    .pipe(rename({ basename: 'index' }))
    .pipe(gulp.dest('dist'))
);

gulp.task('tags', () =>
  gulp.src('layouts/tags.pug')
    .pipe(data(() => ({
      site,
      tagMap,
      tags: Array.from(tagMap.keys()).sort((a, b) => tagMap.get(b).length - tagMap.get(a).length)
    })))
    .pipe(pug({ pretty: env === 'dev' }))
    .pipe(rename({ basename: 'index' }))
    .pipe(data(() =>
      buildRelated(articlesList)
    ))
    .pipe(gulp.dest('dist/tags'))
);

gulp.task('each-article', async () => {
  await Promise.all(articlesList.map((article) => buildArticle(article)));
});

gulp.task('rss', async () => {
  await fs.mkdir('dist', { recursive: true }); // Ensure the `dist` directory exists
  await fs.writeFile('dist/rss.xml', getRSS(site, articlesList));
});

gulp.task('generate-sitemap', async () => {
  const postsDir = './source/posts';
  const distDir = './dist';
  const sitemapPath = path.join(distDir, 'sitemap.xml');

  // Base URL for your site
  const baseUrl = 'https://alfilatov.com';

  // Header for the sitemap
  const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!-- created dynamically during build -->
<url>
  <loc>${baseUrl}/</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <priority>1.00</priority>
</url>
`;

  // Footer for the sitemap
  const sitemapFooter = `</urlset>`;

  // Get all Markdown files in the posts directory
  const files = glob.sync(`${postsDir}/*.md`);

  // Generate <url> entries for each post
  const urls = files.map((file) => {
    const fileName = path.basename(file, '.md'); // e.g., "2025-03-25-how-to-host-static-website-with-aws-s3-and-namecheap-domain"
    const [year, month, day, ...slugParts] = fileName.split('-'); // Extract year, month, day, and slug
    const slug = slugParts.join('-'); // Combine slug parts
    const url = `${baseUrl}/posts/${slug}/`;

    // Validate and format the date
    let lastmod;
    if (year && month && day) {
      lastmod = `${year}-${month}-${day}T12:00:00+00:00`; // Format as ISO 8601
    } else {
      console.warn(`Invalid date in file name: ${fileName}. Using current date as fallback.`);
      lastmod = new Date().toISOString(); // Use current date as fallback
    }

    return `<url>
  <loc>${url}</loc>
  <lastmod>${lastmod}</lastmod>
  <priority>0.80</priority>
</url>`;
  });

  // Combine header, URLs, and footer
  const sitemapContent = `${sitemapHeader}\n${urls.join('\n')}\n${sitemapFooter}`;

  // Ensure the dist directory exists
  await fs.mkdir(distDir, { recursive: true });

  // Write the sitemap to the dist directory
  await fs.writeFile(sitemapPath, sitemapContent, 'utf8');
  console.log(`Sitemap generated at: ${sitemapPath}`);
});

gulp.task('generate-html-sitemap', async () => {
  const postsDir = './source/posts';
  const distDir = './dist';
  const sitemapPath = path.join(distDir, 'sitemap.html');

  // Base URL for your site
  const baseUrl = 'https://alfilatov.com';

  // Header for the HTML sitemap
  const sitemapHeader = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Sitemap</title>
</head>
<body>
  <h1>HTML Sitemap</h1>
  <ul>
`;

  // Footer for the HTML sitemap
  const sitemapFooter = `  </ul>
</body>
</html>`;

  // Get all Markdown files in the posts directory
  const files = glob.sync(`${postsDir}/*.md`);

  // Generate <li> entries for each post
  const links = files.map((file) => {
    const fileName = path.basename(file, '.md'); // e.g., "2025-03-25-how-to-host-static-website-with-aws-s3-and-namecheap-domain"
    const [year, month, day, ...slugParts] = fileName.split('-'); // Extract year, month, day, and slug
    const slug = slugParts.join('-'); // Combine slug parts
    const url = `${baseUrl}/posts/${slug}/`;

    return `    <li><a href="${url}">${slug.replace(/-/g, ' ')}</a> (${year}-${month}-${day})</li>`;
  });

  // Combine header, links, and footer
  const sitemapContent = `${sitemapHeader}\n${links.join('\n')}\n${sitemapFooter}`;

  // Ensure the dist directory exists
  await fs.mkdir(distDir, { recursive: true });

  // Write the HTML sitemap to the dist directory
  await fs.writeFile(sitemapPath, sitemapContent, 'utf8');
  console.log(`HTML Sitemap generated at: ${sitemapPath}`);
});

gulp.task('css', () =>
  gulp.src('css/*.css')
    .pipe(changed('dist/css')) // Only process changed files
    .pipe(postcss([
      autoprefixer(),
      cssvariables()
    ]))
    .pipe(gulp.dest('dist/css'))
);

gulp.task('copy-js', () =>
  gulp.src('js/*.js') // Source all JavaScript files in the js folder
    .pipe(gulp.dest('dist/js')) // Copy them to the dist/js folder
);


gulp.task('copy-images', () =>
  gulp.src(['images/**/*'], { encoding: false })
    .pipe(gulp.dest('dist/images'))
);

gulp.task('copy-files', () =>
  gulp.src([
    'favicon.ico',
    'robots.txt',
    'ads.txt',
    'CNAME'
  ])
    .pipe(gulp.dest('dist'))
);

gulp.task('copy-presentations', () =>
  gulp.src(['es6_presentation/**/*'])
    .pipe(gulp.dest('dist/es6_presentation'))
);

gulp.task('clean', async () => {
  await fs.rm('dist', { recursive: true, force: true });
});

gulp.task('express', () => {
  express().use(express.static('dist')).listen(4000);
  log('Server is running on http://localhost:4000');
});

gulp.task('build', gulp.series(
  'clean',
  'articles-registry',
  gulp.parallel(
    'tags',
    'index-page',
    'rss',
    'css',
    gulp.parallel('copy-images', 'copy-files', 'copy-presentations', 'copy-js')
  ),
  'each-article',
  gulp.parallel(
    'generate-sitemap',
    'generate-html-sitemap'
  )
));

gulp.task('watch', gulp.series('express', 'build', () => {
  gulp.watch(['**/*.{jade,md,json}', '*.css'], gulp.series('build'));
}));

gulp.task('default', gulp.series('watch'));
