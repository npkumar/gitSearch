var queryEndpoint = 'https://api.github.com/legacy/repos/search/';

function main() {

  $("#submit").click(function() {
    var query = $("#search").val();
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

      var list = $('<ul>').attr('id', 'resultlist');
      for (var i = 0; i < result.length; i++) {
        console.log(result[i].owner + '/' + result[i].name);

        //this element is to be clickable
        var listElement = $('<li>').attr('id', 'li_' + result[i].owner_name);

        var divElement = $('<div>');
        var h2Element = $('<h2>').text(result[i].owner + '/' + result[i].name);

        //content to be displayed
        var description = $('<h4>').text("Description: " + result[i].description);
        var url = $('<h4>').text("URL: " + result[i].url);
        var language = $('<h4>').text("Language: " + result[i].language);
        var followers = $('<h4>').text("Followers: " + result[i].followers);

        //this element is to be toggled
        var pElement = $('<p>').attr('id', result[i].owner_name).hide();
        pElement.append(description);
        pElement.append(url);
        pElement.append(language);
        pElement.append(followers);

        divElement.append(h2Element);
        divElement.append(pElement);
        listElement.append(divElement);
        list.append(listElement);

        $('#results').append(list);
      }

      //show or hide more details on clicking
      createDetails(result);
      
    } else {
      console.log('Failed to get data from Github.');
    }

  });
}

function createDetails(result) {
  for (var i = 0; i < result.length; i++) {
    (function(i) {
      $('#' + 'li_' + result[i].owner_name).click(function() {
        $('#' + result[i].owner_name).toggle();
      });
    })(i);
  }
}

$(document).ready(main);