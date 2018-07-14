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
    fixtureCount: 0,

    reportTaskStart: function reportTaskStart(startTime, userAgents, testCount) {
      this.startTime = startTime;
      this.uaList = userAgents.join(', ');
      this.testCount = testCount;
      this.report = '';
      this.fixtureCount = 0;
    },

    reportFixtureStart: function reportFixtureStart(name) {
      this.currentFixtureName = name;
      this.fixtureCount++;
    },

    reportTestDone: function reportTestDone(name, testRunInfo) {
      var hasErr = !!testRunInfo.errs.length;
      var result = hasErr ? 'failed' : 'passed';

      if (testRunInfo.skipped) this.skipped++;

      this.compileTestTable(name, testRunInfo, hasErr, result);
      if (hasErr) this.compileErrors(name, testRunInfo);
    },

    compileErrors: function compileErrors(name, testRunInfo) {
      var _this = this;
      var heading = this.currentFixtureName + ' - ' + name;

      this.report += this.indentString('<h4>' + heading + '</h4>\n');
      testRunInfo.errs.forEach(function (error) {
        _this.report += _this.indentString('<pre>');
        _this.report += _this.indentString(' \n');
        _this.report += _this.formatError(error, '');
        _this.report += _this.indentString('\n');
        _this.report += _this.indentString('</pre>');
        _this.report += _this.indentString('\n');
      });
    },

    compileTestTable: function compileTestTable(name, testRunInfo, hasErr, result) {
      if (hasErr) this.tableReports += this.indentString('<tr class="failed">\n');
      else if (testRunInfo.skipped) this.tableReports += this.indentString('<tr class="skipped">\n');
      else this.tableReports += this.indentString('<tr class="passed">\n');

      //Result
      this.tableReports += this.indentString('<td>', 2);
      if (testRunInfo.skipped) this.tableReports += 'skipped';
      else this.tableReports += result;
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
      var total = this.testCount + this.skipped;
      var data_arr = "[" + passed*1.0/total + "," + failed*1.0/total + "," + this.skipped*1.0/total + "," + warnings.length*1.0/total + "]";

      //Opening html
      this
        .write('<html lang="en">').newline()
        .setIndent(1).write('<head>').newline()
        .setIndent(2).write('<style type="text/css">').newline()
        .setIndent(4).write('body {background-color:#d0e4fe;}').newline()
                     .write('h1 {color:orange;text-align:center;}').newline()
                     .write('h3, h4 {color:#FF2D2D;}').newline()
                     .write('table, pre, h1, h2, h3, h4, li {width:80%; margin-right:10%; margin-left:10%;}').newline()
                     .write('canvas {margin-right:10%; margin-left:10%;}').newline()
                     .write('table {font-family:"Trebuchet MS", Arial, Helvetica, sans-serif; border-collapse:collapse;}').newline()
                     .write('table td, table th {font-size:1em; border:1px solid #98bf21; padding:3px 7px 2px 7px;}').newline()
                     .write('table th {font-size:1.1em; text-align:left; padding-top:5px; padding-bottom:4px; background-color:#A7C942; color:#ffffff; text-align:center;}').newline()
                     .write('table tr.passed td {color:#000000; background-color:#02DF82;}').newline()
                     .write('table tr.skipped td {color:#000000; background-color:#ADADAD;}').newline()
                     .write('table tr.failed td {color:#000000; background-color:#FF5151;}').newline()
                     .write('pre {border-color:#6C6C6C; border-style:dashed; border-width:1px; border-radius:5px;font-family:"Courier New","Consolas";font-size:8}').newline()
        .setIndent(2).write('</style>').newline()
        .setIndent(2).write('<script>').newline()
        .setIndent(2).write('  function drawCircle(canvasId, data_arr, color_arr, text_arr) {').newline()
        .setIndent(2).write('    var c = document.getElementById(canvasId);').newline()
        .setIndent(2).write('    var ctx = c.getContext("2d");').newline()
        .setIndent(2).write('    var radius = c.height / 2 - 20;').newline()
        .setIndent(2).write('    var ox = radius + 20, oy = radius + 20;').newline()
        .setIndent(2).write('    var width = 30, height = 10;').newline()
        .setIndent(2).write('    var posX = ox * 2 + 20, posY = 30;').newline()
        .setIndent(2).write('    var textX = posX + width + 5, textY = posY + 10;').newline()
        .setIndent(2).write('    var startAngle = 0;').newline()
        .setIndent(2).write('    var endAngle = 0;').newline()
        .setIndent(2).write('    for (var i = 0; i < data_arr.length; i++) {').newline()
        .setIndent(2).write('      endAngle = endAngle + data_arr[i] * Math.PI * 2;').newline()
        .setIndent(2).write('      ctx.fillStyle = color_arr[i];').newline()
        .setIndent(2).write('      ctx.beginPath();').newline()
        .setIndent(2).write('      ctx.moveTo(ox, oy);').newline()
        .setIndent(2).write('      ctx.arc(ox, oy, radius, startAngle, endAngle, false);').newline()
        .setIndent(2).write('      ctx.closePath();').newline()
        .setIndent(2).write('      ctx.fill();').newline()
        .setIndent(2).write('      startAngle = endAngle;').newline()
        .setIndent(2).write('').newline()
        .setIndent(2).write('      ctx.fillStyle = color_arr[i];').newline()
        .setIndent(2).write('      ctx.fillRect(posX, posY + 20 * i, width, height);').newline()
        .setIndent(2).write('      ctx.moveTo(posX, posY + 20 * i);').newline()
        .setIndent(2).write('      ctx.font = "bold 12px Microsoft YaHei";').newline()
        .setIndent(2).write('      ctx.fillStyle = color_arr[i];').newline()
        .setIndent(2).write('      var percent = text_arr[i] + "£º" + parseFloat((100 * data_arr[i]).toFixed(3)) + "%";').newline()
        .setIndent(2).write('      ctx.fillText(percent, textX, textY + 20 * i);').newline()
        .setIndent(2).write('    }').newline()
        .setIndent(2).write('  }').newline()
        .setIndent(2).write('').newline()
        .setIndent(2).write('  function init() {').newline()
        .setIndent(2).write('    var data_arr = ' + data_arr + ';').newline()
        .setIndent(2).write('    var color_arr = ["#02DF82", "#FF5151", "#ADADAD", "#FFFF00"];').newline()
        .setIndent(2).write('    var text_arr = ["passed tests", "failed tests", "skipped tests", "warning tests"];').newline()
        .setIndent(2).write('    drawCircle("canvas_circle", data_arr, color_arr, text_arr);').newline()
        .setIndent(2).write('  }').newline()
        .setIndent(2).write('').newline()
        .setIndent(2).write('  window.onload = init;').newline()
        .setIndent(2).write('</script>').newline()
        .setIndent(1).write('</head>').newline()
                     .write('<body>').newline()
                     .write('<div class="container">').newline();

        //Now add a summary
        this
          .write('<h1 class="text-primary">TestCafe Test Summary</h1>').newline()
          .write('<br>').newline()
          .write('<div class="bg-primary" style="padding:15px">').newline()
          .write('<h3>Summary</h3><br>').newline()
          .write('<li class="lead">Browsers: ' + this.uaList + '</li>').newline()
          .write('<li class="lead">Start Time: ' + this.moment(this.startTime).format('YYYY-MM-DD HH:mm:ss:SSS') + '</li>').newline()
          .write('<li class="lead">End Time: ' + this.moment(endTime).format('YYYY-MM-DD HH:mm:ss:SSS') + '</li>').newline()
          .write('<li class="lead">Duration: ' + durationStr + '</li>').newline()
          .write('<li class="lead">Fixture Count: ' + this.fixtureCount + '</li>').newline()
          .write('<li class="lead">Tests Total: ' + total + '</li>').newline()
          .write('<li class="lead">Tests Passed: ' + passed + '</li>').newline()
          .write('<li class="lead">Tests Failed: ' + failed + '</li>').newline()
          .write('<li class="lead">Tests Skipped: ' + this.skipped + '</li>').newline()
          .write('<li class="lead">Tests Warning: ' + warnings.length + '</li>').newline()
          .write('<canvas id="canvas_circle" width="500" height="300"></canvas>').newline()
          .write('</div><br>').newline();

      //Summary table
      var table = '<table class="table ">';
      table += this.indentString('<tr>');
      table += this.indentString('<th>Result</th>', 2);
      table += this.indentString('<th>Test</th>', 2);
      table += this.indentString('<th>Fixture</th>', 2);
      table += this.indentString('<th>Browser</th>', 2);
      table += this.indentString('<th>Duration</th>', 2);
      table += this.indentString('</tr>');
      table += this.indentString('\n');
      table += this.tableReports;
      table += '</table>';
      this.write(table).newline().write('<br><br>');

      //Error details
      this.write('<h3>Error Details</h3><br>').newline().write(this.report).newline();

      //Warnings details
      if (warnings.length > 0) {
        this.write('<h3>Warning Details</h3><br>').newline().write(this.compileWarnings(warnings)).newline();
      }

      //closing html
      this.write('</div></body></html>');
    },

    compileWarnings: function compileWarnings(warnings) {
      var _this = this;
      var heading = 'Warnings (' +  warnings.length + '):';
      var reportWarning = '';
      reportWarning += this.indentString('<h4>' + heading + '</h4>\n');
      warnings.forEach(function (msg) {
        reportWarning += _this.indentString('<pre>');
        reportWarning += _this.indentString(' \n');
        reportWarning += _this.indentString(msg);
        reportWarning += _this.indentString('\n');
        reportWarning += _this.indentString('</pre>');
        reportWarning += _this.indentString('\n');
      });
      return reportWarning;
    }
  };
};

module.exports = exports['default'];