// 测试 json-server 

// 请求库
const fetch = require('isomorphic-fetch')
const note = {
	title: '笔记1',
	notebook: '笔记本1'
}

// fetch('http://127.0.0.1:3000/record')
// 	.then(res => {
// 		return res.json()
// 	})
// 	.then(json => {
// 		console.log(json)
// 	})
// 	.catch(err => {
// 		console.log(err)
// 	})

fetch('http://127.0.0.1:3000/notes', {
	method: 'POST',
	body: JSON.stringify(note)
})
	.then(response => {
		return response.json()
	})
	.then(json => {
		console.log(json)
	})
	.catch(err => {
		console.log(err)
	})