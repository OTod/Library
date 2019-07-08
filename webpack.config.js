const files = [
  'main.js',
  'booksApi.js',
  'table.js',
  'formController.js',
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