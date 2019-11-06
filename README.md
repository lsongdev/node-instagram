## instagram-downloader

> Parse Instagram Share Data in JavaScript

[![instagram-downloader](https://img.shields.io/npm/v/instagram-downloader.svg)](https://npmjs.org/instagram-downloader)

### Installation

```bash
$ npm i [-g] instagram-downloader
```

### Example

```js
const Instagram = require('instagram-downloader');

Instagram('--- INSTAGRAM SHARE CODE FROM SHARE LINK ---')
  .then(data => {
    const { entry_data: { PostPage } } = data;
    return PostPage.map(post => post.graphql.shortcode_media)
  })
  .then(images => images.map(img => img.display_url))
  .then(console.log)

```

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT

This work is licensed under the [MIT license](./LICENSE).

---