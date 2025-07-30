// typeof
typeof 123; // 'number'
typeof 'hello'; // 'string'
typeof true; // 'boolean'
typeof NaN; // 'number'
typeof undefined; // 'undefined'
typeof {a: 1, b: 2}; // 'object'
typeof [1, 2, 3]; // 'object'

// 使用 isArray() 檢查是否為陣列
const a = [1, 2, 3];
const b = {a: 1, b: 2};
console.log(Array.isArray(a)); // true
console.log(Array.isArray(b)); // false

// null
typeof null; // 'object'

// instanceof
function C() {}
function D() {}

const e = new C();
console.log(e instanceof C); // true
console.log(e instanceof D); // false

// obj.constructor.name
const f = [3, 7, 11];
const g = {x: 1, y: 2};
console.log(f.constructor.name); // 'Array'
console.log(g.constructor.name); // 'Object'
