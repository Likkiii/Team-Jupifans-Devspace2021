let socket, sendMessageBoard;
var item = document.getElementsByClassName("drawing-board-canvas-wrapper");
console.log(item);

$(() => {
  canPresent = false;
  socket = io.connect("http://localhost:5500");
  sendMessageBoard = new DrawingBoard.Board("sendMessageBoard");
  /*
  $("#sendDWGbtn").click(() => {
    // Send image to server on button click
    console.log("SEND DRAWINGG");
    socket.emit("drawing", sendMessageBoard.getImg());
    //After sending image clears out the canvas
    //sendMessageBoard.resetBackground();
    return false;
  });*/

  $("#sendDWGbtn").click(() => {
    // Send image to server on button click
    console.log("present ", document.getElementById("name").value, canPresent);
    socket.emit("present", document.getElementById("name").value);
    //After sending image clears out the canvas
    //sendMessageBoard.resetBackground();
    return false;
  });

  setInterval(() => {
    console.log(canPresent);
    if (!canPresent) {
      $("#sendMessageBoardDiv").hide();
      $("#messageContainer").show();
      return;
    }
    $("#sendMessageBoardDiv").show();
    $("#messageContainer").hide();
    // Send image to server on button click
    //console.log("SEND DRAWINGG");
    socket.emit("drawing", sendMessageBoard.getImg());
    //After sending image clears out the canvas
    //sendMessageBoard.resetBackground();
    return false;
  }, 1000);

  socket.on("drawing", function (msg) {
    $("#messageContainer")
      .empty()
      .append(
        $("<li class='w-100 d-flex align-center justify-content-center'>").html(
          `<img src="${msg}" class="w-75 m-auto img-msg"/>`
        )
      );
    window.scrollTo(0, document.body.scrollHeight);
  });
  socket.on("present", function (name) {
    console.log("name is ", name, document.getElementById("name").value);
    document.getElementById("name").value === name
      ? (canPresent = true)
      : (canPresent = false);
  });
});
