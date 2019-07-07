const files = [
  'main.js',
  'booksApi.js',
  'table.js',
  'spinner.js',
  'script-3.js',
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