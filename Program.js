const anime = require('./anime.min.js')

function draw()
{
    var Meow = 50;

    $("#MeowValue").css("width", String((85 / 100) * Meow) + "%");
    $("#MeowPercentage").html(String(Meow) + "%");
}