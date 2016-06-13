// window.onload = function(){
  // var url = "http://www.omdb.com/?t=batman";
  // var request = new XMLHttpRequest();

  // request.open("GET", url);

  // request.onload = function(){
  //   if(request.status === 200){
  //     var jsonString = request.responseText;
  //     var movies = JSON.parse(jsonString);
      // chart();
      // main();
    // };
  // };
  // request.send(null);
// };

// function chart(){
//   new PieChart();
//   new BarChart();
// }
//Search function (Harry) passes text caught in main through to
//omdb s parameter
function search(searchtext, callback){
  var url = "http://www.omdbapi.com/?s=" + searchtext;
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function() {
    if (request.status === 200) {
      var jsonString = request.responseText;
      var result = JSON.parse(jsonString);
      console.log(result);
      callback(result.Search);
    }
  }.bind(this);
  request.send(null);
}
//search text box
var main = function() {
  document.getElementById("search").onkeyup =
  function(e){
    console.log(e.target.value);
    search(e.target.value, handleMovies);
  };
  // handleMovies(movies);
};

function handleMovies(movies){
  var dropDown = document.getElementById("drop-down");
  dropDown.onchange = function(event){
    var dropDown = event.target;
    var index = dropDown.options[dropDown.selectedIndex].value;
    console.log(movies[index]);
    showDetails(movies[index]);
  };

  for (var i = 0; i < movies.length; i++) {
    var option = document.createElement("option");
    option.innerText = movies[i].Title;
    option.value = i;
    dropDown.appendChild(option);
  }
}

function showDetails(movie){
  var title = document.getElementById("movie-title");
  var type = document.getElementById("movie-type");
  var year = document.getElementById("movie-year");
  var imdbId = document.getElementById("movie-imdb");
  title.innerText = "Title: " + movie.Title;
  type.innerText = "Type: " + movie.Type;
  year.innerText = "Year: " + movie.Year;
  imdbId.innerText = "imdb ID " + movie.imdbID;
}

window.onload = main;
