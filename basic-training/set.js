// 創建一個新的 Set
const set1 = new Set();
console.log(set1);

// add()：在 Set 尾端加入新元素。
const set2 = new Set();
set2.add('apple');
console.log(set2); // Set(1) {'apple'}
set2.add(66);
console.log(set2); // Set(2) {'apple', 66}

// delete()
const set3 = new Set();
set3.add('apple').add('banana').add('strawberry');
console.log(set3); // Set(3) {'apple', 'banana', 'strawberry'}
set3.delete('banana');
console.log(set3); // Set(2) {'apple', 'strawberry'}

// 刪除不存在的元素時，不會有錯誤也不會影響其他元素，但會有回傳值為 false
set3.delete('sky');
console.log(set3); // Set(2) {'apple', 'strawberry'}

// has()
const set4 = new Set([1, 2, 5]);
console.log(set4.has(3)); // false

// clear()
const set5 = new Set([1, 2, 3]);
console.log(set5); // Set(3) {1, 2, 3}
set5.clear();
console.log(set5); // Set(0) {}

// intersection()
const set6 = new Set([2, 4, 6, 8, 10, 12]);
const set7 = new Set([3, 6, 9, 12, 15]);
console.log(set6.intersection(set7)); // Set(2) {6, 12}

// union()
const set8 = new Set([1, 2, 3]);
const set9 = new Set([6, 4, 2]);
console.log(set8.union(set9)); // Set(5) {1, 2, 3, 6, 4}