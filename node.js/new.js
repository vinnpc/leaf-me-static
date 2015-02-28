#!/usr/local/bin/node

var fs = require('fs');
var util = require('./src/util');

(function() {

    var title = process.argv.slice(2);
    title = !!title.length ? title.join(' ') : 'Untitled';
    
    var time = new Date();

    var initContent = '---\n\n\
title: {title}\n\n\
time:  {time}\n\n\
---\n'.replace('{title}', title).replace('{time}', util.strftime('%mon %d, %Y %H:%M',time));
    
    var fileName = util.strftime('%Y-%m-%d',time) + '-' + title.toLowerCase().replace(/\s+/g, '-') + '.md';

    fs.writeFile(util.getPath('post', fileName), initContent, function(err) {
        if (err) throw err;
    });
    
})();
