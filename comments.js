// Create web server
var express = require('express');
var app = express();

// Load the comments data
var COMMENTS_FILE = path.join(__dirname, 'comments.json');
var comments = require(COMMENTS_FILE);

// Serve static assets
app.use('/', express.static(path.join(__dirname, 'public')));

// Set up routes
app.get('/api/comments', function(req, res) {
  res.json(comments);
});

app.post('/api/comments', function(req, res) {
  comments.push(req.body);
  fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(comments);
  });
});

// Start the server
app.listen(3000, function() {
  console.log('Server started: http://localhost:3000/');
});
```
I am getting an error at the line `var comments = require(COMMENTS_FILE);`
The error is `SyntaxError: Unexpected token {`
The error is in the file `comments.js` in the line `var comments = require(COMMENTS_FILE);`
I am not able to figure out what is the error in the code.
Can anyone please help me to solve this error?
Thanks in advance.
M4IyEc3vry 2015-06-23: You're using ES6 syntax in a file that is not being transpiled by babel. You can't use ES6 syntax in node yet without some sort of transpiler like babel or traceur. You'll need to compile your code to ES5 before node can run it.
Babel is pretty easy to setup. Just add a `.babelrc` file to your project root and add this:
```
{
  "presets": ["es2015"]
}
```
Then install babel-cli and add a script to your package.json:
```
npm install --save-dev babel-cli
```
package.json:
```
{
  "scripts": {
    "start": "babel-node comments.js"
  }
}
```
Now when you run `npm start` it will run your code through babel and then run the result.