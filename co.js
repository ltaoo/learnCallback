'use strict';
var co = require('co');
var req = require('request');

var searchByAuthor = 'http://127.0.0.1:3000/record?author=';
var searchByBookName = 'http://127.0.0.1:3000/record?title=';
var searchByNumber = 'http://127.0.0.1:3000/record?number=';
var searchByName = 'http://127.0.0.1:3000/record?name=';

var query = encodeURI('hello');

function get(url) {
  return function(done) {
    req(url, function(err, res, body) {
      // 这里 done 函数传入的参数有要求
      done(err, JSON.parse(body));
    })
  }
}

co(function*() {
  var result = null;
  try{
    result = yield get(searchByAuthor+query);
    // get() 函数会返回一个函数，所以在 co 的流程中是走
    /*
      function thunkToPromise(fn) {
        var ctx = this;
        return new Promise(function (resolve, reject) {
          fn.call(ctx, function (err, res) {
            if (err) return reject(err);
            if (arguments.length > 2) res = slice.call(arguments, 1);
            resolve(res);
          });
        });
      }
    */
    // 可以看到，返回一个 promise 对象，调用这个函数
  }catch(err) {
    console.log(err);
  }
  result = result.length === 0 ? yield get(searchByBookName+query) : result;
  result = result.length === 0 ? yield get(searchByNumber+query) : result;
  result = result.length === 0 ? yield get(searchByName+query) : result;

  console.log(result);
});
