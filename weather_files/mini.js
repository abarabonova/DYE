var wind = 0;
var input = document.getElementById("getZip");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("submitButton").click();
  }
});

function gettingJSON() {
  var zipCode = $("#getZip").val();
  var owString =
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
    zipCode +
    ",ru&APPID=52b702366f2a88c96ebc4dac25ca589f";
  console.log(owString);

  $.getJSON(owString, function (json) {
    var string = JSON.stringify(json);
    var data = JSON.parse(string);
    var temp = data.main.temp;
    var name = data.name;
    var humidity = data.main.humidity;
    var cordLong = data.coord.lon;
    var cordLat = data.coord.lat;
    var clouds = data.clouds.all;
    wind = data.wind.speed;
    $(".name").text(name);
    var celsius = Math.floor(temp) -273;
    $(".temp").text("Температура " + celsius + "ºC, ");
    document.title = Math.floor(celsius) + "ºC";
    $(".wind").text("ветер " + wind + " км/ч, влажность около");
    $(".humid").text(humidity + "%");

    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    d.length == 1 && (d = "0" + d);
    m.length == 1 && (m = "0" + m);
    var yyyymmdd = d + "/" + m + "/" + y;

    var t = x.toLocaleTimeString();
    document.getElementById("time").innerHTML = yyyymmdd + " " + t;

    var hsl1 = "hsl(" + celsius * humidity * 100 + "," + humidity + "%, 70%)";
    var hsl2 = "hsl(" + cordLong * cordLat + "," + cordLat + 10 + "%, 80%)";
    var hsl3 = "hsl(" + 187 + "," + (100 - clouds * 5) + "%," + 60 + "%)";

    var gradient =
      "linear-gradient(to right, " +
      hsl1 +
      "," +
      hsl1 +
      "," +
      hsl2 +
      "," +
      hsl3 +
      "," +
      hsl1 +
      "," +
      hsl1 +
      ")";
    console.log(gradient);
    $("body").css("background-image", gradient);
  });
  $('.startPage').css('display', 'none');
}
gettingJSON();


var number = 0;
var start = null;
var stop = false;

$(document).click(function () {});
function step(timestamp) {
  var progress = timestamp - start;
  document.getElementsByTagName("BODY")[0].style.backgroundPosition =
    number + "px " + 0 + "px";
  if (stop === false) {
    number -= wind / 5;
  }
  window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);
