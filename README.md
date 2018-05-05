# testcafe-reporter-st-html

This is the **st-html** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

st-html outputs a semi-styled html report to help track documentation and for use in wiki tools like confluence.

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter st-html
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('st-html') // <-
    .run();
```

Although we recommend setting up a custom stream to output to within the  `reporter()` method:

```js
const fs = require('fs');
const stream = fs.createWriteStream(__dirname+'/reports_' + new Date().getTime() + '.html')

testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('st-html', stream) // <-
    .run();
```

