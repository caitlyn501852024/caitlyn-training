// 建立陣列：宣告變數並用 [] 將陣列內容括起來，每個元素中間使用 , 分隔。
const arr1 = [0, 4, 6, 50, 99];
const arr2 = ['Mike', 'Tim', 'Vicky'];
const arr3 = ['cat', 22, 5, 'hello'];

console.log('arr1', arr1); // [0, 4, 6, 50, 99]
console.log('arr2', arr2); // ['Mike', 'Tim', 'Vicky']
console.log('arr3', arr3); // ['cat', 22, 5, 'hello']

// 使用 new Array() 建立陣列
const arr4 = new Array(); // [] 空陣列
const arr5 = new Array(3); // 陣列長度為 3，內容為 3 個 undefined 空元素
const arr6 = new Array(3).fill(1); // [1, 1, 1]，陣列長度為 3
const arr7 = new Array(1, 2, 3); // [1, 2, 3]，陣列長度為 3

console.log('arr4', arr4); // []
console.log('arr5', arr5); // [<3 empty items>]
console.log('arr6', arr6); // [1, 1, 1]
console.log('arr7', arr7); // [1, 2, 3]

// 陣列的常見方法
// Array.push()：從陣列的尾端加入元素值，會改動到原本陣列。
const arr8 = [1, 7, 16, 25, 65];
arr8.push(37);
console.log('arr8', arr8); // [1, 7, 16, 25, 65, 37]

// Array.pop()`：從陣列的尾端取出元素值，會改動到原本陣列。
const arr9 = [3, 97, 20, 10];
arr9.pop();
console.log('arr9', arr9); // [3, 97, 20]

// Array.shift()`：從陣列的最前端取出元素值，會改動到原本陣列。
const arr10 = [41, 25, 63, 10, 5];
arr10.shift();
console.log('arr10', arr10); // [25, 63, 10, 5]

// Array.unshift()`：從陣列的最前端加入元素值，會改動到原本陣列。
const arr11 = [23, 34, 12, 76];
arr11.unshift(99);
console.log('arr11', arr11); // [99, 23, 34, 12, 76]

// Array.concat()`：串接陣列，並建立一個新的陣列，不會改動到原本陣列。
const arr12 = arr10.concat(arr11);
console.log('arr12', arr12); // [25, 63, 10, 5, 99, 23, 34, 12, 76]

// Array.join([黏著符號])`：以可自訂的黏著符號串接成字串，不會改動到原本陣列。
const arr13 = ['it', 'is', 'hot', 'today'];
const str = arr13.join('?');
console.log('str', str); // 'it?is?hot?today'

// Array.slice(索引 a, 索引 b)`：複製一個從索引 a 開始到索引 b 前的陣列（含 a 不含 b），不會改動到原本陣列。
const arr14 = [3, 8, 11, 65, 10, 45, 65];
const arr15 = arr14.slice(2, 5);
console.log('arr14', arr14); // [3, 8, 11, 65, 10, 45, 65]
console.log('arr15', arr15); // [11, 65, 10]

// Array.splice(索引位置, 數量, [加入元素])`：可以在指定的索引位置刪除和加入元素，會改動到原本陣列。
const arr16 = [1, 2, 3, 4, 5, 6, 7, 8];
arr16.splice(3, 3, 99);
console.log('arr16', arr16); // [1, 2, 3, 99, 7, 8]

// Array.map()`
const arr17 = [1, 2, 3, 4, 5];
const arr18 = arr17.map(function (n) {
  return n + 3;
})
console.log('arr18', arr18); // [4, 5, 6, 7, 8]

// 也可使用箭頭函式簡化寫法
const arr19 = arr17.map(n => n * 2);
console.log('arr19', arr19); // [2, 4, 6, 8, 10]

// Array.filter()`
const arr20 = arr17.filter(function (n) {
  return n <= 3;
})
console.log('arr20', arr20); // [1, 2, 3]

// 一樣可以使用箭頭函式簡化寫法
const arr21 = arr17.filter(n => n > 3);
console.log('arr21', arr21); // [4, 5]

// Array.sort()`
const arr22 = [22, 3, 15, 9, 67, 34, 55];
arr22.sort();
console.log('arr22', arr22); // [15, 22, 3, 34, 55, 67, 9]

// 使用自訂排序：給 a 和 b 兩個參數，若函式執行結果回傳 > 0，則將 b 往前移；若 < 0 則將 a 往前移，若 = 0 則不動。
// 正序排列
const arr23 = [22, 3, 15, 9, 67, 34, 55];
arr23.sort((a, b) => a - b);
console.log('arr23', arr23); // [3, 9, 15, 22, 34, 55, 67]
// 反序排列
const arr24 = [22, 3, 15, 9, 67, 34, 55];
arr24.sort((a, b) => b - a);
console.log('arr24', arr24); // [67, 55, 34, 22, 15, 9, 3]

// 解構賦值
// 基本的解構賦值，變數與資料數量相同
const arr25 = ['Mark', 'David', 'Cindy', 'Leo', 'Mary'];
const [p1, p2, p3, p4, p5] = arr25;
console.log(p1, p2, p3, p4, p5); // p1 = 'Mark', p2 = 'David', p3 = 'Cindy', p4 = 'Leo', p5 = 'Mary'

// 變數與資料數量不同
const arr26 = ['Andy', 'John'];
const [p6, p7, p8] = arr26;
const [p9] = arr26;

console.log(p6, p7, p8); // p6 = 'Andy', p7 = 'John', p8 = undefined
console.log(p9); // 'Andy'

// 延伸：其餘運算子
const [a, ...b] = [1, 2, 3]
console.log(a, b); // a = 1, b = [2, 3]

// 延伸：交換變數
let c = 1;
let d = 2;
[c, d] = [d, c];
console.log(c, d); // c = 2, d = 1

