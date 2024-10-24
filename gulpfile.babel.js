import through from 'through2';
import gulp from 'gulp';
import watch from 'gulp-watch';
import rename from 'gulp-rename';
import data from 'gulp-data';
import jade from 'gulp-jade';
import replace from 'gulp-replace';
import { log } from 'gulp-util';
import buildbranch from 'buildbranch';
import rss from 'rss';
import del from 'del';
import { outputFile as output } from 'fs-extra';
import express from 'express';
import assign from 'object-assign';
import each from 'each-done';
import path from 'path';
import extract from 'md-article';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssvariables from 'postcss-css-variables';
import Multimap from 'multimap';

import { site } from './package.json';

// const env = process.env.NODE_ENV || 'dev';
const env = 'prod';

const pathPosts = '/posts/';
const getBasename = (file) => path.basename(file.relative, path.extname(file.relative));

let articlesList = [];
let relatedPosts = {};
let tagMap = new Multimap();
let aboutPage = [];

const addToList = (file, article) => {
  let fileBaseName = getBasename(file).substr('11');
  let articleData = extract(article, 'MMMM D, YYYY', 'en');
  let tags = articleData.tags;

  let articleObj = {
    name: articleData.title.text,
    url: pathPosts + fileBaseName + '/',
    tags: tags.list,
    related: [],
  };

  // Construct tagMap with linked articles url
  for (let tag of articleObj.tags) {
    tagMap.set(tag, {
      name: articleObj.name,
      url: articleObj.url
    });
  }

  articlesList.push(assign({}, {
    site: site,
    filename: file.relative,
    url: pathPosts + fileBaseName + '/',
  }, extract(article, 'MMMM D, YYYY', 'en')));
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
  gulp.src('layouts/article.jade')
    .pipe(data(() => article))
    .pipe(data(() => ({
      relatedPosts,
      article
    })))
    .pipe(jade({ pretty: true }))
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
    .pipe(replace('https://alfilatov.com/', '/'))
    .pipe(replace('https://alfilatov.com', '/'))
    .pipe((() => through.obj((file, enc, cb) => {
      addToList(file, file.contents.toString());
      cb(null, file);
    }))());
});

gulp.task('index-page', () =>
  gulp.src('layouts/index.jade')
    .pipe(data(() => ({
      site,
      list: articlesList
        .filter(i => !!i.date)
        .sort((a, b) => b.date.unix - a.date.unix),
      tagMap,
      tags: Array.from(tagMap.keys()).sort((a, b) => tagMap.get(b).length - tagMap.get(a).length)
    })))
    .pipe(jade({ pretty: env === 'dev' }))
    .pipe(rename({ basename: 'index' }))
    .pipe(gulp.dest('dist'))
);

gulp.task('about-registry', () => {
  return gulp.src(['source/about/about.md'])
    .pipe((() => through.obj((file, enc, cb) => {
      aboutPage = extract(file.contents.toString(), 'MMMM D, YYYY', 'en');
      cb(null, file);
    }))());
});

gulp.task('about-page', () =>
  gulp.src('layouts/about.jade')
    .pipe(data(() => ({
      site,
      title: aboutPage.title,
      content: aboutPage.content
    })))
    .pipe(jade({ pretty: env === 'dev' }))
    .pipe(rename({ basename: 'index' }))
    .pipe(gulp.dest('dist/about'))
);

gulp.task('tags', () =>
  gulp.src('layouts/tags.jade')
    .pipe(data(() => ({
      site,
      tagMap,
      tags: Array.from(tagMap.keys()).sort((a, b) => tagMap.get(b).length - tagMap.get(a).length)
    })))
    .pipe(jade({ pretty: env === 'dev' }))
    .pipe(rename({ basename: 'index' }))
    .pipe(data(() =>
      buildRelated(articlesList)
    ))
    .pipe(gulp.dest('dist/tags'))
);

gulp.task('each-article', (done) => { each(articlesList, buildArticle, done); });
gulp.task('rss', (done) => { output('dist/rss.xml', getRSS(site, articlesList), done); });

gulp.task('css', () =>
  gulp.src('css/*.css')
    .pipe(postcss([
      autoprefixer(),
      cssvariables()
    ]))
    .pipe(gulp.dest('dist/css'))
);

gulp.task('copy-font-awesome', () =>
  gulp.src(['font-awesome/**/*'])
    .pipe(gulp.dest('dist/font-awesome'))
);

gulp.task('copy-images', () =>
  gulp.src(['images/**/*'])
    .pipe(gulp.dest('dist/images'))
);

gulp.task('copy-files', () =>
  gulp.src([
    'favicon.ico',
    'sitemap.xml',
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

gulp.task('clean', (done) => {
  del(['dist'])
    .then(() => {
      done();
    });
});

gulp.task('express', () => {
  express().use(express.static('dist')).listen(4000);
  log('Server is running on http://localhost:4000');
});

gulp.task('build', gulp.series(
  'clean'
  , 'articles-registry'
  , 'about-registry'
  , 'tags'
  , gulp.parallel('index-page', 'each-article', 'rss')
  , 'about-page'
  , 'css'
  , 'copy-font-awesome'
  , 'copy-images'
  , 'copy-files'
  , 'copy-presentations'
), (done) => {
  done();
});

gulp.task('gh', gulp.series('build', (done) => {
  buildbranch({
    branch: 'master',
    folder: 'dist',
    noVerify: true
  }, done);
}));

gulp.task('watch', gulp.series('express', 'build', () => {
  watch(['**/*{jade,md,json}', '*.css'], () => { gulp.start('build'); });
}));

gulp.task('default', gulp.series('watch'));
