var req = require('request');

var searchByAuthor = 'http://127.0.0.1:3000/record?author=';
var searchByBookName = 'http://127.0.0.1:3000/record?title=';
var searchByNumber = 'http://127.0.0.1:3000/record?number=';
var searchByName = 'http://127.0.0.1:3000/record?name=';

var query = encodeURI('学号三');


function run(generatorFunction, cb) {
  var generatorltr = generatorFunction(resume);

  function resume(err, response, body) {
    // if(JSON.parse(body).length === 0) {
    //   // 没有成功获取数据
    //   generatorltr.next(body);
    // }else {
    //   // 如果获取到数据了，就可以了，不用向下运行了
    //   //generatorltr.next(body);
    //   // 这里不能 next
    //   cb(body);
    // }
    generatorltr.next(JSON.parse(body));
  }
  // 这是用来启动函数的
  //console.log(generatorltr.next());// 这个时候就有返回值了
  var ary = generatorltr.next();
}

run(function *search(resume) {
  // 代码执行碰到 yield 关键字，不会继续向下运行，这就杜绝了先打印变量，再成功取到值的问题。
  // req 函数仍在执行，该函数底部肯定是调用回调，当调用回调时，就会调用 generatorltr.next() 方法
  // 调用该方法会接触暂停，又开始向下执行。
  var result = null;
  result = yield req(searchByAuthor+query, resume);
  result = result.length === 0 ? yield req(searchByBookName+query, resume) : result;
  result = result.length === 0 ? yield req(searchByNumber+query, resume) : result;
  result = result.length === 0 ? yield req(searchByName+query, resume) : result;


  console.log(result);
  // yield req(searchbybookname+query, resume)
  // console.log('按照书名查询没查询到');

  // yield req(searchbynumber+query, resume)
  // console.log('按照学号查询没查询到');

  // yield req(searchbyname+query, resume)
  // console.log('按照姓名查询没查询到');
  //var result = yield [req(searchByAuthor+query), req(searchbybookname+query), req(searchbynumber+query), req(searchbyname+query)];


})

// 在调用 next 方法时，就会有返回值，返回值为 yield 关键字后面的表达式的值。