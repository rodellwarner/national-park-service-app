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
    $('.results').empty();
    getListOfParks();
  });
}

function getListOfParks() {
  let stateToSearch = $('#stateCode').val();
  let numberOfResults = $('#numberOfResults').val();
  console.log('Searching in ' + stateToSearch);
  console.log('Number of results to fetch = ' + numberOfResults);

  const params = {
    stateCode: stateToSearch,
    limit: numberOfResults,
    api_key: apiKey 
  };

  const queryString = formatQueryParams(params)
  console.log('queryString is ' + queryString);

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
  // console.log(info.data.length);
  // console.log(info.data[0].fullName, info.data[0].description, info.data[0].url);
  // console.log(info.data[1].fullName, info.data[1].description, info.data[1].url);

  for (let i = 0; i < info.data.length; i++) {
      console.log(info.data[i].fullName, info.data[i].url);
      $('.results').append('<p><b>' + info.data[i].fullName + '</b></p>', '<p>' + '<a href="' + info.data[i].url + '" target="_blank">' + info.data[i].url + '</a>' + '</p><br>');
  }
}

function handleSearchNationalParkService() {
  handleSubmit();
}

$(handleSearchNationalParkService);