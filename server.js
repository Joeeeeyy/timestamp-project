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

let dateObj = {}

app.get('/api/timestamp/:date_string', (req, res) => {
  let dateString = req.params.date_string
 
  if(dateString.includes('-')) {
    dateObj['unix'] = new Date(dateString).getTime()
    dateObj['utc'] = new Date(dateString).toUTCString()
  } else {
    dateString = parseInt(dateString)

    dateObj['unix'] = new Date(dateString).getTime()
    dateObj['utc'] = new Date(dateString).toUTCString()
  }

  if(!dateObj['unix'] || !dateObj['utc']) {
    res.json({error: 'Invalid Date'})
  }
  res.json(dateObj)
})