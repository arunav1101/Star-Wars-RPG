function randomnumber(min, max) {
  return (Math.floor(Math.random() * (max - min + 1) + min))
}
var characterType = [{
    name: 'Ackbar',
    image: "assets/images/AckbarStanding.jpg",
    value: 100,
    power: 12
  },
  {
    name: 'Greedo',
    image: "assets/images/GreedoStarWars.jpg",
    value: 50,
    power: 5
  },
  {
    name: 'Mace',
    image: "assets/images/Mace_Windu.png",
    value: 150,
    power: 8
  },
  {
    name: 'K-250',
    image: "assets/images/star-warsk250.jpg",
    value: 110,
    power: 25
  }
]

var targetNumber;
var imageCharacter;
var counter = mywins = mylooses = winner = looser = lastScore = 0;
var self_player_value = defender_value = self_player_power = defender_power = 0;

self_player_power = 6;

function startGame() {
  counter = 0;
  targetNumber = randomnumber(19, 120);
  resetCharacterValues();
}

function resetCharacterValues() {
  for (var i = 0; i < characterType.length; i++) {
    let valueCheck = randomnumber(1, 12);
    $('img[character-name~=' + characterType[i].name + ']').attr("data-charactervalue", valueCheck);
  }
}


function removeDefender() {
  $('.defender').remove();
  $('.playerDefender').append("<div class = defender></div>");
}
$(document).ready(function () {
  $.each(characterType, function (key, characterName) {
    $("#characters").append(
      `<div class = "container ${characterName.name}" total-value= ${characterName.value} player-name =${characterName.name} power-value = ${characterName.power}><img src= ${characterName.image} class = "character-image column" character-name = ${characterName.name} data-charvalue= ${characterName.value} power-value = ${characterName.power}></img><div class= overlay>${characterName.name}</br>${characterName.value}</div></div>`
    );
  })
  startGame();

  $(".container").on("click", function () {
    self_player_value = $(this).attr("total-value");
    $(this).removeClass("container").addClass('character-self');
    var myDiv = $(this).remove();
    myDiv.appendTo('.mycharacter');
    var defenders = $("#characters").remove();
    defenders.appendTo('.enemies');
    $('.container').removeClass("container").addClass('newenemies');
  })

  $(document.body).on("click", ".enemies .newenemies", function () {
    if ((($('.defender .defender-player').length) < 1) && looser === 0) {
      defender_value = $(this).attr("total-value")
      defender_power = $(this).attr("power-value")
      $(this).removeClass("newenemies").addClass('defender-player');
      var mynewDiv = $(this).remove();
      mynewDiv.appendTo('.defender');
      mywins = mylooses = 0
    } else {
      return;
    }
  });

  $('#Attack').on("click", function () {
    if ($('.defender .defender-player')[0]) {
      if (mywins > 0 || mylooses > 0) {
        removeDefender();
        return;
      } else {
        self_player_value -= defender_power;
        defender_value -= self_player_power;

        if (defender_value <= 0) {
          winner += 1;
          mywins++;
          removeDefender();
          if (winner === 3) {
            $('#results-text').text("Awesome! You Won!!!")
          }
        } else if (self_player_value <= 0) {
          looser += 1;
          mylooses++;
          $('#results-text').text("You loose!!!")
          removeDefender();
          return;
        }
        $('.mycharacter .overlay').html($('.character-self').attr("player-name") + '<br/>' + self_player_value);
        $('.defender-player .overlay').html($('.defender-player').attr("player-name") + '<br/>' + defender_value);
        self_player_power += 6;
      }
    } else {
      return;
    }
  })
})