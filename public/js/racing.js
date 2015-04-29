// $(document).ready(function() {

//   var Player = function(name) {
//     this.name = name;
//     this.position = 0;
//     this.winner = false;
//   };

//   Player.prototype.updatePlayerPosition = function() {
//     this.position++;
//   };

//   Player.prototype.winner = function() {
//     self.winner = true;
//   };

//   function player1Win() {
//     if (player1.winner === true) {
//         $("h1").eq(0).html("Game is over! " + player1.name + " has won!");
//         $("#restart_game_button").show();
//       }
//   }

//   function player2Win() {
//     if (player2.winner === true){
//         $("h1").eq(0).html("Game is over! " + player2.name + " has won!");
//         $("#restart_game_button").show();
//       }
//   }

//   function player1Movement() {
//     // Keypress d to move right for top player if they are on top track
//       if (event.keyCode === 68 && $("#player1_top_strip td").eq(player1.position).attr("class") === "active"){
//         player1.updatePlayerPosition();
//         $("#player1_top_strip td").eq(player1.position - 1).removeClass("active");
//         $("#player1_top_strip td").eq(player1.position).addClass("active");
//         if(player1.position === $("#player1_top_strip td").length - 1) {
//           player1.winner = true;
//         }
//       }

//       // Keypress d to move right for top player if they are on bottom track
//       if (event.keyCode === 68 && $("#player1_bottom_strip td").eq(player1.position).attr("class") === "active"){
//         player1.updatePlayerPosition();
//         $("#player1_bottom_strip td").eq(player1.position - 1).removeClass("active");
//         $("#player1_bottom_strip td").eq(player1.position).addClass("active");
//         if(player1.position === $("#player1_bottom_strip td").length - 1) {
//           player1.winner = true;
//         }
//       }

//       // Keypress s to move down for top player if they are on top track
//       if (event.keyCode === 83 && $("#player1_top_strip td").eq(player1.position).attr("class") === "active"){
//         $("#player1_top_strip td").eq(player1.position).removeClass("active");
//         $("#player1_bottom_strip td").eq(player1.position).addClass("active");
//       }

//       // Keypress w to move up for top player if they are on bottom track
//       if (event.keyCode === 87 && $("#player1_bottom_strip td").eq(player1.position).attr("class") === "active"){
//         $("#player1_bottom_strip td").eq(player1.position).removeClass("active");
//         $("#player1_top_strip td").eq(player1.position).addClass("active");
//       }
//   }

//   function player2Movement() {
//     // Keypress right arrow to move bottom player if they are on top track
//       if (event.keyCode === 39 && $("#player2_top_strip td").eq(player2.position).attr("class") === "active"){
//         player2.updatePlayerPosition();
//         $("#player2_top_strip td").eq(player2.position - 1).removeClass("active");
//         $("#player2_top_strip td").eq(player2.position).addClass("active");
//         if(player2.position === $("#player2_top_strip td").length - 1) {
//           player2.winner = true;
//         }
//       }

//       // Keypress right arrow to move bottom player if they are on bottom track
//       if (event.keyCode === 39 && $("#player2_bottom_strip td").eq(player2.position).attr("class") === "active"){
//         player2.updatePlayerPosition();
//         $("#player2_bottom_strip td").eq(player2.position - 1).removeClass("active");
//         $("#player2_bottom_strip td").eq(player2.position).addClass("active");
//         if(player2.position === $("#player2_bottom_strip td").length - 1) {
//           player2.winner = true;
//         }
//       }

//       // Keypress down arrow to move down for bottom player if they are on top track
//       if (event.keyCode === 40 && $("#player2_top_strip td").eq(player2.position).attr("class") === "active"){
//         $("#player2_top_strip td").eq(player2.position).removeClass("active");
//         $("#player2_bottom_strip td").eq(player2.position).addClass("active");
//       }

//       // Keypress up arrow to move up for bottom player if they are on bottom track
//       if (event.keyCode === 38 && $("#player2_bottom_strip td").eq(player2.position).attr("class") === "active"){
//         $("#player2_bottom_strip td").eq(player2.position).removeClass("active");
//         $("#player2_top_strip td").eq(player2.position).addClass("active");
//       }
//   }


//   $(document).on('keyup', function(event) {
//     if (player1.winner !== true && player2.winner !== true) {

//       player1Movement();
//       player2Movement();

//       player1Win();
//       player2Win();

//     }

//   });


// var player1 = new Player("Kevin");
// var player2 = new Player("Miriam");

// });

// function restartGame() {
//   alert('The page will now refresh');
//   location.reload();
//   // $("button").click(function(){
//   //   $("div").animate({height:"toggle"});
//   //   $("#player1_top_strip td:last-child").removeClass("active");
//   //   $("#player1_bottom_strip td:last-child").removeClass("active");
//   //   $("#player2_top_strip td:last-child").removeClass("active");
//   //   $("#player2_bottom_strip td:last-child").removeClass("active")
//   // });
// }

