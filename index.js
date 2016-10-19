'use strict';
var req = require('request');

var searchByAuthor = 'http://127.0.0.1:3000/record?author=';
var searchByBookName = 'http://127.0.0.1:3000/record?title=';
var searchByNumber = 'http://127.0.0.1:3000/record?number=';
var searchByName = 'http://127.0.0.1:3000/record?name=';

var query = encodeURI('hello');


function temp(params) {
  return new Promise(function (resolve, reject) {
    req(params, function (err, response, body) {
      if(err) {
        reject(err);
      }
      resolve(JSON.parse(body));
    })
  })
}
async function search() {
  var result = null;

  result = await temp(searchByAuthor+query);
  result = result.length === 0 ? await temp(searchByBookName+query) : result;
  result = result.length === 0 ? await temp(searchByNumber+query) : result;
  result = result.length === 0 ? await temp(searchByName+query) : result;

  console.log(result);
}

search();
