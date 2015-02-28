window.onload = function() {
  App.run();
};

var App = {};

App.run = function() {
  Leaf.Router

    .add('/', function() {
    Leaf.ajax({
      url: 'data/posts.json?' + (new Date()).getTime(),
      method: 'get',
      success: function(data) {
        data = JSON.parse(data);
        render('content', 'posts_template', {
          posts: data
        });
        secRender();
      },
      fail: function(e) {
        console.log(e);
      }
    });
  })

  .add('about', function() {
    Leaf.ajax({
      url: 'data/about.json?' + (new Date()).getTime(),
      method: 'get',
      success: function(data) {
        data = JSON.parse(data);
        render('content', 'page_template', data);
        secRender(data.title);
      },
      fail: function(e) {
        console.log(e);
      }
    });
  })

  .add('post/:post_title', function(postTitle) {
    Leaf.ajax({
      url: 'data/' + postTitle + '.json?' + (new Date()).getTime(),
      method: 'get',
      success: function(data) {
        data = JSON.parse(data);
        render('content', 'post_template', data);
        secRender(data.title, true);
      },
      fail: function(e) {
        console.log(e);
      }
    });
  });

  Leaf.Router.setNotFound(function(hash) {
    console.log(hash, 'is not found');
  });

  Leaf.Router.run();
}

function render(targetId, tmplId, objData) {
  document.getElementById(targetId).innerHTML = tmpl(tmplId, objData);
}

// Secondary render
function secRender(title, renderCode) {
  var domTitle = document.getElementsByTagName('title')[0],
    blogTitle = domTitle.innerHTML.split('⋅').pop().trim();

  // change title to "article'title ⋅ blog's title"
  if (title) {
    domTitle.innerHTML = title + ' ⋅ ' + blogTitle;
  } else {
    // change title to blog's title
    domTitle.innerHTML = blogTitle;
  }

  if (renderCode) {
    var codes = document.querySelectorAll('pre code');
    for (var i = 0, l = codes.length; i < l; i++) {
      hljs.highlightBlock(codes[i]);
    }
  }
}
