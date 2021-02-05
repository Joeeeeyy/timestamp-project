// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
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



// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

/** My Solution */

app.get("/api/timestamp/:date_string", (req, res) => {
  let dateStr = req.params.date_string;

  if (/\d{5,}/.test(dateStr)) {
    let dateInt = parseInt(dateStr);

    res.json({
      unix: dateStr, 
      utc: new Date(dateInt).toUTCString()
    });
  } else {
    let dateObj = new Date(dateStr);

    if (dateObj.toString() === "Invalid Date") {
      res.json({
        error: "Invalid Date"
      });
    } else {
      res.json({
        unix: dateObj.valueOf(),
        utc: dateObj.toUTCString()
      });
    }
  }
});