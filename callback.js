var req = require('request');

var searchByAuthor = 'http://127.0.0.1:3000/record?author=';
var searchByBookName = 'http://127.0.0.1:3000/record?title=';
var searchByNumber = 'http://127.0.0.1:3000/record?number=';
var searchByName = 'http://127.0.0.1:3000/record?name=';

var query = encodeURI('hello');


function search(params, cb) {
  req(searchByAuthor+params, function (err, response, body) {
    console.log('按照作者名查询');
    if(JSON.parse(body).length !== 0) {
      cb(body)
    }else {
      req(searchByBookName+params, function (err, response, body) {
        console.log('按照书名查询');
        if(JSON.parse(body).length !== 0) {
          cb(body)
        }else {
          req(searchByNumber+params, function (err, response, body) {
            console.log('按照学号查询');
            if(JSON.parse(body).length !== 0) {
              cb(body)
            }else {
              req(searchByName+params, function(err, response, body) {
                console.log('按照姓名查询');
                if(JSON.parse(body).length !== 0) {
                  cb(body)
                }else {
                  cb('empty')
                }
              })
            }
          })
        }
      })
    }
  })
}

search(query, function (result) {
  console.log(result);
})
