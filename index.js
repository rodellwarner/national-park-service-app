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
  console.log('The total number of parks in ' + $('#stateCode').val() + ' is ' + info.total);
  $('.results').empty();
  $('.results').removeClass('hidden')
  $('.results').append('The total number of parks in ' + $('#stateCode').val() + ' is ' + info.total);
  console.log('showParkList ran');
}

function handleSearchNationalParkService() {
  handleSubmit();
}

$(handleSearchNationalParkService);