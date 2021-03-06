<?php
    global $config;
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
	<meta name="description" content="<?= $config['blog_title'] ?>. <?= $config['bio'] ?>" />
	<title><?= $config['blog_title'] ?></title>
    <link rel="stylesheet" href="asset/highlight/default.css">
    <link rel="stylesheet" href="asset/css/font.css">
    <link rel="stylesheet" href="asset/css/style.css">
</head>
<body>
<div id="container">

    <header id="header">
        <div class="blog_avatar icon entypo">
            <a href="#!/">&#127810;</a>
        </div>
        <div class="blog_title">
            <h1><a href="#!/"><?= $config['blog_title'] ?></a></h1>
        </div>
    </header>

    <div class="clear">

        <aside id="sidebar">
            <div class="bio"><?= $config['bio'] ?></div>
            <nav class="nav">
                <ul>
                    <li><a href="#!/"><span class="icon entypo">&#8962;</span>HOME</a></li>
                    <li><a href="#!/about"><span class="icon entypo">&#128100;</span>About</a></li>
                    <li class="separator">&#8901;</li>
                    <li><a href="http://github.com/vinnpc" target="_blank"><span class="icon entypo_social">&#62208;</span>Github</a></li>
                    <li><a href="https://twitter.com/yqwyq" target="_blank"><span class="icon entypo_social">&#62217;</span>Twitter</a></li>
                    <li><a href="http://www.douban.com/people/82397973/" target="_blank"><span class="icon entypo">&#128213;</span>Douban</a></li>
                </ul>
            </nav>
        </aside>

        <div id="content"></div>
    </div>

    <footer id="footer">
        <span>Powered by <a href="https://github.com/vinnpc/leaf-me-static" target="_blank">leaf-me-static</a></span>
    </footer>

</div>

<script type="text/template" id="posts_template">
<ul class="posts">
    <% for (var i = 0, l = posts.length; i < l; i++) { %>
    <li>
        <div>
            <div class="meta">
                <div class="time"><span class="icon entypo">&#128340;</span><%= posts[i].time.replace(/\s*\d+:\d+$/, '') %></div>
            </div>
            <h2 class="title"><a href="<%= posts[i].url %>"><%= posts[i].title %></a></h2>
        </div>
    </li>
    <% } %>
</ul>
</script>

<script type="text/template" id="post_template">
<div class="post clear">
    <h2 class="title"><%= title %></h2>
    <div class="meta">
        <div class="time"><span class="icon entypo">&#128340;</span><%= time.replace(/\s*\d+:\d+$/, '') %></div>
    </div>
    <article class="article"><%= article %></article>
</div>
</script>

<script type="text/template" id="page_template">
<div class="page">
    <h2 class="title"><%= title %></h2>
    <article class="article"><%= article %></article>
</div>
</script>

<script type="text/javascript" src="asset/highlight/highlight.pack.js"></script>
<script type="text/javascript" src="asset/js/micro-templating.js"></script>
<script type="text/javascript" src="asset/js/json2.js"></script>
<script type="text/javascript" src="asset/js/leaf.js"></script>
<script type="text/javascript" src="asset/js/app.js"></script>

</body>
</html>
