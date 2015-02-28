leaf-me-static
=====

**leaf-me-static** is a static site generator, it has **PHP** version and **Node.js** version.

In the server side, it generates static `index.html` and `json` files.

In the browser side, it requests `json` files base on hash router and render data to HTML.

The usage is quite simple:

1. Run `npm install` / `composer install` to install dependencies
1. Edit `config.yaml` to edit basic information of your site
1. Run `./new.js Article Title` / `./new.php Article Title` to create a new `.md` file in folder `post`
1. Start writing
1. Run `./leaf.js` / `./leaf.php` to generate `index.html` and `json` files in folder `data`
1. All done. Publish it to the cloud

**Demo:**

- [http://vinnpc.github.io/leaf-me-static/node.js/](http://vinnpc.github.io/leaf-me-static/node.js/)
- [http://vinnpc.github.io/leaf-me-static/php/](http://vinnpc.github.io/leaf-me-static/php/)
