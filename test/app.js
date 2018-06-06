'use strict';

let createTestCafe = require('testcafe');
let testcafe = null;
let fs = require('fs');
let stream = fs.createWriteStream(__dirname+'/reports_' + new Date().getTime() + '.html')

createTestCafe('localhost')
  .then(tc => {
    testcafe = tc;
    const runner = testcafe.createRunner();

    return runner
      .startApp('node server.js 8085', 4000)
      .src('fixture1.js')
      .src('fixture2.js')
      .src('fixture3.js')
      .src('fixture4.js')
      .browsers('chrome:headless')
      .reporter('st-html', stream)
      .concurrency(3)
      .screenshots('./')
      .run();
  })
  .then(failedCount => {
    testcafe.close();
  });
