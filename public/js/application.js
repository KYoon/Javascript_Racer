$(document).ready(function() {

// Pure Javascript
var Player = function(name) {
  this.name = name;
  this.position = 0;
  this.win = false;
};

var track = {
  length: 0
}

var player1;
var player2;
var name1;
var name2;

Player.prototype.updatePlayerPosition = function() {
  return this.position++;
};

function generateBananaPeels() {
  $("#player1_top_strip td").eq(Math.floor((Math.random() * (track.length - 3) + 2))).addClass("banana");
  $("#player2_top_strip td").eq(Math.floor((Math.random() * (track.length - 3) + 2))).addClass("banana");
  $("#player1_bottom_strip td").eq(Math.floor((Math.random() * (track.length - 3) + 2))).addClass("banana");
  $("#player2_bottom_strip td").eq(Math.floor((Math.random() * (track.length - 3) + 2))).addClass("banana");
}

function generateSpeedBoosts() {
  $("#player1_top_strip td").eq(Math.floor((Math.random() * (track.length - 4) + 2))).addClass("boost");
  $("#player2_top_strip td").eq(Math.floor((Math.random() * (track.length - 4) + 2))).addClass("boost");
  $("#player1_bottom_strip td").eq(Math.floor((Math.random() * (track.length - 4) + 2))).addClass("boost");
  $("#player2_bottom_strip td").eq(Math.floor((Math.random() * (track.length - 4) + 2))).addClass("boost");
}

function generateEnviornment() {
  if (track.length < 10){
    return
  }
  else if (track.length >= 10 && track.length < 20){
    for (i=0; i<1; i++){
      generateBananaPeels();
      generateSpeedBoosts();
    }
  }
  else if (track.length >= 20 && track.length < 30){
    for (i=0; i<2; i++){
      generateBananaPeels();
      generateSpeedBoosts();
    }
  }
  else {
    for (i=0; i<4; i++){
      generateBananaPeels();
      generateSpeedBoosts();
    }
  }
}

function player1TopTrackBananaLogic() {
  $("#player1_top_strip td").eq(player1.position).removeClass();
  $("#player1_top_strip td").eq(player1.position - 1).removeClass();
  player1.position = (player1.position - 2);
  $("#player1_top_strip td").eq(player1.position).removeClass();
  $("#player1_top_strip td").eq(player1.position).addClass("active");
}

function player1BottomTrackBananaLogic() {
  $("#player1_bottom_strip td").eq(player1.position).removeClass();
  $("#player1_bottom_strip td").eq(player1.position - 1).removeClass();
  player1.position = (player1.position - 2);
  $("#player1_bottom_strip td").eq(player1.position).removeClass();
  $("#player1_bottom_strip td").eq(player1.position).addClass("active");
}

function player2TopTrackBananaLogic() {
  $("#player2_top_strip td").eq(player2.position).removeClass();
  $("#player2_top_strip td").eq(player2.position - 1).removeClass();
  player2.position = (player2.position - 2);
  $("#player2_top_strip td").eq(player2.position).removeClass();
  $("#player2_top_strip td").eq(player2.position).addClass("active");
}

function player2BottomTrackBananaLogic() {
  $("#player2_bottom_strip td").eq(player2.position).removeClass();
  $("#player2_bottom_strip td").eq(player2.position - 1).removeClass();
  player2.position = (player2.position - 2);
  $("#player2_bottom_strip td").eq(player2.position).removeClass();
  $("#player2_bottom_strip td").eq(player2.position).addClass("active");
}

// AJAX Calls
  // Signup
  $("#signup").on("submit",function(e) {
    e.preventDefault();
    var request = $.ajax({
      url: "/signup",
      type: "POST",
      data: $(this).serialize()
    });

    request.done(function(response) {
      $(".success").children().remove();
      $(".success").append(response);
    });
  });

  // Login --- If successful, render the board :D
  $("#login").on("submit",function(e) {
    e.preventDefault();
    var request = $.ajax({
      url: "/login",
      type: "POST",
      data: $(this).serialize()
    });

    request.done(function(response) {
      if (response === "Invalid user(s), try again or you need to create a user.") {
        $("#login").append("<p>" + response + "</p>");
      }

      else {
        $("#login_signup").toggle();
        $(".board").toggle();
        track.length = parseInt(response.track_length);

        for (i=0; i<parseInt(response.track_length); i++) {
          $("#player1_top_strip").append("<td></td>");
          $("#player2_top_strip").append("<td></td>");
        }
        for (i=0; i<=parseInt(response.track_length); i++) {
          $("#player1_bottom_strip").append("<td></td>");
          $("#player2_bottom_strip").append("<td></td>");
        }

        generateEnviornment();

        $(".player1").html(response.player1);
        $(".player2").html(response.player2);
        $("#player1-wins").html(response.player1_wins);
        $("#player2-wins").html(response.player2_wins);
        $("#track-length").append(response.track_length);
        player1 = new Player(response.player1);
        player2 = new Player(response.player2);
      }
    });
});

  // Restart button
  $(".board").on("click", "#restart-button", function(e) {
    e.preventDefault();
    $("#restart_game_button").hide();
    $("tr").children("td").removeClass("active");
    $("tr").children("td").removeClass("boost");
    $("tr").children("td").removeClass("banana");
    $("#player1_top_strip").children("td:first-child").addClass("active");
    $("#player2_top_strip").children("td:first-child").addClass("active");
    $("h1").html("Yoonified Racer");

    generateEnviornment();

    player1.win = false;
    player2.win = false;
    player1.position = 0;
    player2.position = 0;
  })




  // Checking if one of the players have won and then increments their win count in the database via controller

  function player1Win() {
    if (player1.win === true) {
      var request = $.ajax({
        url: "/players/" + player1.name + "/win",
        type: "put"
      });

      request.done(function(response){
        $("#player1-wins").html(response.new_player_win_count);
      })

      $("h1").html("Game is over! " + player1.name + " has won!");
      $("#restart_game_button").show();
    }
  }

  function player2Win() {
    if (player2.win === true){
      var request = $.ajax({
        url: "/players/" + player2.name + "/win",
        type: "put"
      });

      request.done(function(response){
        $("#player2-wins").html(response.new_player_win_count);
      })

      $("h1").html("Game is over! " + player2.name + " has won!");
      $("#restart_game_button").show();
    }
  }

  // ==================================
  // Character Movement

  function player1Movement() {
    // Keypress d to move right for top player if they are on top track
    if (event.keyCode === 68 && $("#player1_top_strip td").eq(player1.position).attr("class") === "active"){
      player1.updatePlayerPosition();
      // Banana Peel Logic
      if ($("#player1_top_strip td").eq(player1.position).attr("class") === "banana") {
        player1TopTrackBananaLogic()
      }
      // End banana peel logic
      // Speed boost logic
      else if ($("#player1_top_strip td").eq(player1.position).attr("class") === "boost") {
        $("#player1_top_strip td").eq(player1.position).removeClass();
        $("#player1_top_strip td").eq(player1.position - 1).removeClass();
        player1.position = (player1.position + 2);
        // Inner banana peel logic
        if ($("#player1_top_strip td").eq(player1.position).attr("class") === "banana") {
          player1TopTrackBananaLogic();
        }
        // End inner banana peel logic
        $("#player1_top_strip td").eq(player1.position).removeClass();
        $("#player1_top_strip td").eq(player1.position).addClass("active");
      }
      // End speed boost logic
      else {
        $("#player1_top_strip td").eq(player1.position - 1).toggleClass("active");
        $("#player1_top_strip td").eq(player1.position).removeClass();
        $("#player1_top_strip td").eq(player1.position).addClass("active");
        if(player1.position === $("#player1_top_strip td").length - 1) {
          player1.win = true;
        }
      }
    }

      // Keypress d to move right for top player if they are on bottom track
      if (event.keyCode === 68 && $("#player1_bottom_strip td").eq(player1.position).attr("class") === "active"){
        player1.updatePlayerPosition();
        // Banana Peel Logic
        if ($("#player1_bottom_strip td").eq(player1.position).attr("class") === "banana") {
          player1BottomTrackBananaLogic();
        }
        // End banana peel logic
        // Speed boost logic
        else if ($("#player1_bottom_strip td").eq(player1.position).attr("class") === "boost") {
          $("#player1_bottom_strip td").eq(player1.position).removeClass();
          $("#player1_bottom_strip td").eq(player1.position - 1).removeClass();
          player1.position = (player1.position + 2);
        // Inner banana peel logic
        if ($("#player1_bottom_strip td").eq(player1.position).attr("class") === "banana") {
          player1BottomTrackBananaLogic();
        }
        // End inner banana peel logic
        $("#player1_bottom_strip td").eq(player1.position).removeClass();
        $("#player1_bottom_strip td").eq(player1.position).addClass("active");
      }
      // End speed boost logic
      else {
        $("#player1_bottom_strip td").eq(player1.position - 1).toggleClass("active");
        $("#player1_bottom_strip td").eq(player1.position).removeClass();
        $("#player1_bottom_strip td").eq(player1.position).addClass("active");
        if(player1.position === $("#player1_bottom_strip td").length - 1) {
          player1.win = true;
        }
      }
    }

      // Keypress s to move down for top player if they are on top track
      if (event.keyCode === 83 && $("#player1_top_strip td").eq(player1.position).attr("class") === "active"){
        $("#player1_top_strip td").eq(player1.position).toggleClass("active");
        $("#player1_bottom_strip td").eq(player1.position).removeClass();
        $("#player1_bottom_strip td").eq(player1.position).addClass("active");
      }

      // Keypress w to move up for top player if they are on bottom track
      if (event.keyCode === 87 && $("#player1_bottom_strip td").eq(player1.position).attr("class") === "active"){
        $("#player1_bottom_strip td").eq(player1.position).toggleClass("active");
        $("#player1_top_strip td").eq(player1.position).removeClass();
        $("#player1_top_strip td").eq(player1.position).addClass("active");
      }
    }

    function player2Movement() {
    // Keypress right arrow to move bottom player if they are on top track
    if (event.keyCode === 39 && $("#player2_top_strip td").eq(player2.position).attr("class") === "active"){
      player2.updatePlayerPosition();
      // Banana Peel Logic
      if ($("#player2_top_strip td").eq(player2.position).attr("class") === "banana") {
        player2TopTrackBananaLogic();
      }
      // End banana peel logic
      // Speed boost logic
      else if ($("#player2_top_strip td").eq(player2.position).attr("class") === "boost") {
        $("#player2_top_strip td").eq(player2.position).removeClass();
        $("#player2_top_strip td").eq(player2.position - 1).removeClass();
        player2.position = (player2.position + 2);
        // Inner banana peel logic
        if ($("#player2_top_strip td").eq(player2.position).attr("class") === "banana") {
        player2TopTrackBananaLogic();
        }
        // End inner banana peel logic
        $("#player2_top_strip td").eq(player2.position).removeClass();
        $("#player2_top_strip td").eq(player2.position).addClass("active");
      }
      // End speed boost logic
      else {
        $("#player2_top_strip td").eq(player2.position - 1).toggleClass("active");
        $("#player2_top_strip td").eq(player2.position).removeClass();
        $("#player2_top_strip td").eq(player2.position).addClass("active");
        if(player2.position === $("#player2_top_strip td").length - 1) {
          player2.win = true;
        }
      }
    }

      // Keypress right arrow to move bottom player if they are on bottom track
      if (event.keyCode === 39 && $("#player2_bottom_strip td").eq(player2.position).attr("class") === "active"){
        player2.updatePlayerPosition();
        // Banana Peel Logic
        if ($("#player2_bottom_strip td").eq(player2.position).attr("class") === "banana") {
          player2BottomTrackBananaLogic();
        }
        // End banana peel logic
        // Speed boost logic
        else if ($("#player2_bottom_strip td").eq(player2.position).attr("class") === "boost") {
          $("#player2_bottom_strip td").eq(player2.position).removeClass();
          $("#player2_bottom_strip td").eq(player2.position - 1).removeClass();
          player2.position = (player2.position + 2);
        // Inner banana peel logic
        if ($("#player2_bottom_strip td").eq(player2.position).attr("class") === "banana") {
          player2BottomTrackBananaLogic();
        }
        // End inner banana peel logic
        $("#player2_bottom_strip td").eq(player2.position).removeClass();
        $("#player2_bottom_strip td").eq(player2.position).addClass("active");
        }
        // End speed boost logic
        else {
          $("#player2_bottom_strip td").eq(player2.position - 1).toggleClass("active");
          $("#player2_bottom_strip td").eq(player2.position).removeClass();
          $("#player2_bottom_strip td").eq(player2.position).addClass("active");
          if(player2.position === $("#player2_bottom_strip td").length - 1) {
            player2.win = true;
          }
        }
      }

      // Keypress down arrow to move down for bottom player if they are on top track
      if (event.keyCode === 40 && $("#player2_top_strip td").eq(player2.position).attr("class") === "active"){
        $("#player2_top_strip td").eq(player2.position).toggleClass("active");
        $("#player2_bottom_strip td").eq(player2.position).removeClass();
        $("#player2_bottom_strip td").eq(player2.position).addClass("active");
      }

      // Keypress up arrow to move up for bottom player if they are on bottom track
      if (event.keyCode === 38 && $("#player2_bottom_strip td").eq(player2.position).attr("class") === "active"){
        $("#player2_bottom_strip td").eq(player2.position).toggleClass("active");
        $("#player2_top_strip td").eq(player2.position).removeClass();
        $("#player2_top_strip td").eq(player2.position).addClass("active");
      }
    }

    // =============================================


    // Checks on each keypress up if one of the players have won. If not, keep moving the characters.

    $(document).on('keyup', function(event) {
      if (player1.win !== true && player2.win !== true) {

        player1Movement();
        player2Movement();

        player1Win();
        player2Win();

      }

    });



  });
