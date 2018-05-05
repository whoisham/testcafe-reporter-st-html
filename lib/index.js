'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  return {
    noColors: true,
    startTime: null,
    afterErrList: false,
    uaList: null,
    report: '',
    table: '',
    tableReports: '',
    testCount: 0,
    skipped: 0,

    reportTaskStart: function reportTaskStart(startTime, userAgents, testCount) {
      this.startTime = startTime;
      this.uaList = userAgents.join(', ');
      this.testCount = testCount;
    },

    reportFixtureStart: function reportFixtureStart(name) {
      this.currentFixtureName = name;
    },

    reportTestDone: function reportTestDone(name, testRunInfo) {
      var hasErr = !!testRunInfo.errs.length;
      var result = hasErr ? 'failed' : 'passed';

      if (testRunInfo.skipped) this.skipped++;

      this._compileTestTable(name, testRunInfo, hasErr, result);
      if (hasErr) this._compileErrors(name, testRunInfo);
    },

    _compileErrors: function _compileErrors(name, testRunInfo) {
      var _this = this;
      var heading = this.currentFixtureName + ' - ' + name;

      this.report += this.indentString('<h4>' + heading + '</h4>\n');
      testRunInfo.errs.forEach(function (error) {
        _this.report += _this.indentString('<pre>');
        _this.report += _this.indentString('\n');
        _this.report += _this.formatError(error, '');
        _this.report += _this.indentString('\n');
        _this.report += _this.indentString('</pre>');
        _this.report += _this.indentString('\n');
      });
    },

    _compileTestTable: function _compileTestTable(name, testRunInfo, hasErr, result) {
      if (hasErr) this.tableReports += this.indentString('<tr class="danger">\n');
      else if (testRunInfo.skipped) this.tableReports += this.indentString('<tr class="warning">\n');
      else this.tableReports += this.indentString('<tr class="success">\n');

      //Result
      this.tableReports += this.indentString('<td>', 2);
      if (testRunInfo.skipped) this.tableReports += 'skipped';else this.tableReports += result;
      this.tableReports += '</td>\n';
      //Test
      this.tableReports += this.indentString('<td>', 2);
      this.tableReports += name;
      this.tableReports += '</td>\n';
      //Fixture
      this.tableReports += this.indentString('<td>', 2);
      this.tableReports += this.currentFixtureName;
      this.tableReports += '</td>\n';
      //Browsers
      this.tableReports += this.indentString('<td>', 2);
      this.tableReports += this.uaList;
      this.tableReports += '</td>\n';
      //Duration
      this.tableReports += this.indentString('<td>', 2);
      this.tableReports += this.moment.duration(testRunInfo.durationMs).format('d[d] h[h] mm[m] ss[s] SSS[ms]');
      this.tableReports += '</td>\n';

      this.tableReports += this.indentString('</tr>\n');
    },

    reportTaskDone: function reportTaskDone(endTime, passed , warnings) {
      var durationMs = endTime - this.startTime;
      var durationStr = this.moment.duration(durationMs).format('d[d] h[h] mm[m] ss[s] SSS[ms]');
      var failed = this.testCount - passed;

      //Opening html
      this
        .write('<html lang="en">').newline()
        .setIndent(1).write('<head>').newline()
        .setIndent(2).write('<style type="text/css">').newline()
        .setIndent(4).write('body {background-color:#d0e4fe;}').newline()
                     .write('h1 {color:orange;text-align:center;}').newline()
                     .write('h3, h4 {color:#FF2D2D;}').newline()
                     .write('table, pre, h1, h2, h3, h4, p {width:80%; margin-right:10%; margin-left:10%;}').newline()
                     .write('table {font-family:"Trebuchet MS", Arial, Helvetica, sans-serif; border-collapse:collapse;}').newline()
                     .write('table td, table th {font-size:1em; border:1px solid #98bf21; padding:3px 7px 2px 7px;}').newline()
                     .write('table th {font-size:1.1em; text-align:left; padding-top:5px; padding-bottom:4px; background-color:#A7C942; color:#ffffff; text-align:center;}').newline()
                     .write('table tr.success td {color:#000000; background-color:#02DF82;}').newline()
                     .write('table tr.warning td {color:#000000; background-color:#ADADAD;}').newline()
                     .write('table tr.danger  td {color:#000000; background-color:#FF5151;}').newline()
                     .write('pre {border-color:#6C6C6C; border-style:dashed; border-width:1px; border-radius:5px;}').newline()
        .setIndent(2).write('</style>').newline()
        .setIndent(1).write('</head>').newline()
                     .write('<body>').newline()
                     .write('<div class="container">').newline();

        //Now add a summary
        this
          .write('<h1 class="text-primary">TestCafe Test Summary</h1>').newline()
          .write('<br>').newline()
          .write('<div class="bg-primary" style="padding:15px">').newline()
          .write('<h3>Summary</h3><br>').newline()
          .write('<p class="lead">Browsers: ' + this.uaList + '</p>').newline()
          .write('<p class="lead">Start Time: ' + this.startTime + '</p>').newline()
          .write('<p class="lead">End Time: ' + endTime + '</p>').newline()
          .write('<p class="lead">Duration: ' + durationStr + '</p>').newline()
          .write('<p class="lead">Tests Failed: ' + failed + ' out of ' + this.testCount + '</p>').newline()
          .write('<p class="lead">Tests Skipped: ' + this.skipped + '</p>').newline()
          .write('<p class="lead">Tests Warning: ' + warnings.length + '</p>').newline()
          .write('</div><br>').newline();

      //Summary table
      var table = '<table class="table ">';
      table += this.indentString('<tr>');
      table += this.indentString('<th>Result</th>', 2);
      table += this.indentString('<th>Test</th>', 2);
      table += this.indentString('<th>Fixture</th>', 2);
      table += this.indentString('<th>Browsers</th>', 2);
      table += this.indentString('<th>Duration</th>', 2);
      table += this.indentString('</tr>');
      table += this.indentString('\n');
      table += this.tableReports;
      table += '</table>';
      this.write(table).newline().write('<br><br>');

      //Error details
      this.write('<h3>Error Details</h3><br>').newline().write(this.report).newline();

      //closing html
      this.write('</div></body></html>');
    }
  };
};

module.exports = exports['default'];