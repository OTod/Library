const files = [
  'main.js',
  'booksApi.js',
  'table.js',
  'script-3.js',

]
.map(file => `${__dirname}/src/${file}`);

module.exports = {
  mode: 'development',
  entry: files,
  output : {
    path: __dirname+'/dist',
    filename: 'main.js'
  }
}