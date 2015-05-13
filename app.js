var queryEndpoint = 'https://api.github.com/legacy/repos/search/';

function main() {

  $("#submit").click(function() {
    var query = $("#search").val();
    console.log(query)
    getRepoData(query);
  });
  
}

function getRepoData(query) {

  $.get(queryEndpoint + query, function(data, status) {
    var result = [];
    if (status == 'success') {
      var raw = data.repositories;
      for (var i = 0; i < raw.length; i++) {
        var temp = {};
        temp.name = raw[i].name;
        temp.owner = raw[i].owner;
        temp.owner_name = raw[i].owner + raw[i].name;
        temp.followers = raw[i].followers;
        temp.url = raw[i].url;
        temp.description = raw[i].description;
        temp.language = raw[i].language;
        result.push(temp);
      }

      console.log(result);

    } else {
      console.log('Failed to get data from Github.');
    }

  });
}

$(document).ready(main);