// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(), // freeCodeCamp expects milliseconds
    utc: now.toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  const { date } = req.params;

  // 1. Check if the input is a pure Unix timestamp string (only digits)
  // 2. Parse into a valid Date object
  const parsedDate = /^\d+$/.test(date)
    ? new Date(parseInt(date))
    : new Date(date);

  // 3. Validate the Date object
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ error: "Invalid Date" });
  }

  // 4. Send successful JSON response
  res.json({
    unix: Math.floor(parsedDate.getTime() / 1000),
    utc: parsedDate.toUTCString(),
  });
});

app.get("/api/:unix", (req, res) => {
  const { unix } = req.params;
  const unixNum = Number(unix);

  const date = new Date(unixNum * 1000);

  res.json({
    unix: unixNum,
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
