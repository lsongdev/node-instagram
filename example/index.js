
const Instagram = require('..');

Instagram('B4CR8RoHCn6')
  .then(data => {
    const { entry_data: { PostPage } } = data;
    return PostPage.map(post => post.graphql.shortcode_media)
  })
  .then(images => images.map(img => img.display_url))
  .then(console.log)