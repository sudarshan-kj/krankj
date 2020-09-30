let context = require.context("./", true, /\.(png|jpe?g)$/i);

let files = [];

context.keys().forEach((filename) => {
  files.push(context(filename));
});

export default files;
