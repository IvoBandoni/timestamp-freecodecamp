// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

const getTimestamp = date => ({
  unix: date.getTime(),
  utc: date.toUTCString()
});

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

let responseObject = {};

// your first API endpoint...
app.get("/api/timestamp/", function(req, res) {
  let timestamp = req.params.timestamp;
  if(timestamp.match(/\d{5,}/)){
    timestamp = +timestamp;
  }
  let date_string = req.params.date;
  let input = req.params.input;
  if (!input.includes("-")) {
    responseObject["unix"] = new Date(input).getTime();
    responseObject["utc"] = new Date(input).toUTCString();
  } else {
    input = parseInt(input);

    responseObject["unix"] = new Date(date_string);
    responseObject["utc"] = new Date(input).toUTCString();
  }
  if (date.toString() === "Invalid Date") {
    return res.json({
      error: { error: "Invalid Date" }
    });
  } 
  else {
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }

  if (!responseObject["unix"] || !responseObject["utc"]) {
    res.json({ error: "Invalid Date" });
  }
});

app.get("/api/timestamp", (req, res) => {
  responseObject["unix"] = new Date.parse().getTime();
  responseObject["utc"] = new Date.parse().toUTCString();

  if (!responseObject["unix"] || !responseObject["utc"]) {
    res.json({ error: "Invalid Date" });
  }

  res.json(responseObject);
});

var date = new Date();

app.get("/api/:date", (req, res) => {
  let date_string = req.params.date;
  console.log(date_string);
  if (date_string.indexOf("-") === -1) {
    date_string = new Number(date_string);
  }
  let dateRes = new Date(date_string);
  if (isValidDate(dateRes)) {
    res.json({ unix: dateRes.getTime(), utc: dateRes.toUTCString() });
  } else {
    res.json({error : "Invalid Date" });
    if (!date.getTime()) {
      error: "Invalid Date ";
    }
  }
});

app.get("/api/:date_string?", (req, res) => {
  let date = new Date();
  res.json({ unix: date.valueOf(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
