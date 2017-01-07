// 请求库
const fetch = require('isomorphic-fetch')
// 将对象作为数据库处理的一个库
const lowdb = require('lowdb')

// 同步判断笔记本是否存在
function existsSync(id) {
	const db = lowdb('./db.json')
	return db.get('notebooks').find({id}).value()
}

// 创建笔记本函数
function createNotebook(notebook) {
	return new Promise((resolve, reject) => {
		fetch('http://127.0.0.1:3000/notebooks', {
			method: 'POST',
			body: JSON.stringify(notebook)
		})
			.then(res => res.json())
			.then(json => {
				resolve(json)
			})
			.catch(err => {
				reject(err)
			})
	})
}

// 创建笔记函数
function createNote(note) {
	return new Promise((resolve, reject) => {
		fetch('http://127.0.0.1:3000/notes', {
			method: 'POST',
			body: JSON.stringify(note)
		})
			.then(res => res.json())
			.then(json => {
				resolve(json)
			})
			.catch(err => {
				reject(err)
			})
	})
}

const noteAry = [{
	title: 'note1',
	notebook: 1
}, {
	title: 'note2',
	notebook: 1
}, {
	title: 'note3',
	notebook: 2
}]

// 先使用 promise 
function realCreateNote(note) {
	return new Promise((resolve, reject) => {
		if(!existsSync(note.notebook)) {
			console.log(`笔记本${note.notebook}不存在，先创建笔记本`)
			// 如果笔记本不存在
			createNotebook(note.notebook)
				.then(res => {
					console.log(`笔记本${note.notebook}创建成功`)
					return createNote(note)
				})
				.then(res => {
					console.log(`笔记${note.title}创建成功`)
					resolve(note.title)
				})
				.catch(err => {
					console.log(err)
					reject(err)
				})
		} else {
			console.log(`笔记本${note.notebook}已经存在，直接创建笔记`)
			createNote(note)
				.then(res => {
					console.log(`笔记${note.title}创建成功`)
					resolve(note.title)
				})
				.catch(err => {
					console.log(err)
					reject(err)
				})
		}
	})
}

function main() {
	// 临时变量
	let promise = Promise.resolve()
	noteAry.forEach(note => {
		promise = promise.then(() => realCreateNote(note))
	})

	return promise
}

main().then(() => {
	console.log('笔记均创建完成')
}).catch(err => {
	console.error(err)
})
