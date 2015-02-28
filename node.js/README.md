leaf-me-static (Node.js)
=====

**leaf-me-static** is a simple static site generator. Here is a **Node** version.

In the server side, it generates `index.html` and `json` file.

In the browser side, it requests `json` base on hash router and render the html.

The usage is quite simple:

1. Run `npm install` to install dependencies
1. Edit `config.yaml` to edit basic information of your site
1. Run `./new.js Article Title` to create a new `.md` file in folder `post`
1. Start writing
1. Run `./leaf.js` to generate `index.html` and `json` files in folder `data`
1. All done. Publish it to the cloud
