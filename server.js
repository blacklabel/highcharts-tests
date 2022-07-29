// Server to listing tests

const path = require('path'),
  fs = require('fs'),
  express = require('express'),
  app = express(),
  testsPath = path.join(__dirname, './tests'),
  getListOfTests = (urlPath) => fs.readdirSync(urlPath).filter(file => {
    return fs.statSync(path.join(urlPath, file)).isDirectory();
  });

app.use(express.static(testsPath));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const tests = getListOfTests(testsPath),
    currentTest = tests[0];

  res.render("index", { tests, currentTest })
});

app.get('/tests', async (req, res) => {
  const tests = getListOfTests(testsPath);

  res.send(tests)
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Classroom server available at: http://localhost:3000');
});