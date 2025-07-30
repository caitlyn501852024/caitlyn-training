// 一般的物件建立方式：使用 {} 包覆並給屬性名稱與屬性值
const myCar = {
  // 物件的屬性
  color: 'red',
  brand: 'Toyota',
  price: 500000,
  isLoan: false,

  //物件的方法
  honk: function () {
    alert('honk!')
  }
}

// 使用 new Object 建立物件 (少用)
const myObject = new Object();

// Object.keys()、Object.values()、Object.entries()
const obj1 = {
  name: 'aaa',
  height: 150,
  isDone: true
}
console.log(Object.keys(obj1)); // ['name', 'height', 'isDone']
console.log(Object.values(obj1)); // ['aaa', 150, true]
console.log(Object.entries(obj1)); // [['name', 'aaa'], ['height', 150], ['isDone', true]]

// Object.assign()
const targetObj1 = {a: 1, b: 2};
const sourceObj1 = {b: 3, c: 4};
const sourceObj2 = {a: 99, d: 5};
const newObj = Object.assign(targetObj1, sourceObj1, sourceObj2);

console.log(newObj); // {a: 99, b: 3, c: 4, d: 5}

// Object.create()
const member = {
  memberAccount: '會員帳號',
  memberName: '會員名稱',
  memberAge: 18,
  isVip: false,
}
const newMember1 = Object.create(member);
console.log(newMember1.memberAccount); // '會員帳號'

// 設定新的屬性給 newMember1
newMember1.memberAccount = 'apple1234';
newMember1.memberName = '小蘋果';
console.log(newMember1.memberAccount); // 'apple1234'
console.log(newMember1.memberName); // '小蘋果'

// 物件的解構賦值
// 一般的解構賦值
const obj2 = {
  height: 150,
  weight: 100,
}
let {height, weight} = obj2;
console.log(height, weight); // 150, 100

const obj3 = {
  name1: 100,
  name2: 200,
}
let {name1: n1, name2: n2} = obj3;
// console.log(name1); // ReferenceError: name1 is not defined
console.log(n1); // 100
// console.log(name2); // ReferenceError: name2 is not defined
console.log(n2); // 200

// 延伸：其餘運算子
const {a, ...others} = {a: 1, b: 2, c: 3};
console.log(a); // 1
console.log(others); // {b: 2, c: 3}