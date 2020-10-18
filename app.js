let Twitter = require("twitter");
let express = require("express");
let path = require("path");
var http = require("http");
let app = express();
// Pass a http.Server instance to the listen method
var server = app.listen(1337);
var io = require("socket.io").listen(server);

let text = "";

let tweet_text = "";
var twitter = new Twitter({
  consumer_key: "XXXXXXXX",
  consumer_secret: "XXXXXXX",
  access_token_key: "XXXXX",
  access_token_secret: "XXXXXXX",
  baerer_token:
    "XXXXX",
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index");
});
io.on("connect", (socket) => {
  socket.on("search_text", (search_text) => {
    text = search_text;
    console.log(text);
  });
  twitter.stream("statuses/filter", { track: "#ZEVENT2020" }, function (
    stream
  ) {
    stream.on("data", function (tweet) {
      if (tweet.retweeted_status == undefined) {
        tweet_texts = tweet.text;
        tweet_name = tweet.user.name;
        tweet_profile_image_url = tweet.user.profile_image_url;
        io.emit("tweet", [tweet_texts, tweet_name, tweet_profile_image_url]);
      }
    });

    stream.on("error", function (error) {
      console.error(error);
    });
  });
});
