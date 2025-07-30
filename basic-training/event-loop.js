// setTimeout 第一個參數為回呼函式，第二個參數為時間 (豪秒)
setTimeout(() => {
  console.log('hi');
}, 500) // 500 豪秒後印出 'hi'

setInterval(() => {
  console.log('haha');
}, 800)
// 每隔 800 豪秒印出 'haha'

// 取消計時器
const t = setInterval(() => {
  console.log('1 second passed...')
}, 1000)

clearInterval(t); // 當執行到這裡時即會停止計時器