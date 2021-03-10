const express = require("express");
const fs = require("fs");
const https = require("https");
const bodyParser = require("body-parser");


const httpsOptions = {
  cert: fs.readFileSync("/etc/letsencrypt/live/lojagn.ml/fullchain.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/live/lojagn.ml/prod.crt"),
  key: fs.readFileSync("/etc/letsencrypt/live/lojagn.ml/privkey.pem"),
  minVersion: "TLSv1.2",
  requestCert: true,
  rejectUnauthorized: true,
};

const app = express();
const httpsServer = https.createServer(httpsOptions, app);
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  response.send("Hello");
  // console.log(request.body);
});

app.post("/", (request, response) => {
  console.log(request.body);
  response.status(200).end();
});

app.post("//pix", (request, response) => {
  console.log(request.body);
  var body = request.body;
  filePath = __dirname + "/data.json";
  fs.appendFile(filePath, JSON.stringify(body) + "\n", function (err) {
    if (err) {
       console.log(err);
    } else {
       response.status(200).end();
    }
  });
});

app.put("/", (request, response) => {
  response.status(201).end();
});

httpsServer.listen(PORT, () =>
  console.log(`Express server currently running on port ${PORT}`)
);
