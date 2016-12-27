const fs = require('fs');
const path = require('path');

let list = [{
	dir: '经管',
	file: '把时间当作朋友.md',
	content: `与众多书店的困惑一样，《把时间当作朋友（第3版）》在我看来的确难以将按常规的方法分门别类。 
		既非时间管理，亦非心灵励志，然而一见钟情，爱不释手，真知灼见，屡有醍醐灌顶之感！
		作者李笑来人生阅历丰富，或许正因为此，才有了如此平实近人的文字：比如"时间是不可能被管理的"，"深信积累的力量，时间就是你的朋友""所有学习上的成功，都只依靠两件事情--策略和坚持"，"与其不停地寻找‘更好的方法，还不如马上开始行动'"......字里行间，洋溢着一片挚爱之心。
		《把时间当作朋友（第3版）》以日常生活中人人都会遇到的问题为例，比如拖延症，比如没兴趣了，比如运气，比如学习......，透彻地分析了背后五花八门的根源，帮助读者更好地看清现实、分析自己，提升心智，并找到切实的解决办法。
		唯有认清现实，找对方向，不断努力、积累，才会真的有了希望。`
}, {
	dir: '经管',
	file: '细节:如何轻松影响他人.md',
	content: `《细节：如何轻松影响他人》世界百万级畅销书《影响力》作者罗伯特·西奥迪尼全新力作，现象级畅销书震撼上市，创造影响力及说服他人的52个技巧与实操训练，助你用最小的细节改变成就结果上很大的差异变化。职场法则、商业秘密、人际交往、个人提升，一本你只想自己读，生怕别人读的书
		•读完《细节》，你将在这个充满套路的世界中，轻松从细节处积极影响他人
		•这本书掰开揉碎教你的，全然不是大阴谋，而是一些小细节,这是一本公开发行的武林秘籍
		•一本令人惊奇、强大、具有深刻内涵的实用型人生工具书，细致地揭示了失败和成功之间存在着的细节差别`
}, {
	dir: '历史',
	file: '故宫日历:公历二〇一七年.md',
	content: `《故宫日历》采用布面精装、书脊包布、增加内封，以便使内页可以翻开摊平；布面用色是选定的象征故宫的红墙色，而封面则以烫金形式沿用了1937年 版日历封面所用的汉《史晨碑》集字书名“故宫日历”，并增加了以文物为基础设计、每年一换的生肖图标。精装书既适于持续的多次的翻阅，也具有珍藏价值。`
}];


// 定义生成文件的函数，返回 promise 实例
function createFile (detail) {
	return new Promise((resolve, reject) => {
		fs.writeFile(path.join(detail.dir, detail.file), detail.content, 'utf8', (err, res) => {
			if(err) reject(err);

			resolve(res);
		})
	})
}

// 定义生成文件夹的函数，返回 promise 实例
function createDir (dir) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			fs.mkdir(dir, (err, res) => {
				if(err) reject(err);
				resolve(res);
			})
		}, 2000);
	})
}

// 定义一个函数
function createbook (book) {
	return new Promise((resolve, reject) => {
		if(!fs.existsSync(book.dir)) {
			console.log(book.dir, '不存在，创建');
			createDir(book.dir)
				.then(res => {
					// 创建文件夹成功后，才能够创建文件
					console.log(book.dir, '创建成功', res);
					return createFile(book);
				})
				.catch(err => {
					// 创建文件夹没有成功
					reject(`${book.dir} 创建失败`);
				})
				.then(res => {
					console.log(`${book.file} 创建成功`)
					resolve(`${book.file} 创建成功`);
				})
				.catch(err => {
					console.log(`${book.file} 创建失败`);
					reject(`${book.file} 创建失败`);
				});
		} else {
			console.log(book.dir, '已经存在');
			createFile(book)
				.then(res => {
					console.log(`${book.file} 创建成功`);
					resolve(`${book.file} 创建成功`);
				})
				.catch(err => {
					console.log(`${book.file} 创建失败`);
					reject(`${book.file} 创建失败`);
				});
			}
	})
}

// 调用函数创建第一个元素
let ary = list.map(book => createbook(book));
console.log(ary);
Promise.all(ary)
	.then(res => {
		console.log(res);
	})
	.catch(err => {
		console.log(err);
	})