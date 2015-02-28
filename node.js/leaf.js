#!/usr/local/bin/node

var fs = require('fs');
var yaml = require('js-yaml');

var Showdown = require('showdown');
var converter = new Showdown.converter({extensions: ['table']});

// var ejs = require('ejs');
// ejs.open = '{{';
// ejs.close = '}}';
var swig  = require('swig');

var util = require('./src/util');

var config = util.getConfig();
var regMate = new RegExp(/^---\n*((.*:.*\n*)+)\n*---\n*/);

/*
    generate index.html
*/
// fs.readFile(util.getPath('tmpl') + 'index_tmpl.html', function(err, data) {
    // if (err) throw err;

    // var html = ejs.render(data.toString(), config);
    // fs.writeFile('index.html', html, function(err) {
    //     if (err) throw err;
    // })
// });
var html = swig.renderFile(util.getPath('tmpl') + 'index_tmpl.html', config);
fs.writeFile('index.html', html, function(err) {
  if (err) throw err;
})

// put all posts' data to postsData[]
var postsData = [];
var postPaths = fs.readdirSync(util.getPath('post'));

for (var i = 0, l = postPaths.length; i < l; i++) {
    var postPath = postPaths[i];
    var content = fs.readFileSync(util.getPath('post', postPath)).toString();
    // console.log(content.match(regMate));
    var mate = yaml.safeLoad(content.match(regMate)[1]);
    var article = converter.makeHtml(content.replace(regMate, ''));

    postsData.push({
        title: mate.title,
        time: mate.time,
        url: '#!/post/' + postPath.replace(/\.md$/, ''),
        path: util.getPath('data') + postPath.replace(/md$/, 'json'),
        article: article
    });
}

// sort postsData by postsData[x][time] from newest to oldest
postsData.sort(function(a, b) {
    return Date.parse(b.time) - Date.parse(a.time);
});


/*
    generate each post's json
*/
for (var i =0, l = postsData.length, post; i < l; i++) {
    post = postsData[i];
    fs.writeFile(post.path, JSON.stringify(post));
}

/*
   generate posts.json
*/
var postsDataClone = JSON.parse(JSON.stringify(postsData));
postsDataClone.map(function(post) {
    delete post.article;
    delete post.path;
});
fs.writeFile(util.getPath('data') + 'posts.json', JSON.stringify(postsDataClone), function(err) {if (err) throw err;});

/*
    generate each page's json
*/
var pagePaths = fs.readdirSync(util.getPath('page'));
for (var i = 0, l = pagePaths.length; i < l; i++) {
    var pagePath = pagePaths[i];
    var content = fs.readFileSync(util.getPath('page', pagePath)).toString();
    var mate = yaml.safeLoad(content.match(regMate)[1]);
    var article = converter.makeHtml(content.replace(regMate, ''));

    var page = {
        title: mate.title,
        url: '#!/' + pagePath.replace(/\.md$/, ''),
        path: util.getPath('data') + pagePath.replace(/md$/, 'json'),
        article: article
    };

    fs.writeFile(page.path, JSON.stringify(page));
}
