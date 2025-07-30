// var 的提升
console.log(a); // undefined
var a = 5;
console.log(a); // 5

var a;
console.log(a);
a = 5;
console.log(a);

// 由於提升的特性，使得在宣告前就可以先呼叫函式
hoisting1();

function hoisting1() {
  console.log('ok');
}

// 使用 let 與 const 宣告
// console.log(b); // ReferenceError: Cannot access 'b' before initialization
// let b = 10;
//
// console.log(c); // ReferenceError: Cannot access 'c' before initialization
// const c = 12;

// 函式表達式，無法在宣告前呼叫
hoisting2(); // hoisting2 is not a function (因為 var 宣告僅有提升宣告，初始化為 undefined)

var hoisting2 = function () {
  console.log('no');
};

// 箭頭函式也屬於函式表達式，因此一樣不能在宣告前呼叫
hoisting3(); // ReferenceError: Cannot access 'hoisting3' before initialization
const hoisting3 = () => {
  console.log('no');
};
