// 建立一個空的 Map 物件
const map1 = new Map();

// 建立 Map 時賦給內容
const map2 = new Map([
  ['a', 1],
  ['b', 2],
]);

// set()
const map3 = new Map();
map3.set(1, 'red');
console.log(map3); // Map(1) {1 => 'red'}

// get()
const map4 = new Map([
  ['apple', 'red'],
  ['banana', 'yellow'],
  ['grape', 'purple']
]);
console.log(map4.get('banana')); // 'yellow'
console.log(map4.get('orange')); // undefined

// delete()
const map5 = new Map([
  ['John', 30],
  ['Mary', 25],
  ['David', 35]
])
console.log(map5); // Map(3) {'John' => 30, 'Mary' => 25, 'David' => 35}

map5.delete('Mary');
console.log(map5); // Map(2) {'John' => 30, 'David' => 35}

// 刪除不存在的屬性時，不會有錯誤也不會影響其他屬性，但會有回傳值為 false
map5.delete('Ken');
console.log(map5); // Map(2) {'John' => 30, 'David' => 35}

// has()
const map6 = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three']
])
console.log(map6.has(2)); // true
console.log(map6.has(4)); // false

// clear()
const map7 = new Map([
  ['a', 23],
  ['b', 45],
  ['c', 67]
])
console.log(map7); // Map(3) {'a' => 23, 'b' => 45, 'c' => 67}
map7.clear();
console.log(map7); // Map(0) {}

// keys()
const map8 = new Map([
  ['name', 'Alice'],
  ['age', 30],
  ['city', 'New York']
])
console.log(map8.keys()); // MapIterator {'name', 'age', 'city'}

// 此 Map 迭代器物件可使用 for-of 等遍歷方法
const keysIterator = map8.keys();
for (let key of keysIterator) {
  console.log(key); // 'name', 'age', 'city'
}

// values()
console.log(map8.values()); // MapIterator {'Alice', 30, 'New York'}

// 一樣可使用 for-of 等遍歷方法
const valuesIterator = map8.values();
for (let value of valuesIterator) {
  console.log(value); // 'Alice', 30, 'New York'
}

// entries()
console.log(map8.entries()); // [Map Entries] {['name', 'Alice' ], [ 'age', 30 ], [ 'city', 'New York' ]}

// 一樣可使用 for-of 等遍歷方法
for (let entry of map8.entries()) {
  console.log(entry); // ['name', 'Alice' ], [ 'age', 30 ], [ 'city', 'New York' ]
}