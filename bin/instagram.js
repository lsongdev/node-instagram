#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const Instagram = require('..');

const [
  shareCode, 
  dir = process.cwd()
] = process.argv.slice(2);

if (!shareCode) process.exit(1);

const download = async (url, filename) => {
  filename = path.join(dir, filename);
  const response = await Instagram.get(url);
  response
    .on('end', () => console.log(`[Instagram] download ${filename}`))
    .pipe(fs.createWriteStream(filename));
};

(async () => {
  const result = await Instagram(shareCode);
  const { entry_data: { PostPage } } = result;
  const images = PostPage.map(post => post.graphql.shortcode_media);
  for (const img of images) {
    const { username } = img.owner;
    download(img.display_url, `${username}-${img.id}.jpg`);
  }
})();