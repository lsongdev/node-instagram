const https = require('https');

const get = url =>
  new Promise(done => https.get(url, done));

const readStream = stream => {
  const buffer = [];
  return new Promise((resolve, reject) => {
    stream
      .on('error', reject)
      .on('data', chunk => buffer.push(chunk))
      .on('end', () => resolve(Buffer.concat(buffer)))
  });
};

const r = /<script type="text\/javascript">window._sharedData = (.+);<\/script>/;

const shareCode = code => {
  if (code.indexOf('instagram.com') !== -1)
    return code;
  return `https://www.instagram.com/p/${code}/`;
};

const Instagram = code =>
  Promise
    .resolve(code)
    .then(shareCode)
    .then(get)
    .then(readStream)
    .then(response => response.toString())
    .then(html => html.match(r))
    .then(m => m && m[1])
    .then(JSON.parse);

Instagram.get = get;
Instagram.readStream = readStream;

module.exports = Instagram;