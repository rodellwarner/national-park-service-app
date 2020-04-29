"use strict"

const apiKey = 'IZRSfeiSSAC6Bc8UWrZ6Lv0i4zGRdlUQ9XiQBnOk'
const parksEndpoint = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}

function handleSubmit() {
  $('#form').submit(function() {
    event.preventDefault();
    getListOfParks();
  });
}

function getListOfParks() {
  let stateToSearch = $('#stateCode').val();
  let numberOfResults = $('#numberOfResults').val();

  const params = {
    stateCode: stateToSearch,
    limit: numberOfResults,
    api_key: apiKey 
  };

  const queryString = formatQueryParams(params)

  const url = parksEndpoint + '?' + queryString

  fetch(url, params)
    .then(response => response.json())
    .then(responseJson => showParkList(responseJson));
}

function showParkList(info) {
  console.log(info);
  const totalNumberOfParksInState = info.total;
  $('.results').empty();
  $('.results').removeClass('hidden');
  $('.results').append('<h2>The total number of national parks in ' + $('#stateCode').val() + ' is ' + info.total + '.<br>Here is a list of ' + $('#numberOfResults').val() + ' of them.</h2>');
  console.log('showParkList ran');
  for (let i = 0; i < info.data.length; i++) {
      $('.results').append('<p><b>' + info.data[i].fullName + '</b></p>', '<p>' + '<a href="' + info.data[i].url + '" target="_blank">' + info.data[i].url + '</a>' + '</p>' + '<p>' + info.data[i].description + '</p><br>');
  }
}

function handleSearchNationalParkService() {
  handleSubmit();
}

$(handleSearchNationalParkService);