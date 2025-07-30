const f9 = (a, b, ...rest) => {
  console.log(a, b, rest);
}
f9(55); // 55, undefined, []
f9(66, 77, 88, 99); // 66, 77, [88, 99]