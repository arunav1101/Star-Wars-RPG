
function randomnumber(min, max) {
    return (Math.floor(Math.random() * (max - min + 1) + min))
}
var crystalType = [{
        name: 'Ackbar',
        image: "assets/images/AckbarStanding.jpg",
        value: 100,
        power: 12
    },
    {
        name: 'Greedo',
        image: "assets/images/GreedoStarWars.jpg",
        value: 120,
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
var imageCrystal;
var counter = mywins = mylooses = winner = looser = lastScore = 0;
var self_player_value = defender_value = self_player_power = defender_power = 0;
console.log("top", mywins);

self_player_power = 6;

function startGame() {
    counter = 0;
    targetNumber = randomnumber(19, 120);
    displayScreen();
    resetCrystalValues();
}

function resetCrystalValues() {
    for (var i = 0; i < crystalType.length; i++) {
        let valueCheck = randomnumber(1, 12);
        $('img[crystal-name~=' + crystalType[i].name + ']').attr("data-crystalvalue", valueCheck);
    }
}

function displayScreen() {
    $("#wins-text").text(winner);
    $("#losses-text").text(looser);
}

function removeDefender() {
    $('.defender').remove();
    $('.myclasses').append("<div class = defender></div>");
}
$(document).ready(function () {
    $.each(crystalType, function (key, crystalName) {
        $("#crystals").append(
            `<div class = "container ${crystalName.name}" total-value= ${crystalName.value} player-name =${crystalName.name} power-value = ${crystalName.power}><img src= ${crystalName.image} class = "crystal-image column" crystal-name = ${crystalName.name} data-charvalue= ${crystalName.value} power-value = ${crystalName.power}></img><div class= overlay>${crystalName.name}</br>${crystalName.value}</div></div>`
        );
    })
    startGame();

    $(".container").on("click", function () {
        self_player_value = $(this).attr("total-value");
        $(this).removeClass("container").addClass('character-self');
        var myDiv = $(this).remove();
        myDiv.appendTo('.mycharacter');
        var defenders = $("#crystals").remove();
        defenders.appendTo('.enemies');
        $('.container').removeClass("container").addClass('newenemies');
    })

    $(document.body).on("click", ".enemies .newenemies", function () {

        defender_value = $(this).attr("total-value")
        defender_power = $(this).attr("power-value")
        $(this).removeClass("newenemies").addClass('defender-player');
        var mynewDiv = $(this).remove();
        mynewDiv.appendTo('.defender');
        mywins = mylooses = 0
    });

    $('#Attack').on("click", function () {
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
            } else if (self_player_value <= 0) {
                looser += 1;
                mylooses++;
                console.log("Losses:", mylooses);
                removeDefender();
            }
            // console.log("After",
            //     self_player_value,
            //     self_player_power,
            //     defender_value,
            //     defender_power,
            // );

        $('.mycharacter .overlay').html($('.character-self').attr("player-name") + '<br/>' + self_player_value);
        $('.defender-player .overlay').html($('.defender-player').attr("player-name") + '<br/>' + defender_value);
          
        self_player_power += 6;
        }
        displayScreen();
    })

})