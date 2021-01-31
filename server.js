// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date", (req, res) => {
  let {date} = req.params;
  let unixTimestamp;
  let utcTimestamp;
  if(!date) {
    unixTimestamp = parseInt(new Date().getTime());
    utcTimestamp = new Date().toUTCString();
  } else {
    let newDate;
    newDate = isNaN(Number(date)) ? new Date(date) : new Date(Number(date));
    unixTimestamp = parseInt(newDate.getTime())
    utcTimestamp = newDate.toUTCString();
  }
  if(unixTimestamp == undefined || utcTimestamp == "Invalid Date") {
    res.json({"error": "Invalid Date"})
  } else {
    res.json({
      "unix": unixTimestamp,
      "utc": utcTimestamp
    });
  }
}
)

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
