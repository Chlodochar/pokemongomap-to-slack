var express = require('express');
var bodyParser = require('body-parser');
var Slack = require('slack-node');
var program = require('commander');

program
  .version('0.0.1')
  .option('-u, --slackurl [url]', 'Url for slack to use')
  .parse(process.argv);

var slack = new Slack();
slack.setWebhook(program.slackurl);

var app = express();

app.use(bodyParser.json());

// Log incoming requests.
// app.use(function(req, res, next) {
//   console.log(req.method, req.url, req.body)
//   next();
// });

app.post('/webhook', function(req, res, next) {
  slack.webhook({
    channel: "#general",
    username: "webhookbot",
    text: "This is posted to #general and comes from a bot named webhookbot."
  }, function(err, response) {
    if (err) {
      return next(err);
    }
    res.end();
  });
})

app.listen(8080)