$(document).ready(function () {
  var socket = io.connect("http://localhost:1337", {
    reconnection: true,
  });
  socket.on("connect", function (client) {
    let search = $("#search");
    socket.on("tweet", function (data) {
      if (data[1] == "Bot Zevent" || data[1] == "Zevent2020Bot") {
        $("main").append(
          "<div class='tweet_bot'> <img src='" +
            data[2] +
            "'>  <strong>" +
            data[1] +
            "</strong>  <p>" +
            data[0] +
            "</p></div>"
        );
      } else {
        $("main").append(
          "<div class='tweet'> <img src='" +
            data[2] +
            "'>  <strong>" +
            data[1] +
            "</strong>  <p>" +
            data[0] +
            "</p></div>"
        );
      }

      // horizontal and vertical scroll increments
    });

    search.on("keypress", function (e) {
      let search_text = $("#search").val();
      if (e.which == 13) {
        socket.emit("search_text", search_text);
      }
    });
  });
  setInterval(() => {
    window.scrollBy(0, window.innerHeight);
  }, 100);
});
