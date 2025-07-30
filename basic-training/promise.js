// 使用 new Promise 建立一個新的 Promise 物件
// new Promise((resolve, reject) => { // `resolve` 和 `reject` 為慣用的函式參數名稱
//   setTimeout(() => {
//     let randomNumber = Math.random() * 10;
//     if (randomNumber < 5) {
//       resolve(`${randomNumber}，成功`);
//     } else {
//       reject(`${randomNumber}，失敗`);
//     }
//   }, 1000)
// }).then(result => { // 接著使用 .then 方法處理 Promise 成功時的結果
//   console.log(result);
// }).catch(err => { // 使用 .catch 方法捕捉 Promise 失敗時的錯誤，否則錯誤會被丟出來導致程式無法繼續執行
//   console.error(err);
// })

// 在 1 秒後，若 random 到 < 5，則印出 '成功'，反之則印出 '失敗'

// 使用 async/await 改寫上面例子 (暫未加上錯誤處理，因此若失敗時會噴錯)
// const randomGame = async () => {
//   const result = await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       let randomNumber = Math.random() * 10;
//       if (randomNumber < 5) {
//         resolve(`${randomNumber}，成功`);
//       } else {
//         reject(`${randomNumber}，失敗`);
//       }
//     }, 1000);
//   })
//   console.log(result);
// }
// randomGame();

const randomGameFull = async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        let randomNumber = Math.random() * 10;
        if (randomNumber < 5) {
          resolve(`${randomNumber}，成功`);
        } else {
          reject(`${randomNumber}，失敗`);
        }
      }, 1000);
    })
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}
randomGameFull();