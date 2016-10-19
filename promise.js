var req = require('request');

var searchByAuthor = 'http://127.0.0.1:3000/record?author=';
var searchByBookName = 'http://127.0.0.1:3000/record?title=';
var searchByNumber = 'http://127.0.0.1:3000/record?number=';
var searchByName = 'http://127.0.0.1:3000/record?name=';

var query = encodeURI('hello');


function search(param, cb) {

  function temp(params) {
    return new Promise(function (resolve, reject) {
      req(params, function (err, response, body) {
        if(err) {
          reject(err);
        }
        if(JSON.parse(body).length !== 0) {
          resolve(body);
        }else {
          reject('empty');
        }
      })
    })
  }

  temp(searchByAuthor+param)
    .then(function (result){
      console.log('按照作者名查询');
      cb(result);
    })
    .catch(function (err) {
      return temp(searchByBookName+param);
    })
    .then(function(result) {
      console.log('按照书名查询');
      cb(result);
    })
    .catch(function (err) {
      return temp(searchByNumber+param);
    })
    .then(function (result) {
      console.log('按照学号查询');
      console.log(reuslt);
    })
    .catch(function (err) {
      return temp(searchByName+param);
    })
    .then(function (result) {
      console.log('按照姓名查询');
      cb(result);
    })
    .catch(function(err) {
      cb('empty');
    })
}

search(query, function (res) {
  console.log(res);
})