// 宣告函式
function f1() {
  alert('This is a function declaration');
}

// 函式表達式
const f2 = function () {
  alert('This is a function expression');
}

// 箭頭函式的宣告
const f3 = (a, b) => {
  alert('This is an arrow function');
}

// 如果只有一個參數，則可以省略參數的 ()，也可以不省略
const f4 = c => {
  console.log(c);
}

// 如果沒有參數，則一定要加上 ()，不可省略
const f5 = () => {
  // do something
}

// 如果程式碼區塊只有簡單一行表達式，可以省略 {} 及 return
const f6 = d => d * d;

// 一般函式與箭頭函式的 this 指向
const obj1 = {
  value: 42,
  normalFn: function () {
    console.log(this.value);
  },
  arrowFn: () => {
    console.log(this.value);
  }
};

// 呼叫函式查看 this 的結果
obj1.normalFn(); // 42 (指向 obj)
obj1.arrowFn(); // undefined (在瀏覽器執行時會往外層指向 window 物件，而 window 物件沒有 value 這個屬性)

// 箭頭函式綁定 this 無效
const obj2 = {value: 100};
const f7 = () => {
  console.log(this.value);
};
const bindFn = f7.bind(obj2);

bindFn(); // undefined，綁定無效


// 預設參數
const f8 = (a, b = 10) => {
  console.log(a + b);
}
f8(5); // 5 + 10 = 15
f8(3, 6); // 3 + 6 = 9

// 剩餘參數
const f9 = (...rest) => {
  console.log(rest);
}
f9(); // []
f9(66, 77, 88, 99); // [66, 77, 88, 99]

// 剩餘參數必須放在最後一個參數位置
// const f10 = (a, ...b, c) => {}
// f10(); // SyntaxError: Rest parameter must be last formal parameter

// 使用函式參數解構接收物件的資料
const f11 = ({name, age}) => {
  console.log(name, age);
};

const member = {
  name: "Alex",
  age: 33,
};

f11(member); // Alex 33

// 使用 return 回傳值並讓其他函式使用
const f12 = (a, b) => {
  return a + b;
}

const f13 = () => {
  const result = f12(6, 8);
  console.log(result);
}
f13(); // 14

// 生成器函式使用 yield 暫停與繼續執行
function* f14() {
  let count = 0;
  while (true) {
    yield count;
    count++;
  }
}
const result = f14();
console.log(result.next()); // {value: 0, done: false}
console.log(result.next()); // {value: 1, done: false}
console.log(result.next()); // {value: 2, done: false}


// 全域變數
const global = 'global';

function print1() {
  console.log(global);
}

print1(); // 'global'

// 如果沒有宣告就直接賦值也會變成全域變數
function f15() {
  a = 'apple'; // 沒有使用宣告，a 會變成全域變數
}

f15();
console.log(a); // 'apple'

// 函式作用域
function f16() {
  const b = 'banana';
  console.log(b);
}

f16(); // 'banana'
// console.log(b); // ReferenceError: b is not defined

// 區塊作用域
function f17() {
  if (true) {
    const c = 'cherry';
    const d = 'dog';
    console.log(c); // 'cherry'
  }
  // console.log(c); // ReferenceError: c is not defined
  // console.log(d); // ReferenceError: d is not defined
}

f17();
// console.log(c); // ReferenceError: c is not defined
// console.log(d); // ReferenceError: d is not defined

// 巢狀函式的 closure
function outer() {
  let a = 0;

  function inner() {
    a++;
    console.log(a);
  }

  return inner;
}

const increment = outer();

// 因為內部函式可以拿到外部函式的變數並記住，因此每次呼叫時 a 都會 +1
increment(); // 1
increment(); // 2
increment(); // 3

