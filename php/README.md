leaf-me-static (PHP)
=====

**leaf-me-static** is a simple static site generator. Here is a **PHP** version.

In the server side, it generates static `index.html` and `json` files.

In the browser side, it requests `json` files base on hash router and render data to HTML.

The usage is quite simple:

1. Run `composer install` to install dependencies
1. Edit `config.yaml` to edit basic information of your site
1. Run `./new.php Article Title` to create a new `.md` file in folder `post`
1. Start writing
1. Run `./leaf.php` to generate `index.html` and `json` files in folder `data`
1. All done. Publish it to the cloud
