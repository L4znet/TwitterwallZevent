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
  consumer_key: "u0knN8RILaCoZN1GMBLvDS9hn",
  consumer_secret: "PwCzkmL4jbT3mHX39Sj6mxdXBfIaKBjxg9d9lDPZBS3hvRPgAN",
  access_token_key: "329181401-mzqy5XW8fif2iow5dfA1s31FOXY7Km3Ogg3uwY2M",
  access_token_secret: "pu6wP7PeHc6jFUs5vhMHjJ5kmsvy5YLs3WDxqQRupGfeD",
  baerer_token:
    "AAAAAAAAAAAAAAAAAAAAANyvIAEAAAAAEDBLUvdpgvWdQLhwTPh7OawIqOg%3DFH5VNbiB0JuPo86kxCBxfgazvMOEWtUwWuakbsamvtBZqTJBsJ",
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
