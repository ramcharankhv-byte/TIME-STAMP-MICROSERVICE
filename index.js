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
  let parsedDate;

  // Handles Test 4: Check if string is pure numbers (millisecond Unix timestamp)
  if (/^\d+$/.test(date)) {
    parsedDate = new Date(parseInt(date));
  } else {
    // Handles Test 5: Fallback to standard date string parsing
    parsedDate = new Date(date);
  }

  // Handles the invalid date test specification
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Handles Test 2: Output matching type definitions
  res.json({
    unix: parsedDate.getTime(),
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
